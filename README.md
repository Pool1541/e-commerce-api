# E-MPORIUM API

API RESTful para una plataforma de comercio electrónico construida con Node.js, Express y MongoDB.

## 🚀 Características

- Autenticación JWT
- CRUD de productos
- Gestión de usuarios
- Carga de imágenes con Cloudinary

## 🛠️ Tecnologías

- Node.js
- Express
- MongoDB
- Docker
- JWT
- Cloudinary

## 📋 Requisitos Previos

- Docker
- Docker Compose
- Node.js (desarrollo local)
- Cuenta en Cloudinary

## 🔧 Instalación y Ejecución con Docker

1. Clonar el repositorio.

2. Crear un archivo `.env.docker` en la raíz del proyecto con las siguientes variables de entorno:

```env
PORT=3000
PRIVATE_KEY=SECRET
PRIVATE_REFRESH_KEY=SECRET
NODE_ENV=production
FRONTEND_URL=http://localhost:5432
CLOUDINARY_URL=cloudinary://api-key:api-secret@cloud-name
CRYPTO_SECRET_KEY=SECRET

MONGO_INITDB_DATABASE=e-mporium
MONGO_INITDB_ROOT_USERNAME=admin
MONGO_INITDB_ROOT_PASSWORD=123456
MONGODB_CONNECTION=mongodb://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@mongodb/${MONGO_INITDB_DATABASE}
```

3. Ejecutar el siguiente comando:

```bash
docker compose --env-file .env.docker up
```
