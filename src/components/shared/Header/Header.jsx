"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation"; // Required for active state
import AvatarDropdown from "./AvatarDropdown";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const pathname = usePathname(); // Detects current URL

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  // Close menu on escape key press
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscKey);
    return () => document.removeEventListener("keydown", handleEscKey);
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Centralized Link Configuration
  const navLinks = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "My Projects", href: "/project" },
    { name: "Submissions", href: "/submissions" },
  ];

  return (
    <header className="flex shadow-md py-4 px-4 sm:px-10 bg-white min-h-[70px] tracking-wide relative z-50">
      <div className="flex flex-wrap items-center justify-between gap-5 w-full max-w-7xl mx-auto">

        {/* Logo Section */}
        <Link href="/" className="max-sm:hidden" aria-label="Home">
          <Image
            src="/assets/logo-final.webp"
            alt="Company Logo"
            width={144}
            height={36}
            className="w-36"
            priority
          />
        </Link>
        <Link href="/" className="hidden max-sm:block" aria-label="Home">
          <Image
            src="/assets/logo-final.webp"
            alt="Company Logo"
            width={36}
            height={36}
            className="w-9"
            priority
          />
        </Link>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300"
            onClick={toggleMenu}
            aria-hidden="true"
          />
        )}

        {/* Navigation Menu */}
        <div
          ref={menuRef}
          className={`
            lg:static lg:block lg:w-auto lg:h-auto lg:bg-transparent lg:shadow-none lg:translate-x-0
            max-lg:fixed max-lg:top-0 max-lg:left-0 max-lg:w-3/4 max-lg:min-w-[280px] max-lg:max-w-[400px]
            max-lg:h-full max-lg:bg-white max-lg:z-50 max-lg:shadow-xl
            transition-transform duration-300 ease-out
            ${isMenuOpen ? "max-lg:translate-x-0" : "max-lg:-translate-x-full"}
          `}
        >
          {/* Mobile Header (Only visible on small screens) */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100 lg:hidden">
            <Image src="/assets/logo-final.webp" alt="Logo" width={120} height={30} className="w-28" />
            <button onClick={toggleMenu} aria-label="Close menu">
              <svg className="w-4 h-4 fill-black" viewBox="0 0 320.591 320.591">
                <path d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z" />
                <path d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z" />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <ul className="lg:flex lg:gap-x-2 max-lg:p-6 max-lg:space-y-2">
            {navLinks.map((link) => {
              // Logic to check if link is active
              const isActive = pathname === link.href;

              return (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className={`
                      block font-semibold text-[15px] py-2.5 px-4 rounded-lg transition-all
                      ${isActive
                        ? "text-blue-700 bg-blue-50/80 lg:bg-blue-50"
                        : "text-slate-700 hover:text-blue-700 hover:bg-gray-50"
                      }
                    `}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          <AvatarDropdown />

          {/* Mobile Hamburger Toggle */}
          <button
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;