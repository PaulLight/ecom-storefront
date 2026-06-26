import type { Product } from '@/types/products'
import { notFound } from "next/navigation";
import Link from "next/link";
import AddToCartButton from '@/components/AddToCartButton'

interface ProductPageProps {
    params: Promise<{ id: string}>
}

async function getProduct(id: string): Promise<Product> {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);

    if (!response.ok) {
        notFound();
    }

    const text = await response.text();

    if (!text) {
        notFound();
    }

    const product = JSON.parse(text);

    if (!product) {
        notFound();
    }

    return product;
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
                <p>Rating: {product.rating.rate} ({product.rating.count} reviews)</p>
                <AddToCartButton product={product} />
            </div>
        </div>
    )
}
