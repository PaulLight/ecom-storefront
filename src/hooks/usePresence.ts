'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase';

export function usePresence(roomName: string) {
    const [onlineCount, setOnlineCount] = useState<number>(0);

    useEffect(function setOnlineUsers() {
        const channel = supabase.channel(roomName, {
            config: {
                presence: {
                    key: Math.random().toString(36).slice(2)
                }
            }
        })

        channel
            .on('presence', { event: 'sync'}, () => {
                const state = channel.presenceState();
                setOnlineCount(Object.keys(state).length);
            })
            .subscribe(async (status) => {
                if (status === 'SUBSCRIBED') {
                    await channel.track({ 
                        online_at: new Date().toISOString() 
                    });
                }
            })

        return () => {
            supabase.removeChannel(channel);
        };
    }, [roomName])

    return onlineCount;
}
