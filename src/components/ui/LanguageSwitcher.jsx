import React, { useState, useRef, useEffect } from 'react';
import Icon from '../AppIcon';

const LanguageSwitcher = ({ currentLanguage = 'en', onLanguageChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const languages = [
    {
      code: 'en',
      name: 'English',
      nativeName: 'English',
      flag: '🇺🇸',
      direction: 'ltr'
    },
    {
      code: 'ar',
      name: 'Arabic',
      nativeName: 'العربية',
      flag: '🇲🇦',
      direction: 'rtl'
    },
    {
      code: 'fr',
      name: 'French',
      nativeName: 'Français',
      flag: '🇫🇷',
      direction: 'ltr'
    }
  ];

  const currentLang = languages?.find(lang => lang?.code === currentLanguage) || languages?.[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(event?.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    // Apply RTL/LTR direction to document
    document.documentElement.dir = currentLang?.direction;
    document.documentElement.lang = currentLang?.code;
  }, [currentLang]);

  const handleLanguageSelect = (language) => {
    setIsOpen(false);
    if (onLanguageChange && language?.code !== currentLanguage) {
      // Save to localStorage
      localStorage.setItem('preferred-language', language?.code);
      onLanguageChange(language?.code);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-muted/50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
        title={`Current language: ${currentLang?.name}`}
      >
        <span className="text-lg">{currentLang?.flag}</span>
        <span className="hidden sm:block text-sm font-medium text-foreground">
          {currentLang?.code?.toUpperCase()}
        </span>
        <Icon 
          name={isOpen ? "ChevronUp" : "ChevronDown"} 
          size={14} 
          className="text-muted-foreground" 
        />
      </button>
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-lg z-200 animate-fade-in">
          <div className="p-2">
            {languages?.map((language) => (
              <button
                key={language?.code}
                onClick={() => handleLanguageSelect(language)}
                className={`w-full flex items-center space-x-3 p-2 rounded-lg transition-colors duration-200 text-left ${
                  language?.code === currentLanguage
                    ? 'bg-primary/10 text-primary' :'hover:bg-muted/50 text-popover-foreground'
                }`}
              >
                <span className="text-lg">{language?.flag}</span>
                <div className="flex-1">
                  <div className="text-sm font-medium">{language?.name}</div>
                  <div className="text-xs text-muted-foreground">{language?.nativeName}</div>
                </div>
                {language?.code === currentLanguage && (
                  <Icon name="Check" size={16} className="text-primary" />
                )}
              </button>
            ))}
          </div>
          
          <div className="p-2 border-t border-border">
            <div className="text-xs text-muted-foreground px-2 py-1">
              Language preference is saved automatically
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;