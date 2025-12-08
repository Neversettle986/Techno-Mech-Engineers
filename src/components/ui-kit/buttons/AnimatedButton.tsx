"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, HTMLMotionProps } from "framer-motion";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface BaseButtonProps {
    variant?: "primary" | "secondary" | "ghost" | "outline";
    isLoading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

interface AnimatedButtonProps extends HTMLMotionProps<"button">, BaseButtonProps {
    children?: React.ReactNode;
}
interface RippleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, BaseButtonProps { }

export const AnimatedButton = ({
    children,
    className,
    variant = "primary",
    isLoading = false,
    leftIcon,
    rightIcon,
    ...props
}: AnimatedButtonProps) => {
    const variants = {
        primary: "bg-[#DC143C] text-white hover:bg-[#B01030] border-transparent",
        secondary: "bg-[#1F2937] text-white hover:bg-gray-700 border-transparent",
        ghost: "bg-transparent text-[#1F2937] hover:bg-gray-100 border-transparent",
        outline: "bg-transparent text-[#1F2937] border-2 border-[#DC143C] hover:bg-[#DC143C] hover:text-white",
    };

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
                "relative flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
                variants[variant],
                className
            )}
            disabled={isLoading || props.disabled}
            {...props}
        >
            <AnimatePresence mode="wait">
                {isLoading ? (
                    <motion.div
                        key="loader"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                    >
                        <Loader2 className="w-5 h-5 animate-spin" />
                    </motion.div>
                ) : (
                    <motion.div
                        key="content"
                        className="flex items-center gap-2"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                    >
                        {leftIcon && <span>{leftIcon}</span>}
                        {children}
                        {rightIcon && <span>{rightIcon}</span>}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.button>
    );
};

export const RippleButton = ({
    children,
    className,
    variant = "primary",
    onClick,
    ...props
}: RippleButtonProps) => {
    const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const id = Date.now();

        setRipples((prev) => [...prev, { x, y, id }]);
        setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 1000);

        onClick?.(e);
    };

    const variants = {
        primary: "bg-[#DC143C] text-white hover:bg-[#B01030]",
        secondary: "bg-[#1F2937] text-white hover:bg-gray-700",
        ghost: "bg-transparent text-[#1F2937] hover:bg-gray-100",
        outline: "bg-transparent text-[#1F2937] border-2 border-[#DC143C] hover:bg-gray-50",
    };

    return (
        <button
            className={cn(
                "relative overflow-hidden px-8 py-4 rounded-lg font-bold transition-all duration-300 transform active:scale-95",
                variants[variant],
                className
            )}
            onClick={handleClick}
            {...props}
        >
            <span className="relative z-10">{children}</span>
            <AnimatePresence>
                {ripples.map((ripple) => (
                    <motion.span
                        key={ripple.id}
                        initial={{ scale: 0, opacity: 0.5 }}
                        animate={{ scale: 4, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                        className="absolute bg-white/30 rounded-full pointer-events-none"
                        style={{
                            left: ripple.x,
                            top: ripple.y,
                            width: 100,
                            height: 100,
                            marginLeft: -50,
                            marginTop: -50,
                        }}
                    />
                ))}
            </AnimatePresence>
        </button>
    );
};
