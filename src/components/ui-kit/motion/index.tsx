"use client";

import { motion } from "framer-motion";

export const FadeIn = ({ children, delay = 0, duration = 0.5, className }: { children: React.ReactNode; delay?: number; duration?: number; className?: string }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration, delay }}
        className={className}
    >
        {children}
    </motion.div>
);

export const SlideIn = ({ children, direction = "left", delay = 0, className }: { children: React.ReactNode; direction?: "left" | "right" | "up" | "down"; delay?: number; className?: string }) => {
    const variants = {
        hidden: {
            x: direction === "left" ? -50 : direction === "right" ? 50 : 0,
            y: direction === "up" ? 50 : direction === "down" ? -50 : 0,
            opacity: 0,
        },
        visible: {
            x: 0,
            y: 0,
            opacity: 1,
        },
    };

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={variants}
            transition={{ duration: 0.5, delay }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export const StaggerWrapper = ({ children, className, stagger = 0.1 }: { children: React.ReactNode; className?: string; stagger?: number }) => (
    <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
            visible: {
                transition: {
                    staggerChildren: stagger,
                },
            },
        }}
        className={className}
    >
        {children}
    </motion.div>
);

export const StaggerItem = ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <motion.div
        variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
        }}
        className={className}
    >
        {children}
    </motion.div>
);
