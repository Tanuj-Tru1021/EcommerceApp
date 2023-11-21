import { View, Text, TouchableOpacity, Image, } from 'react-native'
import React, { useState, useContext } from 'react'
import { ApiContext } from './ApiContext'

const ProductCard = ({ onPressImage, src, onPressCard, title, price, category, count, rate, onPressAdd, onPressMinus, onPressPlus, id }) => {

    const [counter, setCounter] = useState(1)
    const { products } = useContext(ApiContext)

    const call = () => {
        onPressAdd()
        item.isAddedToCart = true
        item.quantityInCart = 1
        setCounter(1)
    }

    const item = products.find(el => el.id === id)

    return (
        <TouchableOpacity
            style={{ backgroundColor: 'white', paddingHorizontal: 16, paddingVertical: 16, borderRadius: 8, marginTop: 20, elevation: 100, shadowColor: 'white', }}
            onPress={onPressCard}
        >
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={onPressImage}>
                    <Image
                        src={src}
                        style={{ width: 120, height: 160, marginRight: 16 }}
                    />
                </TouchableOpacity>
                <View>
                    <View>

                        <Text style={{ fontSize: 16, fontWeight: 500, color: 'black', maxWidth: 200 }}>
                            {title}
                        </Text>

                        <Text style={{ fontSize: 14, color: 'grey', marginTop: 4 }}>
                            $ {price}
                        </Text>
                        <Text style={{ fontSize: 14, color: 'grey', marginTop: 4 }}>
                            Category: {category}
                        </Text>
                        {
                            count > 0 ? <Text style={{ fontSize: 14, color: 'green', marginTop: 4 }}>In stock</Text> : <Text style={{ fontSize: 14, color: 'red', marginTop: 4 }}>Out of stock</Text>
                        }
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ fontSize: 14, marginTop: 4, color: 'grey', marginRight: 4 }}>
                                Rating:
                            </Text>
                            <Text style={{ fontSize: 14, marginTop: 4, color: rate > 3 ? 'green' : rate < 3 && rate > 2 ? 'orange' : 'red' }}>
                                {rate} / 5
                            </Text>
                        </View>
                    </View>
                    {
                        !item.isAddedToCart ?
                            <TouchableOpacity
                                style={{ backgroundColor: 'orange', borderRadius: 4, justifyContent: 'center', alignItems: 'center', marginTop: 4, paddingVertical: 4, width: '100%' }}
                                onPress={() => call()}
                            >
                                <Text style={{ fontSize: 18, color: 'white', fontWeight: 500 }}>
                                    Add to Cart
                                </Text>
                            </TouchableOpacity> :
                            <View style={{ flexDirection: 'row', marginTop: 20, borderColor: 'black', borderWidth: 2, justifyContent: 'space-between' }}>
                                <TouchableOpacity
                                    style={{ borderWidth: 2, borderColor: 'grey', paddingVertical: 4, paddingHorizontal: 30 }}
                                    onPress={() => {
                                        onPressMinus()
                                        setCounter(counter - 1)
                                        if (item.quantityInCart < 1) {
                                            item.isAddedToCart = false
                                            // setCounter(1)
                                        }
                                    }}
                                >
                                    <Text style={{ fontSize: 20, color: 'black', fontWeight: 500 }}>
                                        -
                                    </Text>
                                </TouchableOpacity>
                                <View style={{ paddingVertical: 4, paddingHorizontal: 20, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: 14, color: 'black', fontWeight: 500 }}>
                                        {item.quantityInCart}
                                    </Text>
                                </View>
                                <TouchableOpacity
                                    style={{ borderWidth: 2, borderColor: 'grey', paddingVertical: 4, paddingHorizontal: 30 }}
                                    onPress={() => {
                                        setCounter(counter + 1)
                                        onPressPlus()
                                    }}
                                >
                                    <Text style={{ fontSize: 20, color: 'black', fontWeight: 500 }}>
                                        +
                                    </Text>
                                </TouchableOpacity>
                            </View>
                    }
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default ProductCard