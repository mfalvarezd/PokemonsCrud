# Aplicación de Gestión de Pokémon

Esta es una aplicación full-stack MERN (MongoDB, Express, React, Node.js) para gestionar una lista de Pokémon. Permite a los usuarios ver, crear, editar y eliminar Pokémon de una base de datos local. 

## Estructura del Proyecto

El proyecto se divide en dos partes principales: un `client` (frontend) y un `server` (backend).

```
.
├── client/         # Aplicación frontend de React
│   ├── public/
│   ├── src/
│   │   ├── Pokemons/components/ # Componentes de React
│   │   ├── services/
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   └── ...
├── server/         # API backend de Node.js/Express
│   ├── controller/
│   │   └── pokemonController.js # Lógica para manejar las peticiones
│   ├── model/
│   │   └── pokemon.js      # Esquema de Mongoose para Pokémon
│   ├── routes/
│   │   └── pokemons.js      # Rutas de la API
│   ├── .env                   # Variables de entorno (PORT, MONGO_URL)
│   ├── index.js               # Punto de entrada del servidor
│   └── package.json
└── Readme.md
```

### Frontend (`client`)

- Construido con **React**.
- Usa **React Hooks** (`useState`, `useEffect`) para manejar estado y llamadas a la API.
- Se comunica con la API del backend a través de **axios** (`services/pokemonApi.js`).
- Componentes clave:
  - `pokemonTable.jsx`: Lista de Pokémon con acciones de ver, editar y eliminar.
  - `PokemonDetails.jsx`: Modal con información completa del Pokémon y estadísticas.
  - `pokemonForm.jsx`: Formulario reutilizable para crear y editar Pokémon.
  - `modal.jsx`: Componente genérico para mostrar contenido en un overlay.
  - `ProgressBar.jsx`: Barra de progreso para estadísticas del Pokémon.

### Backend (`server`)

- Construido con **Node.js** y **Express**.
- Utiliza **MongoDB** como base de datos y **Mongoose** como ODM.
- Proporciona una API RESTful en `/v1/pokemons` para operaciones CRUD:
  - `GET /v1/pokemons` → obtener todos los Pokémon.
  - `POST /v1/pokemons` → crear un nuevo Pokémon.
  - `PUT /v1/pokemons/:id` → actualizar un Pokémon.
  - `DELETE /v1/pokemons/:id` → eliminar un Pokémon.
- El puerto del servidor se define en `.env` (ej. 8080).
## Cómo Ejecutar la Aplicación

### Prerrequisitos

- Node.js y npm instalados.
- una instancia de MongoDB en ejecución.

### 1. Configurar Variables de Entorno

Navega al directorio `server` y crea un archivo `.env` con el siguiente contenido, ajustando los valores si es necesario:

```
APP_PORT=8080
DB_HOST=localhost
DB_PORT=27017
DB_NAME=pokemons
APP_HOST = http://localhost
```

### 2. Instalar Dependencias

Instala las dependencias tanto para el servidor como para el cliente.

```bash
# Desde el directorio raíz, instala las dependencias del servidor
cd server
npm install
cd ..

# Desde el directorio raíz, instala las dependencias del cliente
cd client
npm install
cd ..
```

### 3. Iniciar el Servidor Backend

Desde el directorio raíz, ejecuta:

```bash
npm run start-dev
```

El servidor debería iniciarse en el puerto especificado en tu archivo `.env` (p. ej., 8080).

### 4. Iniciar la Aplicación Frontend

En una terminal separada, navega al directorio `client` y ejecuta:

```bash
npm run dev
```

Esto abrirá la aplicación en tu navegador web, normalmente en `http://localhost:5173`.




