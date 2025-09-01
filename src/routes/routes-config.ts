// Import MLM routes configuration
import { mlmRoutes } from '../mlm-dashboard-portal/routes/mlm-routes';

// Simple route interface
export interface RouteConfig {
    path: string;
    name: string;
    title: string;
    description: string;
}

// Export MLM routes for use in the application
export const allRoutes: RouteConfig[] = mlmRoutes;

// Simple helper function to get route by path
export const getRouteByPath = (path: string): RouteConfig | undefined => {
    return allRoutes.find(route => route.path === path);
};

export default allRoutes;
