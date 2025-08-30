import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationSidebar from '../../components/ui/NavigationSidebar';
import UserProfileDropdown from '../../components/ui/UserProfileDropdown';
import NotificationCenter from '../../components/ui/NotificationCenter';
import LanguageSwitcher from '../../components/ui/LanguageSwitcher';
import ComplianceStatusCards from './components/ComplianceStatusCards';
import AuditTrailTable from './components/AuditTrailTable';
import ReportGenerationPanel from './components/ReportGenerationPanel';
import ComplianceAssistantPanel from './components/ComplianceAssistantPanel';
import EvidenceCollectionPanel from './components/EvidenceCollectionPanel';
import ComplianceMonitoringPanel from './components/ComplianceMonitoringPanel';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ComplianceReporting = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [refreshing, setRefreshing] = useState(false);
  const [selectedFramework, setSelectedFramework] = useState('all');

  // Language content
  const content = {
    en: {
      title: 'Compliance & Reporting',
      subtitle: 'Automated compliance monitoring and audit trail generation',
      overview: 'Overview',
      auditTrail: 'Audit Trail',
      reports: 'Reports',
      evidence: 'Evidence',
      monitoring: 'Monitoring',
      generateReport: 'Generate Report',
      exportData: 'Export Data',
      scheduleAudit: 'Schedule Audit',
      lastUpdated: 'Last updated',
      refreshData: 'Refresh Data',
      complianceFramework: 'Compliance Framework'
    },
    ar: {
      title: 'الامتثال والتقارير',
      subtitle: 'مراقبة الامتثال الآلي وإنتاج سجل التدقيق',
      overview: 'نظرة عامة',
      auditTrail: 'سجل التدقيق',
      reports: 'التقارير',
      evidence: 'الأدلة',
      monitoring: 'المراقبة',
      generateReport: 'إنشاء تقرير',
      exportData: 'تصدير البيانات',
      scheduleAudit: 'جدولة تدقيق',
      lastUpdated: 'آخر تحديث',
      refreshData: 'تحديث البيانات',
      complianceFramework: 'إطار الامتثال'
    },
    fr: {
      title: 'Conformité et Rapports',
      subtitle: 'Surveillance de conformité automatisée et génération de piste d\'audit',
      overview: 'Aperçu',
      auditTrail: 'Piste d\'Audit',
      reports: 'Rapports',
      evidence: 'Preuves',
      monitoring: 'Surveillance',
      generateReport: 'Générer Rapport',
      exportData: 'Exporter Données',
      scheduleAudit: 'Planifier Audit',
      lastUpdated: 'Dernière mise à jour',
      refreshData: 'Actualiser Données',
      complianceFramework: 'Cadre de Conformité'
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

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate data refresh
    await new Promise(resolve => setTimeout(resolve, 2000));
    setRefreshing(false);
  };

  const tabs = [
    { id: 'overview', label: t?.overview, icon: 'BarChart3' },
    { id: 'audit-trail', label: t?.auditTrail, icon: 'FileText' },
    { id: 'reports', label: t?.reports, icon: 'FileBarChart' },
    { id: 'evidence', label: t?.evidence, icon: 'Archive' },
    { id: 'monitoring', label: t?.monitoring, icon: 'Eye' }
  ];

  const frameworks = [
    { value: 'all', label: 'All Frameworks' },
    { value: 'soc2', label: 'SOC 2' },
    { value: 'cndp', label: 'CNDP (Morocco)' },
    { value: 'iso27001', label: 'ISO 27001' },
    { value: 'gdpr', label: 'GDPR' }
  ];

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
                <span>{t?.lastUpdated}: {new Date().toLocaleTimeString()}</span>
              </div>
              
              <select
                value={selectedFramework}
                onChange={(e) => setSelectedFramework(e.target.value)}
                className="px-3 py-2 bg-background border border-border rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              >
                {frameworks?.map(framework => (
                  <option key={framework?.value} value={framework?.value}>
                    {framework?.label}
                  </option>
                ))}
              </select>
              
              <Button
                variant="outline"
                size="sm"
                iconName="RefreshCw"
                loading={refreshing}
                onClick={handleRefresh}
              >
                {t?.refreshData}
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

        {/* Tabs Navigation */}
        <div className="bg-card border-b border-border px-6">
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
        <main className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <ComplianceStatusCards
                selectedFramework={selectedFramework}
                currentLanguage={currentLanguage}
              />
              
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <ComplianceMonitoringPanel
                  selectedFramework={selectedFramework}
                  currentLanguage={currentLanguage}
                />
                <ComplianceAssistantPanel
                  currentLanguage={currentLanguage}
                />
              </div>
            </div>
          )}

          {activeTab === 'audit-trail' && (
            <AuditTrailTable
              selectedFramework={selectedFramework}
              currentLanguage={currentLanguage}
            />
          )}

          {activeTab === 'reports' && (
            <ReportGenerationPanel
              selectedFramework={selectedFramework}
              currentLanguage={currentLanguage}
            />
          )}

          {activeTab === 'evidence' && (
            <EvidenceCollectionPanel
              selectedFramework={selectedFramework}
              currentLanguage={currentLanguage}
            />
          )}

          {activeTab === 'monitoring' && (
            <ComplianceMonitoringPanel
              selectedFramework={selectedFramework}
              currentLanguage={currentLanguage}
              fullView={true}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default ComplianceReporting;