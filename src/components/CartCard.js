import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'

const CartCard = ({ SRC, itemTitle, itemPrice, itemCount, onPressMinus, counter, onPressPlus }) => {
    return (
        <View style={{ backgroundColor: 'white', paddingHorizontal: 16, paddingVertical: 16, borderRadius: 8, marginTop: 20, elevation: 100, shadowColor: 'white', flexDirection: 'row' }}>
            <Image
                src={SRC}
                style={{ width: 120, height: 160, marginRight: 16 }}
            />
            <View>
                <Text style={{ fontSize: 16, fontWeight: 500, color: 'black', maxWidth: 200 }}>
                    {itemTitle}
                </Text>
                <Text style={{ fontSize: 14, color: 'grey', marginTop: 4 }}>
                    $ {itemPrice}
                </Text>
                {
                    itemCount > 0 ? <Text style={{ fontSize: 14, color: 'green', marginTop: 4 }}>In stock</Text> : <Text style={{ fontSize: 14, color: 'red', marginTop: 4 }}>Out of stock</Text>
                }
                <View style={{ flexDirection: 'row', marginTop: 20, borderColor: 'black', borderWidth: 2, justifyContent: 'space-between' }}>
                    <TouchableOpacity
                        style={{ borderWidth: 2, borderColor: 'grey', paddingVertical: 4, paddingHorizontal: 30 }}
                        onPress={onPressMinus}
                    >
                        <Text style={{ fontSize: 20, color: 'black', fontWeight: 500 }}>
                            -
                        </Text>
                    </TouchableOpacity>
                    <View style={{ paddingVertical: 4, paddingHorizontal: 20, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 14, color: 'black', fontWeight: 500 }}>
                            {counter}
                        </Text>
                    </View>
                    <TouchableOpacity
                        style={{ borderWidth: 2, borderColor: 'grey', paddingVertical: 4, paddingHorizontal: 30 }}
                        onPress={onPressPlus}
                    >
                        <Text style={{ fontSize: 20, color: 'black', fontWeight: 500 }}>
                            +
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default CartCard