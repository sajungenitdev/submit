"use client";

import Footer from "@/components/shared/Footer/Footer";
import Header from "@/components/shared/Header/Header";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);

  // Handle responsive sidebar
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsSidebarCollapsed(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Load user data
  useEffect(() => {
    try {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        const userData = JSON.parse(userStr);
        setUser(userData);
        setUserRole(userData.role || userData.userType || 'user');
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Get sidebar links based on user role
  const getSidebarLinks = () => {
    const isAdmin = userRole === 'admin' || userRole === 'Administrator';
    
    if (isAdmin) {
      return [
        { name: "Dashboard", href: "/admin", icon: "📊" },
        { name: "My Profile", href: "/profile", icon: "👤" },
        { name: "All Users", href: "/admin/all-users", icon: "👥" },
        { name: "All Submissions", href: "/admin/all-submissions", icon: "📄" },
        { name: "Festivals", href: "/admin/festivals", icon: "🎬" },
        { name: "Analytics", href: "/admin/analytics", icon: "📈" },
        { name: "Settings", href: "/settings", icon: "⚙️" },
      ];
    }
    
    // Regular user links
    return [
      { name: "Dashboard", href: "/dashboard", icon: "📊" },
      { name: "My Profile", href: "/profile", icon: "👤" },
      { name: "My Projects", href: "/projects", icon: "🎬" },
      { name: "My Submissions", href: "/submissions", icon: "📄" },
      { name: "Settings", href: "/settings", icon: "⚙️" },
    ];
  };

  const sidebarLinks = getSidebarLinks();

  const isActive = (href) => {
    // For admin routes
    if (userRole === 'admin' || userRole === 'Administrator') {
      if (href === "/admin" && (pathname === "/admin" || pathname === "/admin/dashboard")) return true;
      if (href !== "/admin" && pathname.startsWith(href)) return true;
      return false;
    }
    
    // For regular user routes
    if (href === "/dashboard" && pathname === "/dashboard") return true;
    if (href !== "/dashboard" && pathname.startsWith(href)) return true;
    return false;
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/auth/logout`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
      }

      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("rememberMe");

      window.location.href = "/login";
    } catch (error) {
      console.error("Logout error:", error);
      window.location.href = "/login";
    }
  };

  // Get user initials
  const getInitials = (name) => {
    if (!name) return "A";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  // Check if user is admin
  const isAdmin = userRole === 'admin' || userRole === 'Administrator';

  if (isLoading) {
    return (
      <div className="flex h-screen bg-gray-50 items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Floating Menu Button for Mobile */}
      {isMobile && isSidebarCollapsed && (
        <button
          onClick={() => setIsSidebarCollapsed(false)}
          className="fixed left-4 top-20 z-50 p-2 bg-white rounded-lg shadow-lg border border-gray-200 md:hidden hover:bg-gray-50 transition"
          aria-label="Open menu"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      )}

      {/* Sidebar - Fixed on the left */}
      <aside
        className={`bg-white border-r border-gray-200 flex flex-col fixed h-full z-30 transition-all duration-300 ${
          isSidebarCollapsed ? "w-20" : "w-64"
        } ${isMobile && !isSidebarCollapsed ? "shadow-xl" : ""}`}
        aria-label="Main sidebar"
      >
        {/* Collapse Toggle Button - Hide on mobile */}
        {!isMobile && (
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="absolute -right-3 top-20 bg-white border border-gray-200 rounded-full p-1 hover:bg-gray-50 transition shadow-sm z-40"
            aria-label={
              isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"
            }
          >
            <svg
              className={`w-4 h-4 text-gray-600 transition-transform duration-300 ${
                isSidebarCollapsed ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        )}

        {/* Mobile Close Button */}
        {isMobile && !isSidebarCollapsed && (
          <button
            onClick={() => setIsSidebarCollapsed(true)}
            className="absolute -right-3 top-20 bg-white border border-gray-200 rounded-full p-1 hover:bg-gray-50 transition shadow-sm z-40"
            aria-label="Close sidebar"
          >
            <svg
              className="w-4 h-4 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}

        {/* Admin Profile Section - Collapsed view */}
        {!isSidebarCollapsed ? (
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg shadow-md">
                {getInitials(user?.name)}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 truncate">
                  {user?.name || "User"}
                </h3>
                <p className="text-sm text-gray-500 truncate">
                  {user?.email || "user@example.com"}
                </p>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <div className="text-xs text-gray-500">
                  Role: {isAdmin ? "Administrator" : "User"}
                </div>
                {isAdmin && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    Admin
                  </span>
                )}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Joined:{" "}
                {user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })
                  : "Jan 2024"}
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4 border-b border-gray-200 flex flex-col items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg shadow-md">
              {getInitials(user?.name)}
            </div>
            {isAdmin && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                Admin
              </span>
            )}
          </div>
        )}

        {/* Navigation Links */}
        <nav
          className="flex-1 p-4 overflow-y-auto"
          aria-label="Navigation menu"
        >
          <div className="space-y-1">
            {sidebarLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition group ${
                  isActive(link.href)
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100"
                } ${isSidebarCollapsed ? "justify-center" : ""}`}
                title={isSidebarCollapsed ? link.name : ""}
                aria-current={isActive(link.href) ? "page" : undefined}
              >
                <span className="text-xl" aria-hidden="true">
                  {link.icon}
                </span>
                {!isSidebarCollapsed && (
                  <>
                    <span className="text-sm font-medium flex-1">
                      {link.name}
                    </span>
                    {isActive(link.href) && (
                      <div
                        className="w-1 h-6 bg-blue-600 rounded-full"
                        aria-hidden="true"
                      ></div>
                    )}
                  </>
                )}
              </Link>
            ))}
          </div>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 transition w-full ${
              isSidebarCollapsed ? "justify-center" : ""
            }`}
            title={isSidebarCollapsed ? "Logout" : ""}
            aria-label="Logout"
          >
            <span className="text-xl" aria-hidden="true">
              🚪
            </span>
            {!isSidebarCollapsed && (
              <span className="text-sm font-medium">Logout</span>
            )}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isSidebarCollapsed ? "ml-20" : "ml-64"
        }`}
      >
        <Header />
        <main className="flex-1 overflow-y-auto p-6 md:p-8" id="main-content">
          {children}
        </main>
        <Footer />
      </div>

      {/* Mobile overlay */}
      {isMobile && !isSidebarCollapsed && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 transition-opacity duration-300"
          onClick={() => setIsSidebarCollapsed(true)}
          aria-label="Close sidebar overlay"
          role="presentation"
        />
      )}
    </div>
  );
}