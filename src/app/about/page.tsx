'use client';
import ShinyText from "@/components/ShinyText"; // Removed ScrollReveal import

import React, { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Award, Target, Eye, Users, CheckCircle, Cog } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ChromaImage from "@/components/ChromaImage";


gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const router = useRouter();
    const containerRef = useRef<HTMLDivElement>(null);

    const values = [
        { icon: Award, title: 'Quality Excellence', description: 'Commitment to delivering superior products that exceed industry standards' },
        { icon: Users, title: 'Customer Focus', description: 'Building lasting relationships through exceptional service and support' },
        { icon: Cog, title: 'Innovation', description: 'Continuously improving processes and adopting advanced technologies' },
        { icon: CheckCircle, title: 'Integrity', description: 'Operating with transparency, honesty, and ethical business practices' }
    ];

    const whyChooseUs = [
        'Rigorous Quality Management System',
        'State-of-the-art CNC machining and manufacturing facility',
        '15+ years of proven track record in precision engineering',
        'Skilled team of experienced engineers and technicians',
        'Customized solutions tailored to specific client requirements',
        'Competitive pricing with no compromise on quality',
        'Timely delivery and reliable supply chain management',
        'Comprehensive after-sales support and technical assistance'
    ];

    const handleCustomOrders = () => {
        router.push('/contact');
    };

    useGSAP(() => {
        // Hero Title Animation
        gsap.from(".hero-content", {
            y: 30,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });

        // Our Story Animation
        gsap.from(".story-text", {
            scrollTrigger: {
                trigger: ".story-section",
                start: "top 75%",
                toggleActions: "play none none none"
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        });

        gsap.from(".story-image", {
            scrollTrigger: {
                trigger: ".story-section",
                start: "top 75%",
                toggleActions: "play none none none"
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            delay: 0.2, // Add small delay for visual hierarchy
            ease: "power3.out"
        });

        // Mission & Vision Animation
        gsap.from(".mission-vision-card", {
            scrollTrigger: {
                trigger: ".mission-vision-section",
                start: "top 75%",
                toggleActions: "play none none none"
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out"
        });



        // Why Choose Us Animation
        gsap.from(".why-us-image", {
            scrollTrigger: {
                trigger: ".why-us-section",
                start: "top 75%",
                toggleActions: "play none none none"
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        });

        gsap.from(".why-us-content", {
            scrollTrigger: {
                trigger: ".why-us-section",
                start: "top 75%",
                toggleActions: "play none none none"
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            delay: 0.2,
            ease: "power3.out"
        });

        // Why Choose Us Items Stagger
        gsap.from(".why-us-item", {
            scrollTrigger: {
                trigger: ".why-us-content",
                start: "top 80%",
                toggleActions: "play none none none"
            },
            y: 20,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
            delay: 0.4,
            ease: "power3.out"
        });

        // Stats Animation
        gsap.from(".stat-item", {
            scrollTrigger: {
                trigger: ".stats-section",
                start: "top 80%",
                toggleActions: "play none none none"
            },
            scale: 0.8,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "back.out(1.7)"
        });

        // Custom Manufacturing Animation
        gsap.from(".custom-manufacturing-content", {
            scrollTrigger: {
                trigger: ".custom-manufacturing-section",
                start: "top 75%",
                toggleActions: "play none none none"
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        });

    }, { scope: containerRef });

    return (
        <div className="pt-32" ref={containerRef}>
            <section className="relative bg-gradient-to-br from-[#1F2937] to-[#DC143C] text-white py-20 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img className="w-full h-full object-cover opacity-20 mix-blend-overlay" alt="Factory floor manufacturing background" src="https://images.unsplash.com/photo-1603734696792-bcc0256501dd" />
                </div>
                <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
                    <div className="text-center hero-content">
                        <h1 className="text-5xl md:text-6xl font-bold mb-6">
                            <ShinyText text="About Techno Mech Engineers" disabled={false} speed={3} className="custom-class" mode="dark" />
                        </h1>
                        <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                            Your trusted partner in precision engineering and manufacturing excellence since 2016
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-white story-section">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="story-text">
                            <h2 className="text-4xl font-bold text-[#1F2937] mb-6">
                                <ShinyText text="Our Story" disabled={false} speed={3} className="custom-class" />
                            </h2>
                            <div className="space-y-4 text-gray-700 leading-relaxed">
                                <p>
                                    Founded in 2016, Techno Mech Engineers began as a small precision engineering workshop in Hyderabad
                                    with a vision to deliver world-class machine components to Indian industries. Over the years, we have
                                    grown into a leading manufacturer trusted by clients across multiple sectors.
                                </p>
                                <p>
                                    Our journey has been marked by continuous investment in advanced technology, skilled workforce development,
                                    and an unwavering commitment to quality. Today, we operate a state-of-the-art facility equipped with modern
                                    CNC machines, precision measuring instruments, and quality control systems.
                                </p>
                                <p>
                                    We specialize in manufacturing precision machine components, metal washers, springs, pipe fittings, and
                                    fasteners for diverse applications including automotive, aerospace, construction, agriculture, and general
                                    manufacturing. Our products are known for their durability, precision, and consistent quality.
                                </p>
                                <p>
                                    With premium quality standards and a team of experienced engineers, we continue to set benchmarks in
                                    the industry.
                                </p>
                            </div>
                        </div>

                        <div className="story-image h-96 relative rounded-lg overflow-hidden shadow-2xl">
                            <ChromaImage
                                src="/assets/about-home.webp"
                                alt="Techno Mech Engineers factory exterior and sign"
                                className="w-full h-full"
                                imgClassName="object-cover"
                                borderColor="#DC143C"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-gray-50 mission-vision-section">
                <div className="max-w-9xl mx-auto px-4 md:px-24">
                    <div className="grid md:grid-cols-2 gap-16">
                        <div className="bg-white p-8 rounded-lg shadow-lg mission-vision-card relative overflow-hidden">
                            <div className="flex items-center gap-3 mb-8 relative z-10">
                                <div className="w-14 h-14 bg-[#DC143C] rounded-full flex items-center justify-center shrink-0">
                                    <Target className="text-white" size={32} />
                                </div>
                                <span className="block text-3xl font-bold text-[#1F2937]">
                                    <ShinyText text="Our Mission" disabled={false} speed={3} className="custom-class" />
                                </span>
                            </div>
                            <p className="text-gray-700 leading-relaxed relative z-10">
                                To be the preferred partner for precision-engineered components by delivering superior quality products,
                                innovative solutions, and exceptional customer service. We strive to continuously improve our processes,
                                adopt advanced technologies, and maintain the highest standards of manufacturing excellence.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-lg shadow-lg mission-vision-card relative overflow-hidden">
                            <div className="flex items-center gap-3 mb-8 relative z-10">
                                <div className="w-14 h-14 bg-[#DC143C] rounded-full flex items-center justify-center shrink-0">
                                    <Eye className="text-white" size={32} />
                                </div>
                                <span className="block text-3xl font-bold text-[#1F2937]">
                                    <ShinyText text="Our Vision" disabled={false} speed={3} className="custom-class" />
                                </span>
                            </div>
                            <p className="text-gray-700 leading-relaxed relative z-10">
                                To establish Techno Mech Engineers as a globally recognized leader in precision engineering and manufacturing.
                                We envision expanding our capabilities, serving international markets, and setting new industry benchmarks for
                                quality, innovation, and customer satisfaction while maintaining our core values of integrity and excellence.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-white values-section">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-[#1F2937] mb-4">
                            <ShinyText text="Our Core Values" disabled={false} speed={3} className="custom-class" />
                        </h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            The principles that guide our operations and drive our success
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <div
                                key={index}
                                className="text-center group value-item bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all"
                            >
                                <div className="w-16 h-16 mx-auto mb-4 bg-[#DC143C] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 relative z-10">
                                    <value.icon className="text-white" size={36} />
                                </div>
                                <span className="block text-xl font-semibold text-[#1F2937] mb-3 relative z-10">{value.title}</span>
                                <p className="text-gray-600 text-sm relative z-10">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 bg-gray-50 why-us-section">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="why-us-image h-96 relative rounded-lg overflow-hidden shadow-xl">
                            <ChromaImage
                                src="https://images.unsplash.com/photo-1685038407372-4ee4d312b76f"
                                alt="Techno Mech engineer checking quality of metal part with micrometer"
                                className="w-full h-full"
                                imgClassName="object-cover"
                                borderColor="#DC143C"
                            />
                        </div>

                        <div className="why-us-content">
                            <h2 className="text-4xl font-bold text-[#1F2937] mb-6">
                                <ShinyText text="Why Choose Us?" disabled={false} speed={3} className="custom-class" />
                            </h2>
                            <div className="space-y-3">
                                {whyChooseUs.map((reason, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start gap-3 group why-us-item"
                                    >
                                        <CheckCircle className="text-[#DC143C] flex-shrink-0 mt-1 group-hover:scale-110 transition-transform" size={20} />
                                        <span className="text-gray-700">{reason}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-gradient-to-r from-[#1F2937] to-gray-800 text-white stats-section">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        <div className="stat-item">
                            <div className="text-5xl font-bold text-[#DC143C] mb-2">500+</div>
                            <div className="text-xl">Satisfied Clients</div>
                        </div>
                        <div className="stat-item">
                            <div className="text-5xl font-bold text-[#DC143C] mb-2">10,000+</div>
                            <div className="text-xl">Products Delivered</div>
                        </div>
                        <div className="stat-item">
                            <div className="text-5xl font-bold text-[#DC143C] mb-2">15+</div>
                            <div className="text-xl">Years of Excellence</div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="pt-20 pb-20 bg-white custom-manufacturing-section">
                <div className="max-w-7xl mx-auto px-4 md:px-8 text-center custom-manufacturing-content">
                    <h2 className="text-4xl font-bold text-[#1F2937] mb-6">Tailored Engineering Solutions</h2>
                    <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
                        Beyond our standard catalog, we specialize in bringing your unique concepts to life. Submit your technical drawings or specific requirements, and our team will deliver precision-manufactured components that perfectly match your needs.
                    </p>
                    <Button onClick={handleCustomOrders} className="bg-[#DC143C] hover:bg-[#B01030] text-white px-8 py-6 text-lg">
                        Start Your Custom Project
                    </Button>
                </div>
            </section>
        </div>
    );
};

export default About;
