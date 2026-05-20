# SAMBX Deployment Guide

This guide explains how to deploy the frontend and backend separately to Vercel.

## Backend Deployment (https://sambx-5vc4.vercel.app)

### 1. Create Vercel Project for Backend
- Go to https://vercel.com/new
- Import the **sambx** repository
- Set **Root Directory** to `backend`
- Click Deploy

### 2. Set Backend Environment Variables in Vercel

In your Vercel project settings, add these environment variables:

```
MONGO_URI=mongodb+srv://sambx:shiv%4012@cluster0.m41uvme.mongodb.net/sambx?retryWrites=true&w=majority
CORS_ORIGIN=https://sambx.vercel.app
ORDER_NOTIFICATION_EMAIL=aniketxai@gmail.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
MAIL_FROM=SAMBX <your-email@gmail.com>
```

**Important**: The `CORS_ORIGIN` must match your frontend deployment URL. If you change the frontend domain, update this env var.

## Frontend Deployment (https://sambx.vercel.app)

### 1. Create Vercel Project for Frontend
- Go to https://vercel.com/new
- Import the **sambx** repository
- Set **Root Directory** to `frontend`
- Click Deploy

### 2. Set Frontend Environment Variables in Vercel

In your Vercel project settings, add:

```
VITE_API_URL=https://sambx-5vc4.vercel.app
```

**Important**: Replace `https://sambx-5vc4.vercel.app` with your actual backend deployment URL.

## Fixing CORS Issues

If you see a CORS error like:
```
Access to fetch at 'https://sambx-5vc4.vercel.app/api/products/home' from origin 'https://sambx.vercel.app' has been blocked by CORS policy
```

This means the backend `CORS_ORIGIN` is not set correctly. Fix it by:

1. Go to your backend Vercel project settings
2. Find the `CORS_ORIGIN` environment variable
3. Make sure it exactly matches the frontend URL (e.g., `https://sambx.vercel.app`)
4. Redeploy the backend

## Local Development

For local testing, use:

**Backend**:
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your local MongoDB URI
npm run dev
```

**Frontend**:
```bash
cd frontend
npm install
cp .env.example .env
# Edit .env with VITE_API_URL=http://localhost:5001
npm run dev
```

## API Health Check

Test if the backend is working:
- https://sambx-5vc4.vercel.app/api/health

Should return:
```json
{
  "success": true,
  "message": "SAMBX API is running"
}
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| **CORS blocked** | Set backend `CORS_ORIGIN` env var to frontend URL |
| **Backend returns 500** | Check backend logs in Vercel, verify `MONGO_URI` is set |
| **Frontend shows "API URL missing"** | Set `VITE_API_URL` env var in frontend Vercel project |
| **Double slash in requests** | Should be fixed, but verify frontend `.env` doesn't have trailing slash |

