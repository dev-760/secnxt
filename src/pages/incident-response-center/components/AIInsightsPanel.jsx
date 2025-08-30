import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AIInsightsPanel = ({ incidents }) => {
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedInsight, setSelectedInsight] = useState(null);

  useEffect(() => {
    // Simulate AI analysis
    const generateInsights = () => {
      setLoading(true);
      setTimeout(() => {
        const mockInsights = [
          {
            id: 1,
            type: 'pattern',
            title: 'Recurring Attack Pattern Detected',
            description: `AI has identified a pattern of similar phishing attacks targeting your organization over the past 7 days. 
            The attacks share common indicators including sender domains, attachment types, and timing patterns.`,
            severity: 'high',
            confidence: 92,
            recommendations: [
              'Implement additional email filtering rules',
              'Conduct targeted security awareness training',
              'Review and update phishing detection policies'
            ],
            affectedIncidents: ['INC-2025-001', 'INC-2025-003', 'INC-2025-007'],
            timestamp: new Date(Date.now() - 30 * 60 * 1000)
          },
          {
            id: 2,
            type: 'prediction',
            title: 'Potential Lateral Movement Risk',
            description: `Based on current incident analysis, there's a 78% probability of lateral movement attempts within the next 4 hours. The compromised systems have elevated privileges that could be exploited.`,severity: 'critical',
            confidence: 78,
            recommendations: [
              'Immediately isolate compromised systems','Monitor network traffic for suspicious connections','Disable affected user accounts temporarily','Implement network segmentation controls'
            ],
            affectedIncidents: ['INC-2025-002'],
            timestamp: new Date(Date.now() - 15 * 60 * 1000)
          },
          {
            id: 3,
            type: 'prevention',title: 'Vulnerability Correlation Analysis',description: `AI analysis shows that 65% of recent incidents could have been prevented by patching known vulnerabilities. Critical systems are running outdated software versions.`,severity: 'medium',
            confidence: 85,
            recommendations: [
              'Prioritize patch management for critical systems','Implement automated vulnerability scanning','Create emergency patching procedures','Review change management processes'
            ],
            affectedIncidents: ['INC-2025-001', 'INC-2025-004', 'INC-2025-005'],
            timestamp: new Date(Date.now() - 60 * 60 * 1000)
          },
          {
            id: 4,
            type: 'optimization',title: 'Response Time Improvement Opportunity',
            description: `Analysis of incident response times shows an average delay of 23 minutes in initial response. 
            Automation could reduce this to under 5 minutes for similar incident types.`,
            severity: 'low',
            confidence: 91,
            recommendations: [
              'Implement automated incident triage','Create response playbook templates','Set up automated notification workflows','Train team on rapid response procedures'
            ],
            affectedIncidents: [],
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
          }
        ];
        
        setInsights(mockInsights);
        setLoading(false);
      }, 1500);
    };

    generateInsights();
  }, [incidents]);

  const severityConfig = {
    critical: { color: 'text-error', bgColor: 'bg-error/10', borderColor: 'border-error' },
    high: { color: 'text-warning', bgColor: 'bg-warning/10', borderColor: 'border-warning' },
    medium: { color: 'text-accent', bgColor: 'bg-accent/10', borderColor: 'border-accent' },
    low: { color: 'text-success', bgColor: 'bg-success/10', borderColor: 'border-success' }
  };

  const typeConfig = {
    pattern: { icon: 'TrendingUp', label: 'Pattern Analysis' },
    prediction: { icon: 'Zap', label: 'Predictive Alert' },
    prevention: { icon: 'Shield', label: 'Prevention Insight' },
    optimization: { icon: 'Target', label: 'Process Optimization' }
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return timestamp?.toLocaleDateString();
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-accent/10 rounded-lg">
              <Icon name="Brain" size={20} className="text-accent" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">AI Insights</h2>
              <p className="text-sm text-muted-foreground">Intelligent analysis and recommendations</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span className="text-xs text-muted-foreground">Live Analysis</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              iconName="RefreshCw"
              onClick={() => window.location?.reload()}
            />
          </div>
        </div>
      </div>
      {/* Content */}
      <div className="p-4">
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3]?.map((i) => (
              <div key={i} className="animate-pulse">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-muted/50 rounded-lg" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-muted/50 rounded w-3/4" />
                    <div className="h-3 bg-muted/50 rounded w-1/2" />
                    <div className="h-3 bg-muted/50 rounded w-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {insights?.map((insight) => {
              const severityStyle = severityConfig?.[insight?.severity];
              const typeStyle = typeConfig?.[insight?.type];
              
              return (
                <div
                  key={insight?.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 hover:shadow-sm ${
                    selectedInsight?.id === insight?.id
                      ? `${severityStyle?.borderColor} ${severityStyle?.bgColor}`
                      : 'border-border hover:border-border/60'
                  }`}
                  onClick={() => setSelectedInsight(selectedInsight?.id === insight?.id ? null : insight)}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${severityStyle?.bgColor}`}>
                      <Icon name={typeStyle?.icon} size={16} className={severityStyle?.color} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-medium text-foreground">{insight?.title}</h3>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${severityStyle?.bgColor} ${severityStyle?.color}`}>
                            {insight?.severity?.toUpperCase()}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {insight?.confidence}% confidence
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                        {insight?.description}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span className="flex items-center space-x-1">
                          <Icon name="Tag" size={12} />
                          <span>{typeStyle?.label}</span>
                        </span>
                        <span>{formatTimestamp(insight?.timestamp)}</span>
                      </div>
                      
                      {selectedInsight?.id === insight?.id && (
                        <div className="mt-4 pt-4 border-t border-border space-y-3">
                          <div>
                            <h4 className="text-sm font-medium text-foreground mb-2">Recommendations:</h4>
                            <ul className="space-y-1">
                              {insight?.recommendations?.map((rec, index) => (
                                <li key={index} className="text-sm text-muted-foreground flex items-start space-x-2">
                                  <Icon name="ArrowRight" size={12} className="mt-0.5 flex-shrink-0" />
                                  <span>{rec}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          {insight?.affectedIncidents?.length > 0 && (
                            <div>
                              <h4 className="text-sm font-medium text-foreground mb-2">Related Incidents:</h4>
                              <div className="flex flex-wrap gap-1">
                                {insight?.affectedIncidents?.map((incidentId, index) => (
                                  <span
                                    key={index}
                                    className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                                  >
                                    {incidentId}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          <div className="flex items-center space-x-2 pt-2">
                            <Button
                              variant="outline"
                              size="sm"
                              iconName="CheckCircle"
                              iconPosition="left"
                            >
                              Apply Recommendations
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              iconName="X"
                              iconPosition="left"
                            >
                              Dismiss
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AIInsightsPanel;