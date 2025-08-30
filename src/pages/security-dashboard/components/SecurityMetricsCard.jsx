import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityMetricsCard = ({ title, value, subtitle, trend, severity, icon, onClick }) => {
  const getSeverityColors = (severity) => {
    switch (severity) {
      case 'critical':
        return 'border-error bg-error/5 text-error';
      case 'high':
        return 'border-warning bg-warning/5 text-warning';
      case 'medium':
        return 'border-accent bg-accent/5 text-accent';
      case 'low': case'good':
        return 'border-success bg-success/5 text-success';
      default:
        return 'border-border bg-card text-foreground';
    }
  };

  const getTrendIcon = (trend) => {
    if (trend > 0) return { name: 'TrendingUp', color: 'text-success' };
    if (trend < 0) return { name: 'TrendingDown', color: 'text-error' };
    return { name: 'Minus', color: 'text-muted-foreground' };
  };

  const trendIcon = getTrendIcon(trend);

  return (
    <div 
      className={`p-6 rounded-lg border-2 transition-all duration-200 hover:shadow-lg cursor-pointer ${getSeverityColors(severity)}`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-background/50">
            <Icon name={icon} size={24} />
          </div>
          <h3 className="font-semibold text-lg">{title}</h3>
        </div>
        {trend !== undefined && (
          <div className={`flex items-center space-x-1 ${trendIcon?.color}`}>
            <Icon name={trendIcon?.name} size={16} />
            <span className="text-sm font-medium">{Math.abs(trend)}%</span>
          </div>
        )}
      </div>
      <div className="space-y-2">
        <div className="text-3xl font-bold">{value}</div>
        {subtitle && (
          <p className="text-sm opacity-80">{subtitle}</p>
        )}
      </div>
    </div>
  );
};

export default SecurityMetricsCard;