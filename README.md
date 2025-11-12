# Image Resize Project

![CircleCI](https://circleci.com/gh/mryahya-dev/image-processing-api.svg?style=svg)

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

- Backend Server: Deployed on Sevella
- Frontend: Deployed on **Cloudflare Pages**
- Continuous Integration & Deployment: CircleCI
  - Runs automated **tests**
  - Builds **Docker image** for backend
  - Pushes images to **Docker Hub**
  - Deployment is triggered automatically

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

## CI/CD Pipeline (CircleCI)

- CircleCI **runs backend tests** to ensure functionality
- Then it **builds Docker images** for backend and frontend
- Finally, it **pushes the images to Docker Hub**
- This ensures that the latest versions are always ready for deployment

---

## Check Live Demo using UI

Try the app live here: [https://image-resizer.yahyeapps.com](https://image-resizer.yahyeapps.com)

---

## Security Notes

> This project is for demonstration purposes. Anyone can resize images and view all uploaded images. **No login is required.**
