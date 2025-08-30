import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UserDetailModal = ({ user, isOpen, onClose, currentLanguage }) => {
  const [activeTab, setActiveTab] = useState('details');
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    role: user?.role || '',
    department: user?.department || '',
    phone: '+1 (555) 123-4567',
    location: 'New York, US',
    status: user?.status || 'active'
  });

  const content = {
    en: {
      editUser: 'Edit User',
      userDetails: 'User Details',
      securitySettings: 'Security Settings',
      accessHistory: 'Access History',
      save: 'Save Changes',
      cancel: 'Cancel',
      name: 'Full Name',
      email: 'Email Address',
      role: 'Role',
      department: 'Department',
      phone: 'Phone Number',
      location: 'Location',
      status: 'Account Status',
      mfaEnabled: 'Multi-Factor Authentication',
      passwordReset: 'Require Password Reset',
      accountLocked: 'Account Locked',
      sessionTimeout: 'Session Timeout',
      ipRestrictions: 'IP Restrictions',
      recentLogins: 'Recent Login Attempts',
      failedAttempts: 'Failed Login Attempts',
      suspicious: 'Suspicious Activity Detected'
    },
    ar: {
      editUser: 'تعديل المستخدم',
      userDetails: 'تفاصيل المستخدم',
      securitySettings: 'إعدادات الأمان',
      accessHistory: 'تاريخ الوصول',
      save: 'حفظ التغييرات',
      cancel: 'إلغاء',
      name: 'الاسم الكامل',
      email: 'عنوان البريد الإلكتروني',
      role: 'الدور',
      department: 'القسم',
      phone: 'رقم الهاتف',
      location: 'الموقع',
      status: 'حالة الحساب',
      mfaEnabled: 'المصادقة متعددة العوامل',
      passwordReset: 'طلب إعادة تعيين كلمة المرور',
      accountLocked: 'الحساب مقفل',
      sessionTimeout: 'مهلة الجلسة',
      ipRestrictions: 'قيود IP',
      recentLogins: 'محاولات تسجيل الدخول الأخيرة',
      failedAttempts: 'محاولات تسجيل الدخول الفاشلة',
      suspicious: 'تم اكتشاف نشاط مشبوه'
    },
    fr: {
      editUser: 'Modifier l\'Utilisateur',
      userDetails: 'Détails de l\'Utilisateur',
      securitySettings: 'Paramètres de Sécurité',
      accessHistory: 'Historique d\'Accès',
      save: 'Enregistrer les Modifications',
      cancel: 'Annuler',
      name: 'Nom Complet',
      email: 'Adresse Email',
      role: 'Rôle',
      department: 'Département',
      phone: 'Numéro de Téléphone',
      location: 'Localisation',
      status: 'Statut du Compte',
      mfaEnabled: 'Authentification Multi-Facteurs',
      passwordReset: 'Exiger la Réinitialisation du Mot de Passe',
      accountLocked: 'Compte Verrouillé',
      sessionTimeout: 'Délai d\'Expiration de Session',
      ipRestrictions: 'Restrictions IP',
      recentLogins: 'Tentatives de Connexion Récentes',
      failedAttempts: 'Tentatives de Connexion Échouées',
      suspicious: 'Activité Suspecte Détectée'
    }
  };

  const t = content?.[currentLanguage];

  const tabs = [
    { id: 'details', label: t?.userDetails, icon: 'User' },
    { id: 'security', label: t?.securitySettings, icon: 'Shield' },
    { id: 'history', label: t?.accessHistory, icon: 'Clock' }
  ];

  const recentActivity = [
    {
      id: 1,
      action: 'Successful login',
      timestamp: '2025-01-30T14:30:00Z',
      location: 'New York, US',
      ip: '192.168.1.100',
      device: 'Chrome on Windows',
      risk: 'low'
    },
    {
      id: 2,
      action: 'Failed login attempt',
      timestamp: '2025-01-30T12:15:00Z',
      location: 'Unknown',
      ip: '203.0.113.1',
      device: 'Unknown',
      risk: 'high'
    },
    {
      id: 3,
      action: 'Password changed',
      timestamp: '2025-01-29T16:20:00Z',
      location: 'New York, US',
      ip: '192.168.1.100',
      device: 'Chrome on Windows',
      risk: 'low'
    }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Handle save logic here
    console.log('Saving user data:', formData);
    onClose?.();
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'high': return 'text-error';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={onClose}
        />
        
        {/* Modal */}
        <div className="relative bg-card border border-border rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon name="User" size={24} className="text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">{t?.editUser}</h2>
                <p className="text-sm text-muted-foreground">{user?.name}</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-muted transition-colors duration-200"
            >
              <Icon name="X" size={20} className="text-muted-foreground" />
            </button>
          </div>

          {/* Tabs */}
          <div className="border-b border-border">
            <div className="flex space-x-0">
              {tabs?.map(tab => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center space-x-2 px-6 py-3 border-b-2 transition-colors duration-200 ${
                    activeTab === tab?.id
                      ? 'border-primary text-primary'
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon name={tab?.icon} size={16} />
                  <span className="font-medium">{tab?.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-6 max-h-96 overflow-y-auto">
            {activeTab === 'details' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {t?.name}
                    </label>
                    <input
                      type="text"
                      value={formData?.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {t?.email}
                    </label>
                    <input
                      type="email"
                      value={formData?.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {t?.role}
                    </label>
                    <select
                      value={formData?.role}
                      onChange={(e) => handleInputChange('role', e.target.value)}
                      className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    >
                      <option value="Administrator">Administrator</option>
                      <option value="Security Manager">Security Manager</option>
                      <option value="Security Analyst">Security Analyst</option>
                      <option value="Compliance Officer">Compliance Officer</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {t?.department}
                    </label>
                    <select
                      value={formData?.department}
                      onChange={(e) => handleInputChange('department', e.target.value)}
                      className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    >
                      <option value="IT Security">IT Security</option>
                      <option value="Operations">Operations</option>
                      <option value="Legal">Legal</option>
                      <option value="HR">HR</option>
                      <option value="Finance">Finance</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {t?.phone}
                    </label>
                    <input
                      type="tel"
                      value={formData?.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {t?.location}
                    </label>
                    <input
                      type="text"
                      value={formData?.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {t?.status}
                    </label>
                    <select
                      value={formData?.status}
                      onChange={(e) => handleInputChange('status', e.target.value)}
                      className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="pending">Pending</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div>
                        <h4 className="font-medium text-foreground">{t?.mfaEnabled}</h4>
                        <p className="text-sm text-muted-foreground">Enhance account security</p>
                      </div>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div>
                        <h4 className="font-medium text-foreground">{t?.passwordReset}</h4>
                        <p className="text-sm text-muted-foreground">Force password change on next login</p>
                      </div>
                      <input type="checkbox" className="rounded" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div>
                        <h4 className="font-medium text-foreground">{t?.accountLocked}</h4>
                        <p className="text-sm text-muted-foreground">Temporarily disable account access</p>
                      </div>
                      <input type="checkbox" className="rounded" />
                    </div>
                    <div className="p-4 border border-border rounded-lg">
                      <h4 className="font-medium text-foreground mb-2">{t?.sessionTimeout}</h4>
                      <select className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground">
                        <option value="15">15 minutes</option>
                        <option value="30">30 minutes</option>
                        <option value="60" selected>1 hour</option>
                        <option value="240">4 hours</option>
                        <option value="480">8 hours</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'history' && (
              <div className="space-y-4">
                <div className="bg-warning/10 border border-warning/20 rounded-lg p-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <Icon name="AlertTriangle" size={16} className="text-warning" />
                    <span className="text-sm font-medium text-warning">{t?.suspicious}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Multiple failed login attempts detected from unknown location
                  </p>
                </div>
                
                {recentActivity?.map(activity => (
                  <div key={activity?.id} className="border border-border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <Icon 
                          name={activity?.risk === 'high' ? 'AlertTriangle' : 'Check'} 
                          size={16} 
                          className={getRiskColor(activity?.risk)} 
                        />
                        <span className="font-medium text-foreground">{activity?.action}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {formatDateTime(activity?.timestamp)}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm text-muted-foreground">
                      <div>
                        <span className="font-medium">Location:</span> {activity?.location}
                      </div>
                      <div>
                        <span className="font-medium">IP:</span> {activity?.ip}
                      </div>
                      <div>
                        <span className="font-medium">Device:</span> {activity?.device}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
            <Button variant="outline" onClick={onClose}>
              {t?.cancel}
            </Button>
            <Button onClick={handleSave} iconName="Save">
              {t?.save}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailModal;