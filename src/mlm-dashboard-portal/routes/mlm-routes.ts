// Simple MLM Dashboard Portal Route Configuration
export const mlmRoutes = [
    {
        path: '/admin/dashboard',
        name: 'AdminDashboard',
        title: 'Admin Dashboard',
        description: 'Main admin dashboard'
    },
    {
        path: '/admin/users',
        name: 'AdminUsers',
        title: 'User Management',
        description: 'Manage system users'
    },
    {
        path: '/admin/team',
        name: 'TeamManagement',
        title: 'Team Management',
        description: 'Manage user teams and network'
    },
    {
        path: '/admin/packages',
        name: 'PackageManagement',
        title: 'Package Management',
        description: 'Manage MLM packages'
    },
    {
        path: '/admin/rules',
        name: 'RuleManagement',
        title: 'Rule Management',
        description: 'Manage MLM rules and commissions'
    },
    {
        path: '/admin/analytics',
        name: 'Analytics',
        title: 'Analytics',
        description: 'View system analytics and reports'
    },
    {
        path: '/admin/settings',
        name: 'Settings',
        title: 'Settings',
        description: 'System configuration'
    }
];
