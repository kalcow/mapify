import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import useCachedResources from './hooks/useCachedResources';
import DarkTheme from './constants/Theme';
import Colors from './constants/colors';
import InitialFlow from './routers/InitialFlow';
import UserWrapper from './context/user';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import ModalWrapper from './components/Modal';

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
                        {/* <ModalWrapper/> */}
                    </View>
                </UserWrapper>
            </GestureHandlerRootView>
        );
    }
}
