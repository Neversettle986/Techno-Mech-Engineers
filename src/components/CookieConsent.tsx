"use client";
import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Cookies from "js-cookie";
import { generateUserId } from "@/lib/generateUserId";
import { generateVisitId } from "@/lib/generateVisitId";

const USER_ID_COOKIE_NAME = "userId";
const VISIT_ID_COOKIE_NAME = "visitId";

const CookieConsent = () => {
    // Default to TRUE (Visible/Blocked) to prevent flash of content
    const [isVisible, setIsVisible] = useState(true);
    const [mounted, setMounted] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setMounted(true);

        // Allow access to privacy policy without consent
        if (pathname === '/privacy-policy') {
            setIsVisible(false);
            document.body.style.overflow = "unset";
            return;
        }

        // Check session storage for "every visit" requirement
        const consent = sessionStorage.getItem("cookie_consent_accepted");

        if (consent === "true") {
            setIsVisible(false);
            document.body.style.overflow = "unset";
        } else {
            setIsVisible(true);
            // Strictly block scrolling
            document.body.style.overflow = "hidden";
        }
    }, [pathname]);

    const handleAccept = () => {
        sessionStorage.setItem("cookie_consent_accepted", "true");
        setIsVisible(false);
        document.body.style.overflow = "unset";

        // Set persistent User ID cookie upon acceptance
        let userId = Cookies.get(USER_ID_COOKIE_NAME);
        if (!userId) {
            userId = generateUserId();
            Cookies.set(USER_ID_COOKIE_NAME, userId, {
                expires: 365,
                path: "/",
                sameSite: "Lax",
                secure: true,
            });
            console.log("New userId created on consent:", userId);
        } else {
            console.log("Existing userId confirmed:", userId);
        }

        // Set session Visit ID cookie upon acceptance
        const visitId = generateVisitId();
        Cookies.set(VISIT_ID_COOKIE_NAME, visitId, {
            // No expires = session cookie
            path: "/",
            sameSite: "Lax",
            secure: true,
        });
        console.log("New visitId created for this session:", visitId);
    };

    if (!mounted || !isVisible) return null;

    return (
        <section className="fixed inset-0 z-[9999] p-4 flex items-center justify-center bg-black/80 backdrop-blur-md h-screen w-screen overflow-hidden touch-none">
            <div className="container mx-auto px-0 md:px-4 max-w-2xl relative z-[10000]">
                <div className="bg-white dark:bg-[#1E2735] rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] relative border border-gray-100 dark:border-gray-800 p-8 md:p-10 mx-auto">
                    {/* Decorative element from original design */}
                    <div className="absolute w-12 h-12 -top-5 left-[50%] -translate-x-1/2 rotate-45 bg-[#DC143C] border-t border-l border-white/20 hidden md:block shadow-lg"></div>

                    <div className="text-center space-y-6">
                        <h4 className="text-2xl md:text-3xl font-bold leading-normal text-[#1F2937] dark:text-white">
                            Cookie Consent
                        </h4>
                        <p className="leading-relaxed opacity-80 text-gray-600 dark:text-gray-300 text-base md:text-lg">
                            Access to this website requires your consent to our use of cookies. We use cookies to enhance your browsing experience and analyze our traffic.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                            <Link href="/privacy-policy" className="w-full sm:w-auto font-semibold rounded-full border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 duration-300 transition py-3 px-8 text-base flex items-center justify-center text-gray-700 dark:text-gray-200">
                                Privacy Policy
                            </Link>
                            <button
                                onClick={handleAccept}
                                className="w-full sm:w-auto font-bold rounded-full bg-[#DC143C] text-white hover:bg-[#B01030] duration-300 transition py-3 px-10 text-base shadow-lg hover:shadow-xl hover:-translate-y-1 active:translate-y-0 flex items-center justify-center"
                            >
                                Accept & Enter <ArrowRight size={18} className="ml-2" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CookieConsent;
