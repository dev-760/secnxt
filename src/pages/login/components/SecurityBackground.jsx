import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityBackground = () => {
  const securityElements = [
    { icon: 'Shield', position: 'top-20 left-20', size: 24, opacity: 0.1 },
    { icon: 'Lock', position: 'top-40 right-32', size: 20, opacity: 0.08 },
    { icon: 'Eye', position: 'bottom-32 left-16', size: 28, opacity: 0.12 },
    { icon: 'Zap', position: 'top-60 left-1/4', size: 22, opacity: 0.09 },
    { icon: 'AlertTriangle', position: 'bottom-20 right-20', size: 26, opacity: 0.1 },
    { icon: 'Cpu', position: 'top-32 right-1/4', size: 24, opacity: 0.08 },
    { icon: 'Network', position: 'bottom-40 left-1/3', size: 20, opacity: 0.11 },
    { icon: 'Database', position: 'top-1/2 right-16', size: 22, opacity: 0.09 }
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
      {/* Floating Security Icons */}
      {securityElements?.map((element, index) => (
        <div
          key={index}
          className={`absolute ${element?.position} animate-float`}
          style={{
            animationDelay: `${index * 0.5}s`,
            animationDuration: `${4 + (index % 3)}s`
          }}
        >
          <Icon
            name={element?.icon}
            size={element?.size}
            className="text-primary"
            style={{ opacity: element?.opacity }}
          />
        </div>
      ))}
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>
      {/* Subtle Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
    </div>
  );
};

export default SecurityBackground;