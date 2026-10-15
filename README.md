# Centro de Simuladores de Examen

Aplicación estática en HTML, CSS y JavaScript, con diez módulos y selección de hasta 20 preguntas distintas por examen. No necesita compilación ni dependencias para ejecutarse.

## Desarrollo local

Desde este directorio:

```bash
python3 -m http.server 8000
```

Abrir `http://localhost:8000`. Los bancos se cargan con Fetch: se necesita un servidor HTTP y acceso al banco al iniciar. No existe soporte offline garantizado ni persistencia de respuestas al recargar la página.

## Módulos y duración

| Módulo | Minutos |
| --- | --- |
| Métrica V3 | 20 |
| Ingeniería de Software | 20 |
| Proyecto Final de Carrera III | 20 |
| Formación de Empresas III | 20 |
| Bioinformática | 20 |
| Seguridad Computacional | 25 |
| Computación y Sociedad | 25 |
| Internet de las Cosas | 25 |
| Matemática Aplicada | 30 |
| Experiencia de Usuario | 30 |

## Organización

- `index.html`: catálogo de módulos.
- `<modulo>/index.html`: presentación e instrucciones.
- `<modulo>/main.html`: interfaz del examen y estilos del módulo.
- `<modulo>/preguntas.json`: banco activo.
- `assets/exam-core.js`: validación, selección Fisher-Yates sin enunciados repetidos, tiempo y escape de texto.
- `assets/ui.css`: estilo compartido y adaptación a móviles de las 21 pantallas.
- `assets/catalog.js`: búsqueda local de módulos por nombre y descripción, ignorando tildes.
- `assets/exam.js`: motor compartido por ocho módulos; duración en `data-duration` del elemento `body`.
- Bioinformática y Computación y Sociedad conservan sus interfaces y navegación propias y utilizan las utilidades comunes.
- `tests/exam.test.cjs`: verificaciones sin dependencias, para Node.js 18 o superior.
- `vercel.json`: configuración existente de alojamiento.

Los archivos `test-randomization.js` son auxiliares históricos: las páginas actuales no los cargan. El banco raíz y `seguridad-computacional/preguntas1.json` tampoco se usan en los exámenes actuales.

## Formato de preguntas

```json
[
  {
    "question": "Texto de la pregunta",
    "options": ["Opción A", "Opción B", "Opción C", "Opción D"],
    "answer": 1,
    "explanation": "Explicación opcional"
  }
]
```

`answer` es un índice desde cero. Cada pregunta requiere un enunciado, al menos dos opciones de texto y un índice válido. La selección conserva el orden de las opciones. Si se repite un enunciado (ignorando espacios al inicio y final), se usa la primera aparición para seleccionar el examen. Los bancos originales se conservan.

## Verificación

```bash
node --test tests/exam.test.cjs
```

Incluye validación de los diez bancos activos, selección sin duplicados y sin modificar los datos originales, vencimiento del tiempo, escape de contenido, enlaces locales, sintaxis de scripts y flujo del motor compartido con un DOM simulado: carga, puntuación, reinicio y vencimiento. Esta comprobación no sustituye una revisión visual en un navegador.

## Agregar un módulo

Copiar una interfaz que utilice el motor compartido, ajustar su título, estilos, duración y banco; añadir un enlace al catálogo. El motor busca `./preguntas.json` relativo a la página del examen. Al reiniciar reutiliza el banco ya cargado y selecciona un conjunto nuevo.

Las páginas que incluyen `/_vercel/insights/script.js` utilizan Vercel Analytics cuando está disponible en el alojamiento.
