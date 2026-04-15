import { useEffect, useRef, useState } from "react";

export default function Rompe() {
  const roomColors = ["#f59e0b", "#6366f1", "#10b981", "#ec4899", "#3b82f6"];
  const [rooms, setRooms] = useState([true, true, true, true, true]); // Control de avance por 5 salas

  const mapWidth = 1000;
  const mapHeight = 400; // Altura aumentada para albergar 2 filas
  const pieceSize = 200; // Piezas cuadradas de 200x200 (5 columnas x 2 filas = 10 piezas)
  
  const boardRef = useRef(null);
  const [dragging, setDragging] = useState(null);
  const dragOffset = useRef({ x: 0, y: 0 });
  const [positions, setPositions] = useState(
    Array.from({ length: 10 }, (_, i) => ({ 
      // Posiciones aleatorias en la parte inferior para iniciar
      x: 30 + Math.floor(i / 2) * 140 + (i % 2) * 40,
      y: 450 + (i % 2) * 100 
    }))
  );

  const MapPiece = ({ index }) => {
    // index de 0 a 9.
    // 2 imágenes entregadas por sala (ej: Sala 1 -> imágenes 0 y 1; Sala 2 -> imágenes 2 y 3)
    const col = Math.floor(index / 2); 
    const row = index % 2; 
    const x = col * pieceSize;
    const y = row * pieceSize;
    
    return (
      <svg
        width="100%"
        height="100%"
        // El viewBox funciona como un clip perfecto nativo
        viewBox={`${x} ${y} ${pieceSize} ${pieceSize}`}
        style={{ display: "block" }}
      >
        <rect x="0" y="0" width={mapWidth} height={mapHeight} fill="#a7f3d0" />
        
        {/* Río Azul (conecta perfectamente ambas filas y columnas) */}
        <path
          d="M 0 100 C 150 250, 250 -50, 400 150 C 550 350, 650 50, 800 200 C 900 280, 950 150, 1000 150"
          stroke="#60a5fa"
          strokeWidth="45"
          fill="none"
          strokeLinecap="round"
        />
        
        {/* Camino de tierra (Conecta horizontalmente con curvas amplias) */}
        <path
          d="M 0 250 C 200 380, 300 200, 500 250 C 700 300, 800 350, 1000 300"
          stroke="#d97706"
          strokeWidth="20"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 0 250 C 200 380, 300 200, 500 250 C 700 300, 800 350, 1000 300"
          stroke="#fcd34d"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="20,15"
        />

        <g fontSize="65">
          {/* Sala 1: Origen (Piezas 0 y 1 - col 0) */}
          <text x="30" y="110">⛰️</text>
          <text x="100" y="320">💧</text>
          
          {/* Sala 2: Ruta (Piezas 2 y 3 - col 1) */}
          <text x="240" y="140">🌲</text>
          <text x="310" y="340">🌉</text>
          
          {/* Sala 3: Centro (Piezas 4 y 5 - col 2) */}
          <text x="430" y="130">🏘️</text>
          <text x="510" y="330">🏫</text>
          
          {/* Sala 4: Cosecha (Piezas 6 y 7 - col 3) */}
          <text x="630" y="160">🌽</text>
          <text x="730" y="280">🚜</text>
          
          {/* Sala 5: Mercado (Piezas 8 y 9 - col 4) */}
          <text x="820" y="110">🏪</text>
          <text x="910" y="310">🛒</text>
        </g>

        <g fontSize="24" fontFamily="Segoe UI, sans-serif" fontWeight="bold" fill="#064e3b">
          <text x="30" y="210">1. Origen</text>
          <text x="220" y="210">2. Ruta</text>
          <text x="420" y="210">3. Centro</text>
          <text x="620" y="210">4. Cosecha</text>
          <text x="820" y="210">5. Mercado</text>
        </g>
      </svg>
    );
  };

  useEffect(() => {
    const handleUp = () => setDragging(null);
    window.addEventListener("mouseup", handleUp);
    return () => window.removeEventListener("mouseup", handleUp);
  }, []);

  const onBoardMove = (event) => {
    if (dragging === null || !boardRef.current) return;
    const rect = boardRef.current.getBoundingClientRect();
    const nextX = event.clientX - rect.left - dragOffset.current.x;
    const nextY = event.clientY - rect.top - dragOffset.current.y;
    const maxX = rect.width - pieceSize;
    const maxY = rect.height - pieceSize;
    setPositions((prev) =>
      prev.map((pos, idx) =>
        idx === dragging
          ? {
              x: Math.max(0, Math.min(nextX, maxX)),
              y: Math.max(0, Math.min(nextY, maxY)),
            }
          : pos
      )
    );
  };

  const onPieceDown = (index, event) => {
    if (!boardRef.current) return;
    const rect = boardRef.current.getBoundingClientRect();
    const current = positions[index];
    dragOffset.current = {
      x: event.clientX - rect.left - current.x,
      y: event.clientY - rect.top - current.y,
    };
    setDragging(index);
  };

  const totalRooms = rooms.length;
  const collectedRooms = rooms.filter(Boolean).length;
  const allCollected = collectedRooms === totalRooms;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f0c29",
        color: "#fff",
        padding: 24,
        fontFamily: "Segoe UI, sans-serif",
      }}
    >
      <h2>Prueba Rompecabezas</h2>
      <div
        style={{
          width: 900,
          marginBottom: 16,
          padding: 12,
          borderRadius: 16,
          border: "1px solid #334155",
          background: "#0b1220",
        }}
      >
        <p style={{ margin: "0 0 8px", color: "#cbd5e1", fontSize: 12 }}>
          Vista final (así deben unirse las 10 piezas sin bordes):
        </p>
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(5, 60px)", 
          gridTemplateRows: "repeat(2, 60px)", 
          gridAutoFlow: "column", // Para asignar pares en columnas (0 y 1 van a col 1)
          width: 300, 
          height: 120 
        }}>
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} style={{ width: 60, height: 60, overflow: "hidden" }}>
              <MapPiece index={i} />
            </div>
          ))}
        </div>
      </div>
      
      <p>
        Salas Completadas: {collectedRooms}/{totalRooms} — Piezas de mapa ganadas: {collectedRooms * 2}/10
      </p>

      <div
        ref={boardRef}
        onMouseMove={onBoardMove}
        onMouseLeave={() => setDragging(null)}
        style={{
          position: "relative",
          width: 1000,
          height: 750,
          borderRadius: 20,
          border: "1px solid #334155",
          background: "#0b1220",
          overflow: "hidden",
          marginBottom: 20,
        }}
      >
        {Array.from({ length: 10 }).map((_, i) => {
          const roomIndex = Math.floor(i / 2);
          const has = rooms[roomIndex];
          return (
            <div
              key={i}
              onMouseDown={(event) => has && onPieceDown(i, event)}
              style={{
                position: "absolute",
                left: positions[i].x,
                top: positions[i].y,
                width: pieceSize,
                height: pieceSize,
                // Totalmente sin bordes para que se ensamblen perfecto
                border: "none",
                background: has ? "transparent" : "#1e293b",
                zIndex: dragging === i ? 10 : 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                // Sombra suave para distinguirlas cuando están sueltas, sombra más grande al arrastrar
                boxShadow: dragging === i 
                    ? "0px 15px 30px rgba(0,0,0,0.6)" 
                    : (has ? "0 4px 6px rgba(0,0,0,0.4)" : "none"),
                cursor: has ? "grab" : "not-allowed",
                userSelect: "none",
                opacity: has ? 1 : 0.6,
                overflow: "hidden"
              }}
            >
              {has ? (
                <MapPiece index={i} />
              ) : (
                <div style={{ textAlign: "center" }}>
                  <span style={{ fontSize: 40 }}>🔒</span>
                  <div style={{ fontSize: 12, marginTop: 8 }}>Sala {roomIndex + 1}</div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
        {rooms.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              const next = [...rooms];
              next[i] = true;
              setRooms(next);
            }}
            style={{
              padding: "8px 12px",
              borderRadius: 8,
              border: "none",
              cursor: "pointer",
            }}
          >
            Desbloquear sala {i + 1}
          </button>
        ))}
      </div>

      {allCollected && (
        <div style={{ background: "#1e1b4b", borderRadius: 16, padding: 16, border: "1px solid #6366f1" }}>
          <p style={{ marginTop: 0, color: "#a5b4fc", fontWeight: 700 }}>Diagrama final (Conceptos)</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 6 }}>
            {["🎯 Identificación", "📈 Demanda", "📉 Oferta", "💰 Precio", "🚚 Comercial."].map((t, i) => (
              <div
                key={i}
                style={{
                  background: roomColors[i],
                  padding: "10px 4px",
                  borderRadius: 10,
                  color: "#fff",
                  fontSize: 12,
                  fontWeight: 700,
                  textAlign: "center",
                }}
              >
                {t}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}