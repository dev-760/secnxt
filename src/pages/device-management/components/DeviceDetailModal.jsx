import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DeviceDetailModal = ({ device, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!isOpen || !device) return null;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Info' },
    { id: 'software', label: 'Software', icon: 'Package' },
    { id: 'security', label: 'Security', icon: 'Shield' },
    { id: 'activities', label: 'Activities', icon: 'Activity' }
  ];

  const mockSoftware = [
    { name: 'Microsoft Office 365', version: '16.0.14931', status: 'Updated', risk: 'Low' },
    { name: 'Google Chrome', version: '118.0.5993.88', status: 'Updated', risk: 'Low' },
    { name: 'Adobe Acrobat Reader', version: '23.006.20320', status: 'Outdated', risk: 'Medium' },
    { name: 'Java Runtime Environment', version: '8.0.381', status: 'Critical Update', risk: 'High' },
    { name: 'VLC Media Player', version: '3.0.18', status: 'Updated', risk: 'Low' }
  ];

  const mockActivities = [
    {
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      action: 'User Login',
      details: 'User sarah.johnson logged in successfully',
      type: 'info'
    },
    {
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      action: 'Security Scan',
      details: 'Automated security scan completed - No threats detected',
      type: 'success'
    },
    {
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      action: 'Software Update',
      details: 'Windows Security update KB5031356 installed',
      type: 'info'
    },
    {
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      action: 'Policy Applied',
      details: 'Password policy updated and enforced',
      type: 'warning'
    }
  ];

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'online':
        return 'text-success';
      case 'offline':
        return 'text-muted-foreground';
      case 'warning':
        return 'text-warning';
      case 'critical':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  const getRiskColor = (risk) => {
    switch (risk?.toLowerCase()) {
      case 'low':
        return 'text-success bg-success/10';
      case 'medium':
        return 'text-warning bg-warning/10';
      case 'high':
        return 'text-error bg-error/10';
      default:
        return 'text-muted-foreground bg-muted/10';
    }
  };

  const formatTimestamp = (timestamp) => {
    return timestamp?.toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="fixed inset-0 z-300 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
        
        <div className="relative w-full max-w-4xl bg-card border border-border rounded-lg shadow-lg">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
                <Icon name="Monitor" size={24} className="text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">{device?.name}</h2>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span>{device?.type} • {device?.ipAddress}</span>
                  <div className="flex items-center space-x-1">
                    <Icon name="MapPin" size={14} />
                    <span>{device?.location}</span>
                  </div>
                </div>
              </div>
            </div>
            <Button variant="ghost" size="sm" iconName="X" onClick={onClose} />
          </div>

          {/* Tabs */}
          <div className="border-b border-border">
            <nav className="flex space-x-8 px-6">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center space-x-2 py-4 border-b-2 transition-colors duration-200 ${
                    activeTab === tab?.id
                      ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon name={tab?.icon} size={16} />
                  <span className="font-medium">{tab?.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="p-6 max-h-96 overflow-y-auto">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-foreground">Device Information</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Status</span>
                        <div className="flex items-center space-x-2">
                          <Icon name="Circle" size={8} className={getStatusColor(device?.status)} />
                          <span className={`font-medium capitalize ${getStatusColor(device?.status)}`}>
                            {device?.status}
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Operating System</span>
                        <span className="font-medium text-foreground">{device?.type} 11 Pro</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Agent Version</span>
                        <span className="font-medium text-foreground">{device?.agentVersion}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Last Seen</span>
                        <span className="font-medium text-foreground">
                          {formatTimestamp(device?.lastSeen)}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-semibold text-foreground">Security Status</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Compliance</span>
                        <span className={`font-medium ${device?.compliance === 'Compliant' ? 'text-success' : 'text-error'}`}>
                          {device?.compliance}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Antivirus</span>
                        <span className="font-medium text-success">Active</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Firewall</span>
                        <span className="font-medium text-success">Enabled</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Encryption</span>
                        <span className="font-medium text-success">BitLocker Active</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'software' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-foreground">Installed Software</h3>
                  <Button variant="outline" size="sm" iconName="Download">
                    Export List
                  </Button>
                </div>
                <div className="space-y-2">
                  {mockSoftware?.map((software, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Icon name="Package" size={16} className="text-muted-foreground" />
                        <div>
                          <div className="font-medium text-foreground">{software?.name}</div>
                          <div className="text-sm text-muted-foreground">Version {software?.version}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(software?.risk)}`}>
                          {software?.risk} Risk
                        </span>
                        <span className={`text-sm font-medium ${
                          software?.status === 'Updated' ? 'text-success' :
                          software?.status === 'Outdated' ? 'text-warning' : 'text-error'
                        }`}>
                          {software?.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-foreground">Security Policies</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Icon name="Shield" size={16} className="text-success" />
                          <span className="text-foreground">Password Policy</span>
                        </div>
                        <span className="text-success font-medium">Applied</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Icon name="Lock" size={16} className="text-success" />
                          <span className="text-foreground">Screen Lock</span>
                        </div>
                        <span className="text-success font-medium">Applied</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Icon name="Download" size={16} className="text-warning" />
                          <span className="text-foreground">Software Restrictions</span>
                        </div>
                        <span className="text-warning font-medium">Pending</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-semibold text-foreground">Vulnerabilities</h3>
                    <div className="space-y-3">
                      <div className="p-3 bg-error/10 border border-error/20 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <Icon name="AlertTriangle" size={16} className="text-error" />
                          <span className="font-medium text-error">High Risk</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Java Runtime Environment requires critical security update
                        </p>
                      </div>
                      <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <Icon name="AlertCircle" size={16} className="text-warning" />
                          <span className="font-medium text-warning">Medium Risk</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Adobe Acrobat Reader version is outdated
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'activities' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-foreground">Recent Activities</h3>
                  <Button variant="outline" size="sm" iconName="Download">
                    Export Log
                  </Button>
                </div>
                <div className="space-y-3">
                  {mockActivities?.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
                      <Icon 
                        name={activity?.type === 'success' ? 'CheckCircle' : 
                              activity?.type === 'warning' ? 'AlertTriangle' : 'Info'} 
                        size={16} 
                        className={`mt-0.5 ${
                          activity?.type === 'success' ? 'text-success' :
                          activity?.type === 'warning' ? 'text-warning' : 'text-accent'
                        }`} 
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-foreground">{activity?.action}</span>
                          <span className="text-sm text-muted-foreground">
                            {formatTimestamp(activity?.timestamp)}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{activity?.details}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button variant="default" iconName="Settings">
              Manage Device
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceDetailModal;