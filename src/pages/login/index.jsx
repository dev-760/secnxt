import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import LoginForm from './components/LoginForm';
import LanguageSwitcher from './components/LanguageSwitcher';
import SecurityBackground from './components/SecurityBackground';

const LoginPage = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    // Check for saved language preference
    const savedLanguage = localStorage.getItem('preferred-language');
    if (savedLanguage && ['en', 'ar', 'fr']?.includes(savedLanguage)) {
      setCurrentLanguage(savedLanguage);
    } else {
      // Detect browser language
      const browserLang = navigator.language?.split('-')?.[0];
      if (['ar', 'fr']?.includes(browserLang)) {
        setCurrentLanguage(browserLang);
      }
    }
  }, []);

  useEffect(() => {
    // Apply RTL/LTR direction to document
    const direction = currentLanguage === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.dir = direction;
    document.documentElement.lang = currentLanguage;
  }, [currentLanguage]);

  const handleLanguageChange = (languageCode) => {
    setCurrentLanguage(languageCode);
  };

  // Page titles for different languages
  const pageTitles = {
    en: 'Sign In - SecNXT Cybersecurity Platform',
    fr: 'Connexion - Plateforme de Cybersécurité SecNXT',
    ar: 'تسجيل الدخول - منصة الأمن السيبراني SecNXT'
  };

  return (
    <>
      <Helmet>
        <title>{pageTitles?.[currentLanguage] || pageTitles?.en}</title>
        <meta name="description" content="Secure login to SecNXT cybersecurity platform for Moroccan SMBs. AI-powered threat detection and incident response." />
        <meta name="keywords" content="cybersecurity, login, Morocco, SMB, security dashboard, AI threat detection" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="min-h-screen bg-background relative overflow-hidden">
        {/* Security Background Elements */}
        <SecurityBackground />

        {/* Language Switcher */}
        <div className="absolute top-4 right-4 z-50">
          <LanguageSwitcher
            currentLanguage={currentLanguage}
            onLanguageChange={handleLanguageChange}
          />
        </div>

        {/* Main Content */}
        <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md">
            {/* Login Card */}
            <div className="bg-card/80 backdrop-blur-sm border border-border rounded-2xl shadow-2xl p-8 sm:p-10">
              <LoginForm
                currentLanguage={currentLanguage}
                onLanguageChange={handleLanguageChange}
              />
            </div>

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-xs text-muted-foreground">
                © {new Date()?.getFullYear()} SecNXT. {currentLanguage === 'ar' ? 'جميع الحقوق محفوظة' : currentLanguage === 'fr' ? 'Tous droits réservés' : 'All rights reserved'}.
              </p>
            </div>
          </div>
        </div>

        {/* Mobile Bottom Padding */}
        <div className="h-16 sm:h-0" />
      </div>
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-10px) rotate(1deg);
          }
          50% {
            transform: translateY(-5px) rotate(-1deg);
          }
          75% {
            transform: translateY(-15px) rotate(0.5deg);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-fade-in {
          animation: fadeIn 0.2s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* RTL Support */
        [dir="rtl"] .space-x-2 > * + * {
          margin-left: 0;
          margin-right: 0.5rem;
        }

        [dir="rtl"] .space-x-3 > * + * {
          margin-left: 0;
          margin-right: 0.75rem;
        }

        /* Ensure proper text alignment for Arabic */
        [dir="rtl"] input[type="email"],
        [dir="rtl"] input[type="password"] {
          text-align: right;
        }

        [dir="rtl"] input[type="email"]:focus,
        [dir="rtl"] input[type="password"]:focus {
          text-align: right;
        }

        /* Verification code input should remain centered */
        [dir="rtl"] input.text-center {
          text-align: center !important;
        }
      `}</style>
    </>
  );
};

export default LoginPage;