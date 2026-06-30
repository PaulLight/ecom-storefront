'use client'

import Link from "next/link";
import { useLogin } from '@/hooks/useLogin'

export default function LoginBtn() {
    const { logged } = useLogin();

    return logged 
        ? (<Link href="/admin">Dashboard</Link>) 
        : (<Link href="/admin/login">Login</Link>) 
}