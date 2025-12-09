'use client';
import React, { useState, useEffect, Suspense, useRef } from 'react';
import { Phone, Mail, MapPin, Clock, Send, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useSearchParams } from 'next/navigation';
import { gsap } from "gsap";
import ShinyText from "@/components/ShinyText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Script from 'next/script';
import OrbitCard from '@/components/ui/OrbitCard';

gsap.registerPlugin(ScrollTrigger);

// Define global grecaptcha type
declare global {
    interface Window {
        grecaptcha: any;
    }
}

const ContactForm = () => {
    const { toast } = useToast();
    const searchParams = useSearchParams();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: ''
    });

    // Pre-fill subject from query params
    useEffect(() => {
        const subject = searchParams.get('subject');
        if (subject) {
            setFormData(prev => ({
                ...prev,
                subject: subject
            }));
        }
    }, [searchParams]);

    // State to track error fields
    const [errors, setErrors] = useState<Record<string, boolean>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        let value = e.target.value;

        if (e.target.name === 'phone') {
            value = value.replace(/\D/g, '');
            if (value.length > 10) value = value.slice(0, 10);
        }

        setErrors(prev => ({ ...prev, [e.target.name]: false }));
        setFormData({ ...formData, [e.target.name]: value });
    };

    const getRecaptchaToken = async () => {
        return new Promise<string | null>((resolve) => {
            if (!window.grecaptcha || !siteKey) {
                console.warn("reCAPTCHA not ready or key missing");
                resolve(null);
                return;
            }
            window.grecaptcha.ready(() => {
                window.grecaptcha.execute(siteKey, { action: 'contact_form_submit' })
                    .then((token: string) => resolve(token))
                    .catch((err: any) => {
                        console.error("reCAPTCHA execution failed", err);
                        resolve(null);
                    });
            });
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // 1. Validation
        const newErrors: Record<string, boolean> = {};
        const requiredFields = ['name', 'email', 'phone', 'subject', 'message'];
        let firstErrorId = '';

        requiredFields.forEach(field => {
            if (!formData[field as keyof typeof formData]) {
                newErrors[field] = true;
                if (!firstErrorId) firstErrorId = field;
            }
        });

        // Phone Validation
        const phoneRegex = /^\d{10}$/;
        if (formData.phone && !phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
            newErrors['phone'] = true;
            if (!firstErrorId) firstErrorId = 'phone';
            toast({ variant: "destructive", title: "Invalid Phone Number", description: "Please enter a valid 10-digit Indian phone number." });
        }

        // Email Validation
        if (formData.email && !formData.email.toLowerCase().endsWith('@gmail.com')) {
            newErrors['email'] = true;
            if (!firstErrorId) firstErrorId = 'email';
            toast({ variant: "destructive", title: "Invalid Email", description: "Please use a valid @gmail.com address." });
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            if (!firstErrorId) {
                toast({ variant: "destructive", title: "Validation Error", description: "Please correct the highlighted fields." });
            }
            requiredFields.forEach(field => {
                if (newErrors[field]) {
                    gsap.fromTo(`#${field}`, { x: -10, borderColor: '#DC143C' }, { x: 0, borderColor: '#DC143C', duration: 0.1, repeat: 5, yoyo: true, ease: "power1.inOut" });
                }
            });
            return;
        }

        setIsSubmitting(true);

        try {
            // 2. Manual Token Generation
            let token = null;
            if (siteKey) {
                try {
                    token = await getRecaptchaToken();
                } catch (e) {
                    console.error("Token generation error", e);
                }
            } else {
                console.warn("reCAPTCHA key missing in environment");
            }

            // Note: We proceed even if token is null, allowing backend to decide strictness or fail gracefully

            // 3. Submit
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, captchaValue: token }),
            });

            if (response.ok) {
                toast({ title: "Message Sent Successfully! ✓", description: "Thank you for contacting us. We'll get back to you within 24 hours." });
                setFormData({ name: '', email: '', phone: '', company: '', subject: '', message: '' });
            } else {
                const data = await response.json();
                throw new Error(data.error || 'Failed to send message');
            }
        } catch (error) {
            console.error(error);
            toast({ variant: "destructive", title: "Error", description: error instanceof Error ? error.message : "Failed to send message." });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <OrbitCard className="border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10" noValidate>
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="name" className={`block text-sm font-medium mb-2 transition-colors ${errors.name ? 'text-[#DC143C]' : 'text-gray-700'}`}>Full Name *</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} disabled={isSubmitting} className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none transition-all ${errors.name ? 'border-[#DC143C] focus:ring-[#DC143C] bg-red-50 text-[#DC143C] placeholder-red-300' : 'border-gray-300 focus:ring-[#DC143C] focus:border-transparent'}`} placeholder="Enter your name" />
                    </div>
                    <div>
                        <label htmlFor="email" className={`block text-sm font-medium mb-2 transition-colors ${errors.email ? 'text-[#DC143C]' : 'text-gray-700'}`}>Email Address *</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} disabled={isSubmitting} className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none transition-all ${errors.email ? 'border-[#DC143C] focus:ring-[#DC143C] bg-red-50 text-[#DC143C] placeholder-red-300' : 'border-gray-300 focus:ring-[#DC143C] focus:border-transparent'}`} placeholder="Enter your email" />
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="phone" className={`block text-sm font-medium mb-2 transition-colors ${errors.phone ? 'text-[#DC143C]' : 'text-gray-700'}`}>Phone Number *</label>
                        <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} disabled={isSubmitting} className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none transition-all ${errors.phone ? 'border-[#DC143C] focus:ring-[#DC143C] bg-red-50 text-[#DC143C] placeholder-red-300' : 'border-gray-300 focus:ring-[#DC143C] focus:border-transparent'}`} placeholder="Enter your phone number" />
                    </div>
                    <div>
                        <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                        <input type="text" id="company" name="company" value={formData.company} onChange={handleChange} disabled={isSubmitting} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#DC143C] focus:border-transparent outline-none transition-all" placeholder="Enter your company name" />
                    </div>
                </div>

                <div>
                    <label htmlFor="subject" className={`block text-sm font-medium mb-2 transition-colors ${errors.subject ? 'text-[#DC143C]' : 'text-gray-700'}`}>Subject *</label>
                    <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} disabled={isSubmitting} className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none transition-all ${errors.subject ? 'border-[#DC143C] focus:ring-[#DC143C] bg-red-50 text-[#DC143C] placeholder-red-300' : 'border-gray-300 focus:ring-[#DC143C] focus:border-transparent'}`} placeholder="Enter your subject" />
                </div>

                <div>
                    <label htmlFor="message" className={`block text-sm font-medium mb-2 transition-colors ${errors.message ? 'text-[#DC143C]' : 'text-gray-700'}`}>Message *</label>
                    <textarea id="message" name="message" rows={6} value={formData.message} onChange={handleChange} disabled={isSubmitting} className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none transition-all resize-none ${errors.message ? 'border-[#DC143C] focus:ring-[#DC143C] bg-red-50 text-[#DC143C] placeholder-red-300' : 'border-gray-300 focus:ring-[#DC143C] focus:border-transparent'}`} placeholder="Enter your message"></textarea>
                </div>

                <Button type="submit" disabled={isSubmitting} className="w-full bg-[#DC143C] hover:bg-[#B01030] text-white py-6 text-lg group disabled:opacity-70 disabled:cursor-not-allowed">
                    <div className="flex items-center justify-center gap-2">
                        {isSubmitting ? 'Sending Message...' : 'Send Message'}
                        {!isSubmitting && <Send className="group-hover:translate-x-1 transition-transform" size={20} />}
                    </div>
                </Button>
                <p className="text-xs text-gray-400 text-center mt-2">Protected by reCAPTCHA</p>
            </form>
        </OrbitCard>
    );
};


const ContactContent = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { toast } = useToast();

    // GSAP Animations
    useGSAP(() => {
        gsap.from(".hero-content", { y: 30, opacity: 0, duration: 0.8, ease: "power3.out" });
        ScrollTrigger.batch(".contact-card", {
            onEnter: batch => gsap.fromTo(batch,
                { opacity: 0, x: 20 },
                { opacity: 1, x: 0, stagger: 0.15, duration: 0.6, ease: "power3.out", overwrite: true }
            ),
            start: "top 85%",
            once: true
        });
        gsap.from(".form-section", {
            scrollTrigger: { trigger: ".form-section", start: "top 80%", toggleActions: "play none none none" },
            y: 30, opacity: 0, duration: 0.8, ease: "power3.out"
        });
        gsap.from(".cta-content", {
            scrollTrigger: { trigger: ".cta-section", start: "top 80%", toggleActions: "play none none none" },
            scale: 0.9, opacity: 0, duration: 0.8, ease: "power3.out"
        });
        ScrollTrigger.batch(".faq-item", {
            onEnter: batch => gsap.fromTo(batch,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, stagger: 0.1, duration: 0.5, ease: "power3.out", overwrite: true }
            ),
            start: "top 90%",
            once: true
        });
    }, { scope: containerRef });

    const contactInfo = [
        { icon: MapPin, title: 'Visit Us', details: '1-9-121/E/C, opp. to Speck Systems, EC Complex, Kushaiguda, Hyderabad-500062', link: null },
        { icon: Phone, title: 'Call Us', details: '+91 83098 62581', link: 'tel:+918309862581' },
        { icon: Mail, title: 'Email Us', details: 'technomech6@gmail.com', link: 'mailto:technomech6@gmail.com' },
        { icon: Clock, title: 'Business Hours', details: 'Mon - Sat: 9:00 AM - 6:00 PM', link: null }
    ];

    return (
        <div className="pt-32 pb-0" ref={containerRef}>
            <section className="relative bg-gradient-to-br from-[#1F2937] to-[#DC143C] text-white py-20 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img className="w-full h-full object-cover opacity-20 mix-blend-overlay" alt="Customer support headset background" src="https://images.unsplash.com/photo-1486164875050-dd30d88b663a" />
                </div>
                <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
                    <div className="text-center hero-content">
                        <h1 className="text-5xl md:text-6xl font-bold mb-6"><ShinyText text="Contact Us" disabled={false} speed={3} className="custom-class" mode="dark" /></h1>
                        <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">Get in touch with our team to discuss your precision engineering requirements</p>
                    </div>
                </div>
            </section>

            {/* Debug/Config Alert: Only show in development if needed, usually safer to hide in prod */}
            {!process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && (
                <div className="bg-amber-50 border-l-4 border-amber-500 p-4 max-w-7xl mx-auto mt-4 rounded-md shadow-sm">
                    <p className="text-sm text-amber-700"><strong>Configuration Warning:</strong> reCAPTCHA keys missing from environment.</p>
                </div>
            )}


            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                        <div className="lg:col-span-2 form-section">
                            <h2 className="text-3xl font-bold text-[#1F2937] mb-6"><ShinyText text="We welcome your inquiries." disabled={false} speed={3} className="custom-class" /></h2>
                            <p className="text-gray-600 mb-8">Fill out the form below and our team will get back to you within 24 hours. For urgent inquiries, please call us directly.</p>
                            <ContactForm />
                        </div>

                        <div className="space-y-6 flex flex-col justify-start">
                            <div>
                                <h3 className="text-3xl font-bold text-[#1F2937] mb-6"><ShinyText text="Contact Details" disabled={false} speed={3} className="custom-class" /></h3>
                                <p className="text-gray-600 mb-8">Reach us through any of these channels.</p>
                            </div>
                            <div className="grid gap-6 contact-grid w-full">
                                {contactInfo.map((info, index) => {
                                    const Icon = info.icon;
                                    return (
                                        <OrbitCard key={index} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-6 border border-gray-100 contact-card">
                                            <div className="w-14 h-14 bg-[#DC143C]/10 rounded-full flex items-center justify-center flex-shrink-0 relative z-20"><Icon className="text-[#DC143C]" size={24} /></div>
                                            <div className="text-left relative z-20">
                                                <span className="block font-bold text-[#1F2937] text-sm uppercase tracking-wide mb-1">{info.title}</span>
                                                {info.link ? <a href={info.link} target={info.icon === MapPin ? "_blank" : undefined} rel={info.icon === MapPin ? "noopener noreferrer" : undefined} className="text-gray-600 hover:text-[#DC143C] transition-colors text-base font-medium break-words">{info.details}</a> : <p className="text-gray-600 text-base font-medium break-words">{info.details}</p>}
                                            </div>
                                        </OrbitCard>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ - Shortened for brevity in this view, assuming same as before */}
            <section className="py-20 bg-white">
                <div className="max-w-4xl mx-auto px-4 md:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-[#1F2937] mb-4"><ShinyText text="Frequently Asked Questions" disabled={false} speed={3} className="custom-class" /></h2>
                        <p className="text-gray-600">Common questions about our manufacturing services and policies.</p>
                    </div>
                    <div className="space-y-4">
                        {[
                            { q: "What is your typical lead time for orders?", a: "Standard lead times generally range from 2-3 weeks depending on the complexity and volume of the order. Expedited services are available for urgent requirements." },
                            { q: "Do you accept small volume or prototype orders?", a: "Yes, we specialize in both rapid prototyping and high-volume production runs. We don't have a strict minimum order quantity (MOQ) for most components." },
                            { q: "What file formats do you accept for quotes?", a: "We accept most standard CAD formats including STEP (.stp), IGES (.igs), SolidWorks (.sldprt), and PDF for 2D drawings with tolerances." },
                            { q: "Do you offer material certification?", a: "Absolutely. We can provide material test reports (MTR) and quality inspection reports upon request to ensure full traceability and compliance." },
                        ].map((faq, index) => (
                            <OrbitCard key={index} className="group border border-gray-200 rounded-lg bg-gray-50 faq-item transition-all duration-300">
                                <details className="group [&_summary::-webkit-details-marker]:hidden open:bg-transparent">
                                    <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-1 text-[#1F2937] relative z-20">
                                        <h3 className="font-semibold text-lg">{faq.q}</h3>
                                        <span className="shrink-0 rounded-full bg-white p-1.5 text-gray-500 sm:p-3 group-open:-rotate-180 transition-transform shadow-sm"><ChevronDown size={20} /></span>
                                    </summary>
                                    <div className="pt-4 pb-2 leading-relaxed text-gray-600 relative z-20">{faq.a}</div>
                                </details>
                            </OrbitCard>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 bg-gradient-to-r from-[#DC143C] to-[#B01030] text-white relative overflow-hidden cta-section">
                <div className="absolute inset-0 z-0"><img className="w-full h-full object-cover opacity-10 mix-blend-overlay" alt="Contact support abstract background" src="https://images.unsplash.com/photo-1630873224996-02fbd10e24a8" /></div>
                <div className="max-w-7xl mx-auto px-4 md:px-8 text-center relative z-10 cta-content">
                    <h2 className="text-4xl font-bold mb-6"><ShinyText text="Need Immediate Assistance?" disabled={false} speed={3} className="custom-class" /></h2>
                    <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">Our sales and technical support team is available during business hours to answer your questions</p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <a href="tel:+918309862581" className="bg-white text-[#DC143C] hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold transition-all duration-200 hover:scale-105 active:scale-95 inline-flex items-center gap-2"><Phone size={20} />Call Now</a>
                        <a href="https://wa.me/8309862581" target="_blank" rel="noopener noreferrer" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 hover:scale-105 active:scale-95 inline-block">WhatsApp Chat</a>
                    </div>
                </div>
            </section>
        </div>
    );
};

const Contact = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Manually Load Script */}
            {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && (
                <Script
                    src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
                    strategy="lazyOnload"
                />
            )}
            <Suspense fallback={<div className="flex items-center justify-center p-20">Loading...</div>}>
                <ContactContent />
            </Suspense>
        </div>
    );
};

export default Contact;
