'use client';
import Link from 'next/link';
import DarkModeToggle from '@/components/ui/DarkModeToggle';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useEffect, useState } from 'react';

export default function Header() {
    const { cartCount } = useCart();

    return (
        <header className="bg-white dark:bg-gray-900 shadow border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-900 z-10">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link href="/" className="font-bold text-lg">
                    Product Explorer
                </Link>
                <div className='flex gap-4 items-center'>
                    <div className="relative inline-block">
                        <ShoppingCart className="w-6 h-6" />
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                            {cartCount}
                        </span>
                    </div>
                    <DarkModeToggle />
                </div>
            </div>
        </header>
    );
}
