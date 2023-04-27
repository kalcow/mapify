import { View, StyleSheet, Modal, Image, TouchableOpacity, Dimensions } from 'react-native';
import React, { FC, useEffect, useState, useRef } from 'react';
import Satoshi from '../constants/Satoshi';
import Colors from '../constants/colors';
import useSWR, { KeyedMutator } from 'swr';
import { useUserState } from '../context/user';
import ms_to_string from '../lib/ms_to_string';
import Animated, {
    Layout,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
    useAnimatedSensor,
    SensorType,
    Easing,
} from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';
import SpotifyActions from '../lib/spotify';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icons from '../constants/Icons';
import ControlBar from './ControlBar';
import { Slider } from '@miblanchard/react-native-slider';
import { Modalize } from 'react-native-modalize';

//!Native Dependencies
import ImageColors from 'react-native-image-colors';

//!development
import isExpoGo, { isAndroid } from '../lib/isExpoGo';
import Spinner from './Spinner';
import { Directions, Gesture, GestureDetector } from 'react-native-gesture-handler';

const API_ENDPOINT = 'https://mapify-server.fly.dev/player';

interface CurrentlyPlaying {}

interface Bar {
    height: number;
    active: boolean;
}

interface CurrentlyPlayingModal {
    data: any;
    artists: string;
    dominantColor: string;
    modalVisible: boolean;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    loadingSF: boolean;
    setLoadingSF: React.Dispatch<React.SetStateAction<boolean>>;
    bars: JSX.Element[];
    pause: () => void;
    percentDuration: number;
    width: number;
    mutate: KeyedMutator<any>;
}

const Bar: FC<Bar> = ({ height, active }) => {
    return (
        <View
            style={[
                styles.bar,
                { height: height, backgroundColor: active ? Colors.accentColor : '#62636b' },
            ]}
        />
    );
};

const CurrentlyPlayingModal: FC<CurrentlyPlayingModal> = ({
    data,
    artists,
    dominantColor,
    modalVisible,
    setModalVisible,
    loadingSF,
    setLoadingSF,
    bars,
    pause,
    percentDuration,
    width,
    mutate,
}) => {
    const [sliding, setSliding] = useState<boolean>(false);
    const [sliderValue, setSliderValue] = useState<number>(percentDuration / width);
    const insets = useSafeAreaInsets();
    const u = useUserState();

    useEffect(() => {
        setSliderValue(percentDuration / width);
        if (!loadingSF) {
            setSliding(false);
        }
    }, [percentDuration]);
    const animatedSensor = useAnimatedSensor(SensorType.ROTATION, {
        interval: 10,
    });

    const rightFling = Gesture.Fling()
        .direction(Directions.RIGHT)
        .onStart((e) => {
            console.log(e);
            setLoadingSF(true);
            SpotifyActions.skipBack(u.accessToken!.spotify).then(() => {
                mutate();
                console.log('skipped song');
            });
        })
        .runOnJS(true);

    const leftFling = Gesture.Fling()
        .direction(Directions.LEFT)
        .onStart(() => {
            setLoadingSF(true);
            SpotifyActions.skipForward(u.accessToken!.spotify).then(() => {
                mutate();
                console.log('skipped song');
            });
        })
        .runOnJS(true);

    const downFling = Gesture.Fling()
        .direction(Directions.DOWN)
        .onEnd(() => {
            setModalVisible(!modalVisible);
        })
        .runOnJS(true);

    const style = useAnimatedStyle(() => {
        const { pitch, roll } = animatedSensor.sensor.value;

        const min = -10;
        const max = 10;
        const clamp = (num: number, min: number, max: number) => Math.min(Math.max(num, min), max);

        let rollValue = clamp(0.2 * (180 / Math.PI) * roll, min, max);
        let pitchValue = clamp(0.2 * ((180 / Math.PI) * pitch - 90), min, max);

        return {
            transform: [
                { perspective: 1000 },
                { rotateY: withTiming(`${-rollValue}deg`, { duration: 10 }) },
                { rotateX: withTiming(`${pitchValue}deg`, { duration: 10 }) },
            ],
        };
    });

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}>
            <GestureDetector gesture={rightFling}>
                <GestureDetector gesture={leftFling}>
                    <GestureDetector gesture={downFling}>
                        <Animated.View style={styles.ModalWrapper} layout={Layout.duration(200)}>
                            {
                                <LinearGradient
                                    colors={[dominantColor, Colors.blackBase]}
                                    style={styles.colorBlock}
                                />
                            }
                            <View
                                style={[
                                    styles.ModalContainer,
                                    { paddingTop: insets.top, paddingBottom: insets.bottom },
                                ]}>
                                <View>
                                    <View style={styles.cpHeader}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                setModalVisible(!modalVisible);
                                            }}>
                                            <Icons.DownChevron />
                                        </TouchableOpacity>
                                        <Animated.View
                                            layout={Layout.duration(200)}
                                            style={styles.cpHeaderTextWrapper}>
                                            <Satoshi.Bold style={styles.cpHeaderText}>
                                                Currently Playing
                                            </Satoshi.Bold>
                                            {loadingSF && <Spinner />}
                                        </Animated.View>
                                        <TouchableOpacity>
                                            <Icons.Analytics />
                                        </TouchableOpacity>
                                    </View>
                                    {/* <GestureDetector gesture={rotationGesture}> */}
                                    <Animated.Image
                                        style={[
                                            {
                                                maxWidth: '100%',
                                                aspectRatio: 1,
                                                borderRadius: 16,
                                            },
                                            style,
                                        ]}
                                        source={{ uri: data.item.album.images[0].url }}
                                    />
                                    {/* </GestureDetector> */}
                                    <View
                                        style={[
                                            styles.songDetailWrapper,
                                            { opacity: loadingSF ? 0.5 : 1 },
                                        ]}>
                                        <Satoshi.Black style={styles.songTitle}>
                                            {data.item.name}
                                        </Satoshi.Black>
                                        <Satoshi.Medium style={styles.songArtists}>
                                            {artists}
                                        </Satoshi.Medium>
                                        <View style={styles.device}>
                                            <Svg
                                                width={9}
                                                height={11}
                                                style={{ marginRight: 3 }}
                                                fill="none">
                                                <Path
                                                    d="M4.5 2.8h.004M1.875 1h5.25c.483 0 .875.403.875.9v7.2c0 .497-.392.9-.875.9h-5.25A.888.888 0 0 1 1 9.1V1.9c0-.497.392-.9.875-.9ZM6.25 6.4c0 .994-.784 1.8-1.75 1.8s-1.75-.806-1.75-1.8.784-1.8 1.75-1.8 1.75.806 1.75 1.8Z"
                                                    stroke={Colors.textTwo}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </Svg>
                                            <Satoshi.Medium style={styles.artists}>
                                                Playing from {data.device.name}
                                            </Satoshi.Medium>
                                        </View>
                                    </View>
                                </View>
                                <View>
                                    <View style={[styles.waveformWrapper, { width: width }]}>
                                        {bars}
                                        <Slider
                                            value={sliderValue}
                                            onValueChange={(number) => {
                                                sliding
                                                    ? //@ts-ignore
                                                      setSliderValue(number[0])
                                                    : setSliderValue(percentDuration / width);
                                            }}
                                            maximumTrackTintColor="rgba(0, 0, 0, 0)"
                                            minimumTrackTintColor="rgba(0, 0, 0, 0)"
                                            renderThumbComponent={() => {
                                                return (
                                                    <TouchableOpacity
                                                        style={{
                                                            width: 4,
                                                            height: 65,
                                                            backgroundColor: Colors.text,
                                                            borderRadius: 4,
                                                            position: 'relative',
                                                        }}>
                                                        {/* <View style={{width: 8, height: 8, backgroundColor: Colors.text, borderRadius: 8, bottom: -5, left: -2, position: 'absolute'}}/> */}
                                                    </TouchableOpacity>
                                                );
                                            }}
                                            containerStyle={styles.sliderContainer}
                                            onSlidingComplete={(duration: number[] | number) => {
                                                setSliding(true);
                                                setLoadingSF(true);
                                                SpotifyActions.seek(
                                                    u.accessToken!.spotify,
                                                    //@ts-ignore
                                                    Math.floor(duration[0] * data.item.duration_ms)
                                                ).then(() => {
                                                    mutate();
                                                    setTimeout(() => {
                                                        setSliding(false);
                                                    }, 3000);
                                                });
                                            }}
                                            onSlidingStart={() => {
                                                setSliding(true);
                                            }}
                                        />
                                    </View>
                                    <View style={styles.songTimeStampWrapper}>
                                        <Satoshi.Regular style={styles.songTimeStamp}>
                                            {ms_to_string(data.progress_ms)}
                                        </Satoshi.Regular>
                                        <Satoshi.Regular style={styles.songTimeStamp}>
                                            {ms_to_string(data.item.duration_ms)}
                                        </Satoshi.Regular>
                                    </View>
                                    <ControlBar
                                        playPause={pause}
                                        SFState={[loadingSF, setLoadingSF]}
                                        data={data}
                                        mutate={mutate}
                                    />
                                </View>
                            </View>
                        </Animated.View>
                    </GestureDetector>
                </GestureDetector>
            </GestureDetector>
        </Modal>
    );
};

const CurrentlyPlaying: FC<CurrentlyPlaying> = () => {
    const u = useUserState();
    const fetcher = (url: RequestInfo | URL) =>
        fetch(url, { headers: { access_token: u.accessToken!.spotify } }).then((r) => r.json());
    const { data, error, mutate } = useSWR(API_ENDPOINT, fetcher, { refreshInterval: 500 });
    const w = useSharedValue(0);
    const [playState, setPlayState] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [dominantColor, setDominantColor] = useState<string | undefined>('#000');
    const [loadingSF, setLoadingSF] = useState<boolean>(false);
    // const modalizeRef = useRef<Modalize>(null);

    const onOpen = () => {
        u!.currentlyPlayingModal?.ref.current?.open();
    };

    useEffect(() => {
        if (data !== undefined && data.player_available) {
            w.value = (data.progress_ms / data.item.duration_ms) * 100;
            setPlayState(data.is_playing);
            if (!isExpoGo) {
                const getColors = () => {
                    ImageColors.getColors(data.item.album.images[2].url, {
                        fallback: Colors.blackBase,
                        cache: false,
                        key: 'unique_key',
                        headers: {
                            authorization: 'Basic 123',
                        },
                    }).then((result) => {
                        // console.log(result);
                        let primaryColor;
                        switch (result.platform) {
                            case 'android':
                                // android result properties
                                primaryColor = result.vibrant;
                                setDominantColor(primaryColor);
                                break;
                            case 'web':
                                // web result properties
                                primaryColor = result.lightVibrant;
                                setDominantColor(primaryColor);
                                break;
                            case 'ios':
                                // iOS result properties
                                primaryColor = result.background;
                                setDominantColor(primaryColor);
                                break;
                            default:
                                throw new Error('Unexpected platform key');
                        }

                        setLoadingSF(false);
                    });
                };

                getColors();
            } else {
                setLoadingSF(false);
            }
        }
    }, [data]);

    const animatedWidth = useAnimatedStyle(() => {
        return {
            width: withTiming(`${w.value}%`, {
                duration: 3000,
            }),
        };
    }, [data]);

    if (data === undefined || dominantColor === undefined) {
        return (
            <View style={styles.connectingWrapper}>
                <Satoshi.Bold style={styles.title}>Connecting</Satoshi.Bold>
                <Spinner />
            </View>
        );
    }

    if (data.player_available == false) {
        return (
            <View style={styles.connectingWrapper}>
                <Satoshi.Bold style={styles.title}>
                    Looks like nothing is playing right now
                </Satoshi.Bold>
            </View>
        );
    }

    const pause = () => {
        setLoadingSF(true);
        if (playState) {
            SpotifyActions.pause(u.accessToken!.spotify).then(() => {
                console.log('paused');
                setPlayState(!playState);
                mutate();
            });
        } else {
            SpotifyActions.play(u.accessToken!.spotify).then(() => {
                console.log('playing');
                setPlayState(!playState);
                mutate();
            });
        }
    };

    const artists: string = data.item.artists.map((_artist: any) => _artist.name).join(', ');

    //Waveform Generation
    const width = Dimensions.get('window').width - 40;
    const height = 60;
    const barSize = 2;
    const barGap = 2;

    const bars: JSX.Element[] = [];

    let waveform: number[] = data.waveform;
    let bucketSize = waveform.length / (width / (barSize + barGap));

    let percentDuration = data.progress_ms / data.item.duration_ms;
    let songCompleteMax = percentDuration * (width / (barSize + barGap));
    let final = 0;

    for (let i = 0; i < width / (barSize + barGap); i++) {
        let bucket = waveform.slice(i * bucketSize, (i + 1) * bucketSize);
        let sum: number = bucket.reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            0
        );

        let average = sum / bucketSize;

        if (i <= songCompleteMax) {
            final = i;
        }

        if (average * height < 2) {
            bars.push(<Bar key={i} height={2} active={i <= songCompleteMax} />);
        } else {
            bars.push(<Bar key={i} height={average * height} active={i <= songCompleteMax} />);
        }
    }

    let numBuckets = Math.ceil(width / (barSize + barGap));
    let bucketGap = (width - numBuckets * 2) / (numBuckets - 1);
    let final_width = 0;
    if (final) {
        final_width = final * barSize + (final + 1) * bucketGap;
    }

    return (
        <View style={styles.wrapper}>
            <CurrentlyPlayingModal
                data={data}
                artists={artists}
                dominantColor={dominantColor}
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                loadingSF={loadingSF}
                setLoadingSF={setLoadingSF}
                bars={bars}
                pause={pause}
                percentDuration={final_width}
                width={width}
                mutate={mutate}
            />
            <Image
                style={{ width: 72, height: 72, borderRadius: 23, marginRight: 11 }}
                source={{ uri: data.item.album.images[0].url }}
            />
            <View style={styles.textWrapper}>
                {/* <TouchableOpacity onPress={onOpen}>
                    <Satoshi.Bold>Open the modal</Satoshi.Bold>
                </TouchableOpacity> */}
                <View style={styles.textContainer}>
                    <TouchableOpacity
                        onPress={() => {
                            setModalVisible(!modalVisible);
                        }}>
                        <Satoshi.Bold numberOfLines={1} style={styles.title}>
                            {data.item.name}
                            <Satoshi.Bold style={styles.artists}> • {artists}</Satoshi.Bold>
                        </Satoshi.Bold>
                        <View style={styles.device}>
                            <Svg width={9} height={11} style={{ marginRight: 3 }} fill="none">
                                <Path
                                    d="M4.5 2.8h.004M1.875 1h5.25c.483 0 .875.403.875.9v7.2c0 .497-.392.9-.875.9h-5.25A.888.888 0 0 1 1 9.1V1.9c0-.497.392-.9.875-.9ZM6.25 6.4c0 .994-.784 1.8-1.75 1.8s-1.75-.806-1.75-1.8.784-1.8 1.75-1.8 1.75.806 1.75 1.8Z"
                                    stroke={Colors.textTwo}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </Svg>
                            <Satoshi.Medium style={styles.artists}>
                                {data.device.name}
                            </Satoshi.Medium>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.playButton}
                        onPress={() => {
                            pause();
                        }}>
                        <Svg width={14} height={16} fill="none">
                            <Path
                                d="M.857 1.233a1 1 0 0 1 1.53-.848l10.828 6.767a1 1 0 0 1 0 1.696L2.387 15.615a1 1 0 0 1-1.53-.848V1.233Z"
                                fill="#1D1E24"
                            />
                        </Svg>
                    </TouchableOpacity>
                </View>
                <View style={styles.progressSectionWrapper}>
                    <View style={styles.progressBarWrapper}>
                        <Animated.View style={[styles.progressBarCurrent, animatedWidth]} />
                    </View>
                    <Satoshi.Regular style={styles.timeStamp}>
                        {ms_to_string(data.progress_ms)}
                    </Satoshi.Regular>
                </View>
            </View>
        </View>
    );
};

export default CurrentlyPlaying;

const styles = StyleSheet.create({
    //Connecting and no song
    connectingWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    //CP widget
    wrapper: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 10,
    },
    textWrapper: {
        flex: 1,
    },
    textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: 42,
        position: 'relative',
    },
    title: {
        color: Colors.text,
        fontSize: 12,
    },
    artists: {
        fontSize: 12,
        color: Colors.textTwo,
    },
    progressSectionWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
    },
    timeStamp: {
        fontSize: 10,
        color: Colors.text,
        letterSpacing: 1.2,
        width: 40,
        textAlign: 'right',
    },
    progressBarWrapper: {
        position: 'relative',
        backgroundColor: Colors.textTwo,
        flex: 1,
        height: 4,
        borderRadius: 10,
        overflow: 'hidden',
    },
    progressBarCurrent: {
        position: 'absolute',
        backgroundColor: '#2876F6',
        top: 0,
        bottom: 0,
        left: 0,
    },
    playButton: {
        borderRadius: 20,
        width: 36,
        height: 36,
        backgroundColor: '#2876F6',
        position: 'absolute',
        right: 0,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 1,
        zIndex: 1000,
    },
    device: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 2,
    },
    //modal
    ModalWrapper: {
        flex: 1,
        backgroundColor: Colors.blackBase,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        overflow: 'hidden',
    },
    ModalContainer: {
        padding: 20,
        justifyContent: 'space-between',
        flex: 1,
    },
    colorBlock: {
        height: '200%',
        width: '100%',
        backgroundColor: 'white',
        position: 'absolute',
        top: '-100%',
        left: 0,
        right: 0,
    },
    cpHeader: {
        width: '100%',
        paddingVertical: 15,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    cpHeaderTextWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 24,
    },
    cpHeaderText: {
        color: Colors.text,
    },
    //Song Details
    songDetailWrapper: {
        paddingVertical: 25,
    },
    songTitle: {
        color: Colors.text,
        fontSize: 20,
        marginBottom: 4,
    },
    songArtists: {
        fontSize: 16,
        color: Colors.textTwo,
        marginBottom: 15,
    },
    songTimeStampWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    songTimeStamp: {
        fontSize: 10,
        color: Colors.text,
        letterSpacing: 1.2,
    },
    //Waveform
    waveformWrapper: {
        height: 60,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        position: 'relative',
        marginBottom: 10,
    },
    bar: {
        width: 2,
        backgroundColor: '#62636b',
        height: '100%',
        borderRadius: 5,
    },
    sliderContainer: {
        position: 'absolute',
        height: 60,
        width: '100%',
        // backgroundColor: 'red'
    },
});
