import React from 'react';
import Icon from '../../../components/AppIcon';

const ComplianceStatusCards = ({ selectedFramework, currentLanguage }) => {
  const content = {
    en: {
      overallCompliance: 'Overall Compliance',
      soc2Status: 'SOC 2 Status',
      cndpStatus: 'CNDP Status',
      upcomingAudits: 'Upcoming Audits',
      certificationLevel: 'Certification Level',
      lastAudit: 'Last Audit',
      nextAudit: 'Next Audit',
      complianceGap: 'Compliance Gaps',
      actionItems: 'Action Items',
      daysUntil: 'days until next audit'
    },
    ar: {
      overallCompliance: 'الامتثال العام',
      soc2Status: 'حالة SOC 2',
      cndpStatus: 'حالة CNDP',
      upcomingAudits: 'التدقيقات القادمة',
      certificationLevel: 'مستوى الشهادة',
      lastAudit: 'آخر تدقيق',
      nextAudit: 'التدقيق التالي',
      complianceGap: 'فجوات الامتثال',
      actionItems: 'عناصر العمل',
      daysUntil: 'أيام حتى التدقيق التالي'
    },
    fr: {
      overallCompliance: 'Conformité Globale',
      soc2Status: 'Statut SOC 2',
      cndpStatus: 'Statut CNDP',
      upcomingAudits: 'Audits à Venir',
      certificationLevel: 'Niveau de Certification',
      lastAudit: 'Dernier Audit',
      nextAudit: 'Prochain Audit',
      complianceGap: 'Écarts de Conformité',
      actionItems: 'Éléments d\'Action',
      daysUntil: 'jours jusqu\'au prochain audit'
    }
  };

  const t = content?.[currentLanguage];

  const complianceData = {
    overall: {
      percentage: 87,
      status: 'good',
      trend: 5,
      gaps: 8,
      actionItems: 23
    },
    soc2: {
      percentage: 92,
      status: 'excellent',
      lastAudit: '2024-08-15',
      nextAudit: '2025-02-15',
      daysUntilNext: 45
    },
    cndp: {
      percentage: 78,
      status: 'needs-improvement',
      lastAudit: '2024-06-10',
      nextAudit: '2025-03-10',
      daysUntilNext: 89
    },
    iso27001: {
      percentage: 89,
      status: 'good',
      lastAudit: '2024-09-20',
      nextAudit: '2025-03-20',
      daysUntilNext: 99
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'excellent': return { bg: 'bg-success/10', text: 'text-success', border: 'border-success/20' };
      case 'good': return { bg: 'bg-primary/10', text: 'text-primary', border: 'border-primary/20' };
      case 'needs-improvement': return { bg: 'bg-warning/10', text: 'text-warning', border: 'border-warning/20' };
      case 'poor': return { bg: 'bg-error/10', text: 'text-error', border: 'border-error/20' };
      default: return { bg: 'bg-muted', text: 'text-muted-foreground', border: 'border-border' };
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'excellent': return 'Excellent';
      case 'good': return 'Good';
      case 'needs-improvement': return 'Needs Improvement';
      case 'poor': return 'Poor';
      default: return 'Unknown';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const statusCards = [
    {
      title: t?.overallCompliance,
      value: `${complianceData?.overall?.percentage}%`,
      subtitle: `${complianceData?.overall?.gaps} gaps, ${complianceData?.overall?.actionItems} action items`,
      icon: 'Shield',
      status: complianceData?.overall?.status,
      trend: complianceData?.overall?.trend
    },
    {
      title: t?.soc2Status,
      value: `${complianceData?.soc2?.percentage}%`,
      subtitle: `${complianceData?.soc2?.daysUntilNext} ${t?.daysUntil}`,
      icon: 'FileCheck',
      status: complianceData?.soc2?.status,
      details: {
        lastAudit: formatDate(complianceData?.soc2?.lastAudit),
        nextAudit: formatDate(complianceData?.soc2?.nextAudit)
      }
    },
    {
      title: t?.cndpStatus,
      value: `${complianceData?.cndp?.percentage}%`,
      subtitle: `${complianceData?.cndp?.daysUntilNext} ${t?.daysUntil}`,
      icon: 'Scale',
      status: complianceData?.cndp?.status,
      details: {
        lastAudit: formatDate(complianceData?.cndp?.lastAudit),
        nextAudit: formatDate(complianceData?.cndp?.nextAudit)
      }
    },
    {
      title: 'ISO 27001',
      value: `${complianceData?.iso27001?.percentage}%`,
      subtitle: `${complianceData?.iso27001?.daysUntilNext} ${t?.daysUntil}`,
      icon: 'Award',
      status: complianceData?.iso27001?.status,
      details: {
        lastAudit: formatDate(complianceData?.iso27001?.lastAudit),
        nextAudit: formatDate(complianceData?.iso27001?.nextAudit)
      }
    }
  ];

  const filteredCards = selectedFramework === 'all' 
    ? statusCards 
    : statusCards?.filter(card => {
        if (selectedFramework === 'soc2') return card?.title?.includes('SOC 2') || card?.title?.includes(t?.overallCompliance);
        if (selectedFramework === 'cndp') return card?.title?.includes('CNDP') || card?.title?.includes(t?.overallCompliance);
        if (selectedFramework === 'iso27001') return card?.title?.includes('ISO 27001') || card?.title?.includes(t?.overallCompliance);
        return true;
      });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {filteredCards?.map((card, index) => {
        const statusStyle = getStatusColor(card?.status);
        
        return (
          <div key={index} className={`bg-card border ${statusStyle?.border} rounded-lg p-6`}>
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${statusStyle?.bg}`}>
                <Icon name={card?.icon} size={24} className={statusStyle?.text} />
              </div>
              {card?.trend && (
                <div className="flex items-center space-x-1">
                  <Icon 
                    name={card?.trend > 0 ? "TrendingUp" : "TrendingDown"} 
                    size={16} 
                    className={card?.trend > 0 ? "text-success" : "text-error"} 
                  />
                  <span className={`text-sm font-medium ${card?.trend > 0 ? "text-success" : "text-error"}`}>
                    {Math.abs(card?.trend)}%
                  </span>
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">{card?.title}</h3>
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-bold text-foreground">{card?.value}</span>
                <span className={`text-sm px-2 py-0.5 rounded ${statusStyle?.bg} ${statusStyle?.text}`}>
                  {getStatusLabel(card?.status)}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{card?.subtitle}</p>
              
              {card?.details && (
                <div className="mt-3 pt-3 border-t border-border space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">{t?.lastAudit}:</span>
                    <span className="text-foreground">{card?.details?.lastAudit}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">{t?.nextAudit}:</span>
                    <span className="text-foreground">{card?.details?.nextAudit}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Progress bar for compliance percentage */}
            <div className="mt-4">
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    card?.status === 'excellent' ? 'bg-success' :
                    card?.status === 'good' ? 'bg-primary' :
                    card?.status === 'needs-improvement' ? 'bg-warning' : 'bg-error'
                  }`}
                  style={{ width: card?.value }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ComplianceStatusCards;