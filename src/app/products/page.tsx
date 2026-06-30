import type { Product } from '@/types/products'
import { notFound } from "next/navigation";
import { supabase } from '@/lib/supabase';
import Link from "next/link";

async function getProducts(): Promise<Product[]> {
    const { data, error } = await supabase
        .from('products')
        .select('*');

    if (error) {
        console.error('Failed to fetch products:', error.message);
        notFound();
    }

    return data;
}

export default async function Products() {
    const products = await getProducts() || [];

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
                            <p>Rating: {product.rating_rate} ({product.rating_count} reviews)</p>
                        </div>
                    )
                })
            }
        </div>
    )
}
