import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationSidebar from '../../components/ui/NavigationSidebar';
import UserProfileDropdown from '../../components/ui/UserProfileDropdown';
import NotificationCenter from '../../components/ui/NotificationCenter';
import LanguageSwitcher from '../../components/ui/LanguageSwitcher';
import SecurityMetricsCard from './components/SecurityMetricsCard';
import ThreatDetectionTimeline from './components/ThreatDetectionTimeline';
import AIInsightsPanel from './components/AIInsightsPanel';
import ThreatMapVisualization from './components/ThreatMapVisualization';
import VulnerabilityOverview from './components/VulnerabilityOverview';
import QuickActionPanel from './components/QuickActionPanel';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const SecurityDashboard = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isMobile, setIsMobile] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Language content
  const content = {
    en: {
      title: 'Security Dashboard',
      subtitle: 'Real-time cybersecurity monitoring and AI-powered insights',
      securityHealth: 'Security Health Score',
      activeThreats: 'Active Threats',
      devicesMonitored: 'Devices Monitored',
      incidentsResolved: 'Incidents Resolved Today',
      lastUpdated: 'Last updated',
      refreshData: 'Refresh Data'
    },
    ar: {
      title: 'لوحة الأمان',
      subtitle: 'مراقبة الأمن السيبراني في الوقت الفعلي والرؤى المدعومة بالذكاء الاصطناعي',
      securityHealth: 'نقاط صحة الأمان',
      activeThreats: 'التهديدات النشطة',
      devicesMonitored: 'الأجهزة المراقبة',
      incidentsResolved: 'الحوادث المحلولة اليوم',
      lastUpdated: 'آخر تحديث',
      refreshData: 'تحديث البيانات'
    },
    fr: {
      title: 'Tableau de Bord Sécurité',
      subtitle: 'Surveillance de cybersécurité en temps réel et insights IA',
      securityHealth: 'Score de Santé Sécurité',
      activeThreats: 'Menaces Actives',
      devicesMonitored: 'Appareils Surveillés',
      incidentsResolved: 'Incidents Résolus Aujourd\'hui',
      lastUpdated: 'Dernière mise à jour',
      refreshData: 'Actualiser les Données'
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

  const handleMetricClick = (metric) => {
    switch (metric) {
      case 'threats': navigate('/incident-response-center');
        break;
      case 'devices': navigate('/device-management');
        break;
      case 'vulnerabilities': navigate('/vulnerability-management');
        break;
      default:
        break;
    }
  };

  const handleActionClick = (action) => {
    console.log('Quick action clicked:', action);
    // Handle different actions
    switch (action?.id) {
      case 'incident-response': navigate('/incident-response-center');
        break;
      case 'vulnerability-scan': navigate('/vulnerability-management');
        break;
      default:
        break;
    }
  };

  // Mock data for metrics
  const securityMetrics = [
    {
      title: t?.securityHealth,
      value: '87%',
      subtitle: 'Good security posture',
      trend: 5,
      severity: 'good',
      icon: 'Shield'
    },
    {
      title: t?.activeThreats,
      value: '3',
      subtitle: '2 critical, 1 medium',
      trend: -12,
      severity: 'critical',
      icon: 'AlertTriangle'
    },
    {
      title: t?.devicesMonitored,
      value: '47',
      subtitle: '45 secure, 2 at risk',
      trend: 0,
      severity: 'good',
      icon: 'Monitor'
    },
    {
      title: t?.incidentsResolved,
      value: '12',
      subtitle: 'Average response: 2.3 min',
      trend: 8,
      severity: 'good',
      icon: 'CheckCircle'
    }
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
                <span>{t?.lastUpdated}: {new Date()?.toLocaleTimeString()}</span>
              </div>
              
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

        {/* Dashboard Content */}
        <main className="p-6 space-y-6">
          {/* Security Metrics Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {securityMetrics?.map((metric, index) => (
              <SecurityMetricsCard
                key={index}
                title={metric?.title}
                value={metric?.value}
                subtitle={metric?.subtitle}
                trend={metric?.trend}
                severity={metric?.severity}
                icon={metric?.icon}
                onClick={() => handleMetricClick(metric?.title?.toLowerCase()?.includes('threat') ? 'threats' : 
                                                metric?.title?.toLowerCase()?.includes('device') ? 'devices' : 
                                                'vulnerabilities')}
              />
            ))}
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Left Column - Threat Timeline & Map */}
            <div className="xl:col-span-2 space-y-6">
              <ThreatDetectionTimeline />
              <ThreatMapVisualization />
            </div>

            {/* Right Column - AI Insights */}
            <div className="space-y-6">
              <AIInsightsPanel />
            </div>
          </div>

          {/* Bottom Row - Vulnerability Overview & Quick Actions */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <VulnerabilityOverview />
            <QuickActionPanel onActionClick={handleActionClick} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default SecurityDashboard;