"use client";

import { useState } from "react";

export default function Step5Screenings({ formData, updateFormData, onNext, onPrev }) {
    const [showScreeningForm, setShowScreeningForm] = useState(false);
    const [showDistributorForm, setShowDistributorForm] = useState(false);
    const [newScreening, setNewScreening] = useState({
        eventName: "",
        date: "",
        award: "",
        notes: ""
    });
    const [newDistributor, setNewDistributor] = useState({
        companyName: "",
        contactPerson: "",
        email: "",
        phone: "",
        territory: ""
    });

    const addScreening = () => {
        if (newScreening.eventName && newScreening.date) {
            updateFormData({
                screenings: [...formData.screenings, { ...newScreening }]
            });
            setNewScreening({ eventName: "", date: "", award: "", notes: "" });
            setShowScreeningForm(false);
        }
    };

    const removeScreening = (index) => {
        const updatedScreenings = formData.screenings.filter((_, i) => i !== index);
        updateFormData({ screenings: updatedScreenings });
    };

    const addDistributor = () => {
        if (newDistributor.companyName) {
            updateFormData({
                distributors: [...formData.distributors, { ...newDistributor }]
            });
            setNewDistributor({ companyName: "", contactPerson: "", email: "", phone: "", territory: "" });
            setShowDistributorForm(false);
        }
    };

    const removeDistributor = (index) => {
        const updatedDistributors = formData.distributors.filter((_, i) => i !== index);
        updateFormData({ distributors: updatedDistributors });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onNext();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Screenings & Distribution</h2>
            
            {/* Screenings Section */}
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium text-gray-800">Screenings & Awards</h3>
                    <button
                        type="button"
                        onClick={() => setShowScreeningForm(!showScreeningForm)}
                        className="text-sm text-[#1EB97A] hover:text-[#189663] font-medium"
                    >
                        + Add a Screening
                    </button>
                </div>
                
                {/* Add Screening Form */}
                {showScreeningForm && (
                    <div className="border border-gray-200 rounded-lg p-4 space-y-3 bg-gray-50">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">
                                    Event Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={newScreening.eventName}
                                    onChange={(e) => setNewScreening({ ...newScreening, eventName: e.target.value })}
                                    className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">
                                    Date <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    value={newScreening.date}
                                    onChange={(e) => setNewScreening({ ...newScreening, date: e.target.value })}
                                    className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                                Award (if applicable)
                            </label>
                            <input
                                type="text"
                                value={newScreening.award}
                                onChange={(e) => setNewScreening({ ...newScreening, award: e.target.value })}
                                className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                                placeholder="Best Film, Audience Award, etc."
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                                Notes
                            </label>
                            <textarea
                                value={newScreening.notes}
                                onChange={(e) => setNewScreening({ ...newScreening, notes: e.target.value })}
                                rows={2}
                                className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm resize-none"
                                placeholder="Additional details about the screening..."
                            />
                        </div>
                        <div className="flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={() => setShowScreeningForm(false)}
                                className="px-3 py-1.5 text-sm border text-black border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={addScreening}
                                className="px-3 py-1.5 text-sm bg-[#1EB97A] text-white rounded-md hover:bg-[#189663]"
                            >
                                Add Screening
                            </button>
                        </div>
                    </div>
                )}
                
                {/* Screenings List */}
                {formData.screenings.length > 0 && (
                    <div className="space-y-3">
                        {formData.screenings.map((screening, index) => (
                            <div key={index} className="border border-gray-200 rounded-lg p-4">
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <h4 className="font-medium text-gray-800">{screening.eventName}</h4>
                                        <p className="text-sm text-gray-600 mt-1">Date: {screening.date}</p>
                                        {screening.award && (
                                            <p className="text-sm text-[#1EB97A] mt-1">🏆 {screening.award}</p>
                                        )}
                                        {screening.notes && (
                                            <p className="text-sm text-gray-500 mt-1">{screening.notes}</p>
                                        )}
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => removeScreening(index)}
                                        className="text-red-500 hover:text-red-700 text-sm"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            
            {/* Distributors Section */}
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium text-gray-800">Distribution Information</h3>
                    <button
                        type="button"
                        onClick={() => setShowDistributorForm(!showDistributorForm)}
                        className="text-sm text-[#1EB97A] hover:text-[#189663] font-medium"
                    >
                        + Add a Distributor / Sales Agent
                    </button>
                </div>
                
                {/* Add Distributor Form */}
                {showDistributorForm && (
                    <div className="border border-gray-200 rounded-lg p-4 space-y-3 bg-gray-50">
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                                Company Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={newDistributor.companyName}
                                onChange={(e) => setNewDistributor({ ...newDistributor, companyName: e.target.value })}
                                className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">
                                    Contact Person
                                </label>
                                <input
                                    type="text"
                                    value={newDistributor.contactPerson}
                                    onChange={(e) => setNewDistributor({ ...newDistributor, contactPerson: e.target.value })}
                                    className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={newDistributor.email}
                                    onChange={(e) => setNewDistributor({ ...newDistributor, email: e.target.value })}
                                    className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">
                                    Phone
                                </label>
                                <input
                                    type="tel"
                                    value={newDistributor.phone}
                                    onChange={(e) => setNewDistributor({ ...newDistributor, phone: e.target.value })}
                                    className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-600 mb-1">
                                    Territory
                                </label>
                                <input
                                    type="text"
                                    value={newDistributor.territory}
                                    onChange={(e) => setNewDistributor({ ...newDistributor, territory: e.target.value })}
                                    className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                                    placeholder="Worldwide, North America, etc."
                                />
                            </div>
                        </div>
                        <div className="flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={() => setShowDistributorForm(false)}
                                className="px-3 py-1.5 text-sm border text-black border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={addDistributor}
                                className="px-3 py-1.5 text-sm bg-[#1EB97A] text-white rounded-md hover:bg-[#189663]"
                            >
                                Add Distributor
                            </button>
                        </div>
                    </div>
                )}
                
                {/* Distributors List */}
                {formData.distributors.length > 0 && (
                    <div className="space-y-3">
                        {formData.distributors.map((distributor, index) => (
                            <div key={index} className="border border-gray-200 rounded-lg p-4">
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <h4 className="font-medium text-gray-800">{distributor.companyName}</h4>
                                        {distributor.contactPerson && (
                                            <p className="text-sm text-gray-600 mt-1">Contact: {distributor.contactPerson}</p>
                                        )}
                                        <div className="flex gap-3 mt-1">
                                            {distributor.email && (
                                                <p className="text-sm text-gray-500">{distributor.email}</p>
                                            )}
                                            {distributor.phone && (
                                                <p className="text-sm text-gray-500">{distributor.phone}</p>
                                            )}
                                        </div>
                                        {distributor.territory && (
                                            <p className="text-sm text-gray-500 mt-1">Territory: {distributor.territory}</p>
                                        )}
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => removeDistributor(index)}
                                        className="text-red-500 hover:text-red-700 text-sm"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            
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