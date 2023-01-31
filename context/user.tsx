import AsyncStorage from '@react-native-async-storage/async-storage';
import { Session } from '@supabase/supabase-js';
import { createContext, FC, ReactNode, useContext, useEffect, useState } from 'react';
import { useAuthState } from '../hooks/useAuthState';
import { getAccessToken } from '../lib/spotify';

interface UserState {
    session?: {
        data: Session | undefined;
        set: (sessionStr: string) => void;
    };
    refreshToken: {
        spotify: string;
    };
    accessToken: {
        spotify: string;
    };
}

interface UserWrapper {
    children?: ReactNode;
}

const UserState = createContext<UserState>({refreshToken: {spotify: ''}, accessToken: {spotify: ''}});

export const useUserState = () => {
    return useContext(UserState);
};

const UserWrapper: FC<UserWrapper> = ({ children }) => {
    const [session, setSession] = useState<Session>();
    const [loading, setLoading] = useState<boolean>(true);
    const [refreshToken, setRefreshToken] = useState<string>('');
    const [accessToken, setAccessToken] = useState<string>('');
    const authState = useAuthState();

    async function getSpotifyRefreshToken() {
        setLoading(true);
        try {
            const data = await AsyncStorage.getItem('@spotify_refresh_token');
            if (data !== null) {
                setRefreshToken(data);
                try {
                    const { access_token: first_token } = await getAccessToken(data);
                    setAccessToken(accessToken); 
                    setInterval(async () => {
                        const { access_token: repeat_token } = await getAccessToken(data);
                        setAccessToken(accessToken)
                    }, 900000)
                }
                catch (e) {
                    alert('Failed to get get access token');
                }

            }
        } catch (e) {
            alert('Failed to get refresh token');
        }
        setLoading(false);
    }

    useEffect(() => {
        getSpotifyRefreshToken();
    }, [authState]);

    const updateSession = (sessionStr: string) => {
        setSession(JSON.parse(sessionStr));
    };

    return (
        <>
            <UserState.Provider
                value={{
                    session: {
                        data: session,
                        set: updateSession,
                    },
                    refreshToken: {
                        spotify: refreshToken,
                    },
                    accessToken: {
                        spotify: accessToken,
                    },
                }}>
                {children}
            </UserState.Provider>
        </>
    );
};

export default UserWrapper;
