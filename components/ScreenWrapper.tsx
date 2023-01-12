import { StyleSheet, Text, View } from 'react-native';
import React, { FC, ReactNode } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ScreenWrapperProps {
    children: ReactNode;
}

const ScreenWrapper: FC<ScreenWrapperProps> = ({ children }) => {
    const insets = useSafeAreaInsets();
    return (
        <View
            style={{
                paddingTop: insets.top,
                paddingBottom: insets.bottom,
                paddingLeft: Math.max(insets.left, 20),
                paddingRight: Math.max(insets.right, 20),
            }}>
            {children}
        </View>
    );
};

export default ScreenWrapper;
