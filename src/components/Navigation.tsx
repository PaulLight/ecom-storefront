import Link from "next/link";
import LoginBtn from '@/components/LoginBtn'

export default function Navigation() {

    return (
        <nav style={{ padding: "1rem", borderBottom: "1px solid #ddd" }}>
            <Link href="/">Home</Link>
            {" | "}
            <Link href="/products">Catalog</Link>
            {" | "}
            <Link href="/cart">Cart</Link>
            {" | "}
            <LoginBtn />
        </nav>
    )
}