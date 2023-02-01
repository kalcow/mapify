import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icons from '../constants/Icons';
import Svg, { Path } from 'react-native-svg';
import SpotifyActions from '../lib/spotify';
import { useUserState } from '../context/user';
import { KeyedMutator } from 'swr';

interface ControlBar {
    playPause: () => void;
    SFState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
    data: any;
    mutate: KeyedMutator<any>; 
}

const ControlBar: FC<ControlBar> = ({ playPause, SFState, data, mutate }) => {
    const u = useUserState();
    return (
        <View style={styles.controlBar}>
            <TouchableOpacity>
                <Icons.shuffle />
            </TouchableOpacity>
            <View style={styles.playPauseWrapper}>
                <TouchableOpacity
                    onPress={() => {
                        SFState[1](true);
                        SpotifyActions.skipBack(u.accessToken!.spotify).then(() => {
                            mutate(); 
                            console.log('skipped song');
                        });
                    }}>
                    <Icons.skipBack />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.playButton}
                    onPress={() => {
                        playPause();
                    }}>
                    <Svg width={23} height={28} fill="none">
                        <Path
                            d="M.429 1.518A1 1 0 0 1 1.959.67l19.97 12.482a1 1 0 0 1 0 1.696L1.959 27.329a1 1 0 0 1-1.53-.848V1.518Z"
                            fill="#000"
                        />
                    </Svg>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        SFState[1](true);
                        SpotifyActions.skipForward(u.accessToken!.spotify).then(() => {
                            mutate(); 
                            console.log('skipped song');
                        });
                    }}>
                    <Icons.skipForward />
                </TouchableOpacity>
            </View>
            <TouchableOpacity>
                <Icons.repeat />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    controlBar: {
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 40,
        width: '100%',
        flexDirection: 'row',
    },
    playPauseWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    playButton: {
        borderRadius: 30,
        width: 60,
        height: 60,
        backgroundColor: '#2876F6',
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 5,
        marginHorizontal: 30,
    },
    lottieWrapper: {},
});

export default ControlBar;
