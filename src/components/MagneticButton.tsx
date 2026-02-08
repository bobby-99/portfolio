import { useRef, useEffect } from 'react';
import type { ReactNode } from 'react';
import gsap from 'gsap';

interface MagneticButtonProps {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
    href?: string;
    id?: string;
}

export default function MagneticButton({ children, className = '', onClick, href, id }: MagneticButtonProps) {
    const buttonRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const button = buttonRef.current;
        if (!button) return;

        const onMouseMove = (e: MouseEvent) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(button, {
                x: x * 0.2,
                y: y * 0.2,
                duration: 0.3,
                ease: 'power1.out',
            });
        };

        const onMouseLeave = () => {
            gsap.to(button, {
                x: 0,
                y: 0,
                duration: 0.3,
                ease: 'power1.out',
            });
        };

        button.addEventListener('mousemove', onMouseMove);
        button.addEventListener('mouseleave', onMouseLeave);

        return () => {
            button.removeEventListener('mousemove', onMouseMove);
            button.removeEventListener('mouseleave', onMouseLeave);
        };
    }, []);

    if (href) {
        return (
            <a
                ref={buttonRef as any}
                href={href}
                className={`magnetic-btn inline-block ${className}`}
                onClick={onClick}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
                {children}
            </a>
        );
    }

    return (
        <button
            ref={buttonRef as any}
            id={id}
            className={`magnetic-btn inline-block ${className}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
}
