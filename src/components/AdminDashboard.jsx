export default function AdminDashboard({ sync, rooms, totalPuzzles, onBack }) {
  const connectedTeams = sync.teams;
  const activeCount = connectedTeams.length;
  const avgRoom = activeCount
    ? connectedTeams.reduce((sum, team) => sum + (team.room_idx || 0), 0) / activeCount
    : 0;

  const copySessionCode = async () => {
    if (!sync.sessionCode) return;

    try {
      await navigator.clipboard.writeText(sync.sessionCode);
    } catch {
      window.prompt("Copia el código de sesión:", sync.sessionCode);
    }
  };

  const createNewSession = () => {
    const nextCode = sync.createSession();
    sync.setSessionCode(nextCode);
    sync.refreshTeams(nextCode);
  };

  return (
    <div style={{ minHeight: "100vh", background: "radial-gradient(ellipse at 20% 0%, #0f172a 0%, #020617 55%, #000 100%)", color: "#fff", padding: 20, fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap", marginBottom: 20 }}>
          <div>
            <div style={{ color: "#38bdf8", fontSize: 12, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase" }}>Panel Admin</div>
            <h1 style={{ margin: "4px 0 0", fontSize: 28 }}>Progreso en tiempo real</h1>
            <p style={{ margin: 0, color: "#94a3b8", fontSize: 13 }}>Monitorea equipos, salones y tiempos desde una sola vista.</p>
          </div>
          <button onClick={onBack} style={{ background: "rgba(255,255,255,0.06)", color: "#e2e8f0", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 12, padding: "10px 14px", cursor: "pointer" }}>
            ← Volver
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 14, marginBottom: 18 }}>
          <div style={{ background: "rgba(15,23,42,0.9)", border: "1px solid rgba(56,189,248,0.18)", borderRadius: 18, padding: 16 }}>
            <p style={{ margin: 0, color: "#38bdf8", fontSize: 12, fontWeight: 700 }}>Sesión activa</p>
            <h2 style={{ margin: "6px 0 10px", fontSize: 32, letterSpacing: 2 }}>{sync.sessionCode || "------"}</h2>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <button onClick={createNewSession} style={{ background: "linear-gradient(135deg, #38bdf8, #6366f1)", color: "#fff", border: "none", borderRadius: 10, padding: "10px 12px", cursor: "pointer", fontWeight: 700 }}>
                Crear código
              </button>
              <button onClick={copySessionCode} style={{ background: "rgba(255,255,255,0.06)", color: "#fff", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, padding: "10px 12px", cursor: "pointer", fontWeight: 700 }}>
                Copiar
              </button>
            </div>
          </div>
          <div style={{ background: "rgba(15,23,42,0.9)", border: "1px solid rgba(16,185,129,0.18)", borderRadius: 18, padding: 16 }}>
            <p style={{ margin: 0, color: "#34d399", fontSize: 12, fontWeight: 700 }}>Equipos conectados</p>
            <h2 style={{ margin: "6px 0 10px", fontSize: 32 }}>{activeCount}</h2>
            <p style={{ margin: 0, color: "#94a3b8", fontSize: 13 }}>Promedio de sala: {avgRoom.toFixed(1)} / {rooms.length}</p>
          </div>
          <div style={{ background: "rgba(15,23,42,0.9)", border: "1px solid rgba(245,158,11,0.18)", borderRadius: 18, padding: 16 }}>
            <p style={{ margin: 0, color: "#fbbf24", fontSize: 12, fontWeight: 700 }}>Puzzles totales</p>
            <h2 style={{ margin: "6px 0 10px", fontSize: 32 }}>{totalPuzzles}</h2>
            <p style={{ margin: 0, color: "#94a3b8", fontSize: 13 }}>Sala actual: {rooms[Math.min(Math.round(avgRoom), rooms.length - 1)]?.name || "N/A"}</p>
          </div>
        </div>

        <div style={{ marginBottom: 18, background: "rgba(15,23,42,0.9)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 18, padding: 16 }}>
          <p style={{ margin: "0 0 12px", color: "#cbd5e1", fontSize: 13, lineHeight: 1.6 }}>
            Flujo recomendado: crea un código desde este panel, comparte el código con los grupos y pide a cada equipo ingresar su nombre en la pantalla inicial.
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <span style={{ background: sync.isRealtimeEnabled ? "rgba(16,185,129,0.15)" : "rgba(251,191,36,0.15)", color: sync.isRealtimeEnabled ? "#34d399" : "#fbbf24", padding: "8px 12px", borderRadius: 999, fontSize: 12, fontWeight: 700 }}>
              {sync.isRealtimeEnabled ? "Supabase listo" : "Modo local activo"}
            </span>
            <span style={{ background: "rgba(59,130,246,0.14)", color: "#93c5fd", padding: "8px 12px", borderRadius: 999, fontSize: 12, fontWeight: 700 }}>
              {sync.status}
            </span>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14 }}>
          {connectedTeams.length === 0 ? (
            <div style={{ gridColumn: "1 / -1", background: "rgba(15,23,42,0.9)", border: "1px dashed rgba(255,255,255,0.12)", borderRadius: 18, padding: 24, textAlign: "center", color: "#94a3b8" }}>
              Todavía no hay equipos conectados a esta sesión.
            </div>
          ) : (
            connectedTeams.map((team) => {
              const progressValue = Math.max(0, Math.min(1, (((team.room_idx || 0) * 2) + (team.puzzle_idx || 0)) / totalPuzzles));
              const roomName = rooms[Math.min(team.room_idx || 0, rooms.length - 1)]?.name || "Sin sala";

              return (
                <div key={team.client_team_id} style={{ background: "rgba(15,23,42,0.92)", border: `1px solid ${team.team_color}33`, borderRadius: 18, padding: 16, boxShadow: `0 0 24px ${team.team_color}10` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", gap: 10, marginBottom: 12 }}>
                    <div>
                      <p style={{ margin: 0, color: team.team_color, fontSize: 12, fontWeight: 800, letterSpacing: 1 }}>EQUIPO</p>
                      <h3 style={{ margin: "4px 0 0", fontSize: 20 }}>{team.team_name}</h3>
                    </div>
                    <div style={{ width: 14, height: 14, borderRadius: "50%", background: team.team_color, boxShadow: `0 0 14px ${team.team_color}` }} />
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10, color: "#94a3b8", fontSize: 12 }}>
                    <span>{roomName} · P {Number(team.puzzle_idx || 0) + 1}</span>
                    <span>{team.phase || "story"}</span>
                  </div>
                  <div style={{ height: 10, background: "rgba(255,255,255,0.08)", borderRadius: 999, overflow: "hidden", marginBottom: 10 }}>
                    <div style={{ height: 10, width: `${progressValue * 100}%`, background: `linear-gradient(90deg, ${team.team_color}, #fff)`, borderRadius: 999 }} />
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8, fontSize: 12, color: "#cbd5e1" }}>
                    <div style={{ background: "rgba(255,255,255,0.04)", padding: 10, borderRadius: 12 }}>
                      <div style={{ color: "#94a3b8", marginBottom: 4 }}>Tiempo total</div>
                      <strong>{String(Math.floor((team.total_seconds || 0) / 60)).padStart(2, "0")}:{String((team.total_seconds || 0) % 60).padStart(2, "0")}</strong>
                    </div>
                    <div style={{ background: "rgba(255,255,255,0.04)", padding: 10, borderRadius: 12 }}>
                      <div style={{ color: "#94a3b8", marginBottom: 4 }}>Último evento</div>
                      <strong style={{ display: "block", fontSize: 11, lineHeight: 1.4 }}>{team.last_event || "Sin actividad"}</strong>
                    </div>
                  </div>
                  <div style={{ marginTop: 10, color: "#94a3b8", fontSize: 12 }}>
                    Piezas: {(team.collected_pieces || []).filter(Boolean).length}/5 · Estado: {team.status || "active"}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}