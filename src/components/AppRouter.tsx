import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Import MLM Dashboard components
import {
  Login,
  ForgotPassword,
  ResetPassword,
} from "../mlm-dashboard-portal/features/auth";

// Import Admin components
import AdminDashboard from "../mlm-dashboard-portal/features/dashboard/AdminDashboard";
import AdminUsers from "../mlm-dashboard-portal/features/users/AdminUsers";
import AdminDashboardLayout from "../mlm-dashboard-portal/components/layouts/admin-dashboard-layout";

// Import Customer Portal components
import CustomerPortal from "../mlm-customer-portal/CustomerPortal";
import CustomerLoginPage from "../mlm-customer-portal/pages/LoginPage";
import CustomerRegisterPage from "../mlm-customer-portal/pages/RegisterPage";

// Import existing components
import Home from "../features/home/Home";
import Services from "../features/services/Services";
import Work from "../features/work/Work";
import About from "../features/about/About";
import Contact from "../features/contact/Contact";
import CaseStudyDetail from "../features/work/CaseStudyDetail";
import ServiceDetail from "../features/services/ServiceDetail";
import AllUsers from "../mlm-dashboard-portal/features/user-management/AllUsers";
import UserDetail from "../mlm-dashboard-portal/features/user-management/UserDetail";
import EditUser from "../mlm-dashboard-portal/features/user-management/EditUser";
import CreateUser from "../mlm-dashboard-portal/features/user-management/CreateUser";
import AllPackages from "../mlm-dashboard-portal/features/package-management/AllPackages";
import PackageDetail from "../mlm-dashboard-portal/features/package-management/PackageDetail";
import CreatePackage from "../mlm-dashboard-portal/features/package-management/CreatePackage";
import EditPackage from "../mlm-dashboard-portal/features/package-management/EditPackage";
import DashboardLayout from "../components/DashboardLayout";

interface AppRouterProps {
  currentUserRole: string;
}

const AppRouter: React.FC<AppRouterProps> = ({ currentUserRole }) => {
  return (
    <Routes>
      {/* Public Routes - Always accessible */}
      <Route path="/" element={<Navigate to="/customer" replace />} />
      <Route path="/home" element={<Home />} />
      <Route path="/services" element={<Services />} />
      <Route path="/services/:serviceId" element={<ServiceDetail />} />
      <Route path="/work" element={<Work />} />
      <Route path="/work/:caseStudyId" element={<CaseStudyDetail />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />

      {/* Customer Portal Routes - Public access */}
      <Route path="/customer/*" element={<CustomerPortal />} />

      {/* Customer Authentication Routes - Public access */}
      <Route path="/login" element={<CustomerLoginPage />} />
      <Route path="/register" element={<CustomerRegisterPage />} />

      {/* Admin Authentication Routes - Public access */}
      <Route path="/admin/login" element={<Login />} />
      <Route path="/admin/forgot-password" element={<ForgotPassword />} />
      <Route path="/admin/reset-password" element={<ResetPassword />} />

      {/* Admin Dashboard Routes - With layout wrapper */}
      <Route
        path="/admin/dashboard"
        element={
          <AdminDashboardLayout>
            <AdminDashboard />
          </AdminDashboardLayout>
        }
      />
      <Route
        path="/admin/users"
        element={
          <AdminDashboardLayout>
            <AllUsers />
          </AdminDashboardLayout>
        }
      />
      <Route
        path="/admin/users/create"
        element={
          <AdminDashboardLayout>
            <CreateUser />
          </AdminDashboardLayout>
        }
      />
      <Route
        path="/admin/users/:id"
        element={
          <AdminDashboardLayout>
            <UserDetail />
          </AdminDashboardLayout>
        }
      />
      <Route
        path="/admin/users/:id/edit"
        element={
          <AdminDashboardLayout>
            <EditUser />
          </AdminDashboardLayout>
        }
      />
      <Route
        path="/admin/packages"
        element={
          <AdminDashboardLayout>
            <AllPackages />
          </AdminDashboardLayout>
        }
      />
      <Route
        path="/admin/packages/create"
        element={
          <AdminDashboardLayout>
            <CreatePackage />
          </AdminDashboardLayout>
        }
      />
      <Route
        path="/admin/packages/:id"
        element={
          <AdminDashboardLayout>
            <PackageDetail />
          </AdminDashboardLayout>
        }
      />
      <Route
        path="/admin/packages/:id/edit"
        element={
          <AdminDashboardLayout>
            <EditPackage />
          </AdminDashboardLayout>
        }
      />
      <Route
        path="/admin/settings"
        element={
          <AdminDashboardLayout>
            <div>Settings Page</div>
          </AdminDashboardLayout>
        }
      />

      {/* MLM Dashboard Routes - With DashboardLayout wrapper */}
      <Route
        path="/users/all"
        element={
          <DashboardLayout currentUserRole={currentUserRole}>
            <AllUsers />
          </DashboardLayout>
        }
      />
      <Route
        path="/users/:id"
        element={
          <DashboardLayout currentUserRole={currentUserRole}>
            <UserDetail />
          </DashboardLayout>
        }
      />
      <Route
        path="/users/network-tree"
        element={
          <DashboardLayout currentUserRole={currentUserRole}>
            <div>Network Tree Page</div>
          </DashboardLayout>
        }
      />
      <Route
        path="/packages/all"
        element={
          <DashboardLayout currentUserRole={currentUserRole}>
            <div>Packages Page</div>
          </DashboardLayout>
        }
      />
      <Route
        path="/rules/all"
        element={
          <DashboardLayout currentUserRole={currentUserRole}>
            <div>Rules Page</div>
          </DashboardLayout>
        }
      />

      {/* Dashboard Overview - Redirect to main dashboard */}
      <Route path="/dashboard" element={<Navigate to="/users/all" replace />} />
      <Route
        path="/dashboard/*"
        element={<Navigate to="/users/all" replace />}
      />

      {/* Catch all route - Redirect to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRouter;
