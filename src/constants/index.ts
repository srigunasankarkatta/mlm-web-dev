export const SITE_CONFIG = {
    name: 'QuadraCore Digital IT Solutions',
    tagline: 'Powering your brand with a QuadraCore of innovation.',
    description: 'Leading digital transformation partner specializing in web development, UI/UX design, SEO optimization, social media marketing, and branding solutions.',
    url: 'https://quadracore.com',
    email: 'hello@quadracore.com',
    phone: '+1 (555) 123-4567',
    address: '123 Innovation Drive, Tech City, TC 12345',
    founded: '2020',
    logo: '/logo.svg',
    favicon: '/favicon.ico',
} as const;

export const NAVIGATION = [
    {
        name: 'Home',
        href: '/',
        description: 'Welcome to QuadraCore - Your digital innovation partner',
    },
    {
        name: 'Services',
        href: '/services',
        description: 'Explore our comprehensive digital services',
    },
    {
        name: 'Work',
        href: '/work',
        description: 'View our successful case studies and projects',
    },
    {
        name: 'About',
        href: '/about',
        description: 'Learn about our team and company culture',
    },
    {
        name: 'Contact',
        href: '/contact',
        description: 'Get in touch to start your project',
    },
] as const;

export const SOCIAL_LINKS = [
    {
        name: 'LinkedIn',
        href: 'https://linkedin.com/company/quadracore',
        icon: 'Linkedin',
    },
    {
        name: 'Twitter',
        href: 'https://twitter.com/quadracore',
        icon: 'Twitter',
    },
    {
        name: 'Facebook',
        href: 'https://facebook.com/quadracore',
        icon: 'Facebook',
    },
    {
        name: 'Instagram',
        href: 'https://instagram.com/quadracore',
        icon: 'Instagram',
    },
    {
        name: 'YouTube',
        href: 'https://youtube.com/quadracore',
        icon: 'Youtube',
    },
] as const;

export const SERVICES_CATEGORIES = [
    'web-development',
    'ui-ux-design',
    'seo',
    'social-media-marketing',
    'branding',
] as const;

export const TECH_STACK = [
    'React',
    'Next.js',
    'Laravel',
    'Node.js',
    'TypeScript',
    'Tailwind CSS',
    'Framer Motion',
    'Vite',
    'MySQL',
    'MongoDB',
    'Redis',
    'AWS',
    'Azure',
    'Docker',
    'Git',
    'Figma',
    'Adobe Creative Suite',
    'Google Analytics',
    'Google Search Console',
    'SEMrush',
    'Hootsuite',
    'Canva',
] as const;

export const CLIENT_LOGOS = [
    {
        name: 'TechMart Solutions',
        logo: '/clients/techmart.svg',
        industry: 'E-commerce',
    },
    {
        name: 'DataFlow Analytics',
        logo: '/clients/dataflow.svg',
        industry: 'SaaS',
    },
    {
        name: 'Fusion Bistro',
        logo: '/clients/fusion-bistro.svg',
        industry: 'Restaurant',
    },
    {
        name: 'Green Thumb Landscaping',
        logo: '/clients/green-thumb.svg',
        industry: 'Landscaping',
    },
    {
        name: 'FitLife Gym',
        logo: '/clients/fitlife.svg',
        industry: 'Fitness',
    },
    {
        name: 'InnovateTech',
        logo: '/clients/innovatetech.svg',
        industry: 'Technology',
    },
    {
        name: 'EcoSolutions',
        logo: '/clients/ecosolutions.svg',
        industry: 'Environmental',
    },
    {
        name: 'CloudScale',
        logo: '/clients/cloudscale.svg',
        industry: 'Cloud Services',
    },
] as const;

export const PROCESS_STEPS = [
    {
        step: 1,
        title: 'Discover',
        description: 'We analyze your business needs, goals, and challenges to understand your unique requirements.',
        icon: 'Search',
        color: 'blue',
    },
    {
        step: 2,
        title: 'Design',
        description: 'Our creative team develops strategic solutions and visual concepts that align with your brand.',
        icon: 'Palette',
        color: 'purple',
    },
    {
        step: 3,
        title: 'Build',
        description: 'We develop and implement your solution using cutting-edge technologies and best practices.',
        icon: 'Code',
        color: 'green',
    },
    {
        step: 4,
        title: 'Launch',
        description: 'We ensure smooth deployment and provide comprehensive testing and quality assurance.',
        icon: 'Rocket',
        color: 'orange',
    },
    {
        step: 5,
        title: 'Grow',
        description: 'We provide ongoing support, optimization, and strategies to help your business scale.',
        icon: 'TrendingUp',
        color: 'red',
    },
] as const;

export const STATS = [
    {
        label: 'Years of Experience',
        value: '5+',
        description: 'Delivering digital excellence',
    },
    {
        label: 'Projects Completed',
        value: '100+',
        description: 'Successful deliveries',
    },
    {
        label: 'Industries Served',
        value: '25+',
        description: 'Diverse expertise',
    },
    {
        label: 'Client Satisfaction',
        value: '95%',
        description: 'Exceeding expectations',
    },
] as const;

export const FAQS = [
    {
        question: 'What makes QuadraCore different from other agencies?',
        answer: 'We combine technical expertise with strategic business thinking. Our team doesn\'t just build websites; we create digital solutions that drive real business results. We focus on understanding your business goals first, then deliver technology solutions that help you achieve them.',
        category: 'general',
    },
    {
        question: 'How long does a typical project take?',
        answer: 'Project timelines vary based on complexity and scope. A simple website might take 4-6 weeks, while a complex web application could take 12-16 weeks. We\'ll provide a detailed timeline during our initial consultation based on your specific requirements.',
        category: 'timeline',
    },
    {
        question: 'Do you provide ongoing support after launch?',
        answer: 'Yes, we offer various support and maintenance packages. We believe in building long-term partnerships with our clients. After launch, we can provide ongoing support, updates, optimization, and even help with future enhancements.',
        category: 'support',
    },
    {
        question: 'What technologies do you specialize in?',
        answer: 'We specialize in modern web technologies including React, Next.js, Laravel, Node.js, and more. We choose the best technology stack for each project based on requirements, scalability needs, and long-term maintenance considerations.',
        category: 'technology',
    },
    {
        question: 'How do you ensure project quality and on-time delivery?',
        answer: 'We follow a proven project management methodology with regular check-ins, milestone reviews, and quality assurance processes. Our team is experienced in delivering complex projects on time and within budget while maintaining high quality standards.',
        category: 'process',
    },
    {
        question: 'Can you help with existing projects or only new development?',
        answer: 'We can help with both! Whether you need a complete redesign, want to add new features to an existing site, or need help optimizing performance, we have the expertise to work with your current setup and improve it.',
        category: 'services',
    },
] as const;

export const CONTACT_FORM_FIELDS = [
    {
        name: 'name',
        label: 'Full Name',
        type: 'text',
        required: true,
        placeholder: 'Enter your full name',
    },
    {
        name: 'email',
        label: 'Email Address',
        type: 'email',
        required: true,
        placeholder: 'Enter your email address',
    },
    {
        name: 'company',
        label: 'Company Name',
        type: 'text',
        required: false,
        placeholder: 'Enter your company name (optional)',
    },
    {
        name: 'budget',
        label: 'Project Budget',
        type: 'select',
        required: true,
        options: [
            { value: 'under-10k', label: 'Under $10,000' },
            { value: '10k-25k', label: '$10,000 - $25,000' },
            { value: '25k-50k', label: '$25,000 - $50,000' },
            { value: '50k-100k', label: '$50,000 - $100,000' },
            { value: 'over-100k', label: 'Over $100,000' },
            { value: 'custom', label: 'Custom/Not sure' },
        ],
    },
    {
        name: 'timeline',
        label: 'Project Timeline',
        type: 'select',
        required: true,
        options: [
            { value: 'asap', label: 'ASAP' },
            { value: '1-3-months', label: '1-3 months' },
            { value: '3-6-months', label: '3-6 months' },
            { value: '6-months-plus', label: '6+ months' },
            { value: 'flexible', label: 'Flexible' },
        ],
    },
    {
        name: 'message',
        label: 'Project Details',
        type: 'textarea',
        required: true,
        placeholder: 'Tell us about your project, goals, and requirements...',
        rows: 5,
    },
] as const; 