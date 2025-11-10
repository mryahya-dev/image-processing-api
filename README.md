# Image Resize Project

![CircleCI](https://circleci.com/gh/username/repo.svg?style=svg)

## Check Live Demo

Try the app live here: [https://image-resizer.yahyeapps.com](https://image-resizer.yahyeapps.com)

---

## Overview

This project is an **Image Resize API** with a frontend Angular application.

- Users can resize images via API and view uploaded images in a gallery.
- Backend handles image fetching, resizing, format conversion, and saving.
- Frontend provides a responsive gallery and resize interface.

---

## Tech Stack

**Backend:**

- Node.js
- Express
- TypeScript
- Sharp (image processing)
- dotenv (environment variables)

**Frontend:**

- Angular
- TypeScript
- RxJS

**Deployment & CI/CD:**

- Server: Deployed at Sevella (https://image-resizer.yahyeapps.com)
- Continuous Integration & Deployment: CircleCI

---

## Folder Structure

```
root/
├─ backend/        # Node.js API
├─ frontend/       # Angular app
├─ .circleci/      # CircleCI configuration
├─ README.md
└─ .gitignore
```

---

## Features

- Resize images by URL with width, height, format, and quality options
- List all uploaded images via API
- JSON responses for API endpoints
- UUID filenames for uploaded images
- Basic validation and size limits

---

## Quickstart (Backend)

1. Navigate to backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create `.env` from `.env.example`:
   ```text
   PORT=3000
   UPLOAD_DIR=uploads
   ```
4. Start development server:
   ```bash
   npm run dev
   ```
5. Build for production:
   ```bash
   npm run build
   npm start
   ```

---

## API Endpoints

### Resize an Image

```
GET /resize?url=https://example.com/photo.jpg&w=300&h=200&fmt=png&ql=80
```

**Response (JSON):**

```json
{
  "message": "Image resized successfully",
  "filename": "123e4567-e89b-12d3-a456-426614174000.png",
  "url": "/uploads/123e4567-e89b-12d3-a456-426614174000.png"
}
```

### List All Uploaded Images

```
GET /images
```

**Response (JSON):**

```json
{
  "images": [
    { "filename": "image1.png", "url": "/uploads/image1.png" },
    { "filename": "image2.jpg", "url": "/uploads/image2.jpg" }
  ]
}
```

---

## Deployment (CircleCI)

- `.circleci/config.yml` handles build, test, and deploy pipelines
- Backend and frontend are deployed automatically on push to the main branch
- Environment variables for deployment are set in CircleCI project settings

---

## Security Notes

> This project is for demonstration purposes. Anyone can resize images and view all uploaded images. **No login is required.**
