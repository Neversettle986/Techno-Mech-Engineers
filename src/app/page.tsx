'use client';

import ShinyText from "@/components/ShinyText";
import Link from 'next/link';
import { ArrowRight, Package, Award, Users, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Hero from "@/components/Hero";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import ChromaImage from "@/components/ChromaImage";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    const stats = [
        { icon: Users, value: '500+', label: 'Satisfied Clients' },
        { icon: Package, value: '10,000+', label: 'Products Delivered' },
        { icon: Award, value: '15+', label: 'Years Experience' },
        { icon: Globe, value: '25+', label: 'Countries Served' }
    ];

    const productCategories = [
        {
            title: 'Precision Components',
            description: 'High-tolerance custom machined parts for specialized industrial applications.',
            image: 'https://images.unsplash.com/photo-1565439360986-19aa82a0b411?auto=format&fit=crop&q=80',
            borderColor: '#DC143C'
        },
        {
            title: 'Metal Washers',
            description: 'Durable industrial washers available in various materials and specifications.',
            image: 'https://images.unsplash.com/photo-1621252179027-94459d27d3ee?auto=format&fit=crop&q=80',
            borderColor: '#DC143C'
        },
        {
            title: 'Industrial Springs',
            description: 'Custom-designed springs engineered for reliability and high performance.',
            image: 'https://images.unsplash.com/photo-1598555815610-c4464c20f18a?auto=format&fit=crop&q=80',
            borderColor: '#DC143C'
        },
        {
            title: 'Pipe Fittings',
            description: 'Robust pipe fittings ensuring leak-proof connections for fluid systems.',
            image: 'https://images.unsplash.com/photo-1535050804459-05558a60210f?auto=format&fit=crop&q=80',
            borderColor: '#DC143C'
        }
    ];

    useGSAP(() => {
        // Stats Animation - Batch
        ScrollTrigger.batch(".stat-item", {
            onEnter: batch => gsap.fromTo(batch,
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, stagger: 0.2, duration: 0.8, ease: "power3.out", overwrite: true }
            ),
            start: "top 85%",
            once: true
        });

        // Products Title Animation
        gsap.fromTo(".products-title",
            { y: 30, opacity: 0 },
            {
                scrollTrigger: {
                    trigger: ".products-section",
                    start: "top 80%",
                    toggleActions: "play none none none"
                },
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power3.out"
            }
        );

        // Products Grid Animation - Batch
        ScrollTrigger.batch(".product-card", {
            onEnter: batch => gsap.fromTo(batch,
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: "power3.out", overwrite: true }
            ),
            start: "top 85%",
            once: true
        });

        // Products CTA Animation
        gsap.fromTo(".products-cta",
            { y: 20, opacity: 0 },
            {
                scrollTrigger: {
                    trigger: ".products-grid",
                    start: "bottom 90%",
                    toggleActions: "play none none none"
                },
                y: 0,
                opacity: 1,
                duration: 0.8,
                delay: 0.2,
                ease: "power3.out"
            }
        );

        // Quality Section Animation
        gsap.from(".quality-content", {
            scrollTrigger: {
                trigger: ".quality-section",
                start: "top 70%",
                toggleActions: "play none none none"
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });

        // CTA Section Animation
        gsap.from(".features-cta-content", {
            scrollTrigger: {
                trigger: ".features-cta-section",
                start: "top 70%",
                toggleActions: "play none none none"
            },
            scale: 0.9,
            opacity: 0,
            duration: 0.8,
            ease: "back.out(1.7)"
        });

    }, { scope: containerRef });

    return (
        <div className="pt-32" ref={containerRef}>
            <Hero />

            <ServicesSection />

            <AboutSection />

            <section className="py-20 bg-[#1F2937] text-white stats-section">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className="text-center stat-item"
                            >
                                <div className="w-16 h-16 mx-auto mb-4 bg-[#DC143C] rounded-full flex items-center justify-center">
                                    <stat.icon size={32} />
                                </div>
                                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                                <div className="text-gray-300">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 bg-white products-section">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="text-center mb-12 products-title">
                        <h2 className="text-4xl font-bold text-[#1F2937] mb-4">
                            <ShinyText text="Our Products" disabled={false} speed={3} className="custom-class" />
                        </h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Comprehensive range of precision-engineered components for diverse industrial applications
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 products-grid">
                        {productCategories.map((product, index) => (
                            <div
                                key={index}
                                className="bg-white border-2 border-slate-100 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 product-card group"
                            >
                                <div className="h-48 relative overflow-hidden bg-gray-100">
                                    <ChromaImage
                                        src={product.image}
                                        alt={product.title}
                                        className="w-full h-full"
                                        imgClassName="object-cover"
                                        borderColor={product.borderColor}
                                    />
                                </div>
                                <div className="p-6">
                                    <span className="block font-semibold text-lg text-[#1F2937] mb-2">{product.title}</span>
                                    <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                                    <Link href="/products" className="text-[#DC143C] hover:text-[#B01030] font-medium text-sm flex items-center gap-2 group">
                                        Learn More
                                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-12 products-cta">
                        <Link href="/products">
                            <Button className="bg-[#DC143C] hover:bg-[#B01030] text-white px-8 py-6 text-lg group">
                                View All Products
                                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            <section className="relative py-20 bg-gray-100 overflow-hidden quality-section">
                <div className="absolute inset-0 z-0">
                    <img className="w-full h-full object-cover opacity-10 mix-blend-overlay" alt="Precision gears texture background" src="https://images.unsplash.com/photo-1582236371755-d4fb3a0c4516" />
                </div>
                <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 text-center quality-content">
                    <h2 className="text-4xl font-bold text-[#1F2937] mb-6">
                        <ShinyText text="Uncompromising Quality & Precision" disabled={false} speed={3} className="custom-class" />
                    </h2>
                    <p className="text-gray-700 text-lg max-w-3xl mx-auto mb-8">
                        At Techno Mech Engineers, every product is a testament to our commitment to superior quality and meticulous precision. We adhere to stringent quality control measures at every stage of manufacturing to deliver components that perform flawlessly in the most demanding environments.
                    </p>
                    <Link href="/about">
                        <Button className="bg-[#1F2937] hover:bg-gray-700 text-white px-8 py-6 text-lg group">
                            Learn About Our Quality
                            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                </div>
            </section>

            <section className="py-20 bg-gradient-to-r from-[#DC143C] to-[#B01030] text-white relative overflow-hidden features-cta-section">
                <div className="absolute inset-0 z-0">
                    <img className="w-full h-full object-cover opacity-10 mix-blend-overlay" alt="Red metal machinery texture background" src="https://images.unsplash.com/photo-1681206155017-4cca7adf6fc1" />
                </div>
                <div className="max-w-7xl mx-auto px-4 md:px-8 text-center relative z-10 features-cta-content">
                    <h2 className="text-4xl font-bold mb-6">
                        <ShinyText text="Ready to Get Started?" disabled={false} speed={3} className="custom-class" />
                    </h2>
                    <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
                        Contact us today to discuss your precision engineering requirements. Our team is ready to provide expert solutions.
                    </p>
                    <Link href="/contact">
                        <Button className="bg-white text-[#DC143C] hover:bg-gray-100 px-8 py-6 text-lg font-semibold group">
                            Get In Touch
                            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;
