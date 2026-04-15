import { useEffect, useState } from "react";

export default function SupabaseQuickTest({ sync, onBack }) {
  const [sessionCodeInput, setSessionCodeInput] = useState(sync.sessionCode || "");
  const [teamNameInput, setTeamNameInput] = useState(sync.teamName || "Equipo Prueba");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (sync.sessionCode) {
      setSessionCodeInput(sync.sessionCode);
    }
  }, [sync.sessionCode]);

  const createSession = () => {
    const nextCode = sync.createSession();
    setSessionCodeInput(nextCode);
    setMessage(`Sesión de prueba creada: ${nextCode}`);
  };

  const joinTestTeam = async () => {
    setLoading(true);
    setMessage("");

    try {
      const team = await sync.joinSession({
        sessionCode: sessionCodeInput,
        teamName: teamNameInput,
      });

      await sync.updateTeam({
        phase: "test",
        status: "active",
        last_event: "Prueba rápida ejecutada",
        collected_pieces: [false, false, false, false, false],
        total_seconds: 0,
        room_seconds: 0,
      });

      setMessage(`Guardado correcto para ${team.team_name} en la sesión ${team.session_id}.`);
    } catch (error) {
      setMessage(error?.message || "No se pudo ejecutar la prueba.");
    } finally {
      setLoading(false);
    }
  };

  const refresh = async () => {
    if (!sessionCodeInput) {
      setMessage("Escribe o crea un código de sesión primero.");
      return;
    }

    setLoading(true);
    await sync.refreshTeams(sessionCodeInput);
    setMessage(`Equipos cargados para ${sessionCodeInput}. Encontrados: ${sync.teams.length}.`);
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "100vh", background: "radial-gradient(ellipse at 20% 0%, #111827 0%, #020617 60%, #000 100%)", color: "#fff", padding: 20, fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      <div style={{ maxWidth: 780, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center", marginBottom: 18, flexWrap: "wrap" }}>
          <div>
            <p style={{ margin: 0, color: "#38bdf8", fontSize: 12, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase" }}>Prueba rápida</p>
            <h1 style={{ margin: "6px 0 0", fontSize: 30 }}>Verificar Supabase</h1>
            <p style={{ margin: 0, color: "#94a3b8", fontSize: 13 }}>Sirve para confirmar conexión, escritura y lectura en tiempo real.</p>
          </div>
          <button onClick={onBack} style={{ background: "rgba(255,255,255,0.06)", color: "#e2e8f0", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 12, padding: "10px 14px", cursor: "pointer" }}>
            ← Volver
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 14, marginBottom: 14 }}>
          <div style={{ background: "rgba(15,23,42,0.9)", border: "1px solid rgba(56,189,248,0.16)", borderRadius: 18, padding: 16 }}>
            <p style={{ margin: 0, color: "#38bdf8", fontSize: 12, fontWeight: 700 }}>Estado Supabase</p>
            <h2 style={{ margin: "8px 0 0", fontSize: 22 }}>{sync.isRealtimeEnabled ? "Conectado" : "Modo local"}</h2>
            <p style={{ margin: "8px 0 0", color: "#94a3b8", fontSize: 13 }}>{sync.status}</p>
          </div>
          <div style={{ background: "rgba(15,23,42,0.9)", border: "1px solid rgba(16,185,129,0.16)", borderRadius: 18, padding: 16 }}>
            <p style={{ margin: 0, color: "#34d399", fontSize: 12, fontWeight: 700 }}>Sesión actual</p>
            <h2 style={{ margin: "8px 0 0", fontSize: 22 }}>{sync.sessionCode || "Sin sesión"}</h2>
            <p style={{ margin: "8px 0 0", color: "#94a3b8", fontSize: 13 }}>Equipos visibles: {sync.teams.length}</p>
          </div>
        </div>

        <div style={{ background: "rgba(15,23,42,0.9)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 18, padding: 18, marginBottom: 14 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
            <input
              value={teamNameInput}
              onChange={(event) => setTeamNameInput(event.target.value)}
              placeholder="Nombre del grupo"
              style={{ width: "100%", boxSizing: "border-box", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", color: "#fff", borderRadius: 12, padding: "12px 14px", outline: "none" }}
            />
            <input
              value={sessionCodeInput}
              onChange={(event) => setSessionCodeInput(event.target.value.toUpperCase())}
              placeholder="Código de sesión"
              style={{ width: "100%", boxSizing: "border-box", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", color: "#fff", borderRadius: 12, padding: "12px 14px", outline: "none", letterSpacing: 2, fontFamily: "monospace" }}
            />
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button onClick={createSession} style={{ background: "linear-gradient(135deg, #38bdf8, #6366f1)", color: "#fff", border: "none", borderRadius: 12, padding: "12px 14px", cursor: "pointer", fontWeight: 800 }}>
              Crear sesión
            </button>
            <button onClick={joinTestTeam} disabled={loading} style={{ background: "linear-gradient(135deg, #22c55e, #16a34a)", color: "#fff", border: "none", borderRadius: 12, padding: "12px 14px", cursor: "pointer", fontWeight: 800, opacity: loading ? 0.7 : 1 }}>
              {loading ? "Probando..." : "Unir y guardar"}
            </button>
            <button onClick={refresh} disabled={loading} style={{ background: "rgba(255,255,255,0.06)", color: "#e2e8f0", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 12, padding: "12px 14px", cursor: "pointer", fontWeight: 700, opacity: loading ? 0.7 : 1 }}>
              Refrescar lectura
            </button>
          </div>
        </div>

        <div style={{ background: "rgba(15,23,42,0.9)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 18, padding: 18, marginBottom: 14 }}>
          <p style={{ margin: "0 0 10px", color: "#cbd5e1", fontSize: 13 }}>Resultados de la última prueba</p>
          <div style={{ color: message ? "#e2e8f0" : "#94a3b8", fontSize: 13, lineHeight: 1.6, minHeight: 24 }}>{message || "Aún no hay acciones ejecutadas."}</div>
        </div>

        <div style={{ background: "rgba(15,23,42,0.9)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 18, padding: 18 }}>
          <p style={{ margin: "0 0 10px", color: "#cbd5e1", fontSize: 13 }}>Equipos encontrados en la sesión</p>
          {sync.teams.length === 0 ? (
            <div style={{ color: "#94a3b8", fontSize: 13 }}>No hay datos todavía. Ejecuta una prueba o crea una sesión.</div>
          ) : (
            <div style={{ display: "grid", gap: 10 }}>
              {sync.teams.map((team) => (
                <div key={team.client_team_id} style={{ background: "rgba(255,255,255,0.04)", borderRadius: 14, padding: 12, border: `1px solid ${team.team_color}33` }}>
                  <strong style={{ display: "block", marginBottom: 4 }}>{team.team_name}</strong>
                  <div style={{ color: "#94a3b8", fontSize: 12 }}>Sesión: {team.session_id} · Estado: {team.status} · Fase: {team.phase}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}