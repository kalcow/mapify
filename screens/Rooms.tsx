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
    const [modalVisible, setModalVisible] = useState(false);
    const [joinCode, setJoinCode] = useState('Enter Room Code');

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

    const joinRoom = async () => {
        const roomName = text;
        const refreshToken = await AsyncStorage.getItem('@spotify_refresh_token');
        try {
            const response = await fetch('http://localhost:8080/createCode', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ room_name: roomName, refresh_token: refreshToken }),
            });
            const json = await response.json();
            console.log(json);
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
                backgroundColor: '#08080A',
                flexDirection: 'column',
            }}>
            <Text style={{ color: 'white', fontSize: 30, alignItems: 'baseline', paddingLeft: 25 }}>
                Rooms
            </Text>
            <TouchableOpacity
                style={{
                    backgroundColor: 'grey',
                    borderColor: 'black',
                    padding: 10,
                    borderRadius: 7,
                }}
                onPress={() => {
                    setModalVisible(!modalVisible);
                }}>
                <Text>+</Text>
            </TouchableOpacity>
            <View style={{ alignItems: 'center' }}>
                <TextInput onChangeText={setJoinCode}></TextInput>
                <View
                    style={{
                        height: 3 * Dimensions.get('window').height * 0.2 + 60,
                        overflow: 'hidden',
                    }}>
                    <FlatList
                        data={[<Card></Card>, <Card></Card>, <Card></Card>, <Card></Card>]}
                        renderItem={({ item }) => item}
                    />
                </View>
                <Modal
                    visible={modalVisible}
                    animationType="slide"
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
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
                                setModalVisible(!modalVisible);
                            }}>
                            <Text style={{ color: 'white', fontSize: 30 }}>{'<'}</Text>
                        </TouchableOpacity>
                        <Text style={{ color: 'white', fontSize: 30, paddingLeft: 20 }}>
                            Create a Room
                        </Text>
                        <TextInput
                            style={{ backgroundColor: 'white', borderRadius: 50 }}
                            onChangeText={setText}
                        />
                        <View style={{ alignItems: 'center' }}>
                            <TouchableOpacity
                                style={{
                                    padding: 10,
                                    borderRadius: 50,
                                    width: (Dimensions.get('window').width * 1) / 2,
                                    backgroundColor: 'white',
                                }}
                                onPress={joinRoom}>
                                <Text
                                    style={{ color: '#08080A', fontSize: 20, textAlign: 'center' }}>
                                    Create
                                </Text>
                            </TouchableOpacity>
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
                        setModalVisible(!modalVisible);
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
export default Rooms;
