"use client";

import { useEffect, useRef } from "react";
import Link from 'next/link';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ShinyText from "@/components/ShinyText";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ChromaImage from "./ChromaImage";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const imageRef = useRef<HTMLDivElement | null>(null);
    const contentRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(imageRef.current,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 70%",
                    }
                }
            );

            gsap.fromTo(contentRef.current,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 70%",
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-20 bg-gray-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Image Column */}
                    <div ref={imageRef} className="relative z-10 w-full max-w-lg lg:max-w-xl mx-auto lg:mx-0">
                        <ChromaImage
                            src="/assets/about-home.webp"
                            alt="Techno Mech Engineers factory floor with modern CNC machinery"
                            className="rounded-lg shadow-2xl"
                            imgClassName="h-auto"
                            borderColor="#DC143C"
                        />
                    </div>

                    {/* Content Column */}
                    <div ref={contentRef}>
                        <div className="inline-block px-4 py-2 bg-red-50 rounded-full mb-6 border border-red-100">
                            <span className="text-[#DC143C] font-semibold tracking-wide text-sm uppercase">About Our Company</span>
                        </div>
                        <h2 className="text-4xl font-bold text-gray-900 mb-6">
                            <ShinyText text="Precision Manufacturing" disabled={false} speed={3} className="custom-class" mode="light" />
                        </h2>
                        <p className="text-gray-700 mb-4 leading-relaxed">
                            Established in 2016, Techno Mech Engineers has grown to become a trusted name in precision engineering
                            and manufacturing. We specialize in producing high-quality machine components, metal washers, springs,
                            and pipe fittings for diverse industrial applications.
                        </p>
                        <p className="text-gray-700 mb-6 leading-relaxed">
                            Our state-of-the-art facility in Hyderabad is equipped with advanced CNC machinery and quality control
                            systems, ensuring every product meets international standards. We serve clients across automotive,
                            aerospace, construction, and general manufacturing sectors.
                        </p>
                        <div className="space-y-3 mb-8">
                            <div className="flex items-center gap-3">
                                <CheckCircle className="text-[#DC143C] flex-shrink-0" size={20} />
                                <span className="text-gray-700">Premium Quality Standards Manufacturing</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <CheckCircle className="text-[#DC143C] flex-shrink-0" size={20} />
                                <span className="text-gray-700">15+ Years of Industry Experience</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <CheckCircle className="text-[#DC143C] flex-shrink-0" size={20} />
                                <span className="text-gray-700">Advanced CNC Machining Capabilities</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <CheckCircle className="text-[#DC143C] flex-shrink-0" size={20} />
                                <span className="text-gray-700">Customized Solutions Available</span>
                            </div>
                        </div>
                        <Link href="/about">
                            <Button className="bg-[#DC143C] hover:bg-[#B01030] text-white group">
                                Read More
                                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
