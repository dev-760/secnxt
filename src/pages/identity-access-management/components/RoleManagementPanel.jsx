import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RoleManagementPanel = ({ currentLanguage, onClose }) => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [showCreateRole, setShowCreateRole] = useState(false);

  const content = {
    en: {
      roleManagement: 'Role Management',
      createRole: 'Create New Role',
      editRole: 'Edit Role',
      roleName: 'Role Name',
      description: 'Description',
      permissions: 'Permissions',
      assignedUsers: 'Assigned Users',
      save: 'Save Role',
      cancel: 'Cancel',
      delete: 'Delete Role',
      customRoles: 'Custom Roles',
      systemRoles: 'System Roles',
      users: 'users'
    },
    ar: {
      roleManagement: 'إدارة الأدوار',
      createRole: 'إنشاء دور جديد',
      editRole: 'تعديل الدور',
      roleName: 'اسم الدور',
      description: 'الوصف',
      permissions: 'الصلاحيات',
      assignedUsers: 'المستخدمون المعينون',
      save: 'حفظ الدور',
      cancel: 'إلغاء',
      delete: 'حذف الدور',
      customRoles: 'الأدوار المخصصة',
      systemRoles: 'أدوار النظام',
      users: 'مستخدمين'
    },
    fr: {
      roleManagement: 'Gestion des Rôles',
      createRole: 'Créer Nouveau Rôle',
      editRole: 'Modifier le Rôle',
      roleName: 'Nom du Rôle',
      description: 'Description',
      permissions: 'Permissions',
      assignedUsers: 'Utilisateurs Assignés',
      save: 'Enregistrer le Rôle',
      cancel: 'Annuler',
      delete: 'Supprimer le Rôle',
      customRoles: 'Rôles Personnalisés',
      systemRoles: 'Rôles Système',
      users: 'utilisateurs'
    }
  };

  const t = content?.[currentLanguage];

  const systemRoles = [
    {
      id: 'admin',
      name: 'Administrator',
      description: 'Full system access with all permissions',
      type: 'system',
      users: 3,
      permissions: ['all']
    },
    {
      id: 'security-manager',
      name: 'Security Manager',
      description: 'Manage security operations and team oversight',
      type: 'system',
      users: 5,
      permissions: ['read:all', 'write:incidents', 'write:vulnerabilities', 'manage:users']
    }
  ];

  const customRoles = [
    {
      id: 'security-analyst',
      name: 'Security Analyst',
      description: 'Analyze threats and manage incident response',
      type: 'custom',
      users: 12,
      permissions: ['read:dashboard', 'write:incidents', 'read:vulnerabilities', 'read:devices']
    },
    {
      id: 'compliance-officer',
      name: 'Compliance Officer',
      description: 'Monitor compliance and generate reports',
      type: 'custom',
      users: 2,
      permissions: ['read:compliance', 'write:reports', 'read:audit-logs']
    },
    {
      id: 'read-only',
      name: 'Read-Only User',
      description: 'View-only access to dashboard and reports',
      type: 'custom',
      users: 18,
      permissions: ['read:dashboard', 'read:reports']
    }
  ];

  const allPermissions = [
    { id: 'read:dashboard', name: 'View Dashboard', category: 'Dashboard' },
    { id: 'read:devices', name: 'View Devices', category: 'Device Management' },
    { id: 'write:devices', name: 'Manage Devices', category: 'Device Management' },
    { id: 'read:vulnerabilities', name: 'View Vulnerabilities', category: 'Vulnerability Management' },
    { id: 'write:vulnerabilities', name: 'Manage Vulnerabilities', category: 'Vulnerability Management' },
    { id: 'read:incidents', name: 'View Incidents', category: 'Incident Response' },
    { id: 'write:incidents', name: 'Manage Incidents', category: 'Incident Response' },
    { id: 'read:compliance', name: 'View Compliance', category: 'Compliance' },
    { id: 'write:reports', name: 'Generate Reports', category: 'Compliance' },
    { id: 'read:audit-logs', name: 'View Audit Logs', category: 'Compliance' },
    { id: 'read:users', name: 'View Users', category: 'User Management' },
    { id: 'manage:users', name: 'Manage Users', category: 'User Management' },
    { id: 'manage:roles', name: 'Manage Roles', category: 'User Management' },
    { id: 'read:settings', name: 'View Settings', category: 'Settings' },
    { id: 'write:settings', name: 'Manage Settings', category: 'Settings' }
  ];

  const [newRole, setNewRole] = useState({
    name: '',
    description: '',
    permissions: []
  });

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setShowCreateRole(false);
  };

  const handleCreateRole = () => {
    setShowCreateRole(true);
    setSelectedRole(null);
    setNewRole({ name: '', description: '', permissions: [] });
  };

  const handlePermissionToggle = (permissionId, role = null) => {
    if (showCreateRole) {
      setNewRole(prev => ({
        ...prev,
        permissions: prev.permissions.includes(permissionId)
          ? prev.permissions.filter(p => p !== permissionId)
          : [...prev.permissions, permissionId]
      }));
    }
  };

  const groupedPermissions = allPermissions.reduce((groups, permission) => {
    const category = permission.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(permission);
    return groups;
  }, {});

  return (
    <div className="bg-card border border-border rounded-lg h-full">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">{t?.roleManagement}</h2>
          <div className="flex space-x-2">
            <Button
              variant="primary"
              size="sm"
              iconName="Plus"
              onClick={handleCreateRole}
            >
              {t?.createRole}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              onClick={onClose}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
        {/* Roles List */}
        <div className="space-y-6">
          {/* System Roles */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
              {t?.systemRoles}
            </h3>
            <div className="space-y-2">
              {systemRoles?.map(role => (
                <button
                  key={role?.id}
                  onClick={() => handleRoleSelect(role)}
                  className={`w-full p-3 rounded-lg border text-left transition-colors duration-200 ${
                    selectedRole?.id === role?.id
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-border bg-card text-foreground hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium">{role?.name}</span>
                    <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded">
                      {role?.users} {t?.users}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {role?.description}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Roles */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
              {t?.customRoles}
            </h3>
            <div className="space-y-2">
              {customRoles?.map(role => (
                <button
                  key={role?.id}
                  onClick={() => handleRoleSelect(role)}
                  className={`w-full p-3 rounded-lg border text-left transition-colors duration-200 ${
                    selectedRole?.id === role?.id
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-border bg-card text-foreground hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium">{role?.name}</span>
                    <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded">
                      {role?.users} {t?.users}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {role?.description}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Role Details/Create Form */}
        <div className="lg:col-span-2">
          {showCreateRole ? (
            <div className="border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">{t?.createRole}</h3>
              
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {t?.roleName}
                  </label>
                  <input
                    type="text"
                    value={newRole?.name}
                    onChange={(e) => setNewRole(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    placeholder="Enter role name..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {t?.description}
                  </label>
                  <textarea
                    value={newRole?.description}
                    onChange={(e) => setNewRole(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    placeholder="Describe the role's purpose..."
                    rows="3"
                  />
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-semibold text-foreground mb-3">{t?.permissions}</h4>
                <div className="space-y-4">
                  {Object.entries(groupedPermissions)?.map(([category, permissions]) => (
                    <div key={category} className="border border-border rounded-lg p-4">
                      <h5 className="font-medium text-foreground mb-3">{category}</h5>
                      <div className="space-y-2">
                        {permissions?.map(permission => (
                          <label key={permission?.id} className="flex items-center space-x-3 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={newRole?.permissions?.includes(permission?.id)}
                              onChange={() => handlePermissionToggle(permission?.id)}
                              className="rounded border-border"
                            />
                            <span className="text-sm text-foreground">{permission?.name}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex space-x-3">
                <Button onClick={() => console.log('Save role:', newRole)}>
                  {t?.save}
                </Button>
                <Button variant="outline" onClick={() => setShowCreateRole(false)}>
                  {t?.cancel}
                </Button>
              </div>
            </div>
          ) : selectedRole ? (
            <div className="border border-border rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{selectedRole?.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedRole?.description}</p>
                </div>
                {selectedRole?.type === 'custom' && (
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" iconName="Edit">
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" iconName="Trash" className="text-error hover:text-error">
                      {t?.delete}
                    </Button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-3">{t?.permissions}</h4>
                  <div className="space-y-2">
                    {selectedRole?.permissions?.includes('all') ? (
                      <span className="inline-block px-2 py-1 text-xs bg-primary/10 text-primary rounded">
                        All Permissions
                      </span>
                    ) : (
                      selectedRole?.permissions?.map(permission => (
                        <span key={permission} className="inline-block px-2 py-1 text-xs bg-muted text-muted-foreground rounded mr-2 mb-2">
                          {allPermissions?.find(p => p?.id === permission)?.name || permission}
                        </span>
                      ))
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-3">
                    {t?.assignedUsers} ({selectedRole?.users})
                  </h4>
                  <div className="space-y-2">
                    {/* Mock assigned users */}
                    {Array.from({ length: Math.min(selectedRole?.users || 0, 5) }, (_, i) => (
                      <div key={i} className="flex items-center space-x-2 p-2 bg-muted/50 rounded">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                          <Icon name="User" size={12} className="text-primary" />
                        </div>
                        <span className="text-sm text-foreground">User {i + 1}</span>
                      </div>
                    ))}
                    {selectedRole?.users > 5 && (
                      <p className="text-xs text-muted-foreground">
                        ... and {selectedRole?.users - 5} more users
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="border border-border rounded-lg p-6 flex items-center justify-center h-64">
              <div className="text-center">
                <Icon name="Shield" size={48} className="text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">{t?.roleManagement}</h3>
                <p className="text-muted-foreground">Select a role to view or edit its details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoleManagementPanel;