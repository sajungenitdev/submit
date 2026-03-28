"use client";

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import {
    Camera,
    Mail,
    MapPin,
    Globe,


    Video,
    Edit2,
    Save,
    X,
    Briefcase,
    Calendar,
    ExternalLink,
    CheckCircle
} from 'lucide-react';

const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef(null);

    // Initial Data
    const [user, setUser] = useState({
        name: "Shajiduzzaman Shaju",
        title: "Independent Filmmaker / MERN Stack Developer",
        bio: "Passionate filmmaker based in Dhaka, Bangladesh. Currently focused on short films and documentary storytelling. I aim to bridge the gap between technology and art through visual media.",
        location: "Dhaka, Bangladesh",
        email: "shajid@engineit.com",
        phone: "+880 1XXX-XXXXXX",
        website: "www.shajid-portfolio.com",
        joined: "March 2026",
        avatar: "/assets/sazeduzzaman.jpg",
        coverPhoto: "/assets/cover-photo.jpg",
        socials: {
            facebook: "facebook.com/shajid",
            linkedin: "linkedin.com/in/shajid",
            vimeo: "vimeo.com/shajid"
        },
        stats: {
            projects: 12,
            submissions: 45,
            selections: 8,
            awards: 2
        },
        skills: ["Film Direction", "Video Editing", "MERN Stack", "Documentary", "Screenwriting"],
        experience: [
            {
                title: "Lead Filmmaker",
                company: "EngineIT Ltd",
                period: "2022 - Present",
                description: "Leading creative video productions and digital storytelling projects"
            },
            {
                title: "Freelance Filmmaker",
                company: "Self-employed",
                period: "2018 - Present",
                description: "Produced and directed multiple award-winning short films"
            }
        ]
    });

    // Form state for editing
    const [editForm, setEditForm] = useState({ ...user });

    const handleEdit = () => {
        if (isEditing) {
            // Save changes
            setUser(editForm);
            setShowSuccessMessage(true);
            setTimeout(() => setShowSuccessMessage(false), 3000);
        }
        setIsEditing(!isEditing);
    };

    const handleCancel = () => {
        setEditForm({ ...user });
        setIsEditing(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSocialChange = (platform, value) => {
        setEditForm(prev => ({
            ...prev,
            socials: { ...prev.socials, [platform]: value }
        }));
    };

    const handleAvatarUpload = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setIsUploading(true);
            // Simulate upload - replace with actual upload logic
            setTimeout(() => {
                const imageUrl = URL.createObjectURL(file);
                if (isEditing) {
                    setEditForm(prev => ({ ...prev, avatar: imageUrl }));
                } else {
                    setUser(prev => ({ ...prev, avatar: imageUrl }));
                }
                setIsUploading(false);
            }, 1000);
        }
    };

    const getSocialIcon = (platform) => {
        switch (platform) {
            // case 'facebook': return <Facebook className="w-4 h-4" />;
            // case 'linkedin': return <Linkedin className="w-4 h-4" />;
            case 'vimeo': return <Video className="w-4 h-4" />;
            default: return <Globe className="w-4 h-4" />;
        }
    };

    const getSocialColor = (platform) => {
        switch (platform) {
            case 'facebook': return 'hover:bg-[#1877f2]';
            case 'linkedin': return 'hover:bg-[#0a66c2]';
            case 'vimeo': return 'hover:bg-[#1ab7ea]';
            default: return 'hover:bg-gray-600';
        }
    };

    return (
        <div className="bg-linear-to-b from-gray-50 to-gray-100 min-h-screen pb-20 max-w-7xl mx-auto">
            {/* Success Message Toast */}
            {showSuccessMessage && (
                <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2 fade-in duration-300">
                    <div className="bg-green-50 border border-green-200 rounded-lg shadow-lg p-4 flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <p className="text-green-700 font-medium">Profile updated successfully!</p>
                    </div>
                </div>
            )}

            {/* Cover Photo */}
            <div className="relative h-64 md:h-80 bg-linear-to-r from-slate-800 via-slate-700 to-slate-800">
                <div className="absolute inset-0 bg-black/20"></div>
                {user.coverPhoto && (
                    <Image
                        src={user.coverPhoto}
                        alt="Cover"
                        fill
                        className="object-cover opacity-50"
                    />
                )}
                <div className="absolute inset-0 bg-linear-to-t from-gray-900/60 to-transparent"></div>

                {/* Profile Picture */}
                <div className="absolute -bottom-16 left-6 md:left-10 z-10">
                    <div className="relative group">
                        <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl border-4 border-white shadow-xl overflow-hidden bg-white">
                            {isUploading ? (
                                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                                </div>
                            ) : (
                                <Image
                                    src={isEditing ? editForm.avatar : user.avatar}
                                    alt={user.name}
                                    width={160}
                                    height={160}
                                    className="object-cover w-full h-full"
                                />
                            )}
                        </div>
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-all duration-200"
                        >
                            <Camera className="w-4 h-4 text-gray-600" />
                        </button>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleAvatarUpload}
                        />
                    </div>
                </div>

                {/* Edit/Cancel Buttons */}
                <div className="absolute top-4 right-4 flex gap-2 z-20">
                    {isEditing ? (
                        <>
                            <button
                                onClick={handleCancel}
                                className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-lg text-gray-700 hover:bg-white transition-all duration-200 flex items-center gap-2 text-sm font-medium"
                            >
                                <X className="w-4 h-4" />
                                Cancel
                            </button>
                            <button
                                onClick={handleEdit}
                                className="px-4 py-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition-all duration-200 flex items-center gap-2 text-sm font-medium shadow-lg"
                            >
                                <Save className="w-4 h-4" />
                                Save Changes
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={handleEdit}
                            className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-lg text-gray-700 hover:bg-white transition-all duration-200 flex items-center gap-2 text-sm font-medium"
                        >
                            <Edit2 className="w-4 h-4" />
                            Edit Profile
                        </button>
                    )}
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 mt-24">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Profile Card */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            {isEditing ? (
                                <>
                                    <input
                                        type="text"
                                        name="name"
                                        value={editForm.name}
                                        onChange={handleInputChange}
                                        className="text-2xl font-bold text-gray-900 w-full mb-2 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <input
                                        type="text"
                                        name="title"
                                        value={editForm.title}
                                        onChange={handleInputChange}
                                        className="text-sm text-blue-600 font-medium w-full mb-4 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </>
                            ) : (
                                <>
                                    <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                                    <p className="text-sm text-blue-600 font-medium mb-4">{user.title}</p>
                                </>
                            )}

                            <div className="flex items-center gap-2 text-xs text-gray-400 mb-6">
                                <Calendar className="w-3 h-3" />
                                <span className="uppercase font-bold tracking-wider">Member Since {user.joined}</span>
                            </div>

                            {!isEditing && (
                                <button
                                    onClick={handleEdit}
                                    className="w-full py-2.5 border-2 border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
                                >
                                    Edit Profile
                                </button>
                            )}
                        </div>

                        {/* Contact Details */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Contact Details</h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-sm">
                                    <Mail className="w-4 h-4 text-gray-400" />
                                    {isEditing ? (
                                        <input
                                            type="email"
                                            name="email"
                                            value={editForm.email}
                                            onChange={handleInputChange}
                                            className="flex-1 text-gray-600 border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    ) : (
                                        <span className="text-gray-600">{user.email}</span>
                                    )}
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <MapPin className="w-4 h-4 text-gray-400" />
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="location"
                                            value={editForm.location}
                                            onChange={handleInputChange}
                                            className="flex-1 text-gray-600 border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    ) : (
                                        <span className="text-gray-600">{user.location}</span>
                                    )}
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <Globe className="w-4 h-4 text-gray-400" />
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="website"
                                            value={editForm.website}
                                            onChange={handleInputChange}
                                            className="flex-1 text-gray-600 border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    ) : (
                                        <a href={`https://${user.website}`} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                                            {user.website}
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Skills Section */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Skills</h3>
                            <div className="flex flex-wrap gap-2">
                                {user.skills.map((skill, index) => (
                                    <span key={index} className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Biography */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <Briefcase className="w-5 h-5 text-blue-600" />
                                Biography
                            </h2>
                            {isEditing ? (
                                <textarea
                                    name="bio"
                                    value={editForm.bio}
                                    onChange={handleInputChange}
                                    rows={4}
                                    className="w-full text-gray-600 leading-relaxed text-sm border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            ) : (
                                <p className="text-gray-600 leading-relaxed text-sm">{user.bio}</p>
                            )}
                        </div>

                        {/* Experience Section */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                            <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                                <Briefcase className="w-5 h-5 text-blue-600" />
                                Experience
                            </h2>
                            <div className="space-y-6">
                                {user.experience.map((exp, index) => (
                                    <div key={index} className="border-l-2 border-blue-200 pl-4">
                                        <h3 className="font-semibold text-gray-800">{exp.title}</h3>
                                        <p className="text-sm text-blue-600 mb-1">{exp.company}</p>
                                        <p className="text-xs text-gray-400 mb-2">{exp.period}</p>
                                        <p className="text-sm text-gray-600">{exp.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                            <h2 className="text-lg font-bold text-gray-800 mb-6 border-b pb-2">Connect & Follow</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {Object.entries(user.socials).map(([platform, link]) => (
                                    <div key={platform} className="group">
                                        {isEditing ? (
                                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200">
                                                {getSocialIcon(platform)}
                                                <input
                                                    type="text"
                                                    value={editForm.socials[platform]}
                                                    onChange={(e) => handleSocialChange(platform, e.target.value)}
                                                    className="flex-1 text-sm  focus:outline-none"
                                                    placeholder={`${platform} username`}
                                                />
                                            </div>
                                        ) : (
                                            <a
                                                href={`https://${link}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-200 hover:border-transparent transition-all duration-200 ${getSocialColor(platform)} group-hover:text-white`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    {getSocialIcon(platform)}
                                                    <span className="text-sm font-medium capitalize text-black">{platform}</span>
                                                </div>
                                                <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </a>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Statistics */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {Object.entries(user.stats).map(([key, value]) => (
                                <div key={key} className="bg-white rounded-2xl p-6 text-center border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
                                    <p className="text-3xl font-bold text-gray-800">{value}</p>
                                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mt-1">{key}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;