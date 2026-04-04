"use client";

import { Plus, Trash2 } from "lucide-react";

export default function Step3Credits({ formData, updateFormData, onNext, onPrev }) {
    const addPerson = (category, newPerson) => {
        updateFormData({
            [category]: [...formData[category], newPerson]
        });
    };

    const removePerson = (category, index) => {
        const updated = [...formData[category]];
        updated.splice(index, 1);
        updateFormData({ [category]: updated });
    };

    const updatePerson = (category, index, field, value) => {
        const updated = [...formData[category]];
        updated[index][field] = value;
        updateFormData({ [category]: updated });
    };

    const PersonForm = ({ category, title, fields, persons }) => (
        <div className="border-b border-gray-200 pb-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
            {persons.map((person, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg mb-4">
                    <div className="flex justify-between items-start mb-3">
                        <h4 className="font-medium text-gray-700">Person {index + 1}</h4>
                        <button
                            type="button"
                            onClick={() => removePerson(category, index)}
                            className="text-red-500 hover:text-red-700"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {fields.map((field) => (
                            <div key={field.name}>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    {field.label}
                                </label>
                                {field.type === "textarea" ? (
                                    <textarea
                                        value={person[field.name] || ""}
                                        onChange={(e) => updatePerson(category, index, field.name, e.target.value)}
                                        rows={2}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        placeholder={field.placeholder}
                                    />
                                ) : (
                                    <input
                                        type={field.type || "text"}
                                        value={person[field.name] || ""}
                                        onChange={(e) => updatePerson(category, index, field.name, e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        placeholder={field.placeholder}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
            <button
                type="button"
                onClick={() => {
                    const newPerson = {};
                    fields.forEach(field => { newPerson[field.name] = ""; });
                    addPerson(category, newPerson);
                }}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
            >
                <Plus className="w-4 h-4" />
                Add {title.slice(0, -1)}
            </button>
        </div>
    );

    const directorFields = [
        { name: "firstName", label: "First Name", placeholder: "First name" },
        { name: "middleName", label: "Middle Name", placeholder: "Middle name" },
        { name: "lastName", label: "Last Name", placeholder: "Last name" },
        { name: "priorCredits", label: "Prior Credits", type: "textarea", placeholder: "Notable prior works" }
    ];

    const writerFields = [
        { name: "firstName", label: "First Name", placeholder: "First name" },
        { name: "middleName", label: "Middle Name", placeholder: "Middle name" },
        { name: "lastName", label: "Last Name", placeholder: "Last name" },
        { name: "priorCredits", label: "Prior Credits", type: "textarea", placeholder: "Notable prior works" }
    ];

    const producerFields = [
        { name: "firstName", label: "First Name", placeholder: "First name" },
        { name: "middleName", label: "Middle Name", placeholder: "Middle name" },
        { name: "lastName", label: "Last Name", placeholder: "Last name" },
        { name: "priorCredits", label: "Prior Credits", type: "textarea", placeholder: "Notable prior works" }
    ];

    const castFields = [
        { name: "firstName", label: "First Name", placeholder: "First name" },
        { name: "middleName", label: "Middle Name", placeholder: "Middle name" },
        { name: "lastName", label: "Last Name", placeholder: "Last name" },
        { name: "role", label: "Role", placeholder: "Character name" },
        { name: "priorCredits", label: "Prior Credits", type: "textarea", placeholder: "Notable prior works" }
    ];

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-900">Credits</h2>
                <p className="text-gray-600 mt-1">Add key personnel for your project</p>
            </div>

            <PersonForm
                category="directors"
                title="Directors"
                fields={directorFields}
                persons={formData.directors}
            />

            <PersonForm
                category="writers"
                title="Writers"
                fields={writerFields}
                persons={formData.writers}
            />

            <PersonForm
                category="producers"
                title="Producers"
                fields={producerFields}
                persons={formData.producers}
            />

            <PersonForm
                category="keyCast"
                title="Key Cast"
                fields={castFields}
                persons={formData.keyCast}
            />

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