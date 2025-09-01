# 🔐 Authentication Queries

This folder contains React Query hooks for authentication operations in the MLM Dashboard Portal.

## 📦 Installation

React Query (TanStack Query) has been installed:
```bash
npm install @tanstack/react-query @tanstack/react-query-devtools
```

## 🚀 Setup

The `QueryProvider` has been added to `src/main.tsx` to wrap the entire application:

```tsx
import QueryProvider from "./mlm-dashboard-portal/providers/QueryProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </QueryProvider>
  </StrictMode>
);
```

## 🎣 Available Hooks

### Authentication State
- `useCurrentUser()` - Get current authenticated user
- `useIsAuthenticated()` - Check if user is authenticated
- `useUserProfile()` - Get user profile data

### Authentication Actions
- `useLogin()` - User login
- `useLogout()` - User logout
- `useRefreshToken()` - Refresh authentication token
- `useForgotPassword()` - Request password reset
- `useResetPassword()` - Reset password with token
- `useUpdateProfile()` - Update user profile

## 💻 Usage Examples

### Login Component
```tsx
import { useLogin } from '../queries';

function LoginForm() {
  const loginMutation = useLogin();
  
  const handleSubmit = (credentials) => {
    loginMutation.mutate(credentials, {
      onSuccess: (data) => {
        console.log('Login successful:', data);
        // Redirect or update UI
      },
      onError: (error) => {
        console.error('Login failed:', error);
        // Show error message
      }
    });
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
      <button 
        type="submit" 
        disabled={loginMutation.isPending}
      >
        {loginMutation.isPending ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}
```

### Protected Route Component
```tsx
import { useCurrentUser } from '../queries';

function ProtectedRoute({ children }) {
  const { user, isLoading, isAuthenticated } = useCurrentUser();
  
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return children;
}
```

### User Profile Component
```tsx
import { useUserProfile, useUpdateProfile } from '../queries';

function UserProfile() {
  const { data: profile, isLoading, error } = useUserProfile();
  const updateProfileMutation = useUpdateProfile();
  
  const handleUpdate = (profileData) => {
    updateProfileMutation.mutate(profileData, {
      onSuccess: () => {
        // Profile updated successfully
      }
    });
  };
  
  if (isLoading) return <div>Loading profile...</div>;
  if (error) return <div>Error loading profile</div>;
  
  return (
    <div>
      <h1>{profile.data.name}</h1>
      <p>{profile.data.email}</p>
      {/* Profile update form */}
    </div>
  );
}
```

### Logout Component
```tsx
import { useLogout } from '../queries';

function LogoutButton() {
  const logoutMutation = useLogout();
  
  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        // Redirect to login page
        navigate('/login');
      }
    });
  };
  
  return (
    <button 
      onClick={handleLogout}
      disabled={logoutMutation.isPending}
    >
      {logoutMutation.isPending ? 'Logging out...' : 'Logout'}
    </button>
  );
}
```

## 🔑 Query Keys

The authentication queries use structured query keys:

```tsx
export const authQueryKeys = {
  all: ['auth'] as const,
  profile: () => [...authQueryKeys.all, 'profile'] as const,
  user: (id: number) => [...authQueryKeys.all, 'user', id] as const,
  isAuthenticated: () => [...authQueryKeys.all, 'isAuthenticated'] as const,
};
```

## ⚙️ Configuration

The `QueryProvider` is configured with:

- **Stale Time**: 5 minutes for queries, 2 minutes for authentication status
- **Cache Time**: 10 minutes for queries, 5 minutes for authentication status
- **Retry Logic**: 3 retries for network errors, no retries for 401/403
- **Window Focus**: No automatic refetch on window focus
- **Reconnection**: Automatic refetch when reconnecting to network

## 🛡️ Error Handling

All hooks include comprehensive error handling:

- **401/403 Errors**: Automatically clear tokens and reset authentication state
- **Network Errors**: Retry up to 3 times
- **Validation Errors**: Display field-specific error messages
- **Server Errors**: Show user-friendly error messages

## 🔄 Cache Management

The hooks automatically manage React Query cache:

- **Login Success**: Invalidates all auth queries and sets new data
- **Logout**: Clears all auth queries from cache
- **Profile Update**: Updates profile data in cache
- **Token Refresh**: Invalidates queries to refetch with new token

## 📱 Local Storage Integration

The hooks integrate with localStorage for:

- **Token Storage**: JWT and refresh tokens
- **User Data**: Current user information
- **Persistence**: Data survives page refreshes
- **Fallback**: Query data falls back to localStorage when needed

## 🚨 Important Notes

1. **Token Management**: Tokens are automatically managed and refreshed
2. **Error Boundaries**: Implement error boundaries for better error handling
3. **Loading States**: Always check `isLoading` and `isPending` states
4. **Cache Invalidation**: Use `queryClient.invalidateQueries()` when needed
5. **Development Tools**: React Query DevTools are available in development mode
