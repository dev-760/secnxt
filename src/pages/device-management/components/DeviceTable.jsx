import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DeviceTable = ({ devices, onDeviceSelect, onBulkAction, selectedDevices, onDeviceClick }) => {
  const [sortConfig, setSortConfig] = useState({ key: 'lastSeen', direction: 'desc' });

  const getStatusIcon = (status) => {
    switch (status) {
      case 'online':
        return { name: 'Wifi', color: 'text-success' };
      case 'offline':
        return { name: 'WifiOff', color: 'text-muted-foreground' };
      case 'warning':
        return { name: 'AlertTriangle', color: 'text-warning' };
      case 'critical':
        return { name: 'AlertCircle', color: 'text-error' };
      default:
        return { name: 'Circle', color: 'text-muted-foreground' };
    }
  };

  const getDeviceTypeIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'windows':
        return 'Monitor';
      case 'linux':
        return 'Server';
      case 'mac':
        return 'Laptop';
      case 'mobile':
        return 'Smartphone';
      default:
        return 'Monitor';
    }
  };

  const formatLastSeen = (timestamp) => {
    const now = new Date();
    const lastSeen = new Date(timestamp);
    const diffInMinutes = Math.floor((now - lastSeen) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig?.key === key && sortConfig?.direction === 'asc' ? 'desc' : 'asc'
    });
  };

  const sortedDevices = [...devices]?.sort((a, b) => {
    if (sortConfig?.key) {
      const aValue = a?.[sortConfig?.key];
      const bValue = b?.[sortConfig?.key];
      
      if (sortConfig?.direction === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    }
    return 0;
  });

  const handleSelectAll = (checked) => {
    if (checked) {
      onDeviceSelect(devices?.map(device => device?.id));
    } else {
      onDeviceSelect([]);
    }
  };

  const handleSelectDevice = (deviceId, checked) => {
    if (checked) {
      onDeviceSelect([...selectedDevices, deviceId]);
    } else {
      onDeviceSelect(selectedDevices?.filter(id => id !== deviceId));
    }
  };

  const isAllSelected = selectedDevices?.length === devices?.length && devices?.length > 0;
  const isPartiallySelected = selectedDevices?.length > 0 && selectedDevices?.length < devices?.length;

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Bulk Actions Bar */}
      {selectedDevices?.length > 0 && (
        <div className="bg-primary/10 border-b border-border p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-sm font-medium text-foreground">
                {selectedDevices?.length} device{selectedDevices?.length !== 1 ? 's' : ''} selected
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                iconName="Download"
                onClick={() => onBulkAction('update')}
              >
                Update Agents
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="Shield"
                onClick={() => onBulkAction('policy')}
              >
                Apply Policy
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="RotateCcw"
                onClick={() => onBulkAction('restart')}
              >
                Restart
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Table Header */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/30 border-b border-border">
            <tr>
              <th className="w-12 p-4">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  ref={(el) => {
                    if (el) el.indeterminate = isPartiallySelected;
                  }}
                  onChange={(e) => handleSelectAll(e?.target?.checked)}
                  className="rounded border-border"
                />
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  <span>Device Name</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('type')}
                  className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  <span>Type</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left p-4">
                <span className="text-sm font-medium text-muted-foreground">IP Address</span>
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('lastSeen')}
                  className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  <span>Last Seen</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left p-4">
                <span className="text-sm font-medium text-muted-foreground">Agent Version</span>
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('status')}
                  className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  <span>Status</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-right p-4">
                <span className="text-sm font-medium text-muted-foreground">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sortedDevices?.map((device) => {
              const statusIcon = getStatusIcon(device?.status);
              const isSelected = selectedDevices?.includes(device?.id);
              
              return (
                <tr
                  key={device?.id}
                  className={`hover:bg-muted/30 transition-colors duration-200 ${
                    isSelected ? 'bg-primary/5' : ''
                  }`}
                >
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={(e) => handleSelectDevice(device?.id, e?.target?.checked)}
                      className="rounded border-border"
                    />
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => onDeviceClick(device)}
                      className="flex items-center space-x-3 text-left hover:text-primary transition-colors duration-200"
                    >
                      <div className="flex items-center justify-center w-8 h-8 bg-muted rounded-lg">
                        <Icon name={getDeviceTypeIcon(device?.type)} size={16} className="text-muted-foreground" />
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{device?.name}</div>
                        <div className="text-sm text-muted-foreground">{device?.location}</div>
                      </div>
                    </button>
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-muted/50 text-muted-foreground">
                      {device?.type}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-foreground font-mono">{device?.ipAddress}</span>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-muted-foreground">
                      {formatLastSeen(device?.lastSeen)}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-muted-foreground">{device?.agentVersion}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <Icon name={statusIcon?.name} size={16} className={statusIcon?.color} />
                      <span className={`text-sm font-medium capitalize ${statusIcon?.color}`}>
                        {device?.status}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="MoreHorizontal"
                        onClick={() => onDeviceClick(device)}
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {devices?.length === 0 && (
        <div className="p-12 text-center">
          <Icon name="Monitor" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No devices found</h3>
          <p className="text-muted-foreground">
            No devices match your current filters. Try adjusting your search criteria.
          </p>
        </div>
      )}
    </div>
  );
};

export default DeviceTable;