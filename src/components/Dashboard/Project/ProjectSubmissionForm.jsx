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
        language: "",
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
        setCurrentStep((prev) => Math.min(prev + 1, 6));
    };

    const prevStep = () => {
        setCurrentStep((prev) => Math.max(prev - 1, 1));
    };

    const handleSubmit = async (paymentIntentId) => {
        setIsSubmitting(true);

        try {
            const submissionData = {
                ...formData,
                paymentIntentId,
                submittedAt: new Date().toISOString(),
            };

            const response = await fetch("/api/projects", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(submissionData),
            });

            if (!response.ok) {
                throw new Error("Submission failed");
            }

            router.push("/dashboard?success=true");
        } catch (error) {
            console.error("Error submitting project:", error);
            alert("There was an error submitting your project. Please try again.");
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