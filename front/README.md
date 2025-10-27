Es una arquitectura híbrida “Feature-Sliced + Clean principles”
🧠 Es una arquitectura basada en Clean Architecture, pero aplicada con el estilo Feature-Sliced Design,
lo que la hace ideal para React + TypeScript modernos: limpia, escalable y mantenible.


src/
│
├── app/
│   ├── App.tsx                       # Root principal (monta providers + router)
│   ├── main.tsx                      # Entry point (no se toca)
│   ├── app.scss                      # Centraliza todos los estilos de componentes
│   │
│   ├── routes/
│   │   ├── index.tsx                 # Definición de rutas públicas/protegidas
│   │   └── ProtectedRoute.tsx        # Protege rutas según estado de auth
│   │
│   ├── providers/
│   │   ├── ReactQueryProvider.tsx    # Configuración global de TanStack Query
│   │   └── RouterProvider.tsx        # Configura el router de la app
│   │
│   └── store/
│       ├── auth.store.ts             # Maneja sesión del usuario (Zustand + persist)
│       └── ui.store.ts               # Estado global UI (modales, loaders, toasts)
│
├── core/
│   ├── api/
│   │   ├── http.ts                   # axios instance con baseURL
│   │   └── interceptors.ts           # JWT attach + refresh + manejo de errores
│   │
│   ├── config/
│   │   └── env.ts                    # VITE_* env vars + validación
│   │
│   ├── constants/
│   │   └── endpoints.ts              # endpoints base (auth, tasks)
│   │
│   ├── types/
│   │   ├── user.ts                   # Tipos User, AuthResponse, etc.
│   │   └── task.ts                   # Tipos Task, TaskResponse, etc.
│   │
│   ├── utils/
│   │   ├── jwt.ts                    # decode, expiración, helpers de token
│   │   └── formatDate.ts
│   │
│   └── hooks/
│       ├── useAuth.ts                # hook genérico para leer auth.store
│       └── useFetch.ts               # fetch helper si hace falta
│
├── features/
│   │
│   ├── auth/
│   │   ├── pages/
│   │   │   ├── Login.tsx             # Página de login
│   │   │   └── Register.tsx          # Página de registro
│   │   │
│   │   ├── components/
│   │   │   └── AuthForm.tsx          # Formulario común Login/Register
│   │   │
│   │   ├── services/
│   │   │   └── auth.api.ts           # Llamadas HTTP a /auth/login /register /refresh
│   │   │
│   │   ├── hooks/
│   │   │   └── useAuthActions.ts     # Login/Register mutations y manejo store
│   │   │
│   │   └── models/
│   │       └── auth.model.ts         # DTOs / adaptadores si hacen falta
│   │
│   └── tasks/
│       ├── pages/
│       │   ├── TasksList.tsx         # Lista de tareas (protegida)
│       │   └── TaskDetail.tsx        # Detalle modal o vista
│       │
│       ├── components/
│       │   ├── TaskCard.tsx          # Card con info y acciones
│       │   └── TaskForm.tsx          # Crear/Editar tarea
│       │
│       ├── services/
│       │   └── task.api.ts           # CRUD completo (GET, POST, PUT, PATCH, DELETE)
│       │
│       ├── hooks/
│       │   └── useTasks.ts           # useQuery/useMutation + invalidación
│       │
│       └── models/
│           └── task.model.ts         # DTOs o tipos extendidos
│
├── ui/
│   ├── components/
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Layout.tsx                # Contiene Navbar + Outlet
│   │   └── Navbar.tsx                # Muestra links según auth
│   │
│   └── theme/
│       ├── _variables.scss           # Colores, fonts, breakpoints globales
│       ├── _mixins.scss
│       └── _globals.scss             # Reset + helpers (importado en app.scss)
│
├── styles/
│   ├── _variables.scss               # (Global reusables, no específicos de componentes)
│   ├── _mixins.scss
│   └── _globals.scss
│
├── assets/                           # Imágenes, íconos, logos
│
└── index.html
