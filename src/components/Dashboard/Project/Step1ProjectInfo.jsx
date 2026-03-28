"use client";

const projectTypes = [
    "Film / Video",
    "Script",
    "Music / Songwriting",
    "Photography / Design",
    "VR / XR / Immersive"
];

export default function Step1ProjectInfo({ formData, updateFormData, onNext }) {
    const handleChange = (e) => {
        const { name, value, type } = e.target;
        const checked = e.target.checked;
        
        if (type === "checkbox") {
            updateFormData({ [name]: checked });
        } else {
            updateFormData({ [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onNext();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Project Information</h2>
            
            {/* Project Type */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Type <span className="text-red-500">*</span>
                </label>
                <select
                    name="projectType"
                    required
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                    <option value="">Select project type</option>
                    {projectTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                    ))}
                </select>
            </div>
            
            {/* Project Title */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Title (English) <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    name="projectTitle"
                    required
                    value={formData.projectTitle}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="The Godfather"
                />
            </div>
            
            {/* Brief Synopsis */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Brief Synopsis (English) <span className="text-red-500">*</span>
                </label>
                <textarea
                    name="briefSynopsis"
                    required
                    rows={4}
                    value={formData.briefSynopsis}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                    placeholder="Enter a brief synopsis of your project..."
                />
            </div>
            
            {/* Non-English Title Toggle */}
            <div className="flex items-center">
                <input
                    type="checkbox"
                    name="hasNonEnglishTitle"
                    id="hasNonEnglishTitle"
                    checked={formData.hasNonEnglishTitle}
                    onChange={handleChange}
                    className="h-4 w-4 text-[#1EB97A] focus:ring-[#1EB97A] border-gray-300 rounded"
                />
                <label htmlFor="hasNonEnglishTitle" className="ml-2 block text-sm text-gray-700">
                    My Project also has a non-English Title and Synopsis
                </label>
            </div>
            
            {/* Non-English Fields (Conditional) */}
            {formData.hasNonEnglishTitle && (
                <>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Non-English Title
                        </label>
                        <input
                            type="text"
                            name="nonEnglishTitle"
                            value={formData.nonEnglishTitle}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Non-English Synopsis
                        </label>
                        <textarea
                            name="nonEnglishSynopsis"
                            rows={4}
                            value={formData.nonEnglishSynopsis}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                        />
                    </div>
                </>
            )}
            
            {/* Social Links */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Website
                </label>
                <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="mycoolfilm.com"
                />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        X (Twitter)
                    </label>
                    <input
                        type="url"
                        name="twitter"
                        value={formData.twitter}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        placeholder="x.com/MyCoolFilm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Facebook
                    </label>
                    <input
                        type="url"
                        name="facebook"
                        value={formData.facebook}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        placeholder="facebook.com/MyCoolFilm"
                    />
                </div>
            </div>
            
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Instagram
                </label>
                <input
                    type="url"
                    name="instagram"
                    value={formData.instagram}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="instagram.com/MyCoolFilm"
                />
            </div>
            
            {/* Navigation Buttons */}
            <div className="flex justify-end pt-4">
                <button
                    type="submit"
                    className="bg-[#1EB97A] hover:bg-[#189663] text-white px-6 py-2.5 rounded-md font-semibold transition-all"
                >
                    Next Step →
                </button>
            </div>
        </form>
    );
}