"use client";

import { usePresence } from '@/hooks/usePresence'

export default function OnlineUsersCount() {
    const count = usePresence('global-store');

    return (
        <span>{count} {count === 1? 'Person' : 'People'}</span>
    )
}