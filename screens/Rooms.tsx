import { getAccessToken } from '../lib/spotify';
import { supabase } from '../supabase/supabase';
import { useUserState } from '../context/user';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
    View,
    Text,
    Button,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Image,
    FlatList,
    Modal,
    NativeSyntheticEvent,
    TextInputKeyPressEventData,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import { setStatusBarBackgroundColor } from 'expo-status-bar';
import { call } from 'react-native-reanimated';

type Room_Props = {};

const Rooms = (props: Room_Props) => {
    const u = useUserState();
    const [text, setText] = useState('+');
    const [roomName, setName] = useState('');
    const [numRooms, setNumRooms] = useState(0);
    const [createModalVisible, setCreateModalVisible] = useState(false);
    const [joinedModalVisible, setJoinedModalVisible] = useState(false);
    const [joinCode, setJoinCode] = useState("")
    const [userJoinCode, setUserJoinCode] = useState("")
    useEffect(() => {
        const addKey = async () => {
            const { data, error } = await supabase.from('Rooms').insert([
                {
                    current_access_token: u.accessToken,
                    current_users: 345,
                },
            ]);
        }
    })
    const callApi = async () => {
        setText('loading...');
        try {
            const response = await fetch('https://mapify-server.fly.dev/createCode', {
                method: 'POST',
            });
            const json = await response.json();
            console.log(json.code, json.value);
            // setText(json.code);
        } catch (error) {
            console.error(error);
        }
    };

    const createRoom = async () => {
        const roomName = text;
        const refreshToken = await AsyncStorage.getItem('@spotify_refresh_token');
        try {
            console.log(roomName, refreshToken)
            const response = await fetch('https://mapify-server.fly.dev/createCode', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ room_name: roomName, refresh_token: refreshToken }),
            });
            const json = await response.json();
            setJoinCode(json.code);
        } catch (error) {
            console.error(error);
        }
        //setCreateModalVisible(!createModalVisible)
    };

    const joinRoom = async() => {
        console.log(userJoinCode)
        try {
            const response = await fetch('https://mapify-server.fly.dev/roomCode', {
                method: 'POST',
                body: JSON.stringify({ code: userJoinCode }),
            })
            const json = await JSON.stringify(response)
            console.log(json)
        } catch (error){
            console.error(error)
        }
    }

    useEffect(() => {
        console.log(text);
    }, [text]);

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
                <View
                    style={{display: 'flex', flexDirection: "row", justifyContent: "space-between", width: Dimensions.get('window').width * .85}}
                >
                    <TextInput 
                        onChangeText={setUserJoinCode}
                        value={userJoinCode}
                        style={{paddingLeft: 25, backgroundColor: 'white', borderRadius: 10, 
                                width: Dimensions.get('window').width * .7, height: Dimensions.get('window').width * .10,
                                fontSize: 20}}
                    >
                    </TextInput>
                    <TouchableOpacity
                        onPress={joinRoom}
                        style={{backgroundColor: "white", borderRadius: 10, width: Dimensions.get('window').width * .125, justifyContent: "center"}}
                    >
                        <Text style={{fontSize: 20, textAlign: "center"}}>
                            Join
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={{height: 3 * Dimensions.get('window').height * .2 + 60, overflow: "hidden"}}>
                    <FlatList 
                        data={[<Card></Card>, <Card></Card>, <Card></Card>, <Card></Card>]}
                        renderItem={({ item }) => item}
                    />
                </View>
                <Modal
                    visible={createModalVisible}
                    animationType="slide"
                    onRequestClose={() => {
                        setCreateModalVisible(!createModalVisible);
                    }}
                    transparent={false}>
                    <View
                        style={{
                            paddingTop: 70,
                            alignContent: 'center',
                            backgroundColor: '#08080A',
                            height: Dimensions.get('window').height,
                            paddingLeft: 15,
                        }}>
                        <TouchableOpacity
                            style={{
                                padding: 10,
                                borderRadius: 7,
                            }}
                            onPress={() => {
                                setCreateModalVisible(!createModalVisible);
                            }}>
                            <Text style={{ color: 'white', fontSize: 30 }}>{'<'}</Text>
                        </TouchableOpacity>
                        <Text style={{ color: 'white', fontSize: 30, paddingLeft: 20 }}>
                            Create a Room
                        </Text>
                        <TextInput
                            style={{paddingLeft: 25, backgroundColor: 'white', borderRadius: 10, 
                            width: Dimensions.get('window').width * .9, height: Dimensions.get('window').width * .10,
                            fontSize: 20}}
                            onChangeText={setText}
                        />
                        <View style={{ alignItems: 'center',height: Dimensions.get('window').height * .80, position: 'relative' }}>
                            <TouchableOpacity
                                style={{
                                    padding: 10,
                                    borderRadius: 10,
                                    width: (Dimensions.get('window').width * 1) / 2,
                                    backgroundColor: 'white',
                                    position: 'absolute',
                                    bottom: 50,
                                }}
                                onPress={createRoom}>
                                <Text
                                    style={{ color: '#08080A', fontSize: 20, textAlign: 'center' }}>
                                    Create
                                </Text>
                            </TouchableOpacity>
                            <Text style={{ color: 'white' }}>Your code is {joinCode}</Text>
                        </View>
                    </View>
                </Modal>
                <TouchableOpacity
                    style={{
                        backgroundColor: 'grey',
                        borderColor: 'black',
                        padding: 10,
                        borderRadius: 7,
                    }}
                    onPress={() => {
                        setCreateModalVisible(!createModalVisible);
                    }}>
                    <Text></Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

type Card_Props = {};

const Card = (props: Card_Props) => {
    // This is placeholder name; will pass in props for the name at later point
    const name = 'Room name';
    const icon = require('../assets/favicon.png');
    const song_name_temp = 'Die For You';
    return (
        <View style={{ paddingVertical: 10 }}>
            <View style={styles.roomCard}>
                <View>
                    <Text style={styles.title}>{name}</Text>
                    <Text style={styles.subheading}>User-name</Text>
                </View>
                <View>
                    <Image source={icon} />
                    <View>
                        <Text style={{ color: 'white' }}>Currently Playing</Text>
                        <Text style={{ color: 'white' }}>{song_name_temp}</Text>
                    </View>
                    <View>
                        <Text style={{ color: 'white' }}>temp tag holder</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    roomCard: {
        backgroundColor: '#1D1E24',
        width: Dimensions.get('window').width * 0.9,
        height: Dimensions.get('window').height * 0.2,
        borderRadius: 20,
        padding: 25,
    },
    title: {
        fontFamily: 'Arial',
        fontSize: 25,
        color: 'white',
    },
    subheading: {
        fontFamily: 'Arial',
        fontSize: 17,
        color: 'white',
    },
    tags: {
        flexDirection: 'row',
    },
});
export default Rooms
