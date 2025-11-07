# E-Commerce Marketplace Backend

This is the backend for the Flipkart-style e-commerce marketplace, designed and configured for deployment on Render.

## Render Deployment Setup

Follow these steps to deploy the backend service on Render.

### 1. Create a New Web Service

In your Render dashboard, create a new "Web Service" and connect it to your GitHub repository.

### 2. Build and Start Commands

Render will detect that this is a Node.js project. Configure the build and start commands as follows:

- **Build Command**: `npm install`
- **Start Command**: `node backend/server.js`

**Note**: Ensure your `package.json` includes `"type": "module"` to support ES Module syntax.

### 3. Environment Variables

Go to the "Environment" tab for your service and add the following environment variables.

```
MONGO_URI=<your_mongodb_atlas_connection_string>
JWT_SECRET=<your_super_strong_jwt_secret_key>
FRONTEND_URL=https://e-commerce-website-ilk7.onrender.com
NODE_ENV=production
```

Render automatically sets the `PORT` variable, so you do not need to add it manually.

### 4. Deploy

Save your settings and trigger a manual deploy, or push a new commit to your main branch to start the deployment process.