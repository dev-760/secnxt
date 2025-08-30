import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const DeviceRegistrationForm = ({ onNext, onPrevious, currentLanguage, subscriptionTier = 'starter' }) => {
  const [connectedDevices, setConnectedDevices] = useState([]);
  const [isScanning, setIsScanning] = useState(false);

  const deviceLimits = {
    free: 5,
    starter: 25,
    professional: 100,
    enterprise: 'unlimited'
  };

  const mockDevices = [
    {
      id: 1,
      name: 'DESKTOP-ADMIN-01',
      type: 'windows',
      status: 'connected',
      ip: '192.168.1.100',
      lastSeen: new Date(Date.now() - 2 * 60 * 1000)
    },
    {
      id: 2,
      name: 'MacBook-Pro-Sarah',
      type: 'mac',
      status: 'connected',
      ip: '192.168.1.101',
      lastSeen: new Date(Date.now() - 5 * 60 * 1000)
    }
  ];

  useEffect(() => {
    // Simulate device discovery
    const timer = setTimeout(() => {
      setConnectedDevices(mockDevices);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const getLabels = () => {
    if (currentLanguage === 'ar') {
      return {
        title: 'تسجيل الأجهزة',
        subtitle: 'قم بتنزيل وتثبيت وكلاء الأمان على أجهزتك',
        downloadAgents: 'تنزيل الوكلاء',
        connectedDevices: 'الأجهزة المتصلة',
        deviceLimit: 'حد الأجهزة',
        scanForDevices: 'البحث عن الأجهزة',
        scanning: 'جاري البحث...',
        noDevices: 'لم يتم العثور على أجهزة متصلة',
        deviceStatus: {
          connected: 'متصل',
          disconnected: 'غير متصل',
          pending: 'في الانتظار'
        },
        instructions: 'قم بتنزيل وتثبيت الوكيل المناسب لنظام التشغيل الخاص بك. سيظهر الجهاز هنا تلقائياً بعد التثبيت.',
        qrCode: 'رمز QR للوصول السريع',
        previous: 'السابق',
        continue: 'متابعة',
        skipForNow: 'تخطي الآن'
      };
    } else if (currentLanguage === 'fr') {
      return {
        title: 'Enregistrement des Appareils',
        subtitle: 'Téléchargez et installez les agents de sécurité sur vos appareils',
        downloadAgents: 'Télécharger les Agents',
        connectedDevices: 'Appareils Connectés',
        deviceLimit: 'Limite d\'Appareils',
        scanForDevices: 'Rechercher des Appareils',
        scanning: 'Recherche en cours...',
        noDevices: 'Aucun appareil connecté trouvé',
        deviceStatus: {
          connected: 'Connecté',
          disconnected: 'Déconnecté',
          pending: 'En attente'
        },
        instructions: 'Téléchargez et installez l\'agent approprié pour votre système d\'exploitation. L\'appareil apparaîtra automatiquement ici après l\'installation.',
        qrCode: 'Code QR pour accès rapide',
        previous: 'Précédent',
        continue: 'Continuer',
        skipForNow: 'Ignorer pour l\'instant'
      };
    } else {
      return {
        title: 'Device Registration',
        subtitle: 'Download and install security agents on your devices',
        downloadAgents: 'Download Agents',
        connectedDevices: 'Connected Devices',
        deviceLimit: 'Device Limit',
        scanForDevices: 'Scan for Devices',
        scanning: 'Scanning...',
        noDevices: 'No connected devices found',
        deviceStatus: {
          connected: 'Connected',
          disconnected: 'Disconnected',
          pending: 'Pending'
        },
        instructions: 'Download and install the appropriate agent for your operating system. The device will automatically appear here after installation.',
        qrCode: 'QR Code for quick access',
        previous: 'Previous',
        continue: 'Continue',
        skipForNow: 'Skip for now'
      };
    }
  };

  const labels = getLabels();

  const downloadLinks = [
    {
      os: 'Windows',
      icon: 'Monitor',
      version: 'v2.1.0',
      size: '45 MB',
      url: '#',
      qrCode: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzAwMCIvPjxyZWN0IHg9IjEwIiB5PSIxMCIgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjZmZmIi8+PC9zdmc+'
    },
    {
      os: 'macOS',
      icon: 'Laptop',
      version: 'v2.1.0',
      size: '52 MB',
      url: '#',
      qrCode: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzAwMCIvPjxyZWN0IHg9IjE1IiB5PSIxNSIgd2lkdGg9IjcwIiBoZWlnaHQ9IjcwIiBmaWxsPSIjZmZmIi8+PC9zdmc+'
    },
    {
      os: 'Linux',
      icon: 'Server',
      version: 'v2.1.0',
      size: '38 MB',
      url: '#',
      qrCode: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzAwMCIvPjxyZWN0IHg9IjIwIiB5PSIyMCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjZmZmIi8+PC9zdmc+'
    }
  ];

  const handleScanDevices = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setConnectedDevices(mockDevices);
    }, 3000);
  };

  const getDeviceIcon = (type) => {
    switch (type) {
      case 'windows':
        return 'Monitor';
      case 'mac':
        return 'Laptop';
      case 'linux':
        return 'Server';
      default:
        return 'Smartphone';
    }
  };

  const formatLastSeen = (date) => {
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / (1000 * 60));
    
    if (minutes < 1) return currentLanguage === 'ar' ? 'الآن' : currentLanguage === 'fr' ? 'Maintenant' : 'Now';
    if (minutes < 60) return `${minutes}${currentLanguage === 'ar' ? ' د' : currentLanguage === 'fr' ? ' min' : 'm'}`;
    
    const hours = Math.floor(minutes / 60);
    return `${hours}${currentLanguage === 'ar' ? ' س' : currentLanguage === 'fr' ? ' h' : 'h'}`;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mx-auto mb-4">
          <Icon name="Download" size={32} className="text-accent" />
        </div>
        <h2 className="text-2xl font-semibold text-foreground mb-2">{labels?.title}</h2>
        <p className="text-muted-foreground">{labels?.subtitle}</p>
      </div>
      {/* Device Limit Info */}
      <div className="bg-card border border-border rounded-lg p-4 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon name="Shield" size={20} className="text-primary" />
            <span className="font-medium text-foreground">{labels?.deviceLimit}</span>
          </div>
          <div className="text-sm text-muted-foreground">
            {connectedDevices?.length} / {deviceLimits?.[subscriptionTier] === 'unlimited' ? '∞' : deviceLimits?.[subscriptionTier]}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Download Agents */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">{labels?.downloadAgents}</h3>
          <p className="text-sm text-muted-foreground mb-6">{labels?.instructions}</p>
          
          <div className="space-y-4">
            {downloadLinks?.map((agent) => (
              <div key={agent?.os} className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
                      <Icon name={agent?.icon} size={20} className="text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{agent?.os}</h4>
                      <p className="text-sm text-muted-foreground">{agent?.version} • {agent?.size}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" iconName="Download">
                    {currentLanguage === 'ar' ? 'تنزيل' : currentLanguage === 'fr' ? 'Télécharger' : 'Download'}
                  </Button>
                </div>
                
                <div className="flex items-center space-x-3 pt-3 border-t border-border">
                  <div className="w-12 h-12 bg-muted rounded border">
                    <img src={agent?.qrCode} alt={`QR Code for ${agent?.os}`} className="w-full h-full object-cover rounded" />
                  </div>
                  <span className="text-xs text-muted-foreground">{labels?.qrCode}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Connected Devices */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">{labels?.connectedDevices}</h3>
            <Button
              variant="outline"
              size="sm"
              iconName="Search"
              loading={isScanning}
              onClick={handleScanDevices}
            >
              {isScanning ? labels?.scanning : labels?.scanForDevices}
            </Button>
          </div>

          <div className="space-y-3">
            {connectedDevices?.length === 0 ? (
              <div className="bg-card border border-border rounded-lg p-8 text-center">
                <Icon name="Wifi" size={32} className="text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">{labels?.noDevices}</p>
              </div>
            ) : (
              connectedDevices?.map((device) => (
                <div key={device?.id} className="bg-card border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-10 h-10 bg-success/10 rounded-lg">
                        <Icon name={getDeviceIcon(device?.type)} size={20} className="text-success" />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">{device?.name}</h4>
                        <p className="text-sm text-muted-foreground">{device?.ip}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-2 mb-1">
                        <div className="w-2 h-2 bg-success rounded-full" />
                        <span className="text-sm font-medium text-success">{labels?.deviceStatus?.connected}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{formatLastSeen(device?.lastSeen)}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      {/* Navigation */}
      <div className="flex items-center justify-between pt-8 mt-8 border-t border-border">
        <Button variant="outline" iconName="ArrowLeft" onClick={onPrevious}>
          {labels?.previous}
        </Button>
        <div className="flex items-center space-x-3">
          <Button variant="ghost" onClick={onNext}>
            {labels?.skipForNow}
          </Button>
          <Button variant="default" iconName="ArrowRight" iconPosition="right" onClick={onNext}>
            {labels?.continue}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeviceRegistrationForm;