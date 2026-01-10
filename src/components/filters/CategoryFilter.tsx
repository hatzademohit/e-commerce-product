'use client';

interface CategoryFilterProps {
    categories: string[];
    value: string;
    onChange: (value: string) => void;
}

export default function CategoryFilter({
    categories,
    value,
    onChange,
}: CategoryFilterProps) {
    return (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="border rounded px-3 py-2 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700"
            aria-label="Filter by category"
        >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
                <option key={cat} value={cat}>
                    {cat}
                </option>
            ))}
        </select>
    );
}
