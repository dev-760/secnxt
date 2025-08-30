import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AccessControlToolbar = ({ 
  searchQuery, 
  onSearchChange, 
  selectedFilter, 
  onFilterChange, 
  onRoleManagement, 
  userStats, 
  currentLanguage 
}) => {
  const content = {
    en: {
      totalUsers: 'Total Users',
      activeUsers: 'Active Users',
      inactiveUsers: 'Inactive Users',
      pendingUsers: 'Pending Users',
      createUser: 'Create User',
      bulkImport: 'Bulk Import',
      exportUsers: 'Export Users',
      roleManagement: 'Role Management',
      filterAll: 'All Users',
      filterActive: 'Active',
      filterInactive: 'Inactive',
      filterPending: 'Pending'
    },
    ar: {
      totalUsers: 'إجمالي المستخدمين',
      activeUsers: 'المستخدمون النشطون',
      inactiveUsers: 'المستخدمون غير النشطين',
      pendingUsers: 'المستخدمون المعلقون',
      createUser: 'إنشاء مستخدم',
      bulkImport: 'استيراد مجمع',
      exportUsers: 'تصدير المستخدمين',
      roleManagement: 'إدارة الأدوار',
      filterAll: 'جميع المستخدمين',
      filterActive: 'نشط',
      filterInactive: 'غير نشط',
      filterPending: 'معلق'
    },
    fr: {
      totalUsers: 'Total Utilisateurs',
      activeUsers: 'Utilisateurs Actifs',
      inactiveUsers: 'Utilisateurs Inactifs',
      pendingUsers: 'Utilisateurs en Attente',
      createUser: 'Créer Utilisateur',
      bulkImport: 'Importation en Masse',
      exportUsers: 'Exporter Utilisateurs',
      roleManagement: 'Gestion des Rôles',
      filterAll: 'Tous les Utilisateurs',
      filterActive: 'Actif',
      filterInactive: 'Inactif',
      filterPending: 'En Attente'
    }
  };

  const t = content?.[currentLanguage];

  const summaryCards = [
    {
      title: t?.totalUsers,
      value: userStats?.total,
      icon: "Users",
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      title: t?.activeUsers,
      value: userStats?.active,
      icon: "UserCheck",
      color: "text-success",
      bgColor: "bg-success/10"
    },
    {
      title: t?.inactiveUsers,
      value: userStats?.inactive,
      icon: "UserX",
      color: "text-muted-foreground",
      bgColor: "bg-muted"
    },
    {
      title: t?.pendingUsers,
      value: userStats?.pending,
      icon: "UserPlus",
      color: "text-warning",
      bgColor: "bg-warning/10"
    }
  ];

  const filterOptions = [
    { value: 'all', label: t?.filterAll },
    { value: 'active', label: t?.filterActive },
    { value: 'inactive', label: t?.filterInactive },
    { value: 'pending', label: t?.filterPending }
  ];

  return (
    <div className="bg-card border-b border-border">
      {/* Summary Cards */}
      <div className="p-6 pb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {summaryCards?.map((card, index) => (
            <div key={index} className="bg-background border border-border rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${card?.bgColor}`}>
                  <Icon name={card?.icon} size={20} className={card?.color} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{card?.value}</p>
                  <p className="text-xs text-muted-foreground">{card?.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Toolbar */}
      <div className="px-6 pb-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
            {/* Search */}
            <div className="relative">
              <Icon name="Search" size={16} className="absolute left-3 top-3 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => onSearchChange?.(e.target.value)}
                className="pl-10 pr-4 py-2 w-full sm:w-80 bg-background border border-border rounded-md text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>

            {/* Filters */}
            <select
              value={selectedFilter}
              onChange={(e) => onFilterChange?.(e.target.value)}
              className="px-3 py-2 bg-background border border-border rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            >
              {filterOptions?.map(option => (
                <option key={option?.value} value={option?.value}>
                  {option?.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="primary"
              size="sm"
              iconName="UserPlus"
            >
              {t?.createUser}
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              iconName="Upload"
            >
              {t?.bulkImport}
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              iconName="Download"
            >
              {t?.exportUsers}
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              iconName="Shield"
              onClick={onRoleManagement}
            >
              {t?.roleManagement}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessControlToolbar;