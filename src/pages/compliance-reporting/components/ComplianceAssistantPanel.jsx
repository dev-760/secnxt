import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ComplianceAssistantPanel = ({ currentLanguage }) => {
  const [chatMessages, setChatMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');

  const content = {
    en: {
      aiAssistant: 'AI Compliance Assistant',
      recommendations: 'AI Recommendations',
      askQuestion: 'Ask a compliance question...',
      send: 'Send',
      insights: 'Insights',
      riskAnalysis: 'Risk Analysis',
      viewDetails: 'View Details',
      implement: 'Implement',
      dismiss: 'Dismiss'
    },
    ar: {
      aiAssistant: 'مساعد الامتثال بالذكاء الاصطناعي',
      recommendations: 'توصيات الذكاء الاصطناعي',
      askQuestion: 'اطرح سؤال حول الامتثال...',
      send: 'إرسال',
      insights: 'الأفكار',
      riskAnalysis: 'تحليل المخاطر',
      viewDetails: 'عرض التفاصيل',
      implement: 'تنفيذ',
      dismiss: 'رفض'
    },
    fr: {
      aiAssistant: 'Assistant IA de Conformité',
      recommendations: 'Recommandations IA',
      askQuestion: 'Poser une question sur la conformité...',
      send: 'Envoyer',
      insights: 'Insights',
      riskAnalysis: 'Analyse des Risques',
      viewDetails: 'Voir Détails',
      implement: 'Implémenter',
      dismiss: 'Ignorer'
    }
  };

  const t = content?.[currentLanguage];

  const aiRecommendations = [
    {
      id: 1,
      type: 'security',
      priority: 'high',
      title: 'Enable MFA for All Administrative Accounts',
      description: 'SOC 2 CC6.1 requires multi-factor authentication for privileged access. 3 admin accounts lack MFA configuration.',
      impact: 'Critical security control gap',
      framework: 'SOC 2',
      estimatedEffort: '2-4 hours',
      icon: 'Shield'
    },
    {
      id: 2,
      type: 'policy',
      priority: 'medium',
      title: 'Update Data Retention Policy',
      description: 'CNDP regulations require explicit data retention periods. Current policy lacks specific timelines for customer data.',
      impact: 'Regulatory compliance risk',
      framework: 'CNDP',
      estimatedEffort: '1-2 days',
      icon: 'FileText'
    },
    {
      id: 3,
      type: 'monitoring',
      priority: 'medium',
      title: 'Implement Automated Log Monitoring',
      description: 'ISO 27001 A.12.4.1 suggests automated log analysis. Current manual review may miss security events.',
      impact: 'Detection capability improvement',
      framework: 'ISO 27001',
      estimatedEffort: '3-5 days',
      icon: 'Eye'
    },
    {
      id: 4,
      type: 'documentation',
      priority: 'low',
      title: 'Document Incident Response Procedures',
      description: 'Enhanced incident response documentation will improve SOC 2 CC7.4 compliance scoring.',
      impact: 'Process optimization',
      framework: 'SOC 2',
      estimatedEffort: '4-6 hours',
      icon: 'Book'
    }
  ];

  const aiInsights = [
    {
      id: 1,
      title: 'Compliance Posture Trend',
      insight: 'Your compliance score has improved by 12% over the last quarter, primarily due to enhanced access controls.',
      type: 'positive',
      icon: 'TrendingUp'
    },
    {
      id: 2,
      title: 'Risk Pattern Detected',
      insight: 'Unusual after-hours access detected for 3 users. Consider implementing time-based access restrictions.',
      type: 'warning',
      icon: 'AlertTriangle'
    },
    {
      id: 3,
      title: 'Audit Preparation Status',
      insight: 'You are 85% ready for your upcoming SOC 2 audit. Focus on documentation completeness for remaining controls.',
      type: 'info',
      icon: 'CheckCircle'
    }
  ];

  const handleSendMessage = () => {
    if (!inputMessage?.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    // Simulate AI response
    const aiResponse = {
      id: Date.now() + 1,
      text: "Based on your compliance framework selection, I recommend focusing on access control improvements first. This will have the highest impact on your overall compliance posture.",
      sender: 'ai',
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, newMessage, aiResponse]);
    setInputMessage('');
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-error bg-error/10 border-error/20';
      case 'medium': return 'text-warning bg-warning/10 border-warning/20';
      case 'low': return 'text-success bg-success/10 border-success/20';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getInsightColor = (type) => {
    switch (type) {
      case 'positive': return 'text-success';
      case 'warning': return 'text-warning';
      case 'info': return 'text-primary';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* AI Recommendations */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Sparkles" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">{t?.recommendations}</h3>
        </div>
        
        <div className="space-y-3">
          {aiRecommendations?.slice(0, 3)?.map(rec => (
            <div key={rec?.id} className={`p-4 rounded-lg border ${getPriorityColor(rec?.priority)}`}>
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Icon name={rec?.icon} size={16} />
                  <h4 className="font-medium">{rec?.title}</h4>
                </div>
                <span className={`px-2 py-0.5 text-xs rounded-full ${getPriorityColor(rec?.priority)}`}>
                  {rec?.priority}
                </span>
              </div>
              
              <p className="text-sm text-muted-foreground mb-3">{rec?.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex space-x-4 text-xs text-muted-foreground">
                  <span className="flex items-center space-x-1">
                    <Icon name="Tag" size={12} />
                    <span>{rec?.framework}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Icon name="Clock" size={12} />
                    <span>{rec?.estimatedEffort}</span>
                  </span>
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    {t?.viewDetails}
                  </Button>
                  <Button size="sm">
                    {t?.implement}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Brain" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">{t?.insights}</h3>
        </div>
        
        <div className="space-y-3">
          {aiInsights?.map(insight => (
            <div key={insight?.id} className="p-3 bg-muted/25 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name={insight?.icon} size={16} className={getInsightColor(insight?.type)} />
                <h4 className="font-medium text-foreground">{insight?.title}</h4>
              </div>
              <p className="text-sm text-muted-foreground">{insight?.insight}</p>
            </div>
          ))}
        </div>
      </div>

      {/* AI Chat Interface */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="MessageSquare" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">{t?.aiAssistant}</h3>
        </div>
        
        {/* Chat Messages */}
        {chatMessages?.length > 0 && (
          <div className="mb-4 max-h-60 overflow-y-auto space-y-2">
            {chatMessages?.map(message => (
              <div key={message?.id} className={`flex ${message?.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs p-3 rounded-lg ${
                  message?.sender === 'user' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-foreground'
                }`}>
                  <p className="text-sm">{message?.text}</p>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Chat Input */}
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder={t?.askQuestion}
            className="flex-1 px-3 py-2 bg-background border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
          <Button onClick={handleSendMessage} size="sm" iconName="Send">
            {t?.send}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ComplianceAssistantPanel;