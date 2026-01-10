'use client';

import { Product } from '@/types/product';
import ProductCard from './ProductCard';
import { useProducts } from '@/hooks/useProducts';
import { SearchBar, CategoryFilter } from '@/components/filters';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';

interface ProductGridProps {
    products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
    const [productList, setProductList] = useState(products);
    const categories = Array.from(
        new Set(products.map((p) => p.category))
    );
    const { addToCart, cartItems, removeFromCart, favorites } = useCart();

    const {
        search,
        setSearch,
        category,
        setCategory,
        filteredProducts,
    } = useProducts(products);

    const showFavoritesItem = () => {
        let favoriteIds: number[] = [];
        try {
            if (Array.isArray(favorites)) {
                favoriteIds = favorites.filter((id) => typeof id === 'number');
            }
        } catch {
            favoriteIds = [];
        }
        const filtered = filteredProducts.filter((product) =>
            favoriteIds.includes(Number(product.id))
        );
        setProductList(filtered);
        return filtered;
    };

    const clearFilters = () => {
        setSearch('');
        setCategory('all');
        setProductList(products);
    }

    return (
        <>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <SearchBar value={search} onChange={setSearch} />
                <CategoryFilter
                    categories={categories}
                    value={category}
                    onChange={setCategory}
                />
                <div className='flex gap-4'>
                    <button onClick={showFavoritesItem} className="border rounded px-4 py-2 bg-white dark:bg-gray-800  dark:border-gray-700 rounded  md:w-auto w-full">Favorites Item</button>
                    <button onClick={clearFilters} className="border rounded px-4 py-2 bg-white dark:bg-gray-800  dark:border-gray-700 rounded md:w-auto w-full">Clear Filter</button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.filter(product => productList.map((p) => p.id).includes(product.id)).map((product) => (
                    <ProductCard key={product.id} product={product} addToCart={addToCart} cartItems={cartItems} removeFromCart={removeFromCart} />
                ))}
            </div>
        </>
    );
}
