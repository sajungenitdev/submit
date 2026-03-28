"use client";

function CreditSection({ title, items, onAdd, onRemove, onUpdate, showRole = false }) {
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-800">{title}</h3>
                <button
                    type="button"
                    onClick={onAdd}
                    className="text-sm text-[#1EB97A] hover:text-[#189663] font-medium"
                >
                    + Add {title.slice(0, -1)}
                </button>
            </div>
            
            {items.map((item, index) => (
                <div key={index} className="border text-black border-gray-200 rounded-lg p-4 space-y-3">
                    <div className="flex justify-between items-center">
                        <h4 className="font-medium text-gray-700">{title.slice(0, -1)} #{index + 1}</h4>
                        {items.length > 1 && (
                            <button
                                type="button"
                                onClick={() => onRemove(index)}
                                className="text-red-500 hover:text-red-700 text-sm"
                            >
                                Remove
                            </button>
                        )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                                First Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={item.firstName}
                                onChange={(e) => onUpdate(index, "firstName", e.target.value)}
                                className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                                Middle Name
                            </label>
                            <input
                                type="text"
                                value={item.middleName}
                                onChange={(e) => onUpdate(index, "middleName", e.target.value)}
                                className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                                Last Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={item.lastName}
                                onChange={(e) => onUpdate(index, "lastName", e.target.value)}
                                className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                                required
                            />
                        </div>
                    </div>
                    
                    {showRole && (
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                                Role <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={item.role || ""}
                                onChange={(e) => onUpdate(index, "role", e.target.value)}
                                className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                                placeholder="e.g., Lead Actor, Supporting Actor"
                                required
                            />
                        </div>
                    )}
                    
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                            Prior Credits (Optional)
                        </label>
                        <textarea
                            value={item.priorCredits}
                            onChange={(e) => onUpdate(index, "priorCredits", e.target.value)}
                            rows={2}
                            className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm resize-none"
                            placeholder="Previous works, awards, etc."
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default function Step3Credits({ formData, updateFormData, onNext, onPrev }) {
    const updateDirectors = (directors) => {
        updateFormData({ directors });
    };
    
    const updateWriters = (writers) => {
        updateFormData({ writers });
    };
    
    const updateProducers = (producers) => {
        updateFormData({ producers });
    };
    
    const updateKeyCast = (keyCast) => {
        updateFormData({ keyCast });
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        onNext();
    };
    
    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Credits</h2>
            
            {/* Directors Section */}
            <CreditSection
                title="Directors"
                items={formData.directors}
                onAdd={() => updateDirectors([...formData.directors, { firstName: "", middleName: "", lastName: "", priorCredits: "" }])}
                onRemove={(index) => updateDirectors(formData.directors.filter((_, i) => i !== index))}
                onUpdate={(index, field, value) => {
                    const updated = [...formData.directors];
                    updated[index] = { ...updated[index], [field]: value };
                    updateDirectors(updated);
                }}
            />
            
            {/* Writers Section */}
            <CreditSection
                title="Writers"
                items={formData.writers}
                onAdd={() => updateWriters([...formData.writers, { firstName: "", middleName: "", lastName: "", priorCredits: "" }])}
                onRemove={(index) => updateWriters(formData.writers.filter((_, i) => i !== index))}
                onUpdate={(index, field, value) => {
                    const updated = [...formData.writers];
                    updated[index] = { ...updated[index], [field]: value };
                    updateWriters(updated);
                }}
            />
            
            {/* Producers Section */}
            <CreditSection
                title="Producers"
                items={formData.producers}
                onAdd={() => updateProducers([...formData.producers, { firstName: "", middleName: "", lastName: "", priorCredits: "" }])}
                onRemove={(index) => updateProducers(formData.producers.filter((_, i) => i !== index))}
                onUpdate={(index, field, value) => {
                    const updated = [...formData.producers];
                    updated[index] = { ...updated[index], [field]: value };
                    updateProducers(updated);
                }}
            />
            
            {/* Key Cast Section */}
            <CreditSection
                title="Key Cast"
                items={formData.keyCast}
                onAdd={() => updateKeyCast([...formData.keyCast, { firstName: "", middleName: "", lastName: "", role: "", priorCredits: "" }])}
                onRemove={(index) => updateKeyCast(formData.keyCast.filter((_, i) => i !== index))}
                onUpdate={(index, field, value) => {
                    const updated = [...formData.keyCast];
                    updated[index] = { ...updated[index], [field]: value };
                    updateKeyCast(updated);
                }}
                showRole={true}
            />
            
            {/* Navigation Buttons */}
            <div className="flex justify-between pt-4">
                <button
                    type="button"
                    onClick={onPrev}
                    className="px-6 py-2.5 border text-black border-gray-300 rounded-md font-semibold text-gray-700 hover:bg-gray-50 transition-all"
                >
                    ← Previous
                </button>
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