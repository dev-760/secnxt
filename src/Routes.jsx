import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import LoginPage from './pages/login';
import OrganizationSetupWizard from './pages/organization-setup-wizard';
import DeviceManagement from './pages/device-management';
import VulnerabilityManagement from './pages/vulnerability-management';
import SecurityDashboard from './pages/security-dashboard';
import IncidentResponseCenter from './pages/incident-response-center';
import IdentityAccessManagement from './pages/identity-access-management';
import ComplianceReporting from './pages/compliance-reporting';
import ProfileSettings from './pages/profile-settings';
import AccountSettings from './pages/account-settings';
import HelpSupport from './pages/help-support';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<DeviceManagement />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/organization-setup-wizard" element={<OrganizationSetupWizard />} />
        <Route path="/device-management" element={<DeviceManagement />} />
        <Route path="/vulnerability-management" element={<VulnerabilityManagement />} />
        <Route path="/security-dashboard" element={<SecurityDashboard />} />
        <Route path="/incident-response-center" element={<IncidentResponseCenter />} />
        <Route path="/identity-access-management" element={<IdentityAccessManagement />} />
        <Route path="/compliance-reporting" element={<ComplianceReporting />} />
        <Route path="/profile" element={<ProfileSettings />} />
        <Route path="/account" element={<AccountSettings />} />
        <Route path="/help" element={<HelpSupport />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;