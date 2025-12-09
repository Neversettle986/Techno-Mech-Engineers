"use client";
import ShinyText from "@/components/ShinyText";
import ChromaImage from '@/components/ChromaImage';
import OrbitCard from '@/components/ui/OrbitCard';

import React, { useRef } from 'react';
import { Settings, Wrench, CheckCircle, Package, Ruler, Clock, Shield, Users, Phone, ArrowRight } from 'lucide-react';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    const services = [
        {
            icon: Settings,
            title: 'Custom CNC Machining',
            description: 'Precision CNC machining services for complex components with tight tolerances. Our advanced 3-axis and 4-axis CNC machines can handle various materials including steel, aluminum, brass, and plastics.',
            features: [
                'Multi-axis CNC turning and milling',
                'Tolerance up to ±0.005mm',
                'Batch production and prototyping',
                'Material selection guidance'
            ],
            image_desc: 'CNC machine operator working on lathe machine',
            image: '/assets/services-cnc.webp'
        },
        {
            icon: Wrench,
            title: 'Tool & Die Making',
            description: 'Expert tool and die manufacturing for stamping, forming, and production processes. We design and fabricate high-quality dies that ensure consistent part quality and long service life.',
            features: [
                'Progressive and compound dies',
                'Precision grinding and EDM',
                'Die maintenance and repair',
                'Custom jig and fixture design'
            ],
            image_desc: 'Metal die casting mold tool manufacturing',
            image: '/assets/services-tool&die.webp'
        },
        {
            icon: Ruler,
            title: 'Precision Measurement',
            description: 'Comprehensive quality inspection and measurement services using advanced metrology equipment. We ensure every component meets specified tolerances and quality standards.',
            features: [
                'CMM inspection services',
                'Surface finish analysis',
                'Dimensional verification',
                'Quality certification documentation'
            ],
            image_desc: 'Quality control engineer utilizing CMM machine for measurement',
            image: '/assets/services-precision.webp'
        },
        {
            icon: Package,
            title: 'Component Assembly',
            description: 'Professional assembly services for mechanical components and sub-assemblies. Our experienced technicians ensure proper fit, function, and quality of assembled products.',
            features: [
                'Sub-assembly integration',
                'Testing and validation',
                'Packaging and labeling',
                'Kitting services available'
            ],
            image_desc: 'Technicians assembling mechanical parts on production line',
            image: '/assets/services-component.webp'
        },
        {
            icon: Shield,
            title: 'Surface Treatment',
            description: 'Various surface finishing options to enhance durability, corrosion resistance, and aesthetics of components. We collaborate with certified partners for specialized treatments.',
            features: [
                'Zinc plating and powder coating',
                'Anodizing for aluminum parts',
                'Heat treatment services',
                'Passivation and chrome plating'
            ],
            image_desc: 'Metal surface finishing plating process industrial',
            image: '/assets/services-surface.webp'
        },
        {
            icon: Users,
            title: 'Engineering Consultation',
            description: 'Expert technical consultation to optimize designs for manufacturability, cost-effectiveness, and performance. Our engineers work closely with clients from concept to production.',
            features: [
                'Design for manufacturing (DFM)',
                'Material selection advice',
                'Cost optimization strategies',
                'Technical drawing review'
            ],
            image_desc: 'Engineers discussing technical blueprints and drawings',
            image: '/assets/services-consulting.webp'
        }
    ];

    const capabilities = [
        { icon: Clock, title: 'Quick Turnaround', description: 'Fast production with flexible scheduling' },
        { icon: CheckCircle, title: 'Quality Assured', description: 'Rigorous quality control processes' },
        { icon: Settings, title: 'Advanced Equipment', description: 'State-of-the-art CNC machinery' },
        { icon: Shield, title: 'Confidentiality', description: 'NDA protection for your designs' }
    ];

    const processSteps = [
        { step: "01", title: "Consultation", desc: "Understanding your requirements, specs, and deadlines." },
        { step: "02", title: "Design & Plan", desc: "CAD modeling and establishing optimum manufacturing route." },
        { step: "03", title: "Production", desc: "Precision machining and fabrication with strict quality checks." },
        { step: "04", title: "QA & Delivery", desc: "Final inspection, packaging, and timely dispatch." }
    ];

    useGSAP(() => {
        // Hero Animation
        gsap.from(".hero-content", {
            y: 30,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });

        // Services List Animation
        const serviceItems = document.querySelectorAll('.service-item');
        serviceItems.forEach((item, index) => {
            gsap.from(item, {
                scrollTrigger: {
                    trigger: item,
                    start: "top 85%",
                    toggleActions: "play none none none"
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out"
            });
        });

        // Process Animation
        gsap.from(".process-header", {
            scrollTrigger: {
                trigger: ".process-section",
                start: "top 80%",
                toggleActions: "play none none none"
            },
            y: 30,
            opacity: 0,
            duration: 0.8
        });

        gsap.from(".process-card", {
            scrollTrigger: {
                trigger: ".process-grid",
                start: "top 80%",
                toggleActions: "play none none none"
            },
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1
        });

        // Capabilities Header Animation
        gsap.from(".capabilities-header", {
            scrollTrigger: {
                trigger: ".capabilities-header",
                start: "top 80%",
                toggleActions: "play none none none"
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        });

        // Capabilities Grid Animation
        gsap.from(".capability-item", {
            scrollTrigger: {
                trigger: ".capabilities-grid",
                start: "top 80%",
                toggleActions: "play none none none"
            },
            y: 30,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power3.out"
        });

        // CTA Animation
        gsap.from(".cta-content", {
            scrollTrigger: {
                trigger: ".cta-section",
                start: "top 75%",
                toggleActions: "play none none none"
            },
            scale: 0.9,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        });

    }, { scope: containerRef });

    return (
        <div className="pt-32 pb-0" ref={containerRef}>
            <section className="relative bg-gradient-to-br from-[#1F2937] to-[#DC143C] text-white py-20 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img className="w-full h-full object-cover opacity-20 mix-blend-overlay" alt="Engineering blueprint and tools background" src="/assets/our-services.webp" />
                </div>
                <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
                    <div className="text-center hero-content">
                        <h1 className="text-5xl md:text-6xl font-bold mb-6">
                            <ShinyText text="Our Services" disabled={false} speed={3} className="custom-class" mode="dark" />
                        </h1>
                        <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                            Comprehensive engineering and manufacturing solutions tailored to your specific requirements
                        </p>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="space-y-20">
                        {services.map((service, index) => {
                            const Icon = service.icon;
                            const isEven = index % 2 === 0;
                            return (
                                <div
                                    key={index}
                                    className={`grid lg:grid-cols-2 gap-12 items-center service-item ${!isEven ? 'lg:grid-flow-dense' : ''}`}
                                >
                                    <div className={isEven ? 'lg:order-1' : 'lg:order-2'}>
                                        <div className="w-16 h-16 bg-[#DC143C] rounded-full flex items-center justify-center mb-6">
                                            <Icon className="text-white" size={32} />
                                        </div>
                                        <span className="block text-3xl font-bold text-[#1F2937] mb-4">{service.title}</span>
                                        <p className="text-gray-600 mb-6 leading-relaxed">
                                            {service.description}
                                        </p>
                                        <ul className="space-y-3">
                                            {service.features.map((feature, i) => (
                                                <li key={i} className="flex items-start gap-3">
                                                    <CheckCircle className="text-[#DC143C] mt-1 flex-shrink-0" size={18} />
                                                    <span className="text-gray-700">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className={`relative h-[400px] rounded-xl shadow-lg ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                                        <ChromaImage
                                            src={service.image}
                                            alt={service.image_desc}
                                            className="w-full h-full rounded-xl"
                                            borderColor="#DC143C"
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section className="py-20 bg-white process-section">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="text-center mb-16 process-header">
                        <h2 className="text-3xl font-bold text-[#1F2937] mb-4">
                            <ShinyText text="Our Manufacturing Process" disabled={false} speed={3} className="custom-class" />
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            From initial concept to final delivery, we follow a rigorous workflow to ensure precision and quality.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-4 gap-8 process-grid">
                        {processSteps.map((item, i) => (
                            <OrbitCard key={i} className="relative p-6 bg-gray-50 rounded-xl border border-gray-100 hover:border-[#DC143C]/30 transition-colors group process-card">
                                <span className="absolute -top-4 -left-4 text-6xl font-black text-gray-200/50 group-hover:text-[#DC143C]/10 transition-colors pointer-events-none select-none">
                                    {item.step}
                                </span>
                                <div className="mb-4 text-[#DC143C] opacity-80 group-hover:opacity-100 transition-opacity">
                                    {i === 0 && <Users size={28} />}
                                    {i === 1 && <Ruler size={28} />}
                                    {i === 2 && <Settings size={28} />}
                                    {i === 3 && <Package size={28} />}
                                </div>
                                <h3 className="text-xl font-bold text-[#1F2937] mb-3 relative z-10">{item.title}</h3>
                                <p className="text-gray-600 relative z-10 text-sm leading-relaxed">
                                    {item.desc}
                                </p>
                            </OrbitCard>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="text-center mb-12 capabilities-header">
                        <h2 className="text-4xl font-bold text-[#1F2937] mb-4">
                            <ShinyText text="Why Choose Our Services?" disabled={false} speed={3} className="custom-class" />
                        </h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            We combine technical expertise with advanced equipment to deliver exceptional results
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 capabilities-grid">
                        {capabilities.map((capability, index) => {
                            const Icon = capability.icon;
                            return (
                                <div
                                    key={index}
                                    className="text-center group capability-item"
                                >
                                    <div className="w-20 h-20 mx-auto mb-4 bg-[#DC143C] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                        <Icon className="text-white" size={36} />
                                    </div>
                                    <span className="block text-xl font-semibold text-[#1F2937] mb-2">{capability.title}</span>
                                    <p className="text-gray-600 text-sm">{capability.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="py-20 bg-gradient-to-r from-[#DC143C] to-[#B01030] text-white relative overflow-hidden cta-section">
                <div className="absolute inset-0 z-0">
                    <img className="w-full h-full object-cover opacity-10 mix-blend-overlay" alt="Industrial sparks background" src="https://images.unsplash.com/photo-1569950044272-e04b4b26300a" />
                </div>
                <div className="max-w-7xl mx-auto px-4 md:px-8 text-center relative z-10 cta-content">
                    <h2 className="text-4xl font-bold mb-6">Ready to Start Your Project?</h2>
                    <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
                        Get in touch with our engineering team to discuss your requirements and receive a detailed quote
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <a href="tel:+918309862581" className="bg-white text-[#DC143C] hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold transition-all duration-200 hover:scale-105 active:scale-95 inline-block">
                            Call Now: +91 83098 62581
                        </a>
                        <a href="mailto:technomech6@gmail.com" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#DC143C] px-8 py-4 rounded-lg font-semibold transition-all duration-200 hover:scale-105 active:scale-95 inline-block">
                            Email Us
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Services;
