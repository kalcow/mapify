import { StyleSheet, Text, View } from 'react-native';
import React, { useRef } from 'react';
import Colors from '../constants/colors';
import LottieView from 'lottie-react-native';

function LoadingScreen() {
    return (
        <View style={styles.wrapper}>
            <LottieView
                autoPlay
                loop
                style={{
                    width: 200,
                    height: 200,
                    backgroundColor: 'rgba(0, 0, 0, 0)',
                }}
                // Find more Lottie files at https://lottiefiles.com/featured
                source={require('../assets/lottieAnimation.json')}
            />
        </View>
    );
};

export default LoadingScreen;

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: Colors.blackBase,
        justifyContent: 'center',
        alignItems: 'center',
    },
});