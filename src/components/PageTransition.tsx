"use client";
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useRef, useEffect } from "react";

const pages = ['/', '/about', '/products', '/services', '/contact', '/privacy-policy', '/terms-conditions'];

export default function PageTransition({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const prevPathname = useRef(pathname);

    const getDirection = (prev: string, current: string) => {
        const prevIndex = pages.indexOf(prev);
        const currIndex = pages.indexOf(current);

        // Default to forward (1) if unknown
        if (prevIndex === -1 || currIndex === -1) return 1;
        return currIndex > prevIndex ? 1 : -1;
    };

    const direction = getDirection(prevPathname.current, pathname);

    useEffect(() => {
        prevPathname.current = pathname;
    }, [pathname]);

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 100 : -100, // Reduced distance for smoother feel
            opacity: 0,
            filter: "blur(10px)",
            scale: 0.95
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            filter: "blur(0px)",
            scale: 1
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 100 : -100, // Inverse of enter
            opacity: 0,
            filter: "blur(10px)",
            scale: 0.95
        })
    };

    // "wait" mode ensures the exit animation completes before the new page mounts.
    // FrozenRouter removed due to Next.js 16 compatibility issues causing missing content.
    // We will rely on effective key management or template.tsx in future if needed.

    return (
        <AnimatePresence mode="wait" custom={direction}>
            <motion.div
                key={pathname}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                    x: { type: "spring", stiffness: 500, damping: 30 },
                    opacity: { duration: 0.2 }
                }}
                className="w-full"
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}
