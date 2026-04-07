"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Step1ProjectInfo from "./Step1ProjectInfo";
import Step2SubmitterInfo from "./Step2SubmitterInfo";
import Step3Credits from "./Step3Credits";
import Step4Specifications from "./Step4Specifications";
import Step5Screenings from "./Step5Screenings";
import Step6Payment from "./Step6Payment";
import ProgressBar from "./ProgressBar";

export default function ProjectSubmissionForm() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        // Step 1: Project Information
        projectType: "",
        projectTitle: "",
        briefSynopsis: "",
        hasNonEnglishTitle: false,
        nonEnglishTitle: "",
        nonEnglishSynopsis: "",
        website: "",
        twitter: "",
        facebook: "",
        instagram: "",

        // Step 2: Submitter Information
        email: "",
        phone: "",
        address: "",
        city: "",
        stateProvince: "",
        postalCode: "",
        country: "",
        birthDate: "",
        gender: "",
        pronouns: "",

        // Step 3: Credits
        directors: [{ firstName: "", middleName: "", lastName: "", priorCredits: "" }],
        writers: [{ firstName: "", middleName: "", lastName: "", priorCredits: "" }],
        producers: [{ firstName: "", middleName: "", lastName: "", priorCredits: "" }],
        keyCast: [{ firstName: "", middleName: "", lastName: "", role: "", priorCredits: "" }],

        // Step 4: Specifications
        projectTypes: [],
        genres: "",
        runtimeHours: "00",
        runtimeMinutes: "00",
        runtimeSeconds: "00",
        completionDate: "",
        productionBudget: "",
        countryOfOrigin: "",
        countryOfFilming: "",
        language: "en", // Default to English
        shootingFormat: "",
        aspectRatio: "16:9",
        filmColor: "Color",
        studentProject: "No",
        firstTimeFilmmaker: "No",

        // Step 5: Screenings
        screenings: [],
        distributors: [],
    });

    const updateFormData = (data) => {
        setFormData((prev) => ({ ...prev, ...data }));
    };

    const nextStep = () => {
        // Validate required fields before proceeding
        if (currentStep === 1) {
            if (!formData.projectType || !formData.projectTitle || !formData.briefSynopsis) {
                alert("Please fill in all required fields in Project Information");
                return;
            }
        }
        if (currentStep === 2) {
            if (!formData.email || !formData.country) {
                alert("Please fill in all required fields in Submitter Information");
                return;
            }
        }
        setCurrentStep((prev) => Math.min(prev + 1, 6));
    };

    const prevStep = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 1));
    };

    // Helper function to validate and fix language code
    const getValidLanguageCode = (language) => {
        if (!language) return "en";
        
        // Map common language names to ISO codes
        const languageMap = {
            'english': 'en',
            'spanish': 'es',
            'french': 'fr',
            'german': 'de',
            'italian': 'it',
            'portuguese': 'pt',
            'chinese': 'zh',
            'japanese': 'ja',
            'korean': 'ko',
            'hindi': 'hi',
            'bengali': 'bn',
            'arabic': 'ar',
            'russian': 'ru',
            'turkish': 'tr',
            'dutch': 'nl',
            'polish': 'pl',
            'swedish': 'sv',
            'danish': 'da',
            'finnish': 'fi',
            'norwegian': 'no',
            'greek': 'el',
            'czech': 'cs',
            'hungarian': 'hu',
            'romanian': 'ro',
            'vietnamese': 'vi',
            'thai': 'th',
            'indonesian': 'id',
            'malay': 'ms',
            'hebrew': 'he',
            'arabic': 'ar'
        };
        
        const lowerLang = language.toLowerCase().trim();
        
        // If it's already a valid ISO code (2 chars)
        if (lowerLang.length === 2 && /^[a-z]{2}$/.test(lowerLang)) {
            return lowerLang;
        }
        
        // Try to map from language name
        if (languageMap[lowerLang]) {
            return languageMap[lowerLang];
        }
        
        // Default to English
        console.warn(`Unrecognized language: ${language}, defaulting to 'en'`);
        return "en";
    };

    const handleSubmit = async (paymentIntentId) => {
        setIsSubmitting(true);
        
        try {
            // Get token from localStorage
            const token = localStorage.getItem('token');
            
            if (!token) {
                alert('Please login to submit your project');
                router.push('/login');
                return;
            }
            
            // Fix the language field before submission
            const fixedLanguage = getValidLanguageCode(formData.language);
            
            // Prepare submission data with fixed language
            const submissionData = {
                ...formData,
                language: fixedLanguage, // Use the fixed language code
                paymentIntentId,
                submittedAt: new Date().toISOString(),
                status: 'pending_review'
            };
            
            console.log('Submitting data:', submissionData);
            
            const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://film-server-qlxt.onrender.com';
            
            // Try Express backend directly (skip Next.js API route)
            let response;
            let lastError;
            
            // Option 1: Try the submit endpoint
            try {
                console.log('Trying Express backend: /api/projects/submit');
                response = await fetch(`${API_URL}/api/projects/submit`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify(submissionData),
                });
                
                if (response.ok) {
                    const data = await response.json();
                    console.log('Submission successful:', data);
                    
                    // Redirect to success page
                    router.push(`/dashboard?success=true&projectId=${data.data.id}`);
                    return;
                } else {
                    const errorData = await response.json();
                    lastError = errorData;
                    console.log('Submit endpoint failed:', errorData);
                }
            } catch (err) {
                console.log('Submit endpoint error:', err);
                lastError = err;
            }
            
            // Option 2: Try the create project endpoint
            try {
                console.log('Trying Express backend: /api/projects');
                response = await fetch(`${API_URL}/api/projects`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify(submissionData),
                });
                
                if (response.ok) {
                    const data = await response.json();
                    console.log('Submission successful:', data);
                    
                    // Redirect to success page
                    router.push(`/dashboard?success=true&projectId=${data.data.id}`);
                    return;
                } else {
                    const errorData = await response.json();
                    lastError = errorData;
                    console.log('Create project endpoint failed:', errorData);
                }
            } catch (err) {
                console.log('Create project endpoint error:', err);
                lastError = err;
            }
            
            // If we get here, both endpoints failed
            throw new Error(lastError?.message || lastError?.error || 'Failed to submit project. Please try again.');
            
        } catch (error) {
            console.error("Error submitting project:", error);
            
            // Show more detailed error message
            let errorMessage = error.message || "There was an error submitting your project. Please try again.";
            
            if (errorMessage.includes('language')) {
                errorMessage = "Invalid language selected. Please go back to Specifications and select a valid language.";
            } else if (errorMessage.includes('token') || errorMessage.includes('auth')) {
                errorMessage = "Your session has expired. Please login again.";
                router.push('/login');
                return;
            }
            
            alert(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <Step1ProjectInfo
                        formData={formData}
                        updateFormData={updateFormData}
                        onNext={nextStep}
                    />
                );
            case 2:
                return (
                    <Step2SubmitterInfo
                        formData={formData}
                        updateFormData={updateFormData}
                        onNext={nextStep}
                        onPrev={prevStep}
                    />
                );
            case 3:
                return (
                    <Step3Credits
                        formData={formData}
                        updateFormData={updateFormData}
                        onNext={nextStep}
                        onPrev={prevStep}
                    />
                );
            case 4:
                return (
                    <Step4Specifications
                        formData={formData}
                        updateFormData={updateFormData}
                        onNext={nextStep}
                        onPrev={prevStep}
                    />
                );
            case 5:
                return (
                    <Step5Screenings
                        formData={formData}
                        updateFormData={updateFormData}
                        onNext={nextStep}
                        onPrev={prevStep}
                    />
                );
            case 6:
                return (
                    <Step6Payment
                        formData={formData}
                        updateFormData={updateFormData}
                        onSubmit={handleSubmit}
                        onPrev={prevStep}
                        isSubmitting={isSubmitting}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-sm">
            <ProgressBar currentStep={currentStep} totalSteps={6} />
            <div className="p-6">
                {renderStep()}
            </div>
        </div>
    );
}