import React, { useRef, MouseEvent } from 'react';
import { cn } from "@/lib/utils";
import ClickSpark from './ClickSpark';

interface ChromaImageProps {
    src: string;
    alt: string;
    className?: string; // Wrapper class
    imgClassName?: string; // Image element class
    borderColor?: string;
    gradient?: string;
    onClick?: () => void;
}

const ChromaImage: React.FC<ChromaImageProps> = ({
    src,
    alt,
    className = '',
    imgClassName = '',
    borderColor = 'transparent',
    gradient = 'linear-gradient(145deg, #1F2937 0%, #000000 100%)',
    onClick
}) => {
    const handleCardMove = (e: MouseEvent<HTMLElement>) => {
        const c = e.currentTarget;
        const rect = c.getBoundingClientRect();
        c.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        c.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
    };

    return (
        <div className={cn("relative w-full h-full", className)} onClick={onClick}>
            <ClickSpark sparkColor="#DC143C" sparkSize={12} sparkRadius={25} sparkCount={10} duration={500}>
                <article
                    onMouseMove={handleCardMove}
                    className="group relative w-full h-full overflow-hidden border-2 border-transparent transition-all duration-300 cursor-pointer"
                    style={{
                        '--card-border': borderColor,
                        background: gradient,
                        '--spotlight-color': 'rgba(255,255,255,0.3)',
                        borderRadius: '0.75rem' // matching rounded-xl
                    } as React.CSSProperties}
                >
                    <div
                        className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-20 opacity-0 group-hover:opacity-100"
                        style={{
                            background: 'radial-gradient(circle at var(--mouse-x) var(--mouse-y), var(--spotlight-color), transparent 70%)'
                        }}
                    />
                    <img
                        src={src}
                        alt={alt}
                        className={cn("w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105", imgClassName)}
                        loading="lazy"
                    />
                </article>
            </ClickSpark>
        </div>
    );
};

export default ChromaImage;
