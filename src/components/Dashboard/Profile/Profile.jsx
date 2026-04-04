"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
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
    CheckCircle,
    Loader2,
    User,
    Phone,
    Link as LinkIcon,
    AlertCircle
} from 'lucide-react';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Profile = () => {
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const fileInputRef = useRef(null);
    const coverInputRef = useRef(null);

    // User Data State
    const [user, setUser] = useState({
        id: '',
        name: '',
        fullName: '',
        username: '',
        title: '',
        bio: '',
        location: '',
        email: '',
        phone: '',
        website: '',
        joined: '',
        avatar: '',
        coverPhoto: '',
        socials: {
            twitter: '',
            facebook: '',
            linkedin: '',
            instagram: '',
            vimeo: ''
        },
        stats: {
            projects: 0,
            submissions: 0,
            selections: 0,
            awards: 0
        },
        skills: [],
        experience: [],
        education: []
    });

    // Form state for editing
    const [editForm, setEditForm] = useState({ ...user });
    const [newSkill, setNewSkill] = useState('');
    const [newExperience, setNewExperience] = useState({
        title: '',
        company: '',
        period: '',
        description: ''
    });
    const [showAddExperience, setShowAddExperience] = useState(false);
    const [passwordData, setPasswordData] = useState({
        password: '',
        confirmPassword: ''
    });

    // Fetch user data on mount
    useEffect(() => {
        fetchUserProfile();
    }, []);

    const fetchUserProfile = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');

            if (!token) {
                router.push('/login');
                return;
            }

            const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
            const response = await fetch(`${API_URL}/api/users/profile`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                if (response.status === 401) {
                    router.push('/login');
                    return;
                }
                throw new Error('Failed to fetch profile');
            }

            const data = await response.json();
            const userData = data.data || data.user || data;

            // Format date for joined
            const joinedDate = userData.createdAt
                ? new Date(userData.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
                : new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

            const formattedUser = {
                id: userData.id || userData._id,
                name: userData.name || userData.fullName || '',
                fullName: userData.fullName || userData.name || '',
                username: userData.username || '',
                title: userData.title || 'Filmmaker / Developer',
                bio: userData.bio || '',
                location: userData.location || '',
                email: userData.email || '',
                phone: userData.phone || '',
                website: userData.website || '',
                joined: joinedDate,
                avatar: userData.avatar || userData.profileImage || '',
                coverPhoto: userData.coverPhoto || '',
                socials: {
                    twitter: userData.socialMedia?.twitter || userData.socials?.twitter || '',
                    facebook: userData.socialMedia?.facebook || userData.socials?.facebook || '',
                    linkedin: userData.socialMedia?.linkedin || userData.socials?.linkedin || '',
                    instagram: userData.socialMedia?.instagram || userData.socials?.instagram || '',
                    vimeo: userData.socialMedia?.vimeo || userData.socials?.vimeo || ''
                },
                stats: {
                    projects: userData.stats?.projects || 0,
                    submissions: userData.stats?.submissions || 0,
                    selections: userData.stats?.selections || 0,
                    awards: userData.stats?.awards || 0
                },
                skills: userData.skills || [],
                experience: userData.experience || [],
                education: userData.education || []
            };

            setUser(formattedUser);
            setEditForm(JSON.parse(JSON.stringify(formattedUser)));

        } catch (error) {
            console.error('Error fetching profile:', error);
            setError('Failed to load profile data');
        } finally {
            setLoading(false);
        }
    };

    // Handle avatar upload and convert to base64
    const handleAvatarUpload = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                setError('Please upload an image file');
                return;
            }
            if (file.size > 2 * 1024 * 1024) {
                setError('Image size should be less than 2MB');
                return;
            }

            setIsUploading(true);
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result;
                setEditForm(prev => ({ ...prev, avatar: base64String }));
                setIsUploading(false);
            };
            reader.onerror = () => {
                setError('Failed to read image file');
                setIsUploading(false);
            };
            reader.readAsDataURL(file);
        }
    };

    // Handle cover photo upload
    const handleCoverUpload = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                setError('Please upload an image file');
                return;
            }
            if (file.size > 5 * 1024 * 1024) {
                setError('Cover image size should be less than 5MB');
                return;
            }

            setIsUploading(true);
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result;
                setEditForm(prev => ({ ...prev, coverPhoto: base64String }));
                setIsUploading(false);
            };
            reader.readAsDataURL(file);
        }
    };

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'password' || name === 'confirmPassword') {
            setPasswordData(prev => ({ ...prev, [name]: value }));
        } else {
            setEditForm(prev => ({ ...prev, [name]: value }));
        }
    };

    // Handle social media changes
    const handleSocialChange = (platform, value) => {
        setEditForm(prev => ({
            ...prev,
            socials: { ...prev.socials, [platform]: value }
        }));
    };

    // Add skill
    const addSkill = () => {
        if (newSkill.trim() && !editForm.skills.includes(newSkill.trim())) {
            setEditForm(prev => ({
                ...prev,
                skills: [...prev.skills, newSkill.trim()]
            }));
            setNewSkill('');
        }
    };

    // Remove skill
    const removeSkill = (skillToRemove) => {
        setEditForm(prev => ({
            ...prev,
            skills: prev.skills.filter(skill => skill !== skillToRemove)
        }));
    };

    // Add experience
    const addExperience = () => {
        if (newExperience.title && newExperience.company) {
            setEditForm(prev => ({
                ...prev,
                experience: [...prev.experience, { ...newExperience }]
            }));
            setNewExperience({ title: '', company: '', period: '', description: '' });
            setShowAddExperience(false);
        }
    };

    // Remove experience
    const removeExperience = (index) => {
        setEditForm(prev => ({
            ...prev,
            experience: prev.experience.filter((_, i) => i !== index)
        }));
    };

    // Handle form submission
    // Handle form submission
    const handleSave = async () => {
        setSubmitting(true);
        setError('');

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                router.push('/login');
                return;
            }

            const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

            // Prepare data for API - Make sure all fields are properly structured
            const submitData = {
                fullName: editForm.fullName || editForm.name,
                name: editForm.fullName || editForm.name,
                username: editForm.username,
                title: editForm.title,
                bio: editForm.bio,
                location: editForm.location,
                email: editForm.email,
                phone: editForm.phone,
                website: editForm.website,
                socialMedia: editForm.socials,  // Send the entire socials object
                skills: editForm.skills,
                experience: editForm.experience,
                stats: editForm.stats
            };

            console.log('Sending data to server:', submitData); // Debug log

            // Add images if changed (only if they are base64 strings)
            if (editForm.avatar && editForm.avatar.startsWith('data:image')) {
                submitData.profileImage = editForm.avatar;
            }
            if (editForm.coverPhoto && editForm.coverPhoto.startsWith('data:image')) {
                submitData.coverPhoto = editForm.coverPhoto;
            }

            // Add password if changed
            if (passwordData.password && passwordData.password.trim() !== '') {
                if (passwordData.password.length < 6) {
                    throw new Error('Password must be at least 6 characters');
                }
                if (passwordData.password !== passwordData.confirmPassword) {
                    throw new Error('Passwords do not match');
                }
                submitData.password = passwordData.password;
            }

            const response = await fetch(`${API_URL}/api/users/profile`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(submitData)
            });

            const data = await response.json();
            console.log('Server response:', data); // Debug log

            if (!response.ok) {
                throw new Error(data.message || 'Failed to update profile');
            }

            // Refresh data from server
            await fetchUserProfile();

            setSuccessMessage('Profile updated successfully!');
            setShowSuccessMessage(true);
            setIsEditing(false);
            setPasswordData({ password: '', confirmPassword: '' });

            setTimeout(() => {
                setShowSuccessMessage(false);
            }, 3000);

        } catch (error) {
            console.error('Error updating profile:', error);
            setError(error.message || 'Failed to update profile');
        } finally {
            setSubmitting(false);
        }
    };

    const handleCancel = () => {
        setEditForm(JSON.parse(JSON.stringify(user)));
        setPasswordData({ password: '', confirmPassword: '' });
        setIsEditing(false);
        setError('');
        setNewSkill('');
        setShowAddExperience(false);
    };

    // Get social icon component
    const getSocialIcon = (platform) => {
        switch (platform) {
            case 'twitter': return <FaTwitter className="w-4 h-4" />;
            case 'facebook': return <FaFacebook className="w-4 h-4" />;
            case 'linkedin': return <FaLinkedin className="w-4 h-4" />;
            case 'instagram': return <FaInstagram className="w-4 h-4" />;
            case 'vimeo': return <Video className="w-4 h-4" />;
            default: return <Globe className="w-4 h-4" />;
        }
    };

    const getSocialColor = (platform) => {
        switch (platform) {
            case 'twitter': return 'hover:bg-[#1DA1F2]';
            case 'facebook': return 'hover:bg-[#1877f2]';
            case 'linkedin': return 'hover:bg-[#0a66c2]';
            case 'instagram': return 'hover:bg-[#E4405F]';
            case 'vimeo': return 'hover:bg-[#1ab7ea]';
            default: return 'hover:bg-gray-600';
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto" />
                    <p className="mt-4 text-gray-600">Loading profile...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen pb-20">
            {/* Success Message Toast */}
            {showSuccessMessage && (
                <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2 fade-in duration-300">
                    <div className="bg-green-50 border border-green-200 rounded-lg shadow-lg p-4 flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <p className="text-green-700 font-medium">{successMessage}</p>
                    </div>
                </div>
            )}

            {/* Error Message */}
            {error && (
                <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2 fade-in duration-300">
                    <div className="bg-red-50 border border-red-200 rounded-lg shadow-lg p-4 flex items-center gap-3">
                        <AlertCircle className="w-5 h-5 text-red-500" />
                        <p className="text-red-700 font-medium">{error}</p>
                    </div>
                </div>
            )}

            {/* Cover Photo */}
            <div className="relative h-64 md:h-80 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800">
                <div className="absolute inset-0 bg-black/20"></div>
                {(isEditing ? editForm.coverPhoto : user.coverPhoto) && (
                    <img
                        src={isEditing ? editForm.coverPhoto : user.coverPhoto}
                        alt="Cover"
                        className="w-full h-full object-cover opacity-50"
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>

                {/* Cover Photo Upload Button */}
                {isEditing && (
                    <button
                        onClick={() => coverInputRef.current?.click()}
                        className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-2 hover:bg-white transition-all duration-200 z-20"
                    >
                        <Camera className="w-5 h-5 text-gray-700" />
                    </button>
                )}
                <input
                    ref={coverInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleCoverUpload}
                />

                {/* Profile Picture */}
                <div className="absolute -bottom-16 left-6 md:left-10 z-10">
                    <div className="relative group">
                        <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl border-4 border-white shadow-xl overflow-hidden bg-white">
                            {isUploading ? (
                                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                    <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                                </div>
                            ) : (
                                <img
                                    src={isEditing ? editForm.avatar : user.avatar}
                                    alt={user.name}
                                    className="object-cover w-full h-full"
                                    onError={(e) => {
                                        e.target.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user.name || 'User') + '&background=3b82f6&color=fff';
                                    }}
                                />
                            )}
                        </div>
                        {isEditing && (
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-all duration-200"
                            >
                                <Camera className="w-4 h-4 text-gray-600" />
                            </button>
                        )}
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
                                disabled={submitting}
                                className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-lg text-gray-700 hover:bg-white transition-all duration-200 flex items-center gap-2 text-sm font-medium"
                            >
                                <X className="w-4 h-4" />
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={submitting}
                                className="px-4 py-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition-all duration-200 flex items-center gap-2 text-sm font-medium shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {submitting ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Save className="w-4 h-4" />
                                        Save Changes
                                    </>
                                )}
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => setIsEditing(true)}
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
                                        name="fullName"
                                        value={editForm.fullName}
                                        onChange={handleInputChange}
                                        className="text-2xl font-bold text-gray-900 w-full mb-2 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Full Name"
                                    />
                                    <input
                                        type="text"
                                        name="title"
                                        value={editForm.title}
                                        onChange={handleInputChange}
                                        className="text-sm text-blue-600 font-medium w-full mb-4 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Title"
                                    />
                                </>
                            ) : (
                                <>
                                    <h1 className="text-2xl font-bold text-gray-900">{user.fullName || user.name}</h1>
                                    <p className="text-sm text-blue-600 font-medium mb-4">{user.title}</p>
                                </>
                            )}

                            <div className="flex items-center gap-2 text-xs text-gray-400 mb-6">
                                <Calendar className="w-3 h-3" />
                                <span className="uppercase font-bold tracking-wider">Member Since {user.joined}</span>
                            </div>
                        </div>

                        {/* Contact Details */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Contact Details</h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-sm">
                                    <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                    {isEditing ? (
                                        <input
                                            type="email"
                                            name="email"
                                            value={editForm.email}
                                            onChange={handleInputChange}
                                            className="flex-1 text-gray-600 border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Email"
                                        />
                                    ) : (
                                        <span className="text-gray-600 break-all">{user.email}</span>
                                    )}
                                </div>

                                <div className="flex items-center gap-3 text-sm">
                                    <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="phone"
                                            value={editForm.phone}
                                            onChange={handleInputChange}
                                            className="flex-1 text-gray-600 border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Phone"
                                        />
                                    ) : (
                                        <span className="text-gray-600">{user.phone || 'Not provided'}</span>
                                    )}
                                </div>

                                <div className="flex items-center gap-3 text-sm">
                                    <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="location"
                                            value={editForm.location}
                                            onChange={handleInputChange}
                                            className="flex-1 text-gray-600 border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Location"
                                        />
                                    ) : (
                                        <span className="text-gray-600">{user.location || 'Not provided'}</span>
                                    )}
                                </div>

                                <div className="flex items-center gap-3 text-sm">
                                    <LinkIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="website"
                                            value={editForm.website}
                                            onChange={handleInputChange}
                                            className="flex-1 text-gray-600 border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Website"
                                        />
                                    ) : (
                                        user.website ? (
                                            <a href={`https://${user.website}`} className="text-blue-600 hover:underline break-all" target="_blank" rel="noopener noreferrer">
                                                {user.website}
                                            </a>
                                        ) : (
                                            <span className="text-gray-600">Not provided</span>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Skills Section */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Skills</h3>
                            {isEditing ? (
                                <div className="space-y-3">
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={newSkill}
                                            onChange={(e) => setNewSkill(e.target.value)}
                                            onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                                            className="flex-1 text-gray-600 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Add a skill"
                                        />
                                        <button
                                            type="button"
                                            onClick={addSkill}
                                            className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                                        >
                                            Add
                                        </button>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {editForm.skills.map((skill, index) => (
                                            <span key={index} className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full">
                                                {skill}
                                                <button
                                                    type="button"
                                                    onClick={() => removeSkill(skill)}
                                                    className="hover:text-red-600 ml-1"
                                                >
                                                    <X className="w-3 h-3" />
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-wrap gap-2">
                                    {user.skills.length > 0 ? (
                                        user.skills.map((skill, index) => (
                                            <span key={index} className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full">
                                                {skill}
                                            </span>
                                        ))
                                    ) : (
                                        <p className="text-gray-500 text-sm">No skills added yet</p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Biography */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <User className="w-5 h-5 text-blue-600" />
                                Biography
                            </h2>
                            {isEditing ? (
                                <textarea
                                    name="bio"
                                    value={editForm.bio}
                                    onChange={handleInputChange}
                                    rows={4}
                                    className="w-full text-gray-600 leading-relaxed text-sm border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Tell us about yourself..."
                                />
                            ) : (
                                <p className="text-gray-600 leading-relaxed text-sm">
                                    {user.bio || 'No biography provided yet.'}
                                </p>
                            )}
                        </div>

                        {/* Password Change Section */}
                        {isEditing && (
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                                <h2 className="text-lg font-bold text-gray-800 mb-4">Change Password</h2>
                                <p className="text-sm text-gray-500 mb-4">Leave blank to keep current password</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            New Password
                                        </label>
                                        <input
                                            type="password"
                                            name="password"
                                            value={passwordData.password}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                            placeholder="Enter new password"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Confirm New Password
                                        </label>
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            value={passwordData.confirmPassword}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                                            placeholder="Confirm new password"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Experience Section */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                            <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                                <Briefcase className="w-5 h-5 text-blue-600" />
                                Experience
                            </h2>

                            {isEditing && (
                                <div className="mb-6">
                                    {!showAddExperience ? (
                                        <button
                                            onClick={() => setShowAddExperience(true)}
                                            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                                        >
                                            + Add Experience
                                        </button>
                                    ) : (
                                        <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
                                            <input
                                                type="text"
                                                placeholder="Job Title"
                                                value={newExperience.title}
                                                onChange={(e) => setNewExperience({ ...newExperience, title: e.target.value })}
                                                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Company"
                                                value={newExperience.company}
                                                onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
                                                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Period (e.g., 2020 - Present)"
                                                value={newExperience.period}
                                                onChange={(e) => setNewExperience({ ...newExperience, period: e.target.value })}
                                                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                            <textarea
                                                placeholder="Description"
                                                value={newExperience.description}
                                                onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
                                                rows={2}
                                                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={addExperience}
                                                    className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                                >
                                                    Add
                                                </button>
                                                <button
                                                    onClick={() => setShowAddExperience(false)}
                                                    className="px-3 py-1 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            <div className="space-y-6">
                                {(isEditing ? editForm.experience : user.experience).map((exp, index) => (
                                    <div key={index} className="border-l-2 border-blue-200 pl-4 relative">
                                        {isEditing && (
                                            <button
                                                onClick={() => removeExperience(index)}
                                                className="absolute -top-2 -right-2 text-red-500 hover:text-red-700"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        )}
                                        <h3 className="font-semibold text-gray-800">{exp.title}</h3>
                                        <p className="text-sm text-blue-600 mb-1">{exp.company}</p>
                                        <p className="text-xs text-gray-400 mb-2">{exp.period}</p>
                                        <p className="text-sm text-gray-600">{exp.description}</p>
                                    </div>
                                ))}
                                {(!isEditing && user.experience.length === 0) && (
                                    <p className="text-gray-500 text-sm">No experience added yet</p>
                                )}
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                            <h2 className="text-lg font-bold text-gray-800 mb-6 border-b pb-2">Connect & Follow</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {Object.entries(isEditing ? editForm.socials : user.socials).map(([platform, link]) => (
                                    link !== undefined && (
                                        <div key={platform} className="group">
                                            {isEditing ? (
                                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200">
                                                    {getSocialIcon(platform)}
                                                    <input
                                                        type="text"
                                                        value={link}
                                                        onChange={(e) => handleSocialChange(platform, e.target.value)}
                                                        className="flex-1 text-sm bg-transparent focus:outline-none text-black"
                                                        placeholder={`${platform} username/url`}
                                                    />
                                                </div>
                                            ) : (
                                                link && (
                                                    <a
                                                        href={link.startsWith('http') ? link : `https://${link}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className={`flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-200 hover:border-transparent transition-all duration-200 ${getSocialColor(platform)} group-hover:text-white`}
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            {getSocialIcon(platform)}
                                                            <span className="text-sm font-medium capitalize text-black group-hover:text-white transition-colors">
                                                                {platform}
                                                            </span>
                                                        </div>
                                                        <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-white" />
                                                    </a>
                                                )
                                            )}
                                        </div>
                                    )
                                ))}
                            </div>
                        </div>

                        {/* Statistics */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {Object.entries(isEditing ? editForm.stats : user.stats).map(([key, value]) => (
                                <div key={key} className="bg-white rounded-2xl p-6 text-center border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
                                    {isEditing ? (
                                        <input
                                            type="number"
                                            value={value}
                                            onChange={(e) => setEditForm(prev => ({
                                                ...prev,
                                                stats: { ...prev.stats, [key]: parseInt(e.target.value) || 0 }
                                            }))}
                                            className="text-3xl font-bold text-gray-800 w-full text-center border border-gray-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    ) : (
                                        <p className="text-3xl font-bold text-gray-800">{value}</p>
                                    )}
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