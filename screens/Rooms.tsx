import { getAccessToken } from '../lib/spotify';
import { supabase } from '../supabase/supabase';
import { useUserState } from '../context/user';

import { View, Text, Button, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import Crypto from 'crypto';
import { TextInput } from 'react-native-gesture-handler';

type Room_Props = {};

const Rooms = (props: Room_Props) => {
    const u = useUserState();
    const [text, setText] = useState('Press to generate Room Code');
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
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'white',
                flexDirection: 'column',
            }}>
            <Text>Rooms</Text>
            <Text style={{ color: 'white' }}>Hi Max</Text>
            <TouchableOpacity
                style={{
                    backgroundColor: 'grey',
                    borderColor: 'black',
                    padding: 10,
                    borderRadius: 7,
                }}
                onPress={() => {
                    useEffect(() => {});
                }}>
                <Text>{text}</Text>
            </TouchableOpacity>
        </View>
    );
};

type Card_Props = {};

const Card = (props: Card_Props) => {
    return <View></View>;
};

export default Rooms;
