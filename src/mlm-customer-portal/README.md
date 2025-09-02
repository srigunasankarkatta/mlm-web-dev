# MLM Customer Portal

A modern, responsive customer portal for purchasing MLM plans and managing income streams. Built with React 19, TypeScript, Vite, and Tailwind CSS.

## Features

### 🏠 **Home Page**
- Hero section with compelling call-to-action
- Interactive plan slider showcasing 10 Fast Track Packages (₹20-₹200)
- Income types breakdown with infographic-style cards
- Multiple CTA sections for user engagement

### 📦 **Plans Page**
- Detailed view of all MLM packages
- Eligibility rules and package comparison table
- Interactive plan selection with purchase flow
- Clear pricing and benefits display

### 📊 **Dashboard**
- Income summary with charts and visualizations
- Quick stats cards (earnings, referrals, network size)
- Purchased plans overview
- Recent notifications and quick actions
- Auto pool progress tracking

### 👤 **Profile Page**
- User profile management
- Package purchase history
- Wallet balance and earnings overview
- Account details and upgrade options

### ❓ **FAQ Page**
- Comprehensive business model explanation
- Bilingual content (English + Telugu)
- Interactive accordion-style FAQ
- Contact support options

## Tech Stack

- **Frontend**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS + SCSS
- **Charts**: Recharts
- **Sliders**: Swiper.js
- **Routing**: React Router v6
- **State Management**: React Hooks + Context

## Project Structure

```
src/mlm-dashboard-portal/features/customer-portal/
├── components/           # Reusable UI components
│   ├── AuthModal.tsx    # Authentication modal
│   ├── DashboardCharts.tsx # Income visualization charts
│   ├── Footer.tsx       # Site footer
│   ├── IncomeBreakdownCard.tsx # Income type cards
│   ├── PlanSlider.tsx   # Swiper.js plan carousel
│   ├── PurchaseModal.tsx # Purchase confirmation
│   ├── Toast.tsx        # Toast notifications
│   └── ToastContext.tsx # Toast state management
├── data/                # Mock data and constants
│   └── mockData.ts      # MLM plans, income breakdown, FAQ
├── hooks/               # Custom React hooks
│   ├── useAuth.ts       # Authentication state
│   ├── useDashboard.ts  # Dashboard data management
│   └── usePlans.ts      # Plans and purchase logic
├── pages/               # Page components
│   ├── DashboardPage.tsx
│   ├── FAQPage.tsx
│   ├── HomePage.tsx
│   ├── PlansPage.tsx
│   └── ProfilePage.tsx
├── routes/              # Routing configuration
│   └── CustomerPortalRoutes.tsx
├── services/            # API and business logic
│   └── api.ts          # Mock API service
├── types/               # TypeScript interfaces
│   └── index.ts        # All type definitions
├── CustomerPortal.tsx   # Main portal component
└── index.ts            # Public exports
```

## Components

### Core Components

- **PlanSlider**: Interactive carousel for MLM packages using Swiper.js
- **DashboardCharts**: Income visualization using Recharts
- **AuthModal**: Login/Register modal with OTP support
- **PurchaseModal**: Plan purchase confirmation with payment selection
- **Toast System**: Notification system for user feedback

### Custom Hooks

- **useAuth**: Authentication state management
- **usePlans**: Plans data and purchase logic
- **useDashboard**: Dashboard data and notifications

## Data Models

### MLM Plans
- 10 packages from ₹20 to ₹200
- Package-1 (₹20) is mandatory
- Higher packages unlock additional income levels
- Each package has specific benefits and unlocks

### Income Types
- **Direct Income**: 6%, 9%, 12%, 15% (max 4 directs)
- **Level Income**: 2% to 10% based on package level
- **Club Income**: ₹0.50 per new member join
- **Auto Pool**: Progressive rewards (4 → 16 → 64 members)

## Getting Started

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Usage

```tsx
import { CustomerPortal } from './mlm-dashboard-portal/features/customer-portal';

function App() {
  return (
    <div className="App">
      <CustomerPortal />
    </div>
  );
}
```

### Environment Setup

The portal uses mock data by default. To integrate with real APIs:

1. Update `services/api.ts` with actual API endpoints
2. Configure authentication tokens and headers
3. Replace mock data with real API calls
4. Set up payment gateway integration (Razorpay/Cashfree)

## Styling

### Color Palette
- **Primary**: Teal (#14b8a6)
- **Secondary**: Blue (#3b82f6)
- **Accent**: Green (#10b981), Purple (#8b5cf6)
- **Neutral**: Gray scale for text and backgrounds

### Design Principles
- Modern, clean interface
- Responsive design for all devices
- Smooth animations and transitions
- Consistent spacing and typography
- Accessible color contrast

## Features in Detail

### Authentication Flow
1. User enters email/mobile
2. OTP sent to user
3. User enters OTP to login
4. Registration requires Package-1 purchase

### Purchase Flow
1. User selects plan
2. Purchase confirmation modal
3. Payment method selection
4. Payment processing
5. Plan activation

### Income Tracking
- Real-time income calculations
- Multiple income stream breakdown
- Progress tracking for auto pool
- Referral network visualization

## Future Enhancements

- [ ] Real-time notifications
- [ ] Advanced analytics dashboard
- [ ] Mobile app (React Native)
- [ ] Multi-language support
- [ ] Advanced payment options
- [ ] Social media integration
- [ ] Referral tracking system
- [ ] Withdrawal management

## Contributing

1. Follow TypeScript best practices
2. Use Tailwind CSS for styling
3. Implement responsive design
4. Add proper error handling
5. Include loading states
6. Write comprehensive tests

## License

This project is part of the MLM Dashboard Portal and follows the same licensing terms.

---

For support or questions, contact the development team or refer to the main project documentation.
