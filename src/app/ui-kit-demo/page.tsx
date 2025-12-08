"use client";

import { AnimatedButton, RippleButton } from "@/components/ui-kit/buttons/AnimatedButton";
import { FeatureCard, PricingCard, GlassCard } from "@/components/ui-kit/cards";
import { StickyNavbar, MobileDrawer } from "@/components/ui-kit/nav";
import { TextReveal, Typewriter, SectionTitle } from "@/components/ui-kit/text";
import { HeroCarousel } from "@/components/ui-kit/slides";
import { TiltCard, Blob } from "@/components/ui-kit/hover";
import { FadeIn, SlideIn, StaggerWrapper, StaggerItem } from "@/components/ui-kit/motion";
import { ArrowRight, Star, Zap, Shield, Heart } from "lucide-react";
import { useState } from "react";

export default function UIKitDemo() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const navLinks = [
        { name: "Home", href: "#" },
        { name: "Features", href: "#features" },
        { name: "Pricing", href: "#pricing" },
        { name: "About", href: "#about" },
    ];

    const carouselSlides = [
        {
            id: 1,
            content: (
                <div className="text-center text-white">
                    <h1 className="text-5xl font-bold mb-4">Modern UI Kit</h1>
                    <p className="text-xl">Built with React & Framer Motion</p>
                </div>
            ),
            bgImage: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30"
        },
        {
            id: 2,
            content: (
                <div className="text-center text-white">
                    <h1 className="text-5xl font-bold mb-4">Smooth Animations</h1>
                    <p className="text-xl">Enhanced User Experience</p>
                </div>
            ),
            bgImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f"
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <StickyNavbar
                logo={<div className="font-bold text-2xl text-[#DC143C]">ReactBits</div>}
                links={navLinks}
                actions={
                    <AnimatedButton variant="primary" onClick={() => setIsDrawerOpen(true)}>
                        Menu
                    </AnimatedButton>
                }
            />

            <MobileDrawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                links={navLinks}
            />

            <HeroCarousel slides={carouselSlides} />

            <div className="max-w-7xl mx-auto px-4 md:px-8 py-20 space-y-32">
                {/* Typography Section */}
                <section>
                    <SectionTitle title="Typography & Text" subtitle="Animated text reveals and typewriter effects" center />
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <div className="p-6 bg-white rounded-xl shadow-sm">
                                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4">Text Reveal</h3>
                                <TextReveal
                                    text="Reveal this text word by word with a smooth stagger effect."
                                    className="text-2xl font-bold text-gray-900"
                                />
                            </div>
                            <div className="p-6 bg-white rounded-xl shadow-sm">
                                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-4">Typewriter</h3>
                                <Typewriter
                                    text="This text is being typed out automatically..."
                                    className="text-xl font-mono text-[#DC143C]"
                                />
                            </div>
                        </div>
                        <div className="bg-gray-900 p-8 rounded-2xl text-white">
                            <FadeIn>
                                <h3 className="text-2xl font-bold mb-4">Fade In Content</h3>
                                <p className="text-gray-400">
                                    This entire block fades in when it enters the viewport. Great for highlighting content sections.
                                </p>
                            </FadeIn>
                        </div>
                    </div>
                </section>

                {/* Buttons Section */}
                <section>
                    <SectionTitle title="Interactive Buttons" center />
                    <div className="flex flex-wrap gap-6 justify-center">
                        <AnimatedButton>
                            Primary Button
                        </AnimatedButton>
                        <AnimatedButton variant="secondary" rightIcon={<ArrowRight className="w-4 h-4" />}>
                            With Icon
                        </AnimatedButton>
                        <AnimatedButton variant="outline" isLoading>
                            Loading State
                        </AnimatedButton>
                        <RippleButton variant="primary">
                            Ripple Effect
                        </RippleButton>
                        <RippleButton variant="outline">
                            Ripple Outline
                        </RippleButton>
                    </div>
                </section>

                {/* Cards Section */}
                <section id="features">
                    <SectionTitle title="Feature Cards" subtitle="Hover effects and interactions" center />
                    <StaggerWrapper className="grid md:grid-cols-3 gap-8">
                        <StaggerItem>
                            <FeatureCard
                                title="Lightning Fast"
                                description="Optimized for speed and performance using the latest technologies."
                                icon={Zap}
                            />
                        </StaggerItem>
                        <StaggerItem>
                            <FeatureCard
                                title="Secure by Default"
                                description="Enterprise-grade security features built right into the core."
                                icon={Shield}
                            />
                        </StaggerItem>
                        <StaggerItem>
                            <FeatureCard
                                title="Loved by Developers"
                                description="Simple API and great documentation make it a joy to use."
                                icon={Heart}
                            />
                        </StaggerItem>
                    </StaggerWrapper>
                </section>

                {/* Hover Effects Section */}
                <section>
                    <SectionTitle title="Hover & 3D Effects" center />
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <TiltCard className="w-full h-[400px] bg-gradient-to-br from-[#DC143C] to-purple-600 rounded-3xl flex items-center justify-center text-white shadow-2xl">
                            <div className="text-center p-8">
                                <Star className="w-16 h-16 mx-auto mb-4" />
                                <h3 className="text-3xl font-bold mb-2">3D Tilt Effect</h3>
                                <p className="opacity-80">Move your mouse over this card</p>
                            </div>
                        </TiltCard>
                        <div className="relative h-[400px] flex items-center justify-center overflow-hidden bg-white rounded-3xl shadow-lg border border-gray-100">
                            <div className="absolute inset-0 flex items-center justify-center opacity-30">
                                <Blob />
                            </div>
                            <GlassCard className="z-10 max-w-sm">
                                <h3 className="text-2xl font-bold mb-4">Glassmorphism</h3>
                                <p className="mb-6">
                                    Beautiful frosted glass effect with background blurs and subtle borders.
                                </p>
                                <AnimatedButton variant="primary" className="w-full">
                                    Try It Now
                                </AnimatedButton>
                            </GlassCard>
                        </div>
                    </div>
                </section>

                {/* Pricing Section */}
                <section id="pricing">
                    <SectionTitle title="Pricing Plans" center />
                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        <PricingCard
                            title="Starter"
                            price="29"
                            features={["5 Projects", "Basic Analytics", "Community Support", "1GB Storage"]}
                        />
                        <PricingCard
                            title="Pro"
                            price="99"
                            isPopular
                            features={["Unlimited Projects", "Advanced Analytics", "Priority Support", "10GB Storage", "Custom Domain"]}
                        />
                        <PricingCard
                            title="Enterprise"
                            price="299"
                            features={["Dedicated Support", "SLA", "Unlimited Storage", "Custom Integrations", "SSO"]}
                        />
                    </div>
                </section>
            </div>
        </div>
    );
}
