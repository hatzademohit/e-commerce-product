'use client';
import ProductGrid from '@/components/product/ProductGrid';
import { Product } from '@/types/product';
import { API_BASE_URL } from '@/lib/api';

type ProductsResult =
  | { success: true; data: Product[] }
  | { success: false; error: string };

async function getProducts(): Promise<ProductsResult> {
  try {
    // const res = await fetch(`${API_BASE_URL}/products`, {  /* because of not working in netlify */
    const res = await fetch('https://fakestoreapi.com/products', {
      cache: 'no-store',
    });

    if (!res.ok) {
      return {
        success: false,
        error: `Failed to fetch products (Status ${res.status})`,
      };
    }

    const data = await res.json();

    if (!Array.isArray(data)) {
      return {
        success: false,
        error: 'Invalid product data received',
      };
    }

    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      error: 'Network error. Please try again later.',
    };
  }
}

export default async function HomePage() {
  const result = await getProducts();

  if (!result.success) {
    return (
      <section className="text-center py-20">
        <h1 className="text-2xl font-bold text-red-500 mb-2">
          Something went wrong
        </h1>
        <p className="text-gray-500">{result.error}</p>
      </section>
    );
  }

  return (
    <section>
      <h1 className="text-2xl font-bold mb-6">Products</h1>
      <ProductGrid products={result.data} />
    </section>
  );
}

