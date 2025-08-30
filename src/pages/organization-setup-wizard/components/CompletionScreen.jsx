import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const CompletionScreen = ({ formData, currentLanguage }) => {
  const navigate = useNavigate();
  const [isRedirecting, setIsRedirecting] = useState(false);

  const getLabels = () => {
    if (currentLanguage === 'ar') {
      return {
        title: 'تم إعداد حسابك بنجاح!',
        subtitle: 'مرحباً بك في SecNXT - منصة الأمان السيبراني الخاصة بك',
        summary: 'ملخص الإعداد',
        companyName: 'اسم الشركة',
        industry: 'القطاع',
        employeeCount: 'عدد الموظفين',
        devicesConnected: 'الأجهزة المتصلة',
        complianceStandards: 'معايير الامتثال',
        scanFrequency: 'تكرار المسح',
        nextSteps: 'الخطوات التالية',
        step1: 'استكشف لوحة التحكم الأمنية الخاصة بك',
        step2: 'قم بتنزيل وتثبيت الوكلاء على الأجهزة المتبقية',
        step3: 'راجع توصيات الأمان المدعومة بالذكاء الاصطناعي',
        step4: 'قم بإعداد فريقك وأذونات المستخدمين',
        goToDashboard: 'الذهاب إلى لوحة التحكم',
        startTour: 'بدء الجولة التعريفية',
        redirecting: 'جاري التوجيه...'
      };
    } else if (currentLanguage === 'fr') {
      return {
        title: 'Votre compte a été configuré avec succès !',
        subtitle: 'Bienvenue sur SecNXT - Votre plateforme de cybersécurité',
        summary: 'Résumé de la Configuration',
        companyName: 'Nom de l\'Entreprise',
        industry: 'Secteur',
        employeeCount: 'Nombre d\'Employés',
        devicesConnected: 'Appareils Connectés',
        complianceStandards: 'Normes de Conformité',
        scanFrequency: 'Fréquence d\'Analyse',
        nextSteps: 'Prochaines Étapes',
        step1: 'Explorez votre tableau de bord de sécurité',
        step2: 'Téléchargez et installez les agents sur les appareils restants',
        step3: 'Consultez les recommandations de sécurité alimentées par l\'IA',
        step4: 'Configurez votre équipe et les autorisations utilisateur',
        goToDashboard: 'Aller au Tableau de Bord',
        startTour: 'Commencer la Visite',
        redirecting: 'Redirection en cours...'
      };
    } else {
      return {
        title: 'Your account has been set up successfully!',
        subtitle: 'Welcome to SecNXT - Your cybersecurity platform',
        summary: 'Setup Summary',
        companyName: 'Company Name',
        industry: 'Industry',
        employeeCount: 'Employee Count',
        devicesConnected: 'Devices Connected',
        complianceStandards: 'Compliance Standards',
        scanFrequency: 'Scan Frequency',
        nextSteps: 'Next Steps',
        step1: 'Explore your security dashboard',
        step2: 'Download and install agents on remaining devices',
        step3: 'Review AI-powered security recommendations',
        step4: 'Set up your team and user permissions',
        goToDashboard: 'Go to Dashboard',
        startTour: 'Start Tour',
        redirecting: 'Redirecting...'
      };
    }
  };

  const labels = getLabels();

  const handleGoToDashboard = (withTour = false) => {
    setIsRedirecting(true);
    setTimeout(() => {
      navigate('/security-dashboard', { 
        state: { 
          showWelcomeTour: withTour,
          isNewSetup: true 
        } 
      });
    }, 1500);
  };

  const getIndustryLabel = (industry) => {
    const industryMap = {
      'technology': currentLanguage === 'ar' ? 'التكنولوجيا' : currentLanguage === 'fr' ? 'Technologie' : 'Technology',
      'finance': currentLanguage === 'ar' ? 'المالية والمصرفية' : currentLanguage === 'fr' ? 'Finance et Banque' : 'Finance & Banking',
      'healthcare': currentLanguage === 'ar' ? 'الرعاية الصحية' : currentLanguage === 'fr' ? 'Soins de santé' : 'Healthcare',
      'manufacturing': currentLanguage === 'ar' ? 'التصنيع' : currentLanguage === 'fr' ? 'Fabrication' : 'Manufacturing',
      'retail': currentLanguage === 'ar' ? 'التجارة والبيع بالتجزئة' : currentLanguage === 'fr' ? 'Commerce de détail' : 'Retail & Commerce',
      'education': currentLanguage === 'ar' ? 'التعليم' : currentLanguage === 'fr' ? 'Éducation' : 'Education',
      'construction': currentLanguage === 'ar' ? 'البناء والتشييد' : currentLanguage === 'fr' ? 'Construction' : 'Construction',
      'consulting': currentLanguage === 'ar' ? 'الاستشارات' : currentLanguage === 'fr' ? 'Conseil' : 'Consulting',
      'other': currentLanguage === 'ar' ? 'أخرى' : currentLanguage === 'fr' ? 'Autre' : 'Other'
    };
    return industryMap?.[industry] || industry;
  };

  const getScanFrequencyLabel = (frequency) => {
    const frequencyMap = {
      'daily': currentLanguage === 'ar' ? 'يومياً' : currentLanguage === 'fr' ? 'Quotidien' : 'Daily',
      'weekly': currentLanguage === 'ar' ? 'أسبوعياً' : currentLanguage === 'fr' ? 'Hebdomadaire' : 'Weekly',
      'monthly': currentLanguage === 'ar' ? 'شهرياً' : currentLanguage === 'fr' ? 'Mensuel' : 'Monthly'
    };
    return frequencyMap?.[frequency] || frequency;
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Success Animation */}
      <div className="text-center mb-8">
        <div className="relative mx-auto mb-6">
          <div className="flex items-center justify-center w-24 h-24 bg-success/10 rounded-full mx-auto">
            <Icon name="CheckCircle" size={48} className="text-success" />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center animate-pulse">
            <Icon name="Sparkles" size={16} color="white" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-foreground mb-2">{labels?.title}</h2>
        <p className="text-lg text-muted-foreground">{labels?.subtitle}</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Setup Summary */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
            <Icon name="FileText" size={20} className="text-primary mr-2" />
            {labels?.summary}
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">{labels?.companyName}</span>
              <span className="font-medium text-foreground">{formData?.companyName}</span>
            </div>
            
            <div className="flex items-center justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">{labels?.industry}</span>
              <span className="font-medium text-foreground">{getIndustryLabel(formData?.industry)}</span>
            </div>
            
            <div className="flex items-center justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">{labels?.employeeCount}</span>
              <span className="font-medium text-foreground">{formData?.employeeCount}</span>
            </div>
            
            <div className="flex items-center justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">{labels?.devicesConnected}</span>
              <span className="font-medium text-foreground">2</span>
            </div>
            
            <div className="flex items-center justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">{labels?.complianceStandards}</span>
              <span className="font-medium text-foreground">
                {formData?.complianceStandards?.length || 0} {currentLanguage === 'ar' ? 'معايير' : currentLanguage === 'fr' ? 'normes' : 'standards'}
              </span>
            </div>
            
            <div className="flex items-center justify-between py-2">
              <span className="text-muted-foreground">{labels?.scanFrequency}</span>
              <span className="font-medium text-foreground">{getScanFrequencyLabel(formData?.scanFrequency)}</span>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
            <Icon name="ListTodo" size={20} className="text-accent mr-2" />
            {labels?.nextSteps}
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="flex items-center justify-center w-6 h-6 bg-primary/10 rounded-full flex-shrink-0 mt-0.5">
                <span className="text-xs font-medium text-primary">1</span>
              </div>
              <p className="text-sm text-foreground">{labels?.step1}</p>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="flex items-center justify-center w-6 h-6 bg-primary/10 rounded-full flex-shrink-0 mt-0.5">
                <span className="text-xs font-medium text-primary">2</span>
              </div>
              <p className="text-sm text-foreground">{labels?.step2}</p>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="flex items-center justify-center w-6 h-6 bg-primary/10 rounded-full flex-shrink-0 mt-0.5">
                <span className="text-xs font-medium text-primary">3</span>
              </div>
              <p className="text-sm text-foreground">{labels?.step3}</p>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="flex items-center justify-center w-6 h-6 bg-primary/10 rounded-full flex-shrink-0 mt-0.5">
                <span className="text-xs font-medium text-primary">4</span>
              </div>
              <p className="text-sm text-foreground">{labels?.step4}</p>
            </div>
          </div>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 mt-8">
        <Button
          variant="outline"
          size="lg"
          iconName="Play"
          onClick={() => handleGoToDashboard(true)}
          disabled={isRedirecting}
          className="w-full sm:w-auto"
        >
          {labels?.startTour}
        </Button>
        
        <Button
          variant="default"
          size="lg"
          iconName="ArrowRight"
          iconPosition="right"
          onClick={() => handleGoToDashboard(false)}
          loading={isRedirecting}
          className="w-full sm:w-auto min-w-48"
        >
          {isRedirecting ? labels?.redirecting : labels?.goToDashboard}
        </Button>
      </div>
      {/* Celebration Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
        <div className="absolute top-32 right-20 w-1 h-1 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-40 left-20 w-1.5 h-1.5 bg-success rounded-full animate-bounce" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-60 right-10 w-1 h-1 bg-warning rounded-full animate-bounce" style={{ animationDelay: '1.5s' }} />
      </div>
    </div>
  );
};

export default CompletionScreen;