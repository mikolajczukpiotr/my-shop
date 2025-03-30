# MyShop - React E-commerce Application

A modern e-commerce application built with React, TypeScript, Redux, and React Query. This project demonstrates a complete online shopping experience with product browsing, filtering, cart management, and persistent storage.


## Features

- **Product Catalog** - Browse products with image, title, and price
- **Category Filtering** - Filter products by categories
- **Pagination** - Navigate through product listings
- **Product Details** - View detailed product information with image, description, ratings
- **Shopping Cart** - Add, remove, and update product quantities
- **Cart Persistence** - Cart data is saved to localStorage for persistence across sessions
- **Responsive Design** - Mobile-friendly interface using Tailwind CSS

## Technologies Used

- **React** - UI library
- **TypeScript** - Type-safe JavaScript
- **Redux & Redux Toolkit** - State management
- **React Query (TanStack Query)** - Data fetching and caching
- **Axios** - HTTP client
- **Tailwind CSS** - Utility-first CSS framework
- **localStorage API** - Client-side storage
- **FakeStore API** - RESTful product data source

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/myshop.git
   cd myshop
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

4. The application will open in your browser at [https://shop.local:3000](https://shop.local:3000)

### Development with HTTPS and Custom Domain

To use the custom domain (shop.local) with HTTPS:

1. Add the hostname to your hosts file:
   ```bash
   sudo sh -c 'echo "127.0.0.1 shop.local" >> /etc/hosts'
   ```

2. Generate self-signed SSL certificates:
   ```bash
   mkdir -p ./.cert
   openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout ./.cert/key.pem -out ./.cert/cert.pem -subj "/CN=shop.local" -addext "subjectAltName=DNS:shop.local"
   ```

3. Verify your .env file contains:
   ```
   HOST=shop.local
   HTTPS=true
   SSL_CRT_FILE=./.cert/cert.pem
   SSL_KEY_FILE=./.cert/key.pem
   ```

## Project Structure

```
myshop/
├── public/               # Static files
├── src/                  # Source code
│   ├── api/              # API services and interfaces
│   ├── components/       # React components
│   │   ├── Cart/         # Shopping cart components
│   │   ├── Header/       # Header with navigation
│   │   ├── ProductDetail/# Product detail view
│   │   ├── ProductList/  # Product listing and filters
│   │   └── UI/           # Reusable UI components
│   ├── hoc/              # Higher-Order Components
│   ├── hooks/            # Custom React hooks
│   ├── store/            # Redux store configuration
│   ├── App.tsx           # Main application component
│   └── index.tsx         # Application entry point
├── .env                  # Environment variables
└── tailwind.config.js    # Tailwind CSS configuration
```

## Key Implementation Details

- **Component Architecture**: Mixture of functional components with hooks for modern patterns
- **State Management**: Redux for application state with localStorage integration for persistence
- **Data Fetching**: React Query for efficient data loading, caching, and state management
- **Performance Optimization**: React.memo for preventing unnecessary re-renders
- **User Experience**: Toast notifications, animations, and responsive design

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run predeploy` - Builds the app for deployment
- `npm run deploy` - Deploys the app to GitHub Pages
- `npm run eject` - Ejects from Create React App

## Deployment

This project is configured for deployment to GitHub Pages:

1. Update the `homepage` field in `package.json` with your GitHub username:
   ```json
   "homepage": "https://YOUR_USERNAME.github.io/my-shop"
   ```

2. Deploy the application:
   ```bash
   npm run deploy
   ```

3. Once deployed, your application will be available at `https://YOUR_USERNAME.github.io/my-shop`

## Acknowledgments

- [FakeStore API](https://fakestoreapi.com/) for providing product data
- [Create React App](https://create-react-app.dev/) for the initial project setup
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework

---
