# E-Commerce Marketplace Frontend

This is the frontend for the MERN e-commerce marketplace, built with React and Vite.

## Local Development

1.  **Navigate to the frontend directory:**
    From the project root, run:
    ```bash
    cd frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Create an environment file:**
    Create a `.env.local` file in the `frontend` directory. This file will tell your React app where to find the backend API.

    ```env
    VITE_BACKEND_URL=http://localhost:5000
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:3000`.

## Building for Production

To create a production build of the frontend, run:
```bash
npm run build
```
This will generate a `dist` folder with the optimized static assets. The backend server is configured to serve this folder in production.