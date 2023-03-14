import React from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    Image,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Dimensions,
} from 'react-native';
import Satoshi from '../constants/Satoshi';
import { createStackNavigator } from '@react-navigation/stack';
import Library from '../screens/library/Library';
import SongPage from '../screens/library/SongPage';
import Colors from '../constants/colors';

const Stack = createStackNavigator();

const LibraryFlow = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Library"
                component={Library}
                options={{
                    headerShown: false,
                }}></Stack.Screen>
            <Stack.Screen
                name="SongPage"
                component={SongPage}
                options={({ navigation }) => ({
                    headerTintColor: 'white',
                    title: '',
                })}></Stack.Screen>
        </Stack.Navigator>
    );
};

export default LibraryFlow;
