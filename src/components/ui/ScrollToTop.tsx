'use client';

import { useEffect, useState } from 'react';

export default function ScrollToTop() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            setVisible(window.scrollY > 200);
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    if (!visible) return null;

    return (
        <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="fixed bottom-6 right-6 z-50 rounded-full bg-black text-white py-2 px-4 shadow-lg hover:opacity-80 dark:bg-white dark:text-black"
        >
            ↑
        </button>
    );
}
