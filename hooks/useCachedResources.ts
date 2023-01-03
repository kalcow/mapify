import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';

export default function useCachedResources() {
    const [isLoadingComplete, setLoadingComplete] = useState(false);

    // Load any resources or data that we need prior to rendering the app
    useEffect(() => {
        async function loadResourcesAndDataAsync() {
            try {
                SplashScreen.preventAutoHideAsync();

                // Load fonts
                await Font.loadAsync({
                    'satoshi-light': require('../assets/fonts/Satoshi-Light.otf'),
                    'satoshi-regular': require('../assets/fonts/Satoshi-Regular.otf'),
                    'satoshi-medium': require('../assets/fonts/Satoshi-Medium.otf'),
                    'satoshi-bold': require('../assets/fonts/Satoshi-Bold.otf'),
                    'satoshi-black': require('../assets/fonts/Satoshi-Black.otf'),
                });
            } catch (e) {
                // We might want to provide this error information to an error reporting service
                console.warn(e);
            } finally {
                setLoadingComplete(true);
                SplashScreen.hideAsync();
            }
        }

        loadResourcesAndDataAsync();
    }, []);

    return isLoadingComplete;
}
