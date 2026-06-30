"use client";

import { useLoginPage } from "@/hooks/useLoginPage";

export default function AdminLoginPage() {
    const {
        email,
        updateEmail,
        password,
        updatePassword,
        error,
        handleLogin,
        isPending
    } = useLoginPage();

    return (
        <form onSubmit={handleLogin} style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "300px" }}>
            <h1>Admin Login</h1>
            <input type="email" value={email} onChange={updateEmail} placeholder="Email" required />
            <input type="password" value={password} onChange={updatePassword} placeholder="Password" required />
             {error && <p style={{ color: "red" }}>{error}</p>}
             <button type="submit" disabled={isPending}>
                {isPending ? "Logging in..." : "Log In"}
            </button>
        </form>
    )
}