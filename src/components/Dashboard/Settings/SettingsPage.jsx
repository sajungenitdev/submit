"use client";

import React from 'react';
import Image from 'next/image';

const SettingsPage = () => {
    return (
        <div className=" min-h-screen py-12 px-4">
            <div className="max-w-7xl mx-auto bg-white p-10 rounded-xl shadow-sm border border-gray-100">

                <h1 className="text-3xl font-light text-gray-700 mb-10">My Account</h1>

                <form className="grid grid-cols-1 md:grid-cols-12 gap-10">

                    {/* --- Left Column: Avatar (4/12 columns) --- */}
                    <div className="md:col-span-4 space-y-4">
                        <label className="block text-sm font-bold text-gray-600 uppercase tracking-tight">Avatar</label>
                        <div className="w-48 h-48 rounded-full overflow-hidden border-2 border-gray-100 shadow-sm mb-4">
                            <Image
                                src="/assets/sazeduzzaman.jpg"
                                alt="Profile"
                                width={200}
                                height={200}
                                className="object-cover w-full h-full"
                            />
                        </div>
                        <input
                            type="file"
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                        />
                    </div>

                    {/* --- Right Column: Fields (8/12 columns) --- */}
                    <div className="md:col-span-8 space-y-6">

                        {/* Name */}
                        <div>
                            <label className="block text-sm font-bold text-gray-600 mb-2">Name</label>
                            <div className="grid grid-cols-2 gap-4">
                                <input type="text" placeholder="Sazeduzzaman" className="w-full px-3 py-2 border text-gray-500 border-gray-300 rounded outline-none focus:border-blue-500 text-sm" />
                                <input type="text" placeholder="Saju" className="w-full px-3 py-2 border text-gray-500 border-gray-300 rounded outline-none focus:border-blue-500 text-sm" />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-bold text-gray-600 mb-2">Email</label>
                            <div className="flex gap-2">
                                <input type="email" placeholder="szamansaju@gmail.com" className="text-gray-500 w-full px-3 py-2 border border-gray-300 rounded outline-none focus:border-blue-500 text-sm bg-gray-50 " disabled />
                                <button type="button" className="text-black bg-gray-400 hover:bg-gray-500  px-4 py-2 rounded text-xs font-bold whitespace-nowrap uppercase">Change Email</button>
                            </div>
                            <button type="button" className="text-xs text-blue-600 hover:underline mt-2">Confirm your email</button>
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-sm font-bold text-gray-600 mb-2">Phone number</label>
                            <input type="tel" className="w-full px-3 py-2 text-gray-500 border border-gray-300 rounded outline-none focus:border-blue-500 text-sm" />
                        </div>

                        {/* Gender */}
                        <div>
                            <label className="block text-sm font-bold text-gray-600 mb-2">Gender</label>
                            <select className="w-full px-3 py-2 border text-gray-500 border-gray-300 rounded outline-none focus:border-blue-500 text-sm bg-white">
                                <option>Other</option>
                                <option>Male</option>
                                <option>Female</option>
                            </select>
                        </div>

                        {/* Pronouns */}
                        <div>
                            <label className="block text-sm font-bold text-gray-600 mb-2">Pronouns</label>
                            <select className="w-full px-3 py-2 border text-gray-500 border-gray-300 rounded outline-none focus:border-blue-500 text-sm bg-white">
                                <option>Custom</option>
                                <option>He/Him</option>
                                <option>She/Her</option>
                            </select>
                        </div>

                        {/* Birthdate */}
                        <div>
                            <label className="block text-sm font-bold text-gray-600 mb-2">Birthdate</label>
                            <div className="grid grid-cols-3 gap-2">
                                <select className="px-3 py-2 border text-gray-500 border-gray-300 rounded outline-none focus:border-blue-500 text-sm bg-white"><option>Year</option></select>
                                <select className="px-3 py-2 border text-gray-500 border-gray-300 rounded outline-none focus:border-blue-500 text-sm bg-white"><option>Month</option></select>
                                <select className="px-3 py-2 border text-gray-500 border-gray-300 rounded outline-none focus:border-blue-500 text-sm bg-white"><option>Day</option></select>
                            </div>
                        </div>

                        {/* Timezone */}
                        <div>
                            <label className="block text-sm font-bold text-gray-600 mb-2">Timezone</label>
                            <select className="w-full px-3 py-2 border text-gray-500 border-gray-300 rounded outline-none focus:border-blue-500 text-sm bg-white">
                                <option>(GMT-08:00) Pacific Time (US & Canada)</option>
                                <option>(GMT+06:00) Dhaka Time</option>
                            </select>
                        </div>

                        {/* Currency */}
                        <div>
                            <label className="block text-sm font-bold text-gray-600 mb-2">Currency</label>
                            <select className="w-full px-3 py-2 border text-gray-500 border-gray-300 rounded outline-none focus:border-blue-500 text-sm bg-white">
                                <option>United States dollar - $</option>
                                <option>Bangladeshi Taka - ৳</option>
                            </select>
                        </div>

                        {/* Footer Links */}
                        <div className="pt-6 border-t border-gray-100 flex flex-col gap-3">
                            <button type="button" className="text-sm text-blue-600 hover:underline w-fit">Change Password</button>
                            <button type="button" className="text-sm text-blue-600 hover:underline w-fit">Delete Account</button>
                        </div>

                    </div>
                </form>
            </div>
        </div>
    );
};

export default SettingsPage;