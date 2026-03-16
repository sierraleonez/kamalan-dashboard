import React from 'react';
import { ChevronRight } from 'lucide-react';

interface Step {
    label: string;
    isActive: boolean;
    isCompleted: boolean;
}

interface RegistryBreadcrumbsProps {
    currentStep: number;
}

export default function RegistryBreadcrumbs({ currentStep }: RegistryBreadcrumbsProps) {
    const steps: Step[] = [
        { label: 'Tentukan Acara', isActive: currentStep === 1, isCompleted: currentStep > 1 },
        { label: 'Pilih Hadiah', isActive: currentStep === 2, isCompleted: currentStep > 2 },
        { label: 'Desain Registry', isActive: currentStep === 3, isCompleted: currentStep > 3 },
        { label: 'Lengkapi Data', isActive: currentStep === 4, isCompleted: currentStep > 4 },
        { label: 'Mari Bagikan!', isActive: currentStep === 5, isCompleted: currentStep > 5 },
    ];

    return (
        <nav className="flex items-center justify-center space-x-2 px-4 py-4 border-b border-[oklch(0.922_0_0)]">
            {steps.map((step, index) => (
                <React.Fragment key={step.label}>
                    <div className={`
                        px-3 py-2 rounded-md text-sm font-medium transition-all duration-200
                        ${step.isActive 
                            ? 'bg-[#889966] text-[oklch(0.985_0_0)]' 
                            : step.isCompleted 
                                ? 'text-[#889966]' 
                                : 'text-gray-500'
                        }
                    `}>
                        {step.label}
                    </div>
                    {index < steps.length - 1 && (
                        <ChevronRight 
                            className={`w-4 h-4 ${
                                step.isCompleted ? 'text-[#889966]' : 'text-gray-400'
                            }`} 
                        />
                    )}
                </React.Fragment>
            ))}
        </nav>
    );
}