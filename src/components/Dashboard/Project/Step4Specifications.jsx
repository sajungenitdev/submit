"use client";

import { useState } from "react";

export default function Step4Specifications({ formData, updateFormData, onNext, onPrev }) {
    const [errors, setErrors] = useState({});

    const projectTypeOptions = [
        "Short Film", "Documentary", "Feature Film", "Music Video",
        "Commercial", "Animation", "Web Series", "Experimental", "Other"
    ];

    const genreOptions = [
        "Action", "Adventure", "Animation", "Comedy", "Crime", "Documentary",
        "Drama", "Family", "Fantasy", "Horror", "Musical", "Mystery",
        "Romance", "Sci-Fi", "Thriller", "War", "Western", "Other"
    ];

    const formatOptions = [
        "Digital 4K", "Digital 2K", "HD", "Super 16mm", "35mm", "IMAX",
        "Virtual Reality", "Mobile", "Other"
    ];

    const aspectRatios = ["16:9", "4:3", "2.35:1", "1.85:1", "1.33:1", "Other"];

    const handleProjectTypeToggle = (type) => {
        const current = [...formData.projectTypes];
        if (current.includes(type)) {
            const index = current.indexOf(type);
            current.splice(index, 1);
        } else {
            current.push(type);
        }
        updateFormData({ projectTypes: current });
    };

    const handleRuntimeChange = (field, value) => {
        // Ensure value is within bounds
        if (field === 'runtimeHours' && (parseInt(value) > 23 || parseInt(value) < 0)) return;
        if (field === 'runtimeMinutes' && (parseInt(value) > 59 || parseInt(value) < 0)) return;
        if (field === 'runtimeSeconds' && (parseInt(value) > 59 || parseInt(value) < 0)) return;
        updateFormData({ [field]: value.padStart(2, '0') });
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-900">Technical Specifications</h2>
                <p className="text-gray-600 mt-1">Provide detailed technical information</p>
            </div>

            <div className="space-y-6">
                {/* Project Types (Multiple Select) */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Project Type(s) <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {projectTypeOptions.map((type) => (
                            <label key={type} className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={formData.projectTypes.includes(type)}
                                    onChange={() => handleProjectTypeToggle(type)}
                                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                                />
                                <span className="text-sm text-gray-700">{type}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Genres */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Genres <span className="text-red-500">*</span>
                    </label>
                    <select
                        value={formData.genres}
                        onChange={(e) => updateFormData({ genres: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select primary genre</option>
                        {genreOptions.map((genre) => (
                            <option key={genre} value={genre}>{genre}</option>
                        ))}
                    </select>
                </div>

                {/* Runtime */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Runtime
                    </label>
                    <div className="flex gap-3">
                        <div className="flex-1">
                            <label className="block text-xs text-gray-500 mb-1">Hours</label>
                            <select
                                value={formData.runtimeHours}
                                onChange={(e) => handleRuntimeChange('runtimeHours', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            >
                                {Array.from({ length: 24 }, (_, i) => (
                                    <option key={i} value={i.toString().padStart(2, '0')}>
                                        {i.toString().padStart(2, '0')}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex-1">
                            <label className="block text-xs text-gray-500 mb-1">Minutes</label>
                            <select
                                value={formData.runtimeMinutes}
                                onChange={(e) => handleRuntimeChange('runtimeMinutes', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            >
                                {Array.from({ length: 60 }, (_, i) => (
                                    <option key={i} value={i.toString().padStart(2, '0')}>
                                        {i.toString().padStart(2, '0')}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex-1">
                            <label className="block text-xs text-gray-500 mb-1">Seconds</label>
                            <select
                                value={formData.runtimeSeconds}
                                onChange={(e) => handleRuntimeChange('runtimeSeconds', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            >
                                {Array.from({ length: 60 }, (_, i) => (
                                    <option key={i} value={i.toString().padStart(2, '0')}>
                                        {i.toString().padStart(2, '0')}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Completion Date */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Completion Date
                    </label>
                    <input
                        type="date"
                        value={formData.completionDate}
                        onChange={(e) => updateFormData({ completionDate: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Production Budget
                        </label>
                        <input
                            type="text"
                            value={formData.productionBudget}
                            onChange={(e) => updateFormData({ productionBudget: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g., $50,000"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Country of Origin
                        </label>
                        <input
                            type="text"
                            value={formData.countryOfOrigin}
                            onChange={(e) => updateFormData({ countryOfOrigin: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="Country"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Country of Filming
                        </label>
                        <input
                            type="text"
                            value={formData.countryOfFilming}
                            onChange={(e) => updateFormData({ countryOfFilming: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="Country"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Primary Language
                        </label>
                        <input
                            type="text"
                            value={formData.language}
                            onChange={(e) => updateFormData({ language: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g., English, French, Spanish"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Shooting Format
                        </label>
                        <select
                            value={formData.shootingFormat}
                            onChange={(e) => updateFormData({ shootingFormat: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select format</option>
                            {formatOptions.map((format) => (
                                <option key={format} value={format}>{format}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Aspect Ratio
                        </label>
                        <select
                            value={formData.aspectRatio}
                            onChange={(e) => updateFormData({ aspectRatio: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                            {aspectRatios.map((ratio) => (
                                <option key={ratio} value={ratio}>{ratio}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Film Color
                        </label>
                        <select
                            value={formData.filmColor}
                            onChange={(e) => updateFormData({ filmColor: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="Color">Color</option>
                            <option value="Black and White">Black and White</option>
                            <option value="Mixed">Mixed</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Student Project?
                        </label>
                        <select
                            value={formData.studentProject}
                            onChange={(e) => updateFormData({ studentProject: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="No">No</option>
                            <option value="Yes">Yes</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            First Time Filmmaker?
                        </label>
                        <select
                            value={formData.firstTimeFilmmaker}
                            onChange={(e) => updateFormData({ firstTimeFilmmaker: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="No">No</option>
                            <option value="Yes">Yes</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="flex justify-between pt-6">
                <button
                    onClick={onPrev}
                    className="px-6 py-2.5 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition"
                >
                    ← Previous
                </button>
                <button
                    onClick={onNext}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-semibold transition"
                >
                    Next Step →
                </button>
            </div>
        </div>
    );
}