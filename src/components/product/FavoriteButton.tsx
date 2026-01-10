'use client';

import { useCart } from "@/context/CartContext";

interface FavoriteButtonProps {
    productId: number;
}

export default function FavoriteButton({
    productId,
}: FavoriteButtonProps) {
    const { favorites, toggleFavorite } = useCart();
    const isFavorite = favorites.includes(productId);

    return (
        <button
            aria-label="Toggle favorite"
            onClick={() => toggleFavorite(productId)}
            className="text-xl"
        >
            {isFavorite ? '❤️' : '🤍'}
        </button>
    );
}
