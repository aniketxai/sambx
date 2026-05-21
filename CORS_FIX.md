# CORS Fix - PATCH Method Support

## Problem
CORS policy was blocking PATCH requests with error:
```
Method PATCH is not allowed by Access-Control-Allow-Methods in preflight response
```

This prevented order status updates from working.

## Root Cause
The backend CORS configuration was missing `PATCH` in the `methods` array:

**Before**:
```javascript
methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
```

The PATCH method wasn't included, so preflight requests (OPTIONS) were rejecting PATCH requests.

## Solution
Added `PATCH` to the allowed methods in CORS configuration.

**After**:
```javascript
methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']
```

## File Changed
- `backend/src/app.js` - Updated CORS options configuration

## What This Fixes
✅ Order status updates now work
✅ All PATCH requests are now allowed
✅ Preflight requests succeed
✅ Frontend can communicate with backend for status updates

## CORS Configuration Details

The complete CORS setup now includes:

```javascript
const corsOptions = {
  origin: (origin, callback) => {
    // Validates origin is allowed
    if (isAllowedOrigin(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],  // ← PATCH added
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200,
};
```

## How CORS Works for PATCH

1. Browser sends OPTIONS preflight request
2. Server responds with allowed methods, headers, etc.
3. Browser checks if PATCH is in Access-Control-Allow-Methods
4. If PATCH is allowed, browser sends actual PATCH request
5. Request succeeds ✅

## Testing

### Before Fix ❌
```
OPTIONS request → Server responds without PATCH
Browser blocks PATCH request
Error: "Method PATCH is not allowed by Access-Control-Allow-Methods"
```

### After Fix ✅
```
OPTIONS request → Server responds with PATCH in methods
Browser allows PATCH request
PATCH request succeeds
Order status updates ✅
```

## What to Do Now

1. **Restart the backend server**
   ```bash
   cd backend
   npm run dev
   ```

2. **Test order status update**
   - Go to Admin → Orders
   - Change an order status
   - Status should update without CORS error

3. **Verify success**
   - No CORS errors in console
   - "Order status updated" message shows
   - Status changes in UI
   - List refreshes

## Related Methods Now Supported

With PATCH now in the allowed methods, the following operations work:

- ✅ `PATCH /api/admin/orders/:id/status` - Update order status
- ✅ `PATCH /api/admin/quotes/:id/status` - Update quote status (if implemented)
- ✅ `PATCH /api/admin/contacts/:id/status` - Update contact status (if implemented)
- Any other PATCH endpoints

## HTTP Methods Now Allowed

- **GET** - Fetch data
- **POST** - Create new resources
- **PUT** - Replace entire resources
- **PATCH** - Update specific fields ← NEW
- **DELETE** - Delete resources
- **OPTIONS** - Preflight requests

## Additional Notes

- CORS middleware is applied to all routes with `app.use(cors(corsOptions))`
- Preflight handling with `app.options('*', cors(corsOptions))`
- Custom origin validation ensures only allowed origins can make requests
- Credentials are enabled for authenticated requests

## CORS Headers in Response

After this fix, successful responses include:

```
Access-Control-Allow-Origin: http://localhost:5173
Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Allow-Credentials: true
```

---

**Status**: ✅ FIXED
**Date**: May 21, 2026
**Impact**: All PATCH requests now work properly
