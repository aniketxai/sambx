# Frontend Order Cancellation Implementation

## Overview
Updated the frontend to support order cancellation with customer email notifications.

## Changes Made

### 1. API Integration (`src/api/index.js`)
- **Added `cancelOrder` function** that calls the backend cancel endpoint
  - Accepts order ID and optional cancellation reason
  - Returns updated order with cancelled status

### 2. Order Detail Modal (`src/pages/AdminComponents/OrderDetailModal.jsx`)
- **Enhanced with cancellation UI**:
  - Cancel button (visible only for non-delivered, non-cancelled orders)
  - Modal prompt for cancellation confirmation
  - Optional cancellation reason input field
  - Error handling and loading state
  - Integrates with backend API
  - Updates parent component on successful cancellation

### 3. Orders Management Section (`src/pages/AdminComponents/OrdersAndEnquiriesSection.jsx`)
- **Added quick cancel button** for each order in the list
  - Red-styled button with X icon
  - Inline cancellation dialog
  - Optional cancellation reason field
  - Updates order list on successful cancellation
  - Added 'cancelled' status to filter options

### 4. Admin Page (`src/pages/Admin.jsx`)
- **Added `handleOrderUpdated` callback** to update order state
- **Pass callback to components**:
  - OrdersSection receives `onOrderUpdated` prop
  - OrderDetailModal receives `onOrderUpdated` prop
  - Updates adminOrders state when order is cancelled
  - Keeps modal synchronized with order state

## Features

✅ Cancel orders from order detail view
✅ Quick cancel from orders list
✅ Optional cancellation reason
✅ Real-time order status update
✅ Error handling and user feedback
✅ Automatic customer email notification
✅ Admin notification email
✅ Prevents cancelling delivered orders
✅ Prevents double-cancellation

## UI Components

### Cancel Button (List View)
- Red-styled button
- X icon
- Only shows for cancellable orders
- Inline confirmation dialog

### Cancel Modal (Detail View)
- Full confirmation prompt
- Cancellation reason textarea
- Confirm/Keep Order buttons
- Red themed styling
- Error message display

## User Flow

1. **From Orders List**:
   - Admin clicks "Cancel" button on order card
   - Inline dialog appears
   - Enter optional reason
   - Click "Confirm" to proceed
   - Order status updates to cancelled
   - Emails sent to admin and customer

2. **From Order Detail Modal**:
   - Admin clicks "Cancel Order" button
   - Confirmation modal appears
   - Enter optional reason
   - Click "Confirm Cancel"
   - Modal closes
   - Order detail updates
   - Emails sent

## API Endpoints Used

- `PATCH /api/orders/:orderId/cancel` - Cancel order with optional reason

## Email Notifications

When order is cancelled:
- **Admin Email**: Full order details, customer info, cancellation reason
- **Customer Email**: Order confirmation, refund info for online payments, order summary

## Error Handling

- Validates order exists
- Prevents cancelling delivered orders
- Prevents double-cancellation
- Displays user-friendly error messages
- Loading states during cancellation

## Status Options Updated

Order status filter now includes:
- All
- pending
- paid
- processing
- shipped
- delivered
- cancelled (NEW)

## State Management

- `isCanceling` - Loading state during cancellation
- `showCancelPrompt` - Show/hide cancellation dialog
- `cancelReason` - User-entered cancellation reason
- `cancelError` - Error message display
- `cancelingOrderId` - Track which order is being cancelled

## Styling

- Red theme for cancellation (matching error/danger patterns)
- Consistent with existing admin UI
- Responsive design for mobile/tablet
- Professional confirmation flow
