import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UserManagementPanel = ({ selectedUser, onUserEdit, currentLanguage }) => {
  const [activeTab, setActiveTab] = useState('profile');

  const content = {
    en: {
      userManagement: 'User Management',
      selectUser: 'Select a user from the directory to view details',
      userProfile: 'User Profile',
      assignedRoles: 'Assigned Roles',
      activeSessions: 'Active Sessions',
      permissions: 'Permissions',
      editUser: 'Edit User',
      resetPassword: 'Reset Password',
      disableAccount: 'Disable Account',
      enableAccount: 'Enable Account',
      deleteUser: 'Delete User',
      lastLogin: 'Last Login',
      accountCreated: 'Account Created',
      mfaEnabled: 'MFA Enabled',
      sessionCount: 'Active Sessions',
      permissionLevel: 'Permission Level',
      department: 'Department',
      role: 'Role',
      status: 'Status',
      email: 'Email',
      phone: 'Phone',
      location: 'Location'
    },
    ar: {
      userManagement: 'إدارة المستخدمين',
      selectUser: 'اختر مستخدمًا من الدليل لعرض التفاصيل',
      userProfile: 'ملف المستخدم',
      assignedRoles: 'الأدوار المعينة',
      activeSessions: 'الجلسات النشطة',
      permissions: 'الصلاحيات',
      editUser: 'تعديل المستخدم',
      resetPassword: 'إعادة تعيين كلمة المرور',
      disableAccount: 'تعطيل الحساب',
      enableAccount: 'تفعيل الحساب',
      deleteUser: 'حذف المستخدم',
      lastLogin: 'آخر تسجيل دخول',
      accountCreated: 'تاريخ إنشاء الحساب',
      mfaEnabled: 'المصادقة الثنائية مفعلة',
      sessionCount: 'الجلسات النشطة',
      permissionLevel: 'مستوى الصلاحيات',
      department: 'القسم',
      role: 'الدور',
      status: 'الحالة',
      email: 'البريد الإلكتروني',
      phone: 'الهاتف',
      location: 'الموقع'
    },
    fr: {
      userManagement: 'Gestion des Utilisateurs',
      selectUser: 'Sélectionnez un utilisateur dans l\'annuaire pour voir les détails',
      userProfile: 'Profil Utilisateur',
      assignedRoles: 'Rôles Assignés',
      activeSessions: 'Sessions Actives',
      permissions: 'Permissions',
      editUser: 'Modifier l\'Utilisateur',
      resetPassword: 'Réinitialiser le Mot de Passe',
      disableAccount: 'Désactiver le Compte',
      enableAccount: 'Activer le Compte',
      deleteUser: 'Supprimer l\'Utilisateur',
      lastLogin: 'Dernière Connexion',
      accountCreated: 'Compte Créé',
      mfaEnabled: 'MFA Activé',
      sessionCount: 'Sessions Actives',
      permissionLevel: 'Niveau de Permission',
      department: 'Département',
      role: 'Rôle',
      status: 'Statut',
      email: 'Email',
      phone: 'Téléphone',
      location: 'Localisation'
    }
  };

  const t = content?.[currentLanguage];

  const tabs = [
    { id: 'profile', label: t?.userProfile, icon: 'User' },
    { id: 'roles', label: t?.assignedRoles, icon: 'Shield' },
    { id: 'sessions', label: t?.activeSessions, icon: 'Monitor' },
    { id: 'permissions', label: t?.permissions, icon: 'Lock' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-success/10 text-success';
      case 'inactive': return 'bg-muted text-muted-foreground';
      case 'pending': return 'bg-warning/10 text-warning';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleDateString();
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleString();
  };

  // Mock data for demonstration
  const userRoles = [
    { id: 1, name: 'Security Analyst', permissions: ['read:vulnerabilities', 'write:incidents'] },
    { id: 2, name: 'IT User', permissions: ['read:devices', 'read:dashboard'] }
  ];

  const activeSessions = [
    { 
      id: 1, 
      device: 'Windows Desktop', 
      location: 'New York, US', 
      ip: '192.168.1.100', 
      lastActivity: '2025-01-30T14:30:00Z',
      browser: 'Chrome 120.0'
    },
    { 
      id: 2, 
      device: 'iPhone 15', 
      location: 'New York, US', 
      ip: '10.0.0.55', 
      lastActivity: '2025-01-30T12:15:00Z',
      browser: 'Safari 17.0'
    }
  ];

  const userPermissions = [
    { module: 'Dashboard', read: true, write: false, admin: false },
    { module: 'Vulnerabilities', read: true, write: true, admin: false },
    { module: 'Incidents', read: true, write: true, admin: false },
    { module: 'Devices', read: true, write: false, admin: false },
    { module: 'Users', read: false, write: false, admin: false },
    { module: 'Settings', read: false, write: false, admin: false }
  ];

  if (!selectedUser) {
    return (
      <div className="bg-card border border-border rounded-lg h-full flex items-center justify-center">
        <div className="text-center">
          <Icon name="Users" size={64} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">{t?.userManagement}</h3>
          <p className="text-muted-foreground">{t?.selectUser}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg h-full">
      {/* User Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              {selectedUser?.avatar ? (
                <img 
                  src={selectedUser?.avatar} 
                  alt={selectedUser?.name} 
                  className="w-16 h-16 rounded-full"
                />
              ) : (
                <Icon name="User" size={32} className="text-primary" />
              )}
            </div>
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <h2 className="text-xl font-semibold text-foreground">{selectedUser?.name}</h2>
                <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(selectedUser?.status)}`}>
                  {selectedUser?.status}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{selectedUser?.email}</p>
              <p className="text-sm text-muted-foreground">{selectedUser?.role} • {selectedUser?.department}</p>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Edit"
              onClick={() => onUserEdit?.(selectedUser)}
            >
              {t?.editUser}
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="Key"
            >
              {t?.resetPassword}
            </Button>
            {selectedUser?.status === 'active' ? (
              <Button
                variant="outline"
                size="sm"
                iconName="UserX"
              >
                {t?.disableAccount}
              </Button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                iconName="UserCheck"
              >
                {t?.enableAccount}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border">
        <div className="flex space-x-0">
          {tabs?.map(tab => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 px-4 py-3 border-b-2 transition-colors duration-200 ${
                activeTab === tab?.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span className="font-medium">{tab?.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-6 overflow-y-auto">
        {activeTab === 'profile' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">{t?.email}</label>
                <p className="text-foreground">{selectedUser?.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">{t?.role}</label>
                <p className="text-foreground">{selectedUser?.role}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">{t?.department}</label>
                <p className="text-foreground">{selectedUser?.department}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">{t?.phone}</label>
                <p className="text-foreground">+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">{t?.lastLogin}</label>
                <p className="text-foreground">{formatDateTime(selectedUser?.lastLogin)}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">{t?.accountCreated}</label>
                <p className="text-foreground">{formatDate('2024-03-15')}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">{t?.mfaEnabled}</label>
                <div className="flex items-center space-x-2">
                  <Icon name="Shield" size={16} className="text-success" />
                  <span className="text-success">Yes</span>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">{t?.location}</label>
                <p className="text-foreground">New York, US</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'roles' && (
          <div className="space-y-4">
            {userRoles?.map(role => (
              <div key={role?.id} className="border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-foreground">{role?.name}</h4>
                  <Button variant="ghost" size="sm" iconName="X">
                    Remove
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {role?.permissions?.map((permission, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-md"
                    >
                      {permission}
                    </span>
                  ))}
                </div>
              </div>
            ))}
            <Button variant="outline" iconName="Plus" className="w-full">
              Add Role
            </Button>
          </div>
        )}

        {activeTab === 'sessions' && (
          <div className="space-y-4">
            {activeSessions?.map(session => (
              <div key={session?.id} className="border border-border rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Icon name="Monitor" size={20} className="text-muted-foreground" />
                    <div>
                      <p className="font-medium text-foreground">{session?.device}</p>
                      <p className="text-sm text-muted-foreground">{session?.browser}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" iconName="X">
                    End Session
                  </Button>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Location:</span>
                    <p className="text-foreground">{session?.location}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">IP Address:</span>
                    <p className="text-foreground">{session?.ip}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Last Activity:</span>
                    <p className="text-foreground">{formatDateTime(session?.lastActivity)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'permissions' && (
          <div className="space-y-4">
            <div className="grid gap-4">
              {userPermissions?.map((perm, index) => (
                <div key={index} className="border border-border rounded-lg p-4">
                  <div className="grid grid-cols-4 gap-4 items-center">
                    <div className="font-medium text-foreground">{perm?.module}</div>
                    <div className="flex items-center space-x-2">
                      <Icon 
                        name={perm?.read ? "Check" : "X"} 
                        size={16} 
                        className={perm?.read ? "text-success" : "text-muted-foreground"} 
                      />
                      <span className="text-sm">Read</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon 
                        name={perm?.write ? "Check" : "X"} 
                        size={16} 
                        className={perm?.write ? "text-success" : "text-muted-foreground"} 
                      />
                      <span className="text-sm">Write</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon 
                        name={perm?.admin ? "Check" : "X"} 
                        size={16} 
                        className={perm?.admin ? "text-success" : "text-muted-foreground"} 
                      />
                      <span className="text-sm">Admin</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagementPanel;