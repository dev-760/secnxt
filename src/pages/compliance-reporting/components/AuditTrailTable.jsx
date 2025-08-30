import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AuditTrailTable = ({ selectedFramework, currentLanguage }) => {
  const [sortField, setSortField] = useState('timestamp');
  const [sortDirection, setSortDirection] = useState('desc');
  const [selectedFilters, setSelectedFilters] = useState({
    dateRange: '7d',
    actionType: 'all',
    user: 'all',
    riskLevel: 'all'
  });

  const content = {
    en: {
      auditTrail: 'Audit Trail',
      timestamp: 'Timestamp',
      user: 'User',
      action: 'Action',
      resource: 'Resource',
      ipAddress: 'IP Address',
      riskLevel: 'Risk Level',
      details: 'Details',
      export: 'Export',
      filter: 'Filter',
      search: 'Search audit logs...',
      last7Days: 'Last 7 Days',
      last30Days: 'Last 30 Days',
      last90Days: 'Last 90 Days',
      allActions: 'All Actions',
      loginActions: 'Login Actions',
      systemChanges: 'System Changes',
      dataAccess: 'Data Access',
      allUsers: 'All Users',
      allRiskLevels: 'All Risk Levels',
      high: 'High',
      medium: 'Medium',
      low: 'Low',
      viewDetails: 'View Details'
    },
    ar: {
      auditTrail: 'سجل التدقيق',
      timestamp: 'الطابع الزمني',
      user: 'المستخدم',
      action: 'الإجراء',
      resource: 'المورد',
      ipAddress: 'عنوان IP',
      riskLevel: 'مستوى المخاطر',
      details: 'التفاصيل',
      export: 'تصدير',
      filter: 'فلتر',
      search: 'البحث في سجلات التدقيق...',
      last7Days: 'آخر 7 أيام',
      last30Days: 'آخر 30 يوم',
      last90Days: 'آخر 90 يوم',
      allActions: 'جميع الإجراءات',
      loginActions: 'إجراءات تسجيل الدخول',
      systemChanges: 'تغييرات النظام',
      dataAccess: 'الوصول إلى البيانات',
      allUsers: 'جميع المستخدمين',
      allRiskLevels: 'جميع مستويات المخاطر',
      high: 'عالي',
      medium: 'متوسط',
      low: 'منخفض',
      viewDetails: 'عرض التفاصيل'
    },
    fr: {
      auditTrail: 'Piste d\'Audit',
      timestamp: 'Horodatage',
      user: 'Utilisateur',
      action: 'Action',
      resource: 'Ressource',
      ipAddress: 'Adresse IP',
      riskLevel: 'Niveau de Risque',
      details: 'Détails',
      export: 'Exporter',
      filter: 'Filtrer',
      search: 'Rechercher les journaux d\'audit...',
      last7Days: '7 Derniers Jours',
      last30Days: '30 Derniers Jours',
      last90Days: '90 Derniers Jours',
      allActions: 'Toutes les Actions',
      loginActions: 'Actions de Connexion',
      systemChanges: 'Changements Système',
      dataAccess: 'Accès aux Données',
      allUsers: 'Tous les Utilisateurs',
      allRiskLevels: 'Tous Niveaux de Risque',
      high: 'Élevé',
      medium: 'Moyen',
      low: 'Bas',
      viewDetails: 'Voir Détails'
    }
  };

  const t = content?.[currentLanguage];

  // Mock audit trail data
  const auditLogs = [
    {
      id: 1,
      timestamp: '2025-01-30T14:30:00Z',
      user: 'sarah.johnson@company.com',
      action: 'User login successful',
      resource: 'Authentication System',
      ipAddress: '192.168.1.100',
      riskLevel: 'low',
      framework: 'soc2',
      details: 'Successful authentication via Multi-Factor Authentication',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    },
    {
      id: 2,
      timestamp: '2025-01-30T14:25:00Z',
      user: 'system@company.com',
      action: 'Security policy updated',
      resource: 'Policy Management',
      ipAddress: '10.0.0.1',
      riskLevel: 'medium',
      framework: 'cndp',
      details: 'Password complexity requirements updated',
      userAgent: 'Internal System'
    },
    {
      id: 3,
      timestamp: '2025-01-30T14:20:00Z',
      user: 'mohammed.rashid@company.com',
      action: 'Compliance report generated',
      resource: 'Reporting System',
      ipAddress: '192.168.1.105',
      riskLevel: 'low',
      framework: 'soc2',
      details: 'SOC 2 Type II compliance report generated for Q4 2024',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
    },
    {
      id: 4,
      timestamp: '2025-01-30T14:15:00Z',
      user: 'unknown@external.com',
      action: 'Failed login attempt',
      resource: 'Authentication System',
      ipAddress: '203.0.113.1',
      riskLevel: 'high',
      framework: 'all',
      details: 'Multiple failed login attempts detected from suspicious IP',
      userAgent: 'Unknown'
    },
    {
      id: 5,
      timestamp: '2025-01-30T14:10:00Z',
      user: 'emma.chen@company.com',
      action: 'Vulnerability scan initiated',
      resource: 'Security Scanner',
      ipAddress: '192.168.1.120',
      riskLevel: 'low',
      framework: 'iso27001',
      details: 'Scheduled vulnerability assessment started',
      userAgent: 'Mozilla/5.0 (Linux; X11) AppleWebKit/537.36'
    },
    {
      id: 6,
      timestamp: '2025-01-30T14:05:00Z',
      user: 'david.martinez@company.com',
      action: 'Data access granted',
      resource: 'Customer Database',
      ipAddress: '192.168.1.115',
      riskLevel: 'medium',
      framework: 'cndp',
      details: 'Access granted to customer PII for compliance review',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
  ];

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'high': return 'text-error bg-error/10';
      case 'medium': return 'text-warning bg-warning/10';
      case 'low': return 'text-success bg-success/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getActionIcon = (action) => {
    if (action?.includes('login')) return 'LogIn';
    if (action?.includes('policy') || action?.includes('system')) return 'Settings';
    if (action?.includes('report')) return 'FileBarChart';
    if (action?.includes('scan')) return 'Search';
    if (action?.includes('access')) return 'Key';
    return 'Activity';
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  // Filter and sort the audit logs
  const filteredLogs = auditLogs?.filter(log => {
    if (selectedFramework !== 'all' && log?.framework !== 'all' && log?.framework !== selectedFramework) {
      return false;
    }
    return true;
  });

  const sortedLogs = [...filteredLogs]?.sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          <div className="lg:col-span-2">
            <div className="relative">
              <Icon name="Search" size={16} className="absolute left-3 top-3 text-muted-foreground" />
              <input
                type="text"
                placeholder={t?.search}
                className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-md text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
          </div>
          
          <select
            value={selectedFilters?.dateRange}
            onChange={(e) => handleFilterChange('dateRange', e.target.value)}
            className="px-3 py-2 bg-background border border-border rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          >
            <option value="7d">{t?.last7Days}</option>
            <option value="30d">{t?.last30Days}</option>
            <option value="90d">{t?.last90Days}</option>
          </select>
          
          <select
            value={selectedFilters?.actionType}
            onChange={(e) => handleFilterChange('actionType', e.target.value)}
            className="px-3 py-2 bg-background border border-border rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          >
            <option value="all">{t?.allActions}</option>
            <option value="login">{t?.loginActions}</option>
            <option value="system">{t?.systemChanges}</option>
            <option value="data">{t?.dataAccess}</option>
          </select>
          
          <select
            value={selectedFilters?.riskLevel}
            onChange={(e) => handleFilterChange('riskLevel', e.target.value)}
            className="px-3 py-2 bg-background border border-border rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          >
            <option value="all">{t?.allRiskLevels}</option>
            <option value="high">{t?.high}</option>
            <option value="medium">{t?.medium}</option>
            <option value="low">{t?.low}</option>
          </select>
        </div>
      </div>

      {/* Audit Trail Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">{t?.auditTrail}</h3>
          <Button variant="outline" size="sm" iconName="Download">
            {t?.export}
          </Button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th 
                  className="px-4 py-3 text-left text-sm font-medium text-foreground cursor-pointer hover:bg-muted/70"
                  onClick={() => handleSort('timestamp')}
                >
                  <div className="flex items-center space-x-2">
                    <span>{t?.timestamp}</span>
                    {sortField === 'timestamp' && (
                      <Icon 
                        name={sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown'} 
                        size={16} 
                      />
                    )}
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-left text-sm font-medium text-foreground cursor-pointer hover:bg-muted/70"
                  onClick={() => handleSort('user')}
                >
                  <div className="flex items-center space-x-2">
                    <span>{t?.user}</span>
                    {sortField === 'user' && (
                      <Icon 
                        name={sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown'} 
                        size={16} 
                      />
                    )}
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-foreground">
                  {t?.action}
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-foreground">
                  {t?.resource}
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-foreground">
                  {t?.ipAddress}
                </th>
                <th 
                  className="px-4 py-3 text-left text-sm font-medium text-foreground cursor-pointer hover:bg-muted/70"
                  onClick={() => handleSort('riskLevel')}
                >
                  <div className="flex items-center space-x-2">
                    <span>{t?.riskLevel}</span>
                    {sortField === 'riskLevel' && (
                      <Icon 
                        name={sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown'} 
                        size={16} 
                      />
                    )}
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-foreground">
                  {t?.details}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {sortedLogs?.map(log => (
                <tr key={log?.id} className="hover:bg-muted/25 transition-colors duration-200">
                  <td className="px-4 py-3 text-sm text-foreground">
                    {formatDateTime(log?.timestamp)}
                  </td>
                  <td className="px-4 py-3 text-sm text-foreground">
                    {log?.user}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-2">
                      <Icon name={getActionIcon(log?.action)} size={16} className="text-muted-foreground" />
                      <span className="text-sm text-foreground">{log?.action}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-foreground">
                    {log?.resource}
                  </td>
                  <td className="px-4 py-3 text-sm text-foreground font-mono">
                    {log?.ipAddress}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 text-xs rounded-full ${getRiskColor(log?.riskLevel)}`}>
                      {log?.riskLevel}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground truncate max-w-xs">
                        {log?.details}
                      </span>
                      <Button variant="ghost" size="sm" iconName="ExternalLink">
                        {t?.viewDetails}
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-4 py-3 border-t border-border flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            Showing {sortedLogs?.length} of {auditLogs?.length} entries
          </span>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditTrailTable;