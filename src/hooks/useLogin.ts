import { supabase } from '@/lib/supabase';
import { useState, useEffect } from 'react'

export function useLogin() {
    const [logged, setLogged] = useState(false);

    useEffect(
        function setLogginStatus() {
            supabase.auth.getSession().then(({ data: { session } }) => {
                setLogged(!!session)
            });
        
            const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
                const eventLogged = event === 'SIGNED_IN' && session;
                const eventLoggedOut = event === 'SIGNED_OUT' || !session;

                if (eventLoggedOut) {
                    setLogged(false)
                } else if (eventLogged) {
                    setLogged(true)
                }
            });
        
            return () => subscription.unsubscribe();
    }, []);

    return {
        logged
    }
}