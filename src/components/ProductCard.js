import { View, Text, TouchableOpacity, Image, } from 'react-native'
import React from 'react'

const ProductCard = ({ onPressImage, src, onPressCard, title, price, category, count, rate, onPressAdd, add }) => {
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
                    <TouchableOpacity
                        style={{ backgroundColor: {add} ? 'orange' : 'grey', borderRadius: 4, justifyContent: 'center', alignItems: 'center', marginTop: 4, paddingVertical: 4, width: '100%' }}
                        onPress={onPressAdd}
                    >
                        <Text style={{ fontSize: 18, color: 'white', fontWeight: 500 }}>
                            Add to Cart
                            
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default ProductCard