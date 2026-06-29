import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import type { Order } from '@/types/order';
import { useQuery } from '@tanstack/react-query';

async function fetchOrders(): Promise<Order[]> {
    const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

export function useAdminPage() {
    const [checking, setChecking] = useState<boolean>(true);
    const router = useRouter();

    const {
        data: orders,
        isLoading,
        error,
        refetch,
    } = useQuery({
        queryKey: ['orders'],
        queryFn: fetchOrders,
        enabled: !checking,
    });

    const safeOrders = orders ?? [];

    useEffect(
        function redirectAfterLoggIn() {
            supabase.auth.getSession().then(({ data }) => {
                if (!data.session) {
                    router.push("/admin/login");
                } else {
                    setChecking(false);
                }
            });
    }, [router])

    const totalValue = safeOrders.reduce((sum, order) => sum + order.total, 0);
    const totalOrders = safeOrders.length;

    return {
        orders: safeOrders,
        error,
        refetch,
        isLoading,
        checking,
        totalValue,
        totalOrders
    }
}