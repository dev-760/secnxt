import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import LanguageSwitcher from '../../../components/ui/LanguageSwitcher';
import Button from '../../../components/ui/Button';

const WizardHeader = ({ currentLanguage, onLanguageChange, onSaveAndExit }) => {
  const navigate = useNavigate();

  const getLabels = () => {
    if (currentLanguage === 'ar') {
      return {
        title: 'معالج إعداد المؤسسة',
        subtitle: 'قم بإعداد حسابك الأمني في بضع خطوات بسيطة',
        saveAndExit: 'حفظ والخروج',
        backToLogin: 'العودة لتسجيل الدخول'
      };
    } else if (currentLanguage === 'fr') {
      return {
        title: 'Assistant de Configuration d\'Organisation',
        subtitle: 'Configurez votre compte de sécurité en quelques étapes simples',
        saveAndExit: 'Sauvegarder et Quitter',
        backToLogin: 'Retour à la Connexion'
      };
    } else {
      return {
        title: 'Organization Setup Wizard',
        subtitle: 'Set up your security account in a few simple steps',
        saveAndExit: 'Save & Exit',
        backToLogin: 'Back to Login'
      };
    }
  };

  const labels = getLabels();

  const handleBackToLogin = () => {
    navigate('/login');
  };

  return (
    <header className="bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
                <Icon name="Shield" size={24} color="white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-foreground">SecNXT</h1>
                <p className="text-sm text-muted-foreground">{labels?.title}</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <LanguageSwitcher 
              currentLanguage={currentLanguage} 
              onLanguageChange={onLanguageChange} 
            />
            
            <div className="hidden md:flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                iconName="ArrowLeft"
                onClick={handleBackToLogin}
              >
                {labels?.backToLogin}
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                iconName="Save"
                onClick={onSaveAndExit}
              >
                {labels?.saveAndExit}
              </Button>
            </div>

            {/* Mobile Menu */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                iconName="MoreVertical"
              >
              </Button>
            </div>
          </div>
        </div>

        {/* Subtitle */}
        <div className="mt-2">
          <p className="text-muted-foreground">{labels?.subtitle}</p>
        </div>
      </div>
    </header>
  );
};

export default WizardHeader;