import { StyleSheet, Text, View, TouchableOpacity, ViewStyle, StyleProp } from 'react-native';
import React, { Children, FC, ReactNode } from 'react';
import Satoshi from '../constants/Satoshi';
import Colors from '../constants/Colors';
import { SvgProps } from 'react-native-svg';

interface ButtonProps {
    thin?: boolean;
    children?: ReactNode;
    text: string;
    navigate?: boolean;
    route?: string;
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
}

const Button: FC<ButtonProps> = ({ thin, text, navigate, route, onPress, children, style }) => {
    return (
        <TouchableOpacity
            style={[
                styles.Wrapper,
                style,
                thin ? { paddingVertical: 5, alignSelf: 'baseline' } : { paddingVertical: 10 },
            ]}
            onPress={() => {
                if (onPress !== undefined) onPress();
            }}>
            <Satoshi.Bold style={{ paddingRight: 2, color: Colors.blackBase }}>{text}</Satoshi.Bold>
            {children}
        </TouchableOpacity>
    );
};

export default Button;

const styles = StyleSheet.create({
    Wrapper: {
        backgroundColor: Colors.text,
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

/**
 * int hello = 0;
 * const hello = 0;
 * const hello: number = 0;
 * const button: FC<>
 */
