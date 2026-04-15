# Operación Agualinda

Juego educativo tipo escape room para la materia de Gestión de Proyectos. El objetivo es avanzar por 5 salas, resolver 11 puzzles y descifrar los códigos que desbloquean cada etapa hasta completar la misión.

## Qué es el juego

La historia ocurre en el municipio de **Agualinda**, que lleva años sin acceso a agua potable. El equipo jugador asume el rol de consultores/as de proyecto y debe resolver retos relacionados con:

- Marco Lógico
- Árbol de problemas
- Indicadores SMART
- Oferta, demanda y elasticidad
- Supuestos y análisis de contexto
- Estudio de mercado

Cada sala contiene una parte del reto. Cuando se resuelve el código de una sala, se avanza a la siguiente.

## Estructura del juego

- **Sala 1: La Crisis de Agualinda**
  - Puzzle 1: Árbol de problemas
  - Puzzle 2: Verdadero o falso
  - Código: `TRONCO`

- **Sala 2: El Laboratorio de Indicadores**
  - Puzzle 3: Clasificación de indicadores
  - Puzzle 4: Indicadores SMART
  - Código: `SMART`

- **Sala 3: El Mercado Oculto**
  - Puzzle 5: Elasticidad precio
  - Puzzle 6: Análisis de oferta y demanda
  - Código: `OFERTA`

- **Sala 4: La Trampa de los Supuestos**
  - Puzzle 7: Autopsia del proyecto fallido
  - Puzzle 8: Priorización de riesgos
  - Código: `PESTEL`

- **Sala 5: El Gran Estudio de Mercado**
  - Puzzle 9: Diseño del estudio de mercado
  - Puzzle 10: Fijación de tarifa social
  - Puzzle 11: Diseño de encuesta
  - Código: `MERCADO`

## Cómo correr el proyecto

### Requisitos

- Node.js 18 o superior
- npm

### Instalación

```bash
npm install
```

### Desarrollo

```bash
npm run dev
```

Vite mostrará la dirección local, normalmente `http://localhost:5173`.

### Build de producción

```bash
npm run build
```

El resultado se genera en la carpeta `dist/`.

### Vista previa del build

```bash
npm run preview
```

## Verificación rápida de funcionamiento

Para revisar que todo está bien antes de entregar:

1. Ejecuta `npm install`.
2. Ejecuta `npm run build` y confirma que no haya errores.
3. Abre el juego con `npm run dev`.
4. Comprueba que puedas avanzar por las 5 salas.
5. Verifica que el panel de progreso del rompecabezas muestre las 5 piezas ganadas al completar las salas.
6. Al llegar al final, confirma que la pantalla de cierre muestra el resumen de tiempos.

## Respuestas y soluciones

### Sala 1

#### Puzzle 1 — Árbol de problemas

- **Causas**
  - Infraestructura hídrica obsoleta o inexistente
  - Bajo presupuesto municipal para servicios públicos
  - Falta de capacitación técnica local en agua y saneamiento
- **Problema central**
  - Comunidad sin acceso a agua potable
- **Efectos**
  - Enfermedades gastrointestinales en la comunidad
  - Alta mortalidad infantil por diarrea y cólera
  - Migración forzada de familias hacia ciudades

#### Puzzle 2 — Verdadero o falso

- El árbol de objetivos se construye invirtiendo el árbol de problemas: **Verdadero**
- Los supuestos son metas que el equipo debe cumplir: **Falso**
- El Marco Lógico tiene 4 columnas y 4 filas: **Verdadero**
- El análisis de involucrados se hace después del presupuesto: **Falso**

**Código de sala:** `TRONCO`

### Sala 2

#### Puzzle 3 — Clasificación de indicadores

- `% de hogares con agua tratada al finalizar el año 1` → **Indicador de Resultado**
- `N° de talleres de capacitación realizados por mes` → **Indicador de Proceso**
- `Reducción de enfermedades GI en 30% a los 24 meses` → **Indicador de Impacto**
- `Km de tubería instalada en la fase de construcción` → **Indicador de Producto**
- `Informes de avance entregados al donante cada trimestre` → **Indicador de Proceso**

#### Puzzle 4 — Indicadores SMART

Las opciones correctas son:

- `Instalar 15 km de red de acueducto en el casco urbano antes del mes 18.`
- `Capacitar al 80% de fontaneros locales en mantenimiento de redes antes del mes 12.`

**Código de sala:** `SMART`

### Sala 3

#### Puzzle 5 — Elasticidad

La demanda es **inelástica**.

#### Puzzle 6 — Oferta y demanda

- Si el precio baja por la instalación de la red, **la demanda aumenta**.
- Si entran tres empresas privadas, **la oferta aumenta y el precio tiende a bajar**.

**Código de sala:** `OFERTA`

### Sala 4

#### Puzzle 7 — Caso del proyecto fallido

- Error principal: **Los supuestos se identificaron pero no se gestionaron ni monitorearon**
- Herramienta que habría anticipado el riesgo político: **Análisis PESTEL (factor político)**
- Columna donde van los supuestos: **Columna 4: Supuestos/Hipótesis**

#### Puzzle 8 — Riesgos críticos

Los 3 supuestos más críticos son:

- El gobierno nacional mantiene la política de subsidios al agua
- La comunidad acepta y coopera con las obras
- El contratista principal no quiebra durante la ejecución

**Código de sala:** `PESTEL`

### Sala 5

#### Puzzle 9 — Estudio de mercado

- Clasificación económica del agua potable: **Bien meritorio/mixto**
- Método para estimar disposición a pagar: **Valoración contingente mediante encuesta**
- Esquema de precios adecuado: **Tarifa diferenciada con subsidio cruzado**
- Canal de distribución correcto: **Red de infraestructura física + operador público o concesión regulada**

#### Puzzle 10 — Tarifa social

La opción correcta es:

- **$1.100 primeros 10 m³ y $2.000 excedente (subsidio cruzado)**

#### Puzzle 11 — Encuesta de mercado

Las preguntas que sí deben incluirse son:

- ¿Cuántos litros de agua consume su hogar por día?
- ¿Cuánto pagaría mensualmente por tener agua potable en su casa?
- ¿Cómo obtiene actualmente el agua para consumo?
- ¿Estaría dispuesto/a a conectarse a una red de acueducto si existiera?
- ¿Qué problemas de salud asocia al agua que consume actualmente?

Las que no deben incluirse son:

- ¿Cuál es su partido político favorito?
- ¿Cuántos hijos tiene?

**Código de sala:** `MERCADO`

## Despliegue en Vercel

El proyecto ya incluye `vercel.json` con esta configuración:

- `buildCommand`: `npm run build`
- `outputDirectory`: `dist`

Eso permite desplegarlo como aplicación Vite en Vercel.

## Estructura principal

- `App.jsx`: lógica completa del juego, salas, puzzles y pantallas
- `src/main.jsx`: punto de entrada de React
- `src/rompe.jsx`: módulo de pruebas del rompecabezas visual
- `index.html`: plantilla base de Vite
- `vite.config.js`: configuración del proyecto
- `vercel.json`: configuración de despliegue en Vercel

## Observaciones

- El juego está pensado para funcionar como una experiencia guiada de aula o equipo.
- El panel de progreso del rompecabezas en la interfaz usa las piezas acumuladas por sala.
- Si quieres cambiar respuestas, códigos o textos, la fuente principal está en `App.jsx`.
