# 🌍 Environment Setup Guide

This guide explains how to run the Quadra Core MLM Portal in different environments.

## 📁 Environment Files

The project includes three environment configuration files:

- `.env.development` - Development environment settings
- `.env.staging` - Staging environment settings  
- `.env.production` - Production environment settings

## 🚀 Available Scripts

### Development
```bash
# Run in development mode (default)
npm run dev
npm run dev:development

# Build for development
npm run build:development

# Preview development build
npm run preview:development
```

### Staging
```bash
# Run in staging mode
npm run dev:staging

# Build for staging
npm run build:staging

# Preview staging build
npm run preview:staging
```

### Production
```bash
# Run in production mode
npm run dev:production

# Build for production
npm run build:production

# Preview production build
npm run preview:production
```

### Utility Scripts
```bash
# Type checking
npm run type-check

# Linting
npm run lint
npm run lint:fix

# Clean build directory
npm run clean

# Start development (alias for dev:development)
npm start
```

## 🔧 Environment Variables

### Development (.env.development)
```bash
NODE_ENV=development
VITE_MODE=development
VITE_API_BASE_URL=http://127.0.0.1:8000/api
VITE_ADMIN_API_BASE_URL=http://127.0.0.1:8000/api/admin
VITE_APP_NAME=Quadra Core MLM Portal
VITE_APP_ENVIRONMENT=development
VITE_ENABLE_DEBUG=true
VITE_API_TIMEOUT=30000
```

### Staging (.env.staging)
```bash
NODE_ENV=staging
VITE_MODE=staging
VITE_API_BASE_URL=https://staging-api.mlmportal.com/api
VITE_ADMIN_API_BASE_URL=https://staging-api.mlmportal.com/api/admin
VITE_APP_NAME=Quadra Core MLM Portal
VITE_APP_ENVIRONMENT=staging
VITE_ENABLE_DEBUG=false
VITE_API_TIMEOUT=30000
```

### Production (.env.production)
```bash
NODE_ENV=production
VITE_MODE=production
VITE_API_BASE_URL=https://api.mlmportal.com/api
VITE_ADMIN_API_BASE_URL=https://api.mlmportal.com/api/admin
VITE_APP_NAME=Quadra Core MLM Portal
VITE_APP_ENVIRONMENT=production
VITE_ENABLE_DEBUG=false
VITE_API_TIMEOUT=30000
```

## 🌐 API Configuration

The API configuration automatically detects the environment and uses the appropriate base URLs:

```typescript
import { getBaseURL, getAdminBaseURL } from './api-services';

// Get base URL for current environment
const apiBaseURL = getBaseURL(); // http://127.0.0.1:8000/api (dev)

// Get admin API base URL
const adminBaseURL = getAdminBaseURL(); // http://127.0.0.1:8000/api/admin (dev)
```

## 🚀 Quick Start

### 1. Development (Default)
```bash
npm run dev
# or
npm start
```

### 2. Staging
```bash
npm run dev:staging
```

### 3. Production
```bash
npm run dev:production
```

## 📦 Building for Different Environments

### Development Build
```bash
npm run build:development
```

### Staging Build
```bash
npm run build:staging
```

### Production Build
```bash
npm run build:production
```

## 🔍 Environment Detection

The application automatically detects the environment based on the `--mode` flag:

```typescript
// In your code
const environment = import.meta.env.MODE; // 'development', 'staging', or 'production'
const nodeEnv = import.meta.env.NODE_ENV; // 'development', 'staging', or 'production'
```

## 🛠️ Custom Environment

To create a custom environment:

1. Create `.env.custom` file
2. Add your environment variables
3. Run with: `npm run dev -- --mode custom`

## 📝 Notes

- Environment variables prefixed with `VITE_` are exposed to the client
- The `--mode` flag determines which `.env` file is loaded
- Default mode is `development` if no mode is specified
- Environment variables are loaded at build time

## 🚨 Important

- Never commit sensitive information in environment files
- Use `.env.local` for local-only overrides
- Production builds should use production environment variables
- Always test builds in staging before production deployment
