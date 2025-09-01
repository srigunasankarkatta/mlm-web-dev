# 🎨 Color Palette Usage Guide

This guide explains how to use the consistent color palette throughout the entire application.

## 🚀 **Quick Start**

### **Import the Color System**
```tsx
import { COLOR_CLASSES, COMMON_COMBINATIONS } from '../constants/colorClasses';
import { COLORS } from '../constants/colors';
```

### **Basic Usage Examples**
```tsx
// Using predefined color classes
<div className={COLOR_CLASSES.background.card}>
  <h1 className={COLOR_CLASSES.text.heading}>Title</h1>
  <p className={COLOR_CLASSES.text.body}>Content</p>
</div>

// Using common combinations
<button className={COMMON_COMBINATIONS.buttonPrimary}>
  Primary Button
</button>

// Using semantic colors
<div className={COLOR_CLASSES.alert.success}>
  Success message
</div>
```

## 🎯 **Color Categories**

### **1. Primary Brand Colors**
- **Navy** (`primary-navy`): Main brand color, used for headings and primary text
- **Orange** (`primary-orange`): Accent color, used for CTAs and highlights
- **Slate** (`primary-slate`): Secondary text color
- **Off-white** (`primary-off-white`): Light backgrounds

### **2. Semantic Colors**
- **Success** (`semantic-success-*`): Positive actions, confirmations
- **Warning** (`semantic-warning-*`): Caution, attention needed
- **Error** (`semantic-error-*`): Errors, destructive actions
- **Info** (`semantic-info-*`): Information, neutral messages

### **3. Neutral Colors**
- **Gray scale** (`gray-50` to `gray-900`): Backgrounds, borders, text
- **White/Black**: Pure backgrounds and text

## 🔧 **Usage Patterns**

### **Backgrounds**
```tsx
// Primary backgrounds
<div className={COLOR_CLASSES.background.primary}>
  Main content area
</div>

// Secondary backgrounds
<div className={COLOR_CLASSES.background.secondary}>
  Secondary content
</div>

// Cards
<div className={COMMON_COMBINATIONS.card}>
  Card content
</div>
```

### **Text**
```tsx
// Headings
<h1 className={COLOR_CLASSES.text.primary}>Main Heading</h1>
<h2 className={COLOR_CLASSES.text.secondary}>Sub Heading</h2>

// Body text
<p className={COLOR_CLASSES.text.body}>Regular paragraph text</p>

// Muted text
<span className={COLOR_CLASSES.text.muted}>Less important info</span>
```

### **Buttons**
```tsx
// Primary button
<button className={COMMON_COMBINATIONS.buttonPrimary}>
  Primary Action
</button>

// Secondary button
<button className={COMMON_COMBINATIONS.buttonSecondary}>
  Secondary Action
</button>

// Success button
<button className={COLOR_CLASSES.button.success}>
  Success Action
</button>
```

### **Forms**
```tsx
// Default input
<input className={COMMON_COMBINATIONS.inputDefault} />

// Input with error
<input className={COLOR_CLASSES.input.error} />

// Input with success
<input className={COLOR_CLASSES.input.success} />
```

### **Alerts & Notifications**
```tsx
// Success alert
<div className={COLOR_CLASSES.alert.success}>
  Operation completed successfully!
</div>

// Error alert
<div className={COLOR_CLASSES.alert.error}>
  Something went wrong
</div>

// Warning alert
<div className={COLOR_CLASSES.alert.warning}>
  Please review your input
</div>
```

### **Borders**
```tsx
// Light borders
<div className={COLOR_CLASSES.border.light}>
  Subtle border
</div>

// Accent borders
<div className={COLOR_CLASSES.border.accent}>
  Highlighted border
</div>
```

## 🌙 **Dark Mode Support**

All color classes automatically support dark mode:
```tsx
// This automatically switches between light and dark
<div className={COLOR_CLASSES.background.primary}>
  Content adapts to theme
</div>
```

## 📱 **Responsive & Interactive States**

### **Hover States**
```tsx
// Primary hover
<div className={COLOR_CLASSES.hover.primary}>
  Hover effect
</div>

// Secondary hover
<div className={COLOR_CLASSES.hover.secondary}>
  Subtle hover
</div>
```

### **Focus States**
```tsx
// Primary focus ring
<input className={COLOR_CLASSES.ring.primary} />

// Success focus ring
<input className={COLOR_CLASSES.ring.success} />
```

### **Transitions**
```tsx
// All transitions
<div className={COLOR_CLASSES.transition}>
  Smooth transitions
</div>

// Color transitions only
<div className={COLOR_CLASSES["transition-colors"]}>
  Color transitions
</div>
```

## 🎨 **Custom Color Combinations**

### **Creating New Combinations**
```tsx
import { combineColors } from '../constants/colorClasses';

const customButton = combineColors(
  COLOR_CLASSES.button.primary,
  COLOR_CLASSES.shadow.lg,
  "rounded-full px-6 py-3"
);
```

### **Extending the System**
```tsx
// Add to colorClasses.ts
export const CUSTOM_COLORS = {
  special: "bg-gradient-to-r from-purple-500 to-pink-500",
  unique: "text-amber-600 dark:text-amber-400",
};

// Use in components
<div className={CUSTOM_COLORS.special}>
  Custom styling
</div>
```

## 📋 **Best Practices**

### **✅ Do's**
- Use semantic colors for their intended purpose
- Leverage the predefined combinations for consistency
- Use dark mode variants for better accessibility
- Apply transitions for smooth interactions

### **❌ Don'ts**
- Don't hardcode color values (use the system)
- Don't mix different color schemes
- Don't ignore dark mode variants
- Don't create inconsistent color patterns

### **🎯 Consistency Rules**
1. **Primary actions**: Always use `primary-orange`
2. **Success states**: Always use `semantic-success-*`
3. **Error states**: Always use `semantic-error-*`
4. **Text hierarchy**: Use consistent text color scale
5. **Backgrounds**: Use consistent background hierarchy

## 🔍 **Common Use Cases**

### **Dashboard Cards**
```tsx
<div className={COMMON_COMBINATIONS.card}>
  <h3 className={COLOR_CLASSES.text.primary}>Card Title</h3>
  <p className={COLOR_CLASSES.text.secondary}>Card content</p>
  <button className={COMMON_COMBINATIONS.buttonPrimary}>
    Action
  </button>
</div>
```

### **Form Sections**
```tsx
<div className={COLOR_CLASSES.background.secondary}>
  <h2 className={COLOR_CLASSES.text.heading}>Form Section</h2>
  <input className={COMMON_COMBINATIONS.inputDefault} />
  <button className={COMMON_COMBINATIONS.buttonPrimary}>
    Submit
  </button>
</div>
```

### **Status Indicators**
```tsx
<span className={COLOR_CLASSES.status.online}>
  Online
</span>

<span className={COLOR_CLASSES.status.busy}>
  Busy
</span>
```

## 🚀 **Migration Guide**

### **From Hardcoded Colors**
```tsx
// Before
<div className="bg-blue-500 text-white">

// After
<div className={COLOR_CLASSES.background.info}>
```

### **From Inconsistent Patterns**
```tsx
// Before
<div className="bg-gray-100 border-gray-300">

// After
<div className={COMMON_COMBINATIONS.card}>
```

## 📚 **Reference**

### **Color Constants**
- `src/constants/colors.ts` - Raw color values
- `src/constants/colorClasses.ts` - Tailwind classes
- `tailwind.config.js` - Tailwind configuration

### **Examples**
- Check existing components for usage patterns
- Use the color picker in your browser dev tools
- Test both light and dark modes

---

**🎨 Remember: Consistency in color usage creates a professional, cohesive user experience!**
