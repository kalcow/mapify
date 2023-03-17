import { getAccessToken } from '../lib/spotify';
import { supabase } from '../supabase/supabase';
import { useUserState } from '../context/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Satoshi from '../constants/Satoshi';

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
    const [roomName, setRoomName] = useState('');
    const [numRooms, setNumRooms] = useState(0);
    const [createModalVisible, setCreateModalVisible] = useState(false);
    const [joinedModalVisible, setJoinedModalVisible] = useState(false);
    const [joinCode, setJoinCode] = useState('');
    const [userJoinCode, setUserJoinCode] = useState('');
    const [roomToken, setToken] = useState();
    useEffect(() => {
        const addKey = async () => {
            const { data, error } = await supabase.from('Rooms').insert([
                {
                    current_access_token: u.accessToken,
                    current_users: 345,
                },
            ]);
        };
    });
    const callApi = async () => {
        setText('loading...');
        try {
            const response = await fetch('http://localhost:8080/createCode', {
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
            console.log(roomName, refreshToken);
            const response = await fetch('http://localhost:8080/createCode', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ room_name: roomName, refresh_token: refreshToken }),
            });
            const json = await response.json();
            console.log('hi')
            setJoinCode(json.code);
            setRoomName(text)
            setCreateModalVisible(!createModalVisible)
            setJoinedModalVisible(!joinedModalVisible)
        } catch (error) {
            console.error(error);
        }
    };

    const joinRoom = async () => {
        if (userJoinCode != ''){
            const jsoncode = { code: userJoinCode };
            try {
                const response = await fetch('http://localhost:8080/roomCode', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(jsoncode),
                });
                const json = await response.json();
                console.log(json[0].code, json[0].current_access_token.access_token);
                setToken(json[0].current_access_token.access_token);
                setRoomName(json[0].room_name)
                setJoinCode(userJoinCode)
                setJoinedModalVisible(!joinedModalVisible)
            } catch (error) {
                console.error(error);
            }
        }
    };

    const rickRoll = async () => {
        const body = { access_token: roomToken, uri: 'spotify:track:4cOdK2wGLETKBW3PvgPWqT' };
        try {
            console.log(roomToken, 'WE HERE');
            const response = await fetch('http://localhost:8080/track', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        console.log(text);
    }, [text]);

    return (
        <View
            style={{
                flex: 1,
                paddingTop: 70,
                paddingLeft: Dimensions.get('window').width * 0.05,
                backgroundColor: '#1D1E24',
                flexDirection: 'column',
                // position: 'absolute',
            }}>
            <Satoshi.Regular
                style={{
                    color: 'white',
                    fontSize: 30,
                    alignItems: 'baseline',
                    paddingLeft: 25,
                    marginBottom: 10,
                }}>
                Rooms
            </Satoshi.Regular>
            <View style={{ alignItems: 'center' }}>
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: Dimensions.get('window').width * 0.85,
                        marginRight: 20,
                        marginBottom: 10,
                    }}>
                    <TextInput
                        onChangeText={setUserJoinCode}
                        value={userJoinCode}
                        style={{
                            paddingLeft: 25,
                            backgroundColor: 'white',
                            borderRadius: 10,
                            width: Dimensions.get('window').width * 0.65,
                            height: Dimensions.get('window').width * 0.1,
                            fontSize: 20,
                        }}></TextInput>
                    <View style={{ flexDirection: 'column' }}>
                        <TouchableOpacity
                            onPress={joinRoom}
                            style={{
                                backgroundColor: 'white',
                                borderRadius: 10,
                                width: Dimensions.get('window').width * 0.15,
                                height: Dimensions.get('window').height * 0.045,
                                justifyContent: 'center',
                            }}>
                            <Satoshi.Regular style={{ fontSize: 20, textAlign: 'center' }}>
                                Join
                            </Satoshi.Regular>
                        </TouchableOpacity>
                        {/* <TouchableOpacity
                            style={{ borderWidth: 1, borderColor: 'white', borderRadius: 20 }}
                            onPress={rickRoll}>
                            <Text style={{ color: 'white' }}>RICKROLL</Text>
                        </TouchableOpacity> */}
                    </View>
                </View>
                <View
                    style={{
                        height: 3 * Dimensions.get('window').height * 0.2 + 60,
                        paddingRight: 25,
                        overflow: 'hidden',
                        zIndex: 1,
                    }}>
                    <FlatList
                        data={[
                            <Card
                                room_name="Our First Room!"
                                icon="https://upload.wikimedia.org/wikipedia/en/a/a0/Blonde_-_Frank_Ocean.jpeg"
                                song_name="Pink + White"></Card>,
                            <Card
                                room_name="Night Drives"
                                icon="https://i.scdn.co/image/ab67616d0000b273382514f0114ba8f4a16d5db4"
                                song_name="Boom Boom Pow"></Card>,
                            <Card
                                room_name="Study Time"
                                icon="https://storage.halidonmusic.com/images/classica%20digitale%20(3)_260520_113110.jpg"
                                song_name="Fantasie-impromptu"></Card>,
                            <Card
                                room_name="My Jamz"
                                icon="https://images.genius.com/60ce32e0db63d318bb978d5c5cd4678f.1000x1000x1.png"
                                song_name="2 soon"></Card>,
                        ]}
                        renderItem={({ item }) => item}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
                <TouchableOpacity
                    style={{
                        backgroundColor: 'white',
                        borderColor: 'black',
                        padding: 10,
                        borderRadius: 100,
                        zIndex: 2,
                        position: 'relative',
                        width: 60,
                        height: 60,
                        bottom: Dimensions.get('window').height * 0.1,
                        left: Dimensions.get('window').width * 0.35,
                    }}
                    onPress={() => {
                        setCreateModalVisible(!createModalVisible);
                    }}>
                    <Satoshi.Regular style={{ fontSize: 25, textAlign: 'center', paddingTop: 3 }}>
                        +
                    </Satoshi.Regular>
                </TouchableOpacity>

                <Modal
                    visible={createModalVisible}
                    animationType="slide"
                    onRequestClose={() => {
                        setCreateModalVisible(!createModalVisible);
                    }}
                    transparent={false}
                >
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
                            <Satoshi.Regular style={{ color: 'white', fontSize: 30 }}>
                                {'<'}
                            </Satoshi.Regular>
                        </TouchableOpacity>
                        <Satoshi.Regular style={{ color: 'white', fontSize: 30, paddingLeft: 20 }}>
                            Create a Room
                        </Satoshi.Regular>
                        <TextInput
                            style={{
                                paddingLeft: 25,
                                backgroundColor: 'white',
                                borderRadius: 10,
                                width: Dimensions.get('window').width * 0.9,
                                height: Dimensions.get('window').width * 0.1,
                                fontSize: 20,
                            }}
                            onChangeText={setText}
                        />
                        <View
                            style={{
                                alignItems: 'center',
                                height: Dimensions.get('window').height * 0.8,
                                position: 'relative',
                            }}>
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
                                <Satoshi.Regular
                                    style={{ color: '#08080A', fontSize: 20, textAlign: 'center' }}>
                                    Create
                                </Satoshi.Regular>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <Modal
                    visible={joinedModalVisible}
                    animationType='slide'
                    onRequestClose={() => setJoinedModalVisible(!joinedModalVisible)}
                    transparent={false}
                >
                    <View
                        style={{
                            paddingTop: 70,
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
                                setJoinedModalVisible(!joinedModalVisible);
                            }}>
                            <Text style={{ color: 'white', fontSize: 30 }}>{'<'}</Text>
                        </TouchableOpacity>
                        <View style={{alignItems: 'center', height: Dimensions.get('window').height * .8}}>
                            <View style={{alignItems: 'center', paddingBottom: 25}}>
                                <Text style={{color: 'white', fontSize: 30}}>{roomName}</Text>
                                <Text style={{ color: 'white' }}>{joinCode}</Text>
                            </View>
                            <Image style={{width: 300, height: 300, borderColor: '#FF800A', borderRadius: 20, borderWidth: 5}} source={{
                                        uri: 'https://cdn.vox-cdn.com/thumbor/WR9hE8wvdM4hfHysXitls9_bCZI=/0x0:1192x795/1400x1400/filters:focal(596x398:597x399)/cdn.vox-cdn.com/uploads/chorus_asset/file/22312759/rickroll_4k.jpg'
                                    }}
                            ></Image>
                            <TouchableOpacity style={{borderWidth: 2, width: Dimensions.get('window').width * .8, borderColor: 'white', borderRadius: 20, top: Dimensions.get('window').height *.02, alignItems: 'center'}}onPress={rickRoll}>
                                <Text style={{ color: 'white', fontSize: 30, fontStyle: 'italic'}}>RICKROLL</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        </View>
    );
};

type Card_Props = { room_name: string; icon: string; song_name: string };

const Card = (props: Card_Props) => {
    // This is placeholder name; will pass in props for the name at later point
    const name = props.room_name;
    const song_name_temp = props.song_name;
    const userphoto = require('../assets/users.png');
    return (
        <View style={{ paddingVertical: 5 }}>
            <View style={styles.roomCard}>
                <Image
                    source={userphoto}
                    style={{
                        width: 110,
                        height: 50,
                        position: 'absolute',
                        right: 20,
                        top: 10,
                    }}></Image>
                <View>
                    <Satoshi.Medium style={styles.title}>{name}</Satoshi.Medium>
                    {/* <Text style={styles.subheading}>User-name</Text> */}
                </View>
                <View style={{ flexDirection: 'row', display: 'flex' }}>
                    <Image
                        source={{
                            uri: props.icon,
                        }}
                        style={{
                            width: 100,
                            height: 100,
                            borderRadius: 8,
                            marginTop: 10,
                            marginRight: 15,
                        }}
                    />
                    <View
                        style={{
                            display: 'flex',
                            marginTop: 20,
                            marginLeft: 10,
                        }}>
                        <Satoshi.Regular
                            style={{ color: 'white', fontWeight: '500', fontSize: 12 }}>
                            Currently Playing
                        </Satoshi.Regular>
                        <Satoshi.Regular
                            style={{
                                color: 'white',
                                fontWeight: '500',
                                fontSize: 22,
                                marginTop: 5,
                            }}>
                            {song_name_temp}
                        </Satoshi.Regular>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    roomCard: {
        backgroundColor: '#08080A',
        width: Dimensions.get('window').width * 0.9,
        height: Dimensions.get('window').height * 0.19,
        borderRadius: 20,
        paddingTop: 15,
        paddingRight: 25,
        paddingBottom: 25,
        paddingLeft: 25,
    },
    title: {
        fontFamily: 'Satoshi',
        fontSize: 25,
        color: 'white',
    },
    subheading: {
        fontFamily: 'Satoshi',
        fontSize: 17,
        color: 'white',
    },
    tags: {
        flexDirection: 'row',
    },
});
export default Rooms;
