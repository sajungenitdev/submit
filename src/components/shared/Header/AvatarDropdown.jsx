"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

const AvatarDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const menuItems = [
        { name: "Dashboard", href: "/dashboard", icon: "📊" },
        { name: "Profile", href: "/profile", icon: "👤" },
        { name: "Settings", href: "/settings", icon: "⚙️" },
    ];

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-2 focus:outline-none"
            >
                <div className="w-8 h-8 rounded-full ring-1 ring-gray-300 bg-linear-to-r from-blue-500 to-purple-600 overflow-hidden">
                    <Image
                        src="/assets/sazeduzzaman.jpg"
                        alt="Avatar"
                        width={32}
                        height={32}
                        className="w-full h-full object-cover"
                    />
                </div>
                <svg
                    className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""
                        }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    {menuItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                            onClick={() => setIsOpen(false)}
                        >
                            <span>{item.icon}</span>
                            <span>{item.name}</span>
                        </Link>
                    ))}
                    <div className="border-t border-gray-200 my-1"></div>
                    <button
                        onClick={() => {
                            localStorage.removeItem("token");
                            window.location.href = "/login";
                        }}
                        className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                        <span>🚪</span>
                        <span>Logout</span>
                    </button>
                </div>
            )}
        </div>
    );
};

export default AvatarDropdown;