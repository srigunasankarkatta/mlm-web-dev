# MLM Customer Portal API Services

This directory contains the API services and queries for the MLM Customer Portal, following the same pattern as the dashboard portal.

## Structure

```
api-services/
├── api-config.ts          # API configuration and endpoints
├── api-service-factory.ts # Axios instance factory with interceptors
├── auth-service.ts        # Authentication service
├── package-service.ts     # Package management service
└── index.ts              # Exports all services and types

queries/
├── auth.ts               # Authentication React Query hooks
├── packages.ts           # Package management React Query hooks
└── index.ts             # Exports all queries
```

## Features

### 🔐 Authentication Service (`auth-service.ts`)

- **Login/Register**: Email/mobile + password authentication
- **OTP Support**: Send and verify OTP for additional security
- **Profile Management**: Get and update user profile
- **Token Management**: Automatic token refresh and storage
- **Password Reset**: Forgot password and reset functionality

### 📦 Package Service (`package-service.ts`)

- **Package Listing**: Get available MLM packages with filters
- **Package Details**: Detailed package information and eligibility
- **Purchase Management**: Buy packages with payment integration
- **Upgrade System**: Upgrade to higher packages
- **User Packages**: Track purchased packages and earnings
- **Package Comparison**: Compare different packages
- **Recommendations**: Get personalized package suggestions

### 🚀 React Query Hooks

All services include corresponding React Query hooks for:
- **Data Fetching**: `useQuery` hooks with caching and error handling
- **Mutations**: `useMutation` hooks for create/update/delete operations
- **Optimistic Updates**: Automatic cache invalidation and updates
- **Error Handling**: Built-in retry logic and error boundaries

## Usage Examples

### Authentication

```tsx
import { useLogin, useRegister, useUserProfile } from '../queries/auth';

// Login
const LoginPage = () => {
  const loginMutation = useLogin();
  
  const handleLogin = async (credentials) => {
    try {
      await loginMutation.mutateAsync(credentials);
      // Navigate to dashboard
    } catch (error) {
      // Handle error
    }
  };
};

// Registration
const RegisterPage = () => {
  const registerMutation = useRegister();
  
  const handleRegister = async (userData) => {
    try {
      await registerMutation.mutateAsync(userData);
      // Navigate to dashboard
    } catch (error) {
      // Handle error
    }
  };
};

// Get user profile
const Dashboard = () => {
  const { data: profile, isLoading, error } = useUserProfile();
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading profile</div>;
  
  return <div>Welcome, {profile.data.name}!</div>;
};
```

### Package Management

```tsx
import { 
  usePackages, 
  usePurchasePackage, 
  useUserPackages 
} from '../queries/packages';

// Get available packages
const PackagesPage = () => {
  const { data: packages, isLoading } = usePackages({
    isActive: true,
    perPage: 10
  });
  
  return (
    <div>
      {packages?.data.map(pkg => (
        <PackageCard key={pkg.id} package={pkg} />
      ))}
    </div>
  );
};

// Purchase a package
const PackageCard = ({ package }) => {
  const purchaseMutation = usePurchasePackage();
  
  const handlePurchase = async () => {
    try {
      const result = await purchaseMutation.mutateAsync({
        packageId: package.id,
        paymentMethod: 'razorpay',
        termsAccepted: true
      });
      
      // Handle payment redirect
      if (result.data.paymentUrl) {
        window.location.href = result.data.paymentUrl;
      }
    } catch (error) {
      // Handle error
    }
  };
};

// Get user's packages
const UserPackages = () => {
  const { data: userPackages } = useUserPackages();
  
  return (
    <div>
      {userPackages?.data.map(userPkg => (
        <UserPackageCard key={userPkg.id} userPackage={userPkg} />
      ))}
    </div>
  );
};
```

## Configuration

### Environment Variables

```env
# API Base URLs
VITE_API_BASE_URL=http://127.0.0.1:8000/api
VITE_CUSTOMER_API_BASE_URL=http://127.0.0.1:8000/api/customer

# Timeouts
VITE_API_TIMEOUT=30000
VITE_API_UPLOAD_TIMEOUT=60000

# Feature Flags
VITE_ENABLE_DEBUG=true
VITE_ENABLE_LOGGING=true
VITE_ENABLE_ANALYTICS=true
```

### API Endpoints

The service automatically handles:
- **Base URL**: Environment-specific API endpoints
- **Authentication**: Bearer token headers
- **Token Refresh**: Automatic 401 handling
- **Error Handling**: Standardized error responses
- **Request/Response**: Type-safe API calls

## Error Handling

All services include comprehensive error handling:

- **Network Errors**: Automatic retry with exponential backoff
- **Authentication Errors**: Token refresh and logout handling
- **Validation Errors**: Structured error messages
- **Rate Limiting**: Respect API rate limits
- **Offline Support**: Graceful degradation

## Caching Strategy

React Query hooks implement smart caching:

- **Stale Time**: Data considered fresh for 5-15 minutes
- **Garbage Collection**: Cache cleanup after 10-60 minutes
- **Background Updates**: Automatic data refresh
- **Optimistic Updates**: Immediate UI feedback
- **Cache Invalidation**: Smart cache management

## Security Features

- **Token Storage**: Secure localStorage management
- **Automatic Logout**: Invalid token handling
- **HTTPS Only**: Production environment security
- **Input Validation**: Server-side validation
- **XSS Protection**: Sanitized inputs

## Integration

These services integrate seamlessly with:
- **React Router**: Navigation and route protection
- **React Query**: Data fetching and caching
- **Toast Notifications**: User feedback
- **Form Validation**: Input validation
- **Payment Gateways**: Razorpay, Cashfree integration

## Development

### Adding New Services

1. Create service file in `api-services/`
2. Define TypeScript interfaces
3. Implement service methods
4. Create corresponding React Query hooks
5. Export from index files
6. Add to documentation

### Testing

```bash
# Run tests
npm test

# Test specific service
npm test auth-service.test.ts

# Coverage report
npm run test:coverage
```

## Support

For questions or issues:
- Check the dashboard portal examples
- Review TypeScript interfaces
- Check React Query documentation
- Review error logs in console
