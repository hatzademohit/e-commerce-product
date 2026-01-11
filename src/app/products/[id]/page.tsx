'use client';

import { Product } from '@/types/product';
import { useEffect, useState } from 'react';

interface ProductDetailsPageProps {
    params: {
        id: string;
    };
}

export default function ProductDetailsPage({
    params,
}: ProductDetailsPageProps) {
    const { id } = params;

    const [product, setProduct] = useState<Product | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/${id}`)
            .then(res => {
                if (!res.ok) throw new Error(`Status ${res.status}`);
                return res.json();
            })
            .then(data => {
                setProduct(data);
                setLoading(false);
            })
            .catch(() => {
                setError('Failed to load product');
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <div className="py-20 text-center text-gray-500">
                Loading product...
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="py-20 text-center">
                <h2 className="text-2xl font-bold text-red-500 mb-2">
                    Unable to load product
                </h2>
                <p className="text-gray-500">{error}</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex justify-center">
                <img
                    src={product.image}
                    alt={product.title}
                    className="max-h-96 object-contain"
                />
            </div>

            <div>
                <h1 className="text-2xl font-bold mb-2">{product.title}</h1>

                <p className="text-sm text-gray-500 mb-4">
                    {product.category}
                </p>

                <p className="mb-6">{product.description}</p>

                <p className="text-xl font-semibold">
                    ₹ {product.price}
                </p>

                <button className="mt-4 w-full bg-black text-white py-2 rounded hover:opacity-90 dark:bg-white dark:text-black">
                    Buy Now
                </button>
            </div>
        </div>
    );
}
