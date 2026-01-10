'use client';

export default function DarkModeToggle() {
    const toggle = () => {
        document.documentElement.classList.toggle('dark');
    };

    return (
        <button
            onClick={toggle}
            aria-label="Toggle dark mode"
            className="border px-3 py-1 rounded dark:border-gray-700"
        >
            🌙
        </button>
    );
}
