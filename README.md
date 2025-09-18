# Sahasik - Learning Management System Frontend

Sahasik adalah aplikasi frontend modern untuk Learning Management System (LMS) yang dibangun dengan React, TypeScript, dan Vite. Aplikasi ini terintegrasi dengan backend services berbasis Golang untuk autentikasi, manajemen user, dan manajemen kursus.

## 🚀 Fitur Utama

### Autentikasi & Keamanan
- ✅ JWT-based authentication dengan refresh token
- ✅ Automatic token refresh dan handling 401 errors  
- ✅ Role-based access control (Admin, Teacher, Student)
- ✅ Protected routes dengan route guards
- ✅ Secure token storage (httpOnly cookies untuk refresh token)

### Manajemen Kursus
- ✅ CRUD operations untuk kursus (Create, Read, Update, Delete)
- ✅ Search dan filter kursus berdasarkan kategori
- ✅ Pagination untuk listing kursus
- ✅ Course detail dengan informasi lengkap
- ✅ Role-based permissions untuk management kursus

### User Experience
- ✅ Responsive design (mobile-first approach)
- ✅ Modern dashboard dengan statistik dan quick actions
- ✅ Real-time notifications dengan toast messages
- ✅ Loading states dan error handling
- ✅ Beautiful UI dengan glassmorphism effects
- ✅ Collapsible sidebar dengan tooltips

### Teknologi & Tools
- ✅ React 18 + TypeScript + Vite
- ✅ Tailwind CSS untuk styling dengan custom design system
- ✅ TanStack Query untuk data fetching & caching
- ✅ Axios dengan interceptors untuk HTTP requests
- ✅ React Hook Form + Zod untuk validasi forms
- ✅ Shadcn/ui components
- ✅ Lucide React icons

## 🛠️ Setup & Installation

### Prerequisites
- Node.js (v18 atau lebih tinggi)
- npm atau yarn
- Backend services (Auth, User, Course services) harus berjalan

### 1. Clone Repository
```bash
git clone <repository-url>
cd sahasik-frontend
```

### 2. Install Dependencies
```bash
npm install
# atau
yarn install
```

### 3. Environment Configuration
Salin file `.env.example` ke `.env` dan sesuaikan dengan konfigurasi backend Anda:

```bash
cp .env.example .env
```

Edit file `.env`:
```env
# API Endpoints - sesuaikan dengan backend services
VITE_API_AUTH=http://localhost:8080
VITE_API_USER=http://localhost:8081  
VITE_API_COURSE=http://localhost:8082

# Application
VITE_APP_TITLE=Sahasik

# Development
NODE_ENV=development
```

### 4. Jalankan Development Server
```bash
npm run dev
# atau
yarn dev
```

Aplikasi akan berjalan di `http://localhost:5173`

## 🔧 Backend Integration

### API Services
Aplikasi ini membutuhkan 3 backend services:

#### 1. Auth Service (Port 8080)
```
POST /api/v1/auth/login - Login user
POST /api/v1/auth/refresh - Refresh access token  
POST /api/v1/auth/validate - Validate token
```

#### 2. User Service (Port 8081)
```
GET /api/v1/users/:id - Get user by ID
PUT /api/v1/users/:id - Update user
```

#### 3. Course Service (Port 8082)
```
GET /api/v1/courses - List courses dengan pagination & filter
GET /api/v1/courses/:id - Get course detail
POST /api/v1/courses - Create new course
PUT /api/v1/courses/:id - Update course
DELETE /api/v1/courses/:id - Delete course
```

### Demo Credentials
Untuk testing, gunakan credentials berikut (sesuaikan dengan backend):
- **Email**: `teacher@sahasik.com`
- **Password**: `password123`

## 📱 User Roles & Permissions

### Student
- ✅ View dashboard
- ✅ Browse & search courses
- ✅ View course details
- ✅ Manage profile

### Teacher  
- ✅ Semua permission Student
- ✅ Create, edit, delete courses
- ✅ View analytics
- ✅ Manage students in their courses

### Admin
- ✅ Semua permission Teacher
- ✅ Full access ke semua courses
- ✅ System-wide analytics
- ✅ User management

## 🏗️ Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Shadcn/ui components
│   ├── AppLayout.tsx    # Main app layout
│   ├── AppHeader.tsx    # Navigation header
│   ├── AppSidebar.tsx   # Navigation sidebar
│   └── ProtectedRoute.tsx # Route guard component
├── contexts/            # React contexts
│   └── AuthContext.tsx  # Authentication context
├── pages/              # Page components
│   ├── Login.tsx       # Login page
│   ├── Dashboard.tsx   # Main dashboard
│   ├── Courses.tsx     # Course listing
│   ├── Profile.tsx     # User profile
│   └── NotFound.tsx    # 404 page
├── services/           # API services
│   └── api/           
│       ├── auth.ts     # Auth API calls
│       ├── course.ts   # Course API calls
│       └── user.ts     # User API calls
├── types/             # TypeScript type definitions
│   ├── auth.ts        # Auth-related types
│   └── course.ts      # Course-related types
├── lib/               # Utility functions
│   ├── axios.ts       # Axios configuration & interceptors
│   └── utils.ts       # General utilities
├── config/            # Configuration files
│   └── env.ts         # Environment variables
└── hooks/             # Custom React hooks
    └── use-toast.ts   # Toast notifications
```

## 🎨 Design System

### Colors
- **Primary**: Deep educational blue (`#1e40af`)
- **Secondary**: Warm orange (`#ea580c`)
- **Success**: Educational green (`#16a34a`)
- **Warning**: Academic gold (`#eab308`)

### Components
- Custom button variants: `hero`, `glass`, `success`, `warning`
- Glassmorphism effects dengan backdrop blur
- Responsive grid systems
- Loading skeletons dan animations

## 🔒 Security Features

### Token Management
- **Access Token**: Stored in memory (React context)
- **Refresh Token**: Stored in secure httpOnly cookie
- **Auto Refresh**: Automatic token refresh on 401 errors
- **Logout**: Complete token cleanup

### Request Security
- Axios interceptors untuk automatic token attachment
- CORS handling untuk cross-origin requests
- Request/response logging untuk debugging

## 🧪 Testing

### Unit Testing
```bash
npm run test
# atau
yarn test
```

### E2E Testing (Cypress/Playwright)
```bash
npm run test:e2e
# atau
yarn test:e2e
```

### Test Coverage
```bash
npm run test:coverage
# atau
yarn test:coverage
```

## 📦 Build & Deployment

### Production Build
```bash
npm run build
# atau
yarn build
```

### Preview Production Build
```bash
npm run preview
# atau
yarn preview
```

### Docker Deployment
```bash
# Build Docker image
docker build -t sahasik-frontend .

# Run container
docker run -p 80:80 sahasik-frontend
```

### Docker Compose untuk Development
```bash
docker-compose -f docker-compose.dev.yml up
```

## 🔧 Troubleshooting

### CORS Issues
Jika mengalami CORS errors, pastikan backend services mengizinkan requests dari frontend:

```golang
// Backend CORS configuration
c.Header("Access-Control-Allow-Origin", "http://localhost:5173")
c.Header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
c.Header("Access-Control-Allow-Headers", "Content-Type, Authorization")
c.Header("Access-Control-Allow-Credentials", "true")
```

### Token Issues
1. **401 Unauthorized**: Check apakah backend services berjalan
2. **Token Expired**: Aplikasi akan automatically refresh token
3. **Invalid Token**: User akan di-redirect ke halaman login

### Network Issues
- Pastikan environment variables `VITE_API_*` sudah benar
- Check apakah backend services accessible
- Verify port numbers dan base URLs

### Development Issues
```bash
# Clear node_modules dan reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
npx vite --force

# Check TypeScript errors
npx tsc --noEmit
```

## 🤝 Contributing

### Development Workflow
1. Fork repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push branch: `git push origin feature/amazing-feature`
5. Open Pull Request

### Code Standards
- TypeScript strict mode enabled
- ESLint + Prettier untuk code formatting
- Husky pre-commit hooks untuk linting
- Conventional Commits untuk commit messages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Support

Jika mengalami issues atau butuh bantuan:

1. Check [Troubleshooting](#-troubleshooting) section
2. Search existing [Issues](https://github.com/your-repo/issues)
3. Create new issue dengan template yang sesuai
4. Join Discord/Slack community untuk real-time help

---

**Sahasik** - Platform Pembelajaran Modern & Terintegrasi 🎓