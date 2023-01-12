import { AuthChangeEvent } from '@supabase/supabase-js';
import { useState, useEffect } from 'react';
import { supabase } from '../supabase/supabase';

export function useAuthState() {
    const [authState, setAuthState] = useState<AuthChangeEvent>();

    useEffect(() => {
        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            setAuthState(event);
        });

        return () => {
            authListener?.subscription?.unsubscribe();
        };
    }, []);

    return authState; 
}
