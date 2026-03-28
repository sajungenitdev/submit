"use client";
import Link from 'next/link';
import React, { useState } from 'react';

const AllProject = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [entriesPerPage, setEntriesPerPage] = useState(10);

    // Sample data - Replace this with your API data
    const projects = [
        { id: 1, name: "The Silent Forest", image: "https://via.placeholder.com/40", type: "Feature Film", owner: "Sajiduzzaman Shaju", date: "2026-03-20" },
        { id: 2, name: "Midnight in Dhaka", image: "https://via.placeholder.com/40", type: "Short Film", owner: "Jannatul Anni", date: "2026-03-22" },
        // Add more dummy data here to test pagination...
    ];

    return (
        <div className="p-6  min-h-screen font-sans max-w-7xl mx-auto">

            {/* --- Header Section --- */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">My Projects</h1>
                    <p className="text-sm text-gray-500">Manage your film submissions and project details</p>
                </div>
                <Link href="/project/drop-project" className="bg-[#1EB97A] hover:bg-[#189663] text-white px-6 py-2.5 rounded-md font-semibold flex items-center gap-2 transition-all shadow-sm w-fit">
                    <span className="text-xl">+</span> Add New Project
                </Link>
            </div>

            {/* --- Table Container --- */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">

                {/* Table Controls */}
                <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span>Show</span>
                        <select
                            value={entriesPerPage}
                            onChange={(e) => setEntriesPerPage(e.target.value)}
                            className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-green-500"
                        >
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                        </select>
                        <span>entries</span>
                    </div>

                    <div className="relative w-full sm:w-64">
                        <input
                            type="text"
                            placeholder="Search projects..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <svg className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>

                {/* --- The Table --- */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#F6F7F9] text-gray-600 uppercase text-[11px] font-bold tracking-wider">
                                <th className="px-6 py-4">Project Details</th>
                                <th className="px-6 py-4">Project Type</th>
                                <th className="px-6 py-4">Owner</th>
                                <th className="px-6 py-4">Date Created</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {projects.map((project) => (
                                <tr key={project.id} className="hover:bg-gray-50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <img src={project.image} alt={project.name} className="w-10 h-10 rounded-md object-cover border border-gray-200" />
                                            <span className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors cursor-pointer">{project.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium border border-blue-100">
                                            {project.type}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700 font-medium">
                                        {project.owner}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {project.date}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-gray-400 hover:text-gray-600 px-2 py-1">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" /></svg>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* --- Pagination Footer --- */}
                <div className="p-4 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-white">
                    <p className="text-sm text-gray-500">
                        Showing 1 to {projects.length} of {projects.length} entries
                    </p>
                    <div className="flex items-center gap-1">
                        <button className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-400 cursor-not-allowed">Previous</button>
                        <button className="px-3 py-1 bg-[#1EB97A] text-white rounded text-sm font-medium">1</button>
                        <button className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-50">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllProject;