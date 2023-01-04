import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Text, UIManager, View } from 'react-native';
import Satoshi from './constants/Satoshi';
import { NavigationContainer } from '@react-navigation/native';

import useCachedResources from './hooks/useCachedResources';
import BottomTabNavigation from './routers/BottomTabNavigation';
import DarkTheme from './constants/Theme';
import Colors from './constants/Colors';
import SwipeableBottomTabNavigation from './routers/SwipeableBottomTabNavigation';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const useSwipeableBottomTabs = true; 

export default function App() {
    const isLoadingComplete = useCachedResources();

    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <View style={{ flex: 1, backgroundColor: Colors.blackBase }}>
                <NavigationContainer theme={DarkTheme}>
                    <StatusBar style="light" />
                    {
                      useSwipeableBottomTabs ? <SwipeableBottomTabNavigation /> : <BottomTabNavigation />
                    }
                </NavigationContainer>
            </View>
        );
    }
}
