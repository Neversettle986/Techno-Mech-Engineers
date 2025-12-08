import React from 'react';

interface ShinyTextProps {
    text: string;
    disabled?: boolean;
    speed?: number;
    className?: string;
    mode?: 'light' | 'dark'; // light = white shine, dark = black shine
}

const ShinyText: React.FC<ShinyTextProps> = ({ text, disabled = false, speed = 5, className = '', mode = 'light' }) => {
    const animationDuration = `${speed}s`;

    // Configure gradient colors based on mode
    // Light mode (default): White shine (255,255,255)
    // Dark mode: Black shine (0,0,0)
    const rgb = mode === 'dark' ? '0, 0, 0' : '255, 255, 255';

    // For white text (dark mode shine), we might want a slightly stronger opacity to be visible
    const opacity = mode === 'dark' ? '0.4' : '0.8';

    return (
        <div
            className={`relative inline-block ${className}`}
        >
            {/* Base Text - visible with inherited color */}
            <span className="relative z-0">
                {text}
            </span>

            {/* Overlay Text - transparent with shiny background clipped */}
            <span
                className={`absolute top-0 left-0 z-10 ${disabled ? '' : 'animate-shine'} bg-clip-text text-transparent`}
                style={{
                    backgroundImage: `linear-gradient(120deg, rgba(${rgb}, 0) 40%, rgba(${rgb}, ${opacity}) 50%, rgba(${rgb}, 0) 60%)`,
                    backgroundSize: '200% 100%',
                    WebkitBackgroundClip: 'text',
                    animationDuration: animationDuration,
                    pointerEvents: 'none'
                }}
                aria-hidden="true"
            >
                {text}
            </span>
        </div>
    );
};

export default ShinyText;
