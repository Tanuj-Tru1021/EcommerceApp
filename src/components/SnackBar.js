import { View, Text } from 'react-native'
import React from 'react'

const SnackBar = ({ mainStyle, onPressOk }) => {
    return (
        <View style={{ ...mainStyle, backgroundColor: 'black', flex: 1, flexDirection: 'row', justifyContent: 'space-between', padding: 8 }}>
            <Text style={{ color: 'white', fontSize: 16, fontWeight: 500 }}>
                Product added to cart
            </Text>
            <Text
                style={{ color: 'green', fontSize: 16, fontWeight: 500, marginLeft: 16 }}
                onPress={onPressOk}
            >
                OK
            </Text>
        </View>
    )
}

export default SnackBar