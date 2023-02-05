import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Text, UIManager, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import useCachedResources from './hooks/useCachedResources';
import DarkTheme from './constants/Theme';
import Colors from './constants/colors';
import InitialFlow from './routers/InitialFlow';
import BottomTabNavigation from './routers/BottomTabNavigation';
import UserWrapper from './context/user';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
    const isLoadingComplete = useCachedResources();

    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <GestureHandlerRootView style={{ flex: 1 }}>
                <UserWrapper>
                    <View style={{ flex: 1, backgroundColor: Colors.blackBase }}>
                        <NavigationContainer theme={DarkTheme}>
                            <StatusBar style="light" />
                            <InitialFlow />
                        </NavigationContainer>
                    </View>
                </UserWrapper>
            </GestureHandlerRootView>
        );
    }
}
