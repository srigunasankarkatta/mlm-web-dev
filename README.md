# QuadraCore Digital IT Solutions - Portfolio Website

A modern, fast, and responsive portfolio website built with React, TypeScript, and Tailwind CSS. Features smooth scrolling, premium animations, and a comprehensive showcase of digital services.

## 🚀 Features

- **Modern Tech Stack**: React 18, TypeScript, Vite, Tailwind CSS
- **Smooth Scrolling**: Native smooth scrolling with reduced-motion support
- **Premium Animations**: Framer Motion animations and micro-interactions
- **Responsive Design**: Mobile-first approach with beautiful UI/UX
- **Dark Mode**: Automatic theme switching with system preference detection
- **Performance Optimized**: Lighthouse 95+ targets with code splitting
- **SEO Ready**: Semantic HTML, meta tags, and structured data
- **Accessibility**: ARIA labels, keyboard navigation, and focus management

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + PostCSS
- **Animations**: Framer Motion
- **Smooth Scrolling**: Native CSS
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **State Management**: React Hooks
- **Code Quality**: ESLint + Prettier

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components
│   ├── Navbar.tsx      # Navigation component
│   └── Footer.tsx      # Footer component
├── features/           # Feature-based components
│   ├── home/          # Home page components
│   ├── services/      # Services page components
│   ├── work/          # Work/portfolio components
│   ├── about/         # About page components
│   └── contact/       # Contact page components
├── hooks/             # Custom React hooks
├── constants/         # Site-wide constants and data
├── content/           # JSON content files
└── assets/            # Static assets
```

## 🎨 Design System

### Colors
- **Primary Navy**: #0B1D2A
- **Accent Orange**: #E8741E
- **Slate**: #8FA3B0
- **Off-white**: #F7F8FA
- **Success**: #16A34A

### Typography
- **Headings**: Inter/Manrope (700 weight)
- **Body**: Inter/Manrope (500 weight)
- **Responsive**: Fluid typography scaling

### Components
- **Buttons**: Primary, Secondary, Ghost variants
- **Cards**: Hover effects with micro-interactions
- **Forms**: Accessible form components
- **Navigation**: Auto-hide navbar with mobile drawer

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd quadra-core
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

### Build Commands

```bash
# Development
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint

# Type checking
npm run type-check
```

## 📱 Pages & Sections

### Home Page (/)
- **Hero Section**: Split layout with animated background
- **Stats Section**: Animated counters with scroll triggers
- **Services Grid**: Interactive service cards with hover effects
- **Case Studies**: Featured project showcase
- **Client Logos**: Marquee with pause on hover
- **Process Timeline**: 5-step process visualization
- **Testimonials**: Client feedback slider
- **Tech Stack**: Technology showcase
- **CTA Section**: Compelling call-to-action

### Services (/services)
- **Service Overview**: Comprehensive service descriptions
- **Pricing Packages**: Starter, Growth, and Custom tiers
- **Feature Comparison**: Detailed feature breakdowns
- **Service Details**: Deep-dive into each service

### Work (/work)
- **Portfolio Grid**: Filterable case study showcase
- **Case Study Details**: Problem → Solution → Results
- **Project Metrics**: KPI visualizations
- **Technology Stack**: Used technologies and tools

### About (/about)
- **Company Story**: Mission, vision, and values
- **Team Section**: Team member profiles with social links
- **Company Culture**: Work environment and achievements
- **Certifications**: Industry recognition

### Contact (/contact)
- **Contact Form**: Comprehensive project inquiry form
- **Contact Information**: Phone, email, and address
- **Map Integration**: Location visualization
- **Scheduling**: Calendar integration

## 🎭 Animations & Interactions

### Scroll Animations
- **Staggered Reveals**: Elements animate in sequence
- **Parallax Effects**: Subtle depth on scroll
- **Counter Animations**: Numbers count up on view
- **Progress Indicators**: Scroll-based progress bars

### Micro-interactions
- **Hover Effects**: Scale, rotate, and shadow changes
- **Button States**: Magnetic CTA effects
- **Card Interactions**: 3D tilt and parallax
- **Navigation**: Smooth transitions and indicators

### Performance
- **Reduced Motion**: Respects user preferences
- **Lazy Loading**: Images and heavy sections
- **Code Splitting**: Route-based code splitting
- **Optimized Assets**: WebP/AVIF image formats

## 📊 Content Management

### JSON Data Structure
- **Services**: Service definitions and pricing
- **Case Studies**: Project details and metrics
- **Testimonials**: Client feedback and ratings
- **Team**: Member information and social links

### Content Hooks
- `useServices()`: Load and manage services data
- `useCaseStudies()`: Load and filter case studies
- `useTestimonials()`: Load testimonials data
- `useTeam()`: Load team and company information

## 🔧 Configuration

### Tailwind CSS
- Custom color palette
- Extended spacing and animations
- Responsive breakpoints
- Dark mode support

### Vite
- TypeScript support
- Hot module replacement
- Build optimization
- Development server

### Environment Variables
```env
VITE_SITE_URL=https://quadracore.com
VITE_CONTACT_EMAIL=hello@quadracore.com
VITE_ANALYTICS_ID=your-analytics-id
```

## 📈 Performance & SEO

### Lighthouse Targets
- **Performance**: 95+
- **Accessibility**: 95+
- **Best Practices**: 95+
- **SEO**: 95+

### SEO Features
- Semantic HTML structure
- Meta tags and Open Graph
- Structured data (JSON-LD)
- Sitemap generation
- Robots.txt configuration

### Performance Optimizations
- Image optimization
- Code splitting
- Lazy loading
- Service worker (PWA ready)
- Critical CSS inlining

## 🌐 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel --prod
```

### Netlify
```bash
npm run build
# Deploy dist/ folder
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## 🧪 Testing

### Unit Tests
```bash
npm run test
```

### E2E Tests
```bash
npm run test:e2e
```

### Accessibility Tests
```bash
npm run test:a11y
```

## 📝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### Code Style
- Use TypeScript for all new code
- Follow ESLint configuration
- Use Prettier for formatting
- Write meaningful commit messages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Support

For support and questions:
- **Email**: hello@quadracore.com
- **Documentation**: [docs.quadracore.com](https://docs.quadracore.com)
- **Issues**: [GitHub Issues](https://github.com/quadracore/portfolio/issues)

## 🙏 Acknowledgments

- **Framer Motion** for smooth animations
- **Native CSS** for smooth scrolling
- **Tailwind CSS** for utility-first styling
- **Lucide** for beautiful icons
- **Vite** for fast development experience

---

Built with ❤️ by the QuadraCore team
