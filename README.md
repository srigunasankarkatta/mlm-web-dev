# MLM Income Calculator

A comprehensive, responsive MLM income calculator built with React, Vite, and TailwindCSS. This calculator helps users understand their potential earnings from various MLM income streams including direct referrals, level income, club bonuses, and autopool completions.

## Features

### 🧮 **Comprehensive Income Calculation**
- **Direct Income**: Calculate earnings from 0-4 direct referrals with configurable percentages
- **Level Income**: Multi-level income calculation with up to 10 levels
- **Club Bonus**: Earnings from new member joins with customizable bonus rates
- **AutoPool Income**: Pool completion bonuses with multiple pool levels
- **Package-1 Eligibility**: Toggle to show/hide income based on Package-1 requirement

### ⚡ **Real-time Calculations**
- Live updates as you type
- Input validation with error messages
- Debounced calculations for optimal performance
- Instant feedback on all changes

### 🎨 **Modern UI/UX**
- Glass morphism design elements
- Responsive layout for all screen sizes
- Intuitive form controls and validation
- Color-coded income breakdown sections
- Advanced configuration panel

### 📊 **Export & Analysis**
- Export calculation results to JSON
- Detailed breakdown of all income sources
- Timestamped calculation records
- Downloadable calculation files

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mlm-web-dev
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

## Project Structure

```
src/
├── components/
│   ├── IncomeCalculator.jsx      # Main calculator component
│   ├── AuthModal.jsx            # Authentication modal
│   ├── MLMTree.jsx              # D3 tree visualization
│   └── Footer.jsx               # Footer component
├── pages/
│   ├── HomePage.jsx             # Main homepage
│   └── CalculatorPage.jsx       # Standalone calculator page
├── utils/
│   └── calc.js                  # Calculation logic and utilities
├── data/
│   └── mockData.js              # Mock data and configurations
└── styles/
    └── color-palette.scss       # Global color variables
```

## Usage

### Opening the Calculator

1. **From Homepage**: Click the "Open Earnings Simulator" button in the Income Examples section
2. **Direct Access**: Navigate to `/calculator` route (if configured)

### Using the Calculator

1. **Select Package**: Choose from available packages (Package-1 to Package-5)
2. **Set Eligibility**: Toggle "Has Package-1" checkbox (required for income)
3. **Configure Directs**: Set number of direct referrals (0-4)
4. **Set Level Income**: Configure number of levels and counts per level
5. **Add Club Joins**: Enter number of new club member joins
6. **Configure AutoPool**: Set completion counts for each pool level
7. **View Results**: See real-time calculation breakdown
8. **Export Data**: Download calculation results as JSON

### Advanced Configuration

Click "Advanced Configuration" to customize:
- Direct referral percentages
- Level income percentages
- All calculations update automatically

## Configuration

### Default Settings

```javascript
const DEFAULT_CONFIG = {
  directPercentages: [6, 9, 12, 15],           // % for 1st, 2nd, 3rd, 4th direct
  levelPercentages: [5, 4, 3, 2, 1, 0.5, 0.5, 0.5, 0.25, 0.25], // % for each level
  clubBonusPerJoin: 0.5,                       // $ per club join
  autopool: {
    poolSizes: [4, 16, 64],                    // Members per pool
    payouts: [5, 10, 20]                       // $ per completion
  }
};
```

### Available Packages

```javascript
const DEFAULT_PACKAGES = [
  { name: 'Package-1', price: 20 },
  { name: 'Package-2', price: 40 },
  { name: 'Package-3', price: 80 },
  { name: 'Package-4', price: 160 },
  { name: 'Package-5', price: 320 }
];
```

## Technical Details

### Calculation Logic

The calculator uses a comprehensive `computeIncome` function that:

1. **Validates Inputs**: Ensures all values are within acceptable ranges
2. **Calculates Direct Income**: Applies percentage-based calculations for each direct
3. **Computes Level Income**: Multiplies level counts by package price and percentages
4. **Determines Club Bonus**: Simple multiplication of joins by bonus rate
5. **Calculates AutoPool**: Pool completion bonuses based on pool sizes and payouts
6. **Applies Eligibility**: Sets payable net to 0 if Package-1 requirement not met

### Input Validation

- **Direct Referrals**: Must be between 0-4
- **Level Counts**: Must be non-negative integers
- **Club Joins**: Must be non-negative numbers
- **AutoPool Completions**: Must be non-negative integers
- **Percentages**: Must be non-negative numbers

### Performance Optimizations

- **Debounced Calculations**: 300ms delay to prevent excessive re-calculations
- **Memoized Components**: React optimization for better performance
- **Efficient State Management**: Minimal re-renders with proper state structure

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Dependencies

### Core Dependencies
- **React**: ^18.0.0 - UI framework
- **Vite**: ^4.0.0 - Build tool and dev server
- **TailwindCSS**: ^3.0.0 - Utility-first CSS framework

### Additional Dependencies
- **Lucide React**: ^0.263.0 - Icon library
- **D3**: ^7.0.0 - Data visualization
- **React D3 Tree**: ^3.6.6 - Tree visualization component

## Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Code Quality

- **ESLint**: Configured for React and JavaScript best practices
- **Prettier**: Code formatting (if configured)
- **TypeScript**: Type safety (if using .tsx files)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@mlmplatform.com or create an issue in the repository.

---

**Note**: This calculator is for educational and demonstration purposes. Actual MLM income calculations may vary based on specific company policies and regulations.
