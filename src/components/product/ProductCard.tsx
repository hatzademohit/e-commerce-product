'use client';

import Link from 'next/link';
import { Product } from '@/types/product';
import FavoriteButton from './FavoriteButton';

export default function ProductCard({ product, addToCart, cartItems, removeFromCart }: { product: Product; addToCart: (item: any) => void; cartItems: any[]; removeFromCart: (id: number) => void; }) {
    const isInCart = cartItems.some((item) => item.id === product.id);

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-col">
            <Link href={`/products/${product.id}`}>
                <img
                    src={product.image}
                    alt={product.title}
                    className="h-40 w-full object-contain mb-4"
                />
                <h3 className="font-semibold line-clamp-2">
                    {product.title}
                </h3>
            </Link>
            <div className='mt-auto'>
                <p className="text-sm text-gray-500 capitalize">{product.category}</p>

                <div className="flex justify-between items-center my-2">
                    <span className="font-bold">₹ {product.price}</span>
                    <FavoriteButton productId={product.id} />
                </div>

                <button
                    onClick={() =>
                        isInCart
                            ? removeFromCart(product.id)
                            : addToCart(product)
                    }
                    className="mt-3 w-full bg-black text-white py-2 rounded hover:opacity-90"
                >
                    {isInCart ? 'Remove from Cart' : 'Add to Cart'}
                </button>
            </div>
        </div>
    );
}
