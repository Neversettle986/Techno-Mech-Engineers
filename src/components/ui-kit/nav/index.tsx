"use client";

import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const StickyNavbar = ({
    logo,
    links,
    actions
}: {
    logo: React.ReactNode;
    links: { name: string; href: string }[];
    actions?: React.ReactNode;
}) => {
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);
    const [prevScroll, setPrevScroll] = useState(0);
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = prevScroll;
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }
        setPrevScroll(latest);
        setIsScrolled(latest > 20);
    });

    return (
        <motion.nav
            variants={{
                visible: { y: 0 },
                hidden: { y: "-100%" },
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-colors duration-300",
                isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100" : "bg-transparent"
            )}
        >
            <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
                <div className="flex-shrink-0">{logo}</div>
                <div className="hidden md:flex items-center gap-8">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "relative text-sm font-medium transition-colors hover:text-[#DC143C]",
                                pathname === link.href ? "text-[#DC143C]" : "text-gray-700"
                            )}
                        >
                            {link.name}
                            {pathname === link.href && (
                                <motion.div
                                    layoutId="underline"
                                    className="absolute left-0 right-0 -bottom-1 h-0.5 bg-[#DC143C]"
                                />
                            )}
                        </Link>
                    ))}
                </div>
                <div className="hidden md:block">
                    {actions}
                </div>
            </div>
        </motion.nav>
    );
};

export const MobileDrawer = ({
    links,
    isOpen,
    onClose
}: {
    links: { name: string; href: string }[];
    isOpen: boolean;
    onClose: () => void;
}) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        className="fixed right-0 top-0 bottom-0 z-50 w-[300px] bg-white shadow-2xl p-6"
                    >
                        <div className="flex justify-end mb-8">
                            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
                                <X className="w-6 h-6 text-gray-500" />
                            </button>
                        </div>
                        <div className="flex flex-col gap-4">
                            {links.map((link, i) => (
                                <motion.div
                                    key={link.href}
                                    initial={{ x: 20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.1 + i * 0.1 }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={onClose}
                                        className="block text-lg font-medium text-gray-800 hover:text-[#DC143C] transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
