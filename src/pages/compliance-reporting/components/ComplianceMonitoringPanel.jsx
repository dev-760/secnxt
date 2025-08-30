import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ComplianceMonitoringPanel = ({ selectedFramework, currentLanguage, fullView = false }) => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d');

  const content = {
    en: {
      complianceMonitoring: 'Real-time Compliance Monitoring',
      realtimeAlerts: 'Real-time Alerts',
      violations: 'Policy Violations',
      riskLevel: 'Risk Level',
      controlStatus: 'Control Status',
      alertType: 'Alert Type',
      description: 'Description',
      timestamp: 'Timestamp',
      acknowledge: 'Acknowledge',
      viewDetails: 'View Details',
      resolve: 'Resolve',
      last7Days: 'Last 7 Days',
      last30Days: 'Last 30 Days',
      last90Days: 'Last 90 Days',
      high: 'High',
      medium: 'Medium',
      low: 'Low',
      active: 'Active',
      passed: 'Passed',
      failed: 'Failed',
      warning: 'Warning'
    },
    ar: {
      complianceMonitoring: 'مراقبة الامتثال في الوقت الفعلي',
      realtimeAlerts: 'التنبيهات في الوقت الفعلي',
      violations: 'انتهاكات السياسة',
      riskLevel: 'مستوى المخاطر',
      controlStatus: 'حالة التحكم',
      alertType: 'نوع التنبيه',
      description: 'الوصف',
      timestamp: 'الطابع الزمني',
      acknowledge: 'إقرار',
      viewDetails: 'عرض التفاصيل',
      resolve: 'حل',
      last7Days: 'آخر 7 أيام',
      last30Days: 'آخر 30 يوم',
      last90Days: 'آخر 90 يوم',
      high: 'عالي',
      medium: 'متوسط',
      low: 'منخفض',
      active: 'نشط',
      passed: 'نجح',
      failed: 'فشل',
      warning: 'تحذير'
    },
    fr: {
      complianceMonitoring: 'Surveillance de Conformité en Temps Réel',
      realtimeAlerts: 'Alertes en Temps Réel',
      violations: 'Violations de Politique',
      riskLevel: 'Niveau de Risque',
      controlStatus: 'Statut de Contrôle',
      alertType: 'Type d\'Alerte',
      description: 'Description',
      timestamp: 'Horodatage',
      acknowledge: 'Reconnaître',
      viewDetails: 'Voir Détails',
      resolve: 'Résoudre',
      last7Days: '7 Derniers Jours',
      last30Days: '30 Derniers Jours',
      last90Days: '90 Derniers Jours',
      high: 'Élevé',
      medium: 'Moyen',
      low: 'Bas',
      active: 'Actif',
      passed: 'Réussi',
      failed: 'Échoué',
      warning: 'Avertissement'
    }
  };

  const t = content?.[currentLanguage];

  const complianceAlerts = [
    {
      id: 1,
      type: 'policy_violation',
      riskLevel: 'high',
      title: 'Unauthorized Administrative Access',
      description: 'User attempted to access administrative functions without proper role assignment',
      timestamp: '2025-01-30T14:30:00Z',
      framework: 'soc2',
      controlId: 'CC6.1',
      status: 'active',
      affectedResource: 'Admin Panel'
    },
    {
      id: 2,
      type: 'control_failure',
      riskLevel: 'medium',
      title: 'MFA Bypass Detected',
      description: 'Multi-factor authentication was bypassed for sensitive system access',
      timestamp: '2025-01-30T13:45:00Z',
      framework: 'soc2',
      controlId: 'CC6.2',
      status: 'active',
      affectedResource: 'Authentication System'
    },
    {
      id: 3,
      type: 'data_access',
      riskLevel: 'medium',
      title: 'Excessive Data Export',
      description: 'Large volume of customer data exported outside normal business hours',
      timestamp: '2025-01-30T02:15:00Z',
      framework: 'cndp',
      controlId: 'CNDP-4.2',
      status: 'active',
      affectedResource: 'Customer Database'
    },
    {
      id: 4,
      type: 'compliance_gap',
      riskLevel: 'low',
      title: 'Password Policy Non-compliance',
      description: 'Password complexity requirements not enforced for 3 user accounts',
      timestamp: '2025-01-29T16:20:00Z',
      framework: 'iso27001',
      controlId: 'A.9.4.3',
      status: 'acknowledged',
      affectedResource: 'User Management'
    },
    {
      id: 5,
      type: 'audit_anomaly',
      riskLevel: 'high',
      title: 'Missing Audit Logs',
      description: 'Critical system audit logs are missing for 4-hour period',
      timestamp: '2025-01-29T12:10:00Z',
      framework: 'soc2',
      controlId: 'CC7.2',
      status: 'resolved',
      affectedResource: 'Audit System'
    }
  ];

  const complianceMetrics = [
    {
      framework: 'SOC 2',
      totalControls: 64,
      passedControls: 58,
      failedControls: 4,
      warningControls: 2,
      complianceScore: 91
    },
    {
      framework: 'CNDP',
      totalControls: 32,
      passedControls: 25,
      failedControls: 5,
      warningControls: 2,
      complianceScore: 78
    },
    {
      framework: 'ISO 27001',
      totalControls: 114,
      passedControls: 102,
      failedControls: 8,
      warningControls: 4,
      complianceScore: 89
    }
  ];

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'high': return 'text-error bg-error/10 border-error/20';
      case 'medium': return 'text-warning bg-warning/10 border-warning/20';
      case 'low': return 'text-success bg-success/10 border-success/20';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-error bg-error/10';
      case 'acknowledged': return 'text-warning bg-warning/10';
      case 'resolved': return 'text-success bg-success/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'policy_violation': return 'AlertTriangle';
      case 'control_failure': return 'XCircle';
      case 'data_access': return 'Database';
      case 'compliance_gap': return 'AlertCircle';
      case 'audit_anomaly': return 'FileSearch';
      default: return 'Bell';
    }
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const filteredAlerts = complianceAlerts?.filter(alert => {
    if (selectedFramework !== 'all' && alert?.framework !== selectedFramework) return false;
    return true;
  });

  const filteredMetrics = selectedFramework === 'all' 
    ? complianceMetrics 
    : complianceMetrics?.filter(metric => 
        metric?.framework?.toLowerCase()?.includes(selectedFramework?.toLowerCase()) ||
        (selectedFramework === 'soc2' && metric?.framework === 'SOC 2') ||
        (selectedFramework === 'cndp' && metric?.framework === 'CNDP')
      );

  return (
    <div className="space-y-6">
      {/* Control Status Summary */}
      {fullView && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredMetrics?.map(metric => (
            <div key={metric?.framework} className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground">{metric?.framework}</h3>
                <span className="text-2xl font-bold text-primary">{metric?.complianceScore}%</span>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Controls:</span>
                  <span className="font-medium text-foreground">{metric?.totalControls}</span>
                </div>
                
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div className="text-center p-2 bg-success/10 text-success rounded">
                    <div className="font-medium">{metric?.passedControls}</div>
                    <div className="text-xs">{t?.passed}</div>
                  </div>
                  <div className="text-center p-2 bg-error/10 text-error rounded">
                    <div className="font-medium">{metric?.failedControls}</div>
                    <div className="text-xs">{t?.failed}</div>
                  </div>
                  <div className="text-center p-2 bg-warning/10 text-warning rounded">
                    <div className="font-medium">{metric?.warningControls}</div>
                    <div className="text-xs">{t?.warning}</div>
                  </div>
                </div>
                
                <div className="w-full bg-muted rounded-full h-2 mt-3">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${metric?.complianceScore}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Real-time Alerts */}
      <div className="bg-card border border-border rounded-lg">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">{t?.realtimeAlerts}</h3>
            <div className="flex space-x-2">
              <select
                value={selectedTimeRange}
                onChange={(e) => setSelectedTimeRange(e.target.value)}
                className="px-3 py-1 bg-background border border-border rounded-md text-sm text-foreground focus:outline-none"
              >
                <option value="7d">{t?.last7Days}</option>
                <option value="30d">{t?.last30Days}</option>
                <option value="90d">{t?.last90Days}</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="divide-y divide-border max-h-96 overflow-y-auto">
          {filteredAlerts?.map(alert => (
            <div key={alert?.id} className="p-4 hover:bg-muted/25 transition-colors duration-200">
              <div className="flex items-start space-x-4">
                <div className={`p-2 rounded-lg ${getRiskColor(alert?.riskLevel)}`}>
                  <Icon name={getAlertIcon(alert?.type)} size={16} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-foreground truncate">{alert?.title}</h4>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-0.5 text-xs rounded-full ${getRiskColor(alert?.riskLevel)}`}>
                        {alert?.riskLevel}
                      </span>
                      <span className={`px-2 py-0.5 text-xs rounded-full ${getStatusColor(alert?.status)}`}>
                        {alert?.status}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-2">{alert?.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-4 text-xs text-muted-foreground">
                      <span className="flex items-center space-x-1">
                        <Icon name="Tag" size={12} />
                        <span>{alert?.controlId}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Icon name="Server" size={12} />
                        <span>{alert?.affectedResource}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Icon name="Clock" size={12} />
                        <span>{formatDateTime(alert?.timestamp)}</span>
                      </span>
                    </div>
                    
                    <div className="flex space-x-2">
                      {alert?.status === 'active' && (
                        <>
                          <Button variant="ghost" size="sm">
                            {t?.acknowledge}
                          </Button>
                          <Button size="sm">
                            {t?.resolve}
                          </Button>
                        </>
                      )}
                      <Button variant="ghost" size="sm" iconName="ExternalLink">
                        {t?.viewDetails}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {filteredAlerts?.length === 0 && (
            <div className="p-8 text-center">
              <Icon name="CheckCircle" size={48} className="text-success mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No Active Alerts</h3>
              <p className="text-muted-foreground">All compliance controls are operating normally</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComplianceMonitoringPanel;