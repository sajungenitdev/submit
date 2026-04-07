"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

export default function Step5Screenings({ formData, updateFormData, onNext, onPrev }) {
    const [newScreening, setNewScreening] = useState({
        festivalName: "",
        date: "",
        venue: "",
        city: "",
        country: "",
        status: "pending"
    });

    const [newDistributor, setNewDistributor] = useState({
        company: "",
        contactName: "",
        email: "",
        phone: "",
        territory: ""
    });

    const addScreening = () => {
        if (newScreening.festivalName && newScreening.date) {
            updateFormData({
                screenings: [...formData.screenings, { ...newScreening, id: Date.now() }]
            });
            setNewScreening({
                festivalName: "",
                date: "",
                venue: "",
                city: "",
                country: "",
                status: "pending"
            });
        }
    };

    const removeScreening = (index) => {
        const updated = [...formData.screenings];
        updated.splice(index, 1);
        updateFormData({ screenings: updated });
    };

    const addDistributor = () => {
        if (newDistributor.company && newDistributor.contactName) {
            updateFormData({
                distributors: [...formData.distributors, { ...newDistributor, id: Date.now() }]
            });
            setNewDistributor({
                company: "",
                contactName: "",
                email: "",
                phone: "",
                territory: ""
            });
        }
    };

    const removeDistributor = (index) => {
        const updated = [...formData.distributors];
        updated.splice(index, 1);
        updateFormData({ distributors: updated });
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-900">Screenings & Distribution</h2>
                <p className="text-gray-600 mt-1">Tell us about past/future screenings and distribution</p>
            </div>

            <div className="space-y-6">
                {/* Screenings Section */}
                <div className="border-b border-gray-200 pb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Festival Screenings</h3>
                    
                    {/* Existing Screenings */}
                    {formData.screenings.length > 0 && (
                        <div className="space-y-3 mb-4">
                            {formData.screenings.map((screening, index) => (
                                <div key={screening.id} className="bg-gray-50 p-4 rounded-lg">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h4 className="font-semibold text-gray-900">{screening.festivalName}</h4>
                                            <p className="text-sm text-gray-600">{screening.date}</p>
                                            <p className="text-sm text-gray-500">{screening.venue}, {screening.city}, {screening.country}</p>
                                            <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium mt-1 ${
                                                screening.status === "selected" ? "bg-green-100 text-green-800" :
                                                screening.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                                                "bg-gray-100 text-gray-800"
                                            }`}>
                                                {screening.status.charAt(0).toUpperCase() + screening.status.slice(1)}
                                            </span>
                                        </div>
                                        <button
                                            onClick={() => removeScreening(index)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Add New Screening */}
                    <div className="space-y-3">
                        <h4 className="font-medium text-gray-700">Add New Screening</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <input
                                type="text"
                                placeholder="Festival Name"
                                value={newScreening.festivalName}
                                onChange={(e) => setNewScreening({ ...newScreening, festivalName: e.target.value })}
                                className="text-black px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="date"
                                placeholder="Date"
                                value={newScreening.date}
                                onChange={(e) => setNewScreening({ ...newScreening, date: e.target.value })}
                                className="text-black px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="text"
                                placeholder="Venue"
                                value={newScreening.venue}
                                onChange={(e) => setNewScreening({ ...newScreening, venue: e.target.value })}
                                className="text-black px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="text"
                                placeholder="City"
                                value={newScreening.city}
                                onChange={(e) => setNewScreening({ ...newScreening, city: e.target.value })}
                                className="text-black px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="text"
                                placeholder="Country"
                                value={newScreening.country}
                                onChange={(e) => setNewScreening({ ...newScreening, country: e.target.value })}
                                className="text-black px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                            <select
                                value={newScreening.status}
                                onChange={(e) => setNewScreening({ ...newScreening, status: e.target.value })}
                                className="text-black px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="pending">Pending</option>
                                <option value="selected">Selected</option>
                                <option value="screened">Screened</option>
                                <option value="rejected">Rejected</option>
                            </select>
                        </div>
                        <button
                            type="button"
                            onClick={addScreening}
                            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                        >
                            <Plus className="w-4 h-4" />
                            Add Screening
                        </button>
                    </div>
                </div>

                {/* Distributors Section */}
                <div className="border-b border-gray-200 pb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Distributors</h3>
                    
                    {/* Existing Distributors */}
                    {formData.distributors.length > 0 && (
                        <div className="space-y-3 mb-4">
                            {formData.distributors.map((distributor, index) => (
                                <div key={distributor.id} className="bg-gray-50 p-4 rounded-lg">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h4 className="font-semibold text-gray-900">{distributor.company}</h4>
                                            <p className="text-sm text-gray-600">{distributor.contactName}</p>
                                            <p className="text-sm text-gray-500">{distributor.email} | {distributor.phone}</p>
                                            <p className="text-sm text-gray-500">Territory: {distributor.territory}</p>
                                        </div>
                                        <button
                                            onClick={() => removeDistributor(index)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Add New Distributor */}
                    <div className="space-y-3">
                        <h4 className="font-medium text-gray-700">Add New Distributor</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <input
                                type="text"
                                placeholder="Company Name"
                                value={newDistributor.company}
                                onChange={(e) => setNewDistributor({ ...newDistributor, company: e.target.value })}
                                className="text-black px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="text"
                                placeholder="Contact Name"
                                value={newDistributor.contactName}
                                onChange={(e) => setNewDistributor({ ...newDistributor, contactName: e.target.value })}
                                className="text-black px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                value={newDistributor.email}
                                onChange={(e) => setNewDistributor({ ...newDistributor, email: e.target.value })}
                                className="text-black px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="tel"
                                placeholder="Phone"
                                value={newDistributor.phone}
                                onChange={(e) => setNewDistributor({ ...newDistributor, phone: e.target.value })}
                                className="text-black px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="text"
                                placeholder="Territory (e.g., North America, Worldwide)"
                                value={newDistributor.territory}
                                onChange={(e) => setNewDistributor({ ...newDistributor, territory: e.target.value })}
                                className="md:col-span-2 text-black px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <button
                            type="button"
                            onClick={addDistributor}
                            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                        >
                            <Plus className="w-4 h-4" />
                            Add Distributor
                        </button>
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