"use client";

const steps = [
    "Project Info",
    "Submitter Info",
    "Credits",
    "Specifications",
    "Screenings",
    "Payment"
];

export default function ProgressBar({ currentStep, totalSteps }) {
    const progress = (currentStep / totalSteps) * 100;
    
    return (
        <div className="border-b border-gray-200">
            <div className="px-6 py-4">
                <div className="flex justify-between mb-2">
                    {steps.map((step, index) => (
                        <div
                            key={step}
                            className={`text-sm font-medium ${
                                index + 1 <= currentStep
                                    ? "text-[#1EB97A]"
                                    : "text-gray-400"
                            }`}
                        >
                            <div className="hidden md:block">{step}</div>
                            <div className="md:hidden text-center">{index + 1}</div>
                        </div>
                    ))}
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                        className="bg-[#1EB97A] rounded-full h-2 transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>
        </div>
    );
}