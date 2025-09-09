"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import UserDropdown from "./UserDropdown";

interface AuthData {
  isAuthenticated: boolean;
  displayName: string;
  imageUrl: string;
}

interface NavbarCenterProps {
  authData: AuthData | null;
}

const NavbarCenter = ({ authData }: NavbarCenterProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className="hidden md:flex justify-center items-center space-x-6 absolute left-1/2 transform -translate-x-1/2">
        <Link
          href="/dashboard"
          className="relative hover:text-gray-600 transition after:content-[''] after:block after:h-[2px] after:bg-gray-500 after:w-0 after:transition-all after:duration-300 after:absolute after:left-0 after:-bottom-1 hover:after:w-full"
        >
          Dashboard
        </Link>
        <Link
          href="/about"
          className="relative hover:text-gray-600 transition after:content-[''] after:block after:h-[2px] after:bg-gray-500 after:w-0 after:transition-all after:duration-300 after:absolute after:left-0 after:-bottom-1 hover:after:w-full"
        >
          About
        </Link>
        <Link
          href="/contact"
          className="relative hover:text-gray-600 transition after:content-[''] after:block after:h-[2px] after:bg-gray-500 after:w-0 after:transition-all after:duration-300 after:absolute after:left-0 after:-bottom-1 hover:after:w-full"
        >
          Contact
        </Link>
      </div>

      <div className="md:hidden flex justify-end flex-1">
        <button
          onClick={toggleMobileMenu}
          className="p-2 rounded-md hover:bg-gray-200 transition-colors"
          aria-label="Toggle mobile menu"
        >
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                isMobileMenuOpen
                  ? "M6 18L18 6M6 6l12 12"
                  : "M4 6h16M4 12h16M4 18h16"
              }
              className="transition-all duration-300"
            />
          </svg>
        </button>
      </div>

      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-40 md:hidden"
            onClick={toggleMobileMenu}
          />

          <div className="fixed top-12 left-0 right-0 bg-white border-b-2 border-gray-300 z-50 md:hidden shadow-lg">
            <div className="flex flex-col space-y-4 p-6 items-end">
              <Link
                href="/dashboard"
                className="text-gray-700 hover:text-gray-900 py-2 border-b border-gray-300 transition-colors text-right w-full"
                onClick={toggleMobileMenu}
              >
                Dashboard
              </Link>
              <Link
                href="/about"
                className="text-gray-700 hover:text-gray-900 py-2 border-b border-gray-300 transition-colors text-right w-full"
                onClick={toggleMobileMenu}
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-gray-900 py-2 border-b border-gray-300 transition-colors text-right w-full"
                onClick={toggleMobileMenu}
              >
                Contact
              </Link>

              <div className="pt-4 w-full flex justify-end">
                {authData?.isAuthenticated ? (
                  <div className="flex items-center space-x-3">
                    <UserDropdown
                      imageUrl={authData.imageUrl}
                      username={authData.displayName}
                    />
                  </div>
                ) : (
                  <div className="flex flex-col space-y-3 w-full max-w-xs">
                    <Link
                      href="/sign-in"
                      className="text-gray-700 hover:text-gray-900 py-2 transition-colors text-center bg-gray-200 rounded-md"
                      onClick={toggleMobileMenu}
                    >
                      Sign in
                    </Link>
                    <Link
                      href="/sign-up"
                      className="text-gray-700 hover:text-gray-900 py-2 transition-colors text-center bg-gray-300 rounded-md"
                      onClick={toggleMobileMenu}
                    >
                      Sign up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default NavbarCenter;
