import type { Product } from '@/types/products'
import { notFound } from "next/navigation";
import Link from "next/link";
import { supabase } from '@/lib/supabase';
import AddToCartButton from '@/components/AddToCartButton'

interface ProductPageProps {
    params: Promise<{ id: string}>
}

async function getProduct(id: string): Promise<Product> {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Failed to fetch product:', error.message);
        notFound();
    }

    return data;
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { id } = await params;
    const product = await getProduct(id);

    return (
        <div>
            <nav style={{ marginBottom: "1rem", fontSize: "0.9rem", color: "#666" }}>
                <Link href="/">Home</Link> {" / "}
                <Link href="/products">Products</Link> {" / "}
                <span>{product.title}</span>
            </nav>
            <div style={{ padding: "2rem" }}>
                <img src={product.image} alt={product.title} width={200} />
                <p>${product.price}</p>
                <p>{product.description}</p>
                <p>Category: {product.category}</p>
                <p>Rating: {product.rating_rate} ({product.rating_count} reviews)</p>
                <AddToCartButton product={product} />
            </div> 
        </div>
    )
}
