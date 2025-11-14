# Image Resize Project

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
- multer (file uploads)
  **Frontend:**

- Angular
- TypeScript
- RxJS

**Deployment & CI/CD**

- Backend Server: Deployed on Sevella
- Frontend: Deployed on **Cloudflare Pages**
- Continuous Integration & Deployment: CircleCI ![CircleCI](https://circleci.com/gh/mryahya-dev/image-processing-api.svg?style=svg)

  - Runs automated **tests**
  - Builds **Docker images** for backend and frontend
  - Pushes images to **Docker Hub**
  - Deployment is triggered automatically

> **Note:** Both backend and frontend have ready-to-use Dockerfiles for containerized deployment.

---

## Folder Structure

```

root/
├─ backend/        # Node.js API
│  ├─ Dockerfile
│  ├─ src/
│  ├─ package.json
│  └─ .env.example
├─ frontend/       # Angular app
│  ├─ Dockerfile
│  ├─ src/
│  ├─ angular.json
│  └─ package.json
├─ .circleci/      # CircleCI configuration
│  └─ config.yml
├─ README.md

```

---

## Features

- Upload images from your computer
- Resize images by URL with options for width, height, format, and quality
- List all uploaded images via API
- Receive JSON responses from API endpoints
- Automatically generate UUID filenames for uploaded images
- download image
- Enforce basic validation and size limits

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

## Check Live Demo using UI

Try the app live here: [https://image-resizer.yahyeapps.com](https://image-resizer.yahyeapps.com)

---

## Security Notes

> This project is for demonstration purposes. Anyone can resize images and view all uploaded images. **No login is required.**
