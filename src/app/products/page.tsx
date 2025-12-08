'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Settings, Package, Disc, Gauge, Wrench, Filter, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import ShinyText from "@/components/ShinyText";
import { gsap } from "gsap";
import ChromaGrid, { ChromaItem } from '@/components/ChromaGrid';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Products = () => {
    const [activeCategory, setActiveCategory] = useState('all');
    const router = useRouter();
    const containerRef = useRef<HTMLDivElement>(null);

    const categories = [
        { id: 'all', name: 'All Products', icon: Package },
        { id: 'machine-components', name: 'Machine Components', icon: Settings },
        { id: 'washers', name: 'Metal Washers', icon: Disc },
        { id: 'springs', name: 'Metal Springs', icon: Gauge },
        { id: 'pipe-fittings', name: 'Pipe Fittings', icon: Wrench },
        { id: 'fasteners', name: 'Fasteners', icon: Filter }
    ];

    const products = [
        {
            category: 'machine-components',
            name: 'CNC Machined Components',
            description: 'High-precision components machined to tight tolerances for various industrial applications',
            specs: ['Tolerance: ±0.005mm', 'Materials: Steel, Aluminum, Brass', 'Custom designs available'],
            image_desc: 'CNC machined complex metal component part',
            image_url: '/assets/cnc-components.webp'
        },
        {
            category: 'machine-components',
            name: 'Bearing Housings',
            description: 'Durable bearing housings for industrial machinery and automotive applications',
            specs: ['Various sizes available', 'Cast iron & steel options', 'Pre-machined & ready to install'],
            image_desc: 'Cast iron bearing housings industrial parts',
            image_url: '/assets/bearing-housing.webp'
        },
        {
            category: 'machine-components',
            name: 'Shaft Couplings',
            description: 'Flexible and rigid shaft couplings for power transmission systems',
            specs: ['Multiple coupling types', 'Torque ratings up to 5000 Nm', 'Corrosion resistant'],
            image_desc: 'Metal shaft couplings for motors',
            image_url: '/assets/shaft-couplings.webp'
        },
        {
            category: 'washers',
            name: 'Flat Washers',
            description: 'Standard and heavy-duty flat washers in various materials and sizes',
            specs: ['Sizes: M3 to M100', 'Materials: SS, MS, Brass', 'DIN & ANSI standards'],
            image_desc: 'Stainless steel flat washers pile',
            image_url: '/assets/flat-washers.webp'
        },
        {
            category: 'washers',
            name: 'Spring Washers',
            description: 'High-quality spring washers providing tension and preventing loosening',
            specs: ['Square & rectangular types', 'Hardened steel construction', 'Various load ratings'],
            image_desc: 'Split spring lock washers metal',
            image_url: '/assets/spring-washers.webp'
        },
        {
            category: 'washers',
            name: 'Lock Washers',
            description: 'Toothed lock washers for secure fastening in critical applications',
            specs: ['Internal & external teeth', 'Prevents bolt loosening', 'High vibration resistance'],
            image_desc: 'Toothed lock washers internal external teeth',
            image_url: '/assets/lock-washers.webp'
        },
        {
            category: 'springs',
            name: 'Compression Springs',
            description: 'Custom and standard compression springs for industrial use',
            specs: ['Wire dia: 0.2mm to 20mm', 'Various materials available', 'Custom specifications'],
            image_desc: 'Metal compression springs industrial use',
            image_url: '/assets/compression-springs.webp'
        },
        {
            category: 'springs',
            name: 'Extension Springs',
            description: 'Tension springs designed for pulling and extending applications',
            specs: ['Multiple hook configurations', 'Custom load requirements', 'Stainless & music wire'],
            image_desc: 'Extension springs with hooks metal',
            image_url: '/assets/extension-spring.webp'
        },
        {
            category: 'springs',
            name: 'Torsion Springs',
            description: 'Precision torsion springs for rotational force applications',
            specs: ['Angular deflection options', 'Custom leg configurations', 'High cycle life'],
            image_desc: 'Torsion springs for industrial applications',
            image_url: '/assets/torion-spring.webp'
        },
        {
            category: 'pipe-fittings',
            name: 'Pipe Elbows',
            description: 'Threaded and socket weld pipe elbows in various angles and sizes',
            specs: ['45° & 90° angles', 'NPT & BSP threads', 'Pressure rated'],
            image_desc: 'Stainless steel pipe elbow fittings 90 degree',
            image_url: '/assets/pipe-elbows.webp'
        },
        {
            category: 'pipe-fittings',
            name: 'Pipe Tees & Crosses',
            description: 'High-quality branch fittings enabling smooth connection of multiple pipe lines safely.',
            specs: ['Equal & reducing types', 'Various materials', 'High-pressure applications'],
            image_desc: 'Metal pipe tee fittings industrial',
            image_url: '/assets/pipe-tees.webp'
        },
        {
            category: 'pipe-fittings',
            name: 'Pipe Couplings',
            description: 'Threaded and compression couplings for pipe connections',
            specs: ['Full & half coupling types', 'Socket weld options', 'Leak-proof design'],
            image_desc: 'Threaded metal pipe couplings',
            image_url: '/assets/pipe-couplings.webp'
        },
        {
            category: 'fasteners',
            name: 'Hex Bolts & Nuts',
            description: 'High-tensile and standard hex bolts paired with matching nuts for durability.',
            specs: ['Grades: 4.8 to 12.9', 'Sizes: M3 to M100', 'Various finishes available'],
            image_desc: 'Hex head bolts and nuts fasteners',
            image_url: '/assets/hex-bolts.webp'
        },
        {
            category: 'fasteners',
            name: 'Socket Head Screws',
            description: 'High-quality Allen head cap screws for precision fastening.',
            specs: ['DIN 912 standard', 'Black oxide & zinc plated', 'Full thread & partial thread'],
            image_desc: 'Black oxide socket head cap screws',
            image_url: '/assets/socket-head.webp'
        },
        {
            category: 'fasteners',
            name: 'Contact Us For More Products',
            description: 'Looking for something specific? Contact us for custom requirements and extensive product catalogs.',
            specs: ['Custom Manufacturing', 'Bulk Orders', 'Specialized Sourcing'],
            image_desc: 'Contact us for more products',
            image_url: '/assets/more.webp'
        }
    ];

    const filteredProducts = activeCategory === 'all'
        ? products
        : products.filter(p => p.category === activeCategory);

    const handleRequestQuote = (productName: string) => {
        router.push(`/contact?subject=Quote Request: ${encodeURIComponent(productName)}`);
    };

    const handleCustomOrders = () => {
        router.push('/contact?subject=Custom Manufacturing Inquiry');
    };

    useGSAP(() => {
        // Hero Animation
        gsap.from(".hero-content", {
            y: 30,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });

        // Filter Buttons Animation
        gsap.from(".filter-btn", {
            y: 30,
            opacity: 0,
            duration: 0.5,
            stagger: 0.05,
            ease: "power3.out",
            delay: 0.3
        });

        // Custom Orders Animation
        gsap.from(".custom-order-content", {
            scrollTrigger: {
                trigger: ".custom-order-section",
                start: "top 80%",
                toggleActions: "play none none none"
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        });

    }, { scope: containerRef });

    // Animate products when filtered or scrolled
    useGSAP(() => {
        // Kill existing ScrollTriggers to prevent memory leaks and conflicts on re-render
        ScrollTrigger.getAll().forEach(trigger => {
            if (trigger.vars.trigger && (trigger.vars.trigger as string | Element).toString().includes("product-card")) {
                trigger.kill();
            }
        });

        // Use ScrollTrigger.batch for potentially large lists of items
        ScrollTrigger.batch(".product-card", {
            onEnter: batch => gsap.fromTo(batch,
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: "power3.out", overwrite: true }
            ),
            start: "top 85%",
            once: true
        });

        // Refresh ScrollTrigger after DOM updates
        ScrollTrigger.refresh();

    }, { scope: containerRef, dependencies: [filteredProducts] });

    return (
        <div className="pt-28 pb-22" ref={containerRef}>
            <section className="relative bg-gradient-to-br from-[#1F2937] to-[#DC143C] text-white py-20 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img className="w-full h-full object-cover opacity-20 mix-blend-overlay" alt="Precision parts background" src="https://images.unsplash.com/photo-1599143156605-c12ac37b6970" />
                </div>
                <div className="max-w-7xl mx-auto px-8 md:px-8 relative z-10">
                    <div className="text-center hero-content">
                        <h1 className="text-5xl md:text-6xl font-bold mb-6">
                            <ShinyText text="Our Products" disabled={false} speed={3} className="custom-class" mode="dark" />
                        </h1>
                        <div className="mb-12 flex justify-center">
                            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-12">
                                Comprehensive range of precision-engineered components for diverse industrial applications
                            </p>
                        </div>
                    </div>
                </div>

            </section>

            <section className="py-12 bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                        {categories.map((category) => {
                            const Icon = category.icon;
                            return (
                                <button
                                    key={category.id}
                                    onClick={() => setActiveCategory(category.id)}
                                    className={`filter-btn transition-colors duration-300 px-6 py-3 min-w-[150px] flex items-center justify-center rounded-md text-sm font-medium border ${activeCategory === category.id
                                        ? 'bg-[#DC143C] text-white border-[#DC143C]'
                                        : 'border-gray-300 text-gray-700 hover:border-[#DC143C] hover:text-[#DC143C] bg-white'
                                        }`}
                                >
                                    <Icon size={18} className="mr-2" />
                                    {category.name}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="py-20 bg-gray-50 min-h-screen">
                <div className="max-w-7xl mx-auto px-4 md:px-8 h-full">
                    {filteredProducts.length > 0 ? (
                        <div style={{ minHeight: '800px', position: 'relative' }}>
                            <ChromaGrid
                                items={filteredProducts.map(product => ({
                                    image: product.image_url,
                                    title: product.name,
                                    subtitle: product.description.length > 80 ? product.description.substring(0, 80) + '...' : product.description,
                                    handle: product.category,
                                    specs: product.specs,
                                    cta: product.name === 'Contact Us For More Products' ? 'Contact Us' : 'Request Quote',
                                    borderColor: product.name === 'Contact Us For More Products' ? '#DC143C' : '#4B5563',
                                    gradient: product.name === 'Contact Us For More Products'
                                        ? 'linear-gradient(135deg, #1F2937, #DC143C)'
                                        : 'linear-gradient(145deg, #1F2937, #111827)',
                                    url: product.name // Passing name as url/id for handler
                                }))}
                                onItemClick={(item: ChromaItem) => {
                                    if (item.title === 'Contact Us For More Products') {
                                        handleCustomOrders();
                                    } else {
                                        handleRequestQuote(item.title);
                                    }
                                }}
                                radius={400}
                                damping={0.2}
                            />
                        </div>
                    ) : (
                        <div className="text-center text-white py-20">No products found in this category.</div>
                    )}
                </div>
            </section>

            <section className="py-20 bg-white custom-order-section">
                <div className="max-w-7xl mx-auto px-4 md:px-8 text-center custom-order-content">
                    <h2 className="text-4xl font-bold text-[#1F2937] mb-6">
                        <ShinyText text="Custom Manufacturing Available" disabled={false} speed={3} className="custom-class" />
                    </h2>
                    <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
                        Can't find what you're looking for? We offer custom manufacturing services based on your specific
                        requirements and technical drawings.
                    </p>
                    <Button onClick={handleCustomOrders} className="bg-[#DC143C] hover:bg-[#B01030] text-white px-8 py-6 text-lg">
                        Contact Us for Custom Orders
                    </Button>
                </div>
            </section>
        </div >
    );
};

export default Products;
