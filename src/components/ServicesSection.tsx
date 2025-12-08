"use client";

import { useEffect, useRef } from "react";
import Link from 'next/link';
import { ArrowRight, Settings, Wrench, CheckCircle } from 'lucide-react';
import ShinyText from "@/components/ShinyText";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ChromaImage from "./ChromaImage";

gsap.registerPlugin(ScrollTrigger);

export default function ServicesSection() {
    const sectionRef = useRef<HTMLDivElement | null>(null);
    const headerRef = useRef<HTMLDivElement | null>(null);
    const cardsRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Header Animation
            gsap.from(headerRef.current, {
                opacity: 0,
                y: 30,
                duration: 0.8,
                scrollTrigger: {
                    trigger: headerRef.current,
                    start: "top 80%",
                }
            });

            // Cards Stagger Animation
            if (cardsRef.current) {
                const cards = cardsRef.current.children;
                if (cards.length > 0) {
                    gsap.fromTo(cards,
                        { opacity: 0, y: 30 },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.5,
                            stagger: 0.2,
                            scrollTrigger: {
                                trigger: cardsRef.current,
                                start: "top 85%",
                            }
                        }
                    );
                }
            }

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const services = [
        {
            title: 'Custom Manufacturing',
            description: 'Tailored production of components based on your specifications and drawings',
            icon: Settings
        },
        {
            title: 'CNC Machining',
            description: 'High-precision machining services with advanced CNC technology',
            icon: Wrench
        },
        {
            title: 'Quality Testing',
            description: 'Comprehensive quality control and testing to ensure product excellence',
            icon: CheckCircle
        }
    ];

    return (
        <section ref={sectionRef} className="py-20 bg-gray-900 relative overflow-hidden">
            {/* Background Image with Chroma Effect */}
            <div className="absolute inset-0 z-0">
                <ChromaImage
                    src="/assets/our-services.webp"
                    alt="Industrial services background"
                    className="w-full h-full opacity-20 mix-blend-overlay"
                    imgClassName="h-full object-cover"
                    borderColor="transparent"
                />
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
                <div ref={headerRef} className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-white mb-4">
                        <ShinyText text="Our Services" disabled={false} speed={3} className="custom-class" mode="dark" />
                    </h2>
                    <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                        Comprehensive engineering solutions tailored to your specific requirements
                    </p>
                </div>

                <div ref={cardsRef} className="grid md:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-lg shadow-lg hover:bg-white/10 transition-all duration-300 group cursor-pointer"
                        >
                            <div className="w-16 h-16 mb-6 bg-[#DC143C] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <service.icon className="text-white" size={32} />
                            </div>
                            <span className="block font-semibold text-lg text-white mb-3">{service.title}</span>
                            <p className="text-gray-400 mb-4">{service.description}</p>
                            <Link href="/services" className="text-[#DC143C] hover:text-[#B01030] font-medium text-sm flex items-center gap-2 group transition-transform duration-200 hover:scale-105 active:scale-95">
                                Read More
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
