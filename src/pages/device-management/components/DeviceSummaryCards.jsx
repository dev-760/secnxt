import React from 'react';
import Icon from '../../../components/AppIcon';

const DeviceSummaryCards = ({ deviceStats, subscriptionTier }) => {
  const summaryCards = [
    {
      title: "Total Devices",
      value: deviceStats?.total,
      limit: deviceStats?.limit,
      icon: "Monitor",
      color: "text-accent",
      bgColor: "bg-accent/10"
    },
    {
      title: "Online Devices",
      value: deviceStats?.online,
      percentage: Math.round((deviceStats?.online / deviceStats?.total) * 100),
      icon: "Wifi",
      color: "text-success",
      bgColor: "bg-success/10"
    },
    {
      title: "Security Compliant",
      value: deviceStats?.compliant,
      percentage: Math.round((deviceStats?.compliant / deviceStats?.total) * 100),
      icon: "Shield",
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      title: "Pending Updates",
      value: deviceStats?.pendingUpdates,
      icon: "Download",
      color: "text-warning",
      bgColor: "bg-warning/10"
    }
  ];

  const getUsageColor = (current, limit) => {
    const percentage = (current / limit) * 100;
    if (percentage >= 90) return "text-error";
    if (percentage >= 75) return "text-warning";
    return "text-success";
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {summaryCards?.map((card, index) => (
        <div key={index} className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-lg ${card?.bgColor}`}>
              <Icon name={card?.icon} size={24} className={card?.color} />
            </div>
            {card?.limit && (
              <div className="text-right">
                <span className="text-xs text-muted-foreground uppercase tracking-wide">
                  {subscriptionTier} Plan
                </span>
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">{card?.title}</h3>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-bold text-foreground">{card?.value}</span>
              {card?.limit && (
                <span className={`text-sm font-medium ${getUsageColor(card?.value, card?.limit)}`}>
                  / {card?.limit === 999999 ? '∞' : card?.limit}
                </span>
              )}
              {card?.percentage && (
                <span className="text-sm text-muted-foreground">
                  ({card?.percentage}%)
                </span>
              )}
            </div>
            
            {card?.limit && card?.limit !== 999999 && (
              <div className="mt-3">
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>Usage</span>
                  <span>{Math.round((card?.value / card?.limit) * 100)}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      (card?.value / card?.limit) >= 0.9 ? 'bg-error' :
                      (card?.value / card?.limit) >= 0.75 ? 'bg-warning' : 'bg-success'
                    }`}
                    style={{ width: `${Math.min((card?.value / card?.limit) * 100, 100)}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DeviceSummaryCards;