import React, { useState } from 'react';

import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SecurityPreferencesForm = ({ formData, onFormDataChange, onNext, onPrevious, currentLanguage }) => {
  const [errors, setErrors] = useState({});

  const complianceOptions = [
    { 
      value: 'cndp', 
      label: currentLanguage === 'ar' ? 'CNDP (قانون حماية البيانات المغربي)' : currentLanguage === 'fr' ? 'CNDP (Loi marocaine sur la protection des données)' : 'CNDP (Morocco Data Protection Law)' 
    },
    { 
      value: 'soc2', 
      label: currentLanguage === 'ar' ? 'SOC 2 (معايير الأمان التشغيلي)' : currentLanguage === 'fr' ? 'SOC 2 (Normes de sécurité opérationnelle)' : 'SOC 2 (System and Organization Controls)' 
    },
    { 
      value: 'iso27001', 
      label: currentLanguage === 'ar' ? 'ISO 27001 (إدارة أمن المعلومات)' : currentLanguage === 'fr' ? 'ISO 27001 (Gestion de la sécurité de l\'information)' : 'ISO 27001 (Information Security Management)' 
    },
    { 
      value: 'gdpr', 
      label: currentLanguage === 'ar' ? 'GDPR (اللائحة الأوروبية لحماية البيانات)' : currentLanguage === 'fr' ? 'RGPD (Règlement européen sur la protection des données)' : 'GDPR (General Data Protection Regulation)' 
    }
  ];

  const scanFrequencyOptions = [
    { value: 'daily', label: currentLanguage === 'ar' ? 'يومياً' : currentLanguage === 'fr' ? 'Quotidien' : 'Daily' },
    { value: 'weekly', label: currentLanguage === 'ar' ? 'أسبوعياً' : currentLanguage === 'fr' ? 'Hebdomadaire' : 'Weekly' },
    { value: 'monthly', label: currentLanguage === 'ar' ? 'شهرياً' : currentLanguage === 'fr' ? 'Mensuel' : 'Monthly' }
  ];

  const alertSeverityOptions = [
    { value: 'all', label: currentLanguage === 'ar' ? 'جميع التنبيهات' : currentLanguage === 'fr' ? 'Toutes les alertes' : 'All Alerts' },
    { value: 'high-critical', label: currentLanguage === 'ar' ? 'عالية وحرجة فقط' : currentLanguage === 'fr' ? 'Élevée et critique uniquement' : 'High & Critical Only' },
    { value: 'critical', label: currentLanguage === 'ar' ? 'حرجة فقط' : currentLanguage === 'fr' ? 'Critique uniquement' : 'Critical Only' }
  ];

  const getLabels = () => {
    if (currentLanguage === 'ar') {
      return {
        title: 'تفضيلات الأمان',
        subtitle: 'قم بتكوين سياسات الأمان والامتثال والإشعارات',
        complianceSection: 'متطلبات الامتثال',
        complianceLabel: 'معايير الامتثال المطلوبة',
        compliancePlaceholder: 'اختر معايير الامتثال',
        complianceDescription: 'حدد معايير الامتثال التي تحتاج مؤسستك للالتزام بها',
        scanningSection: 'جدولة المسح الأمني',
        scanFrequencyLabel: 'تكرار مسح الثغرات',
        scanFrequencyPlaceholder: 'اختر تكرار المسح',
        autoScanLabel: 'تمكين المسح التلقائي للأجهزة الجديدة',
        autoScanDescription: 'سيتم مسح الأجهزة الجديدة تلقائياً عند اتصالها بالشبكة',
        notificationSection: 'تفضيلات الإشعارات',
        emailNotificationsLabel: 'إشعارات البريد الإلكتروني',
        emailNotificationsDescription: 'تلقي تنبيهات الأمان عبر البريد الإلكتروني',
        smsNotificationsLabel: 'إشعارات الرسائل النصية',
        smsNotificationsDescription: 'تلقي التنبيهات الحرجة عبر الرسائل النصية',
        alertSeverityLabel: 'مستوى التنبيهات',
        alertSeverityPlaceholder: 'اختر مستوى التنبيهات',
        aiSection: 'ميزات الذكاء الاصطناعي',
        aiInsightsLabel: 'تمكين رؤى الذكاء الاصطناعي',
        aiInsightsDescription: 'الحصول على توصيات أمنية مدعومة بالذكاء الاصطناعي',
        autoRemediationLabel: 'المعالجة التلقائية للتهديدات',
        autoRemediationDescription: 'السماح للذكاء الاصطناعي بمعالجة التهديدات منخفضة المخاطر تلقائياً',
        previous: 'السابق',
        complete: 'إكمال الإعداد'
      };
    } else if (currentLanguage === 'fr') {
      return {
        title: 'Préférences de Sécurité',
        subtitle: 'Configurez les politiques de sécurité, la conformité et les notifications',
        complianceSection: 'Exigences de Conformité',
        complianceLabel: 'Normes de conformité requises',
        compliancePlaceholder: 'Sélectionnez les normes de conformité',
        complianceDescription: 'Sélectionnez les normes de conformité que votre organisation doit respecter',
        scanningSection: 'Planification des Analyses de Sécurité',
        scanFrequencyLabel: 'Fréquence d\'analyse des vulnérabilités',
        scanFrequencyPlaceholder: 'Sélectionnez la fréquence d\'analyse',
        autoScanLabel: 'Activer l\'analyse automatique des nouveaux appareils',
        autoScanDescription: 'Les nouveaux appareils seront automatiquement analysés lors de leur connexion au réseau',
        notificationSection: 'Préférences de Notification',
        emailNotificationsLabel: 'Notifications par email',
        emailNotificationsDescription: 'Recevoir des alertes de sécurité par email',
        smsNotificationsLabel: 'Notifications SMS',
        smsNotificationsDescription: 'Recevoir des alertes critiques par SMS',
        alertSeverityLabel: 'Niveau d\'alerte',
        alertSeverityPlaceholder: 'Sélectionnez le niveau d\'alerte',
        aiSection: 'Fonctionnalités IA',
        aiInsightsLabel: 'Activer les insights IA',
        aiInsightsDescription: 'Obtenir des recommandations de sécurité alimentées par l\'IA',
        autoRemediationLabel: 'Remédiation automatique des menaces',
        autoRemediationDescription: 'Permettre à l\'IA de traiter automatiquement les menaces à faible risque',
        previous: 'Précédent',
        complete: 'Terminer la Configuration'
      };
    } else {
      return {
        title: 'Security Preferences',
        subtitle: 'Configure security policies, compliance requirements, and notifications',
        complianceSection: 'Compliance Requirements',
        complianceLabel: 'Required compliance standards',
        compliancePlaceholder: 'Select compliance standards',
        complianceDescription: 'Select the compliance standards your organization needs to adhere to',
        scanningSection: 'Security Scanning Schedule',
        scanFrequencyLabel: 'Vulnerability scan frequency',
        scanFrequencyPlaceholder: 'Select scan frequency',
        autoScanLabel: 'Enable automatic scanning for new devices',
        autoScanDescription: 'New devices will be automatically scanned when they connect to the network',
        notificationSection: 'Notification Preferences',
        emailNotificationsLabel: 'Email notifications',
        emailNotificationsDescription: 'Receive security alerts via email',
        smsNotificationsLabel: 'SMS notifications',
        smsNotificationsDescription: 'Receive critical alerts via SMS',
        alertSeverityLabel: 'Alert severity level',
        alertSeverityPlaceholder: 'Select alert level',
        aiSection: 'AI Features',
        aiInsightsLabel: 'Enable AI insights',
        aiInsightsDescription: 'Get AI-powered security recommendations',
        autoRemediationLabel: 'Automatic threat remediation',
        autoRemediationDescription: 'Allow AI to automatically handle low-risk threats',
        previous: 'Previous',
        complete: 'Complete Setup'
      };
    }
  };

  const labels = getLabels();

  const handleInputChange = (field, value) => {
    onFormDataChange({ ...formData, [field]: value });
    if (errors?.[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    onNext();
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center w-16 h-16 bg-success/10 rounded-full mx-auto mb-4">
          <Icon name="Settings" size={32} className="text-success" />
        </div>
        <h2 className="text-2xl font-semibold text-foreground mb-2">{labels?.title}</h2>
        <p className="text-muted-foreground">{labels?.subtitle}</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Compliance Requirements */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
            <Icon name="Shield" size={20} className="text-primary mr-2" />
            {labels?.complianceSection}
          </h3>
          
          <Select
            label={labels?.complianceLabel}
            description={labels?.complianceDescription}
            placeholder={labels?.compliancePlaceholder}
            options={complianceOptions}
            value={formData?.complianceStandards || []}
            onChange={(value) => handleInputChange('complianceStandards', value)}
            multiple
            searchable
            className="mb-4"
          />
        </div>

        {/* Security Scanning */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
            <Icon name="Search" size={20} className="text-accent mr-2" />
            {labels?.scanningSection}
          </h3>
          
          <div className="space-y-4">
            <Select
              label={labels?.scanFrequencyLabel}
              placeholder={labels?.scanFrequencyPlaceholder}
              options={scanFrequencyOptions}
              value={formData?.scanFrequency || 'weekly'}
              onChange={(value) => handleInputChange('scanFrequency', value)}
            />

            <Checkbox
              label={labels?.autoScanLabel}
              description={labels?.autoScanDescription}
              checked={formData?.autoScanNewDevices || false}
              onChange={(e) => handleInputChange('autoScanNewDevices', e?.target?.checked)}
            />
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
            <Icon name="Bell" size={20} className="text-warning mr-2" />
            {labels?.notificationSection}
          </h3>
          
          <div className="space-y-4">
            <Checkbox
              label={labels?.emailNotificationsLabel}
              description={labels?.emailNotificationsDescription}
              checked={formData?.emailNotifications !== false}
              onChange={(e) => handleInputChange('emailNotifications', e?.target?.checked)}
            />

            <Checkbox
              label={labels?.smsNotificationsLabel}
              description={labels?.smsNotificationsDescription}
              checked={formData?.smsNotifications || false}
              onChange={(e) => handleInputChange('smsNotifications', e?.target?.checked)}
            />

            <Select
              label={labels?.alertSeverityLabel}
              placeholder={labels?.alertSeverityPlaceholder}
              options={alertSeverityOptions}
              value={formData?.alertSeverity || 'high-critical'}
              onChange={(value) => handleInputChange('alertSeverity', value)}
            />
          </div>
        </div>

        {/* AI Features */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
            <Icon name="Brain" size={20} className="text-accent mr-2" />
            {labels?.aiSection}
          </h3>
          
          <div className="space-y-4">
            <Checkbox
              label={labels?.aiInsightsLabel}
              description={labels?.aiInsightsDescription}
              checked={formData?.aiInsights !== false}
              onChange={(e) => handleInputChange('aiInsights', e?.target?.checked)}
            />

            <Checkbox
              label={labels?.autoRemediationLabel}
              description={labels?.autoRemediationDescription}
              checked={formData?.autoRemediation || false}
              onChange={(e) => handleInputChange('autoRemediation', e?.target?.checked)}
            />
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-6">
          <Button variant="outline" iconName="ArrowLeft" onClick={onPrevious}>
            {labels?.previous}
          </Button>
          <Button
            type="submit"
            variant="default"
            iconName="Check"
            iconPosition="right"
            className="min-w-40"
          >
            {labels?.complete}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SecurityPreferencesForm;