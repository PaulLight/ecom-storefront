import type { Product } from '@/types/products'
import { notFound } from "next/navigation";
import Link from "next/link";

export const dynamic = 'force-dynamic';

async function getProducts(): Promise<Product[]> {
    const response = await fetch(`https://fakestoreapi.com/products`);

    if (!response.ok) {
        notFound();
    }

    const text = await response.text();

    if (!text) {
        notFound();
    }

    const products = JSON.parse(text);

    if (!products) {
        notFound();
    }

    return products;
}

export default async function Products() {
    const products = await getProducts();

    return (
        <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {
                products.map((product) => {
                    return (
                        <div className='relative' key={product.id} style={{ padding: "2rem" }}>
                            <Link className='absolute w-full h-full' href={`/products/${product.id}`}>
                                <span className="sr-only">View {product.title}</span>
                            </Link>
                            <img src={product.image} alt={product.title} width={150} height={150} />
                            <p>{product.title}</p>
                            <p>${product.price}</p>
                            <p className='truncate'>{product.description}</p>
                            <p>Category: {product.category}</p>
                            <p>Rating: {product.rating.rate} ({product.rating.count} reviews)</p>
                        </div>
                    )
                })
            }
        </div>
    )
}
