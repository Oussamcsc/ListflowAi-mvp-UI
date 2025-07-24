import React, { createContext, useContext, useState, ReactNode } from 'react';

interface OnboardingData {
  industry: string;
  targetAudience: string;
  customerRoles: string[];
  geographicFocus: string[];
  emailConnected: boolean;
  businessInfo: {
    companyName: string;
    companySize: string;
    website: string;
  };
}

interface OnboardingContextType {
  currentStep: number;
  totalSteps: number;
  onboardingData: OnboardingData;
  updateOnboardingData: (data: Partial<OnboardingData>) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  completeOnboarding: () => Promise<void>;
  isCompleting: boolean;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};

interface OnboardingProviderProps {
  children: ReactNode;
}

const initialOnboardingData: OnboardingData = {
  industry: '',
  targetAudience: '',
  customerRoles: [],
  geographicFocus: [],
  emailConnected: false,
  businessInfo: {
    companyName: '',
    companySize: '',
    website: '',
  },
};

export const OnboardingProvider: React.FC<OnboardingProviderProps> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [onboardingData, setOnboardingData] = useState<OnboardingData>(initialOnboardingData);
  const [isCompleting, setIsCompleting] = useState(false);
  
  const totalSteps = 5; // Welcome, Business Info, Target Audience, Geographic Focus, Email Setup

  const updateOnboardingData = (data: Partial<OnboardingData>) => {
    setOnboardingData(prev => ({
      ...prev,
      ...data,
      businessInfo: {
        ...prev.businessInfo,
        ...(data.businessInfo || {}),
      },
    }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const goToStep = (step: number) => {
    if (step >= 0 && step < totalSteps) {
      setCurrentStep(step);
    }
  };

  const completeOnboarding = async () => {
    setIsCompleting(true);
    try {
      // TODO: Replace with actual API call to save onboarding data
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
      
      console.log('Onboarding completed with data:', onboardingData);
      
      // Reset onboarding state
      setCurrentStep(0);
      setOnboardingData(initialOnboardingData);
    } catch (error) {
      throw new Error('Failed to complete onboarding. Please try again.');
    } finally {
      setIsCompleting(false);
    }
  };

  const value: OnboardingContextType = {
    currentStep,
    totalSteps,
    onboardingData,
    updateOnboardingData,
    nextStep,
    prevStep,
    goToStep,
    completeOnboarding,
    isCompleting,
  };

  return <OnboardingContext.Provider value={value}>{children}</OnboardingContext.Provider>;
};