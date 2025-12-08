import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import ClickSpark from './ClickSpark';
import { cn } from "@/lib/utils";

export interface ChromaItem {
    image: string;
    title: string;
    subtitle: string;
    handle?: string;
    location?: string;
    borderColor?: string;
    gradient?: string;
    url?: string;
    cta?: string;
    specs?: string[];
}

export interface ChromaGridProps {
    items?: ChromaItem[];
    className?: string;
    radius?: number;
    damping?: number;
    fadeOut?: number;
    ease?: string;
    onItemClick?: (item: ChromaItem, index: number) => void;
}

type SetterFn = (v: number | string) => void;

const ChromaGrid: React.FC<ChromaGridProps> = ({
    items,
    className = '',
    radius = 300,
    damping = 0.45,
    fadeOut = 0.6,
    ease = 'power3.out',
    onItemClick
}) => {
    const rootRef = useRef<HTMLDivElement>(null);
    const fadeRef = useRef<HTMLDivElement>(null);
    const setX = useRef<SetterFn | null>(null);
    const setY = useRef<SetterFn | null>(null);
    const pos = useRef({ x: 0, y: 0 });

    const demo: ChromaItem[] = [
        {
            image: 'https://i.pravatar.cc/300?img=8',
            title: 'Alex Rivera',
            subtitle: 'Full Stack Developer',
            handle: '@alexrivera',
            borderColor: '#4F46E5',
            gradient: 'linear-gradient(145deg,#4F46E5,#000)',
            url: 'https://github.com/'
        }
    ];

    const data = items?.length ? items : demo;

    useEffect(() => {
        const el = rootRef.current;
        if (!el) return;
        setX.current = gsap.quickSetter(el, '--x', 'px') as SetterFn;
        setY.current = gsap.quickSetter(el, '--y', 'px') as SetterFn;

        // Initial setup
        const updatePos = () => {
            if (!el) return;
            const { width, height } = el.getBoundingClientRect();
            pos.current = { x: width / 2, y: height / 2 };
            setX.current?.(pos.current.x);
            setY.current?.(pos.current.y);
        }

        updatePos();
        window.addEventListener('resize', updatePos);
        return () => window.removeEventListener('resize', updatePos);
    }, []);

    const moveTo = (x: number, y: number) => {
        gsap.to(pos.current, {
            x,
            y,
            duration: damping,
            ease,
            onUpdate: () => {
                setX.current?.(pos.current.x);
                setY.current?.(pos.current.y);
            },
            overwrite: true
        });
    };

    const handleMove = (e: React.PointerEvent) => {
        if (!rootRef.current) return;
        const r = rootRef.current.getBoundingClientRect();
        moveTo(e.clientX - r.left, e.clientY - r.top);
        if (fadeRef.current) {
            gsap.to(fadeRef.current, { opacity: 0, duration: 0.25, overwrite: true });
        }
    };

    const handleLeave = () => {
        if (fadeRef.current) {
            gsap.to(fadeRef.current, {
                opacity: 1,
                duration: fadeOut,
                overwrite: true
            });
        }
    };

    const handleCardClick = (item: ChromaItem, index: number) => {
        if (onItemClick) {
            onItemClick(item, index);
            return;
        }
        if (item.url) window.open(item.url, '_blank', 'noopener,noreferrer');
    };

    const handleCardMove: React.MouseEventHandler<HTMLElement> = e => {
        const c = e.currentTarget as HTMLElement;
        const rect = c.getBoundingClientRect();
        c.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        c.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
    };

    return (
        <div
            ref={rootRef}
            onPointerMove={handleMove}
            onPointerLeave={handleLeave}
            className={cn("relative w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", className)}
            style={
                {
                    '--r': `${radius}px`,
                    '--x': '50%',
                    '--y': '50%'
                } as React.CSSProperties
            }
        >
            {data.map((c, i) => (
                <div key={i} className="relative w-full aspect-square rounded-xl">
                    <ClickSpark sparkColor="#DC143C" sparkSize={12} sparkRadius={25} sparkCount={10} duration={500}>
                        <article
                            onMouseMove={handleCardMove}
                            onClick={() => handleCardClick(c, i)}
                            className="group relative flex flex-col w-full h-full rounded-xl overflow-hidden border-2 border-transparent transition-colors duration-300 cursor-pointer"
                            style={
                                {
                                    '--card-border': c.borderColor || 'transparent',
                                    background: c.gradient,
                                    '--spotlight-color': 'rgba(255,255,255,0.3)'
                                } as React.CSSProperties
                            }
                        >
                            <div
                                className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-20 opacity-0 group-hover:opacity-100"
                                style={{
                                    background:
                                        'radial-gradient(circle at var(--mouse-x) var(--mouse-y), var(--spotlight-color), transparent 70%)'
                                }}
                            />
                            <div className="relative z-10 flex-shrink-0 p-0 box-border h-[48%] overflow-hidden">
                                <img src={c.image} alt={c.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                            </div>
                            <footer className="relative z-10 p-5 text-white font-sans flex flex-col gap-3 flex-grow">
                                <div className="flex justify-between items-start">
                                    <h3 className="m-0 text-xl font-bold leading-tight">{c.title}</h3>
                                    {c.handle && <span className="text-xs opacity-70 bg-white/10 px-2 py-1 rounded whitespace-nowrap">{c.handle}</span>}
                                </div>
                                <p className="m-0 text-sm opacity-85 leading-relaxed">{c.subtitle}</p>

                                {c.specs && (
                                    <div className="flex flex-wrap gap-2 my-2">
                                        {c.specs.map((spec, idx) => (
                                            <div key={idx} className="flex items-center gap-1.5 text-xs text-white/70 bg-black/20 px-2 py-1 rounded-full">
                                                <div className="w-1 h-1 bg-[#DC143C] rounded-full"></div>
                                                {spec}
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <div className="flex-grow"></div>

                                {c.cta && (
                                    <div className="mt-auto text-sm font-bold text-[#DC143C] bg-white px-4 py-3 rounded text-center opacity-90 group-hover:opacity-100 transition-all duration-300 hover:scale-105 active:scale-95">
                                        {c.cta}
                                    </div>
                                )}
                            </footer>
                        </article>
                    </ClickSpark>
                </div>
            ))}
            <div
                className="absolute inset-0 pointer-events-none z-30"
                style={{
                    backdropFilter: 'grayscale(1) brightness(0.9)',
                    WebkitBackdropFilter: 'grayscale(1) brightness(0.9)',
                    background: 'rgba(255,255,255,0.01)',
                    maskImage:
                        'radial-gradient(circle var(--r) at var(--x) var(--y),transparent 0%,transparent 15%,rgba(0,0,0,0.10) 30%,rgba(0,0,0,0.22)45%,rgba(0,0,0,0.35)60%,rgba(0,0,0,0.50)75%,rgba(0,0,0,0.68)88%,white 100%)',
                    WebkitMaskImage:
                        'radial-gradient(circle var(--r) at var(--x) var(--y),transparent 0%,transparent 15%,rgba(0,0,0,0.10) 30%,rgba(0,0,0,0.22)45%,rgba(0,0,0,0.35)60%,rgba(0,0,0,0.50)75%,rgba(0,0,0,0.68)88%,white 100%)'
                }}
            />
            <div
                ref={fadeRef}
                className="absolute inset-0 pointer-events-none transition-opacity duration-[250ms] z-40"
                style={{
                    backdropFilter: 'grayscale(1) brightness(0.9)',
                    WebkitBackdropFilter: 'grayscale(1) brightness(0.9)',
                    background: 'rgba(255,255,255,0.01)',
                    maskImage:
                        'radial-gradient(circle var(--r) at var(--x) var(--y),white 0%,white 15%,rgba(255,255,255,0.90)30%,rgba(255,255,255,0.78)45%,rgba(255,255,255,0.65)60%,rgba(255,255,255,0.50)75%,rgba(255,255,255,0.32)88%,transparent 100%)',
                    WebkitMaskImage:
                        'radial-gradient(circle var(--r) at var(--x) var(--y),white 0%,white 15%,rgba(255,255,255,0.90)30%,rgba(255,255,255,0.78)45%,rgba(255,255,255,0.65)60%,rgba(255,255,255,0.50)75%,rgba(255,255,255,0.32)88%,transparent 100%)',
                    opacity: 1
                }}
            />
        </div>
    );
};

export default ChromaGrid;
