'use client';

import React, { useRef } from 'react';
import { Gavel, CheckSquare, Truck, AlertTriangle, Scale } from 'lucide-react';
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export default function TermsConditions() {
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
                            <Gavel size={40} className="text-white/80" />
                            <h1 className="text-4xl font-bold">Terms and Conditions</h1>
                        </div>
                    </div>

                    <div className="p-10 space-y-10">
                        <section>
                            <p className="text-gray-700 leading-relaxed font-medium">
                                Welcome to Techno Mech Engineers. These terms and conditions outline the rules and regulations for the use of Techno Mech Engineers' Website and the purchase of our products and services.
                            </p>
                            <p className="text-gray-700 leading-relaxed mt-4">
                                By accessing this website and/or placing an order with us, we assume you accept these terms and conditions. Do not continue to use Techno Mech Engineers if you do not agree to take all of the terms and conditions stated on this page.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-[#1F2937] mb-4 flex items-center gap-2">
                                <CheckSquare className="text-[#DC143C]" size={24} />
                                1. Product Information and Accuracy
                            </h2>
                            <p className="text-gray-700 leading-relaxed">
                                We strive to ensure that all details, descriptions, and prices of products appearing on this website and in our catalogs are accurate at the time they are entered into the system. However, for custom-manufactured components, final specifications and pricing will be subject to confirmed technical drawings and written quotations.
                            </p>
                            <p className="text-gray-700 leading-relaxed mt-4">
                                We reserve the right to modify specifications, designs, or materials to improve product quality or performance without prior notice, provided such changes do not adversely affect the form, fit, or function of the product.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-[#1F2937] mb-4 flex items-center gap-2">
                                <Scale className="text-[#DC143C]" size={24} />
                                2. Orders and Payments
                            </h2>
                            <p className="text-gray-700 leading-relaxed">
                                <strong>Order Acceptance:</strong> All orders are subject to acceptance by Techno Mech Engineers. We reserve the right to refuse any order for any reason.
                            </p>
                            <p className="text-gray-700 leading-relaxed mt-2">
                                <strong>Payment Modes:</strong> We accept payments via Cheque, Demand Draft (DD), Online Bank Transfer, and other standard electronic payment methods.
                            </p>
                            <p className="text-gray-700 leading-relaxed mt-2">
                                <strong>Payment Terms:</strong> Payment terms will be specified in our official quotation or proforma invoice. Unless otherwise agreed in writing, full payment or a specified advance is required to initiate custom manufacturing orders.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-[#1F2937] mb-4 flex items-center gap-2">
                                <Truck className="text-[#DC143C]" size={24} />
                                3. Shipping and Delivery
                            </h2>
                            <p className="text-gray-700 leading-relaxed">
                                <strong>Timelines:</strong> We are committed to timely delivery. Estimated delivery dates are provided in good faith but are not guaranteed. We shall not be liable for any delay in delivery due to causes beyond our reasonable control (Force Majeure), including but not limited to acts of God, war, strikes, or raw material shortages.
                            </p>
                            <p className="text-gray-700 leading-relaxed mt-2">
                                <strong>Shipping:</strong> Goods are shipped at the purchaser's risk. Our responsibility ceases upon delivery of goods to the carrier/transporter. Insurance, if required, must be arranged by the purchaser unless otherwise agreed.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-[#1F2937] mb-4 flex items-center gap-2">
                                <AlertTriangle className="text-[#DC143C]" size={24} />
                                4. Returns and Liability
                            </h2>
                            <p className="text-gray-700 leading-relaxed">
                                <strong>Returns:</strong> Due to the custom nature of our precision components, returns are generally not accepted unless there is a verifiable manufacturing defect or deviation from the agreed technical specifications. Any such discrepancies must be reported within 7 days of receipt.
                            </p>
                            <p className="text-gray-700 leading-relaxed mt-2">
                                <strong>Limitation of Liability:</strong> In no event shall Techno Mech Engineers be liable for any indirect, special, incidental, or consequential damages arising out of the use or inability to use our products. Our maximum liability shall be limited to the purchase price of the product.
                            </p>
                        </section>

                        <section className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                            <h2 className="text-2xl font-bold text-[#1F2937] mb-4 flex items-center gap-2">
                                <Gavel className="text-[#DC143C]" size={24} />
                                Governing Law
                            </h2>
                            <p className="text-gray-700 leading-relaxed mb-4">
                                These terms and conditions are governed by and construed in accordance with the laws of India. You irrevocably submit to the exclusive jurisdiction of the courts in Hyderabad, Telangana, India, for the resolution of any disputes.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
