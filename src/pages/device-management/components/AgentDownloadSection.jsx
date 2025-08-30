import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AgentDownloadSection = () => {
  const [selectedOS, setSelectedOS] = useState('windows');

  const agentDownloads = [
    {
      id: 'windows',
      name: 'Windows Agent',
      icon: 'Monitor',
      version: '2.1.4',
      size: '45.2 MB',
      requirements: 'Windows 10/11, .NET Framework 4.8+',
      downloadUrl: '#',
      qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=https://secnxt.com/download/windows-agent'
    },
    {
      id: 'linux',
      name: 'Linux Agent',
      icon: 'Server',
      version: '2.1.4',
      size: '38.7 MB',
      requirements: 'Ubuntu 18.04+, CentOS 7+, RHEL 7+',
      downloadUrl: '#',
      qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=https://secnxt.com/download/linux-agent'
    },
    {
      id: 'mac',
      name: 'macOS Agent',
      icon: 'Laptop',
      version: '2.1.4',
      size: '52.1 MB',
      requirements: 'macOS 10.15+, Intel/Apple Silicon',
      downloadUrl: '#',
      qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=https://secnxt.com/download/mac-agent'
    }
  ];

  const selectedAgent = agentDownloads?.find(agent => agent?.id === selectedOS);

  const installationSteps = {
    windows: [
      "Download the SecNXT Windows Agent installer",
      "Run the installer as Administrator",
      "Follow the installation wizard prompts",
      "Enter your organization token when prompted",
      "Restart the system to complete installation"
    ],
    linux: [
      "Download the SecNXT Linux Agent package",
      "Extract the package: tar -xzf secnxt-agent-linux.tar.gz",
      "Run the installer: sudo ./install.sh",
      "Configure with your organization token",
      "Start the service: sudo systemctl start secnxt-agent"
    ],
    mac: [
      "Download the SecNXT macOS Agent DMG file",
      "Mount the DMG and run the installer",
      "Allow system extensions in Security & Privacy",
      "Enter your organization token",
      "Grant necessary permissions when prompted"
    ]
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Agent Downloads</h3>
          <p className="text-muted-foreground">
            Download and install SecNXT agents on your devices for comprehensive monitoring
          </p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Shield" size={16} />
          <span>Latest Version: 2.1.4</span>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Agent Selection */}
        <div className="space-y-4">
          <h4 className="font-medium text-foreground">Select Operating System</h4>
          
          <div className="space-y-2">
            {agentDownloads?.map((agent) => (
              <button
                key={agent?.id}
                onClick={() => setSelectedOS(agent?.id)}
                className={`w-full flex items-center space-x-4 p-4 rounded-lg border transition-all duration-200 ${
                  selectedOS === agent?.id
                    ? 'border-primary bg-primary/5 text-primary' :'border-border hover:border-border/80 hover:bg-muted/30'
                }`}
              >
                <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${
                  selectedOS === agent?.id ? 'bg-primary/10' : 'bg-muted/50'
                }`}>
                  <Icon name={agent?.icon} size={20} />
                </div>
                <div className="flex-1 text-left">
                  <div className="font-medium">{agent?.name}</div>
                  <div className="text-sm opacity-70">
                    Version {agent?.version} • {agent?.size}
                  </div>
                </div>
                <Icon name="ChevronRight" size={16} className="opacity-50" />
              </button>
            ))}
          </div>

          {/* Download Section */}
          {selectedAgent && (
            <div className="p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h5 className="font-medium text-foreground">{selectedAgent?.name}</h5>
                  <p className="text-sm text-muted-foreground">{selectedAgent?.requirements}</p>
                </div>
                <div className="text-center">
                  <img 
                    src={selectedAgent?.qrCode} 
                    alt="QR Code for mobile download"
                    className="w-16 h-16 rounded border border-border"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Mobile Download</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button
                  variant="default"
                  iconName="Download"
                  className="flex-1"
                  onClick={() => window.open(selectedAgent?.downloadUrl, '_blank')}
                >
                  Download {selectedAgent?.name}
                </Button>
                <Button
                  variant="outline"
                  iconName="FileText"
                  onClick={() => {}}
                >
                  Documentation
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Installation Instructions */}
        <div className="space-y-4">
          <h4 className="font-medium text-foreground">Installation Instructions</h4>
          
          <div className="bg-muted/30 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-4">
              <Icon name="Key" size={16} className="text-primary" />
              <span className="text-sm font-medium text-foreground">Organization Token</span>
            </div>
            <div className="flex items-center space-x-2 p-2 bg-background rounded border border-border">
              <code className="flex-1 text-sm font-mono text-foreground">
                org_2NvZKwDvyBXFx8uBHwkTJ5mL9Qp
              </code>
              <Button
                variant="ghost"
                size="sm"
                iconName="Copy"
                onClick={() => navigator.clipboard?.writeText('org_2NvZKwDvyBXFx8uBHwkTJ5mL9Qp')}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Use this token during agent installation to connect devices to your organization
            </p>
          </div>

          <div className="space-y-3">
            <h5 className="font-medium text-foreground">
              {selectedAgent?.name} Installation Steps
            </h5>
            <div className="space-y-2">
              {installationSteps?.[selectedOS]?.map((step, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex items-center justify-center w-6 h-6 bg-primary/10 text-primary rounded-full text-sm font-medium flex-shrink-0 mt-0.5">
                    {index + 1}
                  </div>
                  <p className="text-sm text-muted-foreground">{step}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 bg-accent/10 border border-accent/20 rounded-lg">
            <div className="flex items-start space-x-2">
              <Icon name="Info" size={16} className="text-accent mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-accent mb-1">Need Help?</p>
                <p className="text-muted-foreground">
                  Contact our support team for assistance with agent deployment and configuration.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentDownloadSection;