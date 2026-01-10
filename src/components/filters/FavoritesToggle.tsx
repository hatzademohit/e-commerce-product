'use client';

interface FavoritesToggleProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
}

export default function FavoritesToggle({
    checked,
    onChange,
}: FavoritesToggleProps) {
    return (
        <button
            type="button"
            onClick={() => onChange(!checked)}
            aria-pressed={checked}
            className={`flex items-center gap-2 px-3 py-1 rounded border text-sm
        transition
        ${checked
                    ? 'bg-black text-white border-black'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700'
                }
      `}
        >
            <span>{checked ? '❤️' : '🤍'}</span>
            <span>Favorites</span>
        </button>
    );
}
