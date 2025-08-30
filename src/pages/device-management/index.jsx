import React, { useState, useEffect } from 'react';
import NavigationSidebar from '../../components/ui/NavigationSidebar';
import UserProfileDropdown from '../../components/ui/UserProfileDropdown';
import NotificationCenter from '../../components/ui/NotificationCenter';
import LanguageSwitcher from '../../components/ui/LanguageSwitcher';
import DeviceSummaryCards from './components/DeviceSummaryCards';
import DeviceFilters from './components/DeviceFilters';
import DeviceTable from './components/DeviceTable';
import DeviceDetailModal from './components/DeviceDetailModal';
import AgentDownloadSection from './components/AgentDownloadSection';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const DeviceManagement = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [selectedDevices, setSelectedDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [showDeviceModal, setShowDeviceModal] = useState(false);
  const [showAgentDownload, setShowAgentDownload] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    type: 'all',
    status: 'all',
    compliance: 'all',
    location: 'all'
  });

  // Load language preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  // Mock device data
  const mockDevices = [
    {
      id: 1,
      name: 'DESKTOP-SARAH-01',
      type: 'Windows',
      ipAddress: '192.168.1.101',
      location: 'Casablanca Office',
      lastSeen: new Date(Date.now() - 5 * 60 * 1000),
      agentVersion: '2.1.4',
      status: 'online',
      compliance: 'Compliant'
    },
    {
      id: 2,
      name: 'LAPTOP-AHMED-02',
      type: 'Windows',
      ipAddress: '192.168.1.102',
      location: 'Remote Worker',
      lastSeen: new Date(Date.now() - 15 * 60 * 1000),
      agentVersion: '2.1.3',
      status: 'warning',
      compliance: 'Non-Compliant'
    },
    {
      id: 3,
      name: 'SERVER-DB-01',
      type: 'Linux',
      ipAddress: '192.168.1.10',
      location: 'Casablanca Office',
      lastSeen: new Date(Date.now() - 2 * 60 * 1000),
      agentVersion: '2.1.4',
      status: 'online',
      compliance: 'Compliant'
    },
    {
      id: 4,
      name: 'MACBOOK-YOUSSEF',
      type: 'Mac',
      ipAddress: '192.168.1.103',
      location: 'Rabat Branch',
      lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000),
      agentVersion: '2.1.4',
      status: 'offline',
      compliance: 'Compliant'
    },
    {
      id: 5,
      name: 'WORKSTATION-05',
      type: 'Windows',
      ipAddress: '192.168.1.105',
      location: 'Marrakech Site',
      lastSeen: new Date(Date.now() - 30 * 60 * 1000),
      agentVersion: '2.0.8',
      status: 'critical',
      compliance: 'Non-Compliant'
    },
    {
      id: 6,
      name: 'LAPTOP-FATIMA-06',
      type: 'Windows',
      ipAddress: '192.168.1.106',
      location: 'Remote Worker',
      lastSeen: new Date(Date.now() - 10 * 60 * 1000),
      agentVersion: '2.1.4',
      status: 'online',
      compliance: 'Compliant'
    }
  ];

  // Mock device statistics
  const deviceStats = {
    total: mockDevices?.length,
    limit: 25, // Starter plan limit
    online: mockDevices?.filter(d => d?.status === 'online')?.length,
    compliant: mockDevices?.filter(d => d?.compliance === 'Compliant')?.length,
    pendingUpdates: mockDevices?.filter(d => d?.agentVersion !== '2.1.4')?.length
  };

  const subscriptionTier = "Starter";

  // Filter devices based on search and filters
  const filteredDevices = mockDevices?.filter(device => {
    const matchesSearch = device?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         device?.ipAddress?.includes(searchQuery) ||
                         device?.location?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    
    const matchesType = filters?.type === 'all' || device?.type?.toLowerCase() === filters?.type;
    const matchesStatus = filters?.status === 'all' || device?.status === filters?.status;
    const matchesCompliance = filters?.compliance === 'all' || 
                             (filters?.compliance === 'compliant' && device?.compliance === 'Compliant') ||
                             (filters?.compliance === 'non-compliant' && device?.compliance === 'Non-Compliant');
    const matchesLocation = filters?.location === 'all' || 
                           device?.location?.toLowerCase()?.includes(filters?.location);

    return matchesSearch && matchesType && matchesStatus && matchesCompliance && matchesLocation;
  });

  const handleLanguageChange = (language) => {
    setCurrentLanguage(language);
  };

  const handleDeviceClick = (device) => {
    setSelectedDevice(device);
    setShowDeviceModal(true);
  };

  const handleBulkAction = (action) => {
    console.log(`Performing ${action} on devices:`, selectedDevices);
    // Implement bulk actions here
  };

  const handleLogout = () => {
    console.log('User logged out');
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationSidebar 
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-60'}`}>
        {/* Header */}
        <header className="bg-card border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Device Management</h1>
              <p className="text-muted-foreground">
                Monitor and manage all registered devices in your organization
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                iconName="Download"
                onClick={() => setShowAgentDownload(!showAgentDownload)}
              >
                Agent Downloads
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
                onLogout={handleLogout}
                onSwitchOrganization={() => {}}
              />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6 pb-20 md:pb-6">
          {/* Device Summary Cards */}
          <DeviceSummaryCards 
            deviceStats={deviceStats}
            subscriptionTier={subscriptionTier}
          />

          {/* Agent Download Section */}
          {showAgentDownload && (
            <div className="mb-8">
              <AgentDownloadSection />
            </div>
          )}

          {/* Device Filters */}
          <DeviceFilters
            onFilterChange={setFilters}
            onSearchChange={setSearchQuery}
            filters={filters}
          />

          {/* Device Table */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h2 className="text-lg font-semibold text-foreground">
                  Devices ({filteredDevices?.length})
                </h2>
                {selectedDevices?.length > 0 && (
                  <span className="text-sm text-muted-foreground">
                    {selectedDevices?.length} selected
                  </span>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="RefreshCw"
                  onClick={() => window.location?.reload()}
                >
                  Refresh
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Download"
                  onClick={() => {}}
                >
                  Export
                </Button>
              </div>
            </div>

            <DeviceTable
              devices={filteredDevices}
              onDeviceSelect={setSelectedDevices}
              onBulkAction={handleBulkAction}
              selectedDevices={selectedDevices}
              onDeviceClick={handleDeviceClick}
            />
          </div>

          {/* Subscription Limit Warning */}
          {deviceStats?.total >= deviceStats?.limit * 0.8 && deviceStats?.limit !== 999999 && (
            <div className="mt-6 p-4 bg-warning/10 border border-warning/20 rounded-lg">
              <div className="flex items-start space-x-3">
                <Icon name="AlertTriangle" size={20} className="text-warning mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-medium text-warning mb-1">Device Limit Warning</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    You're using {deviceStats?.total} of {deviceStats?.limit} devices in your {subscriptionTier} plan. 
                    Consider upgrading to add more devices.
                  </p>
                  <Button variant="outline" size="sm">
                    Upgrade Plan
                  </Button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
      {/* Device Detail Modal */}
      <DeviceDetailModal
        device={selectedDevice}
        isOpen={showDeviceModal}
        onClose={() => {
          setShowDeviceModal(false);
          setSelectedDevice(null);
        }}
      />
    </div>
  );
};

export default DeviceManagement;