# 🚀 MLM Dashboard Portal API Services

This directory contains the API services specifically designed for the MLM Dashboard Portal, built on top of the core API client located in `src/app/api-client.ts`.

## 📁 File Structure

```
src/
├── app/
│   └── api-client.ts                    # Core API client with interceptors
└── mlm-dashboard-portal/
    └── api-services/
        ├── api-config.ts                # MLM-specific API configuration
        ├── api-service-factory.ts       # Service factory and instances
        ├── auth-service.ts              # Authentication service
        ├── users-service.ts             # Users management service
        ├── mlm-service.ts               # MLM-specific services
        ├── index.ts                     # Clean export index
        └── README.md                    # This documentation
```

## 🎯 Features

- ✅ **MLM-Specific Endpoints** - Dedicated endpoints for MLM operations
- ✅ **Built on Core Client** - Leverages the robust core API client
- ✅ **TypeScript Support** - Full type safety for MLM operations
- ✅ **Centralized Configuration** - Environment-specific API configuration
- ✅ **Service Classes** - Organized by business domain
- ✅ **Error Handling** - Consistent error handling across all services

## 🚀 Quick Start

### 1. Import Services

```typescript
import { 
    AuthService, 
    UsersService, 
    MLMService,
    defaultApiService 
} from './api-services';
```

### 2. Authentication

```typescript
// Login
const loginResult = await AuthService.login({
    email: 'admin@mlmportal.com',
    password: 'password123'
});

// Get profile
const profile = await AuthService.getProfile();
```

### 3. MLM Operations

```typescript
// Get MLM members
const members = await MLMService.getMembers(1, 20, 'john');

// Get genealogy tree
const genealogy = await MLMService.getGenealogy(123, 3);

// Get commissions
const commissions = await MLMService.getCommissions(123, 1, 20);

// Get products
const products = await MLMService.getProducts(1, 20, 'supplements');

// Create order
const order = await MLMService.createOrder({
    memberId: 123,
    items: [{ productId: 1, quantity: 2 }]
});
```

### 4. Dashboard Data

```typescript
// Get dashboard statistics
const stats = await MLMService.getDashboardStats();

// Get recent activity
const activity = await MLMService.getRecentActivity(10);
```

## 🔧 Configuration

### Environment-Specific Base URLs

The API client automatically detects your environment:

```typescript
// Development
http://localhost:8000/api

// Staging
https://staging-api.mlmportal.com/api

// Production
https://api.mlmportal.com/api
```

### Custom Configuration

```typescript
import { createApiService } from './api-services';

const customApiService = createApiService('https://custom-api.com/api');
```

## 🏗️ Service Architecture

### Core API Client (`src/app/api-client.ts`)

- **Base functionality** - HTTP methods, interceptors, error handling
- **Token management** - Automatic JWT token handling
- **Global error handling** - Centralized error processing
- **File upload support** - Built-in file upload methods

### MLM Services (`src/mlm-dashboard-portal/api-services/`)

- **AuthService** - User authentication and profile management
- **UsersService** - User CRUD operations
- **MLMService** - MLM-specific business logic
- **Configuration** - Environment-specific settings

## 📊 MLM-Specific Endpoints

### Authentication
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout
- `POST /auth/refresh` - Refresh token
- `GET /auth/profile` - Get user profile
- `PUT /auth/profile` - Update user profile

### MLM Operations
- `GET /mlm/members` - Get MLM members list
- `GET /mlm/genealogy/{id}` - Get genealogy tree
- `GET /mlm/commissions/{id}` - Get member commissions
- `GET /mlm/products` - Get products catalog
- `GET /mlm/orders/{id}` - Get member orders
- `POST /mlm/orders` - Create new order

### Dashboard
- `GET /dashboard/stats` - Get dashboard statistics
- `GET /dashboard/recent-activity` - Get recent activity
- `GET /dashboard/charts` - Get chart data

## 🛡️ Error Handling

### Automatic Error Handling

The API client automatically handles:

- **401/403** - Automatic logout and redirect
- **400** - Validation errors with field details
- **500+** - Server errors with user-friendly messages
- **Timeout** - Request timeout handling

### Custom Error Handling

```typescript
try {
    const members = await MLMService.getMembers();
} catch (error) {
    if (error.type === 'validation') {
        // Handle validation errors
        console.log('Field errors:', error.fieldErrors);
    } else {
        // Handle other errors
        console.error('Error:', error.message);
    }
}
```

## 🔐 Authentication

### Token Management

The API client automatically:

1. **Attaches tokens** to all requests
2. **Handles expired tokens** with automatic logout
3. **Redirects to login** when authentication fails

### Token Storage

```typescript
// Store tokens after login
localStorage.setItem('token', 'jwt-token-here');
localStorage.setItem('refreshToken', 'refresh-token-here');

// API client automatically uses these tokens
```

## 📤 File Uploads

### Profile Pictures

```typescript
import { defaultApiService } from './api-services';

const result = await defaultApiService.uploadFile(
    '/users/123/avatar',
    fileInput.files[0],
    'avatar'
);
```

### Documents

```typescript
const result = await defaultApiService.uploadFile(
    '/uploads/documents',
    file,
    'document',
    { 
        category: 'contract', 
        memberId: 123,
        description: 'Member agreement' 
    }
);
```

## 📱 React Integration

### Custom Hooks

```typescript
import { useState, useEffect } from 'react';
import { MLMService } from './api-services';

export const useMLMMembers = (page: number = 1, limit: number = 20) => {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMembers = async () => {
            setLoading(true);
            try {
                const result = await MLMService.getMembers(page, limit);
                setMembers(result.data.members);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMembers();
    }, [page, limit]);

    return { members, loading, error };
};
```

### Component Usage

```typescript
import { AuthService } from './api-services';

const LoginForm = () => {
    const handleSubmit = async (credentials) => {
        try {
            const result = await AuthService.login(credentials);
            // Handle successful login
            localStorage.setItem('token', result.data.token);
            localStorage.setItem('refreshToken', result.data.refreshToken);
        } catch (error) {
            // Handle error
            console.error('Login failed:', error.message);
        }
    };

    return (
        // Your login form JSX
    );
};
```

## 🧪 Testing

### Mock Services

```typescript
// test-utils/mock-mlm-services.ts
export const createMockMLMService = () => ({
    getMembers: jest.fn(),
    getGenealogy: jest.fn(),
    getCommissions: jest.fn(),
    getProducts: jest.fn(),
    createOrder: jest.fn(),
    getDashboardStats: jest.fn(),
    getRecentActivity: jest.fn(),
});
```

### Service Testing

```typescript
import { MLMService } from './mlm-service';
import { defaultApiService } from './api-service-factory';

jest.mock('./api-service-factory');

describe('MLMService', () => {
    it('should fetch MLM members', async () => {
        const mockMembers = [{ id: 1, name: 'John Doe' }];
        (defaultApiService.get as jest.Mock).mockResolvedValue({
            data: { members: mockMembers }
        });

        const result = await MLMService.getMembers();
        expect(result.data.members).toEqual(mockMembers);
    });
});
```

## 🚀 Best Practices

### 1. Use Service Classes

```typescript
// ✅ Good
const members = await MLMService.getMembers();

// ❌ Avoid
const members = await defaultApiService.get('/mlm/members');
```

### 2. Handle Errors Gracefully

```typescript
try {
    const result = await MLMService.createOrder(orderData);
    // Handle success
} catch (error) {
    if (error.type === 'validation') {
        setFieldErrors(error.fieldErrors);
    } else {
        setError(error.message);
    }
}
```

### 3. Use TypeScript Interfaces

```typescript
import type { MLMMember, Order } from './api-services';

const [members, setMembers] = useState<MLMMember[]>([]);
const [orders, setOrders] = useState<Order[]>([]);
```

### 4. Environment Configuration

```typescript
// .env.development
VITE_API_BASE_URL=http://localhost:8000/api

// .env.production
VITE_API_BASE_URL=https://api.mlmportal.com/api
```

## 🔧 Troubleshooting

### Common Issues

1. **CORS Errors** - Ensure backend allows frontend domain
2. **Token Issues** - Check localStorage for valid tokens
3. **Timeout Errors** - Adjust timeout values in configuration
4. **Validation Errors** - Ensure backend returns expected error format

### Debug Mode

```typescript
// Enable debug logging
localStorage.setItem('debug', 'true');
```

## 📚 Additional Resources

- [Core API Client Documentation](../../app/api-client.ts)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Query](https://tanstack.com/query) - For advanced data fetching
- [SWR](https://swr.vercel.app/) - Alternative data fetching library

---

**🎉 Your MLM Dashboard Portal is now equipped with a robust, type-safe API integration system!**
