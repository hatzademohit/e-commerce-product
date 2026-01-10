'use client';

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
    return (
        <input
            type="text"
            placeholder="Search products..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full md:w-64 border rounded px-3 py-2 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700"
            aria-label="Search products"
        />
    );
}
