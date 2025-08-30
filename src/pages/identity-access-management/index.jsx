import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationSidebar from '../../components/ui/NavigationSidebar';
import UserProfileDropdown from '../../components/ui/UserProfileDropdown';
import NotificationCenter from '../../components/ui/NotificationCenter';
import LanguageSwitcher from '../../components/ui/LanguageSwitcher';
import UserDirectoryPanel from './components/UserDirectoryPanel';
import UserManagementPanel from './components/UserManagementPanel';
import UserDetailModal from './components/UserDetailModal';
import RoleManagementPanel from './components/RoleManagementPanel';
import AccessControlToolbar from './components/AccessControlToolbar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const IdentityAccessManagement = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isMobile, setIsMobile] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showRoleManagement, setShowRoleManagement] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [refreshing, setRefreshing] = useState(false);

  // Language content
  const content = {
    en: {
      title: 'Identity & Access Management',
      subtitle: 'Comprehensive user directory and role-based access control',
      userDirectory: 'User Directory',
      userManagement: 'User Management',
      roleManagement: 'Role Management',
      accessControl: 'Access Control',
      totalUsers: 'Total Users',
      activeUsers: 'Active Users',
      inactiveUsers: 'Inactive Users',
      pendingUsers: 'Pending Users',
      lastSync: 'Last synchronization',
      syncNow: 'Sync Now'
    },
    ar: {
      title: 'إدارة الهوية والوصول',
      subtitle: 'دليل المستخدمين الشامل والتحكم في الوصول القائم على الأدوار',
      userDirectory: 'دليل المستخدمين',
      userManagement: 'إدارة المستخدمين',
      roleManagement: 'إدارة الأدوار',
      accessControl: 'التحكم في الوصول',
      totalUsers: 'إجمالي المستخدمين',
      activeUsers: 'المستخدمون النشطون',
      inactiveUsers: 'المستخدمون غير النشطين',
      pendingUsers: 'المستخدمون المعلقون',
      lastSync: 'آخر مزامنة',
      syncNow: 'مزامنة الآن'
    },
    fr: {
      title: 'Gestion des Identités et Accès',
      subtitle: 'Annuaire d\'utilisateurs complet et contrôle d\'accès basé sur les rôles',
      userDirectory: 'Annuaire Utilisateurs',
      userManagement: 'Gestion Utilisateurs',
      roleManagement: 'Gestion des Rôles',
      accessControl: 'Contrôle d\'Accès',
      totalUsers: 'Total Utilisateurs',
      activeUsers: 'Utilisateurs Actifs',
      inactiveUsers: 'Utilisateurs Inactifs',
      pendingUsers: 'Utilisateurs en Attente',
      lastSync: 'Dernière synchronisation',
      syncNow: 'Synchroniser Maintenant'
    }
  };

  const t = content?.[currentLanguage];

  useEffect(() => {
    // Check for saved language preference
    const savedLanguage = localStorage.getItem('preferred-language');
    if (savedLanguage && content?.[savedLanguage]) {
      setCurrentLanguage(savedLanguage);
    }

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleLanguageChange = (language) => {
    setCurrentLanguage(language);
  };

  const handleSync = async () => {
    setRefreshing(true);
    // Simulate sync with Active Directory/LDAP
    await new Promise(resolve => setTimeout(resolve, 3000));
    setRefreshing(false);
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  const handleUserEdit = (user) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };

  const handleUserModalClose = () => {
    setShowUserModal(false);
    setSelectedUser(null);
  };

  const handleRoleManagementToggle = () => {
    setShowRoleManagement(!showRoleManagement);
  };

  // Mock user stats
  const userStats = {
    total: 247,
    active: 198,
    inactive: 35,
    pending: 14
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Sidebar */}
      <NavigationSidebar 
        isCollapsed={sidebarCollapsed} 
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />

      {/* Main Content */}
      <div className={`transition-all duration-300 ${
        isMobile ? 'ml-0 pb-16' : sidebarCollapsed ? 'ml-16' : 'ml-60'
      }`}>
        {/* Header */}
        <header className="bg-card border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {isMobile && (
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Menu"
                  onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                />
              )}
              <div>
                <h1 className="text-2xl font-bold text-foreground">{t?.title}</h1>
                <p className="text-sm text-muted-foreground">{t?.subtitle}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Clock" size={16} />
                <span>{t?.lastSync}: {new Date().toLocaleTimeString()}</span>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                iconName="RefreshCw"
                loading={refreshing}
                onClick={handleSync}
              >
                {t?.syncNow}
              </Button>
              
              <LanguageSwitcher 
                currentLanguage={currentLanguage}
                onLanguageChange={handleLanguageChange}
              />
              
              <NotificationCenter 
                onMarkAsRead={() => {}}
                onMarkAllAsRead={() => {}}
                onNotificationClick={() => {}}
              />
              
              <UserProfileDropdown 
                onLogout={() => navigate('/login')}
                onSwitchOrganization={() => {}}
              />
            </div>
          </div>
        </header>

        {/* Access Control Toolbar */}
        <AccessControlToolbar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedFilter={selectedFilter}
          onFilterChange={setSelectedFilter}
          onRoleManagement={handleRoleManagementToggle}
          userStats={userStats}
          currentLanguage={currentLanguage}
        />

        {/* Main Content Area */}
        <main className="p-6">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 h-full">
            {/* Left Panel - User Directory */}
            <div className="xl:col-span-4">
              <UserDirectoryPanel
                searchQuery={searchQuery}
                selectedFilter={selectedFilter}
                onUserSelect={handleUserSelect}
                selectedUser={selectedUser}
                currentLanguage={currentLanguage}
              />
            </div>

            {/* Main Panel - User Management or Role Management */}
            <div className="xl:col-span-8">
              {showRoleManagement ? (
                <RoleManagementPanel
                  currentLanguage={currentLanguage}
                  onClose={() => setShowRoleManagement(false)}
                />
              ) : (
                <UserManagementPanel
                  selectedUser={selectedUser}
                  onUserEdit={handleUserEdit}
                  currentLanguage={currentLanguage}
                />
              )}
            </div>
          </div>
        </main>
      </div>

      {/* User Detail Modal */}
      {showUserModal && selectedUser && (
        <UserDetailModal
          user={selectedUser}
          isOpen={showUserModal}
          onClose={handleUserModalClose}
          currentLanguage={currentLanguage}
        />
      )}
    </div>
  );
};

export default IdentityAccessManagement;