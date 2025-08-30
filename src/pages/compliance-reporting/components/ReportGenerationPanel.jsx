import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ReportGenerationPanel = ({ selectedFramework, currentLanguage }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [reportConfig, setReportConfig] = useState({
    format: 'pdf',
    includeCharts: true,
    includeAuditTrail: true,
    includeEvidence: true,
    dateRange: '30d',
    digitalSignature: false
  });

  const content = {
    en: {
      reportGeneration: 'Report Generation',
      selectTemplate: 'Select Report Template',
      generateReport: 'Generate Report',
      scheduleReport: 'Schedule Report',
      reportHistory: 'Report History',
      customizeReport: 'Customize Report',
      reportFormat: 'Report Format',
      includeCharts: 'Include Charts',
      includeAuditTrail: 'Include Audit Trail',
      includeEvidence: 'Include Evidence',
      dateRange: 'Date Range',
      digitalSignature: 'Digital Signature',
      last30Days: 'Last 30 Days',
      last90Days: 'Last 90 Days',
      lastYear: 'Last Year',
      preview: 'Preview',
      download: 'Download',
      status: 'Status',
      generatedOn: 'Generated On',
      fileSize: 'File Size'
    },
    ar: {
      reportGeneration: 'إنشاء التقارير',
      selectTemplate: 'اختر قالب التقرير',
      generateReport: 'إنشاء تقرير',
      scheduleReport: 'جدولة تقرير',
      reportHistory: 'تاريخ التقارير',
      customizeReport: 'تخصيص التقرير',
      reportFormat: 'تنسيق التقرير',
      includeCharts: 'تضمين الرسوم البيانية',
      includeAuditTrail: 'تضمين سجل التدقيق',
      includeEvidence: 'تضمين الأدلة',
      dateRange: 'نطاق التاريخ',
      digitalSignature: 'التوقيع الرقمي',
      last30Days: 'آخر 30 يوم',
      last90Days: 'آخر 90 يوم',
      lastYear: 'العام الماضي',
      preview: 'معاينة',
      download: 'تحميل',
      status: 'الحالة',
      generatedOn: 'تم الإنشاء في',
      fileSize: 'حجم الملف'
    },
    fr: {
      reportGeneration: 'Génération de Rapports',
      selectTemplate: 'Sélectionner Modèle de Rapport',
      generateReport: 'Générer Rapport',
      scheduleReport: 'Planifier Rapport',
      reportHistory: 'Historique des Rapports',
      customizeReport: 'Personnaliser Rapport',
      reportFormat: 'Format du Rapport',
      includeCharts: 'Inclure Graphiques',
      includeAuditTrail: 'Inclure Piste d\'Audit',
      includeEvidence: 'Inclure Preuves',
      dateRange: 'Période',
      digitalSignature: 'Signature Numérique',
      last30Days: '30 Derniers Jours',
      last90Days: '90 Derniers Jours',
      lastYear: 'Dernière Année',
      preview: 'Aperçu',
      download: 'Télécharger',
      status: 'Statut',
      generatedOn: 'Généré le',
      fileSize: 'Taille du Fichier'
    }
  };

  const t = content?.[currentLanguage];

  const reportTemplates = [
    {
      id: 'soc2-type2',
      name: 'SOC 2 Type II Report',
      description: 'Comprehensive SOC 2 compliance report with controls assessment',
      framework: 'soc2',
      icon: 'FileCheck',
      estimatedTime: '5-10 minutes',
      sections: ['Executive Summary', 'Control Environment', 'Testing Results', 'Recommendations']
    },
    {
      id: 'cndp-privacy',
      name: 'CNDP Privacy Compliance Report',
      description: 'Moroccan CNDP regulatory compliance assessment and gap analysis',
      framework: 'cndp',
      icon: 'Scale',
      estimatedTime: '3-7 minutes',
      sections: ['Privacy Controls', 'Data Processing', 'Rights Management', 'Breach Assessment']
    },
    {
      id: 'iso27001',
      name: 'ISO 27001 Compliance Report',
      description: 'Information security management system assessment report',
      framework: 'iso27001',
      icon: 'Award',
      estimatedTime: '7-12 minutes',
      sections: ['ISMS Status', 'Risk Assessment', 'Controls Implementation', 'Improvement Plan']
    },
    {
      id: 'security-summary',
      name: 'Executive Security Summary',
      description: 'High-level security posture overview for executive leadership',
      framework: 'all',
      icon: 'BarChart3',
      estimatedTime: '2-5 minutes',
      sections: ['Security Metrics', 'Threat Landscape', 'Compliance Status', 'Investment Priorities']
    },
    {
      id: 'audit-readiness',
      name: 'Audit Readiness Report',
      description: 'Comprehensive audit preparation and evidence collection summary',
      framework: 'all',
      icon: 'CheckCircle',
      estimatedTime: '8-15 minutes',
      sections: ['Evidence Collection', 'Control Testing', 'Gap Analysis', 'Remediation Plan']
    }
  ];

  const reportHistory = [
    {
      id: 1,
      name: 'SOC 2 Type II Q4 2024',
      template: 'SOC 2 Type II Report',
      status: 'completed',
      generatedOn: '2025-01-15T10:30:00Z',
      fileSize: '2.4 MB',
      format: 'PDF'
    },
    {
      id: 2,
      name: 'CNDP Privacy Assessment',
      template: 'CNDP Privacy Compliance Report',
      status: 'completed',
      generatedOn: '2025-01-10T14:20:00Z',
      fileSize: '1.8 MB',
      format: 'PDF'
    },
    {
      id: 3,
      name: 'Executive Security Summary',
      template: 'Executive Security Summary',
      status: 'generating',
      generatedOn: '2025-01-30T15:00:00Z',
      fileSize: '-',
      format: 'PDF'
    }
  ];

  const filteredTemplates = selectedFramework === 'all' 
    ? reportTemplates 
    : reportTemplates?.filter(template => 
        template?.framework === 'all' || template?.framework === selectedFramework
      );

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-success bg-success/10';
      case 'generating': return 'text-warning bg-warning/10';
      case 'failed': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
  };

  const handleGenerateReport = () => {
    console.log('Generating report with config:', {
      template: selectedTemplate,
      config: reportConfig
    });
    // Handle report generation
  };

  const handleConfigChange = (field, value) => {
    setReportConfig(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      {/* Templates Selection */}
      <div className="xl:col-span-2 space-y-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">{t?.selectTemplate}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTemplates?.map(template => (
              <button
                key={template?.id}
                onClick={() => handleTemplateSelect(template)}
                className={`p-4 rounded-lg border text-left transition-colors duration-200 ${
                  selectedTemplate?.id === template?.id
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-border bg-card text-foreground hover:border-primary/50'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg ${
                    selectedTemplate?.id === template?.id 
                      ? 'bg-primary/10' 
                      : 'bg-muted'
                  }`}>
                    <Icon 
                      name={template?.icon} 
                      size={20} 
                      className={selectedTemplate?.id === template?.id ? 'text-primary' : 'text-muted-foreground'} 
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium mb-1">{template?.name}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{template?.description}</p>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <Icon name="Clock" size={12} />
                      <span>{template?.estimatedTime}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-3">
                  <p className="text-xs text-muted-foreground mb-1">Sections included:</p>
                  <div className="flex flex-wrap gap-1">
                    {template?.sections?.slice(0, 2)?.map(section => (
                      <span key={section} className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded">
                        {section}
                      </span>
                    ))}
                    {template?.sections?.length > 2 && (
                      <span className="text-xs text-muted-foreground">
                        +{template?.sections?.length - 2} more
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Report History */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">{t?.reportHistory}</h3>
          <div className="space-y-3">
            {reportHistory?.map(report => (
              <div key={report?.id} className="flex items-center justify-between p-3 bg-muted/25 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Icon name="FileBarChart" size={20} className="text-muted-foreground" />
                  <div>
                    <p className="font-medium text-foreground">{report?.name}</p>
                    <p className="text-sm text-muted-foreground">{report?.template}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(report?.status)}`}>
                      {report?.status}
                    </span>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatDateTime(report?.generatedOn)}
                    </p>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {report?.fileSize}
                  </div>
                  {report?.status === 'completed' && (
                    <Button variant="ghost" size="sm" iconName="Download">
                      {t?.download}
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Report Configuration */}
      <div className="space-y-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">{t?.customizeReport}</h3>
          
          {selectedTemplate ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {t?.reportFormat}
                </label>
                <select
                  value={reportConfig?.format}
                  onChange={(e) => handleConfigChange('format', e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  <option value="pdf">PDF</option>
                  <option value="csv">CSV</option>
                  <option value="xml">XML</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {t?.dateRange}
                </label>
                <select
                  value={reportConfig?.dateRange}
                  onChange={(e) => handleConfigChange('dateRange', e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                  <option value="30d">{t?.last30Days}</option>
                  <option value="90d">{t?.last90Days}</option>
                  <option value="1y">{t?.lastYear}</option>
                </select>
              </div>

              <div className="space-y-3">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={reportConfig?.includeCharts}
                    onChange={(e) => handleConfigChange('includeCharts', e.target.checked)}
                    className="rounded border-border"
                  />
                  <span className="text-sm text-foreground">{t?.includeCharts}</span>
                </label>

                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={reportConfig?.includeAuditTrail}
                    onChange={(e) => handleConfigChange('includeAuditTrail', e.target.checked)}
                    className="rounded border-border"
                  />
                  <span className="text-sm text-foreground">{t?.includeAuditTrail}</span>
                </label>

                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={reportConfig?.includeEvidence}
                    onChange={(e) => handleConfigChange('includeEvidence', e.target.checked)}
                    className="rounded border-border"
                  />
                  <span className="text-sm text-foreground">{t?.includeEvidence}</span>
                </label>

                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={reportConfig?.digitalSignature}
                    onChange={(e) => handleConfigChange('digitalSignature', e.target.checked)}
                    className="rounded border-border"
                  />
                  <span className="text-sm text-foreground">{t?.digitalSignature}</span>
                </label>
              </div>

              <div className="pt-4 space-y-2">
                <Button
                  onClick={handleGenerateReport}
                  className="w-full"
                  iconName="FileBarChart"
                >
                  {t?.generateReport}
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full"
                  iconName="Eye"
                >
                  {t?.preview}
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full"
                  iconName="Calendar"
                >
                  {t?.scheduleReport}
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <Icon name="FileBarChart" size={48} className="text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">{t?.selectTemplate}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportGenerationPanel;