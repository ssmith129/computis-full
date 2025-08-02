import React from 'react';
import { CheckCircle, AlertTriangle, Clock, TrendingUp, Shield, Zap } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  stepTitles: string[];
}

export const WorkflowStepIndicator: React.FC<StepIndicatorProps> = ({ 
  currentStep, 
  totalSteps, 
  stepTitles 
}) => {
  return (
    <div className="flex items-center justify-between max-w-4xl mx-auto mb-8">
      {stepTitles.map((title, index) => {
        const stepNumber = index + 1;
        const isCompleted = currentStep > stepNumber;
        const isCurrent = currentStep === stepNumber;
        const isPending = currentStep < stepNumber;

        return (
          <div key={stepNumber} className="flex items-center">
            <div className="flex flex-col items-center">
              {/* Step Circle */}
              <div className={`
                w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300
                ${isCompleted ? 'bg-yellow-400 border-yellow-400 text-gray-900' : ''}
                ${isCurrent ? 'bg-white border-yellow-400 text-yellow-600 ring-4 ring-yellow-100' : ''}
                ${isPending ? 'bg-gray-100 border-gray-300 text-gray-500' : ''}
              `}>
                {isCompleted ? (
                  <CheckCircle className="w-6 h-6" />
                ) : (
                  <span className="font-bold text-sm">{stepNumber}</span>
                )}
              </div>
              
              {/* Step Title */}
              <div className="mt-3 text-center">
                <p className={`text-sm font-medium transition-colors duration-300 font-display ${
                  isCurrent ? 'text-yellow-600' : 
                  isCompleted ? 'text-gray-900' : 
                  'text-gray-500'
                }`}>
                  {title}
                </p>
              </div>
            </div>
            
            {/* Connector Line */}
            {index < totalSteps - 1 && (
              <div className={`flex-1 h-1 mx-4 rounded-full transition-all duration-500 ${
                currentStep > stepNumber ? 'bg-yellow-400' : 'bg-gray-200'
              }`} />
            )}
          </div>
        );
      })}
    </div>
  );
};

interface DataSourceCardProps {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  security: number;
  supportedAssets: string[];
  estimatedTime: string;
  isSelected: boolean;
  isPopular?: boolean;
  onSelect: (id: string) => void;
}

export const DataSourceCard: React.FC<DataSourceCardProps> = ({
  id,
  name,
  description,
  icon,
  category,
  difficulty,
  security,
  supportedAssets,
  estimatedTime,
  isSelected,
  isPopular = false,
  onSelect
}) => {
  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSecurityStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-sm ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}>
        ★
      </span>
    ));
  };

  return (
    <div
      onClick={() => onSelect(id)}
      className={`
        relative p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 hover:scale-105
        ${isSelected 
          ? 'border-yellow-400 bg-yellow-50 shadow-lg ring-2 ring-yellow-100' 
          : 'border-gray-200 hover:border-yellow-300 hover:shadow-md'
        }
      `}
    >
      {/* Popular Badge */}
      {isPopular && (
        <div className="absolute -top-2 -right-2">
          <span className="px-3 py-1 bg-blue-500 text-white rounded-full text-xs font-medium font-sans">
            Most Popular
          </span>
        </div>
      )}

      {/* Selection Indicator */}
      {isSelected && (
        <div className="absolute top-4 right-4">
          <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
            <CheckCircle className="w-4 h-4 text-gray-900" />
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center space-x-4 mb-4">
        <div className="text-4xl">{icon}</div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 font-display">{name}</h3>
          <p className="text-sm text-gray-600 font-sans">{category}</p>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-700 mb-4 font-sans">{description}</p>

      {/* Metadata */}
      <div className="space-y-3">
        {/* Difficulty & Time */}
        <div className="flex items-center justify-between">
          <span className={`px-2 py-1 rounded-full text-xs font-medium font-sans ${getDifficultyColor(difficulty)}`}>
            {difficulty}
          </span>
          <span className="text-xs text-gray-500 font-sans">{estimatedTime}</span>
        </div>

        {/* Security Rating */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-600 font-sans">Security:</span>
          <div className="flex items-center space-x-1">
            {getSecurityStars(security)}
          </div>
        </div>

        {/* Supported Assets */}
        <div>
          <span className="text-xs text-gray-600 font-sans">Supports:</span>
          <div className="flex flex-wrap gap-1 mt-1">
            {supportedAssets.slice(0, 3).map((asset, index) => (
              <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-sans">
                {asset}
              </span>
            ))}
            {supportedAssets.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-sans">
                +{supportedAssets.length - 3} more
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

interface ValidationMessageProps {
  type: 'error' | 'warning' | 'success' | 'info';
  title: string;
  message: string;
  actions?: Array<{
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary';
  }>;
}

export const ValidationMessage: React.FC<ValidationMessageProps> = ({
  type,
  title,
  message,
  actions = []
}) => {
  const getTypeStyles = () => {
    switch (type) {
      case 'error':
        return {
          container: 'bg-red-50 border-red-200',
          icon: <AlertTriangle className="w-5 h-5 text-red-500" />,
          title: 'text-red-800',
          message: 'text-red-700'
        };
      case 'warning':
        return {
          container: 'bg-yellow-50 border-yellow-200',
          icon: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
          title: 'text-yellow-800',
          message: 'text-yellow-700'
        };
      case 'success':
        return {
          container: 'bg-green-50 border-green-200',
          icon: <CheckCircle className="w-5 h-5 text-green-500" />,
          title: 'text-green-800',
          message: 'text-green-700'
        };
      case 'info':
        return {
          container: 'bg-blue-50 border-blue-200',
          icon: <Clock className="w-5 h-5 text-blue-500" />,
          title: 'text-blue-800',
          message: 'text-blue-700'
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <div className={`p-4 rounded-lg border ${styles.container} transition-all duration-300 hover:scale-102`}>
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 mt-0.5">
          {styles.icon}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className={`text-sm font-medium ${styles.title} font-sans`}>
            {title}
          </h4>
          <p className={`text-sm mt-1 ${styles.message} font-sans`}>
            {message}
          </p>
          {actions.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {actions.map((action, index) => (
                <button
                  key={index}
                  onClick={action.onClick}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-all duration-200 hover:scale-105 font-sans ${
                    action.variant === 'primary'
                      ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-300'
                      : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {action.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface ProgressRingProps {
  progress: number;
  size?: 'sm' | 'md' | 'lg';
  showPercentage?: boolean;
  status?: string;
}

export const ProgressRing: React.FC<ProgressRingProps> = ({
  progress,
  size = 'md',
  showPercentage = true,
  status
}) => {
  const sizes = {
    sm: { width: 60, height: 60, strokeWidth: 4, fontSize: 'text-xs' },
    md: { width: 80, height: 80, strokeWidth: 6, fontSize: 'text-sm' },
    lg: { width: 120, height: 120, strokeWidth: 8, fontSize: 'text-lg' }
  };

  const { width, height, strokeWidth, fontSize } = sizes[size];
  const radius = (width - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg
        width={width}
        height={height}
        className="transform -rotate-90 transition-all duration-500"
      >
        {/* Background Circle */}
        <circle
          cx={width / 2}
          cy={height / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-gray-200"
        />
        {/* Progress Circle */}
        <circle
          cx={width / 2}
          cy={height / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          className="text-yellow-400 transition-all duration-500 ease-out"
          strokeLinecap="round"
        />
      </svg>
      
      {/* Center Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {showPercentage && (
          <span className={`font-bold text-gray-900 font-display ${fontSize}`}>
            {Math.round(progress)}%
          </span>
        )}
        {status && (
          <span className="text-xs text-gray-600 font-sans mt-1">
            {status}
          </span>
        )}
      </div>
    </div>
  );
};

interface QuickStatsProps {
  stats: Array<{
    label: string;
    value: string;
    color: string;
    icon?: React.ComponentType<any>;
  }>;
}

export const QuickStats: React.FC<QuickStatsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div key={index} className="text-center p-6 bg-white rounded-xl border border-gray-200 hover:shadow-md transition-all duration-300 hover:scale-105">
          {stat.icon && (
            <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-3 ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
          )}
          <div className={`text-2xl font-bold mb-1 font-display ${stat.color.includes('green') ? 'text-green-600' : stat.color.includes('blue') ? 'text-blue-600' : 'text-purple-600'}`}>
            {stat.value}
          </div>
          <div className="text-sm text-gray-600 font-sans">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};

interface CategoryTabsProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export const CategoryTabs: React.FC<CategoryTabsProps> = ({
  categories,
  activeCategory,
  onCategoryChange
}) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6 justify-center">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 font-sans ${
            activeCategory === category
              ? 'bg-yellow-400 text-gray-900 shadow-md'
              : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

interface FileUploadZoneProps {
  onFileSelect: (files: FileList) => void;
  acceptedFormats: string[];
  maxSize: string;
  isUploading?: boolean;
  uploadProgress?: number;
}

export const FileUploadZone: React.FC<FileUploadZoneProps> = ({
  onFileSelect,
  acceptedFormats,
  maxSize,
  isUploading = false,
  uploadProgress = 0
}) => {
  const [isDragOver, setIsDragOver] = React.useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files) {
      onFileSelect(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onFileSelect(e.target.files);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`
        relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300
        ${isDragOver 
          ? 'border-yellow-400 bg-yellow-50 scale-105' 
          : 'border-gray-300 hover:border-yellow-300 hover:bg-gray-50'
        }
        ${isUploading ? 'pointer-events-none' : 'cursor-pointer'}
      `}
    >
      {isUploading ? (
        <div className="space-y-4">
          <div className="flex justify-center">
            <ProgressRing 
              progress={uploadProgress} 
              size="lg" 
              status="Uploading..."
            />
          </div>
          <p className="text-sm text-gray-600 font-sans">
            Processing your file... This may take a few minutes.
          </p>
        </div>
      ) : (
        <>
          <div className="w-16 h-16 mx-auto mb-4 text-gray-400">
            <TrendingUp className="w-full h-full" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 font-display">
            {isDragOver ? 'Drop your file here' : 'Upload Transaction Data'}
          </h3>
          <p className="text-gray-600 mb-4 font-sans">
            Drag & drop your file here, or click to browse
          </p>
          
          <input
            type="file"
            accept={acceptedFormats.join(',')}
            onChange={handleFileInput}
            className="hidden"
            id="file-upload"
            multiple
          />
          <label
            htmlFor="file-upload"
            className="inline-flex items-center px-6 py-3 bg-yellow-400 text-gray-900 rounded-lg cursor-pointer hover:bg-yellow-300 transition-all duration-200 hover:scale-105 font-sans font-medium"
          >
            Choose Files
          </label>
          
          <div className="mt-4 text-xs text-gray-500 font-sans">
            <p>Supported formats: {acceptedFormats.join(', ')}</p>
            <p>Maximum file size: {maxSize}</p>
          </div>
        </>
      )}
    </div>
  );
};

interface DataPreviewTableProps {
  headers: string[];
  rows: string[][];
  errors?: Array<{ row: number; column: number; message: string }>;
  warnings?: Array<{ row: number; column: number; message: string }>;
}

export const DataPreviewTable: React.FC<DataPreviewTableProps> = ({
  headers,
  rows,
  errors = [],
  warnings = []
}) => {
  const getCellStatus = (rowIndex: number, colIndex: number) => {
    const hasError = errors.some(e => e.row === rowIndex && e.column === colIndex);
    const hasWarning = warnings.some(w => w.row === rowIndex && w.column === colIndex);
    
    if (hasError) return 'bg-red-50 border-red-200 text-red-800';
    if (hasWarning) return 'bg-yellow-50 border-yellow-200 text-yellow-800';
    return 'bg-white border-gray-200 text-gray-900';
  };

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {headers.map((header, index) => (
                <th key={index} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider font-display">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {rows.slice(0, 10).map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-50 transition-colors duration-200">
                {row.map((cell, colIndex) => (
                  <td 
                    key={colIndex} 
                    className={`px-4 py-3 text-sm border-l-2 transition-all duration-200 font-sans ${getCellStatus(rowIndex, colIndex)}`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {rows.length > 10 && (
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 text-center">
          <span className="text-sm text-gray-600 font-sans">
            Showing 10 of {rows.length} rows
          </span>
        </div>
      )}
    </div>
  );
};

export default {
  WorkflowStepIndicator,
  DataSourceCard,
  ValidationMessage,
  ProgressRing,
  QuickStats,
  CategoryTabs,
  FileUploadZone,
  DataPreviewTable
};