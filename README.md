# 🥗 Recipe App - Frontend

[![React](https://img.shields.io/badge/React-19-blue)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-green)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-blueviolet)](https://tailwindcss.com/)
[![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-1.9-orange)](https://redux-toolkit.js.org/)
[![Netlify](https://img.shields.io/badge/Deployed%20on-Netlify-blue)](https://www.netlify.com/)
[![Docker](https://img.shields.io/badge/Docker-Supported-blue)](https://www.docker.com/)

## Descripción General

Recipe App es una aplicación web desarrollada con React 19, TypeScript y Vite, utilizando Tailwind CSS 4 y componentes de shadcn/ui. El frontend está diseñado siguiendo buenas prácticas de desarrollo y una gestión de estado robusta mediante Redux Toolkit (slices y thunks).

Esta aplicación se integra con un backend API RESTful, proporcionando funcionalidades clave como:

- Búsqueda de recetas.
- Gestión de favoritos.
- Carrito de compras para ingredientes.
- Autenticación segura con JWT.
- Verificación de correo electrónico mediante SendGrid.
- Despliegue en Netlify y compatibilidad con Docker.

## 🚀 Características Principales

- 🌟 Interfaz moderna y responsiva con Tailwind CSS 4 y shadcn/ui.
- 🔍 Búsqueda de recetas basada en ingredientes.
- ❤️ Gestión de favoritos para guardar recetas preferidas.
- 🛒 Carrito de compras para agregar ingredientes.
- 🔑 Autenticación con JWT, incluyendo registro e inicio de sesión.
- 📧 Verificación de correo mediante SendGrid.
- 🌐 Integración con API RESTful para obtener y gestionar datos.
- 🐳 Compatibilidad con Docker para despliegue simplificado.
- 🚀 Despliegue automatizado en Netlify.

## 📋 Requisitos Previos

Antes de ejecutar el proyecto, asegúrate de tener instalado:

- [Node.js 20+](https://nodejs.org/)
- [npm 10+](https://www.npmjs.com/)
- [Docker](https://www.docker.com/) (opcional, para ejecución local)

## 🛠️ Instalación Local

Clonar el repositorio:

```bash
git clone https://github.com/usuario/recipe-app.git
cd recipe-app
```

Instalar las dependencias:

```bash
npm install
```

Configurar las variables de entorno creando un archivo `.env` en la raíz del proyecto:

```
VITE_APP_BACKEND_URL=http://localhost:7253
```

Ejecutar la aplicación en modo desarrollo:

```bash
npm run dev
```

La aplicación estará disponible en: [http://localhost:3000](http://localhost:3000)

## 🐳 Despliegue con Docker

Construir la imagen:

```bash
docker build -t recipe-app .
```

Ejecutar el contenedor:

```bash
docker run -p 3000:80 recipe-app
```

La aplicación estará disponible en: [http://localhost:3000](http://localhost:3000)

## 🚀 Despliegue en Netlify

- Crear una cuenta en Netlify.
- Subir el código a GitHub/GitLab y conectarlo con Netlify.
- Configurar las variables de entorno en Netlify (VITE_APP_BACKEND_URL).
- Hacer deploy desde el panel de Netlify.

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Para contribuir:

1. Hacer un fork del repositorio.
2. Crear una nueva rama (por ejemplo, feature/nueva-funcionalidad).
3. Hacer un pull request con los cambios.

## 📜 Licencia

Este proyecto está bajo la licencia MIT.

## 📧 Contacto

Para consultas, puedes escribir a: [abrahamraies@gmail.com](mailto:abrahamraies@gmail.com)
