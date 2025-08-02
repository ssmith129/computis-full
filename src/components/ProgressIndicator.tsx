import React from 'react';
import { CheckCircle, Clock, AlertTriangle } from 'lucide-react';

interface ProgressIndicatorProps {
  steps: Array<{
    title: string;
    description: string;
    status: 'completed' | 'current' | 'pending' | 'error';
  }>;
  currentStep: number;
}

export default function ProgressIndicator({ steps, currentStep }: ProgressIndicatorProps) {
  const getStepIcon = (status: string, index: number) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-6 h-6 text-green-600 animate-bounce-in" />;
      case 'current':
        return (
          <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse-glow">
            <span className="text-gray-900 font-bold text-sm">{index + 1}</span>
          </div>
        );
      case 'error':
        return <AlertTriangle className="w-6 h-6 text-red-600 animate-shake" />;
      default:
        return (
          <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-gray-600 font-medium text-sm">{index + 1}</span>
          </div>
        );
    }
  };

  const getConnectorClass = (index: number) => {
    const nextStep = steps[index + 1];
    if (!nextStep) return '';
    
    if (nextStep.status === 'completed' || nextStep.status === 'current') {
      return 'bg-yellow-400';
    }
    return 'bg-gray-300';
  };

  return (
    <div className="flex items-center justify-between w-full max-w-4xl mx-auto">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center flex-1">
          <div className="flex flex-col items-center">
            <div className={`transition-all duration-500 ${step.status === 'current' ? 'scale-110' : ''}`}>
              {getStepIcon(step.status, index)}
            </div>
            <div className="mt-3 text-center">
              <p className={`text-sm font-medium transition-colors duration-300 font-display ${
                step.status === 'current' ? 'text-yellow-600' :
                step.status === 'completed' ? 'text-green-600' :
                step.status === 'error' ? 'text-red-600' :
                'text-gray-500'
              }`}>
                {step.title}
              </p>
              <p className="text-xs text-gray-500 mt-1 font-sans">{step.description}</p>
            </div>
          </div>
          
          {index < steps.length - 1 && (
            <div className="flex-1 mx-4">
              <div className={`h-1 rounded-full transition-all duration-500 ${getConnectorClass(index)}`} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}