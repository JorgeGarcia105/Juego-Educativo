import { useState, useEffect, useRef } from "react";

// ═══════════════════════════════════════════════════════════════
// DATOS
// ═══════════════════════════════════════════════════════════════

const GLOSSARY = {
  "Marco Lógico": "Herramienta de planificación de proyectos que organiza objetivos, actividades, indicadores y supuestos en una matriz de 4 columnas x 4 filas.",
  "Árbol de Problemas": "Diagrama que representa causas (raíces), problema central (tronco) y efectos (ramas) de una situación negativa.",
  "Indicador SMART": "Específico, Medible, Alcanzable, Relevante y con límite de Tiempo. Permite verificar si se logró el objetivo.",
  "Supuesto": "Condición externa necesaria para el éxito del proyecto, pero fuera del control del equipo gestor.",
  "Elasticidad-precio": "Mide cuánto cambia la cantidad demandada ante un cambio en el precio. Ed = %ΔQd / %ΔP.",
  "Bien meritorio": "Bien que genera beneficios sociales más allá del consumidor individual (ej: agua potable, educación, salud).",
  "Valoración contingente": "Técnica de encuesta para estimar cuánto estarían dispuestos a pagar los usuarios por un bien sin precio de mercado.",
  "Análisis PESTEL": "Analiza factores Políticos, Económicos, Sociales, Tecnológicos, Ecológicos y Legales del entorno del proyecto.",
  "Subsidio Cruzado": "Esquema tarifario donde usuarios de mayores ingresos pagan una tarifa más alta para subsidiar a los de menores ingresos, garantizando acceso universal y sostenibilidad financiera.",
  "Bloque Tarifario": "Estructura de precios escalonada según consumo; los primeros metros cúbicos (bloque básico) tienen precio reducido, y los excedentes son más caros."
};

const ROOMS = [
  {
    id: 0,
    name: "Sala 1",
    subtitle: "La Crisis de Agualinda",
    emoji: "🏚️",
    color: "#f59e0b",
    colorDark: "#92400e",
    bg: "from-amber-900 to-orange-950",
    story: [
      "📡 TRANSMISIÓN DE EMERGENCIA — MUNICIPIO DE AGUALINDA",
      "Consultor/a, el municipio de Agualinda lleva 3 años sin agua potable. Las enfermedades aumentan, los niños no van al colegio, las familias emigran.",
      "Tu equipo fue contratado para diseñar un proyecto de intervención. Antes de proponer soluciones, debes entender el problema usando las herramientas del Marco Lógico.",
      "La primera sala contiene los archivos del diagnóstico. Están desordenados. Organízalos para descifrar el código de acceso.",
    ],
    concept: {
      title: "📚 Concepto clave: Árbol de Problemas",
      body: "El árbol de problemas es una herramienta del Marco Lógico. Funciona así:\n🌱 RAÍCES = Causas del problema (¿por qué ocurre?)\n🌳 TRONCO = El problema central identificado\n🍃 RAMAS = Efectos o consecuencias del problema\n\nPrimero se construye el árbol de problemas, luego se 'invierte' para crear el árbol de objetivos.",
    },
    puzzles: [
      {
        id: "p0a",
        type: "sort",
        title: "🌳 Puzzle 1 — Árbol de Problemas",
        instruction: "Clasifica cada elemento en su nivel correcto del árbol:",
        items: [
          { text: "Enfermedades gastrointestinales en la comunidad", level: "efecto" },
          { text: "Infraestructura hídrica obsoleta o inexistente", level: "causa" },
          { text: "Alta mortalidad infantil por diarrea y cólera", level: "efecto" },
          { text: "Bajo presupuesto municipal para servicios públicos", level: "causa" },
          { text: "Comunidad sin acceso a agua potable", level: "central" },
          { text: "Migración forzada de familias hacia ciudades", level: "efecto" },
          { text: "Falta de capacitación técnica local en agua y saneamiento", level: "causa" },
        ],
        feedback: "¡Excelente! Las causas son los factores que generan el problema (raíces). Los efectos son las consecuencias que sufre la población (ramas). El problema central es la situación negativa que queremos cambiar (tronco).",
      },
      {
        id: "p0b",
        type: "trueFalse",
        title: "✅ Puzzle 2 — ¿Verdadero o Falso?",
        instruction: "Responde verdadero o falso a cada afirmación sobre el Marco Lógico:",
        items: [
          { text: "El árbol de objetivos se construye invirtiendo el árbol de problemas.", answer: true },
          { text: "En el Marco Lógico, los supuestos son metas que el equipo debe cumplir.", answer: false, explanation: "Los supuestos son condiciones EXTERNAS, fuera del control del equipo." },
          { text: "El Marco Lógico tiene 4 columnas y 4 filas.", answer: true },
          { text: "El análisis de involucrados se hace DESPUÉS de definir el presupuesto.", answer: false, explanation: "El análisis de involucrados es uno de los primeros pasos del ML, no el último." },
        ],
        feedback: "¡Correcto! El Marco Lógico sigue un orden: Contexto → Involucrados → Árbol de problemas → Árbol de objetivos → Matriz ML.",
      },
    ],
    code: "TRONCO",
    codeHint: "¿Cómo se llama la parte central del árbol de problemas?",
  },
  {
    id: 1,
    name: "Sala 2",
    subtitle: "El Laboratorio de Indicadores",
    emoji: "📊",
    color: "#6366f1",
    colorDark: "#3730a3",
    bg: "from-indigo-900 to-violet-950",
    story: [
      "🔬 LABORATORIO DE MONITOREO — NIVEL B2",
      "Pasaste el primer filtro. Ahora estás en el laboratorio de seguimiento del proyecto.",
      "El sistema de monitoreo está desconfigurado. Si no configuras bien los indicadores, el proyecto no podrá evaluarse y perderá el financiamiento del BID.",
      "Tienes acceso a los paneles de control. Demuestra que sabes construir y clasificar indicadores.",
    ],
    concept: {
      title: "📚 Concepto clave: Indicadores y Seguimiento",
      body: "Un indicador mide si se logró un objetivo. Tipos:\n📦 Producto: entregables físicos (km de tubería)\n⚙️ Proceso: actividades realizadas (talleres)\n🎯 Resultado: cambios inmediatos (% hogares con acceso)\n🌍 Impacto: cambio estructural a largo plazo (reducción mortalidad)\n\nTodo indicador debe ser SMART: Específico, Medible, Alcanzable, Relevante y con límite de Tiempo.",
    },
    puzzles: [
      {
        id: "p1a",
        type: "match",
        title: "🔗 Puzzle 3 — Clasifica los Indicadores",
        instruction: "Conecta cada indicador con su tipo correcto:",
        pairs: [
          { left: "% de hogares con agua tratada al finalizar el año 1", right: "Indicador de Resultado" },
          { left: "N° de talleres de capacitación realizados por mes", right: "Indicador de Proceso" },
          { left: "Reducción de enfermedades GI en 30% a los 24 meses", right: "Indicador de Impacto" },
          { left: "Km de tubería instalada en la fase de construcción", right: "Indicador de Producto" },
          { left: "Informes de avance entregados al donante cada trimestre", right: "Indicador de Proceso" },
        ],
        feedback: "¡Perfecto! Recuerda: Producto = entregable físico. Proceso = actividad en curso. Resultado = cambio inmediato. Impacto = cambio profundo y duradero.",
      },
      {
        id: "p1b",
        type: "smart",
        title: "🎯 Puzzle 4 — ¿Es SMART este indicador?",
        instruction: "Analiza estos indicadores y selecciona cuáles SÍ cumplen los criterios SMART:",
        items: [
          { text: "Mejorar la calidad del agua en Agualinda.", isSmart: false, reason: "No es específico ni medible. ¿Cuánto mejora? ¿En qué plazo?" },
          { text: "Instalar 15 km de red de acueducto en el casco urbano antes del mes 18.", isSmart: true, reason: "Específico (15 km, casco urbano), medible, alcanzable, relevante y con tiempo definido." },
          { text: "Reducir las enfermedades.", isSmart: false, reason: "Demasiado vago. No tiene meta cuantitativa ni plazo." },
          { text: "Capacitar al 80% de fontaneros locales en mantenimiento de redes antes del mes 12.", isSmart: true, reason: "Tiene porcentaje, grupo objetivo, tema y plazo." },
        ],
        feedback: "Los indicadores SMART evitan ambigüedades. Sin ellos, no se puede saber si el proyecto fue exitoso o no.",
      },
    ],
    code: "SMART",
    codeHint: "Acrónimo de las 5 características que debe tener un buen indicador.",
  },
  {
    id: 2,
    name: "Sala 3",
    subtitle: "El Mercado Oculto",
    emoji: "🏪",
    color: "#10b981",
    colorDark: "#065f46",
    bg: "from-emerald-900 to-teal-950",
    story: [
      "🛒 ZONA COMERCIAL — MERCADO CENTRAL DE AGUALINDA",
      "Saliste del laboratorio. Ahora estás en el mercado local donde los vendedores de agua embotellada tienen el monopolio.",
      "Para diseñar el proyecto necesitas entender el mercado: cuánto paga la gente, cuánto está disponible y qué pasaría si cambian los precios.",
      "Los comerciantes te desafían: si demuestras que entiendes la oferta y la demanda, te dan la pista.",
    ],
    concept: {
      title: "📚 Conceptos: Oferta, Demanda y Elasticidad",
      body: "📈 DEMANDA: Cantidad que los consumidores quieren comprar a cada precio. Relación inversa con el precio.\n📉 OFERTA: Cantidad que los productores ofrecen a cada precio. Relación directa con el precio.\n⚖️ EQUILIBRIO: Punto donde oferta = demanda.\n📐 ELASTICIDAD-PRECIO (Ed): Ed = %ΔQd / %ΔP\n• |Ed| > 1 → Elástica (sensible al precio)\n• |Ed| = 1 → Unitaria\n• |Ed| < 1 → Inelástica (poco sensible)\nEl agua potable suele ser inelástica: la gente la necesita aunque suba el precio.",
    },
    puzzles: [
      {
        id: "p2a",
        type: "calc",
        title: "💰 Puzzle 5 — Calcula la Elasticidad",
        instruction: "Resuelve el caso económico paso a paso:",
        data: {
          scenario: "Una vendedora de agua embotellada sube el precio de $1.000 a $1.500 (+50%). Sus ventas caen de 800 a 600 unidades (-25%).",
          formula: "Ed = %ΔQd ÷ %ΔP",
          steps: [
            "%ΔQd = (600 - 800) / 800 × 100 = -25%",
            "%ΔP = (1.500 - 1.000) / 1.000 × 100 = +50%",
            "Ed = -25% ÷ 50% = -0.5",
            "|Ed| = 0.5 < 1 → Demanda INELÁSTICA",
          ],
          question: "¿Cómo se clasifica esta demanda y qué implica para el precio?",
          options: [
            "Elástica: subir el precio genera grandes pérdidas en ventas",
            "Inelástica: los consumidores siguen comprando aunque suba el precio",
            "Unitaria: el ingreso total permanece constante",
            "Perfectamente inelástica: la demanda no cambia nunca",
          ],
          answer: 1,
        },
        feedback: "Correcto. |Ed| = 0.5 < 1 → Inelástica. El agua es un bien de primera necesidad: aunque suba el precio, la gente la sigue comprando. Esto tiene implicaciones éticas importantes para fijar tarifas en proyectos sociales.",
      },
      {
        id: "p2b",
        type: "scenario",
        title: "🧠 Puzzle 6 — Análisis de Oferta y Demanda",
        instruction: "Lee el escenario y selecciona la respuesta correcta:",
        cases: [
          {
            story: "El gobierno instala la red de agua potable. El precio baja de $3.000 a $800 por m³. ¿Qué esperas que pase con la demanda?",
            options: ["La demanda disminuye porque la gente desconfía", "La demanda aumenta porque el bien es más accesible", "La demanda no cambia porque el agua siempre se necesita igual", "La oferta desaparece"],
            answer: 1,
            explanation: "Ley de la demanda: a menor precio, mayor cantidad demandada. El acceso mejora y el consumo per cápita sube.",
          },
          {
            story: "Tres empresas privadas quieren entrar al mercado de agua en Agualinda. ¿Qué efecto tiene esto sobre la oferta?",
            options: ["La oferta se reduce porque hay más competencia", "La oferta aumenta y el precio tiende a bajar", "El precio sube porque hay más actores", "No tiene ningún efecto"],
            answer: 1,
            explanation: "Mayor número de oferentes → mayor oferta → presión hacia abajo en los precios. Es la dinámica básica del mercado competitivo.",
          },
        ],
        feedback: "¡Dominaste oferta y demanda! Estas relaciones son la base del análisis de mercado en cualquier proyecto.",
      },
    ],
    code: "OFERTA",
    codeHint: "La O de O y D: lo que los productores ponen en el mercado.",
  },
  {
    id: 3,
    name: "Sala 4",
    subtitle: "La Trampa de los Supuestos",
    emoji: "⚠️",
    color: "#ec4899",
    colorDark: "#831843",
    bg: "from-pink-900 to-rose-950",
    story: [
      "🚨 ARCHIVO DE PROYECTOS FALLIDOS — ACCESO RESTRINGIDO",
      "Esta sala huele a fracaso. Las paredes están cubiertas de expedientes de proyectos que nunca terminaron.",
      "Todos fallaron por lo mismo: ignoraron los supuestos y el análisis de contexto.",
      "Debes revisar los casos, identificar los errores y demostrar que tu proyecto no cometerá los mismos.",
    ],
    concept: {
      title: "📚 Conceptos: Supuestos y Análisis de Contexto",
      body: "⚠️ SUPUESTOS: Condiciones externas que DEBEN cumplirse para lograr los objetivos, pero que el equipo NO controla.\nEjemplos: estabilidad política, presupuesto gubernamental, clima, cooperación comunal.\n\n🔍 ANÁLISIS DE CONTEXTO: Examinar el entorno antes de diseñar el proyecto.\nHerramientas:\n• PESTEL: Político, Económico, Social, Tecnológico, Ecológico, Legal\n• Análisis de involucrados (stakeholders)\n• DOFA del proyecto\n\nUn supuesto incumplido puede hundir todo el proyecto.",
    },
    puzzles: [
      {
        id: "p3a",
        type: "caseAnalysis",
        title: "💀 Puzzle 7 — Autopsia del Proyecto Fallido",
        instruction: "Lee el caso y responde las preguntas para entender qué salió mal:",
        scenario: "El proyecto 'Agua Pura' recibió $500 millones del BID. Tenía estos supuestos en la columna 4 del Marco Lógico: (1) El municipio mantiene el cofinanciamiento, (2) No hay conflictos con las comunidades indígenas, (3) Los contratistas entregan materiales a tiempo. A los 8 meses: hubo elecciones y el nuevo alcalde congeló fondos. Una comunidad indígena bloqueó las obras. Los materiales llegaron con 4 meses de retraso. El proyecto fue suspendido.",
        questions: [
          {
            q: "¿Cuál fue el error principal en la gestión de supuestos?",
            opts: ["No había suficiente presupuesto inicial", "Los supuestos se identificaron pero no se gestionaron ni monitorearon", "El Marco Lógico no contempla supuestos políticos", "Los indicadores estaban mal construidos"],
            ans: 1,
            exp: "Identificar supuestos no es suficiente: hay que monitorearlos y tener planes de contingencia.",
          },
          {
            q: "¿Qué herramienta de análisis de contexto habría permitido anticipar el riesgo político?",
            opts: ["Árbol de objetivos", "Diagrama de Gantt", "Análisis PESTEL (factor Político)", "Encuesta de mercado"],
            ans: 2,
            exp: "El PESTEL analiza el entorno político ANTES de iniciar. Habría detectado el riesgo electoral.",
          },
          {
            q: "¿En qué columna de la Matriz del Marco Lógico van los supuestos?",
            opts: ["Columna 1: Resumen Narrativo", "Columna 2: Indicadores", "Columna 3: Medios de Verificación", "Columna 4: Supuestos/Hipótesis"],
            ans: 3,
            exp: "La columna 4 recoge los supuestos para cada nivel de la jerarquía de objetivos.",
          },
        ],
        feedback: "¡Excelente análisis! Los supuestos son la 'zona de riesgo' del proyecto. Identificarlos, monitorearlos y tener planes B es fundamental para el éxito.",
      },
      {
        id: "p3b",
        type: "ranking",
        title: "🎲 Puzzle 8 — Prioriza los Riesgos",
        instruction: "El equipo identificó estos supuestos para el proyecto de Agualinda. Selecciona los 3 MÁS CRÍTICOS (alta probabilidad de incumplimiento + alto impacto):",
        items: [
          { text: "El clima no generará lluvias extremas durante la construcción", critical: false, reason: "Moderado: controlable con seguros y cronograma flexible." },
          { text: "El gobierno nacional mantiene la política de subsidios al agua", critical: true, reason: "CRÍTICO: cambio de política nacional puede eliminar el financiamiento." },
          { text: "La comunidad acepta y coopera con las obras", critical: true, reason: "CRÍTICO: sin aceptación social el proyecto no puede ejecutarse físicamente." },
          { text: "Los ingenieros tienen acceso a internet", critical: false, reason: "Bajo impacto: problema logístico menor." },
          { text: "El contratista principal no quiebra durante la ejecución", critical: true, reason: "CRÍTICO: la quiebra de un contratista principal paraliza las obras." },
          { text: "Los materiales de construcción están disponibles en el mercado", critical: false, reason: "Moderado: puede gestionarse con proveedores alternativos." },
        ],
        feedback: "Gestionar riesgos es priorizar: no todos los supuestos tienen el mismo peso. Los más críticos necesitan planes de contingencia explícitos.",
      },
    ],
    code: "PESTEL",
    codeHint: "Herramienta de análisis de contexto: P-E-S-T-E-L",
  },
  {
    id: 4,
    name: "Sala 5",
    subtitle: "El Gran Estudio de Mercado",
    emoji: "📋",
    color: "#3b82f6",
    colorDark: "#1e3a8a",
    bg: "from-blue-900 to-sky-950",
    story: [
      "🏛️ SALA DE JUNTAS — SEDE CENTRAL DEL PROYECTO",
      "¡Lo lograste! Llegaste a la última sala. La junta financiadora espera tu análisis de mercado.",
      "Tienes que demostrar que el servicio de agua potable tiene demanda real, que entiendes la oferta existente, que puedes fijar precios justos y que sabes cómo comercializar el servicio.",
      "Esta es la presentación más importante. El financiamiento de $2.000 millones depende de ti.",
    ],
    // Concepto mejorado: se muestra como acordeón interactivo (ver renderizado)
    concept: {
      title: "📚 Componentes del Estudio de Mercado",
      components: [
        { name: "🎯 Identificación del bien", desc: "¿Qué tipo de bien es? ¿Es rival/excluible? ¿Genera externalidades?" },
        { name: "📈 Análisis de la demanda", desc: "¿Cuántos usuarios? ¿Cuánto consumen? ¿Disposición a pagar?" },
        { name: "📉 Análisis de la oferta", desc: "¿Quién provee actualmente? ¿Precios y calidad?" },
        { name: "💰 Fijación de precios", desc: "¿Tarifa plana, subsidiada o de mercado? ¿Recuperación de costos?" },
        { name: "🚚 Comercialización", desc: "¿Cómo llega el servicio al usuario? Canales, logística, regulación." },
      ]
    },
    puzzles: [
      {
        id: "p4a",
        type: "build",
        title: "🏗️ Puzzle 9 — Diseña el Estudio de Mercado",
        instruction: "Selecciona la respuesta correcta para cada componente del estudio de mercado:",
        items: [
          {
            component: "Identificación del bien/servicio",
            question: "¿Cómo se clasifica económicamente el agua potable como bien?",
            opts: ["Bien privado puro: rival y excluible", "Bien público puro: no rival y no excluible", "Bien meritorio/mixto: genera externalidades positivas y requiere intervención estatal", "Bien de lujo: alta elasticidad y consumo suntuario"],
            ans: 2,
            exp: "El agua tiene características de bien meritorio: aunque puede tener precio, su provisión pública es necesaria por sus externalidades en salud y desarrollo.",
          },
          {
            component: "Análisis de demanda",
            question: "¿Qué método es más adecuado para estimar la disposición a pagar de una comunidad que nunca ha tenido agua potable?",
            opts: ["Análisis de series históricas de precios", "Valoración contingente mediante encuesta", "Precio del mercado negro existente", "Modelo de precios hedónicos inmobiliarios"],
            ans: 1,
            exp: "La valoración contingente (encuestas) estima cuánto pagarían usuarios por un bien que no tienen. Es el método estándar del BID y Banco Mundial para proyectos sociales.",
          },
          {
            component: "Fijación de precio",
            question: "El municipio quiere cubrir costos operativos pero garantizar acceso universal. ¿Qué esquema de precios es más apropiado?",
            opts: ["Precio de mercado libre: lo que el mercado pague", "Tarifa plana única para todos los usuarios", "Tarifa diferenciada: subsidio cruzado (ricos pagan más, pobres menos)", "Precio cero: el agua debe ser completamente gratuita"],
            ans: 2,
            exp: "El subsidio cruzado (bloques tarifarios) es el modelo más usado en servicios públicos: garantiza acceso a los más pobres mientras recupera costos de los estratos altos.",
          },
          {
            component: "Comercialización",
            question: "¿Cuál es el canal de distribución correcto para agua potable en un municipio rural?",
            opts: ["Venta directa en tiendas de barrio", "Red de infraestructura física + operador público o concesión regulada", "Marketplace digital con delivery", "Franquicias privadas sin regulación"],
            ans: 1,
            exp: "El agua requiere infraestructura (tuberías, plantas de tratamiento) y un operador técnico. La concesión regulada permite eficiencia privada con control público.",
          },
        ],
        feedback: "¡Plan de mercado completo! Identificaste el bien, analizaste la demanda, propusiste precio justo y definiste el canal de distribución correcto.",
      },
      // NUEVO PUZZLE: Simulación de fijación de tarifa
      {
        id: "p4b",
        type: "tariff",
        title: "💧 Puzzle 10 — Fija la Tarifa Social",
        instruction: "Con base en los datos de la encuesta y la elasticidad, selecciona la mejor estructura tarifaria:",
        data: {
          costoProduccion: 800,
          dispPagarPobres: 1200,
          dispPagarMedios: 2500,
          consumoBasico: 10,
          elasticidad: 0.5
        },
        options: [
          { text: "$500 / m³ (subsidio total, recupera <50% de costos)", correct: false, feedback: "Insostenible financieramente. El proyecto colapsaría." },
          { text: "$800 / m³ (recuperación exacta de costos)", correct: false, feedback: "Deja fuera a los hogares más pobres (disposición a pagar $1.200 pero apenas cubre lo básico)." },
          { text: "$1.100 primeros 10 m³ y $2.000 excedente (subsidio cruzado)", correct: true, feedback: "✅ ¡Perfecto! Permite acceso a pobres (tarifa baja para consumo vital) y recupera costos con los estratos altos." },
          { text: "$2.500 / m³ (precio de mercado puro)", correct: false, feedback: "Excluye a la mayoría de la población y genera inequidad." }
        ],
        feedback: "El subsidio cruzado es la mejor práctica en proyectos sociales de agua: asegura sostenibilidad financiera y equidad en el acceso."
      },
      {
        id: "p4c",
        type: "encuesta",
        title: "📝 Puzzle 11 — Diseña la Encuesta de Mercado",
        instruction: "Estás diseñando una encuesta para el estudio de mercado. Selecciona las preguntas que SÍ deben incluirse:",
        items: [
          { text: "¿Cuántos litros de agua consume su hogar por día?", include: true, reason: "Mide la demanda actual/potencial." },
          { text: "¿Cuál es su partido político favorito?", include: false, reason: "Irrelevante para el estudio de mercado del agua." },
          { text: "¿Cuánto pagaría mensualmente por tener agua potable en su casa?", include: true, reason: "Disposición a pagar: clave para fijar tarifas." },
          { text: "¿Cómo obtiene actualmente el agua para consumo?", include: true, reason: "Caracteriza la oferta actual y los sustitutos." },
          { text: "¿Cuántos hijos tiene?", include: false, reason: "Solo relevante si se cruza con consumo, pero no es pregunta de mercado directa." },
          { text: "¿Estaría dispuesto/a a conectarse a una red de acueducto si existiera?", include: true, reason: "Mide intención de demanda: fundamental." },
          { text: "¿Qué problemas de salud asocia al agua que consume actualmente?", include: true, reason: "Justifica la intervención y cuantifica externalidades negativas." },
        ],
        feedback: "Una buena encuesta de mercado es precisa y relevante: solo incluye variables que aportan al análisis de demanda, oferta o precios.",
      },
    ],
    code: "MERCADO",
    codeHint: "Donde se encuentran compradores y vendedores. También el nombre del estudio de esta unidad.",
  },
];

// ═══════════════════════════════════════════════════════════════
// PUZZLES (se mantienen todos los componentes originales, más el nuevo PuzzleTariff)
// ═══════════════════════════════════════════════════════════════

function PuzzleSort({ puzzle, onSolve, color }) {
  const [assignments, setAssignments] = useState({});
  const [error, setError] = useState("");
  const levels = [
    { key: "efecto", label: "🍃 Efecto (ramas)" },
    { key: "central", label: "🌳 Problema Central (tronco)" },
    { key: "causa", label: "🌱 Causa (raíces)" },
  ];
  const assign = (t, l) => { setAssignments(a => ({ ...a, [t]: l })); setError(""); };
  const check = () => {
    if (Object.keys(assignments).length < puzzle.items.length) { setError("Clasifica todos los elementos."); return; }
    if (puzzle.items.every(i => assignments[i.text] === i.level)) onSolve();
    else setError("❌ Hay clasificaciones incorrectas. Revisa e intenta de nuevo.");
  };
  return (
    <div>
      <p style={{ color: "#94a3b8", fontSize: 13, marginBottom: 14, lineHeight: 1.6 }}>{puzzle.instruction}</p>
      {puzzle.items.map((item, i) => (
        <div key={i} style={{ background: "rgba(0,0,0,0.25)", borderRadius: 10, padding: "10px 12px", marginBottom: 8, border: "1px solid rgba(255,255,255,0.08)" }}>
          <p style={{ color: "#f1f5f9", fontSize: 13, margin: "0 0 8px", lineHeight: 1.5 }}>📌 {item.text}</p>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {levels.map(lvl => (
              <button key={lvl.key} onClick={() => assign(item.text, lvl.key)}
                style={{ padding: "4px 10px", fontSize: 11, borderRadius: 20, border: `1.5px solid ${assignments[item.text] === lvl.key ? color : "rgba(255,255,255,0.15)"}`, background: assignments[item.text] === lvl.key ? color + "33" : "transparent", color: assignments[item.text] === lvl.key ? "#fff" : "#94a3b8", cursor: "pointer", transition: "all 0.2s", fontWeight: 600 }}>
                {lvl.label}
              </button>
            ))}
          </div>
        </div>
      ))}
      {error && <p style={{ color: "#f87171", fontSize: 13, marginTop: 8 }}>{error}</p>}
      <button onClick={check} style={btn(color)}>Verificar clasificación ✓</button>
    </div>
  );
}

function PuzzleTrueFalse({ puzzle, onSolve, color }) {
  const [answers, setAnswers] = useState({});
  const [error, setError] = useState("");
  const pick = (i, v) => { setAnswers(a => ({ ...a, [i]: v })); setError(""); };
  const check = () => {
    if (Object.keys(answers).length < puzzle.items.length) { setError("Responde todas las afirmaciones."); return; }
    const wrong = puzzle.items.map((it, i) => answers[i] !== it.answer ? it : null).filter(Boolean);
    if (wrong.length === 0) onSolve();
    else {
      const msg = wrong.map(w => `❌ "${w.text.slice(0, 40)}..." → ${w.explanation || (w.answer ? "Es VERDADERO." : "Es FALSO.")}`).join("\n");
      setError(msg);
    }
  };
  return (
    <div>
      <p style={{ color: "#94a3b8", fontSize: 13, marginBottom: 14 }}>{puzzle.instruction}</p>
      {puzzle.items.map((item, i) => (
        <div key={i} style={{ background: "rgba(0,0,0,0.25)", borderRadius: 10, padding: "12px 14px", marginBottom: 8, border: "1px solid rgba(255,255,255,0.08)" }}>
          <p style={{ color: "#f1f5f9", fontSize: 13, margin: "0 0 10px", lineHeight: 1.5 }}>"{item.text}"</p>
          <div style={{ display: "flex", gap: 8 }}>
            {[true, false].map(v => (
              <button key={String(v)} onClick={() => pick(i, v)}
                style={{ flex: 1, padding: "8px", borderRadius: 8, border: `1.5px solid ${answers[i] === v ? (v ? "#10b981" : "#ef4444") : "rgba(255,255,255,0.15)"}`, background: answers[i] === v ? (v ? "#10b98133" : "#ef444433") : "transparent", color: answers[i] === v ? (v ? "#6ee7b7" : "#fca5a5") : "#94a3b8", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
                {v ? "✅ Verdadero" : "❌ Falso"}
              </button>
            ))}
          </div>
        </div>
      ))}
      {error && <pre style={{ color: "#f87171", fontSize: 12, marginTop: 8, whiteSpace: "pre-wrap", background: "rgba(239,68,68,0.1)", padding: 10, borderRadius: 8 }}>{error}</pre>}
      <button onClick={check} style={btn(color)}>Verificar ✓</button>
    </div>
  );
}

function PuzzleMatch({ puzzle, onSolve, color }) {
  const [sel, setSel] = useState({});
  const [error, setError] = useState("");
  const rights = [...new Set(puzzle.pairs.map(p => p.right))];
  const pick = (i, r) => { setSel(s => ({ ...s, [i]: r })); setError(""); };
  const check = () => {
    if (Object.keys(sel).length < puzzle.pairs.length) { setError("Conecta todos los indicadores."); return; }
    if (puzzle.pairs.every((p, i) => sel[i] === p.right)) onSolve();
    else setError("❌ Alguna conexión es incorrecta. Revisa.");
  };
  return (
    <div>
      <p style={{ color: "#94a3b8", fontSize: 13, marginBottom: 14 }}>{puzzle.instruction}</p>
      {puzzle.pairs.map((p, i) => (
        <div key={i} style={{ background: "rgba(0,0,0,0.25)", borderRadius: 10, padding: "10px 12px", marginBottom: 8, border: "1px solid rgba(255,255,255,0.08)" }}>
          <p style={{ color: "#f1f5f9", fontSize: 13, margin: "0 0 8px" }}>📌 {p.left}</p>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {rights.map(r => (
              <button key={r} onClick={() => pick(i, r)}
                style={{ padding: "4px 10px", fontSize: 11, borderRadius: 20, border: `1.5px solid ${sel[i] === r ? color : "rgba(255,255,255,0.15)"}`, background: sel[i] === r ? color + "33" : "transparent", color: sel[i] === r ? "#fff" : "#94a3b8", cursor: "pointer", fontWeight: 600 }}>
                {r}
              </button>
            ))}
          </div>
        </div>
      ))}
      {error && <p style={{ color: "#f87171", fontSize: 13, marginTop: 8 }}>{error}</p>}
      <button onClick={check} style={btn(color)}>Verificar conexiones ✓</button>
    </div>
  );
}

function PuzzleSmart({ puzzle, onSolve, color }) {
  const [sel, setSel] = useState({});
  const [error, setError] = useState("");
  const pick = (i, v) => { setSel(s => ({ ...s, [i]: v })); setError(""); };
  const check = () => {
    if (Object.keys(sel).length < puzzle.items.length) { setError("Evalúa todos los indicadores."); return; }
    const wrong = puzzle.items.map((it, i) => sel[i] !== it.isSmart ? it : null).filter(Boolean);
    if (wrong.length === 0) onSolve();
    else setError("❌ " + wrong.map(w => `"${w.text.slice(0, 35)}..." → ${w.reason}`).join(" | "));
  };
  return (
    <div>
      <p style={{ color: "#94a3b8", fontSize: 13, marginBottom: 14 }}>{puzzle.instruction}</p>
      {puzzle.items.map((item, i) => (
        <div key={i} style={{ background: "rgba(0,0,0,0.25)", borderRadius: 10, padding: "12px 14px", marginBottom: 8, border: "1px solid rgba(255,255,255,0.08)" }}>
          <p style={{ color: "#f1f5f9", fontSize: 13, margin: "0 0 10px", lineHeight: 1.5 }}>"{item.text}"</p>
          <div style={{ display: "flex", gap: 8 }}>
            {[true, false].map(v => (
              <button key={String(v)} onClick={() => pick(i, v)}
                style={{ flex: 1, padding: "8px", borderRadius: 8, border: `1.5px solid ${sel[i] === v ? (v ? "#10b981" : "#ef4444") : "rgba(255,255,255,0.15)"}`, background: sel[i] === v ? (v ? "#10b98133" : "#ef444433") : "transparent", color: sel[i] === v ? (v ? "#6ee7b7" : "#fca5a5") : "#94a3b8", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
                {v ? "✅ Sí es SMART" : "❌ No es SMART"}
              </button>
            ))}
          </div>
        </div>
      ))}
      {error && <p style={{ color: "#f87171", fontSize: 12, marginTop: 8, lineHeight: 1.6 }}>{error}</p>}
      <button onClick={check} style={btn(color)}>Verificar ✓</button>
    </div>
  );
}

function PuzzleCalc({ puzzle, onSolve, color }) {
  const [ans, setAns] = useState(null);
  const [showSteps, setShowSteps] = useState(false);
  const [error, setError] = useState("");
  const d = puzzle.data;
  const check = () => {
    if (ans === null) { setError("Selecciona una opción."); return; }
    if (ans === d.answer) onSolve();
    else setError("❌ Incorrecto. Revisa los pasos de cálculo.");
  };
  return (
    <div>
      <p style={{ color: "#94a3b8", fontSize: 13, marginBottom: 12 }}>{puzzle.instruction}</p>
      <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: 10, padding: 14, marginBottom: 14, border: `1px solid ${color}33` }}>
        <p style={{ color: "#e2e8f0", fontSize: 13, margin: "0 0 8px", lineHeight: 1.6 }}>📋 {d.scenario}</p>
        <p style={{ color: "#94a3b8", fontSize: 12, margin: 0 }}>📐 Fórmula: <b style={{ color: color }}>{d.formula}</b></p>
        <button onClick={() => setShowSteps(s => !s)} style={{ marginTop: 10, background: "transparent", border: `1px solid ${color}66`, color: color, borderRadius: 8, padding: "5px 12px", fontSize: 12, cursor: "pointer" }}>
          {showSteps ? "Ocultar pasos 👁️" : "Ver pasos de cálculo 🔢"}
        </button>
        {showSteps && <div style={{ marginTop: 10, background: "rgba(0,0,0,0.2)", borderRadius: 8, padding: 10 }}>
          {d.steps.map((s, i) => <p key={i} style={{ color: "#a5b4fc", fontSize: 12, margin: "3px 0", fontFamily: "monospace" }}>→ {s}</p>)}
        </div>}
      </div>
      <p style={{ color: "#f1f5f9", fontSize: 14, fontWeight: 600, margin: "0 0 10px" }}>❓ {d.question}</p>
      {d.options.map((o, i) => (
        <button key={i} onClick={() => { setAns(i); setError(""); }}
          style={{ display: "block", width: "100%", marginBottom: 7, padding: "10px 14px", textAlign: "left", borderRadius: 10, border: `1.5px solid ${ans === i ? color : "rgba(255,255,255,0.1)"}`, background: ans === i ? color + "22" : "rgba(0,0,0,0.2)", color: ans === i ? "#fff" : "#94a3b8", fontSize: 13, cursor: "pointer" }}>
          {["A", "B", "C", "D"][i]}. {o}
        </button>
      ))}
      {error && <p style={{ color: "#f87171", fontSize: 13 }}>{error}</p>}
      <button onClick={check} style={btn(color)}>Confirmar ✓</button>
    </div>
  );
}

function PuzzleScenario({ puzzle, onSolve, color }) {
  const [answers, setAnswers] = useState({});
  const [idx, setIdx] = useState(0);
  const [error, setError] = useState("");
  const [showExp, setShowExp] = useState(false);
  const c = puzzle.cases[idx];
  const pick = (ai) => { setAnswers(a => ({ ...a, [idx]: ai })); setError(""); setShowExp(false); };
  const next = () => {
    if (answers[idx] === undefined) { setError("Selecciona una respuesta."); return; }
    if (answers[idx] !== c.answer) { setShowExp(true); setError("❌ Incorrecto: " + c.explanation); return; }
    if (idx + 1 < puzzle.cases.length) { setIdx(i => i + 1); setError(""); }
    else onSolve();
  };
  return (
    <div>
      <p style={{ color: "#94a3b8", fontSize: 13, marginBottom: 12 }}>{puzzle.instruction} — Caso {idx + 1}/{puzzle.cases.length}</p>
      <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: 10, padding: 14, marginBottom: 14, border: `1px solid ${color}33` }}>
        <p style={{ color: "#e2e8f0", fontSize: 13, lineHeight: 1.6, margin: 0 }}>🎭 {c.story}</p>
      </div>
      {c.options.map((o, i) => (
        <button key={i} onClick={() => pick(i)}
          style={{ display: "block", width: "100%", marginBottom: 7, padding: "10px 14px", textAlign: "left", borderRadius: 10, border: `1.5px solid ${answers[idx] === i ? color : "rgba(255,255,255,0.1)"}`, background: answers[idx] === i ? color + "22" : "rgba(0,0,0,0.2)", color: answers[idx] === i ? "#fff" : "#94a3b8", fontSize: 13, cursor: "pointer" }}>
          {["A", "B", "C", "D"][i]}. {o}
        </button>
      ))}
      {error && <p style={{ color: showExp ? "#fbbf24" : "#f87171", fontSize: 13, marginTop: 8, lineHeight: 1.5 }}>{error}</p>}
      <button onClick={next} style={btn(color)}>
        {idx + 1 < puzzle.cases.length ? "Siguiente caso →" : "Completar ✓"}
      </button>
    </div>
  );
}

function PuzzleCaseAnalysis({ puzzle, onSolve, color }) {
  const [answers, setAnswers] = useState({});
  const [error, setError] = useState("");
  const pick = (qi, ai) => { setAnswers(a => ({ ...a, [qi]: ai })); setError(""); };
  const check = () => {
    if (Object.keys(answers).length < puzzle.questions.length) { setError("Responde todas las preguntas."); return; }
    const wrong = puzzle.questions.map((q, i) => answers[i] !== q.ans ? q : null).filter(Boolean);
    if (wrong.length === 0) onSolve();
    else setError("❌ " + wrong.map(w => w.exp).join(" | "));
  };
  return (
    <div>
      <div style={{ background: "rgba(236,72,153,0.1)", borderRadius: 10, padding: 14, marginBottom: 16, border: "1px solid rgba(236,72,153,0.3)" }}>
        <p style={{ color: "#f9a8d4", fontSize: 12, fontWeight: 700, margin: "0 0 6px" }}>📄 CASO:</p>
        <p style={{ color: "#e2e8f0", fontSize: 12, lineHeight: 1.7, margin: 0 }}>{puzzle.scenario}</p>
      </div>
      <p style={{ color: "#94a3b8", fontSize: 13, marginBottom: 12 }}>{puzzle.instruction}</p>
      {puzzle.questions.map((q, qi) => (
        <div key={qi} style={{ marginBottom: 16 }}>
          <p style={{ color: "#f1f5f9", fontSize: 13, fontWeight: 600, margin: "0 0 8px" }}>❓ {q.q}</p>
          {q.opts.map((o, ai) => (
            <button key={ai} onClick={() => pick(qi, ai)}
              style={{ display: "block", width: "100%", marginBottom: 6, padding: "9px 12px", textAlign: "left", borderRadius: 8, border: `1.5px solid ${answers[qi] === ai ? color : "rgba(255,255,255,0.08)"}`, background: answers[qi] === ai ? color + "22" : "rgba(0,0,0,0.2)", color: answers[qi] === ai ? "#fff" : "#94a3b8", fontSize: 12, cursor: "pointer" }}>
              {["A", "B", "C", "D"][ai]}. {o}
            </button>
          ))}
        </div>
      ))}
      {error && <p style={{ color: "#fbbf24", fontSize: 12, lineHeight: 1.6, marginTop: 8, background: "rgba(251,191,36,0.1)", padding: 10, borderRadius: 8 }}>{error}</p>}
      <button onClick={check} style={btn(color)}>Verificar análisis ✓</button>
    </div>
  );
}

function PuzzleRanking({ puzzle, onSolve, color }) {
  const [sel, setSel] = useState([]);
  const [error, setError] = useState("");
  const toggle = (i) => {
    setSel(s => s.includes(i) ? s.filter(x => x !== i) : s.length < 3 ? [...s, i] : s);
    setError("");
  };
  const check = () => {
    if (sel.length < 3) { setError("Selecciona exactamente 3 supuestos críticos."); return; }
    const criticals = puzzle.items.map((it, i) => it.critical ? i : -1).filter(x => x >= 0);
    const ok = criticals.every(i => sel.includes(i)) && sel.every(i => criticals.includes(i));
    if (ok) onSolve();
    else {
      const wrong = sel.filter(i => !criticals.includes(i));
      setError("❌ " + wrong.map(i => puzzle.items[i].reason).join(" | "));
    }
  };
  return (
    <div>
      <p style={{ color: "#94a3b8", fontSize: 13, marginBottom: 14 }}>{puzzle.instruction} <b style={{ color: color }}>({sel.length}/3 seleccionados)</b></p>
      {puzzle.items.map((item, i) => (
        <button key={i} onClick={() => toggle(i)}
          style={{ display: "block", width: "100%", marginBottom: 7, padding: "10px 14px", textAlign: "left", borderRadius: 10, border: `1.5px solid ${sel.includes(i) ? color : "rgba(255,255,255,0.08)"}`, background: sel.includes(i) ? color + "22" : "rgba(0,0,0,0.2)", color: sel.includes(i) ? "#fff" : "#94a3b8", fontSize: 13, cursor: "pointer" }}>
          {sel.includes(i) ? "🔴 " : "⚪ "}{item.text}
        </button>
      ))}
      {error && <p style={{ color: "#fbbf24", fontSize: 12, marginTop: 8, lineHeight: 1.6, background: "rgba(251,191,36,0.1)", padding: 10, borderRadius: 8 }}>{error}</p>}
      <button onClick={check} style={btn(color)}>Confirmar selección ✓</button>
    </div>
  );
}

function PuzzleBuild({ puzzle, onSolve, color }) {
  const [answers, setAnswers] = useState({});
  const [expanded, setExpanded] = useState(0);
  const [error, setError] = useState("");
  const pick = (ii, ai) => { setAnswers(a => ({ ...a, [ii]: ai })); setError(""); };
  const check = () => {
    if (Object.keys(answers).length < puzzle.items.length) { setError("Completa todos los componentes."); return; }
    const wrong = puzzle.items.map((it, i) => answers[i] !== it.ans ? it : null).filter(Boolean);
    if (wrong.length === 0) onSolve();
    else setError("❌ " + wrong.map(w => w.exp).join(" | "));
  };
  return (
    <div>
      <p style={{ color: "#94a3b8", fontSize: 13, marginBottom: 14 }}>{puzzle.instruction}</p>
      {puzzle.items.map((item, i) => (
        <div key={i} style={{ marginBottom: 10 }}>
          <button onClick={() => setExpanded(expanded === i ? -1 : i)} style={{ width: "100%", textAlign: "left", background: answers[i] !== undefined ? color + "22" : "rgba(0,0,0,0.25)", border: `1.5px solid ${answers[i] !== undefined ? color : "rgba(255,255,255,0.1)"}`, borderRadius: 10, padding: "10px 14px", cursor: "pointer", color: "#f1f5f9", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span><span style={{ color: color, fontWeight: 700, fontSize: 11 }}>COMPONENTE {i + 1}</span><br /><span style={{ fontSize: 13 }}>{item.component}</span></span>
            <span style={{ fontSize: 16 }}>{answers[i] !== undefined ? "✅" : "▼"}</span>
          </button>
          {expanded === i && (
            <div style={{ background: "rgba(0,0,0,0.2)", borderRadius: "0 0 10px 10px", padding: 12, border: `1px solid ${color}22`, borderTop: "none" }}>
              <p style={{ color: "#e2e8f0", fontSize: 13, margin: "0 0 10px" }}>❓ {item.question}</p>
              {item.opts.map((o, ai) => (
                <button key={ai} onClick={() => { pick(i, ai); setExpanded(i + 1); }}
                  style={{ display: "block", width: "100%", marginBottom: 6, padding: "8px 12px", textAlign: "left", borderRadius: 8, border: `1.5px solid ${answers[i] === ai ? color : "rgba(255,255,255,0.08)"}`, background: answers[i] === ai ? color + "22" : "transparent", color: answers[i] === ai ? "#fff" : "#94a3b8", fontSize: 12, cursor: "pointer" }}>
                  {["A", "B", "C", "D"][ai]}. {o}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
      {error && <p style={{ color: "#fbbf24", fontSize: 12, marginTop: 8, lineHeight: 1.6, background: "rgba(251,191,36,0.1)", padding: 10, borderRadius: 8 }}>{error}</p>}
      <button onClick={check} style={btn(color)}>Presentar a la junta 🚀</button>
    </div>
  );
}

// NUEVO COMPONENTE: PuzzleTariff (simulación de fijación de tarifa)
function PuzzleTariff({ puzzle, onSolve, color }) {
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState("");
  const data = puzzle.data;
  const check = () => {
    if (selected === null) return;
    const opt = puzzle.options[selected];
    if (opt.correct) {
      onSolve();
    } else {
      setFeedback(opt.feedback);
    }
  };
  return (
    <div>
      <p style={{ color: "#94a3b8", fontSize: 13, marginBottom: 14 }}>{puzzle.instruction}</p>
      <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: 10, padding: 14, marginBottom: 16, border: `1px solid ${color}33` }}>
        <p style={{ color: "#e2e8f0", fontSize: 13, margin: "0 0 8px" }}>📊 Datos del estudio:</p>
        <ul style={{ color: "#cbd5e1", fontSize: 12, margin: 0, paddingLeft: 20 }}>
          <li>Costo de producción por m³: ${data.costoProduccion}</li>
          <li>Disposición a pagar (hogares pobres): ${data.dispPagarPobres}</li>
          <li>Disposición a pagar (hogares medios): ${data.dispPagarMedios}</li>
          <li>Consumo básico vital: {data.consumoBasico} m³/mes</li>
          <li>Elasticidad-precio de la demanda: {data.elasticidad} (inelástica)</li>
        </ul>
      </div>
      {puzzle.options.map((opt, idx) => (
        <button key={idx} onClick={() => { setSelected(idx); setFeedback(""); }}
          style={{ display: "block", width: "100%", marginBottom: 8, padding: "12px 14px", textAlign: "left", borderRadius: 10, border: `1.5px solid ${selected === idx ? color : "rgba(255,255,255,0.1)"}`, background: selected === idx ? color + "22" : "rgba(0,0,0,0.2)", color: selected === idx ? "#fff" : "#94a3b8", fontSize: 13, cursor: "pointer" }}>
          {["A", "B", "C", "D"][idx]}. {opt.text}
        </button>
      ))}
      {feedback && <p style={{ color: "#fbbf24", fontSize: 13, marginTop: 10, background: "rgba(251,191,36,0.1)", padding: 10, borderRadius: 8 }}>❌ {feedback}</p>}
      <button onClick={check} style={btn(color)}>Confirmar tarifa ✓</button>
    </div>
  );
}

function PuzzleEncuesta({ puzzle, onSolve, color }) {
  const [sel, setSel] = useState({});
  const [error, setError] = useState("");
  const pick = (i, v) => { setSel(s => ({ ...s, [i]: v })); setError(""); };
  const check = () => {
    if (Object.keys(sel).length < puzzle.items.length) { setError("Evalúa todas las preguntas."); return; }
    const wrong = puzzle.items.filter((it, i) => sel[i] !== it.include);
    if (wrong.length === 0) onSolve();
    else setError("❌ " + wrong.map(w => `"${w.text.slice(0, 35)}..." → ${w.reason}`).join(" | "));
  };
  return (
    <div>
      <p style={{ color: "#94a3b8", fontSize: 13, marginBottom: 14 }}>{puzzle.instruction}</p>
      {puzzle.items.map((item, i) => (
        <div key={i} style={{ background: "rgba(0,0,0,0.25)", borderRadius: 10, padding: "10px 12px", marginBottom: 8, border: "1px solid rgba(255,255,255,0.08)" }}>
          <p style={{ color: "#f1f5f9", fontSize: 13, margin: "0 0 8px" }}>❓ "{item.text}"</p>
          <div style={{ display: "flex", gap: 8 }}>
            {[true, false].map(v => (
              <button key={String(v)} onClick={() => pick(i, v)}
                style={{ flex: 1, padding: "7px", borderRadius: 8, border: `1.5px solid ${sel[i] === v ? (v ? color : "#ef4444") : "rgba(255,255,255,0.1)"}`, background: sel[i] === v ? (v ? color + "33" : "#ef444433") : "transparent", color: sel[i] === v ? "#fff" : "#94a3b8", fontWeight: 700, fontSize: 12, cursor: "pointer" }}>
                {v ? "✅ Incluir" : "❌ Excluir"}
              </button>
            ))}
          </div>
        </div>
      ))}
      {error && <p style={{ color: "#fbbf24", fontSize: 12, marginTop: 8, lineHeight: 1.6, background: "rgba(251,191,36,0.1)", padding: 10, borderRadius: 8 }}>{error}</p>}
      <button onClick={check} style={btn(color)}>Aprobar encuesta ✓</button>
    </div>
  );
}

function renderPuzzle(puzzle, onSolve, color) {
  const props = { puzzle, onSolve, color };
  if (puzzle.type === "sort") return <PuzzleSort {...props} />;
  if (puzzle.type === "trueFalse") return <PuzzleTrueFalse {...props} />;
  if (puzzle.type === "match") return <PuzzleMatch {...props} />;
  if (puzzle.type === "smart") return <PuzzleSmart {...props} />;
  if (puzzle.type === "calc") return <PuzzleCalc {...props} />;
  if (puzzle.type === "scenario") return <PuzzleScenario {...props} />;
  if (puzzle.type === "caseAnalysis") return <PuzzleCaseAnalysis {...props} />;
  if (puzzle.type === "ranking") return <PuzzleRanking {...props} />;
  if (puzzle.type === "build") return <PuzzleBuild {...props} />;
  if (puzzle.type === "tariff") return <PuzzleTariff {...props} />;
  if (puzzle.type === "encuesta") return <PuzzleEncuesta {...props} />;
}

const btn = (color) => ({
  marginTop: 14, background: `linear-gradient(135deg, ${color}, ${color}aa)`,
  color: "#fff", border: "none", borderRadius: 10, padding: "12px 24px",
  fontSize: 14, fontWeight: 700, cursor: "pointer", width: "100%",
  boxShadow: `0 4px 20px ${color}44`
});

// ═══════════════════════════════════════════════════════════════
// TIMER HOOK
// ═══════════════════════════════════════════════════════════════
function useTimer() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const ref = useRef();
  useEffect(() => {
    if (running) ref.current = setInterval(() => setSeconds(s => s + 1), 1000);
    else clearInterval(ref.current);
    return () => clearInterval(ref.current);
  }, [running]);
  const start = () => setRunning(true);
  const stop = () => setRunning(false);
  const reset = () => { setSeconds(0); setRunning(false); };
  const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
  return { seconds, fmt: fmt(seconds), start, stop, reset };
}

// ═══════════════════════════════════════════════════════════════
// COMPONENTE DE PUZZLE DE PROGRESO (piezas coleccionables)
// ═══════════════════════════════════════════════════════════════
function PuzzleProgress({ pieces, roomColors }) {
  const [showModal, setShowModal] = useState(false);
  const [dragging, setDragging] = useState(null);
  const [assembled, setAssembled] = useState(false);
  const boardRef = useRef(null);
  const draggingRef = useRef(null);
  const dragOffset = useRef({ x: 0, y: 0 });
  const total = pieces.length;
  const collected = pieces.filter(Boolean).length;
  const allCollected = collected === total;
  const pieceSize = 84;
  const boardWidth = 500;
  const boardHeight = 240;
  const slotY = 24;
  const slotX = 28;
  const slotGap = 92;

  const startPositions = () =>
    Array.from({ length: total }, (_, index) => ({
      x: 24 + (index % 3) * 118,
      y: 124 + Math.floor(index / 3) * 84,
    }));

  const [positions, setPositions] = useState(startPositions);

  const slots = Array.from({ length: total }, (_, index) => ({
    x: slotX + index * slotGap,
    y: slotY,
  }));

  useEffect(() => {
    draggingRef.current = dragging;
  }, [dragging]);

  useEffect(() => {
    if (!allCollected) {
      setAssembled(false);
      setPositions(startPositions());
    }
  }, [allCollected]);

  const finishDrag = () => {
    const activeIndex = draggingRef.current;
    if (activeIndex === null || assembled || !allCollected) return;

    setPositions((currentPositions) => {
      const nextPositions = [...currentPositions];
      const current = nextPositions[activeIndex];
      const target = slots[activeIndex];
      const shouldSnap = Math.abs(current.x - target.x) <= 28 && Math.abs(current.y - target.y) <= 28;

      if (shouldSnap) {
        nextPositions[activeIndex] = { ...target };
      }

      const solved = nextPositions.every((position, index) => position.x === slots[index].x && position.y === slots[index].y);
      if (solved) {
        setAssembled(true);
      }

      return nextPositions;
    });

    draggingRef.current = null;
    setDragging(null);
  };

  useEffect(() => {
    const handleUp = () => finishDrag();
    window.addEventListener("mouseup", handleUp);
    return () => window.removeEventListener("mouseup", handleUp);
  }, [assembled, allCollected, positions]);

  const onBoardMove = (event) => {
    const activeIndex = draggingRef.current;
    if (activeIndex === null || !boardRef.current || assembled || !allCollected) return;

    const rect = boardRef.current.getBoundingClientRect();
    const nextX = event.clientX - rect.left - dragOffset.current.x;
    const nextY = event.clientY - rect.top - dragOffset.current.y;

    setPositions((currentPositions) =>
      currentPositions.map((position, index) =>
        index === activeIndex
          ? {
              x: Math.max(0, Math.min(nextX, boardWidth - pieceSize - 12)),
              y: Math.max(0, Math.min(nextY, boardHeight - pieceSize - 12)),
            }
          : position
      )
    );
  };

  const onPieceDown = (index, event) => {
    if (!allCollected || assembled || !boardRef.current) return;

    const rect = boardRef.current.getBoundingClientRect();
    const current = positions[index];

    dragOffset.current = {
      x: event.clientX - rect.left - current.x,
      y: event.clientY - rect.top - current.y,
    };

    draggingRef.current = index;
    setDragging(index);
  };

  const resetBoard = () => {
    setPositions(startPositions());
    setAssembled(false);
    setDragging(null);
    draggingRef.current = null;
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        style={{
          background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 20,
          padding: "5px 12px", display: "flex", alignItems: "center", gap: 8, cursor: "pointer", color: "#e2e8f0"
        }}
      >
        <span style={{ fontSize: 18 }}>🧩</span>
        <span style={{ fontSize: 13, fontWeight: 600 }}>{collected}/{total}</span>
      </button>
      {showModal && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.8)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}
             onClick={() => setShowModal(false)}>
          <div style={{ background: "#0f0c29", borderRadius: 24, padding: 24, maxWidth: 560, width: "100%", border: "1px solid #6366f1" }} onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h3 style={{ color: "#fff", margin: 0 }}>🧩 Progreso del rompecabezas</h3>
              <button onClick={() => setShowModal(false)} style={{ background: "transparent", border: "none", color: "#fff", fontSize: 20, cursor: "pointer" }}>✕</button>
            </div>
            {!allCollected ? (
              <>
                <p style={{ color: "#94a3b8", fontSize: 13, marginBottom: 20 }}>Cada sala completada te da una pieza. Reúnelas todas para activar el armado final.</p>
                <div style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap" }}>
                  {pieces.map((has, i) => (
                    <div key={i} style={{
                      width: 70, height: 70, borderRadius: 16,
                      background: has ? roomColors[i] : "#2d3748",
                      border: `3px solid ${has ? roomColors[i] : "#4a5568"}`,
                      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                      boxShadow: has ? `0 0 15px ${roomColors[i]}` : "none",
                      transition: "all 0.3s"
                    }}>
                      <span style={{ fontSize: 24 }}>{has ? "🔓" : "🔒"}</span>
                      <span style={{ fontSize: 10, color: has ? "#fff" : "#94a3b8", marginTop: 4 }}>Sala {i+1}</span>
                    </div>
                  ))}
                </div>
                <p style={{ color: "#64748b", fontSize: 12, textAlign: "center", marginTop: 20 }}>Recolectadas: {collected} de {total}</p>
              </>
            ) : assembled ? (
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 60, marginBottom: 14 }}>🏆</div>
                <h3 style={{ color: "#fbbf24", marginBottom: 10 }}>Rompecabezas armado</h3>
                <p style={{ color: "#cbd5e1", fontSize: 13, marginBottom: 18 }}>Las piezas encajaron correctamente y el mapa quedó completo.</p>
                <button onClick={resetBoard} style={btn(roomColors[0])}>Volver a armar</button>
              </div>
            ) : (
              <>
                <p style={{ color: "#94a3b8", fontSize: 13, marginBottom: 14 }}>Arrastra cada pieza a su hueco. Si cae cerca del lugar correcto, se encaja sola.</p>
                <div
                  ref={boardRef}
                  onMouseMove={onBoardMove}
                  onMouseLeave={() => finishDrag()}
                  style={{
                    position: "relative",
                    width: boardWidth,
                    height: boardHeight,
                    borderRadius: 18,
                    background: "#0b1220",
                    border: "1px solid rgba(255,255,255,0.08)",
                    overflow: "hidden",
                    marginBottom: 12,
                  }}
                >
                  <div style={{ position: "absolute", inset: 0, opacity: 0.35, backgroundImage: "linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "92px 84px" }} />
                  {slots.map((slot, index) => (
                    <div
                      key={index}
                      style={{
                        position: "absolute",
                        left: slot.x,
                        top: slot.y,
                        width: pieceSize,
                        height: pieceSize,
                        borderRadius: 16,
                        border: `2px dashed ${roomColors[index]}66`,
                        background: `${roomColors[index]}14`,
                        boxSizing: "border-box",
                      }}
                    />
                  ))}
                  {pieces.map((has, i) => (
                    <div
                      key={i}
                      onMouseDown={(event) => has && onPieceDown(i, event)}
                      style={{
                        position: "absolute",
                        left: positions[i].x,
                        top: positions[i].y,
                        width: pieceSize,
                        height: pieceSize,
                        borderRadius: 16,
                        background: has ? roomColors[i] : "#1f2937",
                        border: "none",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: dragging === i ? "0 16px 34px rgba(0,0,0,0.5)" : "0 4px 14px rgba(0,0,0,0.25)",
                        cursor: has ? "grab" : "not-allowed",
                        userSelect: "none",
                        zIndex: dragging === i ? 4 : 2,
                        opacity: has ? 1 : 0.65,
                        color: "#fff",
                        fontSize: 22,
                        fontWeight: 800,
                      }}
                    >
                      {has ? `Sala ${i + 1}` : "🔒"}
                    </div>
                  ))}
                </div>
                <p style={{ color: "#94a3b8", fontSize: 12, margin: 0 }}>Tip: las piezas solo encajan si las llevas hasta su bloque correcto.</p>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

// ═══════════════════════════════════════════════════════════════
// APP PRINCIPAL
// ═══════════════════════════════════════════════════════════════
export default function App() {
  const [screen, setScreen] = useState("start");
  const [roomIdx, setRoomIdx] = useState(0);
  const [puzzleIdx, setPuzzleIdx] = useState(0);
  const [phase, setPhase] = useState("story");
  const [showConcept, setShowConcept] = useState(false);
  const [codeInput, setCodeInput] = useState("");
  const [codeError, setCodeError] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [roomTimes, setRoomTimes] = useState([]);
  const [glossaryOpen, setGlossaryOpen] = useState(false);
  const [round, setRound] = useState(1);
  const [collectedPieces, setCollectedPieces] = useState(Array(ROOMS.length).fill(false));
  const totalTimer = useTimer();
  const roomTimer = useTimer();
  const room = ROOMS[roomIdx];
  const puzzle = room?.puzzles[puzzleIdx];
  const totalPuzzles = ROOMS.reduce((s, r) => s + r.puzzles.length, 0);
  const donePuzzles = ROOMS.slice(0, roomIdx).reduce((s, r) => s + r.puzzles.length, 0) + puzzleIdx;

  const startGame = () => {
    setScreen("game"); setRoomIdx(0); setPuzzleIdx(0);
    setPhase("story"); setRoomTimes([]); setCollectedPieces(Array(ROOMS.length).fill(false));
    totalTimer.reset(); totalTimer.start();
    roomTimer.reset(); roomTimer.start();
  };

  const onSolvePuzzle = () => {
    if (puzzleIdx + 1 < room.puzzles.length) {
      setPuzzleIdx(p => p + 1);
      setPhase("puzzleFeedback");
    } else {
      setPhase("solved");
    }
  };

  const goNextPuzzle = () => setPhase("puzzle");
  const goToCode = () => { setPhase("code"); setCodeInput(""); setCodeError(""); setShowHint(false); };

  const checkCode = () => {
    if (codeInput.trim().toUpperCase() === room.code) {
      const t = roomTimer.seconds;
      setRoomTimes(rt => [...rt, { name: room.name, subtitle: room.subtitle, time: t, color: room.color }]);
      // Desbloquear pieza de la sala actual
      setCollectedPieces(prev => {
        const newPieces = [...prev];
        newPieces[roomIdx] = true;
        return newPieces;
      });
      roomTimer.reset(); roomTimer.start();
      if (roomIdx + 1 < ROOMS.length) {
        setRoomIdx(r => r + 1); setPuzzleIdx(0); setPhase("story");
        setCodeInput(""); setCodeError(""); setShowHint(false);
      } else {
        totalTimer.stop();
        setScreen("final");
      }
    } else {
      setCodeError("Código incorrecto. Intenta de nuevo.");
    }
  };

  const newRound = () => {
    setRound(r => r + 1);
    setRoomIdx(0); setPuzzleIdx(0); setPhase("story");
    setRoomTimes([]); setCollectedPieces(Array(ROOMS.length).fill(false));
    totalTimer.reset(); totalTimer.start();
    roomTimer.reset(); roomTimer.start();
  };

  // Glosario
  const GlossaryPanel = () => (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.85)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ background: "#1e1b4b", borderRadius: 20, padding: 24, maxWidth: 500, width: "100%", maxHeight: "80vh", overflowY: "auto", border: "1px solid rgba(99,102,241,0.4)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ color: "#a5b4fc", margin: 0 }}>📖 Glosario de la Unidad 3</h3>
          <button onClick={() => setGlossaryOpen(false)} style={{ background: "transparent", border: "none", color: "#94a3b8", fontSize: 20, cursor: "pointer" }}>✕</button>
        </div>
        {Object.entries(GLOSSARY).map(([term, def]) => (
          <div key={term} style={{ marginBottom: 14, paddingBottom: 14, borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
            <p style={{ color: "#818cf8", fontWeight: 700, fontSize: 13, margin: "0 0 4px" }}>{term}</p>
            <p style={{ color: "#cbd5e1", fontSize: 12, margin: 0, lineHeight: 1.6 }}>{def}</p>
          </div>
        ))}
      </div>
    </div>
  );

  // Pantalla de inicio
  if (screen === "start") return (
    <div style={{ minHeight: "100vh", background: "radial-gradient(ellipse at 20% 50%, #1e1b4b 0%, #0f0c29 50%, #0d1117 100%)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      {glossaryOpen && <GlossaryPanel />}
      <div style={{ maxWidth: 560, width: "100%" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 72, marginBottom: 12, filter: "drop-shadow(0 0 30px rgba(99,102,241,0.6))", animation: "pulse 2s infinite" }}>🧩</div>
          <div style={{ display: "inline-block", background: "linear-gradient(135deg, #6366f1, #ec4899, #f59e0b)", borderRadius: 4, padding: "2px 12px", marginBottom: 12 }}>
            <span style={{ color: "#fff", fontSize: 11, fontWeight: 800, letterSpacing: 3 }}>ESCAPE ROOM — RONDA {round}</span>
          </div>
          <h1 style={{ color: "#fff", fontSize: 32, fontWeight: 900, margin: "8px 0 4px", lineHeight: 1.1 }}>
            OPERACIÓN<br /><span style={{ background: "linear-gradient(135deg, #6366f1, #ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>AGUALINDA</span>
          </h1>
          <p style={{ color: "#64748b", fontSize: 14, margin: 0 }}>Gestión de Proyectos · Unidad 3</p>
        </div>
        <div style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(236,72,153,0.1))", borderRadius: 16, padding: 20, marginBottom: 20, border: "1px solid rgba(99,102,241,0.3)" }}>
          <p style={{ color: "#a5b4fc", fontWeight: 700, fontSize: 13, margin: "0 0 8px" }}>🎯 TU MISIÓN</p>
          <p style={{ color: "#cbd5e1", fontSize: 13, margin: 0, lineHeight: 1.7 }}>
            El municipio de <b style={{ color: "#f1f5f9" }}>Agualinda</b> lleva 3 años sin agua potable. Eres el/la consultor/a de proyectos designado/a. Debes atravesar <b style={{ color: "#f1f5f9" }}>5 salas</b>, resolver <b style={{ color: "#f1f5f9" }}>{totalPuzzles} puzzles</b> aplicando los conceptos de la Unidad 3, y descifrar los códigos que abren cada puerta antes de que otro grupo lo haga.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
          {ROOMS.map(r => (
            <div key={r.id} style={{ background: r.color + "15", borderRadius: 12, padding: "10px 14px", border: `1px solid ${r.color}33` }}>
              <div style={{ fontSize: 20, marginBottom: 4 }}>{r.emoji}</div>
              <p style={{ color: r.color, fontSize: 11, fontWeight: 700, margin: "0 0 2px" }}>{r.name}</p>
              <p style={{ color: "#64748b", fontSize: 11, margin: 0 }}>{r.subtitle}</p>
              <p style={{ color: "#475569", fontSize: 11, margin: "4px 0 0" }}>{r.puzzles.length} puzzles</p>
            </div>
          ))}
          <div style={{ background: "rgba(251,191,36,0.1)", borderRadius: 12, padding: "10px 14px", border: "1px solid rgba(251,191,36,0.3)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <div style={{ fontSize: 24 }}>🏆</div>
            <p style={{ color: "#fbbf24", fontSize: 11, fontWeight: 700, margin: "4px 0 0", textAlign: "center" }}>Ranking final</p>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
          <button onClick={startGame} style={{ flex: 2, background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "#fff", border: "none", borderRadius: 12, padding: "14px", fontSize: 16, fontWeight: 800, cursor: "pointer", boxShadow: "0 8px 32px rgba(99,102,241,0.4)" }}>
            🚀 Iniciar Misión
          </button>
          <button onClick={() => setGlossaryOpen(true)} style={{ flex: 1, background: "rgba(255,255,255,0.06)", color: "#94a3b8", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 12, padding: "14px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
            📖 Glosario
          </button>
        </div>
        <p style={{ color: "#334155", fontSize: 11, textAlign: "center" }}>⏱️ ~30–40 min · 👥 5 grupos · {totalPuzzles} puzzles · multironda</p>
      </div>
    </div>
  );

  // Pantalla final
  if (screen === "final") return (
    <div style={{ minHeight: "100vh", background: "radial-gradient(ellipse at 50% 0%, #1a0a2e 0%, #0f0c29 60%, #0d1117 100%)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      <div style={{ maxWidth: 520, width: "100%" }}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{ fontSize: 72, marginBottom: 8 }}>🏆</div>
          <div style={{ background: "linear-gradient(135deg, #fbbf24, #f59e0b)", borderRadius: 4, display: "inline-block", padding: "2px 14px", marginBottom: 10 }}>
            <span style={{ color: "#000", fontSize: 11, fontWeight: 800, letterSpacing: 2 }}>MISIÓN COMPLETADA · RONDA {round}</span>
          </div>
          <h2 style={{ color: "#fff", fontSize: 26, fontWeight: 900, margin: "0 0 4px" }}>¡Agualinda tiene agua!</h2>
          <p style={{ color: "#64748b", fontSize: 14 }}>Tiempo total: <b style={{ color: "#fbbf24", fontSize: 18 }}>{totalTimer.fmt}</b></p>
        </div>
        <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 16, padding: 20, marginBottom: 16, border: "1px solid rgba(255,255,255,0.08)" }}>
          <p style={{ color: "#94a3b8", fontWeight: 700, fontSize: 13, margin: "0 0 12px" }}>⏱️ Tiempo por sala</p>
          {roomTimes.map((rt, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: i < roomTimes.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
              <span style={{ color: rt.color, fontSize: 13, fontWeight: 600 }}>{ROOMS[i]?.emoji} {rt.subtitle}</span>
              <span style={{ color: "#e2e8f0", fontSize: 14, fontWeight: 800, fontFamily: "monospace" }}>{String(Math.floor(rt.time / 60)).padStart(2, "0")}:{String(rt.time % 60).padStart(2, "0")}</span>
            </div>
          ))}
        </div>
        {/* Rompecabezas completo en pantalla final */}
        <div style={{ background: "rgba(59,130,246,0.1)", borderRadius: 16, padding: 20, marginBottom: 20, border: "1px solid #3b82f6" }}>
          <p style={{ color: "#60a5fa", fontWeight: 700, fontSize: 14, margin: "0 0 12px" }}>🧩 Rompecabezas del Estudio de Mercado</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 6 }}>
            {["🎯 Identificación", "📈 Demanda", "📉 Oferta", "💰 Precio", "🚚 Comercialización"].map((t, i) => (
              <div key={i} style={{ background: ROOMS[i].color, padding: "10px 4px", borderRadius: 10, color: "#fff", fontSize: 12, fontWeight: 700, textAlign: "center" }}>{t}</div>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={newRound} style={{ flex: 1, background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "#fff", border: "none", borderRadius: 12, padding: "14px", fontSize: 14, fontWeight: 800, cursor: "pointer", boxShadow: "0 8px 24px rgba(99,102,241,0.35)" }}>
            🔄 Ronda {round + 1}
          </button>
          <button onClick={() => { setScreen("start"); setRound(1); }} style={{ flex: 1, background: "rgba(255,255,255,0.05)", color: "#94a3b8", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "14px", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
            🏠 Inicio
          </button>
        </div>
      </div>
    </div>
  );

  // Juego principal
  const progressPct = (donePuzzles / totalPuzzles) * 100;
  return (
    <div style={{ minHeight: "100vh", background: `radial-gradient(ellipse at 30% 20%, ${room.color}22 0%, #0f0c29 50%, #0d1117 100%)`, display: "flex", alignItems: "center", justifyContent: "center", padding: 16, fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      {glossaryOpen && <GlossaryPanel />}
      <div style={{ maxWidth: 560, width: "100%" }}>
        {/* TOP BAR con puzzle progress */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            {ROOMS.map((r, i) => (
              <div key={i} style={{ width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, background: i < roomIdx ? "#10b981" : i === roomIdx ? r.color : "rgba(255,255,255,0.07)", border: `2px solid ${i === roomIdx ? r.color : "transparent"}`, boxShadow: i === roomIdx ? `0 0 12px ${r.color}88` : "none", transition: "all 0.3s" }}>
                {i < roomIdx ? "✓" : r.emoji}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <PuzzleProgress pieces={collectedPieces} roomColors={ROOMS.map(r => r.color)} />
            <button onClick={() => setGlossaryOpen(true)} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#94a3b8", borderRadius: 8, padding: "4px 10px", fontSize: 11, cursor: "pointer" }}>📖 Glosario</button>
            <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: 8, padding: "4px 10px", border: `1px solid ${room.color}44` }}>
              <span style={{ color: room.color, fontWeight: 800, fontSize: 14, fontFamily: "monospace" }}>⏱️ {totalTimer.fmt}</span>
            </div>
          </div>
        </div>
        {/* Barra de progreso */}
        <div style={{ background: "rgba(255,255,255,0.07)", borderRadius: 6, height: 5, marginBottom: 16, overflow: "hidden" }}>
          <div style={{ height: 5, borderRadius: 6, background: `linear-gradient(90deg, ${room.color}, #6366f1)`, width: `${progressPct}%`, transition: "width 0.5s" }} />
        </div>
        {/* Tarjeta principal */}
        <div style={{ background: "rgba(10,8,30,0.85)", backdropFilter: "blur(20px)", borderRadius: 20, border: `1px solid ${room.color}44`, boxShadow: `0 20px 60px rgba(0,0,0,0.5), 0 0 40px ${room.color}11`, overflow: "hidden" }}>
          <div style={{ background: `linear-gradient(135deg, ${room.color}33, ${room.color}11)`, padding: "16px 20px", borderBottom: `1px solid ${room.color}33` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <span style={{ color: room.color, fontSize: 11, fontWeight: 800, letterSpacing: 2 }}>{room.name.toUpperCase()}</span>
                <h2 style={{ color: "#fff", fontSize: 18, fontWeight: 800, margin: "2px 0 0" }}>{room.emoji} {room.subtitle}</h2>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ color: "#64748b", fontSize: 10, margin: 0 }}>SALA</p>
                <p style={{ color: room.color, fontWeight: 800, fontSize: 18, margin: 0 }}>{roomTimer.fmt}</p>
              </div>
            </div>
          </div>
          <div style={{ padding: "20px 20px 24px" }}>
            {phase === "story" && (
              <div>
                <div style={{ marginBottom: 16 }}>
                  {room.story.map((line, i) => (
                    <p key={i} style={{ color: i === 0 ? room.color : "#cbd5e1", fontSize: i === 0 ? 11 : 13, fontWeight: i === 0 ? 800 : 400, margin: "0 0 10px", lineHeight: 1.7, letterSpacing: i === 0 ? 1 : 0 }}>{line}</p>
                  ))}
                </div>
                {/* Concepto mejorado para Sala 5 (acordeón) */}
                {room.id === 4 ? (
                  <div style={{ marginBottom: 14 }}>
                    <p style={{ color: room.color, fontWeight: 700, fontSize: 13, marginBottom: 8 }}>📚 {room.concept.title}</p>
                    {room.concept.components.map((comp, idx) => (
                      <details key={idx} style={{ background: "rgba(0,0,0,0.2)", borderRadius: 8, padding: "8px 12px", marginBottom: 6, border: `1px solid ${room.color}33` }}>
                        <summary style={{ color: room.color, fontWeight: 600, fontSize: 13, cursor: "pointer" }}>{comp.name}</summary>
                        <p style={{ color: "#cbd5e1", fontSize: 12, margin: "8px 0 0", lineHeight: 1.5 }}>{comp.desc}</p>
                      </details>
                    ))}
                  </div>
                ) : (
                  <button onClick={() => setShowConcept(s => !s)} style={{ width: "100%", background: `${room.color}15`, border: `1px solid ${room.color}44`, borderRadius: 10, padding: "10px 14px", cursor: "pointer", textAlign: "left", marginBottom: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ color: room.color, fontSize: 13, fontWeight: 700 }}>📚 Ver concepto clave antes de empezar</span>
                    <span style={{ color: room.color, fontSize: 16 }}>{showConcept ? "▲" : "▼"}</span>
                  </button>
                )}
                {room.id !== 4 && showConcept && (
                  <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: 10, padding: 14, marginBottom: 14, border: `1px solid ${room.color}22` }}>
                    <p style={{ color: room.color, fontWeight: 700, fontSize: 13, margin: "0 0 8px" }}>{room.concept.title}</p>
                    <pre style={{ color: "#cbd5e1", fontSize: 12, margin: 0, whiteSpace: "pre-wrap", lineHeight: 1.8, fontFamily: "'Segoe UI', sans-serif" }}>{room.concept.body}</pre>
                  </div>
                )}
                <button onClick={() => { setShowConcept(false); setPhase("puzzle"); }} style={btn(room.color)}>
                  Entrar a la sala {room.emoji} →
                </button>
              </div>
            )}

            {phase === "puzzle" && puzzle && (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                  <p style={{ color: room.color, fontSize: 11, fontWeight: 800, margin: 0, letterSpacing: 1 }}>PUZZLE {donePuzzles + 1}/{totalPuzzles}</p>
                  <span style={{ color: "#475569", fontSize: 11 }}>Sala {roomIdx + 1} · {puzzleIdx + 1}/{room.puzzles.length}</span>
                </div>
                <h3 style={{ color: "#f1f5f9", fontSize: 16, fontWeight: 700, margin: "0 0 14px" }}>{puzzle.title}</h3>
                {renderPuzzle(puzzle, onSolvePuzzle, room.color)}
              </div>
            )}

            {phase === "puzzleFeedback" && (
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 52, marginBottom: 8 }}>✅</div>
                <h3 style={{ color: "#10b981", fontSize: 18, fontWeight: 800, margin: "0 0 10px" }}>¡Puzzle resuelto!</h3>
                <div style={{ background: "rgba(16,185,129,0.1)", borderRadius: 12, padding: 14, marginBottom: 20, textAlign: "left", border: "1px solid rgba(16,185,129,0.2)" }}>
                  <p style={{ color: "#6ee7b7", fontSize: 13, margin: 0, lineHeight: 1.7 }}>💡 {ROOMS[roomIdx].puzzles[puzzleIdx - 1]?.feedback}</p>
                </div>
                <p style={{ color: "#64748b", fontSize: 13, marginBottom: 16 }}>Siguiente puzzle en esta sala...</p>
                <button onClick={goNextPuzzle} style={btn(room.color)}>Continuar →</button>
              </div>
            )}

            {phase === "solved" && (
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 52, marginBottom: 8 }}>🎉</div>
                <h3 style={{ color: "#fbbf24", fontSize: 20, fontWeight: 800, margin: "0 0 6px" }}>¡Sala completada!</h3>
                <div style={{ background: "rgba(16,185,129,0.1)", borderRadius: 12, padding: 14, marginBottom: 16, textAlign: "left", border: "1px solid rgba(16,185,129,0.2)" }}>
                  <p style={{ color: "#6ee7b7", fontSize: 13, margin: 0, lineHeight: 1.7 }}>💡 {room.puzzles[room.puzzles.length - 1]?.feedback}</p>
                </div>
                <p style={{ color: "#64748b", fontSize: 13, marginBottom: 16 }}>Ahora descifra el código de la puerta para avanzar.</p>
                <button onClick={goToCode} style={btn(room.color)}>🔑 Buscar el código</button>
              </div>
            )}

            {phase === "code" && (
              <div>
                <div style={{ textAlign: "center", marginBottom: 20 }}>
                  <div style={{ fontSize: 48, marginBottom: 8 }}>🔐</div>
                  <h3 style={{ color: "#fff", fontSize: 18, fontWeight: 800, margin: "0 0 6px" }}>Código de la puerta</h3>
                  <p style={{ color: "#64748b", fontSize: 13 }}>Está escondido en los conceptos que aplicaste.</p>
                </div>
                <input value={codeInput} onChange={e => { setCodeInput(e.target.value.toUpperCase()); setCodeError(""); }} onKeyDown={e => e.key === "Enter" && checkCode()}
                  placeholder="ESCRIBE EL CÓDIGO"
                  style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: `1.5px solid ${room.color}66`, borderRadius: 12, padding: "14px", color: "#fff", fontSize: 20, fontWeight: 800, textAlign: "center", letterSpacing: 6, outline: "none", boxSizing: "border-box", marginBottom: 10, fontFamily: "monospace" }} />
                {codeError && <p style={{ color: "#f87171", fontSize: 13, marginBottom: 8, textAlign: "center" }}>{codeError}</p>}
                <button onClick={() => setShowHint(h => !h)} style={{ width: "100%", background: "transparent", border: "1px solid rgba(255,255,255,0.12)", color: "#64748b", borderRadius: 8, padding: "8px", fontSize: 12, cursor: "pointer", marginBottom: 10 }}>
                  {showHint ? "Ocultar pista" : "💡 Ver pista"}
                </button>
                {showHint && <p style={{ color: "#fbbf24", fontSize: 13, textAlign: "center", marginBottom: 12, background: "rgba(251,191,36,0.1)", padding: 10, borderRadius: 8 }}>🔎 {room.codeHint}</p>}
                <button onClick={checkCode} style={btn(room.color)}>
                  {roomIdx + 1 < ROOMS.length ? "Abrir puerta y avanzar →" : "🏆 Completar misión"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}