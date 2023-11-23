import { View, Modal, TouchableOpacity, Image, SafeAreaView } from 'react-native'
import React from 'react'
import Ionicon from 'react-native-vector-icons/Ionicons'

const ImageModal = ({ visible, onPressBack, SRC }) => {
    return (
        <SafeAreaView>
            <Modal
                visible={visible}
                animationType='fade'
                transparent={true}
            >
                <TouchableOpacity
                    onPress={onPressBack}
                    style={{ backgroundColor: 'white', paddingTop: 40, paddingLeft: 16 }}>
                    <Ionicon name="arrow-back-outline" size={40} color='black' />
                </TouchableOpacity>
                <View style={{ backgroundColor: 'white', paddingHorizontal: 20, paddingVertical: 20 }}>
                    <Image
                        src={SRC}
                        style={{
                            height: '90%', width: '100%',
                            marginTop: 15, alignSelf: 'center'
                        }} />
                </View>
            </Modal>
        </SafeAreaView>
    )
}

export default ImageModal