# 🎓 Centro de Simuladores de Examen

Un centro de simuladores de examen interactivo con múltiples módulos especializados, desarrollado con HTML, CSS y JavaScript vanilla.

## 🚀 Características Principales

- 🏛️ **Centro de Simuladores** con selección de módulos
- 📚 **Múltiples áreas de conocimiento** (Métrica V3, Ingeniería de Software)
- ✅ **20 preguntas aleatorias** por examen
- ⏱️ **Temporizador de 20 minutos** por examen
- 🎨 **Interfaz moderna** con tema oscuro y colores diferenciados por módulo
- 📊 **Resultados detallados** con puntuación y respuestas correctas
- 📱 **Responsive design** para móviles y desktop
- 🔄 **Navegación fluida** entre módulos

## � Módulos Disponibles

### 📋 Métrica V3
- **Tema**: Metodología de desarrollo de sistemas de información
- **Procesos**: PSI, ASI, DSI, CSI, IAS
- **Color**: Verde
- **Preguntas**: Enfocadas en la metodología española de desarrollo de SI

### 💻 Ingeniería de Software
- **Tema**: Principios y prácticas de desarrollo de software
- **Áreas**: Metodologías ágiles, UML, Patrones de diseño, Arquitectura
- **Color**: Azul
- **Preguntas**: Covering SOLID principles, design patterns, testing, DevOps

## �🛠️ Tecnologías

- HTML5
- CSS3 (Variables CSS, Grid, Flexbox, Animaciones)
- JavaScript ES6+ (Async/Await, Fetch API, Modules)
- Vercel Analytics

## 📦 Estructura del Proyecto

```
├── index.html              # Centro de Simuladores (página principal)
├── metrica/                # Módulo Métrica V3
│   ├── index.html          # Página de inicio del módulo
│   ├── main.html           # Simulador de Métrica V3
│   ├── preguntas.json      # Preguntas de Métrica V3
│   └── test-randomization.js # Script de aleatorización
├── software/               # Módulo Ingeniería de Software
│   ├── index.html          # Página de inicio del módulo
│   ├── main.html           # Simulador de Ingeniería de Software
│   ├── preguntas.json      # Preguntas de Ingeniería de Software
│   └── test-randomization.js # Script de aleatorización
├── main.html               # (Legacy) Simulador original
├── preguntas.json          # (Legacy) Preguntas originales
├── test-randomization.js   # (Legacy) Script original
├── vercel.json             # Configuración de Vercel
└── README.md               # Este archivo
```

## 🚀 Despliegue

### Vercel (Recomendado)
1. Haz fork de este repositorio
2. Conecta tu cuenta de Vercel con GitHub
3. Importa el proyecto desde Vercel
4. ¡Automáticamente desplegado!

### Desarrollo Local
```bash
# Servir archivos localmente (Python)
python -m http.server 8000

# O con Node.js
npx serve .

# O con Live Server (VS Code Extension)
# Abrir index.html con Live Server
```

## 📊 Formato de Preguntas

Las preguntas están almacenadas en archivos JSON con el siguiente formato:
```json
{
{
  "question": "Texto de la pregunta",
  "options": ["Opción A", "Opción B", "Opción C", "Opción D"],
  "answer": 1,
  "explanation": "Explicación de la respuesta correcta (opcional)"
}
```

## 🎯 Funcionalidades por Módulo

### Funcionalidades Comunes
- ✅ Selección aleatoria de 20 preguntas por examen
- ⏱️ Temporizador con finalización automática
- 💾 Guardado temporal de respuestas
- 🎨 Visualización de resultados con colores
- ✔️ Identificación de respuestas correctas e incorrectas
- 🔙 Navegación de regreso al centro de simuladores

### Características Específicas
- 🎨 **Esquemas de colores diferenciados** por módulo
- � **Analytics integrado** con Vercel
- 🔄 **Animaciones suaves** de transición
- �📱 **Diseño responsive** optimizado

## 🎮 Cómo Usar

1. **Accede al Centro de Simuladores**: Abre `index.html`
2. **Selecciona un módulo**: Haz clic en la tarjeta del módulo deseado
3. **Lee las instrucciones**: Revisa la información del examen
4. **Inicia el examen**: Haz clic en "Iniciar Examen"
5. **Responde las preguntas**: Tienes 20 minutos para completar 20 preguntas
6. **Revisa tus resultados**: Al finalizar verás tu puntuación y respuestas correctas
7. **Vuelve al inicio**: Usa el botón "Volver al inicio" para elegir otro módulo

## 📱 Compatibilidad

- ✅ **Navegadores**: Chrome, Firefox, Safari, Edge
- ✅ **Dispositivos**: Desktop, tablets, móviles
- ✅ **Offline**: Funciona offline una vez cargado
- ✅ **Responsive**: Optimizado para todas las pantallas

## 🎨 Personalización

### Agregar un Nuevo Módulo
1. Crear directorio: `nuevo-modulo/`
2. Copiar estructura base de otro módulo
3. Personalizar `preguntas.json` con nuevas preguntas
4. Actualizar colores CSS en el tema del módulo
5. Agregar tarjeta del módulo en `index.html`

### Modificar Preguntas
- Editar archivos `preguntas.json` en cada módulo
- Mantener el formato JSON especificado
- Agregar explicaciones para mejor comprensión

## 🚀 Características Técnicas

- **Algoritmo Fisher-Yates** para aleatorización real de preguntas
- **Local Storage** para persistencia temporal de respuestas
- **CSS Grid y Flexbox** para layouts responsivos
- **Vanilla JavaScript** sin dependencias externas
- **Vercel Analytics** para métricas de uso

## 📊 Métricas y Analytics

El proyecto incluye integración con Vercel Analytics para rastrear:
- Selección de módulos
- Inicio de exámenes
- Patrones de uso
- Performance del sitio

## 🤝 Contribuir

1. **Fork** el proyecto
2. **Crea una rama**: `git checkout -b feature/nueva-funcionalidad`
3. **Agrega tus cambios**: Nuevos módulos, preguntas, mejoras
4. **Commit**: `git commit -am 'Añadir nueva funcionalidad'`
5. **Push**: `git push origin feature/nueva-funcionalidad`
6. **Pull Request**: Abre un PR describiendo los cambios

### Ideas para Contribuir
- 📚 Nuevos módulos temáticos
- ❓ Más preguntas para módulos existentes
- 🎨 Mejoras en UI/UX
- 🔧 Optimizaciones de rendimiento
- 📱 Mejoras de accesibilidad

## 📄 Licencia

Este proyecto está bajo la **Licencia MIT**.

## 👨‍💻 Autor

**Daniel Sanchez** - Desarrollo completo del centro de simuladores

---
⭐ **¡Si te gusta este proyecto, dale una estrella en GitHub!** ⭐
