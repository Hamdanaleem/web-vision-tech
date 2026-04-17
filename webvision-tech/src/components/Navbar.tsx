"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { servicesData } from "@/data/servicesData";
import { SERVICE_GROUPS } from "@/data/serviceGroups";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const grouped = SERVICE_GROUPS.map((g) => ({
    heading: g.heading,
    services: g.serviceIds
      .map((id) => servicesData.find((s) => s.id === id))
      .filter(Boolean),
  }));

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          
          {/* LOGO */}
          <Link href="/" className="text-2xl font-bold flex items-center gap-2">
            <span className="text-vision-dark">Web</span>
            <span className="text-vision-blue">Vision</span>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-vision-dark hover:text-vision-blue font-medium transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-vision-dark hover:text-vision-blue font-medium transition-colors">
              About
            </Link>
            <div className="relative group">
              <Link
                href="/services"
                className="text-vision-dark hover:text-vision-blue font-medium transition-colors inline-flex items-center gap-1"
              >
                Services
                <span className="text-xs opacity-70 group-hover:opacity-100 transition-opacity">▾</span>
              </Link>

              {/* Dropdown */}
              <div className="absolute left-0 top-full pt-4 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all">
                <div className="w-[560px] bg-white rounded-2xl border border-gray-100 shadow-xl p-5 grid grid-cols-2 gap-5">
                  {grouped.map((g) => (
                    <div key={g.heading}>
                      <p className="text-[11px] font-bold tracking-[.18em] uppercase text-gray-500 mb-3">
                        {g.heading}
                      </p>
                      <div className="space-y-2">
                        {g.services.map((s) => (
                          <Link
                            key={s!.id}
                            href={`/services/${s!.id}`}
                            className="block text-sm font-semibold text-vision-dark hover:text-vision-blue transition-colors"
                          >
                            {s!.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* ADDED PORTFOLIO */}
            <Link href="/portfolio" className="text-vision-dark hover:text-vision-blue font-medium transition-colors">
              Portfolio
            </Link>
            <Link href="/contact" className="text-vision-dark hover:text-vision-blue font-medium transition-colors">
              Contact
            </Link>
            <Link 
              href="/contact" 
              className="px-6 py-2 bg-vision-blue text-white font-bold rounded-full hover:bg-blue-600 transition-colors"
            >
              Get Started
            </Link>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button 
            className="md:hidden p-2 text-vision-dark"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* MOBILE NAVIGATION */}
        {isOpen && (
          <div className="md:hidden pb-6 space-y-4">
            <Link 
              href="/" 
              className="block text-vision-dark hover:text-vision-blue font-medium transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/about" 
              className="block text-vision-dark hover:text-vision-blue font-medium transition-colors"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <div>
              <button
                type="button"
                className="w-full flex items-center justify-between text-vision-dark hover:text-vision-blue font-medium transition-colors"
                onClick={() => setIsServicesOpen((v) => !v)}
                aria-expanded={isServicesOpen}
              >
                <span>Services</span>
                <span className="text-xs opacity-70">{isServicesOpen ? "▴" : "▾"}</span>
              </button>
              {isServicesOpen ? (
                <div className="mt-3 pl-3 border-l border-gray-200 space-y-4">
                  <Link
                    href="/services"
                    className="block text-sm font-semibold text-vision-dark hover:text-vision-blue transition-colors"
                    onClick={() => {
                      setIsServicesOpen(false);
                      setIsOpen(false);
                    }}
                  >
                    View all services
                  </Link>
                  {grouped.map((g) => (
                    <div key={g.heading}>
                      <p className="text-[11px] font-bold tracking-[.18em] uppercase text-gray-500 mb-2">
                        {g.heading}
                      </p>
                      <div className="space-y-2">
                        {g.services.map((s) => (
                          <Link
                            key={s!.id}
                            href={`/services/${s!.id}`}
                            className="block text-sm text-vision-dark hover:text-vision-blue transition-colors"
                            onClick={() => {
                              setIsServicesOpen(false);
                              setIsOpen(false);
                            }}
                          >
                            {s!.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
            {/* ADDED PORTFOLIO MOBILE */}
            <Link 
              href="/portfolio" 
              className="block text-vision-dark hover:text-vision-blue font-medium transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Portfolio
            </Link>
            <Link 
              href="/contact" 
              className="block text-vision-dark hover:text-vision-blue font-medium transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            <Link 
              href="/contact" 
              className="block px-6 py-2 bg-vision-blue text-white font-bold rounded-full hover:bg-blue-600 transition-colors text-center"
              onClick={() => setIsOpen(false)}
            >
              Get Started
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}