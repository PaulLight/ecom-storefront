'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function AdminPage() {
    const [checking, setChecking] = useState<boolean>(true);
    const router = useRouter();

    useEffect(function redirectAfterLoggIn() {
        supabase.auth.getSession().then(({ data }) => {
            if (!data.session) {
              router.push("/admin/login");
            } else {
              setChecking(false);
            }
          });
    }, [router])

    if(checking) {
        return <p>Checking authentication...</p>;
    }

    return (
        <div style={{ padding: "2rem" }}><h1>Admin Dashboard</h1></div>
    )
}