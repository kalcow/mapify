import { FC } from 'react';
import { Dimensions, View } from 'react-native';
import { Modalize as Modal } from 'react-native-modalize';
import { KeyedMutator } from 'swr';
import { useUserState } from '../context/user';

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

const ModalWrapper: FC<CurrentlyPlayingModal> = ({}) => {
    const u = useUserState();
    return (
        <View>
            <Modal
                ref={u!.currentlyPlayingModal?.ref}
                modalStyle={{ height: Dimensions.get('window').height }}
                handlePosition={'inside'}
                ></Modal>
        </View>
    );
};

export default ModalWrapper;
