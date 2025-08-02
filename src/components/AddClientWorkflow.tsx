import React, { useState } from 'react';
import { ArrowLeft, User, Building, Mail, Phone, MapPin, FileText, CheckCircle, Plus } from 'lucide-react';

interface AddClientWorkflowProps {
  onBack: () => void;
}

const AddClientWorkflow: React.FC<AddClientWorkflowProps> = ({ onBack }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [clientType, setClientType] = useState('');
  const [clientData, setClientData] = useState({
    // Basic Info
    firstName: '',
    lastName: '',
    companyName: '',
    email: '',
    phone: '',
    
    // Address
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    
    // Tax Info
    taxId: '',
    entityType: '',
    taxYear: '2023',
    
    // Preferences
    reportingFrequency: 'quarterly',
    communicationPreference: 'email',
    accountingMethod: 'FIFO',
    
    // Notes
    notes: ''
  });
  const [isCreating, setIsCreating] = useState(false);

  const steps = [
    { number: 1, title: 'Client Type', description: 'Individual or Business' },
    { number: 2, title: 'Basic Info', description: 'Contact information' },
    { number: 3, title: 'Tax Details', description: 'Tax preferences' },
    { number: 4, title: 'Complete', description: 'Review and create' }
  ];

  const clientTypes = [
    {
      id: 'individual',
      name: 'Individual',
      description: 'Personal crypto tax client',
      icon: User,
      features: ['Personal tax returns', 'Individual reporting', 'Simple setup'],
      recommended: true
    },
    {
      id: 'business',
      name: 'Business',
      description: 'Corporate or business entity',
      icon: Building,
      features: ['Business tax returns', 'Corporate reporting', 'Advanced features'],
      recommended: false
    }
  ];

  const createClient = async () => {
    setIsCreating(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsCreating(false);
    setCurrentStep(4);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 font-display">Select Client Type</h2>
              <p className="text-lg text-gray-600 font-sans">Choose the type of client you're adding</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {clientTypes.map((type) => (
                <div
                  key={type.id}
                  className={`relative p-8 border-2 rounded-xl cursor-pointer transition-all duration-300 hover:scale-105 ${
                    clientType === type.id
                      ? 'border-yellow-400 bg-yellow-50 shadow-lg'
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                  }`}
                >
                  {type.recommended && (
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium font-sans">
                        Recommended
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center">
                    <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <type.icon className="h-8 w-8 text-gray-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 font-display">{type.name}</h3>
                    <p className="text-gray-600 mb-6 font-sans">{type.description}</p>
                    
                    <div className="space-y-2">
                      {type.features.map((feature, index) => (
                        <div key={index} className="flex items-center justify-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm text-gray-600 font-sans">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 font-display">Basic Information</h2>
              <p className="text-lg text-gray-600 font-sans">Enter the client's contact details</p>
            </div>

            <div className="max-w-2xl mx-auto space-y-8">
              <div className="bg-white rounded-xl border border-gray-200 p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6 font-display">
                  {clientType === 'individual' ? 'Personal Information' : 'Business Information'}
                </h3>
                
                <div className="space-y-6">
                  {clientType === 'individual' ? (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">First Name</label>
                        <input
                          type="text"
                          value={clientData.firstName}
                          onChange={(e) => setClientData(prev => ({ ...prev, firstName: e.target.value }))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent font-sans"
                          placeholder="John"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">Last Name</label>
                        <input
                          type="text"
                          value={clientData.lastName}
                          onChange={(e) => setClientData(prev => ({ ...prev, lastName: e.target.value }))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent font-sans"
                          placeholder="Smith"
                        />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">Company Name</label>
                      <input
                        type="text"
                        value={clientData.companyName}
                        onChange={(e) => setClientData(prev => ({ ...prev, companyName: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent font-sans"
                        placeholder="ABC Corporation"
                      />
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">Email Address</label>
                      <input
                        type="email"
                        value={clientData.email}
                        onChange={(e) => setClientData(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent font-sans"
                        placeholder="client@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">Phone Number</label>
                      <input
                        type="tel"
                        value={clientData.phone}
                        onChange={(e) => setClientData(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent font-sans"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6 font-display">Address</h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">Street Address</label>
                    <input
                      type="text"
                      value={clientData.address}
                      onChange={(e) => setClientData(prev => ({ ...prev, address: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent font-sans"
                      placeholder="123 Main Street"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">City</label>
                      <input
                        type="text"
                        value={clientData.city}
                        onChange={(e) => setClientData(prev => ({ ...prev, city: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent font-sans"
                        placeholder="New York"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">State/Province</label>
                      <input
                        type="text"
                        value={clientData.state}
                        onChange={(e) => setClientData(prev => ({ ...prev, state: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent font-sans"
                        placeholder="NY"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">ZIP/Postal Code</label>
                      <input
                        type="text"
                        value={clientData.zipCode}
                        onChange={(e) => setClientData(prev => ({ ...prev, zipCode: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent font-sans"
                        placeholder="10001"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">Country</label>
                      <select
                        value={clientData.country}
                        onChange={(e) => setClientData(prev => ({ ...prev, country: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent font-sans"
                      >
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Australia">Australia</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 font-display">Tax Details & Preferences</h2>
              <p className="text-lg text-gray-600 font-sans">Configure tax settings and preferences</p>
            </div>

            <div className="max-w-2xl mx-auto space-y-8">
              <div className="bg-white rounded-xl border border-gray-200 p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6 font-display">Tax Information</h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">
                      {clientType === 'individual' ? 'Social Security Number' : 'Tax ID (EIN)'}
                    </label>
                    <input
                      type="text"
                      value={clientData.taxId}
                      onChange={(e) => setClientData(prev => ({ ...prev, taxId: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent font-sans"
                      placeholder={clientType === 'individual' ? 'XXX-XX-XXXX' : 'XX-XXXXXXX'}
                    />
                  </div>

                  {clientType === 'business' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">Entity Type</label>
                      <select
                        value={clientData.entityType}
                        onChange={(e) => setClientData(prev => ({ ...prev, entityType: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent font-sans"
                      >
                        <option value="">Select entity type</option>
                        <option value="LLC">LLC</option>
                        <option value="Corporation">Corporation</option>
                        <option value="Partnership">Partnership</option>
                        <option value="S-Corp">S-Corporation</option>
                      </select>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">Tax Year</label>
                    <select
                      value={clientData.taxYear}
                      onChange={(e) => setClientData(prev => ({ ...prev, taxYear: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent font-sans"
                    >
                      <option value="2023">2023</option>
                      <option value="2022">2022</option>
                      <option value="2021">2021</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">Accounting Method</label>
                    <select
                      value={clientData.accountingMethod}
                      onChange={(e) => setClientData(prev => ({ ...prev, accountingMethod: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent font-sans"
                    >
                      <option value="FIFO">FIFO (First In, First Out)</option>
                      <option value="LIFO">LIFO (Last In, First Out)</option>
                      <option value="HIFO">HIFO (Highest In, First Out)</option>
                      <option value="specific">Specific Identification</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6 font-display">Communication Preferences</h3>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">Reporting Frequency</label>
                    <select
                      value={clientData.reportingFrequency}
                      onChange={(e) => setClientData(prev => ({ ...prev, reportingFrequency: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent font-sans"
                    >
                      <option value="monthly">Monthly</option>
                      <option value="quarterly">Quarterly</option>
                      <option value="annually">Annually</option>
                      <option value="as-needed">As Needed</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">Preferred Communication</label>
                    <select
                      value={clientData.communicationPreference}
                      onChange={(e) => setClientData(prev => ({ ...prev, communicationPreference: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent font-sans"
                    >
                      <option value="email">Email</option>
                      <option value="phone">Phone</option>
                      <option value="both">Both Email & Phone</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 font-sans">Notes</label>
                    <textarea
                      value={clientData.notes}
                      onChange={(e) => setClientData(prev => ({ ...prev, notes: e.target.value }))}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent font-sans"
                      placeholder="Any additional notes about this client..."
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4 font-display">Client Created Successfully!</h2>
              <p className="text-lg text-gray-600 font-sans">
                {clientType === 'individual' 
                  ? `${clientData.firstName} ${clientData.lastName}` 
                  : clientData.companyName
                } has been added to your client list
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-xl border border-gray-200 p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6 font-display">Next Steps</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg">
                    <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 font-bold text-sm">1</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-blue-900 font-sans">Import Transaction Data</h4>
                      <p className="text-sm text-blue-700 font-sans">
                        Connect wallets or upload CSV files to import the client's crypto transactions
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-4 bg-yellow-50 rounded-lg">
                    <div className="h-8 w-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-yellow-600 font-bold text-sm">2</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-yellow-900 font-sans">Review & Classify</h4>
                      <p className="text-sm text-yellow-700 font-sans">
                        Use AI classification to automatically categorize transactions for tax purposes
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 p-4 bg-green-50 rounded-lg">
                    <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-green-600 font-bold text-sm">3</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-green-900 font-sans">Generate Reports</h4>
                      <p className="text-sm text-green-700 font-sans">
                        Create tax forms and reports ready for filing or client delivery
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex space-x-4">
                  <button className="flex-1 px-6 py-3 bg-yellow-400 text-gray-900 rounded-lg hover:bg-yellow-300 transition-colors duration-200 font-sans font-medium">
                    Import Transactions
                  </button>
                  <button className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-sans">
                    View Client Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200">
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 font-display">Add New Client</h1>
              <p className="text-gray-600 font-sans">Create a new client profile for crypto tax services</p>
            </div>
          </div>
          
          {currentStep === 3 && (
            <button 
              disabled={isCreating}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors duration-200 font-sans font-medium"
            >
              {isCreating ? 'Creating...' : 'Create Client'}
            </button>
          )}
        </div>

        {/* Progress Steps */}
        {currentStep < 4 && (
          <div className="mt-8">
            <div className="flex items-center justify-between max-w-3xl">
              {steps.slice(0, 3).map((step, index) => (
                <div key={step.number} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    currentStep >= step.number 
                      ? 'bg-yellow-400 border-yellow-400 text-gray-900' 
                      : 'border-gray-300 text-gray-500'
                  }`}>
                    {currentStep > step.number ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <span className="font-medium">{step.number}</span>
                    )}
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900 font-display">{step.title}</p>
                    <p className="text-xs text-gray-500 font-sans">{step.description}</p>
                  </div>
                  {index < 2 && (
                    <div className="flex-1 h-px bg-gray-300 mx-8" />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="px-8 py-12">
        {renderStepContent()}
      </div>

      {/* Footer */}
      {currentStep < 4 && (
        <div className="bg-white border-t border-gray-200 px-8 py-6">
          <div className="flex justify-between">
            <button
              disabled={currentStep === 1}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-sans"
            >
              Previous
            </button>
            
            <button
              disabled={currentStep === 3 && isCreating}
              className="px-6 py-3 bg-yellow-400 text-gray-900 rounded-lg hover:bg-yellow-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-sans font-medium"
            >
              {currentStep === 3 ? (isCreating ? 'Creating...' : 'Create Client') : 'Next'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddClientWorkflow;