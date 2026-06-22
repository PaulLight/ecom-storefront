import Link from "next/link";

export default function Home() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Welcome to the Store</h1>
      <p>Browse our products in the catalog.</p>
      <Link href="/products">Shop Now →</Link>
    </div>
  );
}
