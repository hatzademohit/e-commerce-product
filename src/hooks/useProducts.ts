'use client';

import { useMemo, useState } from 'react';
import { Product } from '@/types/product';

export function useProducts(products: Product[]) {
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('all');

    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            const matchesSearch = product.title
                .toLowerCase()
                .includes(search.toLowerCase());

            const matchesCategory = category === 'all' || product.category === category;
            return matchesSearch && matchesCategory;
        });
    }, [products, search, category]);

    return {
        search,
        setSearch,
        category,
        setCategory,
        filteredProducts,
    };
}
