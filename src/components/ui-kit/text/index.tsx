"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

export const TextReveal = ({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10%" });
    const words = text.split(" ");

    return (
        <div ref={ref} className={cn("overflow-hidden", className)}>
            <div className="flex flex-wrap gap-2">
                {words.map((word, i) => (
                    <motion.span
                        key={i}
                        initial={{ y: "100%", opacity: 0 }}
                        animate={isInView ? { y: 0, opacity: 1 } : {}}
                        transition={{
                            duration: 0.5,
                            delay: delay + i * 0.1,
                            ease: [0.33, 1, 0.68, 1],
                        }}
                        className="inline-block"
                    >
                        {word}
                    </motion.span>
                ))}
            </div>
        </div>
    );
};

export const Typewriter = ({ text, speed = 0.05, delay = 0, className }: { text: string; speed?: number; delay?: number; className?: string }) => {
    const characters = text.split("");

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={cn("flex flex-wrap", className)}
        >
            {characters.map((char, index) => (
                <motion.span
                    key={index}
                    variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1 },
                    }}
                    transition={{ duration: 0, delay: delay + index * speed }}
                >
                    {char}
                </motion.span>
            ))}
        </motion.div>
    );
};

export const SectionTitle = ({ title, subtitle, center = false }: { title: string; subtitle?: string; center?: boolean }) => {
    return (
        <div className={cn("mb-12", center && "text-center")}>
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-4xl font-bold text-[#1F2937] mb-4"
            >
                {title}
            </motion.h2>
            {subtitle && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="h-1 w-20 bg-[#DC143C] rounded-full mb-6 mx-auto md:mx-0"
                    style={center ? { marginLeft: "auto", marginRight: "auto" } : {}}
                />
            )}
            {subtitle && (
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-gray-600 text-lg max-w-2xl"
                    style={center ? { marginLeft: "auto", marginRight: "auto" } : {}}
                >
                    {subtitle}
                </motion.p>
            )}
        </div>
    );
};
