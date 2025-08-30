import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const DeviceFilters = ({ onFilterChange, onSearchChange, filters }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const deviceTypeOptions = [
    { value: 'all', label: 'All Device Types' },
    { value: 'windows', label: 'Windows' },
    { value: 'linux', label: 'Linux' },
    { value: 'mac', label: 'macOS' },
    { value: 'mobile', label: 'Mobile' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'online', label: 'Online' },
    { value: 'offline', label: 'Offline' },
    { value: 'warning', label: 'Warning' },
    { value: 'critical', label: 'Critical' }
  ];

  const complianceOptions = [
    { value: 'all', label: 'All Compliance' },
    { value: 'compliant', label: 'Compliant' },
    { value: 'non-compliant', label: 'Non-Compliant' },
    { value: 'pending', label: 'Pending Review' }
  ];

  const locationOptions = [
    { value: 'all', label: 'All Locations' },
    { value: 'casablanca', label: 'Casablanca Office' },
    { value: 'rabat', label: 'Rabat Branch' },
    { value: 'marrakech', label: 'Marrakech Site' },
    { value: 'remote', label: 'Remote Workers' }
  ];

  const handleFilterChange = (key, value) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Icon name="Filter" size={20} className="text-muted-foreground" />
          <h3 className="font-medium text-foreground">Filters</h3>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center space-x-2 text-sm text-primary hover:text-primary/80 transition-colors duration-200"
        >
          <span>{isExpanded ? 'Hide Filters' : 'Show All Filters'}</span>
          <Icon 
            name={isExpanded ? "ChevronUp" : "ChevronDown"} 
            size={16} 
          />
        </button>
      </div>
      <div className="space-y-4">
        {/* Search */}
        <div className="w-full">
          <Input
            type="search"
            placeholder="Search devices by name, IP, or location..."
            onChange={(e) => onSearchChange(e?.target?.value)}
            className="w-full"
          />
        </div>

        {/* Quick Filters */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleFilterChange('status', 'online')}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 ${
              filters?.status === 'online' ?'bg-success/20 text-success border border-success/30' :'bg-muted/50 text-muted-foreground hover:bg-muted'
            }`}
          >
            <Icon name="Wifi" size={14} className="inline mr-1" />
            Online Only
          </button>
          <button
            onClick={() => handleFilterChange('compliance', 'non-compliant')}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 ${
              filters?.compliance === 'non-compliant' ?'bg-error/20 text-error border border-error/30' :'bg-muted/50 text-muted-foreground hover:bg-muted'
            }`}
          >
            <Icon name="AlertTriangle" size={14} className="inline mr-1" />
            Non-Compliant
          </button>
          <button
            onClick={() => handleFilterChange('type', 'windows')}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 ${
              filters?.type === 'windows'
                ? 'bg-primary/20 text-primary border border-primary/30' :'bg-muted/50 text-muted-foreground hover:bg-muted'
            }`}
          >
            <Icon name="Monitor" size={14} className="inline mr-1" />
            Windows
          </button>
        </div>

        {/* Advanced Filters */}
        {isExpanded && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-border">
            <Select
              label="Device Type"
              options={deviceTypeOptions}
              value={filters?.type}
              onChange={(value) => handleFilterChange('type', value)}
            />
            <Select
              label="Status"
              options={statusOptions}
              value={filters?.status}
              onChange={(value) => handleFilterChange('status', value)}
            />
            <Select
              label="Compliance"
              options={complianceOptions}
              value={filters?.compliance}
              onChange={(value) => handleFilterChange('compliance', value)}
            />
            <Select
              label="Location"
              options={locationOptions}
              value={filters?.location}
              onChange={(value) => handleFilterChange('location', value)}
            />
          </div>
        )}

        {/* Clear Filters */}
        <div className="flex justify-end pt-2">
          <button
            onClick={() => onFilterChange({
              type: 'all',
              status: 'all',
              compliance: 'all',
              location: 'all'
            })}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            Clear all filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeviceFilters;