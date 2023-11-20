import { View, Modal, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import Ionicon from 'react-native-vector-icons/Ionicons'

const ImageModal = ({ visible, onPressBack, SRC }) => {
    return (
        <Modal
            visible={visible}
            animationType='fade'
            transparent={true}
        >
            <TouchableOpacity onPress={onPressBack} activeOpacity={1} style={{ backgroundColor: 'white' }}>
                <Ionicon name="arrow-back-outline" size={40} color='black' />
            </TouchableOpacity>
            <View style={{ backgroundColor: 'white', paddingHorizontal: 20, paddingVertical: 20, height: '100%' }}>
                <Image
                    src={SRC}
                    style={{ height: '90%', width: '100%', marginTop: 15, alignSelf: 'center' }}
                />
            </View>
        </Modal>
    )
}

export default ImageModal