"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { AnimatedButton } from "../buttons/AnimatedButton";

export const FeatureCard = ({ title, description, icon: Icon, delay = 0 }: { title: string; description: string; icon: any; delay?: number }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay }}
            whileHover={{ y: -10 }}
            className="p-8 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group"
        >
            <div className="w-14 h-14 bg-[#DC143C]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#DC143C] transition-colors duration-300">
                <Icon className="w-7 h-7 text-[#DC143C] group-hover:text-white transition-colors duration-300" />
            </div>
            <h3 className="text-xl font-bold text-[#1F2937] mb-3">{title}</h3>
            <p className="text-gray-600 leading-relaxed">{description}</p>
        </motion.div>
    );
};

export const PricingCard = ({
    title,
    price,
    features,
    isPopular = false,
    billingPeriod = "monthly"
}: {
    title: string;
    price: string;
    features: string[];
    isPopular?: boolean;
    billingPeriod?: "monthly" | "yearly";
}) => {
    return (
        <motion.div
            whileHover={{ y: -8 }}
            className={cn(
                "relative p-8 bg-white rounded-3xl shadow-lg border transition-all duration-300",
                isPopular ? "border-[#DC143C] shadow-[#DC143C]/20" : "border-gray-100"
            )}
        >
            {isPopular && (
                <div className="absolute top-0 right-0 bg-[#DC143C] text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl rounded-tr-2xl uppercase tracking-wider">
                    Most Popular
                </div>
            )}
            <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
                <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-[#1F2937]">${price}</span>
                    <span className="text-gray-500">/{billingPeriod === "monthly" ? "mo" : "yr"}</span>
                </div>
            </div>
            <ul className="space-y-4 mb-8">
                {features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-600">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                            <Check className="w-3 h-3 text-green-600" />
                        </div>
                        <span className="text-sm">{feature}</span>
                    </li>
                ))}
            </ul>
            <AnimatedButton
                variant={isPopular ? "primary" : "outline"}
                className="w-full"
            >
                Choose Plan
            </AnimatedButton>
        </motion.div>
    );
};

export const GlassCard = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className={cn(
                "bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl p-8",
                className
            )}
        >
            {children}
        </motion.div>
    );
};
