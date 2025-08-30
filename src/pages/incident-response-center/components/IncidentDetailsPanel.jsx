import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const IncidentDetailsPanel = ({ incident, onStatusUpdate, onAssignIncident, onEscalate }) => {
  const [showAIInsights, setShowAIInsights] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  if (!incident) {
    return (
      <div className="h-full flex items-center justify-center bg-card">
        <div className="text-center">
          <Icon name="Shield" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">Select an Incident</h3>
          <p className="text-muted-foreground">Choose an incident from the timeline to view details</p>
        </div>
      </div>
    );
  }

  const severityConfig = {
    critical: { color: 'text-error', bgColor: 'bg-error/10', borderColor: 'border-error' },
    high: { color: 'text-warning', bgColor: 'bg-warning/10', borderColor: 'border-warning' },
    medium: { color: 'text-accent', bgColor: 'bg-accent/10', borderColor: 'border-accent' },
    low: { color: 'text-success', bgColor: 'bg-success/10', borderColor: 'border-success' }
  };

  const statusConfig = {
    resolved: { color: 'text-success', bgColor: 'bg-success/10', icon: 'CheckCircle' },
    investigating: { color: 'text-warning', bgColor: 'bg-warning/10', icon: 'Search' },
    critical: { color: 'text-error', bgColor: 'bg-error/10', icon: 'AlertTriangle' },
    new: { color: 'text-accent', bgColor: 'bg-accent/10', icon: 'AlertCircle' }
  };

  const handleAskAI = async () => {
    setAiLoading(true);
    setShowAIInsights(true);
    
    // Simulate AI processing
    setTimeout(() => {
      setAiLoading(false);
    }, 2000);
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Eye' },
    { id: 'timeline', label: 'Timeline', icon: 'Clock' },
    { id: 'assets', label: 'Affected Assets', icon: 'Server' },
    { id: 'analysis', label: 'Analysis', icon: 'Brain' }
  ];

  const severityStyle = severityConfig?.[incident?.severity];
  const statusStyle = statusConfig?.[incident?.status];

  return (
    <div className="h-full flex flex-col bg-card">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <div className={`p-2 rounded-lg ${statusStyle?.bgColor}`}>
                <Icon name={statusStyle?.icon} size={20} className={statusStyle?.color} />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-foreground">{incident?.title}</h1>
                <p className="text-sm text-muted-foreground">ID: {incident?.id}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className={`px-3 py-1 text-sm font-medium rounded-full ${severityStyle?.bgColor} ${severityStyle?.color}`}>
                {incident?.severity?.toUpperCase()} SEVERITY
              </span>
              <span className={`px-3 py-1 text-sm font-medium rounded-full ${statusStyle?.bgColor} ${statusStyle?.color}`}>
                {incident?.status?.toUpperCase()}
              </span>
              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                <Icon name="Clock" size={14} />
                <span>{new Date(incident.timestamp)?.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="MessageSquare"
              iconPosition="left"
              onClick={() => {}}
            >
              Add Note
            </Button>
            <Button
              variant="default"
              size="sm"
              iconName="Zap"
              iconPosition="left"
              loading={aiLoading}
              onClick={handleAskAI}
            >
              Ask AI
            </Button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          <select
            value={incident?.status}
            onChange={(e) => onStatusUpdate(incident?.id, e?.target?.value)}
            className="px-3 py-2 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="new">New</option>
            <option value="investigating">Investigating</option>
            <option value="critical">Critical</option>
            <option value="resolved">Resolved</option>
          </select>

          <select
            value={incident?.assignedTo || ''}
            onChange={(e) => onAssignIncident(incident?.id, e?.target?.value)}
            className="px-3 py-2 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="">Assign to...</option>
            <option value="Ahmed Benali">Ahmed Benali</option>
            <option value="Fatima Zahra">Fatima Zahra</option>
            <option value="Youssef Alami">Youssef Alami</option>
            <option value="Khadija Mansouri">Khadija Mansouri</option>
          </select>

          <Button
            variant="outline"
            size="sm"
            iconName="AlertTriangle"
            iconPosition="left"
            onClick={() => onEscalate(incident?.id)}
          >
            Escalate
          </Button>
        </div>
      </div>
      {/* Tabs */}
      <div className="border-b border-border">
        <div className="flex space-x-0">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors duration-200 ${
                activeTab === tab?.id
                  ? 'border-primary text-primary bg-primary/5' :'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/30'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Description */}
            <div>
              <h3 className="text-lg font-medium text-foreground mb-3">Incident Summary</h3>
              <p className="text-muted-foreground leading-relaxed">{incident?.description}</p>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-muted/20 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Server" size={16} className="text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">Affected Systems</span>
                </div>
                <div className="text-2xl font-semibold text-foreground">{incident?.affectedSystems?.length}</div>
              </div>

              <div className="p-4 bg-muted/20 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Users" size={16} className="text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">Users Impacted</span>
                </div>
                <div className="text-2xl font-semibold text-foreground">{incident?.impactedUsers || 0}</div>
              </div>

              <div className="p-4 bg-muted/20 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="DollarSign" size={16} className="text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">Est. Impact</span>
                </div>
                <div className="text-2xl font-semibold text-foreground">{incident?.estimatedImpact || 'TBD'}</div>
              </div>
            </div>

            {/* AI Insights */}
            {showAIInsights && (
              <div className="p-4 bg-accent/5 border border-accent/20 rounded-lg">
                <div className="flex items-center space-x-2 mb-3">
                  <Icon name="Zap" size={16} className="text-accent" />
                  <span className="text-sm font-medium text-accent">AI Insights</span>
                </div>
                
                {aiLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin">
                      <Icon name="Loader2" size={16} className="text-accent" />
                    </div>
                    <span className="text-sm text-muted-foreground">Analyzing incident...</span>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-sm font-medium text-foreground mb-2">Recommended Actions:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Isolate affected systems immediately</li>
                        <li>• Run full malware scan on compromised endpoints</li>
                        <li>• Reset credentials for affected user accounts</li>
                        <li>• Monitor network traffic for lateral movement</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium text-foreground mb-2">Root Cause Analysis:</h4>
                      <p className="text-sm text-muted-foreground">
                        Based on the attack pattern, this appears to be a targeted phishing campaign 
                        exploiting unpatched vulnerabilities in the email gateway.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {activeTab === 'assets' && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Affected Systems</h3>
            <div className="space-y-3">
              {incident?.affectedSystems?.map((system, index) => (
                <div key={index} className="p-4 border border-border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Icon name="Server" size={20} className="text-muted-foreground" />
                      <div>
                        <div className="font-medium text-foreground">{system}</div>
                        <div className="text-sm text-muted-foreground">Status: Compromised</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Isolate
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'timeline' && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Incident Timeline</h3>
            <div className="space-y-4">
              {[
                { time: '14:32', action: 'Incident detected by AI monitoring', status: 'detected' },
                { time: '14:35', action: 'Automated containment initiated', status: 'action' },
                { time: '14:40', action: 'Security team notified', status: 'notification' },
                { time: '14:45', action: 'Investigation started', status: 'investigation' },
                { time: '15:00', action: 'Root cause identified', status: 'analysis' }
              ]?.map((event, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-2 h-2 bg-primary rounded-full mt-2" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">{event?.action}</span>
                      <span className="text-xs text-muted-foreground">{event?.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'analysis' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-foreground mb-3">Technical Analysis</h3>
              <div className="p-4 bg-muted/20 rounded-lg">
                <pre className="text-sm text-muted-foreground whitespace-pre-wrap">
{`Attack Vector: Email phishing with malicious attachment
Entry Point: user@company.com
Payload: Trojan.Win32.Agent
C&C Server: 192.168.1.100:8080
Lateral Movement: SMB protocol exploitation`}
                </pre>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-foreground mb-3">Indicators of Compromise</h3>
              <div className="space-y-2">
                {[
                  'File Hash: a1b2c3d4e5f6...',
                  'Registry Key: HKLM\\Software\\Malware',
                  'Network Connection: 192.168.1.100:8080',
                  'Process: malware.exe'
                ]?.map((ioc, index) => (
                  <div key={index} className="p-3 bg-muted/20 rounded-lg">
                    <code className="text-sm text-foreground">{ioc}</code>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IncidentDetailsPanel;