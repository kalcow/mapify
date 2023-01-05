import { View, Text, StyleSheet, TouchableOpacity, LayoutAnimation } from 'react-native';
import React, { FC } from 'react';
import Animated, {
    FadeIn,
    Layout,
    ZoomIn,
    ZoomOut,
    Easing,
    FadeOut,
    SlideInLeft,
    SlideOutLeft,
} from 'react-native-reanimated';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomTabIcons from '../constants/BottomTabIcons';
import Colors from '../constants/Colors';

//* Screens
import Home from '../screens/Home';
import Map from '../screens/Map';
import Library from '../screens/Library';
import Discover from '../screens/Discover';

//* Imports for Types
import { BottomTabBarProps } from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import Satoshi from '../constants/Satoshi';
// import Animated from 'react-native-reanimated';

const TabData = [
    { route: 'Map', label: 'Map', icon: BottomTabIcons.Map, component: Map },
    { route: 'Discover', label: 'Discover', icon: BottomTabIcons.Compass, component: Discover },
    { route: 'Home', label: 'Home', icon: BottomTabIcons.Home, component: Home },
    { route: 'Library', label: 'Library', icon: BottomTabIcons.Library, component: Library },
    { route: 'You', label: 'You', icon: BottomTabIcons.User, component: Library },
];

const Tabs = createBottomTabNavigator();

const TabBar: FC<BottomTabBarProps> = ({ state, descriptors, navigation, insets }) => {
    // const render = BottomTabIcons.Map;
    return (
        <View
            style={{
                ...styles.wrapper,
                bottom: insets.bottom - 10,
                left: insets.left,
                right: insets.right,
            }}>
            <View style={styles.songContainer}>
                <Satoshi.Bold style={styles.text}>Spotify Here</Satoshi.Bold>
            </View>
            <View style={styles.tabsContainer}>
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const label =
                        options.tabBarLabel !== undefined
                            ? options.tabBarLabel
                            : options.title !== undefined
                            ? options.title
                            : route.name;

                    const isFocused = state.index === index;

                    const renderIcon = options.tabBarIcon;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name);
                        }
                    };

                    const onLongPress = () => {
                        navigation.emit({
                            type: 'tabLongPress',
                            target: route.key,
                        });
                    };

                    return (
                        <Animated.View layout={Layout.duration(200)} key={index}>
                            <TouchableOpacity
                                accessibilityRole="button"
                                accessibilityState={isFocused ? { selected: true } : {}}
                                accessibilityLabel={options.tabBarAccessibilityLabel}
                                testID={options.tabBarTestID}
                                onPress={onPress}
                                onLongPress={onLongPress}
                                key={index}
                                style={styles.activeTab}>
                                {isFocused && (
                                    <Animated.View
                                        style={styles.activeBackground}
                                        entering={SlideInLeft.duration(300).easing(
                                            Easing.inOut(Easing.ease)
                                        )}
                                        // exiting={ZoomOut.duration(200)}
                                    />
                                )}
                                {isFocused && (
                                    <Animated.View
                                        entering={FadeIn.duration(200).easing(
                                            Easing.inOut(Easing.ease)
                                        )}
                                        exiting={FadeOut.duration(200)}>
                                        {renderIcon !== undefined &&
                                            renderIcon({
                                                focused: isFocused,
                                                color: Colors.greyBackground,
                                                size: 0,
                                            })}
                                    </Animated.View>
                                )}
                                {!isFocused && (
                                    <Animated.View
									entering={FadeIn.duration(400).easing(
										Easing.inOut(Easing.ease)
									)}
									exiting={FadeOut.duration(200)}>
                                        {renderIcon !== undefined &&
                                            renderIcon({
                                                focused: isFocused,
                                                color: Colors.text,
                                                size: 0,
                                            })}
                                    </Animated.View>
                                )}
                                {isFocused && (
                                    <Animated.View
                                        entering={ZoomIn.duration(400).easing(
                                            Easing.inOut(Easing.ease)
                                        )}
                                        exiting={ZoomOut.duration(200)}
                                    >
                                        <Satoshi.Bold
                                            style={{ ...styles.text, ...styles.activeText }}>
                                            {typeof label === 'string' ? label : ''}
                                        </Satoshi.Bold>
                                    </Animated.View>
                                )}
                            </TouchableOpacity>
                        </Animated.View>
                    );
                })}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        backgroundColor: Colors.greyBackground,
        marginHorizontal: 15,
        padding: 7,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: Colors.text,
        fontSize: 14,
    },
    songContainer: {
        height: 72,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabsContainer: {
        width: '100%',
        minHeight: 34,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    activeText: {
        color: Colors.greyBackground,
        paddingLeft: 8,
    },
    activeBackground: {
        position: 'absolute',
        backgroundColor: Colors.text,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        height: '100%',
        borderRadius: 30,
        alignSelf: 'stretch',
    },
    activeTab: {
        flexDirection: 'row',
        paddingHorizontal: 12,
        borderRadius: 30,
        height: 34,
        alignItems: 'center',
        position: 'relative',
        flex: 1,
        overflow: 'hidden',
    },
});

const BottomTabNavigation = () => {
    return (
        <Tabs.Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName="Home"
            tabBar={(props) => <TabBar {...props} />}>
            {TabData.map((Item, index) => {
                return (
                    <Tabs.Screen
                        key={index}
                        name={Item.route}
                        component={Item.component}
                        options={{
                            tabBarIcon: Item.icon,
                        }}
                    />
                );
            })}
        </Tabs.Navigator>
    );
};

export default BottomTabNavigation;
