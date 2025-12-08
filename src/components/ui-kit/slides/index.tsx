"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Slide {
    id: number;
    content: React.ReactNode;
    bgImage?: string;
}

export const HeroCarousel = ({ slides }: { slides: Slide[] }) => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [slides.length]);

    const paginate = (newDirection: number) => {
        setIndex((prev) => (prev + newDirection + slides.length) % slides.length);
    };

    return (
        <div className="relative w-full h-[600px] overflow-hidden rounded-2xl bg-black">
            <AnimatePresence initial={false} mode="wait">
                <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 w-full h-full"
                >
                    {slides[index].bgImage && (
                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: `url(${slides[index].bgImage})` }}
                        >
                            <div className="absolute inset-0 bg-black/40" />
                        </div>
                    )}
                    <div className="relative z-10 w-full h-full flex items-center justify-center p-8">
                        {slides[index].content}
                    </div>
                </motion.div>
            </AnimatePresence>

            <button
                onClick={() => paginate(-1)}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white transition-all"
            >
                <ChevronLeft className="w-6 h-6" />
            </button>
            <button
                onClick={() => paginate(1)}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white transition-all"
            >
                <ChevronRight className="w-6 h-6" />
            </button>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setIndex(i)}
                        className={cn(
                            "w-2.5 h-2.5 rounded-full transition-all duration-300",
                            i === index ? "bg-white w-8" : "bg-white/50 hover:bg-white/80"
                        )}
                    />
                ))}
            </div>
        </div>
    );
};
