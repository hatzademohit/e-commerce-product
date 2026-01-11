import { API_BASE_URL } from '@/lib/api';
import { Product } from '@/types/product';

interface ProductDetailsPageProps {
    params: {
        id: string;
    };
}

async function getProduct(id: string): Promise<
    | { success: true; data: Product }
    | { success: false; error: string }
> {
    try {
        // const res = await fetch(`${API_BASE_URL}/products/${id}`, { /* because of not working in netlify */
        const res = await fetch('https://fakestoreapi.com/products/${id}', {
            cache: 'no-store',
        });

        if (!res.ok) {
            return {
                success: false,
                error: `Product not found (Status ${res.status})`,
            };
        }

        const data = await res.json();

        if (!data?.id) {
            return {
                success: false,
                error: 'Invalid product data received ',
            };
        }

        return {
            success: true,
            data,
        };
    } catch {
        return {
            success: false,
            error: 'Network error. Please try again later.',
        };
    }
}

export default async function ProductDetailsPage({
    params,
}: ProductDetailsPageProps) {

    const { id } = await params;
    const result = await getProduct(id);

    if (!result.success) {
        return (
            <div className="py-20 text-center">
                <h2 className="text-2xl font-bold text-red-500 mb-2">
                    Unable to load product
                </h2>
                <p className="text-gray-500">{result.error}</p>
            </div>
        );
    }

    const product = result.data;

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
                <h1 className="text-2xl font-bold mb-2">
                    {product.title}
                </h1>
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
