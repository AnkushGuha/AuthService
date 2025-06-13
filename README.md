# FlowGen Authentication System

A production-grade authentication system built with the MERN stack, designed to connect your landing page (flowgen-arc.vercel.app) and dashboard (flowgen-dash.vercel.app).

## Features

### Security
- 🔒 JWT-based authentication with secure token management
- 🛡️ Password hashing using bcrypt with 12 salt rounds
- 🚫 Rate limiting to prevent brute force attacks
- 🔐 Input validation and sanitization
- 🌐 CORS configuration for cross-domain authentication
- 🛡️ Helmet.js for security headers

### Backend (Node.js + Express)
- 📡 RESTful API endpoints for authentication
- 🗄️ MongoDB integration with Mongoose ODM
- 🔄 Token refresh mechanism
- ⚡ Async/await error handling
- 📊 User activity tracking
- 🔍 Comprehensive validation

### Frontend (React + TypeScript)
- 🎨 Beautiful, modern design with glassmorphism effects
- 📱 Fully responsive across all devices
- 🔄 Loading states and error handling
- 🛡️ Protected routes with JWT verification
- 🎭 Smooth animations and micro-interactions
- 🎯 Context-based state management

## Quick Start

### Prerequisites
- Node.js 18+ and npm
- MongoDB Atlas account
- Vercel account (for deployment)

### Environment Setup

1. **Clone and install dependencies:**
```bash
npm install
```

2. **Create environment file:**
Copy `.env.example` to `.env` and fill in your values:
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/flowgen-auth
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d
PORT=5000
FRONTEND_LANDING_URL=https://flowgen-arc.vercel.app
FRONTEND_DASHBOARD_URL=https://flowgen-dash.vercel.app
NODE_ENV=development
```

### Development

1. **Start the backend server:**
```bash
npm run server:dev
```

2. **Start the frontend (in another terminal):**
```bash
npm run dev
```

3. **Access the application:**
- Landing page: http://localhost:5173
- Dashboard: http://localhost:5173/dashboard

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new user account
- `POST /api/auth/login` - Authenticate user
- `POST /api/auth/logout` - Logout user

### User Management
- `GET /api/user` - Get current user data (protected)
- `PUT /api/user/profile` - Update user profile (protected)

### Health Check
- `GET /api/health` - API health status

## Database Schema

### User Model
```javascript
{
  username: String (unique, 3-30 chars),
  email: String (unique, valid email),
  password: String (hashed, min 8 chars),
  profile: {
    firstName: String,
    lastName: String,
    avatar: String
  },
  isActive: Boolean,
  lastLogin: Date,
  loginCount: Number,
  createdAt: Date,
  updatedAt: Date
}
```

## Deployment

### Backend Deployment
The backend is configured to deploy as Vercel serverless functions using the included `vercel.json` configuration.

### Frontend Deployment
Deploy to Vercel with environment variables:
- `VITE_API_URL` - Your backend API URL

### Production Configuration
1. Set up MongoDB Atlas with proper network access
2. Configure environment variables in Vercel
3. Set up custom domains for landing and dashboard
4. Enable HTTPS everywhere

## Security Considerations

### Production Checklist
- ✅ Strong JWT secrets (use crypto.randomBytes)
- ✅ HTTPS enabled on all domains
- ✅ CORS properly configured
- ✅ Rate limiting enabled
- ✅ Input validation on all endpoints
- ✅ Password strength requirements
- ✅ Secure cookie settings
- ✅ Error handling without information leakage

### Authentication Flow
1. User submits credentials on landing page
2. Backend validates and returns JWT token
3. Token stored securely in localStorage
4. Dashboard requests include Authorization header
5. Backend verifies token on protected routes
6. User data populated in dashboard

## Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│  Landing Page   │────│   Backend API    │────│   Dashboard     │
│ (flowgen-arc)   │    │   (Express.js)   │    │ (flowgen-dash)  │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                        │                        │
         │                        │                        │
         └────────────────────────┼────────────────────────┘
                                  │
                            ┌──────────┐
                            │ MongoDB  │
                            │  Atlas   │
                            └──────────┘
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Support

For issues and questions:
- Create an issue in the repository
- Check the documentation
- Review the code examples

---

Built with ❤️ using the MERN stack for production-grade authentication.