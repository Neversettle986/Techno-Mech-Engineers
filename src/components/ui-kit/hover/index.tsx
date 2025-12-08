"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import React, { useRef } from "react";

export const TiltCard = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateY,
                rotateX,
                transformStyle: "preserve-3d",
            }}
            className={cn("relative", className)}
        >
            <div style={{ transform: "translateZ(75px)", transformStyle: "preserve-3d" }}>
                {children}
            </div>
        </motion.div>
    );
};

export const Blob = ({ className }: { className?: string }) => {
    return (
        <motion.div
            animate={{
                scale: [1, 1.2, 0.9, 1.1, 1],
                borderRadius: ["30% 70% 70% 30% / 30% 30% 70% 70%", "60% 40% 30% 70% / 60% 30% 70% 40%", "40% 60% 60% 40% / 40% 60% 40% 60%"],
                rotate: [0, 90, 180, 270, 360],
            }}
            transition={{
                duration: 8,
                repeat: Infinity,
                repeatType: "reverse",
            }}
            className={cn("w-64 h-64 bg-gradient-to-r from-purple-400 to-pink-500 opacity-50 blur-2xl filter", className)}
        />
    );
};
