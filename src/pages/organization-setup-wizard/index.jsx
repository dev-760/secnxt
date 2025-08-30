import React, { useState, useEffect } from 'react';
import WizardHeader from './components/WizardHeader';
import ProgressIndicator from './components/ProgressIndicator';
import CompanyProfileForm from './components/CompanyProfileForm';
import DeviceRegistrationForm from './components/DeviceRegistrationForm';
import SecurityPreferencesForm from './components/SecurityPreferencesForm';
import CompletionScreen from './components/CompletionScreen';

const OrganizationSetupWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [formData, setFormData] = useState({
    // Company Profile
    companyName: '',
    industry: '',
    employeeCount: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    address: '',
    city: '',
    
    // Security Preferences
    complianceStandards: [],
    scanFrequency: 'weekly',
    autoScanNewDevices: true,
    emailNotifications: true,
    smsNotifications: false,
    alertSeverity: 'high-critical',
    aiInsights: true,
    autoRemediation: false
  });

  const totalSteps = 4;
  const stepTitles = {
    en: ['Company Profile', 'Device Setup', 'Security Config', 'Complete'],
    fr: ['Profil Entreprise', 'Config Appareils', 'Config Sécurité', 'Terminé'],
    ar: ['ملف الشركة', 'إعداد الأجهزة', 'إعداد الأمان', 'مكتمل']
  };

  // Load saved language preference on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language');
    if (savedLanguage && ['en', 'fr', 'ar']?.includes(savedLanguage)) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  // Load saved form data on mount
  useEffect(() => {
    const savedData = localStorage.getItem('wizard-form-data');
    const savedStep = localStorage.getItem('wizard-current-step');
    
    if (savedData) {
      try {
        setFormData(JSON.parse(savedData));
      } catch (error) {
        console.error('Error loading saved form data:', error);
      }
    }
    
    if (savedStep) {
      const step = parseInt(savedStep, 10);
      if (step >= 1 && step <= totalSteps) {
        setCurrentStep(step);
      }
    }
  }, []);

  // Save form data whenever it changes
  useEffect(() => {
    localStorage.setItem('wizard-form-data', JSON.stringify(formData));
  }, [formData]);

  // Save current step whenever it changes
  useEffect(() => {
    localStorage.setItem('wizard-current-step', currentStep?.toString());
  }, [currentStep]);

  const handleLanguageChange = (language) => {
    setCurrentLanguage(language);
    localStorage.setItem('preferred-language', language);
  };

  const handleFormDataChange = (newData) => {
    setFormData(newData);
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSaveAndExit = () => {
    // Save current progress
    localStorage.setItem('wizard-form-data', JSON.stringify(formData));
    localStorage.setItem('wizard-current-step', currentStep?.toString());
    
    // Show confirmation or redirect
    const confirmMessage = currentLanguage === 'ar' ?'تم حفظ التقدم. يمكنك العودة لاحقاً لإكمال الإعداد.'
      : currentLanguage === 'fr' ?'Progression sauvegardée. Vous pouvez revenir plus tard pour terminer la configuration.' :'Progress saved. You can return later to complete the setup.';
    
    alert(confirmMessage);
    window.location.href = '/login';
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <CompanyProfileForm
            formData={formData}
            onFormDataChange={handleFormDataChange}
            onNext={handleNext}
            currentLanguage={currentLanguage}
          />
        );
      case 2:
        return (
          <DeviceRegistrationForm
            onNext={handleNext}
            onPrevious={handlePrevious}
            currentLanguage={currentLanguage}
            subscriptionTier="starter"
          />
        );
      case 3:
        return (
          <SecurityPreferencesForm
            formData={formData}
            onFormDataChange={handleFormDataChange}
            onNext={handleNext}
            onPrevious={handlePrevious}
            currentLanguage={currentLanguage}
          />
        );
      case 4:
        return (
          <CompletionScreen
            formData={formData}
            currentLanguage={currentLanguage}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <WizardHeader
        currentLanguage={currentLanguage}
        onLanguageChange={handleLanguageChange}
        onSaveAndExit={handleSaveAndExit}
      />
      {currentStep < totalSteps && (
        <ProgressIndicator
          currentStep={currentStep}
          totalSteps={totalSteps}
          stepTitles={stepTitles?.[currentLanguage]}
        />
      )}
      <main className="py-8 px-6">
        <div className="max-w-7xl mx-auto">
          {renderCurrentStep()}
        </div>
      </main>
    </div>
  );
};

export default OrganizationSetupWizard;