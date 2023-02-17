import { getAccessToken } from '../lib/spotify';
import { supabase } from '../supabase/supabase';
import { useUserState } from '../context/user';

import { View, Text } from 'react-native';
import React, { useEffect } from 'react';

type Props = {};

const Rooms = (props: Props) => {
    const u = useUserState();

    useEffect(() => {
        const addKey = async () => {
            const { data, error } = await supabase.from('Rooms').insert([
                {
                    current_access_token: u.accessToken,
                    current_users: 345,
                },
            ]);

            console.log(data);
        };

        addKey();
    }, []);

    return (
        <View>
            <Text style={{ color: 'white' }}>Rooms</Text>
        </View>
    );
};

export default Rooms;
