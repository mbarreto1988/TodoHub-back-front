# 🧠 TodoHub API — Node.js + SQL Server + Clean Architecture

**TodoHub** es una API RESTful desarrollada en **Node.js**, utilizando **SQL Server** como base de datos, **JWT** para autenticación segura, y una **arquitectura limpia (Clean Architecture)** que garantiza escalabilidad, mantenibilidad y separación clara de responsabilidades.

---

## 🚀 Descripción general

Este proyecto implementa un **gestor de tareas (Task Manager)** donde los usuarios pueden:

- Registrarse y loguearse mediante **JWT**.
- Crear, leer, actualizar y eliminar sus tareas.
- Cada usuario accede **únicamente** a sus propias tareas (rutas protegidas).
- Arquitectura modular preparada para escalar fácilmente (nuevos módulos, repositorios, servicios, etc.).

---

## 🧩 Tecnologías principales

| Tecnología | Uso |
|-------------|-----|
| **Node.js (v18+)** | Entorno de ejecución backend |
| **Express.js** | Framework web |
| **MSSQL (SQL Server)** | Base de datos relacional |
| **JWT (jsonwebtoken)** | Autenticación segura por tokens |
| **bcrypt** | Hashing de contraseñas |
| **dotenv** | Manejo de variables de entorno |
| **Joi** | Validaciones de entrada (pendiente) |
| **ESLint + Prettier** | Estilo y calidad de código |

---

## 🧱 Arquitectura — Clean Architecture

El proyecto sigue el patrón de **Clean Architecture**, con una división clara entre capas:

```
src/
│
├── application/         # Lógica de negocio (servicios)
│   └── services/
│       ├── auth/
│       │   └── service.auth.js
│       └── task/
│           └── service.task.js
│
├── domain/              # Entidades de negocio (opcional / escalable)
│
├── infrastructure/      # Conexión a DB, seguridad, middlewares, repositorios
│   ├── database/
│   │   └── mssql.config.js
│   ├── repositories/
│   │   ├── task/
│   │   │   └── mssql.task.repository.js
│   │   └── users/
│   │       └── mssql.user.repository.js
│   ├── security/
│   │   └── jwt.js
│   └── middlewares/
│       └── auth.middleware.js
│
├── presentation/        # Capa de presentación (Express: rutas y controladores)
│   ├── controllers/
│   │   ├── auth/
│   │   │   └── auth.controller.js
│   │   └── task/
│   │       └── tasks.controller.js
│   ├── routes/
│   │   ├── auth/
│   │   │   └── auth.routes.js
│   │   └── task/
│   │       └── tasks.routes.js
│   └── server.js
│
└── config/
    └── config.env.js
```

---

## 🧠 Diseño y buenas prácticas

### ✅ Separación de capas
Cada capa tiene una **única responsabilidad**:
- **Controller:** recibe las peticiones HTTP y devuelve respuestas.
- **Service:** maneja la lógica de negocio (validaciones, reglas, etc.).
- **Repository:** interacción directa con la base de datos (SQL Server).
- **Infrastructure:** provee recursos transversales (JWT, middlewares, pool de conexiones, etc.).

---

### ⚙️ Pool de conexiones (SQL Server)
Ubicado en `src/infrastructure/database/mssql.config.js`

Se utiliza un **pool global** de conexiones a SQL Server para:
- Reutilizar conexiones existentes.
- Evitar sobrecarga del servidor.
- Mejorar el rendimiento y la escalabilidad.

```js
import sql from 'mssql';
import { config } from '../../config/config.env.js';

let pool;

export const getPool = async () => {
  if (!pool) {
    pool = await sql.connect({
      user: config.db.user,
      password: config.db.password,
      database: config.db.name,
      server: config.db.host,
      port: config.db.port,
      options: {
        encrypt: false,
        trustServerCertificate: true,
      },
    });
    console.log('Connected to SQL Server');
  }
  return pool;
};
```

---

### 🔐 Autenticación con JWT

El sistema usa **Access Tokens** y **Refresh Tokens**, definidos en las variables de entorno:

- `ACCESS_TOKEN_SECRET`
- `REFRESH_TOKEN_SECRET`
- `ACCESS_TOKEN_EXPIRES_IN` → por defecto `60m`
- `REFRESH_TOKEN_EXPIRES_DAYS` → por defecto `7d`

Cada ruta protegida valida el token mediante el middleware:

```js
export function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access denied' });

  const decoded = JwtService.verifyAccessToken(token);
  if (!decoded) return res.status(403).json({ message: 'Invalid or expired token' });

  req.user = decoded;
  next();
}
```

El middleware se aplica así:
```js
app.use('/api/v1/tasks', authenticateToken, tasksRouter);
```

---

## 🧩 Endpoints principales

#### Auth
| Método | Ruta | Descripción | Protegida |
|--------|------|-------------|------------|
| POST | `/api/v1/auth/register` | Registra un nuevo usuario | ❌ |
| POST | `/api/v1/auth/login` | Inicia sesión y devuelve JWTs | ❌ |

#### Tasks
| Método | Ruta | Descripción | Protegida |
|--------|------|-------------|------------|
| GET | `/api/v1/tasks` | Obtiene todas las tareas del usuario | ✅ |
| GET | `/api/v1/tasks/:id` | Obtiene una tarea por ID | ✅ |
| POST | `/api/v1/tasks` | Crea una nueva tarea | ✅ |
| PUT | `/api/v1/tasks/:id` | Actualiza todos los campos de una tarea | ✅ |
| PATCH | `/api/v1/tasks/:id` | Actualiza parcialmente una tarea | ✅ |
| DELETE | `/api/v1/tasks/:id` | Elimina una tarea | ✅ |

---

## 🧰 Ejemplos con CURL

### 🔹 Registro de usuario
```bash
curl --location 'http://localhost:3001/api/v1/auth/register' --header 'Content-Type: application/json' --data '{
  "username": "mati",
  "email": "mati@mati.com",
  "password": "1234"
}'
```

### 🔹 Login de usuario
```bash
curl --location 'http://localhost:3001/api/v1/auth/login' --header 'Content-Type: application/json' --data '{
  "email": "mati@mati.com",
  "password": "1234"
}'
```

### 🔹 Crear tarea
```bash
curl --location 'http://localhost:3001/api/v1/tasks' --header 'Authorization: Bearer <ACCESS_TOKEN>' --header 'Content-Type: application/json' --data '{
  "title": "Aprender Clean Architecture",
  "description": "Implementar arquitectura limpia en el backend"
}'
```

### 🔹 Obtener tareas
```bash
curl --location 'http://localhost:3001/api/v1/tasks' --header 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 🔹 Obtener tarea por ID
```bash
curl --location 'http://localhost:3001/api/v1/tasks/5' --header 'Authorization: Bearer <ACCESS_TOKEN>'
```

### 🔹 Actualizar tarea (PUT)
```bash
curl --location --request PUT 'http://localhost:3001/api/v1/tasks/5' --header 'Authorization: Bearer <ACCESS_TOKEN>' --header 'Content-Type: application/json' --data '{
  "title": "Actualizar tarea completa",
  "description": "La tarea fue actualizada con PUT",
  "isCompleted": true
}'
```

### 🔹 Actualización parcial (PATCH)
```bash
curl --location --request PATCH 'http://localhost:3001/api/v1/tasks/5' --header 'Authorization: Bearer <ACCESS_TOKEN>' --header 'Content-Type: application/json' --data '{
  "isCompleted": true
}'
```

### 🔹 Eliminar tarea
```bash
curl --location --request DELETE 'http://localhost:3001/api/v1/tasks/5' --header 'Authorization: Bearer <ACCESS_TOKEN>'
```

---

## ⚙️ Variables de entorno (`.env`)

```env
# 🌍 App
PORT=3001

# 💾 Database
DB_HOST=localhost
DB_USER={user}
DB_PASSWORD={password}
DB_NAME=TodoHub
DB_PORT=1433

# 🔐 JWT
ACCESS_TOKEN_SECRET=access_secret
REFRESH_TOKEN_SECRET=refresh_secret
ACCESS_TOKEN_EXPIRES_IN=60m
REFRESH_TOKEN_EXPIRES_DAYS=7
```

---

## 🧩 Cómo ejecutar el proyecto

### 1️⃣ Clonar el repositorio
```bash
git clone https://github.com/tuusuario/todohub-back.git
cd todohub-back
```

### 2️⃣ Instalar dependencias
```bash
npm install
```

### 3️⃣ Crear archivo `.env`
Copiá el ejemplo anterior y ajustá los datos según tu entorno.

### 4️⃣ Levantar el servidor (modo desarrollo)
```bash
npm run dev
```

Servidor disponible en:
```
http://localhost:3001
```

---

## 👨‍💻 Autor

**Matías (Mati)**  
💻 Desarrollador Backend — Node.js & SQL Server  
🇦🇷 Argentina

> “Escribir código limpio no es una opción, es una forma de respeto por vos y por quien venga después.”
