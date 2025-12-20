'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import ShinyText from "@/components/ShinyText";
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, Mail } from 'lucide-react';
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import SparkleNavbar from './SparkleNavbar';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const mobileMenuRef = useRef<HTMLDivElement>(null);
    const navRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About Us', path: '/about' },
        { name: 'Products', path: '/products' },
        { name: 'Services', path: '/services' },
        { name: 'Contact', path: '/contact' }
    ];

    useGSAP(() => {
        if (isMobileMenuOpen) {
            gsap.to(mobileMenuRef.current, {
                height: 'auto',
                opacity: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        } else {
            gsap.to(mobileMenuRef.current, {
                height: 0,
                opacity: 0,
                duration: 0.3,
                ease: "power2.in"
            });
        }
    }, { scope: navRef, dependencies: [isMobileMenuOpen] });

    return (
        <nav ref={navRef} className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-sm'
            }`}>
            <div className="bg-[#DC143C] text-white py-1.5 md:py-2 px-4 md:px-8">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-end items-start sm:items-center gap-1 sm:gap-0 text-xs md:text-sm">
                    <div className="flex items-center gap-3 md:gap-4 flex-wrap">
                        <a href="tel:+918309862581" className="flex items-center gap-1.5 md:gap-2 hover:text-gray-200 transition-colors">
                            <Phone size={12} className="md:hidden" />
                            <Phone size={14} className="hidden md:block" />
                            <span className="hidden sm:inline text-xs md:text-sm">+91 83098 62581</span>
                        </a>
                        <a href="mailto:technomech6@gmail.com" className="flex items-center gap-1.5 md:gap-2 hover:text-gray-200 transition-colors">
                            <Mail size={12} className="md:hidden" />
                            <Mail size={14} className="hidden md:block" />
                            <span className="hidden sm:inline text-xs md:text-sm">technomech6@gmail.com</span>
                        </a>
                    </div>

                </div>
            </div>

            <div className="max-w-7xl mx-auto px-2 md:px-8">
                <div className="flex justify-between items-center h-24 md:h-20">
                    <Link href="/" className="flex items-center gap-3 md:gap-4 group">

                        <img
                            src="/assets/logo.jpg"
                            alt="Techno Mech Engineers Logo"
                            className="h-16 md:h-12 w-auto transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="hidden lg:block">
                            <div className="text-xl font-bold text-[#1F2937]">
                                <ShinyText text="Techno Mech Engineers" disabled={false} speed={3} className="custom-class" />
                            </div>
                            <div className="text-xs text-gray-600">Precision Engineering Solutions</div>
                        </div>
                    </Link>

                    <div className="hidden md:block">
                        <SparkleNavbar items={navLinks} />
                    </div>

                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 text-[#1F2937] hover:text-[#DC143C] transition-all duration-200 hover:scale-110 active:scale-95"
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            <div
                ref={mobileMenuRef}
                className="md:hidden bg-white border-t border-gray-200 overflow-hidden h-0 opacity-0"
            >
                <div className="px-4 py-4 space-y-2">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            href={link.path}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${pathname === link.path
                                ? 'bg-[#DC143C] text-white'
                                : 'text-[#1F2937] hover:bg-gray-100'
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
