import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UserDirectoryPanel = ({ 
  searchQuery, 
  selectedFilter, 
  onUserSelect, 
  selectedUser, 
  currentLanguage 
}) => {
  const [expandedGroups, setExpandedGroups] = useState(new Set(['all-users']));
  const [users, setUsers] = useState([]);

  const content = {
    en: {
      userDirectory: 'User Directory',
      organizationalUnits: 'Organizational Units',
      groups: 'Groups',
      users: 'Users',
      allUsers: 'All Users',
      adminGroup: 'Administrators',
      managersGroup: 'Managers',
      employeesGroup: 'Employees',
      guestsGroup: 'Guests',
      searchPlaceholder: 'Search users...'
    },
    ar: {
      userDirectory: 'دليل المستخدمين',
      organizationalUnits: 'الوحدات التنظيمية',
      groups: 'المجموعات',
      users: 'المستخدمين',
      allUsers: 'جميع المستخدمين',
      adminGroup: 'المسؤولين',
      managersGroup: 'المديرين',
      employeesGroup: 'الموظفين',
      guestsGroup: 'الضيوف',
      searchPlaceholder: 'البحث عن المستخدمين...'
    },
    fr: {
      userDirectory: 'Annuaire Utilisateurs',
      organizationalUnits: 'Unités Organisationnelles',
      groups: 'Groupes',
      users: 'Utilisateurs',
      allUsers: 'Tous les Utilisateurs',
      adminGroup: 'Administrateurs',
      managersGroup: 'Gestionnaires',
      employeesGroup: 'Employés',
      guestsGroup: 'Invités',
      searchPlaceholder: 'Rechercher des utilisateurs...'
    }
  };

  const t = content?.[currentLanguage];

  // Mock user data
  useEffect(() => {
    const mockUsers = [
      {
        id: 1,
        name: 'Sarah Johnson',
        email: 'sarah.johnson@company.com',
        role: 'Administrator',
        department: 'IT Security',
        status: 'active',
        lastLogin: '2025-01-30T14:30:00Z',
        avatar: null,
        group: 'admin'
      },
      {
        id: 2,
        name: 'Mohammed Al-Rashid',
        email: 'mohammed.rashid@company.com',
        role: 'Security Manager',
        department: 'Operations',
        status: 'active',
        lastLogin: '2025-01-30T12:15:00Z',
        avatar: null,
        group: 'managers'
      },
      {
        id: 3,
        name: 'Emma Chen',
        email: 'emma.chen@company.com',
        role: 'Security Analyst',
        department: 'IT Security',
        status: 'active',
        lastLogin: '2025-01-30T09:45:00Z',
        avatar: null,
        group: 'employees'
      },
      {
        id: 4,
        name: 'David Martinez',
        email: 'david.martinez@company.com',
        role: 'Compliance Officer',
        department: 'Legal',
        status: 'inactive',
        lastLogin: '2025-01-28T16:20:00Z',
        avatar: null,
        group: 'employees'
      },
      {
        id: 5,
        name: 'Aisha Patel',
        email: 'aisha.patel@contractor.com',
        role: 'External Consultant',
        department: 'Consulting',
        status: 'pending',
        lastLogin: null,
        avatar: null,
        group: 'guests'
      }
    ];
    setUsers(mockUsers);
  }, []);

  const directoryStructure = [
    {
      id: 'all-users',
      type: 'group',
      name: t?.allUsers,
      icon: 'Users',
      count: users?.length,
      children: users
    },
    {
      id: 'admin',
      type: 'group',
      name: t?.adminGroup,
      icon: 'Shield',
      count: users?.filter(u => u?.group === 'admin')?.length,
      children: users?.filter(u => u?.group === 'admin')
    },
    {
      id: 'managers',
      type: 'group',
      name: t?.managersGroup,
      icon: 'Crown',
      count: users?.filter(u => u?.group === 'managers')?.length,
      children: users?.filter(u => u?.group === 'managers')
    },
    {
      id: 'employees',
      type: 'group',
      name: t?.employeesGroup,
      icon: 'User',
      count: users?.filter(u => u?.group === 'employees')?.length,
      children: users?.filter(u => u?.group === 'employees')
    },
    {
      id: 'guests',
      type: 'group',
      name: t?.guestsGroup,
      icon: 'UserPlus',
      count: users?.filter(u => u?.group === 'guests')?.length,
      children: users?.filter(u => u?.group === 'guests')
    }
  ];

  const toggleGroup = (groupId) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(groupId)) {
      newExpanded.delete(groupId);
    } else {
      newExpanded.add(groupId);
    }
    setExpandedGroups(newExpanded);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-success';
      case 'inactive': return 'text-muted-foreground';
      case 'pending': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'active': return 'bg-success/10 text-success';
      case 'inactive': return 'bg-muted text-muted-foreground';
      case 'pending': return 'bg-warning/10 text-warning';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const filteredUsers = users?.filter(user => {
    const matchesSearch = !searchQuery || 
      user?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      user?.email?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      user?.role?.toLowerCase()?.includes(searchQuery?.toLowerCase());

    const matchesFilter = selectedFilter === 'all' || user?.status === selectedFilter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="bg-card border border-border rounded-lg h-full">
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground mb-3">{t?.userDirectory}</h2>
        <div className="relative">
          <Icon name="Search" size={16} className="absolute left-3 top-3 text-muted-foreground" />
          <input
            type="text"
            placeholder={t?.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => onUserSelect && onUserSelect(null)}
            className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-md text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>
      </div>

      <div className="overflow-y-auto h-full">
        {directoryStructure?.map(group => (
          <div key={group?.id} className="border-b border-border last:border-b-0">
            <button
              onClick={() => toggleGroup(group?.id)}
              className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors duration-200"
            >
              <div className="flex items-center space-x-3">
                <Icon 
                  name={expandedGroups.has(group?.id) ? 'ChevronDown' : 'ChevronRight'} 
                  size={16} 
                  className="text-muted-foreground" 
                />
                <Icon name={group?.icon} size={16} className="text-foreground" />
                <span className="font-medium text-foreground">{group?.name}</span>
              </div>
              <span className="text-sm text-muted-foreground bg-muted rounded-full px-2 py-1">
                {group?.count}
              </span>
            </button>

            {expandedGroups.has(group?.id) && (
              <div className="space-y-1 pb-2">
                {group?.children?.filter(user => {
                  const matchesSearch = !searchQuery || 
                    user?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                    user?.email?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                    user?.role?.toLowerCase()?.includes(searchQuery?.toLowerCase());

                  const matchesFilter = selectedFilter === 'all' || user?.status === selectedFilter;

                  return matchesSearch && matchesFilter;
                })?.map(user => (
                  <button
                    key={user?.id}
                    onClick={() => onUserSelect?.(user)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 ml-8 mr-4 rounded-md transition-colors duration-200 ${
                      selectedUser?.id === user?.id 
                        ? 'bg-primary/10 text-primary border border-primary/20' 
                        : 'hover:bg-muted/50 text-foreground'
                    }`}
                  >
                    <div className="flex-shrink-0">
                      {user?.avatar ? (
                        <img 
                          src={user?.avatar} 
                          alt={user?.name} 
                          className="w-8 h-8 rounded-full"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                          <Icon name="User" size={16} className="text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium truncate">{user?.name}</p>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusBadgeColor(user?.status)}`}>
                          {user?.status}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                      <p className="text-xs text-muted-foreground">{user?.role}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDirectoryPanel;