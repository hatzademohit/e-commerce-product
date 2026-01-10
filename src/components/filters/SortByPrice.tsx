'use client';

interface SortByPriceProps {
    value: 'asc' | 'desc' | '';
    onChange: (value: 'asc' | 'desc' | '') => void;
}

export default function SortByPrice({ value, onChange }: SortByPriceProps) {
    return (
        <div className="flex items-center gap-2">
            <label
                htmlFor="sort-price"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
                Sort by price
            </label>

            <select
                id="sort-price"
                value={value}
                onChange={(e) =>
                    onChange(e.target.value as 'asc' | 'desc' | '')
                }
                className="border rounded px-3 py-1 text-sm
                   bg-white dark:bg-gray-800
                   text-gray-900 dark:text-gray-100
                   border-gray-300 dark:border-gray-700
                   focus:outline-none focus:ring-2 focus:ring-black"
            >
                <option value="">None</option>
                <option value="asc">Low → High</option>
                <option value="desc">High → Low</option>
            </select>
        </div>
    );
}
