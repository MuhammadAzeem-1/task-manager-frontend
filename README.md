# Task Manager Frontend

A modern, responsive task management application built with Next.js 15, React 19, and TypeScript.

## 🚀 Features

- ✅ **Authentication** - JWT-based login and signup
- ✅ **Task Management** - Full CRUD operations for tasks
- ✅ **User Management** - Admin can view and manage all users
- ✅ **Role-Based Access** - Different permissions for USER and ADMIN roles
- ✅ **Real-time Updates** - React Query for efficient data fetching and caching
- ✅ **Beautiful UI** - Modern design with Tailwind CSS and dark mode support
- ✅ **Type Safe** - Full TypeScript implementation
- ✅ **Form Validation** - Using React Hook Form and Zod
- ✅ **Toast Notifications** - Beautiful notifications with Sonner
- ✅ **Responsive Design** - Works seamlessly on all devices

## 📦 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **UI Library**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Data Fetching**: React Query (@tanstack/react-query)
- **HTTP Client**: Axios
- **Form Handling**: React Hook Form
- **Validation**: Zod
- **Icons**: Lucide React
- **Notifications**: Sonner
- **Date Formatting**: date-fns

## 🛠️ Setup Instructions

### Prerequisites

- Node.js 18+ installed
- NestJS backend running on `http://localhost:3000`

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create environment file:**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3000
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Open browser:**
   Navigate to `http://localhost:3001` (or whatever port Next.js assigns)

## 📁 Project Structure

```
task-frontend/
├── app/                          # Next.js App Router
│   ├── dashboard/               # Protected dashboard routes
│   │   ├── tasks/              # Tasks management page
│   │   ├── users/              # User management (Admin only)
│   │   ├── layout.tsx          # Dashboard layout with sidebar
│   │   └── page.tsx            # Dashboard home
│   ├── login/                  # Login page
│   ├── signup/                 # Signup page
│   ├── layout.tsx              # Root layout with providers
│   ├── page.tsx                # Landing page
│   └── globals.css             # Global styles
├── components/                  # Reusable components
│   └── task-modal.tsx          # Task create/edit modal
├── hooks/                       # Custom React hooks
│   ├── use-auth.ts             # Authentication hooks
│   ├── use-tasks.ts            # Task management hooks
│   └── use-users.ts            # User management hooks
├── lib/                         # Utility functions and configurations
│   ├── api-client.ts           # Axios instance with interceptors
│   ├── types.ts                # TypeScript type definitions
│   └── utils.ts                # Helper functions
├── providers/                   # Context providers
│   ├── query-provider.tsx      # React Query provider
│   └── toaster-provider.tsx    # Toast notification provider
├── store/                       # State management
│   └── auth-store.ts           # Zustand auth store
├── middleware.ts                # Next.js middleware for route protection
└── package.json                # Dependencies
```

## 🔐 Authentication Flow

1. **User Signs Up/Logs In** → Receives JWT token
2. **Token Stored** → Saved in localStorage and Zustand store
3. **Auto-attached** → Axios interceptor adds token to all requests
4. **Route Protection** → Middleware checks authentication status
5. **Auto-refresh** → User data persisted across page reloads

## 📱 Pages Overview

### Public Pages

- **Landing Page (`/`)** - Home page with features and CTA buttons
- **Login (`/login`)** - User authentication
- **Signup (`/signup`)** - New user registration

### Protected Pages (Require Authentication)

- **Dashboard (`/dashboard`)** - Overview with stats and recent tasks
- **Tasks (`/dashboard/tasks`)** - Full task management with CRUD operations
- **Users (`/dashboard/users`)** - User management (Admin only)

## 🎨 Key Features Explained

### Authentication

- JWT token-based authentication
- Secure password handling
- Auto-redirect based on auth status
- Remember user across sessions

### Task Management

- Create, read, update, delete tasks
- Filter by status (In Progress, Completed, Cancelled)
- Search functionality
- Real-time updates with React Query
- Beautiful modal for task creation/editing

### Role-Based Access Control

**Regular Users (USER):**
- View and manage their own tasks
- Update their own profile
- Cannot see other users' data

**Admins (ADMIN):**
- View all tasks from all users
- Manage any task
- View all users
- Delete users
- Full system access

### State Management

- **Zustand** for auth state (user, token, isAuthenticated)
- **React Query** for server state (tasks, users, profile)
- **LocalStorage** for persistence

### API Integration

All API calls use React Query for:
- Automatic caching
- Background refetching
- Loading and error states
- Optimistic updates
- Request deduplication

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
```

## 🌐 API Endpoints Used

### Authentication
- `POST /auth/signup` - Register new user
- `POST /auth/login` - Login user
- `GET /auth/profile` - Get current user profile

### Tasks
- `GET /tasks` - Get all tasks
- `GET /tasks/:id` - Get single task
- `POST /tasks` - Create task
- `PUT /tasks/:id` - Update task
- `DELETE /tasks/:id` - Delete task

### Users (Admin only)
- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

## 🎯 Next.js Best Practices Used

✅ **App Router** - Modern routing with layouts and nested routes
✅ **Server Components** - Default server-side rendering where possible
✅ **Client Components** - Strategic use of 'use client' for interactivity
✅ **Middleware** - Route protection at the edge
✅ **TypeScript** - Full type safety across the application
✅ **Performance** - Optimized with React Query caching
✅ **SEO** - Proper metadata and semantic HTML
✅ **Accessibility** - ARIA labels and keyboard navigation

## 🚨 Important Notes

1. **Backend Required**: Make sure the NestJS backend is running before starting the frontend
2. **Environment Variables**: Create `.env.local` with the backend URL
3. **Cookies**: The middleware uses cookies for authentication (optional enhancement)
4. **LocalStorage**: Currently using localStorage for token storage

## 🔒 Security Features

- JWT token authentication
- HTTP-only cookies option
- XSS protection via React's built-in escaping
- CSRF protection (can be enhanced)
- Secure password validation
- Role-based access control
- Protected routes with middleware

## 📊 Performance Optimizations

- React Query caching (1-minute stale time for most queries)
- Optimistic UI updates
- Lazy loading with Next.js dynamic imports
- Image optimization with Next.js Image component
- CSS optimization with Tailwind CSS JIT

## 🎨 UI/UX Features

- **Dark Mode Support** - Automatic theme detection
- **Responsive Design** - Mobile-first approach
- **Loading States** - Skeleton screens and spinners
- **Error Handling** - User-friendly error messages
- **Toast Notifications** - Success/error feedback
- **Form Validation** - Real-time validation with helpful messages
- **Smooth Animations** - Tailwind CSS transitions

## 🐛 Troubleshooting

### Backend Connection Issues
```bash
# Check if backend is running
curl http://localhost:3000

# Verify .env.local has correct URL
cat .env.local
```

### Authentication Issues
```bash
# Clear browser storage
localStorage.clear()

# Check browser console for token errors
```

### Build Errors
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [React Query Documentation](https://tanstack.com/query/latest)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

## 🎉 Features Implemented

- [x] User authentication (login/signup)
- [x] JWT token management
- [x] Protected routes
- [x] Task CRUD operations
- [x] User management (Admin)
- [x] Role-based access control
- [x] Search and filters
- [x] Responsive design
- [x] Dark mode
- [x] Form validation
- [x] Error handling
- [x] Loading states
- [x] Toast notifications

## 🚀 Ready to Use!

Your frontend is fully integrated with the NestJS backend and ready for development and testing!

---

**Built with ❤️ using Next.js 15 and modern web technologies**
