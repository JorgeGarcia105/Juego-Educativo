import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const STORAGE_KEY = "agualinda-team-sync-v1";
const ACTIVE_SESSION_KEY = "agualinda-active-session-v1";
const ACTIVE_TEAM_KEY = "agualinda-active-team-v1";
const BROADCAST_CHANNEL = "agualinda-team-sync";
const TEAM_COLORS = ["#f59e0b", "#6366f1", "#10b981", "#ec4899", "#3b82f6", "#14b8a6", "#ef4444", "#8b5cf6"];

function randomCode(length = 6) {
  return Array.from({ length }, () => Math.floor(Math.random() * 36).toString(36)).join("").toUpperCase();
}

function createTeamId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `team-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function colorFromName(name) {
  const normalized = name.trim().toLowerCase();
  let hash = 0;

  for (let index = 0; index < normalized.length; index += 1) {
    hash = (hash * 31 + normalized.charCodeAt(index)) >>> 0;
  }

  return TEAM_COLORS[hash % TEAM_COLORS.length];
}

function readLocalStore() {
  if (typeof window === "undefined") return { sessions: {} };

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : { sessions: {} };
  } catch {
    return { sessions: {} };
  }
}

function writeLocalStore(store) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

function normalizeSessionCode(code) {
  return String(code || "")
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .slice(0, 8);
}

function defaultTeamState({ teamId, teamName, sessionCode }) {
  return {
    client_team_id: teamId,
    session_id: sessionCode,
    team_name: teamName,
    team_color: colorFromName(teamName),
    room_idx: 0,
    puzzle_idx: 0,
    phase: "story",
    total_seconds: 0,
    room_seconds: 0,
    collected_pieces: [false, false, false, false, false],
    status: "active",
    last_event: "Esperando inicio",
    updated_at: new Date().toISOString(),
  };
}

function upsertLocalTeam(sessionCode, team) {
  const store = readLocalStore();
  const session = store.sessions[sessionCode] || { teams: {} };

  session.teams[team.client_team_id] = {
    ...(session.teams[team.client_team_id] || {}),
    ...team,
    updated_at: new Date().toISOString(),
  };

  store.sessions[sessionCode] = session;
  writeLocalStore(store);

  if (typeof window !== "undefined" && typeof BroadcastChannel !== "undefined") {
    const channel = new BroadcastChannel(BROADCAST_CHANNEL);
    channel.postMessage({ type: "session-updated", sessionCode });
    channel.close();
  }
}

function getLocalTeams(sessionCode) {
  const store = readLocalStore();
  return Object.values(store.sessions[sessionCode]?.teams || {}).sort((left, right) => {
    return new Date(right.updated_at).getTime() - new Date(left.updated_at).getTime();
  });
}

function createSupabaseClient() {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }

  return createClient(supabaseUrl, supabaseAnonKey);
}

async function loadSupabaseTeams(client, sessionCode) {
  const { data, error } = await client
    .from("game_teams")
    .select("*")
    .eq("session_id", sessionCode)
    .order("updated_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data || [];
}

async function upsertSupabaseTeam(client, team) {
  const { error } = await client
    .from("game_teams")
    .upsert(team, { onConflict: "client_team_id" });

  if (error) {
    throw error;
  }
}

export function useTeamSync() {
  const supabase = useMemo(() => createSupabaseClient(), []);
  const [sessionCode, setSessionCode] = useState(() => {
    if (typeof window === "undefined") return "";
    return window.localStorage.getItem(ACTIVE_SESSION_KEY) || "";
  });
  const [teamId, setTeamId] = useState(() => {
    if (typeof window === "undefined") return "";
    return window.localStorage.getItem(ACTIVE_TEAM_KEY) || "";
  });
  const [teamName, setTeamName] = useState(() => {
    if (typeof window === "undefined") return "";
    return window.localStorage.getItem("agualinda-team-name-v1") || "";
  });
  const [teams, setTeams] = useState([]);
  const [status, setStatus] = useState(supabase ? "connecting" : "local");
  const channelRef = useRef(null);

  const refreshTeams = useCallback(
    async (code) => {
      const normalized = normalizeSessionCode(code);
      if (!normalized) {
        setTeams([]);
        return;
      }

      if (supabase) {
        try {
          const remoteTeams = await loadSupabaseTeams(supabase, normalized);
          setTeams(remoteTeams);
          setStatus("connected");
          return;
        } catch {
          setStatus("local-fallback");
        }
      }

      setTeams(getLocalTeams(normalized));
      setStatus("local");
    },
    [supabase]
  );

  const createSession = useCallback(() => {
    const nextSessionCode = randomCode();
    setSessionCode(nextSessionCode);

    if (typeof window !== "undefined") {
      window.localStorage.setItem(ACTIVE_SESSION_KEY, nextSessionCode);
    }

    return nextSessionCode;
  }, []);

  const joinSession = useCallback(
    async ({ sessionCode: nextSessionCode, teamName: nextTeamName }) => {
      const normalizedSession = normalizeSessionCode(nextSessionCode);
      const normalizedTeam = String(nextTeamName || "").trim();

      if (!normalizedSession || !normalizedTeam) {
        throw new Error("Necesitas un código de sesión y un nombre de grupo.");
      }

      const nextTeamId = teamId || createTeamId();
      const team = defaultTeamState({ teamId: nextTeamId, teamName: normalizedTeam, sessionCode: normalizedSession });

      setSessionCode(normalizedSession);
      setTeamId(nextTeamId);
      setTeamName(normalizedTeam);

      if (typeof window !== "undefined") {
        window.localStorage.setItem(ACTIVE_SESSION_KEY, normalizedSession);
        window.localStorage.setItem(ACTIVE_TEAM_KEY, nextTeamId);
        window.localStorage.setItem("agualinda-team-name-v1", normalizedTeam);
      }

      upsertLocalTeam(normalizedSession, team);

      if (supabase) {
        try {
          await upsertSupabaseTeam(supabase, team);
          setStatus("connected");
        } catch {
          setStatus("local-fallback");
        }
      }

      await refreshTeams(normalizedSession);
      return team;
    },
    [refreshTeams, supabase, teamId]
  );

  const updateTeam = useCallback(
    async (patch) => {
      const normalizedSession = normalizeSessionCode(sessionCode);
      if (!normalizedSession || !teamId) return;

      const currentTeams = getLocalTeams(normalizedSession);
      const current = currentTeams.find((item) => item.client_team_id === teamId) ||
        defaultTeamState({ teamId, teamName: teamName || "Grupo", sessionCode: normalizedSession });

      const nextTeam = {
        ...current,
        ...patch,
        client_team_id: teamId,
        session_id: normalizedSession,
        team_name: teamName || current.team_name,
        updated_at: new Date().toISOString(),
      };

      upsertLocalTeam(normalizedSession, nextTeam);

      if (supabase) {
        try {
          await upsertSupabaseTeam(supabase, nextTeam);
          setStatus("connected");
        } catch {
          setStatus("local-fallback");
        }
      }

      setTeams(getLocalTeams(normalizedSession));
    },
    [sessionCode, supabase, teamId, teamName]
  );

  useEffect(() => {
    if (!sessionCode) {
      setTeams([]);
      return undefined;
    }

    refreshTeams(sessionCode);

    if (typeof window !== "undefined" && typeof BroadcastChannel !== "undefined") {
      channelRef.current = new BroadcastChannel(BROADCAST_CHANNEL);
      channelRef.current.onmessage = (event) => {
        if (event.data?.type === "session-updated" && event.data.sessionCode === sessionCode) {
          refreshTeams(sessionCode);
        }
      };
    }

    const storageHandler = (event) => {
      if (event.key === STORAGE_KEY) {
        refreshTeams(sessionCode);
      }
    };

    window.addEventListener("storage", storageHandler);

    let channel = null;
    let subscription = null;

    if (supabase) {
      channel = supabase.channel(`session-${sessionCode}`);
      channel.on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "game_teams",
          filter: `session_id=eq.${sessionCode}`,
        },
        () => refreshTeams(sessionCode)
      );
      channel.subscribe((state) => {
        if (state === "SUBSCRIBED") {
          setStatus("connected");
        }
      });
      subscription = channel;
    }

    return () => {
      window.removeEventListener("storage", storageHandler);

      if (channelRef.current) {
        channelRef.current.close();
        channelRef.current = null;
      }

      if (subscription) {
        supabase.removeChannel(subscription);
      }
    };
  }, [refreshTeams, sessionCode, supabase]);

  const currentTeam = useMemo(() => teams.find((item) => item.client_team_id === teamId) || null, [teams, teamId]);

  return {
    sessionCode,
    teamId,
    teamName,
    teams,
    currentTeam,
    status,
    isRealtimeEnabled: Boolean(supabase),
    createSession,
    joinSession,
    updateTeam,
    refreshTeams,
    setSessionCode,
    setTeamName,
    normalizeSessionCode,
    createTeamId,
    colorFromName,
  };
}

export function getSessionDisplayCode(code) {
  return normalizeSessionCode(code);
}