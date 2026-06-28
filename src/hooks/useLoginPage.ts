'use client'

import { supabase } from '@/lib/supabase';
import { useRouter } from "next/navigation";
import { useState } from 'react'

export function useLoginPage() {
    const [password, setPassword] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleLogin = async (e: React.SubmitEvent) => {
        e.preventDefault();
        const { error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            setError(error.message);
        }

        router.push("/admin");
    }

    const updateEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const updatePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    return {
        email,
        updateEmail,
        password,
        updatePassword,
        error,
        handleLogin
    }
}