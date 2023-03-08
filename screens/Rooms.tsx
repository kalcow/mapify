import { getAccessToken } from '../lib/spotify';
import { supabase } from '../supabase/supabase';
import { useUserState } from '../context/user';

import { View, Text, Button, TouchableOpacity, StyleSheet, Dimensions, Image, FlatList} from 'react-native';
import React, { useEffect, useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import { call } from 'react-native-reanimated';

type Room_Props = {};

const Rooms = (props: Room_Props) => {
    const u = useUserState();
    const [text, setText] = useState('+');
    const [numRooms, setNumRooms] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [joinCode, setJoinCode] = useState("Enter Room Code")
    useEffect(() => {
        const addKey = async () => {
            const { data, error } = await supabase.from('Rooms').insert([
                {
                    current_access_token: u.accessToken,
                    current_users: 345,
                },
            ]);

    const callApi = async () => {
        setText('loading...');
        try {
            const response = await fetch('http://localhost:8080/createCode', {
                method: 'POST',
            });
            const json = await response.json();
            console.log(json.code, json.value);
            setText(json.code);
        } catch (error) {
            console.error(error);
        }
    };

    // useEffect(() => {
    //     const addKey = async () => {
    //         const { data, error } = await supabase.from('Rooms').insert([
    //             {
    //                 current_access_token: u.accessToken,
    //                 current_users: 345,
    //             },
    //         ]);

    //         console.log(data);
    //     };

    //     addKey();
    // }, []);

    return (
        <View
            style={{
                flex: 1,
                paddingTop: 70,
                backgroundColor: '#08080A',
                flexDirection: 'column',
            }}>
            <Text style={{color: 'white', fontSize: 30, alignItems: 'baseline', paddingLeft: 25}}>Rooms</Text>
            <View style={{alignItems: 'center',}}>
                <TextInput 
                    onChangeText={setJoinCode}></TextInput>
                <View style={{height: 3 * Dimensions.get('window').height * .2 + 60, overflow: "hidden"}}>
                    <FlatList 
                        data={[<Card></Card>, <Card></Card>, <Card></Card>, <Card></Card>]}
                        renderItem={({item}) => item}
                    />
                </View>
                <TouchableOpacity
                    style={{
                        backgroundColor: 'grey',
                        borderColor: 'black',
                        padding: 10,
                        borderRadius: 7,
                    }}
                    onPress={() => {
                        setModalVisible(true);
                    }}>
                    <Text>{text}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

type Card_Props = {};

const Card = (props: Card_Props) => {
    // This is placeholder name; will pass in props for the name at later point
    const name = "Room name";
    const icon = require('../assets/favicon.png')
    const song_name_temp = "Die For You"
    return( 
        <View style={{paddingVertical: 10}}>
            <View style={styles.roomCard}>
                <View>
                    <Text style={styles.title}>{name}</Text>
                    <Text style={styles.subheading}>User-name</Text>
                </View>
                <View>
                    <Image source={icon}/>
                    <View>
                        <Text style={{color: "white"}}>Currently Playing</Text>
                        <Text style={{color: "white"}}>{song_name_temp}</Text>
                    </View>
                    <View>
                        <Text style={{color: "white"}}>
                            temp tag holder
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    roomCard: {
        backgroundColor: "#1D1E24",
        width:  Dimensions.get('window').width * .9,
        height: Dimensions.get('window').height * .2,
        borderRadius: 20,
        padding: 25,
    },
    title: {
        fontFamily: "Arial",
        fontSize: 25,
        color: "white",
    },
    subheading: {
        fontFamily: "Arial",
        fontSize: 17,
        color: "white"
    },
    tags: {
        flexDirection: 'row',
    }
})
export default Rooms;
