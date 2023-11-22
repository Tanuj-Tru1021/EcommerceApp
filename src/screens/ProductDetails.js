import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Header from '../components/Header'
import Ionicon from 'react-native-vector-icons/Ionicons'
import SnackBar from '../components/SnackBar'
import { ApiContext } from '../components/ApiContext'
import ImageModal from '../components/ImageView'

const ProductDetails = ({ route, navigation }) => {
    const { item } = route.params
    const { cart, addToCart, products, removeFromCart } = useContext(ApiContext)
    const [show, setShow] = useState(false)
    const [showSnackBar, setShowSnackBar] = useState(false)
    const [counter, setCounter] = useState(1)
    const { image, title, price, category, description, id } = item
    const { rate, count } = item.rating
    const review = rate > 3.5 ? "Good" : rate > 2 && rate < 3.5 ? "Average" : "Bad"

    const handleIncrement = (item) => {
        addToCart(item)
    }
    const handleDecrement = (item) => {
        removeFromCart(item.id, item.price)
    }
    const countUniqueItems = () => {
        const uniqueItems = new Set(cart.map(item => item.id))
        return uniqueItems.size
    }
    const itemsInCart = countUniqueItems()
    const call = () => {
        addToCart(item)
        obj.isAddedToCart = true
        obj.quantityInCart = 1
        setCounter(1)
    }

    const obj = products.find(el => el.id === id)

    return (
            <View style={{ flex: 1, backgroundColor: '#002e65', paddingHorizontal: 16, paddingTop: 8 }}>
                <Header
                    isHome={true}
                    onPressHome={() => navigation.goBack()}
                    onPressCart={() => navigation.navigate('Cart')}
                    onPressLogout={async () => {
                        await AsyncStorage.removeItem('Email')
                        await AsyncStorage.removeItem('Password')
                        navigation.navigate('Login')
                    }}
                    count={itemsInCart}
                />
                <ScrollView style={{ flex: 1, marginTop: 10 }}>
                    <View style={{ backgroundColor: 'white', paddingHorizontal: 8, marginBottom: 40, borderRadius: 16 }}>
                        <TouchableOpacity onPress={() => {
                            setShow(true)
                        }}>
                            <Image
                                src={image}
                                style={{ height: 250, width: 200, marginVertical: 15, alignSelf: 'center' }}
                            />
                        </TouchableOpacity>
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
                        {
                            !obj.isAddedToCart ?
                                <TouchableOpacity
                                    style={{ backgroundColor: 'orange', borderRadius: 4, justifyContent: 'center', alignItems: 'center', marginTop: 4, paddingVertical: 4, width: '100%', marginBottom: 10 }}
                                    onPress={() => call()}
                                >
                                    <Text style={{ fontSize: 18, color: 'white', fontWeight: 500 }}>
                                        Add to Cart
                                    </Text>
                                </TouchableOpacity> :
                                <View style={{ flexDirection: 'row', marginTop: 20, borderColor: 'black', borderWidth: 2, justifyContent: 'space-between', marginBottom: 10 }}>
                                    <TouchableOpacity
                                        style={{ paddingVertical: 4, paddingHorizontal: 30 }}
                                        onPress={() => {
                                            handleDecrement(item)
                                            setCounter(counter - 1)
                                            if (obj.quantityInCart < 1) {
                                                obj.isAddedToCart = false
                                            }
                                        }}
                                    >
                                        <Ionicon name="remove-circle" size={25} color='black' />
                                    </TouchableOpacity>
                                    <View style={{ paddingVertical: 4, paddingHorizontal: 20, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ fontSize: 14, color: 'black', fontWeight: 500 }}>
                                            {obj.quantityInCart}
                                        </Text>
                                    </View>
                                    <TouchableOpacity
                                        style={{ paddingVertical: 4, paddingHorizontal: 30 }}
                                        onPress={() => {
                                            setCounter(counter + 1)
                                            handleIncrement(item)
                                        }}
                                    >
                                        <Ionicon name="add-circle" size={25} color='black' />
                                    </TouchableOpacity>
                                </View>
                        }
                    </View>
                </ScrollView>
                {
                    showSnackBar ?
                        <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 16 }}>
                            <SnackBar
                                mainStyle={{ position: 'absolute', bottom: 0 }}
                                onPressOk={() => {
                                    setShowSnackBar(false)
                                }}
                            />
                        </View> : ""
                }

                <ImageModal
                    visible={show}
                    onPressBack={() => setShow(false)}
                    SRC={item.image}
                />
            </View>
    )
}

export default ProductDetails