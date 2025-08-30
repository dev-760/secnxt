import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmergencyContactPanel = ({ isVisible, onClose }) => {
  const [selectedContact, setSelectedContact] = useState(null);

  const emergencyContacts = [
    {
      id: 1,
      name: 'Ahmed Benali',
      role: 'Security Lead',
      phone: '+212 6 12 34 56 78',
      email: 'ahmed.benali@company.ma',
      status: 'available',
      expertise: ['Malware Analysis', 'Incident Response']
    },
    {
      id: 2,
      name: 'Fatima Zahra',
      role: 'CISO',
      phone: '+212 6 87 65 43 21',
      email: 'fatima.zahra@company.ma',
      status: 'busy',
      expertise: ['Strategic Response', 'Executive Briefing']
    },
    {
      id: 3,
      name: 'Youssef Alami',
      role: 'Network Security',
      phone: '+212 6 11 22 33 44',
      email: 'youssef.alami@company.ma',
      status: 'available',
      expertise: ['Network Forensics', 'Firewall Management']
    },
    {
      id: 4,
      name: 'External SOC',
      role: '24/7 Security Operations',
      phone: '+212 5 22 00 11 22',
      email: 'soc@securitypartner.ma',
      status: 'available',
      expertise: ['24/7 Monitoring', 'Threat Intelligence']
    }
  ];

  const statusConfig = {
    available: { color: 'text-success', bgColor: 'bg-success/10', icon: 'CheckCircle' },
    busy: { color: 'text-warning', bgColor: 'bg-warning/10', icon: 'Clock' },
    offline: { color: 'text-muted-foreground', bgColor: 'bg-muted/10', icon: 'XCircle' }
  };

  const handleCall = (contact) => {
    // In a real app, this would initiate a call
    console.log(`Calling ${contact?.name} at ${contact?.phone}`);
  };

  const handleMessage = (contact) => {
    // In a real app, this would open messaging interface
    console.log(`Messaging ${contact?.name} at ${contact?.email}`);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-300 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg shadow-lg w-full max-w-2xl max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-error/10 rounded-lg">
              <Icon name="Phone" size={20} className="text-error" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Emergency Contacts</h2>
              <p className="text-sm text-muted-foreground">Immediate escalation and support</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            onClick={onClose}
          />
        </div>

        {/* Contacts List */}
        <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
          {emergencyContacts?.map((contact) => {
            const statusStyle = statusConfig?.[contact?.status];
            
            return (
              <div
                key={contact?.id}
                className="p-4 border border-border rounded-lg hover:bg-muted/20 transition-colors duration-200"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full text-primary font-medium">
                      {contact?.name?.split(' ')?.map(n => n?.[0])?.join('')}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-medium text-foreground">{contact?.name}</h3>
                        <div className={`flex items-center space-x-1 px-2 py-0.5 rounded-full ${statusStyle?.bgColor}`}>
                          <Icon name={statusStyle?.icon} size={12} className={statusStyle?.color} />
                          <span className={`text-xs font-medium ${statusStyle?.color}`}>
                            {contact?.status}
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-2">{contact?.role}</p>
                      
                      <div className="space-y-1 mb-3">
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Icon name="Phone" size={14} />
                          <span>{contact?.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Icon name="Mail" size={14} />
                          <span>{contact?.email}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mb-3">
                        {contact?.expertise?.map((skill, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="MessageSquare"
                      onClick={() => handleMessage(contact)}
                      disabled={contact?.status === 'offline'}
                    />
                    <Button
                      variant="default"
                      size="sm"
                      iconName="Phone"
                      onClick={() => handleCall(contact)}
                      disabled={contact?.status === 'offline'}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="p-6 border-t border-border bg-muted/20">
          <h3 className="text-sm font-medium text-foreground mb-3">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Button
              variant="outline"
              iconName="AlertTriangle"
              iconPosition="left"
              onClick={() => {}}
            >
              Activate Crisis Protocol
            </Button>
            <Button
              variant="outline"
              iconName="Users"
              iconPosition="left"
              onClick={() => {}}
            >
              Notify All Teams
            </Button>
            <Button
              variant="outline"
              iconName="FileText"
              iconPosition="left"
              onClick={() => {}}
            >
              Generate Incident Report
            </Button>
            <Button
              variant="outline"
              iconName="ExternalLink"
              iconPosition="left"
              onClick={() => {}}
            >
              Contact External SOC
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyContactPanel;