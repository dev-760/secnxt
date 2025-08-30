import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ThreatDetectionTimeline = ({ threats = [] }) => {
  const [selectedThreat, setSelectedThreat] = useState(null);

  const mockThreats = threats?.length > 0 ? threats : [
    {
      id: 1,
      type: 'Malware Detection',
      severity: 'critical',
      source: 'Workstation-045',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      description: 'Suspicious executable detected attempting to modify system files',
      status: 'active',
      aiRecommendation: 'Immediate isolation recommended. Quarantine affected device and run full system scan.'
    },
    {
      id: 2,
      type: 'Suspicious Login',
      severity: 'high',
      source: 'Authentication System',
      timestamp: new Date(Date.now() - 45 * 60 * 1000),
      description: 'Login attempt from unusual geographic location (IP: 192.168.1.100)',
      status: 'investigating',
      aiRecommendation: 'Verify user identity and consider enabling additional authentication factors.'
    },
    {
      id: 3,
      type: 'Network Anomaly',
      severity: 'medium',
      source: 'Network Monitor',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      description: 'Unusual data transfer patterns detected on port 443',
      status: 'resolved',
      aiRecommendation: 'Monitor network traffic patterns and review firewall rules.'
    },
    {
      id: 4,
      type: 'Vulnerability Scan',
      severity: 'low',
      source: 'Security Scanner',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      description: 'Outdated software version detected on 3 devices',
      status: 'acknowledged',
      aiRecommendation: 'Schedule maintenance window for software updates.'
    }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'text-error border-error bg-error/10';
      case 'high': return 'text-warning border-warning bg-warning/10';
      case 'medium': return 'text-accent border-accent bg-accent/10';
      case 'low': return 'text-success border-success bg-success/10';
      default: return 'text-muted-foreground border-border bg-muted/10';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return { name: 'AlertTriangle', color: 'text-error' };
      case 'investigating': return { name: 'Search', color: 'text-warning' };
      case 'resolved': return { name: 'CheckCircle', color: 'text-success' };
      case 'acknowledged': return { name: 'Eye', color: 'text-accent' };
      default: return { name: 'Circle', color: 'text-muted-foreground' };
    }
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));

    if (minutes < 60) return `${minutes}m ago`;
    return `${hours}h ago`;
  };

  const handleAskAI = (threat) => {
    setSelectedThreat(threat);
    // In a real app, this would trigger AI analysis
    console.log('AI analysis requested for:', threat);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Icon name="Activity" size={24} className="text-primary" />
          <h2 className="text-xl font-semibold text-card-foreground">Threat Detection Timeline</h2>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" iconName="Filter">
            Filter
          </Button>
          <Button variant="outline" size="sm" iconName="RefreshCw">
            Refresh
          </Button>
        </div>
      </div>
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {mockThreats?.map((threat, index) => {
          const statusIcon = getStatusIcon(threat?.status);
          return (
            <div
              key={threat?.id}
              className={`relative p-4 rounded-lg border transition-all duration-200 hover:shadow-md ${getSeverityColor(threat?.severity)}`}
            >
              {/* Timeline connector */}
              {index < mockThreats?.length - 1 && (
                <div className="absolute left-6 top-16 w-0.5 h-8 bg-border"></div>
              )}
              <div className="flex items-start space-x-4">
                <div className={`p-2 rounded-full ${statusIcon?.color}`}>
                  <Icon name={statusIcon?.name} size={16} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-card-foreground">{threat?.type}</h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getSeverityColor(threat?.severity)}`}>
                        {threat?.severity?.toUpperCase()}
                      </span>
                    </div>
                    <span className="text-sm text-muted-foreground">{formatTimestamp(threat?.timestamp)}</span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-2">{threat?.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Icon name="Monitor" size={14} />
                      <span>{threat?.source}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        iconName="Brain"
                        onClick={() => handleAskAI(threat)}
                      >
                        Ask AI
                      </Button>
                      <Button variant="ghost" size="sm" iconName="ExternalLink">
                        Details
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* AI Recommendation Modal */}
      {selectedThreat && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-lg border border-border p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Icon name="Brain" size={20} className="text-primary" />
                <h3 className="font-semibold text-card-foreground">AI Recommendation</h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                iconName="X"
                onClick={() => setSelectedThreat(null)}
              />
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-card-foreground mb-2">{selectedThreat?.type}</h4>
                <p className="text-sm text-muted-foreground">{selectedThreat?.description}</p>
              </div>
              
              <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                <div className="flex items-start space-x-2">
                  <Icon name="Lightbulb" size={16} className="text-primary mt-0.5" />
                  <p className="text-sm text-card-foreground">{selectedThreat?.aiRecommendation}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 pt-4">
                <Button variant="default" size="sm" className="flex-1">
                  Apply Recommendation
                </Button>
                <Button variant="outline" size="sm" onClick={() => setSelectedThreat(null)}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThreatDetectionTimeline;