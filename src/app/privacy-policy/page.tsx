'use client';

import React, { useRef } from 'react';
import { Shield, Lock, Eye, FileText, Mail } from 'lucide-react';
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export default function PrivacyPolicy() {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.from(".main-content", {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        });
    }, { scope: containerRef });

    return (
        <div className="pt-32 pb-20 bg-gray-50 min-h-screen" ref={containerRef}>
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden main-content">
                    <div className="bg-gradient-to-r from-[#1F2937] to-[#DC143C] p-10 text-white">
                        <div className="flex items-center gap-4">
                            <Shield size={40} className="text-white/80" />
                            <h1 className="text-4xl font-bold">Privacy Policy</h1>
                        </div>
                    </div>

                    <div className="p-10 space-y-10">
                        <section>
                            <h2 className="text-2xl font-bold text-[#1F2937] mb-4 flex items-center gap-2">
                                <Eye className="text-[#DC143C]" size={24} />
                                1. Information Collection
                            </h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                At Techno Mech Engineers, we collect information that you voluntarily provide to us when you express interest in obtaining information about us or our products and services, when you participate in activities on the Website, or otherwise when you contact us.
                            </p>
                            <p className="text-gray-700 leading-relaxed">
                                The personal information that we collect depends on the context of your interactions with us and the Website, the choices you make, and the products and features you use. The personal information we collect may include:
                            </p>
                            <ul className="list-disc list-inside mt-4 space-y-2 text-gray-700 ml-4">
                                <li>Name and Contact Data (Phone numbers, email addresses, mailing addresses)</li>
                                <li>Business/Company Information</li>
                                <li>Payment Information (for order processing)</li>
                                <li>Technical requirements and drawings for custom orders</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-[#1F2937] mb-4 flex items-center gap-2">
                                <FileText className="text-[#DC143C]" size={24} />
                                2. Use of Information
                            </h2>
                            <p className="text-gray-700 leading-relaxed">
                                We use personal information collected via our Website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
                            </p>
                            <ul className="list-disc list-inside mt-4 space-y-2 text-gray-700 ml-4">
                                <li>To facilitate order processing and delivery fulfillment.</li>
                                <li>To send you administrative information, such as product, service and new feature information and/or information about changes to our terms, conditions, and policies.</li>
                                <li>To respond to your inquiries and solve any potential issues you might have with the use of our services.</li>
                                <li>To send you marketing and promotional communications (you can opt-out at any time).</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-[#1F2937] mb-4 flex items-center gap-2">
                                <Lock className="text-[#DC143C]" size={24} />
                                3. Data Protection
                            </h2>
                            <p className="text-gray-700 leading-relaxed">
                                We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorized third parties will not be able to defeat our security, and improperly collect, access, steal, or modify your information.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-[#1F2937] mb-4 flex items-center gap-2">
                                <Shield className="text-[#DC143C]" size={24} />
                                4. Sharing of Information
                            </h2>
                            <p className="text-gray-700 leading-relaxed">
                                We may process or share your data that we hold based on the following legal basis:
                            </p>
                            <ul className="list-disc list-inside mt-4 space-y-2 text-gray-700 ml-4">
                                <li><strong>Consent:</strong> We may process your data if you have given us specific consent to use your personal information for a specific purpose.</li>
                                <li><strong>Legitimate Interests:</strong> We may process your data when it is reasonably necessary to achieve our legitimate business interests.</li>
                                <li><strong>Performance of a Contract:</strong> Where we have entered into a contract with you, we may process your personal information to fulfill the terms of our contract.</li>
                                <li><strong>Legal Obligations:</strong> We may disclose your information where we are legally required to do so in order to comply with applicable law, governmental requests, a judicial proceeding, court order, or legal process.</li>
                            </ul>
                        </section>

                        <section className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                            <h2 className="text-2xl font-bold text-[#1F2937] mb-4 flex items-center gap-2">
                                <Mail className="text-[#DC143C]" size={24} />
                                Contact Us
                            </h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                If you have questions or comments about this policy, you may email us or contact us by post at:
                            </p>
                            <div className="text-gray-800 font-medium">
                                <p>Techno Mech Engineers</p>
                                <p>1-9-121/E/C, opp. to Speck Systems, EC Complex, Kushaiguda, Hyderabad-500062</p>
                                <p>Email: technomech6@gmail.com</p>
                                <p>Phone: +91 83098 62581</p>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
