import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EvidenceCollectionPanel = ({ selectedFramework, currentLanguage }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [uploadProgress, setUploadProgress] = useState({});

  const content = {
    en: {
      evidenceCollection: 'Evidence Collection',
      uploadEvidence: 'Upload Evidence',
      autoCollection: 'Auto-Collection',
      categories: 'Categories',
      allCategories: 'All Categories',
      policies: 'Policies & Procedures',
      screenshots: 'Screenshots',
      configurations: 'System Configurations',
      certificates: 'Certificates',
      auditLogs: 'Audit Logs',
      documentation: 'Documentation',
      fileName: 'File Name',
      category: 'Category',
      uploadDate: 'Upload Date',
      fileSize: 'File Size',
      status: 'Status',
      actions: 'Actions',
      dragDropFiles: 'Drag & drop files here, or click to select',
      supportedFormats: 'Supported formats: PDF, PNG, JPG, DOCX, XLSX',
      autoCollected: 'Auto-collected',
      manualUpload: 'Manual upload',
      verified: 'Verified',
      pending: 'Pending review',
      expired: 'Expired',
      download: 'Download',
      view: 'View',
      delete: 'Delete'
    },
    ar: {
      evidenceCollection: 'جمع الأدلة',
      uploadEvidence: 'رفع الأدلة',
      autoCollection: 'الجمع التلقائي',
      categories: 'الفئات',
      allCategories: 'جميع الفئات',
      policies: 'السياسات والإجراءات',
      screenshots: 'لقطات الشاشة',
      configurations: 'تكوينات النظام',
      certificates: 'الشهادات',
      auditLogs: 'سجلات التدقيق',
      documentation: 'التوثيق',
      fileName: 'اسم الملف',
      category: 'الفئة',
      uploadDate: 'تاريخ الرفع',
      fileSize: 'حجم الملف',
      status: 'الحالة',
      actions: 'الإجراءات',
      dragDropFiles: 'اسحب واسقط الملفات هنا، أو انقر للاختيار',
      supportedFormats: 'التنسيقات المدعومة: PDF, PNG, JPG, DOCX, XLSX',
      autoCollected: 'جمع تلقائي',
      manualUpload: 'رفع يدوي',
      verified: 'تم التحقق',
      pending: 'في انتظار المراجعة',
      expired: 'منتهي الصلاحية',
      download: 'تحميل',
      view: 'عرض',
      delete: 'حذف'
    },
    fr: {
      evidenceCollection: 'Collection de Preuves',
      uploadEvidence: 'Télécharger Preuve',
      autoCollection: 'Collection Auto',
      categories: 'Catégories',
      allCategories: 'Toutes Catégories',
      policies: 'Politiques et Procédures',
      screenshots: 'Captures d\'Écran',
      configurations: 'Configurations Système',
      certificates: 'Certificats',
      auditLogs: 'Journaux d\'Audit',
      documentation: 'Documentation',
      fileName: 'Nom du Fichier',
      category: 'Catégorie',
      uploadDate: 'Date de Téléchargement',
      fileSize: 'Taille du Fichier',
      status: 'Statut',
      actions: 'Actions',
      dragDropFiles: 'Glissez-déposez les fichiers ici, ou cliquez pour sélectionner',
      supportedFormats: 'Formats supportés: PDF, PNG, JPG, DOCX, XLSX',
      autoCollected: 'Collecté automatiquement',
      manualUpload: 'Téléchargement manuel',
      verified: 'Vérifié',
      pending: 'En attente de révision',
      expired: 'Expiré',
      download: 'Télécharger',
      view: 'Voir',
      delete: 'Supprimer'
    }
  };

  const t = content?.[currentLanguage];

  const evidenceCategories = [
    { id: 'all', name: t?.allCategories, icon: 'Archive', count: 47 },
    { id: 'policies', name: t?.policies, icon: 'FileText', count: 12 },
    { id: 'screenshots', name: t?.screenshots, icon: 'Camera', count: 15 },
    { id: 'configurations', name: t?.configurations, icon: 'Settings', count: 8 },
    { id: 'certificates', name: t?.certificates, icon: 'Award', count: 5 },
    { id: 'audit-logs', name: t?.auditLogs, icon: 'FileCheck', count: 4 },
    { id: 'documentation', name: t?.documentation, icon: 'Book', count: 3 }
  ];

  const evidenceFiles = [
    {
      id: 1,
      name: 'Information_Security_Policy_v2.1.pdf',
      category: 'policies',
      uploadDate: '2025-01-25T10:30:00Z',
      fileSize: '2.4 MB',
      status: 'verified',
      type: 'manual',
      framework: 'soc2'
    },
    {
      id: 2,
      name: 'MFA_Configuration_Screenshot.png',
      category: 'screenshots',
      uploadDate: '2025-01-24T15:20:00Z',
      fileSize: '1.2 MB',
      status: 'verified',
      type: 'auto',
      framework: 'soc2'
    },
    {
      id: 3,
      name: 'SSL_Certificate_MainDomain.crt',
      category: 'certificates',
      uploadDate: '2025-01-23T09:15:00Z',
      fileSize: '4.1 KB',
      status: 'expired',
      type: 'auto',
      framework: 'all'
    },
    {
      id: 4,
      name: 'Firewall_Rules_Configuration.json',
      category: 'configurations',
      uploadDate: '2025-01-22T14:45:00Z',
      fileSize: '856 KB',
      status: 'verified',
      type: 'auto',
      framework: 'iso27001'
    },
    {
      id: 5,
      name: 'Data_Processing_Agreement_CNDP.docx',
      category: 'documentation',
      uploadDate: '2025-01-21T11:30:00Z',
      fileSize: '892 KB',
      status: 'pending',
      type: 'manual',
      framework: 'cndp'
    },
    {
      id: 6,
      name: 'User_Access_Audit_Q4_2024.xlsx',
      category: 'audit-logs',
      uploadDate: '2025-01-20T16:20:00Z',
      fileSize: '3.2 MB',
      status: 'verified',
      type: 'auto',
      framework: 'soc2'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified': return 'text-success bg-success/10';
      case 'pending': return 'text-warning bg-warning/10';
      case 'expired': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'auto': return 'text-primary bg-primary/10';
      case 'manual': return 'text-muted-foreground bg-muted';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getCategoryIcon = (category) => {
    const cat = evidenceCategories?.find(c => c?.id === category);
    return cat?.icon || 'File';
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const filteredFiles = evidenceFiles?.filter(file => {
    if (selectedCategory !== 'all' && file?.category !== selectedCategory) return false;
    if (selectedFramework !== 'all' && file?.framework !== 'all' && file?.framework !== selectedFramework) return false;
    return true;
  });

  const handleFileUpload = (files) => {
    // Handle file upload logic
    console.log('Uploading files:', files);
    // Simulate upload progress
    Array.from(files).forEach((file, index) => {
      const fileId = `upload_${Date.now()}_${index}`;
      setUploadProgress(prev => ({ ...prev, [fileId]: 0 }));
      
      // Simulate progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(prev => ({ ...prev, [fileId]: progress }));
        
        if (progress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setUploadProgress(prev => {
              const newProgress = { ...prev };
              delete newProgress[fileId];
              return newProgress;
            });
          }, 1000);
        }
      }, 200);
    });
  };

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">{t?.uploadEvidence}</h3>
        
        <div 
          className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors duration-200 cursor-pointer"
          onClick={() => document.getElementById('file-upload')?.click()}
          onDrop={(e) => {
            e.preventDefault();
            handleFileUpload(e.dataTransfer.files);
          }}
          onDragOver={(e) => e.preventDefault()}
        >
          <Icon name="Upload" size={48} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-foreground font-medium mb-2">{t?.dragDropFiles}</p>
          <p className="text-sm text-muted-foreground">{t?.supportedFormats}</p>
          <input
            id="file-upload"
            type="file"
            multiple
            accept=".pdf,.png,.jpg,.jpeg,.docx,.xlsx"
            className="hidden"
            onChange={(e) => handleFileUpload(e.target.files)}
          />
        </div>

        {/* Upload Progress */}
        {Object.keys(uploadProgress)?.length > 0 && (
          <div className="mt-4 space-y-2">
            {Object.entries(uploadProgress)?.map(([fileId, progress]) => (
              <div key={fileId} className="flex items-center space-x-3">
                <Icon name="File" size={16} className="text-muted-foreground" />
                <div className="flex-1">
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
                <span className="text-sm text-muted-foreground">{progress}%</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Categories and Files */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Categories Sidebar */}
        <div className="space-y-3">
          {evidenceCategories?.map(category => (
            <button
              key={category?.id}
              onClick={() => setSelectedCategory(category?.id)}
              className={`w-full flex items-center justify-between p-3 rounded-lg border transition-colors duration-200 ${
                selectedCategory === category?.id
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-border bg-card text-foreground hover:border-primary/50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon name={category?.icon} size={16} />
                <span className="font-medium">{category?.name}</span>
              </div>
              <span className="text-sm bg-muted text-muted-foreground px-2 py-0.5 rounded">
                {category?.count}
              </span>
            </button>
          ))}
        </div>

        {/* Files List */}
        <div className="xl:col-span-3">
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="p-4 border-b border-border">
              <h3 className="text-lg font-semibold text-foreground">{t?.evidenceCollection}</h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-foreground">{t?.fileName}</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-foreground">{t?.category}</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-foreground">{t?.uploadDate}</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-foreground">{t?.fileSize}</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-foreground">{t?.status}</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-foreground">{t?.actions}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredFiles?.map(file => (
                    <tr key={file?.id} className="hover:bg-muted/25 transition-colors duration-200">
                      <td className="px-4 py-3">
                        <div className="flex items-center space-x-3">
                          <Icon name={getCategoryIcon(file?.category)} size={16} className="text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium text-foreground truncate max-w-xs">
                              {file?.name}
                            </p>
                            <span className={`text-xs px-2 py-0.5 rounded ${getTypeColor(file?.type)}`}>
                              {file?.type === 'auto' ? t?.autoCollected : t?.manualUpload}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-foreground">
                        {evidenceCategories?.find(c => c?.id === file?.category)?.name}
                      </td>
                      <td className="px-4 py-3 text-sm text-foreground">
                        {formatDateTime(file?.uploadDate)}
                      </td>
                      <td className="px-4 py-3 text-sm text-foreground">
                        {file?.fileSize}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(file?.status)}`}>
                          {file?.status === 'verified' ? t?.verified : 
                           file?.status === 'pending' ? t?.pending : 
                           file?.status === 'expired' ? t?.expired : file?.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm" iconName="Eye">
                            {t?.view}
                          </Button>
                          <Button variant="ghost" size="sm" iconName="Download">
                            {t?.download}
                          </Button>
                          <Button variant="ghost" size="sm" iconName="Trash" className="text-error hover:text-error">
                            {t?.delete}
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvidenceCollectionPanel;