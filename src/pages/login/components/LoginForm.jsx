import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const LoginForm = ({ currentLanguage, onLanguageChange }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState('');

  // Mock credentials for different user types
  const mockCredentials = {
    admin: { email: 'admin@techcorp.ma', password: 'SecNXT@2025' },
    manager: { email: 'manager@securenet.ma', password: 'Manager123!' },
    user: { email: 'user@dataguard.ma', password: 'User2025#' }
  };

  // Language content
  const content = {
    en: {
      title: 'Sign in to SecNXT',
      subtitle: 'Secure your business with AI-powered cybersecurity',
      email: 'Email Address',
      emailPlaceholder: 'Enter your business email',
      password: 'Password',
      passwordPlaceholder: 'Enter your password',
      signIn: 'Sign In',
      forgotPassword: 'Forgot your password?',
      createAccount: 'Don\'t have an account? Create one',
      twoFactorTitle: 'Two-Factor Authentication',
      twoFactorSubtitle: 'Enter the 6-digit code from your authenticator app',
      verificationCode: 'Verification Code',
      verificationPlaceholder: 'Enter 6-digit code',
      verify: 'Verify',
      backToLogin: 'Back to login',
      invalidCredentials: 'Invalid email or password. Try: admin@techcorp.ma / SecNXT@2025',
      invalidTwoFactor: 'Invalid verification code. Use: 123456',
      emailRequired: 'Email is required',
      passwordRequired: 'Password is required',
      invalidEmail: 'Please enter a valid email address'
    },
    fr: {
      title: 'Connexion à SecNXT',
      subtitle: 'Sécurisez votre entreprise avec la cybersécurité alimentée par l\'IA',
      email: 'Adresse Email',
      emailPlaceholder: 'Entrez votre email professionnel',
      password: 'Mot de Passe',
      passwordPlaceholder: 'Entrez votre mot de passe',
      signIn: 'Se Connecter',
      forgotPassword: 'Mot de passe oublié?',
      createAccount: 'Pas de compte? Créez-en un',
      twoFactorTitle: 'Authentification à Deux Facteurs',
      twoFactorSubtitle: 'Entrez le code à 6 chiffres de votre application d\'authentification',
      verificationCode: 'Code de Vérification',
      verificationPlaceholder: 'Entrez le code à 6 chiffres',
      verify: 'Vérifier',
      backToLogin: 'Retour à la connexion',
      invalidCredentials: 'Email ou mot de passe invalide. Essayez: admin@techcorp.ma / SecNXT@2025',
      invalidTwoFactor: 'Code de vérification invalide. Utilisez: 123456',
      emailRequired: 'L\'email est requis',
      passwordRequired: 'Le mot de passe est requis',
      invalidEmail: 'Veuillez entrer une adresse email valide'
    },
    ar: {
      title: 'تسجيل الدخول إلى SecNXT',
      subtitle: 'أمّن عملك بالأمن السيبراني المدعوم بالذكاء الاصطناعي',
      email: 'عنوان البريد الإلكتروني',
      emailPlaceholder: 'أدخل بريدك الإلكتروني التجاري',
      password: 'كلمة المرور',
      passwordPlaceholder: 'أدخل كلمة المرور',
      signIn: 'تسجيل الدخول',
      forgotPassword: 'نسيت كلمة المرور؟',
      createAccount: 'ليس لديك حساب؟ أنشئ واحداً',
      twoFactorTitle: 'المصادقة الثنائية',
      twoFactorSubtitle: 'أدخل الرمز المكون من 6 أرقام من تطبيق المصادقة',
      verificationCode: 'رمز التحقق',
      verificationPlaceholder: 'أدخل الرمز المكون من 6 أرقام',
      verify: 'تحقق',
      backToLogin: 'العودة لتسجيل الدخول',
      invalidCredentials: 'بريد إلكتروني أو كلمة مرور غير صحيحة. جرب: admin@techcorp.ma / SecNXT@2025',
      invalidTwoFactor: 'رمز التحقق غير صحيح. استخدم: 123456',
      emailRequired: 'البريد الإلكتروني مطلوب',
      passwordRequired: 'كلمة المرور مطلوبة',
      invalidEmail: 'يرجى إدخال عنوان بريد إلكتروني صحيح'
    }
  };

  const t = content?.[currentLanguage] || content?.en;

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.email) {
      newErrors.email = t?.emailRequired;
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = t?.invalidEmail;
    }

    if (!formData?.password) {
      newErrors.password = t?.passwordRequired;
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Check credentials
      const isValidCredentials = Object.values(mockCredentials)?.some(
        cred => cred?.email === formData?.email && cred?.password === formData?.password
      );

      if (isValidCredentials) {
        setShowTwoFactor(true);
        setErrors({});
      } else {
        setErrors({ general: t?.invalidCredentials });
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleTwoFactorSubmit = async (e) => {
    e?.preventDefault();
    
    if (!twoFactorCode) return;

    setIsLoading(true);

    // Simulate 2FA verification
    setTimeout(() => {
      if (twoFactorCode === '123456') {
        // Successful login - redirect to dashboard
        navigate('/security-dashboard');
      } else {
        setErrors({ twoFactor: t?.invalidTwoFactor });
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleBackToLogin = () => {
    setShowTwoFactor(false);
    setTwoFactorCode('');
    setErrors({});
  };

  if (showTwoFactor) {
    return (
      <div className="w-full max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4">
            <Icon name="Shield" size={32} className="text-primary" />
          </div>
          <h2 className="text-2xl font-semibold text-foreground mb-2">
            {t?.twoFactorTitle}
          </h2>
          <p className="text-muted-foreground">
            {t?.twoFactorSubtitle}
          </p>
        </div>
        <form onSubmit={handleTwoFactorSubmit} className="space-y-6">
          {errors?.twoFactor && (
            <div className="p-3 bg-error/10 border border-error/20 rounded-lg">
              <p className="text-sm text-error">{errors?.twoFactor}</p>
            </div>
          )}

          <Input
            label={t?.verificationCode}
            type="text"
            name="twoFactorCode"
            value={twoFactorCode}
            onChange={(e) => setTwoFactorCode(e?.target?.value)}
            placeholder={t?.verificationPlaceholder}
            maxLength={6}
            className="text-center text-2xl tracking-widest"
            required
          />

          <Button
            type="submit"
            variant="default"
            size="lg"
            fullWidth
            loading={isLoading}
            disabled={!twoFactorCode || twoFactorCode?.length !== 6}
            iconName="Shield"
            iconPosition="left"
          >
            {t?.verify}
          </Button>

          <div className="text-center">
            <button
              type="button"
              onClick={handleBackToLogin}
              className="text-sm text-primary hover:text-primary/80 transition-colors duration-200"
            >
              {t?.backToLogin}
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4">
          <Icon name="Shield" size={32} className="text-primary" />
        </div>
        <h1 className="text-3xl font-semibold text-foreground mb-2">
          {t?.title}
        </h1>
        <p className="text-muted-foreground">
          {t?.subtitle}
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {errors?.general && (
          <div className="p-3 bg-error/10 border border-error/20 rounded-lg">
            <p className="text-sm text-error">{errors?.general}</p>
          </div>
        )}

        <Input
          label={t?.email}
          type="email"
          name="email"
          value={formData?.email}
          onChange={handleInputChange}
          placeholder={t?.emailPlaceholder}
          error={errors?.email}
          required
        />

        <Input
          label={t?.password}
          type="password"
          name="password"
          value={formData?.password}
          onChange={handleInputChange}
          placeholder={t?.passwordPlaceholder}
          error={errors?.password}
          required
        />

        <Button
          type="submit"
          variant="default"
          size="lg"
          fullWidth
          loading={isLoading}
          iconName="LogIn"
          iconPosition="left"
        >
          {t?.signIn}
        </Button>

        <div className="space-y-4 text-center">
          <button
            type="button"
            onClick={() => navigate('/forgot-password')}
            className="text-sm text-primary hover:text-primary/80 transition-colors duration-200"
          >
            {t?.forgotPassword}
          </button>
          
          <div className="text-sm text-muted-foreground">
            {t?.createAccount?.split('?')?.[0]}?{' '}
            <button
              type="button"
              onClick={() => navigate('/organization-setup-wizard')}
              className="text-primary hover:text-primary/80 transition-colors duration-200"
            >
              {t?.createAccount?.split('? ')?.[1]}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;