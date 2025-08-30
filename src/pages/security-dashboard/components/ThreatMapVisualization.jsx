import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ThreatMapVisualization = ({ threats = [] }) => {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [viewMode, setViewMode] = useState('global');

  const mockThreatData = threats?.length > 0 ? threats : [
    {
      id: 1,
      country: 'Morocco',
      city: 'Casablanca',
      threatCount: 12,
      severity: 'medium',
      coordinates: { lat: 33.5731, lng: -7.5898 },
      threats: ['Phishing', 'Malware', 'Suspicious Login']
    },
    {
      id: 2,
      country: 'France',
      city: 'Paris',
      threatCount: 8,
      severity: 'low',
      coordinates: { lat: 48.8566, lng: 2.3522 },
      threats: ['Brute Force', 'Port Scan']
    },
    {
      id: 3,
      country: 'Russia',
      city: 'Moscow',
      threatCount: 45,
      severity: 'critical',
      coordinates: { lat: 55.7558, lng: 37.6176 },
      threats: ['Advanced Persistent Threat', 'Data Exfiltration', 'Ransomware']
    },
    {
      id: 4,
      country: 'China',
      city: 'Beijing',
      threatCount: 32,
      severity: 'high',
      coordinates: { lat: 39.9042, lng: 116.4074 },
      threats: ['State-sponsored Attack', 'Zero-day Exploit']
    },
    {
      id: 5,
      country: 'United States',
      city: 'New York',
      threatCount: 18,
      severity: 'medium',
      coordinates: { lat: 40.7128, lng: -74.0060 },
      threats: ['Credential Stuffing', 'DDoS']
    }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return '#FF3547';
      case 'high': return '#FF8F00';
      case 'medium': return '#00D9FF';
      case 'low': return '#00C851';
      default: return '#A0A3A8';
    }
  };

  const getSeveritySize = (threatCount) => {
    if (threatCount > 40) return 20;
    if (threatCount > 20) return 16;
    if (threatCount > 10) return 12;
    return 8;
  };

  const [realTimeThreats, setRealTimeThreats] = useState([]);

  useEffect(() => {
    // Simulate real-time threat updates
    const interval = setInterval(() => {
      const newThreat = {
        id: Date.now(),
        timestamp: new Date(),
        source: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
        type: ['Malware', 'Phishing', 'Brute Force', 'Port Scan']?.[Math.floor(Math.random() * 4)],
        severity: ['low', 'medium', 'high', 'critical']?.[Math.floor(Math.random() * 4)]
      };
      
      setRealTimeThreats(prev => [newThreat, ...prev?.slice(0, 9)]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Icon name="Globe" size={24} className="text-primary" />
          <div>
            <h2 className="text-xl font-semibold text-card-foreground">Global Threat Map</h2>
            <p className="text-sm text-muted-foreground">Real-time threat intelligence</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === 'global' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('global')}
          >
            Global
          </Button>
          <Button
            variant={viewMode === 'regional' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('regional')}
          >
            Regional
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Visualization */}
        <div className="lg:col-span-2">
          <div className="relative bg-background/50 rounded-lg border border-border p-4 h-80">
            {/* Mock World Map */}
            <div className="absolute inset-0 flex items-center justify-center">
              <iframe
                width="100%"
                height="100%"
                loading="lazy"
                title="Global Threat Map"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps?q=33.5731,-7.5898&z=2&output=embed"
                className="rounded-lg"
              />
            </div>

            {/* Threat Indicators Overlay */}
            <div className="absolute inset-0 pointer-events-none">
              {mockThreatData?.map((threat) => (
                <div
                  key={threat?.id}
                  className="absolute animate-pulse"
                  style={{
                    left: `${(threat?.coordinates?.lng + 180) * (100 / 360)}%`,
                    top: `${(90 - threat?.coordinates?.lat) * (100 / 180)}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  <div
                    className="rounded-full border-2 border-white shadow-lg cursor-pointer pointer-events-auto"
                    style={{
                      backgroundColor: getSeverityColor(threat?.severity),
                      width: getSeveritySize(threat?.threatCount),
                      height: getSeveritySize(threat?.threatCount)
                    }}
                    onClick={() => setSelectedRegion(threat)}
                    title={`${threat?.city}, ${threat?.country}: ${threat?.threatCount} threats`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="mt-4 flex items-center justify-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-success"></div>
              <span className="text-muted-foreground">Low Risk</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-accent"></div>
              <span className="text-muted-foreground">Medium Risk</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-warning"></div>
              <span className="text-muted-foreground">High Risk</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-error"></div>
              <span className="text-muted-foreground">Critical Risk</span>
            </div>
          </div>
        </div>

        {/* Threat Details Panel */}
        <div className="space-y-4">
          {/* Real-time Feed */}
          <div className="bg-background/50 rounded-lg border border-border p-4">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <h3 className="font-semibold text-card-foreground">Live Threats</h3>
            </div>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {realTimeThreats?.slice(0, 5)?.map((threat) => (
                <div key={threat?.id} className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: getSeverityColor(threat?.severity) }}
                    ></div>
                    <span className="text-card-foreground">{threat?.type}</span>
                  </div>
                  <span className="text-muted-foreground text-xs">
                    {threat?.timestamp?.toLocaleTimeString()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Region Details */}
          {selectedRegion ? (
            <div className="bg-background/50 rounded-lg border border-border p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-card-foreground">
                  {selectedRegion?.city}, {selectedRegion?.country}
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="X"
                  onClick={() => setSelectedRegion(null)}
                />
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total Threats</span>
                  <span className="font-semibold text-card-foreground">{selectedRegion?.threatCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Severity Level</span>
                  <span
                    className="px-2 py-1 text-xs font-medium rounded-full"
                    style={{
                      backgroundColor: `${getSeverityColor(selectedRegion?.severity)}20`,
                      color: getSeverityColor(selectedRegion?.severity)
                    }}
                  >
                    {selectedRegion?.severity?.toUpperCase()}
                  </span>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Threat Types</span>
                  <div className="mt-1 space-y-1">
                    {selectedRegion?.threats?.map((threat, index) => (
                      <div key={index} className="text-sm text-card-foreground">
                        • {threat}
                      </div>
                    ))}
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-3">
                  Block Region
                </Button>
              </div>
            </div>
          ) : (
            <div className="bg-background/50 rounded-lg border border-border p-4 text-center">
              <Icon name="MapPin" size={32} className="text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                Click on a threat indicator to view details
              </p>
            </div>
          )}

          {/* Quick Stats */}
          <div className="bg-background/50 rounded-lg border border-border p-4">
            <h3 className="font-semibold text-card-foreground mb-3">Global Statistics</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Active Threats</span>
                <span className="font-semibold text-error">115</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Blocked IPs</span>
                <span className="font-semibold text-success">1,247</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Countries</span>
                <span className="font-semibold text-accent">23</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreatMapVisualization;