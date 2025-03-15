"use client";

import Link from "next/link";
import Logo from "./logo";
import StarBorder from './StarBorder/StarBorder';
import "./custom-header.css";

export default function Header() {
  return (
    <header className="z-30 w-full">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-2">
        <StarBorder 
          as="div" 
          className="header-star-border w-full" 
          color="white"
          speed="6s"
        >
          <div className="flex items-center justify-between w-full">
            {/* Site branding */}
            <div className="flex items-center">
              <Logo />
            </div>

            {/* Desktop sign in links */}
            <div className="flex items-center gap-2">
              <Link
                href="/signin"
                className="btn-sm px-4 py-1 rounded-md text-gray-300 hover:text-white transition-colors bg-gray-800/60"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="btn-sm px-4 py-1 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
              >
                Register
              </Link>
            </div>
          </div>
        </StarBorder>
      </div>
    </header>
  );
}