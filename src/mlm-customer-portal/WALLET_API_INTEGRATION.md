# 🏦 Wallet API Integration Guide

This document provides a comprehensive guide for the wallet API integration in the MLM Customer Portal.

## 📋 Overview

The wallet system provides complete functionality for managing user earnings, transactions, and withdrawals. It includes:

- **Wallet Balance Management**: Multiple wallet types (earning, bonus, reward, holding, commission)
- **Transaction History**: Complete transaction tracking with filtering and pagination
- **Withdrawal System**: Request and manage withdrawals with validation
- **Dashboard Analytics**: Real-time wallet statistics and insights

## 🚀 Quick Start

### 1. Import Components

```tsx
import { WalletDashboard, WalletCard, TransactionList, WithdrawalForm } from '../components';
import { useWalletState, useWalletUtils } from '../hooks/useWallet';
import { WalletService } from '../api-services/wallet-service';
```

### 2. Use the Complete Dashboard

```tsx
import React from 'react';
import { WalletDashboard } from '../components';

const MyWalletPage = () => {
  return (
    <div>
      <WalletDashboard />
    </div>
  );
};
```

### 3. Use Individual Components

```tsx
import React from 'react';
import { WalletCard, TransactionList, WithdrawalForm } from '../components';
import { useWalletState } from '../hooks/useWallet';

const CustomWalletPage = () => {
  const { walletBalance, walletTransactions } = useWalletState();

  return (
    <div>
      {/* Wallet Cards */}
      {walletBalance.data?.wallets && Object.entries(walletBalance.data.wallets).map(([type, wallet]) => (
        <WalletCard
          key={type}
          walletType={type}
          wallet={wallet}
          onClick={() => console.log('Selected wallet:', type)}
        />
      ))}

      {/* Transaction List */}
      <TransactionList
        transactions={walletTransactions.data?.transactions || []}
        isLoading={walletTransactions.isLoading}
        onFilterChange={(filters) => console.log('Filters changed:', filters)}
      />

      {/* Withdrawal Form */}
      <WithdrawalForm
        limits={withdrawalLimits.data}
        onSubmit={(data) => console.log('Withdrawal request:', data)}
        isLoading={false}
      />
    </div>
  );
};
```

## 🔧 API Endpoints

### 1. Wallet Balance
```typescript
// GET /api/wallet/balance
const balance = await WalletService.getWalletBalance();
```

### 2. Wallet Transactions
```typescript
// GET /api/wallet/transactions?page=1&per_page=10&type=credit
const transactions = await WalletService.getWalletTransactions({
  page: 1,
  per_page: 10,
  type: 'credit',
  category: 'direct_income',
  from_date: '2024-01-01',
  to_date: '2024-01-31'
});
```

### 3. Wallet Summary
```typescript
// GET /api/wallet/summary
const summary = await WalletService.getWalletSummary();
```

### 4. Dashboard Statistics
```typescript
// GET /api/wallet/dashboard-stats
const stats = await WalletService.getDashboardStats();
```

### 5. Request Withdrawal
```typescript
// POST /api/wallet/withdraw
const withdrawal = await WalletService.requestWithdrawal({
  wallet_type: 'earning',
  amount: 100.00,
  method: 'bank_transfer',
  payment_details: {
    bank_name: 'ABC Bank',
    account_number: '1234567890',
    account_holder_name: 'John Doe',
    ifsc_code: 'ABC1234567'
  },
  user_notes: 'Monthly withdrawal'
});
```

### 6. Withdrawal History
```typescript
// GET /api/wallet/withdrawals?page=1&per_page=10&status=completed
const withdrawals = await WalletService.getWithdrawals({
  page: 1,
  per_page: 10,
  status: 'completed',
  from_date: '2024-01-01',
  to_date: '2024-01-31'
});
```

### 7. Withdrawal Limits
```typescript
// GET /api/wallet/withdrawal-limits
const limits = await WalletService.getWithdrawalLimits();
```

## 🎣 React Hooks

### useWalletState
Main hook that provides all wallet state and data:

```tsx
const {
  // State
  selectedWallet,
  setSelectedWallet,
  transactionFilters,
  withdrawalFilters,
  
  // Data
  walletBalance,
  walletTransactions,
  walletSummary,
  dashboardStats,
  withdrawals,
  withdrawalLimits,
  
  // Actions
  updateTransactionFilters,
  updateWithdrawalFilters,
  clearFilters,
} = useWalletState();
```

### Individual Hooks
```tsx
// Individual data hooks
const walletBalance = useWalletBalance();
const walletTransactions = useWalletTransactions({ page: 1, per_page: 10 });
const walletSummary = useWalletSummary();
const dashboardStats = useDashboardStats();
const withdrawals = useWithdrawals({ status: 'completed' });
const withdrawalLimits = useWithdrawalLimits();

// Mutation hooks
const withdrawalRequest = useWithdrawalRequest();

// Utility hooks
const { formatCurrency, getWalletIcon, getWalletColor } = useWalletUtils();
```

## 🎨 UI Components

### WalletCard
Displays individual wallet information:

```tsx
<WalletCard
  walletType="earning"
  wallet={walletData}
  isSelected={true}
  onClick={() => setSelectedWallet('earning')}
  className="custom-class"
/>
```

### TransactionList
Shows transaction history with filtering:

```tsx
<TransactionList
  transactions={transactions}
  isLoading={false}
  onFilterChange={(filters) => updateFilters(filters)}
  onLoadMore={() => loadMoreTransactions()}
  hasMore={true}
  className="custom-class"
/>
```

### WithdrawalForm
Handles withdrawal requests:

```tsx
<WithdrawalForm
  limits={withdrawalLimits}
  onSubmit={(data) => handleWithdrawal(data)}
  isLoading={isSubmitting}
  className="custom-class"
/>
```

### WalletDashboard
Complete wallet management interface:

```tsx
<WalletDashboard
  className="custom-class"
/>
```

## 📊 Data Types

### WalletBalance
```typescript
interface WalletBalance {
  display_name: string;
  balance: string;
  available_balance: string;
  withdrawal_enabled: boolean;
  icon: string;
  color: string;
}
```

### WalletTransaction
```typescript
interface WalletTransaction {
  id: number;
  wallet_type: string;
  wallet_display_name: string;
  type: 'credit' | 'debit' | 'transfer_in' | 'transfer_out';
  category: string;
  amount: string;
  balance_before: string;
  balance_after: string;
  reference_id: string;
  description: string;
  status: string;
  formatted_date: string;
  formatted_time: string;
  icon: string;
  color: string;
}
```

### WithdrawalRequest
```typescript
interface WithdrawalRequest {
  wallet_type: string;
  amount: number;
  method: string;
  payment_details: {
    bank_name: string;
    account_number: string;
    account_holder_name: string;
    ifsc_code: string;
  };
  user_notes?: string;
}
```

## 🎯 Features

### ✅ Implemented Features

1. **Complete API Integration**
   - All 7 wallet endpoints implemented
   - Proper error handling and loading states
   - TypeScript type safety

2. **React Hooks**
   - Custom hooks for data fetching
   - State management hooks
   - Utility hooks for formatting and styling

3. **UI Components**
   - Responsive wallet cards
   - Interactive transaction lists
   - Comprehensive withdrawal forms
   - Complete dashboard interface

4. **Advanced Features**
   - Real-time data fetching with React Query
   - Pagination support
   - Advanced filtering and search
   - Form validation
   - Error handling and retry logic

5. **Styling**
   - SCSS modules for component styling
   - Responsive design
   - Consistent color palette
   - Modern UI/UX patterns

### 🔄 State Management

The wallet system uses React Query for server state management and local state for UI interactions:

- **Server State**: Managed by React Query with automatic caching, background updates, and error handling
- **UI State**: Managed by React hooks for component interactions
- **Form State**: Managed by individual components with validation

### 🎨 Styling

All components use SCSS modules with a consistent design system:

- **Color Palette**: Blue-based theme with semantic color usage
- **Typography**: Consistent font sizes and weights
- **Spacing**: Standardized padding and margins
- **Responsive**: Mobile-first responsive design
- **Animations**: Smooth transitions and hover effects

## 🚀 Usage Examples

### Basic Wallet Page
```tsx
import React from 'react';
import { WalletDashboard } from '../components';

const WalletPage = () => {
  return (
    <div className="wallet-page">
      <WalletDashboard />
    </div>
  );
};
```

### Custom Wallet Implementation
```tsx
import React, { useState } from 'react';
import { WalletCard, TransactionList } from '../components';
import { useWalletState } from '../hooks/useWallet';

const CustomWallet = () => {
  const { walletBalance, walletTransactions, selectedWallet, setSelectedWallet } = useWalletState();
  const [activeTab, setActiveTab] = useState<'wallets' | 'transactions'>('wallets');

  return (
    <div className="custom-wallet">
      <div className="tabs">
        <button 
          className={activeTab === 'wallets' ? 'active' : ''}
          onClick={() => setActiveTab('wallets')}
        >
          Wallets
        </button>
        <button 
          className={activeTab === 'transactions' ? 'active' : ''}
          onClick={() => setActiveTab('transactions')}
        >
          Transactions
        </button>
      </div>

      {activeTab === 'wallets' && (
        <div className="wallet-grid">
          {walletBalance.data?.wallets && Object.entries(walletBalance.data.wallets).map(([type, wallet]) => (
            <WalletCard
              key={type}
              walletType={type}
              wallet={wallet}
              isSelected={selectedWallet === type}
              onClick={() => setSelectedWallet(type)}
            />
          ))}
        </div>
      )}

      {activeTab === 'transactions' && (
        <TransactionList
          transactions={walletTransactions.data?.transactions || []}
          isLoading={walletTransactions.isLoading}
        />
      )}
    </div>
  );
};
```

## 🔧 Configuration

### Environment Variables
```env
VITE_API_BASE_URL=http://127.0.0.1:8000/api/v1
VITE_CUSTOMER_API_BASE_URL=http://127.0.0.1:8000/api
VITE_API_TIMEOUT=30000
```

### API Configuration
The wallet service uses the existing API configuration from `api-config.ts` and `api-service-factory.ts`.

## 📝 Notes

- All API calls include proper authentication headers
- Error handling is implemented at both API and component levels
- Loading states are managed automatically by React Query
- Form validation includes both client-side and server-side validation
- The system is fully responsive and works on all device sizes

## 🎉 Conclusion

The wallet API integration provides a complete, production-ready solution for managing user wallets in the MLM Customer Portal. It includes all necessary endpoints, React components, hooks, and utilities needed for a full-featured wallet system.

The implementation follows React and TypeScript best practices, includes comprehensive error handling, and provides a modern, responsive user interface.
