'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type CartItem = any;

interface CartContextType {
    cartItems: CartItem[];
    cartCount: number;
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: number) => void;
    favorites: number[];
    toggleFavorite: (id: number) => void;
    isFavorite: (id: number) => boolean;
}

const STORAGE_KEY = 'favorites';

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [favorites, setFavorites] = useState<number[]>([]);

    // Load once
    useEffect(() => {
        try {
            const stored = localStorage.getItem('cart');
            setCartItems(stored ? JSON.parse(stored) : []);
        } catch {
            setCartItems([]);
        }
    }, []);

    const addToCart = (item: CartItem) => {
        setCartItems((prev) => {
            const updated = [...prev, item];
            localStorage.setItem('cart', JSON.stringify(updated));
            return updated;
        });
    };

    const removeFromCart = (id: number) => {
        setCartItems((prev) => {
            const updated = prev.filter((i) => i.id !== id);
            localStorage.setItem('cart', JSON.stringify(updated));
            return updated;
        });
    };

    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (!stored) return;

            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed)) {
                setFavorites(parsed.filter((id) => typeof id === 'number'));
            }
        } catch {
            setFavorites([]);
        }
    }, []);

    // Sync across tabs
    useEffect(() => {
        const handler = (e: StorageEvent) => {
            if (e.key === STORAGE_KEY && e.newValue) {
                try {
                    const parsed = JSON.parse(e.newValue);
                    if (Array.isArray(parsed)) {
                        setFavorites(parsed);
                    }
                } catch { }
            }
        };

        window.addEventListener('storage', handler);
        return () => window.removeEventListener('storage', handler);
    }, []);

    const toggleFavorite = (id: number) => {
        setFavorites((prev) => {
            const updated = prev.includes(id)
                ? prev.filter((f) => f !== id)
                : [...prev, id];

            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            return updated;
        });
    };

    const isFavorite = (id: number) => favorites.includes(id);

    return (
        <CartContext.Provider
            value={{
                cartItems,
                cartCount: cartItems.length,
                addToCart,
                removeFromCart,
                favorites,
                toggleFavorite,
                isFavorite,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) {
        throw new Error('useCart must be used inside CartProvider');
    }
    return ctx;
}
