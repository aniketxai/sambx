# Order Cancellation Implementation

## Overview
Added complete order cancellation functionality with automatic email notifications to both admin and customer.

## Changes Made

### 1. Backend Controller (`src/controllers/orderController.js`)
- **Added `cancelOrder` function** that:
  - Accepts `orderId` as parameter and optional `cancellationReason` in request body
  - Validates order exists
  - Prevents cancellation of already cancelled orders
  - Prevents cancellation of delivered orders
  - Updates order status to `'cancelled'`
  - Triggers cancellation email notification
  - Returns success response with updated order data

### 2. Backend Routes (`src/routes/orderRoutes.js`)
- **Added new route**: `PATCH /api/orders/:orderId/cancel`
- Routes cancellation request to the new `cancelOrder` controller

### 3. Email Notification (`src/utils/mailer.js`)
- **Added `sendOrderCancellationEmail` function** that:
  - Sends to both admin and customer
  - **Admin Email**:
    - Subject: `❌ Order Cancelled - {orderNumber}`
    - Includes customer information
    - Shows cancellation reason (if provided)
    - Displays order items and total amount
    - Red styling to indicate cancellation
  
  - **Customer Email**:
    - Subject: `Order Cancellation Confirmation - {orderNumber}`
    - Friendly confirmation message
    - Shows order details and cancelled items
    - Includes refund information (3-5 business days for online payments)
    - Professional styled template

## API Usage

### Cancel an Order
```bash
PATCH /api/orders/:orderId/cancel
Content-Type: application/json

{
  "cancellationReason": "Customer requested cancellation"
}
```

### Response
```json
{
  "success": true,
  "message": "Order cancelled successfully",
  "data": {
    "_id": "order_id",
    "orderNumber": "SBX-12345-789",
    "status": "cancelled",
    ...
  }
}
```

## Error Handling
- **404**: Order not found
- **400**: Order already cancelled or order is delivered

## Email Features
- ✅ HTML formatted emails with professional styling
- ✅ Customer-friendly cancellation confirmation
- ✅ Admin notification with full details
- ✅ Optional cancellation reason field
- ✅ Refund information for online payments
- ✅ Order summary with items and amounts
- ✅ Automatic currency formatting (INR)

## Testing the Feature

1. **Create an order** (if not already created)
   ```bash
   POST /api/orders
   ```

2. **Cancel the order**
   ```bash
   PATCH /api/orders/{order_id}/cancel
   {
     "cancellationReason": "Test cancellation"
   }
   ```

3. **Check emails**:
   - Admin receives notification at: `ORDER_NOTIFICATION_EMAIL` env var
   - Customer receives confirmation at: Their email from order shipping info

## Environment Requirements
Ensure these variables are set in `.env`:
- `SMTP_HOST` - Email server host
- `SMTP_PORT` - Email server port (default: 587)
- `SMTP_USER` - Email account username
- `SMTP_PASS` - Email account password
- `SMTP_SECURE` - Set to 'true' for port 465, 'false' for 587
- `ORDER_NOTIFICATION_EMAIL` - Admin email for order notifications
- `MAIL_FROM` - (Optional) From email display name

## Notes
- Order status is already set to `'cancelled'` in the Order model schema
- The cancellation is reversible (could be reopened with additional logic if needed)
- Refunds for online payments need manual processing or integration with payment gateway
- COD orders cancellation can be handled through the reason field
