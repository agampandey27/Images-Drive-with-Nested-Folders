# 🚀 Dobby Ads Drive
A modern web application that allows users to create nested folders and upload images with a Google Drive-like interface. Built with React.js, Node.js, and MongoDB.

## 📋 Table of Contents

### Features
- Tech Stack
- Getting Started
- Installation
- Usage
- API Endpoints
- Screenshots
- Demo Credentials
- Deployment
- Contributing

## ✨ Features
### 🔐 Authentication

- User Registration - Create new accounts with email and password
- User Login - Secure authentication with JWT tokens
- User Logout - Clean session management
Protected Routes 
- User-specific access control

### 📁 Folder Management

- Create Nested Folders 
- Build hierarchical folder structures like Google Drive
- Folder Navigation 
- Intuitive breadcrumb navigation
- Real-time Updates
- Instant folder creation and updates
- User-Specific Access
- Users can only see their own folders

### 🖼️ Image Management

- Image Upload - Upload images with custom names
- Image Preview - Full-screen image modal for viewing
- Image Download - Download images with proper file handling
- Folder Organization - Upload images to specific folders

### 🔍 Search Functionality

- Image Search - Search through user's images by name
- Real-time Search - Instant search results as you type
- User-Specific Results - Search only within user's own images

### 🎨 User Interface

Modern Design - Clean, responsive interface
Loading States - Visual feedback during operations
Mobile Responsive - Works seamlessly on all devices
Intuitive Navigation - Easy-to-use folder structure

## 🛠️ Tech Stack
### Frontend

React.js - Modern JavaScript library for building user interfaces
React Router - Client-side routing for single-page application
Axios - HTTP client for API requests
Tailwind CSS - Utility-first CSS framework
Context API - State management for authentication

### Backend

Node.js - JavaScript runtime for server-side development
Express.js - Web framework for Node.js
MongoDB - NoSQL database for data storage
Mongoose - MongoDB object modeling for Node.js
JWT - JSON Web Tokens for authentication
Multer - Middleware for handling multipart/form-data
Cloudinary - Cloud storage for image uploads

### Development Tools

ESLint - Code linting for JavaScript
Prettier - Code formatting
Nodemon - Development server with auto-restart
CORS - Cross-Origin Resource Sharing middleware

### 🚀 Getting Started
### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- Git

### Installation

- Clone the repository
- bashgit clone {THIS_REPO_URL}
- cd {folder_repo_name}

#### Install Backend Dependencies
- bashcd backend
- npm install

#### Install Frontend Dependencies
- bashcd ../frontend
- npm install

#### Environment Setup
- Create .env file in the backend directory:
- envPORT=9090
- MONGODB_URI={YOUR MONGO DB CONNECTION STRING}
- JWT_SECRET=your-super-secret-jwt-key
- CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
- CLOUDINARY_API_KEY=your-cloudinary-api-key
- CLOUDINARY_API_SECRET=your-cloudinary-api-secret

### Start the Application
- Backend (Terminal 1):
- bashcd backend
- npm run dev
- Frontend (Terminal 2):
- bashcd frontend
- npm run dev

### Access the Application

- Frontend: http://localhost:5173
- Backend API: http://localhost:9090

### 📖 Usage
#### Getting Started

- Register - Create a new account with email and password
- Login - Access your dashboard with credentials
- Create Folders - Start organizing your files with nested folders
- Upload Images - Add images to your folders with custom names
- Search - Find your images quickly using the search functionality

#### Navigation

- Dashboard - View all your root folders
- Folder View - Navigate through nested folders
- Image Preview - Click on images for full-screen view
- Search - Use the search bar to find specific images

## 🔌 API Endpoints
### Authentication

- POST /api/auth/register - User registration
- POST /api/auth/login - User login
- POST /api/auth/logout - User logout

### Folders

- GET /api/folder/root - Get root folders
- GET /api/folder/:id - Get folder contents
- POST /api/folder/ - Create new folder
- DELETE /api/folder/:id - Delete folder

### Images

- GET /api/image/folder/:folderId - Get images in folder
- POST /api/image/upload/:folderId - Upload image to folder
- GET /api/image/search - Search images by name
- DELETE /api/image/:id - Delete image

### 🙏 Acknowledgments

Thanks to Dobby Ads for the opportunity to build this application
Inspired by Google Drive's folder structure and user interface
Built with modern web technologies for optimal performance

### 📞 Contact
For any questions or support, please contact:

- Email: agampandey705@gmail.com
- GitHub: https://github.com/agampandey27
- LinkedIn: https://www.linkedin.com/in/agampandeyy/


Built with ❤️ by Agam Pandey