import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Header from '../components/Header'
import { ApiContext } from '../components/ApiContext'

const ProductDetails = ({ route, navigation }) => {
    const { item } = route.params
    const { addToCart } = useContext(ApiContext)
    const [add, setAdd] = useState(false)
    const { image, title, price, category, description } = item
    const { rate, count } = item.rating
    const review = rate > 3.5 ? "Good" : rate > 2 && rate < 3.5 ? "Average" : "Bad"
    return (
        <View style={{ flex: 1, backgroundColor: '#002e65', paddingHorizontal: 16, paddingTop: 4 }}>
            <Header
                onPressHome={() => navigation.goBack()}
                onPressCart={() => navigation.navigate('Cart')}
                onPressLogout={async () => {
                    await AsyncStorage.removeItem('Email')
                    await AsyncStorage.removeItem('Password')
                    navigation.navigate('Login')
                }}
            />
            <ScrollView style={{ flex: 1, marginTop: 10 }}>
                <View style={{ backgroundColor: 'white', paddingHorizontal: 8, marginBottom: 40, borderRadius: 16 }}>
                    <Image
                        src={image}
                        style={{ height: 250, width: 200, marginVertical: 15, alignSelf: 'center' }}
                    />
                    <Text style={{ fontSize: 22, color: 'black', fontWeight: 500, marginTop: 15 }}>
                        {title}
                    </Text>
                    <View style={{ flexDirection: 'row', marginTop: 8, }}>
                        <Text style={{ fontSize: 18, color: 'black', fontWeight: 500 }}>
                            Price:
                        </Text>
                        <Text style={{ fontSize: 18, color: 'grey', fontWeight: 500, marginLeft: 8 }}>
                            $ {price}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 8, }}>
                        <Text style={{ fontSize: 18, color: 'black', fontWeight: 500 }}>
                            Category:
                        </Text>
                        <Text style={{ fontSize: 18, color: 'grey', fontWeight: 500, marginLeft: 8 }}>
                            {category}
                        </Text>
                    </View>
                    <Text style={{ fontSize: 20, color: 'grey', marginTop: 6 }}>
                        {description}
                    </Text>
                    <Text style={{ fontSize: 20, color: 'grey', marginTop: 6 }}>
                        Ratings given by previous buyers of the product:
                    </Text>
                    <Text style={{ fontSize: 20, color: rate > 3 ? 'green' : rate < 3 && rate > 2 ? 'orange' : 'red', marginTop: 4 }}>
                        {rate} / 5, {review} Review
                    </Text>

                    {
                        count > 0 ? <Text style={{ fontSize: 20, color: 'green', marginTop: 6 }}>In stock</Text> : <Text style={{ fontSize: 14, color: 'red', marginTop: 4 }}>Out of stock</Text>
                    }
                    <TouchableOpacity
                        onPress={() => {
                            addToCart(item)
                            setAdd(true)
                        }}
                        style={{ backgroundColor: !add ?  'orange' : 'grey', borderRadius: 4, justifyContent: 'center', alignItems: 'center', marginVertical: 6, paddingVertical: 4, width: '100%' }}
                    >
                        <Text style={{ fontSize: 18, color: 'white', fontWeight: 500 }}>
                            { !add ? 'Add to Cart' : 'Added to Cart'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}

export default ProductDetails