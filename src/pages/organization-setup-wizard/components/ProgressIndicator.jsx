import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressIndicator = ({ currentStep, totalSteps, stepTitles }) => {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full bg-card border-b border-border">
      <div className="max-w-4xl mx-auto px-6 py-6">
        {/* Progress Bar */}
        <div className="relative mb-6">
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-500 ease-in-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className="absolute -top-1 right-0 text-xs text-muted-foreground">
            {Math.round(progressPercentage)}%
          </div>
        </div>

        {/* Step Indicators */}
        <div className="flex items-center justify-between">
          {stepTitles?.map((title, index) => {
            const stepNumber = index + 1;
            const isCompleted = stepNumber < currentStep;
            const isCurrent = stepNumber === currentStep;
            const isUpcoming = stepNumber > currentStep;

            return (
              <div key={stepNumber} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                    isCompleted 
                      ? 'bg-success border-success text-success-foreground' 
                      : isCurrent 
                        ? 'bg-primary border-primary text-primary-foreground' 
                        : 'bg-muted border-muted-foreground/30 text-muted-foreground'
                  }`}>
                    {isCompleted ? (
                      <Icon name="Check" size={16} />
                    ) : (
                      <span className="text-sm font-medium">{stepNumber}</span>
                    )}
                  </div>
                  <div className={`mt-2 text-sm font-medium text-center max-w-24 ${
                    isCurrent ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {title}
                  </div>
                </div>
                {index < stepTitles?.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-4 ${
                    isCompleted ? 'bg-success' : 'bg-muted'
                  }`} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;