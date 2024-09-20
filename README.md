# User Management System

Este proyecto es una aplicación web full-stack para la gestión de usuarios, construida con NestJS en el backend y Angular en el frontend.

## Características

- Autenticación de usuarios con JWT
- CRUD completo para usuarios
- Interfaz de usuario responsive
- Validación de formularios
- Protección de rutas con guards

## Tecnologías Utilizadas

### Backend
- NestJS
- MongoDB con Mongoose
- Passport JWT para autenticación
- Class-validator para validación de DTOs

### Frontend
- Angular 12+
- Angular Material para UI
- RxJS para manejo de estado
- Angular Router para navegación

## Prerrequisitos

- Node.js (v14+)
- MongoDB
- Angular CLI

## Instalación

### Backend

1. Navega al directorio del backend:
2. Instala las dependencias:
3. Agrega tu conexión local de MongoDBCompass 
4. Inicia el servidor: npm run start 

### Frontend

1. Navega al directorio del frontend:
2. Instala las dependencias:
3. Inicia el servidor de desarrollo: ng serve 

## Uso

Accede a `http://localhost:4200` en tu navegador. 
Es necesaria la creación de un admin por medio de la herramienta POSTMAN para registrate y lograr crear, editar y eliminar usuarios

### Endpoint creación de admin 
http://localhost:3000/user

### Estructura
{
  name: "Thomas",
  email: "thomas@gmail.com",
  country: "Colombia"

}

## API Endpoints

- POST /admin - Iniciar sesión
- POST /user - Crear un nuevo usuario
- GET /user/all - Obtener todos los usuarios
- GET /user/:id - Obtener un usuario específico
- PATCH /user/:id - Actualizar un usuario
- DELETE /user/:id - Eliminar un usuario

## Contribuir

Las contribuciones son bienvenidas. Por favor, abre un issue primero para discutir lo que te gustaría cambiar.

## Licencia

[MIT](https://choosealicense.com/licenses/mit/)

 
