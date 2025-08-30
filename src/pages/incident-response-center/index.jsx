import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import NavigationSidebar from '../../components/ui/NavigationSidebar';
import UserProfileDropdown from '../../components/ui/UserProfileDropdown';
import NotificationCenter from '../../components/ui/NotificationCenter';
import LanguageSwitcher from '../../components/ui/LanguageSwitcher';
import IncidentTimeline from './components/IncidentTimeline';
import IncidentDetailsPanel from './components/IncidentDetailsPanel';
import EmergencyContactPanel from './components/EmergencyContactPanel';
import AIInsightsPanel from './components/AIInsightsPanel';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const IncidentResponseCenter = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [showEmergencyContacts, setShowEmergencyContacts] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isMobile, setIsMobile] = useState(false);

  // Mock incidents data
  const [incidents, setIncidents] = useState([
    {
      id: 'INC-2025-001',
      title: 'Suspicious Email Campaign Detected',
      description: `Multiple phishing emails detected targeting employee credentials. The campaign appears to be using sophisticated social engineering techniques with company-specific information. Initial analysis suggests this may be part of a larger coordinated attack.`,
      severity: 'critical',
      status: 'investigating',
      type: 'phishing',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      affectedSystems: ['mail-server-01', 'workstation-045', 'workstation-078'],
      assignedTo: 'Ahmed Benali',
      impactedUsers: 23,
      estimatedImpact: '15,000 MAD'
    },
    {
      id: 'INC-2025-002',
      title: 'Malware Detection on Critical Server',
      description: `Advanced persistent threat detected on production database server. The malware appears to be designed for data exfiltration and has been active for approximately 72 hours. Immediate containment measures have been initiated.`,
      severity: 'critical',
      status: 'critical',
      type: 'malware',
      timestamp: new Date(Date.now() - 45 * 60 * 1000),
      affectedSystems: ['db-server-prod-01', 'backup-server-02'],
      assignedTo: 'Fatima Zahra',
      impactedUsers: 156,
      estimatedImpact: '75,000 MAD'
    },
    {
      id: 'INC-2025-003',
      title: 'Unauthorized Access Attempt',
      description: `Multiple failed login attempts detected from suspicious IP addresses. The attempts appear to be using credential stuffing techniques with previously breached password lists. Geographic analysis shows attempts originating from multiple countries.`,
      severity: 'high',
      status: 'investigating',
      type: 'intrusion',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      affectedSystems: ['auth-server-01', 'vpn-gateway-01'],
      assignedTo: 'Youssef Alami',
      impactedUsers: 8,
      estimatedImpact: '5,000 MAD'
    },
    {
      id: 'INC-2025-004',
      title: 'DDoS Attack on Web Services',
      description: `Distributed denial of service attack targeting customer-facing web applications. Traffic analysis shows coordinated attack from botnet with approximately 10,000 unique IP addresses. CDN mitigation has been activated.`,
      severity: 'high',
      status: 'new',
      type: 'ddos',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
      affectedSystems: ['web-server-01', 'web-server-02', 'load-balancer-01'],
      assignedTo: null,
      impactedUsers: 1200,
      estimatedImpact: '25,000 MAD'
    },
    {
      id: 'INC-2025-005',
      title: 'Data Breach Investigation Complete',
      description: `Investigation into potential customer data exposure has been completed. Analysis confirms that no sensitive customer information was accessed. The incident was caused by misconfigured database permissions which have now been corrected.`,
      severity: 'medium',
      status: 'resolved',
      type: 'data_breach',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      affectedSystems: ['customer-db-01'],
      assignedTo: 'Khadija Mansouri',
      impactedUsers: 0,
      estimatedImpact: '0 MAD'
    }
  ]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 1024) {
        setSidebarCollapsed(true);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const handleLanguageChange = (newLanguage) => {
    setCurrentLanguage(newLanguage);
    localStorage.setItem('preferred-language', newLanguage);
  };

  const handleIncidentSelect = (incident) => {
    setSelectedIncident(incident);
  };

  const handleStatusUpdate = (incidentId, newStatus) => {
    setIncidents(prev => prev?.map(incident => 
      incident?.id === incidentId 
        ? { ...incident, status: newStatus }
        : incident
    ));
    
    if (selectedIncident?.id === incidentId) {
      setSelectedIncident(prev => ({ ...prev, status: newStatus }));
    }
  };

  const handleAssignIncident = (incidentId, assignee) => {
    setIncidents(prev => prev?.map(incident => 
      incident?.id === incidentId 
        ? { ...incident, assignedTo: assignee }
        : incident
    ));
    
    if (selectedIncident?.id === incidentId) {
      setSelectedIncident(prev => ({ ...prev, assignedTo: assignee }));
    }
  };

  const handleEscalate = (incidentId) => {
    setShowEmergencyContacts(true);
  };

  const getContent = () => {
    switch (currentLanguage) {
      case 'ar':
        return {
          title: 'مركز الاستجابة للحوادث',
          description: 'إدارة الحوادث الأمنية مع التحليل المدعوم بالذكاء الاصطناعي',
          emergencyButton: 'جهات الاتصال الطارئة'
        };
      case 'fr':
        return {
          title: 'Centre de Réponse aux Incidents',
          description: 'Gestion des incidents de sécurité avec analyse IA',
          emergencyButton: 'Contacts d\'Urgence'
        };
      default:
        return {
          title: 'Incident Response Center',
          description: 'Security incident management with AI-powered analysis',
          emergencyButton: 'Emergency Contacts'
        };
    }
  };

  const content = getContent();

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{content?.title} - SecNXT</title>
        <meta name="description" content={content?.description} />
      </Helmet>
      <NavigationSidebar 
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <div className={`transition-all duration-300 ${
        isMobile ? 'ml-0 pb-16' : sidebarCollapsed ? 'ml-16' : 'ml-60'
      }`}>
        {/* Header */}
        <header className="sticky top-0 z-100 bg-card/95 backdrop-blur-sm border-b border-border">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              {isMobile && (
                <button
                  onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                  className="p-2 rounded-lg hover:bg-muted/50 transition-colors duration-200"
                >
                  <Icon name="Menu" size={20} className="text-muted-foreground" />
                </button>
              )}
              
              <div>
                <h1 className="text-2xl font-bold text-foreground">{content?.title}</h1>
                <p className="text-sm text-muted-foreground">{content?.description}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button
                variant="destructive"
                size="sm"
                iconName="Phone"
                iconPosition="left"
                onClick={() => setShowEmergencyContacts(true)}
              >
                {!isMobile && content?.emergencyButton}
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
                onLogout={() => {}}
                onSwitchOrganization={() => {}}
              />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-12rem)]">
            {/* Timeline - Left Column */}
            <div className="lg:col-span-4">
              <IncidentTimeline
                incidents={incidents}
                onIncidentSelect={handleIncidentSelect}
                selectedIncidentId={selectedIncident?.id}
              />
            </div>

            {/* Details Panel - Right Column */}
            <div className="lg:col-span-8 space-y-6">
              <IncidentDetailsPanel
                incident={selectedIncident}
                onStatusUpdate={handleStatusUpdate}
                onAssignIncident={handleAssignIncident}
                onEscalate={handleEscalate}
              />
              
              {/* AI Insights Panel - Below Details on Desktop, Hidden on Mobile */}
              <div className="hidden lg:block">
                <AIInsightsPanel incidents={incidents} />
              </div>
            </div>
          </div>

          {/* Mobile AI Insights - Separate Section */}
          <div className="lg:hidden mt-6">
            <AIInsightsPanel incidents={incidents} />
          </div>
        </main>
      </div>
      {/* Emergency Contacts Modal */}
      <EmergencyContactPanel
        isVisible={showEmergencyContacts}
        onClose={() => setShowEmergencyContacts(false)}
      />
    </div>
  );
};

export default IncidentResponseCenter;