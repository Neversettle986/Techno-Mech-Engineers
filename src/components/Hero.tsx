"use client";

import { useEffect, useRef } from "react";
import Link from 'next/link';
import { ArrowRight, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ShinyText from "@/components/ShinyText";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ChromaImage from "./ChromaImage";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate text content
      gsap.fromTo(textRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
        }
      );

      // Animate image
      gsap.fromTo(imageRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.2,
          ease: "power3.out",
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-[600px] flex items-center bg-gradient-to-br from-[#1F2937] via-gray-800 to-[#DC143C] text-white overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <img className="w-full h-full object-cover opacity-20 mix-blend-overlay" alt="Industrial machinery background texture" src="https://images.unsplash.com/photo-1617386689286-782f48c468ff" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div ref={textRef}>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              <ShinyText text="Precision Engineering" disabled={false} speed={3} className="custom-class" mode="dark" />
              <span className="block text-[#DC143C] mt-2">
                <ShinyText text="Excellence" disabled={false} speed={3} className="custom-class" />
              </span>
            </h1>
            <p className="text-xl text-gray-200 mb-8 leading-relaxed">
              Leading manufacturer of high-quality precision machine components, metal washers, springs, and pipe fittings.
              Serving industries with excellence since 2008.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/products">
                <Button className="bg-[#DC143C] hover:bg-[#B01030] text-white px-8 py-6 text-lg group">
                  View Products
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#DC143C] px-8 py-6 text-lg transition-all duration-300 hover:scale-105 flex items-center gap-2 group">
                  Contact Us
                  <Mail className="group-hover:rotate-12 transition-transform duration-300" size={20} />
                </Button>
              </Link>
            </div>
          </div>

          <div ref={imageRef} className="relative z-10 w-full max-w-lg lg:max-w-xl mx-auto lg:mx-0">
            <ChromaImage
              src="/assets/hero.webp"
              alt="Heavy industrial CNC machinery in operation at Techno Mech Engineers factory"
              className="rounded-lg shadow-2xl"
              imgClassName="h-auto"
              borderColor="#DC143C"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
