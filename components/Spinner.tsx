import React from 'react';
import { Platform, View } from 'react-native';
import LottieView from 'lottie-react-native';

const Spinner = () => {
    return (
        <View
            style={{
                width: 24,
                height: 24,
                overflow: 'hidden',
                marginLeft: 5,
            }}>
            <View
                style={{
                    transform: [{ translateX: -24 }, { translateY: -6 }],
                }}>
                {Platform.OS !== 'android' && (
                    <LottieView
                        autoPlay
                        loop
                        style={{
                            width: 36,
                            height: 36,
                            backgroundColor: 'rgba(0, 0, 0, 0)',
                        }}
                        source={require('../assets/loading_spinner.json')}
                    />
                )}
            </View>
        </View>
    );
};

export default Spinner;
