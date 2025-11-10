# Image Resize API

## Features

- Fetch remote images (or local) by URL
- Resize using width and/or height query parameters
- Convert format (jpeg, png, webp)
- Save to disk under `uploads/` with UUID filenames
- Basic validation and size limits

## Quickstart

1. Copy files and run:
   ```bash
   npm install
   ```
2. Create `.env` from `.env.example`.
3. Start development server:
   ```bash
   npm run dev
   ```
   or build and start for production:
   ```bash
   npm run build && npm start
   ```

## Example Usage

Resize an image:

```
GET /resize?url=https://example.com/photo.jpg&w=300&h=200&fmt=png
```

List all uploaded images:

```
GET /images
```

## Security Notes

> This is intended for demonstration purposes. Anyone can change the image size and view all images. **No login is required.**
