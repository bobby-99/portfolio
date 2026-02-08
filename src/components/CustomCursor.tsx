import { useEffect, useRef } from 'react';

export default function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null);
    const outlineRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const dot = dotRef.current;
        const outline = outlineRef.current;

        if (!dot || !outline) return;

        const onMouseMove = (e: MouseEvent) => {
            const posX = e.clientX;
            const posY = e.clientY;

            // Move dot directly
            dot.style.left = `${posX}px`;
            dot.style.top = `${posY}px`;

            // Animate outline with slight delay
            outline.animate(
                {
                    left: `${posX}px`,
                    top: `${posY}px`,
                },
                { duration: 80, fill: 'forwards' }
            );
        };

        const addHover = () => outline.classList.add('hover');
        const removeHover = () => outline.classList.remove('hover');

        window.addEventListener('mousemove', onMouseMove);

        // Add interactivity to hoverable elements
        const hoverElements = document.querySelectorAll('a, button, [data-cursor="hover"]');
        hoverElements.forEach((el) => {
            el.addEventListener('mouseenter', addHover);
            el.addEventListener('mouseleave', removeHover);
        });

        // Cleanup and Re-bind for dynamic content
        const observer = new MutationObserver(() => {
            const newHoverElements = document.querySelectorAll('a, button, [data-cursor="hover"]');
            newHoverElements.forEach((el) => {
                el.removeEventListener('mouseenter', addHover); // Prevent duplicates
                el.removeEventListener('mouseleave', removeHover);
                el.addEventListener('mouseenter', addHover);
                el.addEventListener('mouseleave', removeHover);
            });
        });

        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            observer.disconnect();
            hoverElements.forEach((el) => {
                el.removeEventListener('mouseenter', addHover);
                el.removeEventListener('mouseleave', removeHover);
            });
        };
    }, []);

    return (
        <>
            <div ref={dotRef} className="cursor-dot hidden md:block" />
            <div ref={outlineRef} className="cursor-outline hidden md:block" />
        </>
    );
}
