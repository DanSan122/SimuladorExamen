# 📚 Simulador de Examen

Un simulador de examen interactivo desarrollado con HTML, CSS y JavaScript vanilla.

## 🚀 Características

- ✅ **20 preguntas aleatorias** seleccionadas de un pool de preguntas
- ⏱️ **Temporizador de 20 minutos**
- 🎨 **Interfaz moderna** con tema oscuro
- 📊 **Resultados detallados** con puntuación y respuestas correctas
- 📱 **Responsive design** para móviles y desktop

## 🛠️ Tecnologías

- HTML5
- CSS3 (Variables CSS, Flexbox, Animaciones)
- JavaScript ES6+ (Async/Await, Fetch API)

## 📦 Estructura del proyecto

```
├── index.html          # Página de inicio (redirección)
├── main.html           # Simulador principal
├── preguntas.json      # Base de datos de preguntas
├── vercel.json         # Configuración de Vercel
└── README.md           # Este archivo
```

## 🚀 Despliegue

### Vercel (Recomendado)
1. Haz fork de este repositorio
2. Conecta tu cuenta de Vercel con GitHub
3. Importa el proyecto desde Vercel
4. ¡Automáticamente desplegado!

### Desarrollo local
```bash
# Servir archivos localmente (Python)
python -m http.server 8000

# O con Node.js
npx serve .
```

## 📊 Datos de preguntas

Las preguntas están almacenadas en `preguntas.json` con el siguiente formato:
```json
{
  "question": "Texto de la pregunta",
  "options": ["Opción A", "Opción B", "Opción C", "Opción D"],
  "answer": 0
}
```

## 🎯 Funcionalidades

- Selección aleatoria de 20 preguntas
- Temporizador con finalización automática
- Guardado temporal de respuestas
- Visualización de resultados con colores
- Identificación de respuestas correctas e incorrectas

## 📱 Compatibilidad

- ✅ Chrome, Firefox, Safari, Edge
- ✅ Dispositivos móviles y tablets
- ✅ Funciona offline una vez cargado

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Añadir nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.
