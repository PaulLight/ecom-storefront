'use client'

import { supabase } from '@/lib/supabase';
import { useRouter } from "next/navigation";
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

const loginWithPassword = async ({ email, password }: { email: string; password: string }) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
        throw new Error(error.message);
    }
}

export function useLoginPage() {
    const [password, setPassword] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: loginWithPassword,
        onSuccess: () => {
            router.push("/admin");
        }
    });

    const handleLogin = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutation.mutate({ email, password });
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
        error: mutation.error?.message ?? null,
        handleLogin,
        isPending: mutation.isPending,
    }
}