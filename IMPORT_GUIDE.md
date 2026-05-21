# Product Import Guide

## Overview
This feature allows you to import products from a JSON file directly into your database with automatic image upload to Cloudinary.

## Features
- **Batch Import**: Import up to 42+ products at once
- **Automatic Image Upload**: Base64-encoded images are automatically uploaded to Cloudinary
- **Error Handling**: Failed imports don't stop the process - detailed error reports included
- **Preview**: See import results before finishing

## File Format

The JSON file must be an array of product objects with the following structure:

```json
[
  {
    "id": 1,
    "name": "Product Name",
    "price": 119,
    "material": "PLA",
    "category": "decor",
    "stock": "in",
    "rating": 4.5,
    "reviews": 10,
    "desc": "Product description",
    "img": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQA..."
  }
]
```

### Supported Image Formats
- **Base64 Data URLs**: `data:image/jpeg;base64,<base64_string>`
- **HTTP URLs**: `https://example.com/image.jpg`

### Field Mapping
| JSON Field | Database Field | Default |
|-----------|----------------|---------|
| `id` | N/A (for reference) | - |
| `name` | name | Required |
| `price` | price | 0 |
| `desc` | description | "" |
| `category` | category | "general" |
| `material` | material | "" |
| `stock` | stock (boolean) | false |
| `rating` | rating | 0 |
| `reviews` | reviews | 0 |
| `img` | images (array) | [] |

## How to Use

### Method 1: Admin Panel (Recommended)

1. Navigate to **Admin Panel** → **Catalog**
2. Click the **Import** button (with upload icon)
3. Select your JSON file
4. Click **Import Products**
5. Wait for the process to complete
6. Review the import summary and any errors

### Method 2: Command Line Script

For production use or batch processing:

```bash
cd backend

# Set environment variables
export CLOUDINARY_CLOUD_NAME=your_cloud_name
export CLOUDINARY_UPLOAD_PRESET=your_preset
export MONGODB_URI=your_mongodb_uri

# Run the import script
node scripts/importProducts.js /path/to/sambx-catalogue.json
```

## API Endpoint

**POST** `/api/admin/import-products`

### Request
- **Content-Type**: `multipart/form-data`
- **Body**: Form data with `file` field containing JSON file

### Response
```json
{
  "success": true,
  "summary": {
    "total": 42,
    "imported": 40,
    "failed": 2
  },
  "products": [...],
  "errors": [
    "Product name: Error message",
    ...
  ]
}
```

## Prerequisites

### Environment Variables

Ensure these are set in your `.env` file:

```env
# Cloudinary (from frontend .env too)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_UPLOAD_PRESET=your_preset

# MongoDB
MONGODB_URI=your_mongodb_uri

# Optional: Node environment
NODE_ENV=production
```

### Required Packages

The following packages should be installed:

- `multer` - File upload handling
- `form-data` - Cloudinary upload requests
- `node-fetch` - HTTP requests (if using Node < 18)

## Troubleshooting

### Import Fails with "Invalid data URL format"
- Ensure images are in proper base64 format: `data:image/jpeg;base64,...`
- Check that the JSON is valid using `jq` or an online JSON validator

### "Missing Cloudinary credentials" Error
- Set `CLOUDINARY_CLOUD_NAME` and `CLOUDINARY_UPLOAD_PRESET` environment variables
- Check `.env` file exists and is loaded

### Images Not Uploading
- Verify Cloudinary upload preset is set to "Unsigned"
- Check CORS settings in Cloudinary dashboard
- Ensure base64 images are valid (not truncated)

### MongoDB Connection Error
- Verify `MONGODB_URI` is correct and MongoDB is running
- Check network connectivity to MongoDB Atlas

## Example Workflow

```bash
# 1. Export products from existing system
# → Save as sambx-catalogue.json

# 2. Validate JSON structure
cat sambx-catalogue.json | jq 'length'  # Should show product count

# 3. Open Admin Panel
# → Navigate to Catalog → Click Import

# 4. Select file and import
# → Wait for completion

# 5. Check results
# → View summary and error list
# → Products now in database with Cloudinary URLs
```

## Best Practices

1. **Test First**: Always test with a small subset of products first
2. **Backup Database**: Create a backup before importing
3. **Monitor Errors**: Check error list and fix problematic products
4. **Rate Limiting**: The script includes delays to avoid Cloudinary rate limits
5. **Deduplicate**: Check for existing products before importing to avoid duplicates

## Performance

- **Time per Product**: ~500-800ms (including image upload)
- **42 Products**: ~20-30 seconds total
- **Limitations**: Depends on Cloudinary API rate limits (usually 500+ uploads/min)

## Support

For issues or questions:
1. Check error messages in the admin panel
2. Review browser console logs
3. Check server logs: `npm run dev` or `node server.js`
4. Verify file format and environment variables
