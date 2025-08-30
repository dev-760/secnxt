import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const CompanyProfileForm = ({ formData, onFormDataChange, onNext, currentLanguage }) => {
  const [errors, setErrors] = useState({});

  const industryOptions = [
    { value: 'technology', label: currentLanguage === 'ar' ? 'التكنولوجيا' : currentLanguage === 'fr' ? 'Technologie' : 'Technology' },
    { value: 'finance', label: currentLanguage === 'ar' ? 'المالية والمصرفية' : currentLanguage === 'fr' ? 'Finance et Banque' : 'Finance & Banking' },
    { value: 'healthcare', label: currentLanguage === 'ar' ? 'الرعاية الصحية' : currentLanguage === 'fr' ? 'Soins de santé' : 'Healthcare' },
    { value: 'manufacturing', label: currentLanguage === 'ar' ? 'التصنيع' : currentLanguage === 'fr' ? 'Fabrication' : 'Manufacturing' },
    { value: 'retail', label: currentLanguage === 'ar' ? 'التجارة والبيع بالتجزئة' : currentLanguage === 'fr' ? 'Commerce de détail' : 'Retail & Commerce' },
    { value: 'education', label: currentLanguage === 'ar' ? 'التعليم' : currentLanguage === 'fr' ? 'Éducation' : 'Education' },
    { value: 'construction', label: currentLanguage === 'ar' ? 'البناء والتشييد' : currentLanguage === 'fr' ? 'Construction' : 'Construction' },
    { value: 'consulting', label: currentLanguage === 'ar' ? 'الاستشارات' : currentLanguage === 'fr' ? 'Conseil' : 'Consulting' },
    { value: 'other', label: currentLanguage === 'ar' ? 'أخرى' : currentLanguage === 'fr' ? 'Autre' : 'Other' }
  ];

  const employeeCountOptions = [
    { value: '1-10', label: '1-10' },
    { value: '11-25', label: '11-25' },
    { value: '26-50', label: '26-50' },
    { value: '51-100', label: '51-100' },
    { value: '101-250', label: '101-250' },
    { value: '251-500', label: '251-500' },
    { value: '500+', label: '500+' }
  ];

  const getLabels = () => {
    if (currentLanguage === 'ar') {
      return {
        title: 'معلومات الشركة',
        subtitle: 'أدخل تفاصيل مؤسستك لإعداد حسابك الأمني',
        companyName: 'اسم الشركة',
        companyNamePlaceholder: 'أدخل اسم شركتك',
        industry: 'القطاع',
        industryPlaceholder: 'اختر قطاع عملك',
        employeeCount: 'عدد الموظفين',
        employeeCountPlaceholder: 'اختر عدد الموظفين',
        contactName: 'اسم جهة الاتصال الأساسية',
        contactNamePlaceholder: 'أدخل اسم المسؤول',
        contactEmail: 'البريد الإلكتروني للاتصال',
        contactEmailPlaceholder: 'أدخل البريد الإلكتروني',
        contactPhone: 'رقم الهاتف',
        contactPhonePlaceholder: '+212 6XX XXX XXX',
        address: 'عنوان الشركة',
        addressPlaceholder: 'أدخل عنوان الشركة',
        city: 'المدينة',
        cityPlaceholder: 'أدخل المدينة',
        continue: 'متابعة'
      };
    } else if (currentLanguage === 'fr') {
      return {
        title: 'Profil de l\'Entreprise',
        subtitle: 'Saisissez les détails de votre organisation pour configurer votre compte de sécurité',
        companyName: 'Nom de l\'Entreprise',
        companyNamePlaceholder: 'Entrez le nom de votre entreprise',
        industry: 'Secteur d\'Activité',
        industryPlaceholder: 'Sélectionnez votre secteur',
        employeeCount: 'Nombre d\'Employés',
        employeeCountPlaceholder: 'Sélectionnez le nombre d\'employés',
        contactName: 'Contact Principal',
        contactNamePlaceholder: 'Entrez le nom du responsable',
        contactEmail: 'Email de Contact',
        contactEmailPlaceholder: 'Entrez l\'adresse email',
        contactPhone: 'Numéro de Téléphone',
        contactPhonePlaceholder: '+212 6XX XXX XXX',
        address: 'Adresse de l\'Entreprise',
        addressPlaceholder: 'Entrez l\'adresse de l\'entreprise',
        city: 'Ville',
        cityPlaceholder: 'Entrez la ville',
        continue: 'Continuer'
      };
    } else {
      return {
        title: 'Company Profile',
        subtitle: 'Enter your organization details to set up your security account',
        companyName: 'Company Name',
        companyNamePlaceholder: 'Enter your company name',
        industry: 'Industry',
        industryPlaceholder: 'Select your industry',
        employeeCount: 'Employee Count',
        employeeCountPlaceholder: 'Select employee count',
        contactName: 'Primary Contact Name',
        contactNamePlaceholder: 'Enter contact person name',
        contactEmail: 'Contact Email',
        contactEmailPlaceholder: 'Enter email address',
        contactPhone: 'Phone Number',
        contactPhonePlaceholder: '+212 6XX XXX XXX',
        address: 'Company Address',
        addressPlaceholder: 'Enter company address',
        city: 'City',
        cityPlaceholder: 'Enter city',
        continue: 'Continue'
      };
    }
  };

  const labels = getLabels();

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.companyName?.trim()) {
      newErrors.companyName = currentLanguage === 'ar' ? 'اسم الشركة مطلوب' : currentLanguage === 'fr' ? 'Le nom de l\'entreprise est requis' : 'Company name is required';
    }

    if (!formData?.industry) {
      newErrors.industry = currentLanguage === 'ar' ? 'القطاع مطلوب' : currentLanguage === 'fr' ? 'Le secteur est requis' : 'Industry is required';
    }

    if (!formData?.employeeCount) {
      newErrors.employeeCount = currentLanguage === 'ar' ? 'عدد الموظفين مطلوب' : currentLanguage === 'fr' ? 'Le nombre d\'employés est requis' : 'Employee count is required';
    }

    if (!formData?.contactName?.trim()) {
      newErrors.contactName = currentLanguage === 'ar' ? 'اسم جهة الاتصال مطلوب' : currentLanguage === 'fr' ? 'Le nom du contact est requis' : 'Contact name is required';
    }

    if (!formData?.contactEmail?.trim()) {
      newErrors.contactEmail = currentLanguage === 'ar' ? 'البريد الإلكتروني مطلوب' : currentLanguage === 'fr' ? 'L\'email est requis' : 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.contactEmail)) {
      newErrors.contactEmail = currentLanguage === 'ar' ? 'البريد الإلكتروني غير صحيح' : currentLanguage === 'fr' ? 'Email invalide' : 'Invalid email format';
    }

    if (!formData?.contactPhone?.trim()) {
      newErrors.contactPhone = currentLanguage === 'ar' ? 'رقم الهاتف مطلوب' : currentLanguage === 'fr' ? 'Le numéro de téléphone est requis' : 'Phone number is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      onNext();
    }
  };

  const handleInputChange = (field, value) => {
    onFormDataChange({ ...formData, [field]: value });
    if (errors?.[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4">
          <Icon name="Building" size={32} className="text-primary" />
        </div>
        <h2 className="text-2xl font-semibold text-foreground mb-2">{labels?.title}</h2>
        <p className="text-muted-foreground">{labels?.subtitle}</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <Input
              label={labels?.companyName}
              type="text"
              placeholder={labels?.companyNamePlaceholder}
              value={formData?.companyName || ''}
              onChange={(e) => handleInputChange('companyName', e?.target?.value)}
              error={errors?.companyName}
              required
            />
          </div>

          <Select
            label={labels?.industry}
            placeholder={labels?.industryPlaceholder}
            options={industryOptions}
            value={formData?.industry || ''}
            onChange={(value) => handleInputChange('industry', value)}
            error={errors?.industry}
            required
          />

          <Select
            label={labels?.employeeCount}
            placeholder={labels?.employeeCountPlaceholder}
            options={employeeCountOptions}
            value={formData?.employeeCount || ''}
            onChange={(value) => handleInputChange('employeeCount', value)}
            error={errors?.employeeCount}
            required
          />

          <Input
            label={labels?.contactName}
            type="text"
            placeholder={labels?.contactNamePlaceholder}
            value={formData?.contactName || ''}
            onChange={(e) => handleInputChange('contactName', e?.target?.value)}
            error={errors?.contactName}
            required
          />

          <Input
            label={labels?.contactEmail}
            type="email"
            placeholder={labels?.contactEmailPlaceholder}
            value={formData?.contactEmail || ''}
            onChange={(e) => handleInputChange('contactEmail', e?.target?.value)}
            error={errors?.contactEmail}
            required
          />

          <Input
            label={labels?.contactPhone}
            type="tel"
            placeholder={labels?.contactPhonePlaceholder}
            value={formData?.contactPhone || ''}
            onChange={(e) => handleInputChange('contactPhone', e?.target?.value)}
            error={errors?.contactPhone}
            required
          />

          <div className="md:col-span-2">
            <Input
              label={labels?.address}
              type="text"
              placeholder={labels?.addressPlaceholder}
              value={formData?.address || ''}
              onChange={(e) => handleInputChange('address', e?.target?.value)}
            />
          </div>

          <Input
            label={labels?.city}
            type="text"
            placeholder={labels?.cityPlaceholder}
            value={formData?.city || ''}
            onChange={(e) => handleInputChange('city', e?.target?.value)}
          />
        </div>

        <div className="flex justify-end pt-6">
          <Button
            type="submit"
            variant="default"
            iconName="ArrowRight"
            iconPosition="right"
            className="min-w-32"
          >
            {labels?.continue}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CompanyProfileForm;