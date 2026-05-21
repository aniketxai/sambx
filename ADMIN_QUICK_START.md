# Quick Start Guide - SAMBX Admin Dashboard

## How to Use Each Section

### 🏠 OVERVIEW TAB
**What it shows:**
- KPI cards (Revenue, Orders, Pending, Messages, Low Stock)
- Sales snapshot with revenue trends
- Fulfillment status and quick alerts
- Recent activity log
- Top orders and inventory status
- Top enquiries

**Actions:**
- Click "Add product" button to create new products
- Click "Export" to download all data as JSON

---

### 📦 CATALOG TAB
**What it shows:**
- All products in a searchable, filterable table
- Filter by category
- Search by name, category, or description

**Actions:**
- **Eye Icon**: View product details
- **Trash Icon**: Delete product
- **Editor on right**: Create new or edit selected product

**To Create a Product:**
1. Click "Add product" button or navigate to Catalog tab
2. Fill in required fields (Name, Category, Price, Description)
3. Optional: Add images, features, ratings, stock quantity
4. Click "Create" button
5. Refresh shows new product

**To Edit a Product:**
1. Click eye icon on product row
2. Form auto-fills with current data
3. Make changes
4. Click "Update" button

**To Delete a Product:**
1. Click trash icon
2. Confirm deletion
3. Product removed from database

---

### 📋 ORDERS TAB
**What it shows:**
- All orders with status badges
- Customer names and order totals
- Payment methods

**Actions:**
- Click status dropdown to change order status
- Click "Save" to update in database
- Click "View" to see order details

**Status Flow:**
```
pending → paid → processing → shipped → delivered
```

**Filters:**
- All (default)
- Pending
- Paid  
- Processing
- Shipped
- Delivered

---

### 💬 ENQUIRIES TAB
**What it shows:**
- Contact messages and quote requests
- Customer/company names
- Subject/message preview
- Status and date

**Actions:**
- Click "Respond" to reply (opens prompt)
- Filter by status (All, New, In-review, Quoted, Replied)

**Status Types:**
- **new**: Unread enquiry
- **in-review**: Being reviewed by team
- **quoted**: Quote has been sent
- **replied**: Response sent to customer

---

### 📊 ANALYTICS TAB
**What it shows:**
- Revenue metrics (Total, Average Order Value)
- Customer metrics (Total Customers, Repeat Rate)
- Order breakdown by status
- Enquiry conversion rates
- Performance indicators

**Features:**
- Real-time calculations from your data
- Status distribution charts
- Performance metrics
- Time period selector

---

### ⚙️ SETTINGS TAB
**What it shows:**
- Store information (name, email, currency)
- Email configuration (SMTP settings)
- Notification preferences
- Payment gateway settings
- Shipping costs
- Security options

**To Save Settings:**
1. Update any fields
2. Click "Save Settings" button
3. Changes are persisted

---

## Common Tasks

### Export Your Data
1. Go to Overview tab
2. Click "Export" button
3. JSON file downloads automatically
4. Contains: Products, Orders, Quotes, Contacts with timestamp

### Import Products
1. Go to Catalog tab
2. Click "Bulk import" button
3. Select JSON file with products array
4. System processes import

### Update Order Status
1. Go to Orders tab
2. Find order in list
3. Click status dropdown
4. Select new status
5. Click "Save" button
6. Status updates in database

### Respond to a Customer
1. Go to Enquiries tab
2. Find the message/quote
3. Click "Respond" button
4. View details to send email

### Create a New Product
1. Click "Add product" button or go to Catalog tab
2. Fill form with:
   - Name * (required)
   - Category * (required)
   - Price * (required)
   - Description * (required)
   - Stock Qty
   - Rating
   - Images (comma-separated URLs)
3. Click "Create" button
4. Product appears in catalog

---

## What Data Syncs with Backend

✅ Product changes (create, update, delete)
✅ Order status updates
✅ Quote/Contact status updates
✅ Dashboard summaries and counts
✅ All filtered views

---

## Troubleshooting

**If data doesn't load:**
- Check if backend is running
- Verify VITE_API_URL environment variable
- Check browser console for errors

**If changes don't save:**
- Check network tab for failed requests
- Verify API endpoint is correct
- Check backend is responding with 200/success

**If buttons don't work:**
- Refresh the page
- Check browser console for errors
- Verify you have required data selected

---

## API Response Format

All admin endpoints return:
```javascript
{
  success: true,
  message: "Operation successful",
  data: { /* actual data */ }
}
```

Errors return:
```javascript
{
  success: false,
  message: "Error description"
}
```

---

**Need help?** Check ADMIN_IMPLEMENTATION.md for technical details.
