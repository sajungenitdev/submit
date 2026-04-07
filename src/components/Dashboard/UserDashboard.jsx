"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getToken, getUser, clearAuthData } from '@/utils/auth';

export default function UserDashboard() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');

    useEffect(() => {
        const token = getToken();
        const userData = getUser();

        console.log('=== Dashboard Debug Info ===');
        console.log('Token:', token ? 'Present' : 'Missing');
        console.log('User Data:', userData);

        if (!token || !userData) {
            console.log('No auth data, redirecting to login');
            router.replace('/login');
            return;
        }

        setUser(userData);
        setLoading(false);
    }, [router]);

    const handleLogout = async () => {
        console.log('Logging out...');
        try {
            const token = getToken();
            if (token) {
                await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://film-server-qlxt.onrender.com'}/api/auth/logout`, {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
            }
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            clearAuthData();
            console.log('Redirecting to login...');
            router.push('/login');
        }
    };

    const getInitials = (name) => {
        if (!name) return 'U';
        const parts = name.trim().split(' ');
        if (parts.length >= 2) {
            return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
        }
        return name.substring(0, 2).toUpperCase();
    };

    const navigationItems = [
        { id: 'overview', name: 'Dashboard Overview', icon: '📊', href: '/dashboard' },
        { id: 'projects', name: 'My Projects', icon: '🎬', href: '/projects' },
        { id: 'submissions', name: 'Submissions', icon: '📄', href: '/submissions' },
        { id: 'profile', name: 'Profile', icon: '⚙️', href: '/profile' }
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-12 gap-6">
                    {/* Left Sidebar */}
                    <div className="col-span-12 md:col-span-3">
                        <div className="bg-white rounded-2xl shadow-sm overflow-hidden sticky top-8">
                            {/* Profile Section */}
                            <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-6 text-center">
                                <div className="relative inline-block">
                                    <div className="w-24 h-24 mx-auto bg-white rounded-full flex items-center justify-center shadow-lg">
                                        <span className="text-3xl font-bold text-blue-600">
                                            {getInitials(user?.name)}
                                        </span>
                                    </div>
                                    <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                                </div>

                                <h3 className="mt-4 text-white font-semibold text-lg">
                                    {user?.name || 'User'}
                                </h3>
                                <p className="text-blue-100 text-sm mt-1">
                                    {user?.email || 'user@example.com'}
                                </p>

                                <div className="mt-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/20 text-white">
                                    {user?.role === 'admin' ? 'Administrator' : (user?.role || 'User')}
                                </div>
                            </div>

                            {/* Navigation Links */}
                            <nav className="p-4 space-y-1">
                                {navigationItems.map((item) => (
                                    <Link
                                        key={item.id}
                                        href={item.href}
                                        onClick={() => setActiveTab(item.id)}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${activeTab === item.id
                                                ? 'bg-blue-50 text-blue-700 shadow-sm'
                                                : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                                            }`}
                                    >
                                        <span className="text-xl">{item.icon}</span>
                                        <span className="text-sm font-medium flex-1">
                                            {item.name}
                                        </span>
                                        {activeTab === item.id && (
                                            <div className="w-1 h-6 bg-blue-600 rounded-full"></div>
                                        )}
                                    </Link>
                                ))}
                            </nav>

                            {/* Logout Button */}
                            <div className="p-4 border-t border-gray-200">
                                <button
                                    onClick={handleLogout}
                                    className="flex cursor-pointer items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-all duration-200 w-full group"
                                >
                                    <span className="text-xl">🚪</span>
                                    <span className="text-sm font-medium flex-1 text-left">
                                        Logout
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Content */}
                    <div className="col-span-12 md:col-span-9">
                        {/* Welcome Header */}
                        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
                            <h1 className="text-2xl font-bold text-gray-900">
                                Welcome back, {user?.name?.split(' ')[0] || 'User'}! 👋
                            </h1>
                            <p className="text-gray-600 mt-1">
                                Here's what's happening with your account today.
                            </p>
                            <div className="mt-2 text-sm text-gray-500">
                                <span className="font-medium">Email:</span> {user?.email}
                            </div>
                            <div className="mt-1 text-sm text-gray-500">
                                <span className="font-medium">Role:</span> {user?.role}
                            </div>
                        </div>

                        {/* User Info Card */}
                        <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-6">
                            <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
                                <h2 className="text-lg font-semibold text-gray-900">
                                    Account Information
                                </h2>
                            </div>
                            <div className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs font-medium text-gray-500 uppercase">User ID</label>
                                        <p className="text-sm text-gray-900 mt-1 font-mono">{user?.id || 'N/A'}</p>
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-gray-500 uppercase">Full Name</label>
                                        <p className="text-sm text-gray-900 mt-1">{user?.name || 'N/A'}</p>
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-gray-500 uppercase">Role</label>
                                        <p className="text-sm text-gray-900 mt-1">
                                            <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                                {user?.role || 'User'}
                                            </span>
                                        </p>
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-gray-500 uppercase">Email</label>
                                        <p className="text-sm text-gray-900 mt-1">{user?.email || 'N/A'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h2 className="text-lg font-semibold text-gray-900">
                                    Quick Actions
                                </h2>
                            </div>
                            <div className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <button
                                        onClick={() => router.push('/profile')}
                                        className="p-4 bg-blue-50 rounded-xl text-center hover:bg-blue-100 transition group"
                                    >
                                        <div className="text-3xl mb-2">👤</div>
                                        <p className="font-medium text-gray-900">My Profile</p>
                                        <p className="text-xs text-gray-600 mt-1">View your profile</p>
                                    </button>
                                    <button
                                        onClick={() => router.push('/projects')}
                                        className="p-4 bg-purple-50 rounded-xl text-center hover:bg-purple-100 transition group"
                                    >
                                        <div className="text-3xl mb-2">🎬</div>
                                        <p className="font-medium text-gray-900">My Projects</p>
                                        <p className="text-xs text-gray-600 mt-1">Manage your projects</p>
                                    </button>
                                    <button
                                        onClick={() => router.push('/settings')}
                                        className="p-4 bg-green-50 rounded-xl text-center hover:bg-green-100 transition group"
                                    >
                                        <div className="text-3xl mb-2">⚙️</div>
                                        <p className="font-medium text-gray-900">Settings</p>
                                        <p className="text-xs text-gray-600 mt-1">Account preferences</p>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}