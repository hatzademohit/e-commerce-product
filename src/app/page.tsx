'use client';

import ProductGrid from '@/components/product/ProductGrid';
import { Product } from '@/types/product';
import { useEffect, useState } from 'react';
import { API_BASE_URL } from '@/lib/api';
import ScrollToTop from '@/components/ui/ScrollToTop';

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/products`)
      .then(res => {
        if (!res.ok) throw new Error(`Status ${res.status}`);
        return res.json();
      })
      .then(data => {
        if (!Array.isArray(data)) {
          throw new Error('Invalid data');
        }
        setProducts(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch products');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="text-center py-20 text-gray-500">
        Loading products...
      </section>
    );
  }

  if (error) {
    return (
      <section className="text-center py-20">
        <h1 className="text-2xl font-bold text-red-500 mb-2">
          Something went wrong
        </h1>
        <p className="text-gray-500">{error}</p>
      </section>
    );
  }

  return (
    <section>
      <h1 className="text-2xl font-bold mb-6">Products</h1>
      <ProductGrid products={products} />
      <ScrollToTop />
    </section>
  );
}
