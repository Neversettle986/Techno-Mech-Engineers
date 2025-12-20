import React from 'react';
import Link from 'next/link';
import ShinyText from "@/components/ShinyText";
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-[#1F2937] text-white">
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div>
                        <img
                            src="/assets/logo.jpg"
                            alt="Techno Mech Engineers"
                            className="h-16 w-auto mb-4"
                        />
                        <p className="text-sm text-gray-300 leading-relaxed">
                            Leading manufacturer and supplier of precision machine components, metal washers, springs, and pipe fittings.
                        </p>
                    </div>

                    <div>
                        <span className="text-lg font-semibold mb-4 block text-white">
                            <ShinyText text="Quick Links" disabled={false} speed={3} className="custom-class" mode="dark" />
                        </span>
                        <div className="space-y-3">
                            <Link href="/" className="w-fit block text-sm text-gray-300 hover:text-[#DC143C] transition-colors">Home</Link>
                            <Link href="/about" className="w-fit block text-sm text-gray-300 hover:text-[#DC143C] transition-colors">About Us</Link>
                            <Link href="/products" className="w-fit block text-sm text-gray-300 hover:text-[#DC143C] transition-colors">Products</Link>
                            <Link href="/services" className="w-fit block text-sm text-gray-300 hover:text-[#DC143C] transition-colors">Services</Link>
                            <Link href="/contact" className="w-fit block text-sm text-gray-300 hover:text-[#DC143C] transition-colors">Contact</Link>
                        </div>
                    </div>

                    <div>
                        <span className="text-lg font-semibold mb-4 block text-white">
                            <ShinyText text="Our Products" disabled={false} speed={3} className="custom-class" mode="dark" />
                        </span>
                        <div className="space-y-3">
                            <p className="text-sm text-gray-300">Precision Machine Components</p>
                            <p className="text-sm text-gray-300">Metal Washers</p>
                            <p className="text-sm text-gray-300">Metal Springs</p>
                            <p className="text-sm text-gray-300">Fasteners & Hardware</p>
                        </div>
                    </div>

                    <div>
                        <span className="text-lg font-semibold mb-4 block text-white">
                            <ShinyText text="Contact Info" disabled={false} speed={3} className="custom-class" mode="dark" />
                        </span>
                        <div className="space-y-3">
                            <div className="flex items-start gap-3">
                                <MapPin size={18} className="text-[#DC143C] mt-1 flex-shrink-0" />
                                <p className="text-sm text-gray-300">1-9-121/E/C, opp. to Speck Systems, EC Complex, Kushaiguda, Hyderabad-500062</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone size={18} className="text-[#DC143C] flex-shrink-0" />
                                <a href="tel:+918309862581" className="text-sm text-gray-300 hover:text-[#DC143C] transition-colors">
                                    +91 83098 62581
                                </a>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail size={18} className="text-[#DC143C] flex-shrink-0" />
                                <a href="mailto:technomech6@gmail.com" className="text-sm text-gray-300 hover:text-[#DC143C] transition-colors">
                                    technomech6@gmail.com
                                </a>
                            </div>
                        </div>
                        <div className="flex gap-3 mt-4">
                            <a href="#" className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center hover:bg-[#DC143C] transition-colors">
                                <Facebook size={16} />
                            </a>
                            <a href="#" className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center hover:bg-[#DC143C] transition-colors">
                                <Twitter size={16} />
                            </a>
                            <a href="#" className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center hover:bg-[#DC143C] transition-colors">
                                <Linkedin size={16} />
                            </a>
                            <a href="#" className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center hover:bg-[#DC143C] transition-colors">
                                <Instagram size={16} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-700">
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
                        <p>&copy; 2025 Techno Mech Engineers. All rights reserved.</p>
                        <div className="flex gap-6">
                            <Link href="/privacy-policy" className="hover:text-[#DC143C] transition-colors">Privacy Policy</Link>
                            <Link href="/terms-conditions" className="hover:text-[#DC143C] transition-colors">Terms and Conditions</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer >
    );
};

export default Footer;
