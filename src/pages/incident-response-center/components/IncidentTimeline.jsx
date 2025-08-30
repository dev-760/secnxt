import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const IncidentTimeline = ({ incidents, onIncidentSelect, selectedIncidentId }) => {
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [filterTimeRange, setFilterTimeRange] = useState('24h');

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

  const filteredIncidents = incidents?.filter(incident => {
    if (filterSeverity !== 'all' && incident?.severity !== filterSeverity) return false;
    if (filterType !== 'all' && incident?.type !== filterType) return false;
    
    if (filterTimeRange !== 'all') {
      const now = new Date();
      const timeRanges = {
        '1h': 60 * 60 * 1000,
        '24h': 24 * 60 * 60 * 1000,
        '7d': 7 * 24 * 60 * 60 * 1000,
        '30d': 30 * 24 * 60 * 60 * 1000
      };
      
      if (now - incident?.timestamp > timeRanges?.[filterTimeRange]) return false;
    }
    
    return true;
  });

  return (
    <div className="h-full flex flex-col bg-card border-r border-border">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Incident Timeline</h2>
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={16} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Live Feed</span>
            <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
          </div>
        </div>

        {/* Filters */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <select
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e?.target?.value)}
              className="px-3 py-1.5 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="all">All Severities</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            
            <select
              value={filterType}
              onChange={(e) => setFilterType(e?.target?.value)}
              className="px-3 py-1.5 bg-input border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            >
              <option value="all">All Types</option>
              <option value="malware">Malware</option>
              <option value="phishing">Phishing</option>
              <option value="intrusion">Intrusion</option>
              <option value="data_breach">Data Breach</option>
              <option value="ddos">DDoS</option>
            </select>
          </div>

          <div className="flex items-center space-x-1">
            {['1h', '24h', '7d', '30d', 'all']?.map((range) => (
              <button
                key={range}
                onClick={() => setFilterTimeRange(range)}
                className={`px-2 py-1 text-xs rounded-md transition-colors duration-200 ${
                  filterTimeRange === range
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                {range === 'all' ? 'All' : range?.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Timeline */}
      <div className="flex-1 overflow-y-auto">
        {filteredIncidents?.length === 0 ? (
          <div className="p-8 text-center">
            <Icon name="Shield" size={32} className="text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No incidents match your filters</p>
          </div>
        ) : (
          <div className="p-4 space-y-3">
            {filteredIncidents?.map((incident) => {
              const severityStyle = severityConfig?.[incident?.severity];
              const statusStyle = statusConfig?.[incident?.status];
              const isSelected = incident?.id === selectedIncidentId;

              return (
                <div
                  key={incident?.id}
                  onClick={() => onIncidentSelect(incident)}
                  className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                    isSelected
                      ? 'border-primary bg-primary/5 shadow-sm'
                      : 'border-border hover:border-border/60 hover:bg-muted/30'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`flex-shrink-0 p-1.5 rounded-full ${statusStyle?.bgColor}`}>
                      <Icon name={statusStyle?.icon} size={14} className={statusStyle?.color} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-sm font-medium text-foreground truncate">
                          {incident?.title}
                        </h3>
                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${severityStyle?.bgColor} ${severityStyle?.color}`}>
                          {incident?.severity?.toUpperCase()}
                        </span>
                      </div>
                      
                      <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                        {incident?.description}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center space-x-2">
                          <Icon name="Server" size={12} />
                          <span>{incident?.affectedSystems?.length} systems</span>
                        </div>
                        <span>{formatTimestamp(incident?.timestamp)}</span>
                      </div>
                      
                      {incident?.assignedTo && (
                        <div className="flex items-center space-x-1 mt-2">
                          <Icon name="User" size={12} className="text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{incident?.assignedTo}</span>
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
      {/* Stats Footer */}
      <div className="p-4 border-t border-border">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-lg font-semibold text-foreground">
              {filteredIncidents?.filter(i => i?.status === 'critical')?.length}
            </div>
            <div className="text-xs text-error">Critical</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-foreground">
              {filteredIncidents?.filter(i => i?.status === 'resolved')?.length}
            </div>
            <div className="text-xs text-success">Resolved</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncidentTimeline;