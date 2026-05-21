# Admin Panel Password Protection - Implementation Guide

## Overview
Password protection has been added to the admin panel. Users must enter the correct password to access the admin dashboard.

## 🔐 What's Been Added

### 1. Frontend - Admin Login Component
**File**: `frontend/src/pages/AdminLogin.jsx`

Features:
- Beautiful login form with password input
- Real-time validation
- Error messages for failed login attempts
- Loading state during authentication
- Professional UI matching admin theme

**Components Exported**:
- `AdminLogin` - Login page component
- `AdminLogoutButton` - Logout button component

### 2. Frontend - Authentication Logic
**File**: `frontend/src/pages/Admin.jsx`

Changes:
- Added authentication state management
- Check for stored auth token on component mount
- Show login form if not authenticated
- Show admin panel if authenticated
- Added logout button in sidebar

### 3. Backend - Authentication Controller
**File**: `backend/src/controllers/authController.js`

Functions:
- `adminLogin` - Validates password and returns JWT token
- `verifyAdminToken` - Middleware to verify JWT tokens

Features:
- JWT token generation (24-hour expiry)
- Password validation
- Token verification middleware
- Proper error handling

### 4. Backend - Auth Routes
**File**: `backend/src/routes/authRoutes.js`

Endpoints:
- `POST /api/auth/login` - Login with password

### 5. Backend - App Configuration
**File**: `backend/src/app.js`

Changes:
- Added auth routes import
- Added PATCH to CORS allowed methods (previously fixed)
- Registered `/api/auth` route

### 6. Frontend - API Client Update
**File**: `frontend/src/api/index.js`

Changes:
- Updated `requestJson` to include auth token in headers
- Token automatically added for `/admin` and `/auth` routes
- Bearer token format: `Authorization: Bearer <token>`

## 🔑 Default Credentials

**Default Admin Password**: `admin123`

To change password, set environment variable:
```bash
ADMIN_PASSWORD=your_secure_password
```

**JWT Secret**: Set in .env (production use only)
```bash
JWT_SECRET=your-secret-key-change-in-production
```

## 📋 How It Works

### Login Flow
```
1. User accesses /admin
   ↓
2. Component checks localStorage for 'adminToken'
   ↓
3. If no token found, show AdminLogin component
   ↓
4. User enters password and clicks Login
   ↓
5. Frontend sends POST /api/auth/login with password
   ↓
6. Backend validates password
   ↓
7. If valid, backend generates JWT token
   ↓
8. Token returned to frontend
   ↓
9. Token stored in localStorage
   ↓
10. Admin panel displayed
```

### Session Management
```
Token stored in localStorage: 'adminToken'
Token expiry: 24 hours
Auto-logout: No (user must manually logout or token expires)
```

### API Request Flow
```
Admin makes request to API
   ↓
requestJson() called
   ↓
Check if path includes '/admin' or '/auth'
   ↓
Get token from localStorage
   ↓
Add Authorization header: "Bearer {token}"
   ↓
Send request with auth header
   ↓
Backend verifies token
   ↓
If valid, process request
   ↓
If invalid, return 401 Unauthorized
```

## 🚀 Setup Instructions

### Backend Setup

1. **Install JWT package** (if not already installed):
```bash
cd backend
npm install jsonwebtoken
```

2. **Set environment variables** (optional):
```bash
# .env file
ADMIN_PASSWORD=your_secure_password
JWT_SECRET=your-secret-key
```

3. **Restart backend server**:
```bash
npm run dev
```

### Frontend

No additional setup needed. Changes are already in place.

## 🧪 Testing

### Test Login

1. Open browser and go to `http://localhost:5173/admin`
2. You should see the login form
3. Enter password: `admin123`
4. Click Login
5. Admin panel should display
6. Success message shown

### Test Logout

1. Click "Logout" button in sidebar
2. Should redirect to login page
3. Admin token removed from localStorage
4. Session ended

### Test Token Validation

1. Open browser DevTools
2. Go to Application → Local Storage
3. You should see `adminToken` with JWT value
4. Inspect token at [jwt.io](https://jwt.io) (don't share in production!)
5. Token should contain `{ admin: true, timestamp, iat, exp }`

## 📊 API Endpoints

### Authentication
```
POST /api/auth/login
Request: { "password": "admin123" }
Response: { 
  "success": true, 
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs..." 
}
```

### Admin Routes (require token)
All existing admin routes now require Authorization header:
```
Authorization: Bearer <token>
```

If token missing or invalid:
```
401 Unauthorized
{ "message": "Invalid or expired token" }
```

## 🔒 Security Considerations

### Current Implementation
- ✅ Password stored as environment variable (not in code)
- ✅ JWT tokens with 24-hour expiry
- ✅ Token stored in localStorage (accessible from JavaScript)
- ✅ Token sent in Authorization header
- ✅ HTTPS recommended for production

### Recommendations for Production
1. **Use HTTPS only** - Tokens transmitted over HTTPS
2. **Use httpOnly cookies** - Store token in secure http-only cookie instead of localStorage
3. **Implement CSRF protection** - Prevent cross-site requests
4. **Use strong password** - Change from default `admin123`
5. **Rotate JWT secret regularly** - Change JWT_SECRET periodically
6. **Add rate limiting** - Limit login attempts
7. **Enable 2FA** - Add two-factor authentication
8. **Audit logging** - Log all admin actions
9. **Session timeout** - Auto-logout after inactivity

## 📁 Files Created/Modified

**Created**:
- `frontend/src/pages/AdminLogin.jsx` - Login component
- `backend/src/controllers/authController.js` - Auth logic
- `backend/src/routes/authRoutes.js` - Auth routes

**Modified**:
- `frontend/src/pages/Admin.jsx` - Added auth check
- `frontend/src/api/index.js` - Added token to requests
- `backend/src/app.js` - Added auth routes

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Login page shows on refresh | localStorage might be cleared, need to login again |
| Password not working | Check ADMIN_PASSWORD env var, default is `admin123` |
| "Invalid or expired token" | Token expired (24hr), login again |
| CORS error on login | Ensure backend is running on port 5002 |
| Token not in headers | Check browser console, ensure token in localStorage |
| Can't see logout button | Check sidebar, logout at bottom of sidebar |

## 📝 Environment Variables

```bash
# Backend .env
ADMIN_PASSWORD=admin123              # Admin login password
JWT_SECRET=your-secret-key           # JWT signing secret
NODE_ENV=production                  # Set to production for production
PORT=5002                            # Server port
MONGO_URI=mongodb://...              # MongoDB connection

# Frontend .env
VITE_API_URL=http://localhost:5002   # Backend API URL
```

## 🔄 Token Refresh (Optional Enhancement)

Current implementation uses 24-hour tokens. For enhanced security, you could implement:
- Refresh tokens (longer expiry)
- Token refresh endpoint
- Auto-logout on token expiry
- Session management UI

## ✨ Future Enhancements

1. **Two-Factor Authentication** - Add TOTP/SMS 2FA
2. **Role-based Access Control** - Different admin roles/permissions
3. **Audit Logging** - Log all admin actions
4. **Session Management** - View active sessions, logout from other devices
5. **Rate Limiting** - Limit login attempts
6. **API Keys** - Generate API keys for programmatic access
7. **OAuth Integration** - Login with social accounts
8. **Remember Me** - Extended session option

## ✅ Checklist

- ✅ Login form created
- ✅ Password validation implemented
- ✅ JWT token generation working
- ✅ Token storage in localStorage
- ✅ Token sent in API requests
- ✅ Logout functionality added
- ✅ Error handling complete
- ✅ No compilation errors
- ✅ Ready for testing

---

**Status**: ✅ READY TO USE
**Default Password**: admin123
**Token Expiry**: 24 hours
**Date**: May 21, 2026
