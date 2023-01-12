import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigation from './BottomTabNavigation';
import Login from '../screens/onboarding/Login';
import SwipeableBottomTabNavigation from './SwipeableBottomTabNavigation';
import { supabase } from '../supabase/supabase';
import { useState } from 'react';
import LoadingScreen from '../components/LoadingScreen';
import { AuthChangeEvent } from '@supabase/supabase-js';
import { useAuthState } from '../hooks/useAuthState';
import Animated, { Easing, FadeIn, FadeOut, Layout, ZoomOut } from 'react-native-reanimated';

const Stack = createStackNavigator();

const useSwipeableBottomTabs = !false;

const InitialFlow = () => {
    const [initialRoute, setInitialRoute] = useState('Login');
    const [loading, setLoading] = useState(true);
    const authState = useAuthState();

    useEffect(() => {
        supabase.auth
            .getSession()
            .then((data) => {
                // console.log(data);
                if (data.data.session !== null) {
                    setInitialRoute('HomeTabs');
                }
                setTimeout(() => setLoading(false), 1000);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [authState]);

    return (
        <Animated.View style={{ flex: 1 }} >
            {loading && (
                <Animated.View
                    style={{ flex: 1 }}
                    entering={FadeIn.duration(200).easing(Easing.inOut(Easing.ease))}
                    exiting={ZoomOut.duration(2000)}>
                    <LoadingScreen />
                </Animated.View>
            )}
            {!loading && (
                <Animated.View style={{ flex: 1 }}>
                    <Stack.Navigator
                        screenOptions={{
                            headerShown: false,
                        }}
                        initialRouteName={initialRoute}>
                        <Stack.Screen name="Login" component={Login} />
                        <Stack.Screen
                            name="HomeTabs"
                            component={
                                useSwipeableBottomTabs
                                    ? BottomTabNavigation
                                    : SwipeableBottomTabNavigation
                            }
                        />
                    </Stack.Navigator>
                </Animated.View>
            )}
        </Animated.View>
    );
};

export default InitialFlow;
