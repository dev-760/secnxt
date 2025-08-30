import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionPanel = ({ onActionClick }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);

  const quickActions = [
    {
      id: 'vulnerability-scan',
      title: 'Run Vulnerability Scan',
      description: 'Comprehensive security assessment',
      icon: 'Search',
      color: 'primary',
      estimatedTime: '15 minutes',
      lastRun: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
    },
    {
      id: 'incident-response',
      title: 'Emergency Response',
      description: 'Activate incident response protocol',
      icon: 'AlertTriangle',
      color: 'error',
      estimatedTime: 'Immediate',
      critical: true
    },
    {
      id: 'threat-hunt',
      title: 'Threat Hunting',
      description: 'AI-powered threat detection',
      icon: 'Target',
      color: 'warning',
      estimatedTime: '30 minutes',
      lastRun: new Date(Date.now() - 6 * 60 * 60 * 1000)
    },
    {
      id: 'compliance-check',
      title: 'Compliance Audit',
      description: 'CNDP & SOC2 compliance verification',
      icon: 'Shield',
      color: 'accent',
      estimatedTime: '45 minutes',
      lastRun: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    },
    {
      id: 'backup-verify',
      title: 'Backup Verification',
      description: 'Verify data backup integrity',
      icon: 'Database',
      color: 'success',
      estimatedTime: '20 minutes',
      lastRun: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
    },
    {
      id: 'security-report',
      title: 'Generate Report',
      description: 'Executive security summary',
      icon: 'FileText',
      color: 'secondary',
      estimatedTime: '5 minutes',
      formats: ['PDF', 'CSV', 'JSON']
    }
  ];

  const getColorClasses = (color, critical = false) => {
    if (critical) {
      return 'border-error bg-error/5 hover:bg-error/10 text-error';
    }
    
    switch (color) {
      case 'primary':
        return 'border-primary bg-primary/5 hover:bg-primary/10 text-primary';
      case 'error':
        return 'border-error bg-error/5 hover:bg-error/10 text-error';
      case 'warning':
        return 'border-warning bg-warning/5 hover:bg-warning/10 text-warning';
      case 'accent':
        return 'border-accent bg-accent/5 hover:bg-accent/10 text-accent';
      case 'success':
        return 'border-success bg-success/5 hover:bg-success/10 text-success';
      default:
        return 'border-border bg-card hover:bg-muted/50 text-card-foreground';
    }
  };

  const formatLastRun = (date) => {
    if (!date) return 'Never';
    
    const now = new Date();
    const diff = now - date;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const handleActionClick = async (action) => {
    if (action?.id === 'vulnerability-scan') {
      setIsScanning(true);
      setScanProgress(0);
      
      // Simulate scan progress
      const interval = setInterval(() => {
        setScanProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsScanning(false);
            return 0;
          }
          return prev + 10;
        });
      }, 500);
    }
    
    if (onActionClick) {
      onActionClick(action);
    }
  };

  const recentActivities = [
    {
      id: 1,
      action: 'Vulnerability Scan',
      status: 'completed',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      result: '12 vulnerabilities found'
    },
    {
      id: 2,
      action: 'Threat Hunt',
      status: 'in-progress',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      result: 'Analyzing network traffic...'
    },
    {
      id: 3,
      action: 'Backup Verification',
      status: 'completed',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      result: 'All backups verified successfully'
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return { name: 'CheckCircle', color: 'text-success' };
      case 'in-progress':
        return { name: 'Clock', color: 'text-warning' };
      case 'failed':
        return { name: 'XCircle', color: 'text-error' };
      default:
        return { name: 'Circle', color: 'text-muted-foreground' };
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Icon name="Zap" size={24} className="text-primary" />
          <div>
            <h2 className="text-xl font-semibold text-card-foreground">Quick Actions</h2>
            <p className="text-sm text-muted-foreground">One-click security operations</p>
          </div>
        </div>
        <Button variant="outline" size="sm" iconName="Settings">
          Configure
        </Button>
      </div>
      {/* Scanning Progress */}
      {isScanning && (
        <div className="mb-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Icon name="Search" size={16} className="text-primary animate-spin" />
              <span className="text-sm font-medium text-primary">Vulnerability Scan in Progress</span>
            </div>
            <span className="text-sm text-primary">{scanProgress}%</span>
          </div>
          <div className="w-full bg-primary/10 rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-500"
              style={{ width: `${scanProgress}%` }}
            ></div>
          </div>
        </div>
      )}
      {/* Quick Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {quickActions?.map((action) => (
          <div
            key={action?.id}
            className={`p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer ${getColorClasses(action?.color, action?.critical)}`}
            onClick={() => handleActionClick(action)}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-background/50">
                  <Icon name={action?.icon} size={20} />
                </div>
                <div>
                  <h3 className="font-semibold">{action?.title}</h3>
                  <p className="text-sm opacity-80">{action?.description}</p>
                </div>
              </div>
              {action?.critical && (
                <div className="animate-pulse">
                  <Icon name="AlertTriangle" size={16} />
                </div>
              )}
            </div>
            
            <div className="flex items-center justify-between text-sm opacity-80">
              <span>Est. time: {action?.estimatedTime}</span>
              {action?.lastRun && (
                <span>Last: {formatLastRun(action?.lastRun)}</span>
              )}
            </div>
            
            {action?.formats && (
              <div className="mt-2 flex items-center space-x-1">
                {action?.formats?.map((format) => (
                  <span key={format} className="px-2 py-1 text-xs rounded bg-background/50">
                    {format}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Recent Activities */}
      <div className="border-t border-border pt-6">
        <h3 className="font-semibold text-card-foreground mb-4">Recent Activities</h3>
        <div className="space-y-3">
          {recentActivities?.map((activity) => {
            const statusIcon = getStatusIcon(activity?.status);
            return (
              <div key={activity?.id} className="flex items-center space-x-3 p-3 rounded-lg bg-background/50">
                <div className={statusIcon?.color}>
                  <Icon name={statusIcon?.name} size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-card-foreground">{activity?.action}</span>
                    <span className="text-xs text-muted-foreground">
                      {activity?.timestamp?.toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{activity?.result}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Emergency Contact */}
      <div className="mt-6 p-4 bg-error/5 border border-error/20 rounded-lg">
        <div className="flex items-center space-x-3">
          <Icon name="Phone" size={20} className="text-error" />
          <div>
            <h4 className="font-semibold text-error">Emergency Support</h4>
            <p className="text-sm text-error/80">24/7 incident response: +212 5XX-XXX-XXX</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActionPanel;