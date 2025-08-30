import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AIInsightsPanel = ({ insights = [] }) => {
  const [activeTab, setActiveTab] = useState('recommendations');

  const mockInsights = insights?.length > 0 ? insights : {
    recommendations: [
      {
        id: 1,
        type: 'security',
        title: 'Enable Multi-Factor Authentication',
        description: 'Based on recent login patterns, enabling MFA would reduce unauthorized access risk by 87%',
        priority: 'high',
        impact: 'High Security Impact',
        timeToImplement: '15 minutes',
        confidence: 95
      },
      {
        id: 2,
        type: 'vulnerability',
        title: 'Update Critical Software',
        description: '3 devices have outdated software with known vulnerabilities. Immediate patching recommended.',
        priority: 'critical',
        impact: 'Critical Risk Reduction',
        timeToImplement: '2 hours',
        confidence: 98
      },
      {
        id: 3,
        type: 'policy',
        title: 'Review Access Permissions',
        description: 'AI detected 5 users with excessive privileges that could be reduced without impacting productivity',
        priority: 'medium',
        impact: 'Medium Risk Reduction',
        timeToImplement: '30 minutes',
        confidence: 82
      }
    ],
    incidents: [
      {
        id: 1,
        title: 'Malware Containment Successful',
        summary: 'AI-assisted response contained malware on workstation-045 within 3 minutes. No data exfiltration detected.',
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        severity: 'resolved',
        aiConfidence: 94
      },
      {
        id: 2,
        title: 'Suspicious Login Investigation',
        summary: 'Geographic anomaly detected and verified as legitimate user traveling. False positive rate improved.',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        severity: 'resolved',
        aiConfidence: 89
      }
    ],
    analytics: [
      {
        metric: 'Threat Detection Accuracy',
        value: '94.2%',
        trend: '+2.1%',
        description: 'AI model accuracy improved this week'
      },
      {
        metric: 'Response Time',
        value: '2.3 min',
        trend: '-15%',
        description: 'Average incident response time'
      },
      {
        metric: 'False Positives',
        value: '3.1%',
        trend: '-8%',
        description: 'Reduced false positive rate'
      }
    ]
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return 'text-error border-error bg-error/10';
      case 'high': return 'text-warning border-warning bg-warning/10';
      case 'medium': return 'text-accent border-accent bg-accent/10';
      case 'low': return 'text-success border-success bg-success/10';
      default: return 'text-muted-foreground border-border bg-muted/10';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'security': return 'Shield';
      case 'vulnerability': return 'Bug';
      case 'policy': return 'Settings';
      default: return 'Lightbulb';
    }
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));

    if (minutes < 60) return `${minutes}m ago`;
    return `${hours}h ago`;
  };

  const tabs = [
    { id: 'recommendations', label: 'Recommendations', icon: 'Lightbulb' },
    { id: 'incidents', label: 'Recent Incidents', icon: 'AlertTriangle' },
    { id: 'analytics', label: 'AI Analytics', icon: 'BarChart3' }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6 h-full">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Icon name="Brain" size={24} className="text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-card-foreground">AI Insights</h2>
          <p className="text-sm text-muted-foreground">Powered by SecNXT Intelligence</p>
        </div>
      </div>
      {/* Tabs */}
      <div className="flex space-x-1 mb-6 bg-muted/20 rounded-lg p-1">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => setActiveTab(tab?.id)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex-1 justify-center ${
              activeTab === tab?.id
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
            }`}
          >
            <Icon name={tab?.icon} size={16} />
            <span className="hidden sm:inline">{tab?.label}</span>
          </button>
        ))}
      </div>
      {/* Content */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {activeTab === 'recommendations' && (
          <div className="space-y-4">
            {mockInsights?.recommendations?.map((rec) => (
              <div
                key={rec?.id}
                className={`p-4 rounded-lg border transition-all duration-200 hover:shadow-md ${getPriorityColor(rec?.priority)}`}
              >
                <div className="flex items-start space-x-3">
                  <div className="p-2 rounded-lg bg-background/50">
                    <Icon name={getTypeIcon(rec?.type)} size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-card-foreground">{rec?.title}</h3>
                      <div className="flex items-center space-x-1 text-xs">
                        <Icon name="Zap" size={12} className="text-primary" />
                        <span className="text-primary">{rec?.confidence}%</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{rec?.description}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{rec?.impact}</span>
                      <span>{rec?.timeToImplement}</span>
                    </div>
                    <div className="mt-3">
                      <Button variant="outline" size="sm" className="w-full">
                        Implement Now
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'incidents' && (
          <div className="space-y-4">
            {mockInsights?.incidents?.map((incident) => (
              <div key={incident?.id} className="p-4 rounded-lg border border-border bg-card hover:shadow-md transition-all duration-200">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-card-foreground">{incident?.title}</h3>
                  <span className="text-xs text-muted-foreground">{formatTimestamp(incident?.timestamp)}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{incident?.summary}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon name="CheckCircle" size={14} className="text-success" />
                    <span className="text-xs text-success font-medium">Resolved</span>
                  </div>
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    <Icon name="Brain" size={12} className="text-primary" />
                    <span>{incident?.aiConfidence}% confidence</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-4">
            {mockInsights?.analytics?.map((metric, index) => (
              <div key={index} className="p-4 rounded-lg border border-border bg-card">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-card-foreground">{metric?.metric}</h3>
                  <div className="flex items-center space-x-1">
                    <span className="text-2xl font-bold text-primary">{metric?.value}</span>
                    <span className={`text-sm font-medium ${
                      metric?.trend?.startsWith('+') ? 'text-success' : 'text-error'
                    }`}>
                      {metric?.trend}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{metric?.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Last updated: {new Date()?.toLocaleTimeString()}</span>
          <Button variant="ghost" size="sm" iconName="RefreshCw">
            Refresh
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AIInsightsPanel;