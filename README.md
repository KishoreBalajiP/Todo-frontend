# TaskFlow - Modern Task Management Application

<div align="center">

![TaskFlow](https://img.shields.io/badge/TaskFlow-Task%20Management-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.3.1-61dafb?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-3178c6?style=flat-square&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.4.2-646cff?style=flat-square&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.1-06b6d4?style=flat-square&logo=tailwindcss)

A full-featured, modern task management application with user authentication, real-time task management, and intelligent task filtering.

[Features](#features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [Architecture](#-architecture) • [Contributing](#-contributing)

</div>

---

## Overview

**TaskFlow** is a contemporary task management platform that empowers users to efficiently organize, track, and manage their daily tasks. Built with cutting-edge web technologies, it provides a seamless user experience with responsive design, intuitive task management, and robust token-based authentication.

### Core Capabilities
- 🔐 **Secure Authentication** - User signup/login with JWT token-based authentication
- ✅ **Complete Task Management** - Create, edit, complete, and delete tasks
- 📅 **Smart Scheduling** - Set due dates with automatic overdue task tracking
- 🔄 **Task Recurrence** - Manage recurring tasks with intelligent filtering
- 🔔 **Desktop Notifications** - Real-time notifications for overdue tasks
- 🎨 **Responsive Design** - Beautiful, mobile-friendly interface
- ⚡ **Real-time Updates** - Instant task status synchronization
- 💾 **Persistent Sessions** - Automatic session persistence with localStorage

---

## 🚀 Tech Stack

### Frontend Framework
| Technology | Version | Purpose |
|-----------|---------|---------|
| **React** | 18.3.1 | Component-based UI library |
| **TypeScript** | 5.5.3 | Type-safe JavaScript development |
| **Vite** | 5.4.2 | Ultra-fast build tool & dev server |
| **Tailwind CSS** | 3.4.1 | Utility-first CSS framework |
| **Lucide React** | 0.344.0 | Beautiful, consistent icon library |

### Development & Quality Tools
| Tool | Version | Purpose |
|------|---------|---------|
| **ESLint** | 9.9.1 | Code linting & quality enforcement |
| **TypeScript ESLint** | 8.3.0 | TypeScript-specific linting rules |
| **PostCSS** | 8.4.35 | CSS transformations & automation |
| **Autoprefixer** | 10.4.18 | Automatic cross-browser CSS prefixes |

### Backend Integration
- **Custom HTTP API** - Standard RESTful API endpoints
- **Token-based Authentication** - JWT tokens for secure sessions
- **Fetch API** - Native browser HTTP client

---

## 📦 Prerequisites

Ensure you have the following installed on your system:
- **Node.js** ≥ 16.x (LTS recommended)
- **npm** ≥ 8.x or **yarn** ≥ 1.22.x
- **Git** for version control
- A modern web browser (Chrome, Firefox, Safari, or Edge)

---

## 🚀 Getting Started

### Step 1: Clone the Repository
```bash
git clone https://github.com/yourusername/taskflow-frontend.git
cd taskflow-frontend
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Configure Environment Variables
Create a `.env.local` file in the project root:

```env
# Backend API Server
VITE_API_URL=http://localhost:8000
```

**Configuration Details:**
- `VITE_API_URL` - Your backend API server address (update based on your deployment)
- Prefix `VITE_` makes variables accessible in the frontend via `import.meta.env`

### Step 4: Start Development Server
```bash
npm run dev
```

The application will be available at:
- **Local:** `http://localhost:5173`
- **Network:** Check terminal output for network address

### Step 5: Build for Production
```bash
npm run build
```

Output will be generated in the `dist/` directory, ready for deployment.

### Step 6: Preview Production Build
```bash
npm run preview
```

---

## 📁 Project Structure

```
src/
│
├── components/
│   ├── TaskItem.tsx              # Individual task card
│   │                              # - Display task details
│   │                              # - Toggle completion status
│   │                              # - Edit & delete actions
│   │                              # - Overdue task highlighting
│   │
│   ├── TaskModal.tsx             # Create/Edit task modal
│   │                              # - Form for task input
│   │                              # - Due date picker
│   │                              # - Recurring options
│   │
│   ├── Toast.tsx                 # Single toast notification
│   │                              # - Success/error display
│   │                              # - Auto-dismiss functionality
│   │
│   └── ToastContainer.tsx        # Toast notification system
│                                  # - Manages toast queue
│                                  # - Handles positioning
│
├── hooks/
│   └── useToast.ts               # Custom hook for toast notifications
│                                  # - addToast method
│                                  # - removeToast method
│                                  # - Toast state management
│
├── pages/
│   ├── Login.tsx                 # User login authentication
│   │                              # - Email/password input
│   │                              # - Form validation
│   │                              # - Token storage
│   │
│   ├── Signup.tsx                # User registration
│   │                              # - New account creation
│   │                              # - Password validation
│   │                              # - Error handling
│   │
│   └── Dashboard.tsx             # Main task management interface
│                                  # - Task list display
│                                  # - Task operations (CRUD)
│                                  # - Filtering & sorting
│                                  # - Notification system
│
├── services/
│   └── api.ts                    # Centralized API client
│                                  # - Authentication endpoints
│                                  # - Task CRUD operations
│                                  # - Error responses
│
├── App.tsx                       # Root application component
│                                  # - Route management
│                                  # - Auth state checking
│                                  # - Global toast provider
│
├── main.tsx                      # Application entry point
│                                  # - React DOM initialization
│                                  # - Strict mode configuration
│
├── index.css                     # Global stylesheet
│                                  # - Base styles
│                                  # - Tailwind directives
│                                  # - CSS variables
│
└── vite-env.d.ts                 # Vite type definitions
                                   # - Environment variable types
                                   # - Build-time variable access
```

---

## 🛠️ Available Scripts

### Development & Building
```bash
# Start development server with hot module replacement
npm run dev

# Build optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

### Code Quality
```bash
# Run ESLint code quality checks
npm run lint

# Run TypeScript type checking
npm run typecheck
```

### Script Reference
| Command | Script | Purpose |
|---------|--------|---------|
| `npm run dev` | `vite` | Start dev server (port 5173) |
| `npm run build` | `vite build` | Create production bundle |
| `npm run preview` | `vite preview` | Preview built app |
| `npm run lint` | `eslint .` | Check code quality |
| `npm run typecheck` | `tsc --noEmit -p tsconfig.app.json` | Verify TypeScript types |

---

## 🏗️ Application Architecture

### Data Flow
```
┌─────────────────────────────────────────────┐
│         App.tsx (Main Router)               │
│  - Route state management                   │
│  - Authentication check on load             │
└────────────────┬────────────────────────────┘
                 │
        ┌────────┴────────┬─────────────┐
        │                 │             │
   ┌────▼──┐        ┌────▼───┐    ┌───▼────┐
   │ Login │        │ Signup │    │Dashboard│
   │ Page  │        │ Page   │    │ Page    │
   └────┬──┘        └────┬───┘    └───┬────┘
        │                │            │
        └────────────────┼────────────┘
                         │
                    ┌────▼─────────────────┐
                    │  API Service Layer   │
                    │ - Fetch API calls    │
                    │ - Token management   │
                    │ - Error handling     │
                    └────┬────────────────┘
                         │
                    ┌────▼──────────────────┐
                    │  Backend REST API    │
                    │ - Authentication     │
                    │ - Task CRUD ops      │
                    └─────────────────────┘
```

### State Management Strategy
| State Type | Tool | Scope |
|-----------|------|-------|
| Authentication Token | `localStorage` | Persistent across sessions |
| Current Page/Route | `useState` (App.tsx) | Global application state |
| Toast Notifications | `useToast` hook | Global notification system |
| Task List | `useState` (Dashboard.tsx) | Component-level state |
| Modal State | `useState` (Dashboard.tsx) | Component-level state |

### Authentication Flow
```
User Credentials (Email/Password)
    ↓
Form Submission to /api/auth/login or /api/auth/signup
    ↓
Backend Validation & JWT Token Generation
    ↓
Token Response to Frontend
    ↓
localStorage.setItem('token', token)
    ↓
App.tsx checks for token on page load
    ↓
Token valid → Route to Dashboard
Token invalid → Route to Login
```

### API Communication
- **Protocol:** REST over HTTP/HTTPS
- **Content-Type:** `application/json`
- **Authentication:** `Authorization: <token>` header
- **Error Handling:** User-friendly toast notifications

---

## ✨ Features Explained

### Authentication
- **Signup:** Create new user account with email/password validation
- **Login:** Authenticate with credentials and receive JWT token
- **Session Persistence:** Token stored in localStorage for auto-login
- **Logout:** Clear token and return to login page

### Task Management
- **Create:** Click "Add Task" button to open modal, fill form, save
- **Read:** View all tasks in dashboard with details
- **Update:** Click edit button on task to modify details
- **Delete:** Remove task with confirmation
- **Complete:** Check task to mark as done (visual feedback provided)

### Filtering & Sorting
- **Recurring Filter:** View all tasks or filter by recurrence type
- **Overdue Sorting:** Overdue tasks automatically sorted to top
- **Visual Indicators:** Overdue tasks highlighted with red border

### Notifications
- **Toast Messages:** Success/error feedback for actions
- **Desktop Alerts:** Opt-in browser notifications for overdue tasks
- **Auto-dismiss:** Toasts automatically close after 3 seconds

### Responsive Design
- **Mobile First:** Designed for mobile, enhanced for desktop
- **Breakpoints:** Tailwind CSS responsive utilities
- **Touch Friendly:** Adequate spacing for mobile interactions

---

## 🔐 Security Considerations

### Authentication
- JWT tokens stored in localStorage
- Tokens sent via Authorization header
- Server validates token on protected routes
- Token cleared on logout

### Data Handling
- User passwords never stored in frontend
- Token expiration handled by backend
- CORS headers managed at API level
- Input validation on client and server

### Best Practices
- HTTPS required in production
- Environment variables for sensitive data
- No credentials in version control
- Regular dependency updates for security patches

---

## 📝 Configuration Files Reference

### Package Configuration
**package.json**
- Project metadata (name, version)
- Dependency management
- Script definitions
- Build configuration

### Build Configuration
**vite.config.ts**
- Vite server options
- React plugin setup
- Build optimization
- Dependency exclusions

**tsconfig.json**
- TypeScript compiler options
- Target ES version
- Module resolution
- Type checking rules

**tsconfig.app.json**
- Application-specific TS config
- Source file inclusion
- Path mappings

### Styling Configuration
**tailwind.config.js**
- Tailwind CSS customization
- Theme colors and spacing
- Plugin configuration

**postcss.config.js**
- CSS processing pipeline
- Tailwind CSS integration
- Autoprefixer configuration

### Code Quality Configuration
**eslint.config.js**
- Linting rules enforcement
- React-specific rules
- TypeScript integration

---

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

### Getting Started
1. **Fork** the repository on GitHub
2. **Clone** your fork locally: `git clone https://github.com/yourusername/taskflow-frontend.git`
3. **Create** a feature branch: `git checkout -b feature/amazing-feature`
4. **Make** your changes following code standards
5. **Commit** with clear messages: `git commit -m 'Add amazing feature'`
6. **Push** to your branch: `git push origin feature/amazing-feature`
7. **Open** a Pull Request with description

### Code Standards
- ✅ Use **TypeScript** for type safety
- ✅ Follow **ESLint** rules (run `npm run lint`)
- ✅ Pass **type checking** (`npm run typecheck`)
- ✅ Use **descriptive commit messages**
- ✅ Keep components small and focused
- ✅ Add **comments** for complex logic
- ✅ Test changes before submitting

### Commit Message Format
```
[TYPE] Concise description

Detailed explanation of changes (if needed)

- Point 1
- Point 2

Related to #issue-number
```

Types: `feat`, `fix`, `refactor`, `docs`, `style`, `test`, `chore`

---

## 🐛 Troubleshooting Guide

### Common Issues & Solutions

#### Port Already in Use
```bash
# Error: Port 5173 is already in use
# Solution: Vite will automatically use the next available port
# Check terminal output for the actual URL
```

#### API Connection Errors
```bash
# Issue: Cannot fetch from API
# Solutions:
1. Verify VITE_API_URL in .env.local matches your backend
2. Ensure backend server is running and accessible
3. Check network connectivity and firewall settings
4. Check browser DevTools Network tab for failed requests
```

#### Authentication Issues
```bash
# Issue: Stuck on login page or session expired
# Solutions:
1. Clear browser cache: DevTools → Application → Clear all
2. Check localStorage: DevTools → Application → localStorage
3. Verify backend is returning valid tokens
4. Check token expiration on backend
```

#### Build Errors
```bash
# Error: npm ERR! code E404 (package not found)
# Solution: Run npm install again, clear cache if needed
npm cache clean --force
npm install

# Error: TypeScript compilation errors
npm run typecheck  # Check for type issues
```

#### ESLint Errors
```bash
# Run linter to see issues
npm run lint

# Try auto-fix (fixes many issues automatically)
npx eslint --fix .
```

### Debug Mode
```bash
# Enable verbose logging in development
VITE_DEBUG=true npm run dev

# Check environment variables
console.log(import.meta.env)
```

---

## 📚 Key Components Guide

### TaskItem Component
Displays individual task with actions:
```tsx
<TaskItem
  id="task-1"
  title="Complete project"
  description="Finish all features"
  completed={false}
  dueDate="2024-02-25"
  recurring="weekly"
  onToggle={handleToggle}
  onEdit={handleEdit}
  onDelete={handleDelete}
/>
```

### TaskModal Component
Modal form for creating/editing tasks:
- Title input (required)
- Description textarea (optional)
- Due date picker (optional)
- Recurrence selector (optional)
- Submit/Cancel buttons

### Toast System
Display notifications:
```tsx
addToast("Task created successfully!", "success")
addToast("Failed to delete task", "error")
```

---

## 📊 Performance Considerations

### Optimization Techniques
- **Code Splitting:** Automatic with Vite
- **Lazy Loading:** Components loaded on demand
- **Caching:** Browser caching via Vite
- **Bundle Analysis:** Check production bundle size

### Best Practices
- Minimize API calls with proper state management
- Use React.memo for component optimization
- Debounce search/filter operations
- Lazy load heavy dependencies

---

## 🌐 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Common Platforms

**Netlify:**
```bash
npm run build  # Creates dist/ folder
# Connect repository and select dist as publish folder
```

**Vercel:**
```bash
# Install Vercel CLI
npm install -g vercel
# Deploy
vercel
```

**GitHub Pages:**
```bash
# Update vite.config.ts base property
# Build and push dist to gh-pages branch
```

---

## 📄 License

This project is licensed under the **MIT License**.

See [LICENSE](LICENSE) file for details or view at: https://opensource.org/licenses/MIT

---

## 📧 Support & Contact

For issues, questions, or feature requests:

- **GitHub Issues:** [Open an issue](issues)
- **Email:** support@taskflow.dev
- **Discussions:** [Community discussions](discussions)

---

## 🙏 Acknowledgments

- **React Team** - Amazing framework and ecosystem
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **Community** - Contributors and feedback

---

<div align="center">

### Built with ❤️ for better task management

**[⬆ Back to Top](#taskflow---modern-task-management-application)**

---

Made in 2024 | TaskFlow v1.0.0

</div>
