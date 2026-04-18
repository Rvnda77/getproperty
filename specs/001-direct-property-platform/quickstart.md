# Quick Start Guide

**Feature**: Direct Property Platform
**Date**: 2026-04-18
**Environment**: Development

## Prerequisites

- Node.js 18+ and npm
- MongoDB (local or cloud instance)
- Firebase project with Authentication enabled
- Google Maps API key
- Git

## Environment Setup

### 1. Clone and Install Dependencies

```bash
# Backend setup
cd backend
npm install

# Frontend setup
cd ../frontend
npm install
```

### 2. Environment Variables

Create `.env` files in both backend and frontend directories.

**backend/.env**:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/propertyapp
JWT_SECRET=your-jwt-secret-key
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_PRIVATE_KEY=your-firebase-private-key
FIREBASE_CLIENT_EMAIL=your-firebase-client-email
GOOGLE_MAPS_API_KEY=your-google-maps-api-key
NODE_ENV=development
```

**frontend/.env**:
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_FIREBASE_API_KEY=your-firebase-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your-firebase-project-id
REACT_APP_GOOGLE_MAPS_API_KEY=your-google-maps-api-key
```

### 3. Firebase Setup

1. Create Firebase project at https://console.firebase.google.com
2. Enable Authentication with Email/Password and Phone providers
3. Generate service account key for backend
4. Copy credentials to backend/.env

### 4. Google Maps Setup

1. Get API key from Google Cloud Console
2. Enable Maps JavaScript API and Geocoding API
3. Add API key to both .env files

### 5. MongoDB Setup

```bash
# Using local MongoDB
brew install mongodb-community  # macOS
# or download from mongodb.com

# Start MongoDB
mongod --dbpath /path/to/data/db

# Or use MongoDB Atlas (cloud)
# Set MONGODB_URI to your Atlas connection string
```

## Running the Application

### Development Mode

1. **Start Backend**:
   ```bash
   cd backend
   npm run dev
   ```
   Server runs on http://localhost:5000

2. **Start Frontend**:
   ```bash
   cd frontend
   npm start
   ```
   App runs on http://localhost:3000

### Production Build

1. **Build Backend**:
   ```bash
   cd backend
   npm run build
   npm start
   ```

2. **Build Frontend**:
   ```bash
   cd frontend
   npm run build
   # Serve build files with nginx or similar
   ```

## Testing

### Run Tests

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

### API Testing

Use tools like Postman or curl to test endpoints:

```bash
# Test properties endpoint
curl -X GET "http://localhost:5000/api/properties?city=Mumbai" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Database Seeding

```bash
# Seed sample data
cd backend
npm run seed
```

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**:
   - Ensure MongoDB is running
   - Check MONGODB_URI in .env

2. **Firebase Auth Error**:
   - Verify Firebase credentials
   - Check Firebase project settings

3. **CORS Issues**:
   - Backend allows requests from http://localhost:3000
   - Check CORS middleware configuration

4. **Google Maps Not Loading**:
   - Verify API key
   - Check API restrictions
   - Ensure billing is enabled on Google Cloud

### Logs

- Backend logs: `backend/logs/`
- Frontend console: Browser DevTools
- MongoDB logs: MongoDB log files

## Development Workflow

1. Create feature branch from main
2. Make changes with tests
3. Run full test suite
4. Create pull request
5. Code review and merge

## Deployment

### Backend Deployment
- Use services like Heroku, Railway, or AWS
- Set production environment variables
- Configure MongoDB Atlas for production

### Frontend Deployment
- Use Vercel, Netlify, or AWS S3+CloudFront
- Build and deploy static files
- Configure API base URL for production

### Environment Variables for Production
- Use secure secret management
- Enable HTTPS
- Configure proper CORS origins
- Set NODE_ENV=production

## Support

For issues:
1. Check logs and error messages
2. Verify environment configuration
3. Test with sample data
4. Check API documentation in `/contracts/`
5. Create issue in project repository