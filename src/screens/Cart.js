import { View, Text, TouchableOpacity, FlatList, Modal } from 'react-native'
import React, { useState, useContext } from 'react'
import Header from '../components/Header'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Ionicon from 'react-native-vector-icons/Ionicons'
import { ApiContext } from '../components/ApiContext'
import CartCard from '../components/CartCard'

const Cart = ({ navigation }) => {

    const { cart, price, removeFromCart, addToCart, clearCart, removeProduct } = useContext(ApiContext)
    const [showModalCart, setShowModalCart] = useState(false)
    const [showModalProduct, setShowModalProduct] = useState(false)
    const [obj, setObj] = useState([])

    const handleIncrement = (item) => {
        addToCart(item)
    }
    const handleDecrement = (item) => {
        removeFromCart(item.id, item.price)
    }
    const removeSingleProduct = (product) => {
        removeProduct(product)
    }
    const countUniqueItems = () => {
        const uniqueItems = new Set(cart.map(item => item.id))
        return uniqueItems.size
    }
    const itemsInCart = countUniqueItems()
    const removeCart = () => {
        setShowModalCart(true)
    }

    return (
            <View style={{ flex: 1, backgroundColor: '#002e65', paddingHorizontal: 16, paddingTop: 8 }}>
                <Header
                    isCart={itemsInCart != 0 ? true : false}
                    onPressClear={removeCart}
                    onPressHome={() => navigation.navigate('Home')}
                    onPressLogout={async () => {
                        await AsyncStorage.removeItem('Email')
                        await AsyncStorage.removeItem('Password')
                        navigation.navigate('Login')
                    }}
                    count={itemsInCart}
                />
                <View style={{ flex: 1, justifyContent: 'space-between' }}>
                    <FlatList
                        data={cart}
                        ListEmptyComponent={
                            <View style={{
                                backgroundColor: 'white', paddingVertical: 16,
                                margin: 16, justifyContent: 'center', alignItems: 'center', borderRadius: 8
                            }}>
                                <Text style={{ fontSize: 20, fontWeight: 500, color: 'black' }}>
                                    Your cart is empty!
                                </Text>
                            </View>
                        }
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => {
                            return (
                                <CartCard
                                    SRC={item.image}
                                    itemTitle={item.title}
                                    itemPrice={item.price}
                                    itemCount={item.rating.count}
                                    itemId={item.id}
                                    onPressMinus={() => {
                                        handleDecrement(item)
                                        if (item.quantity === 1) {
                                            item.isAddedToCart = false
                                        }
                                    }}
                                    counter={item.quantity}
                                    onPressPlus={() => {
                                        handleIncrement(item)
                                    }}
                                    onPressRemove={() => {
                                        setShowModalProduct(true)
                                        setObj(item)
                                    }}
                                />
                            )
                        }}
                    />

                    {
                        cart.length ?
                            <>
                                <View style={{ borderWidth: 4, borderColor: 'white', padding: 8, marginTop: 16 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={{ fontSize: 20, fontWeight: 500, color: 'white' }}>
                                            Total :
                                        </Text>
                                        <Text style={{ fontSize: 20, fontWeight: 500, color: 'white' }}>
                                            $ {price.toFixed(2)}
                                        </Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', marginVertical: 8 }}>
                                    <TouchableOpacity
                                        style={{
                                            paddingVertical: 8, width: '50%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', borderRadius: 4, marginRight: 4
                                        }}
                                        onPress={() => navigation.navigate('Home')}
                                    >
                                        <Text style={{ fontSize: 16, fontWeight: 500, color: 'black' }}>
                                            Shop More
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={{
                                            paddingVertical: 8, width: '50%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'orange', borderRadius: 4
                                        }}
                                        onPress={() => {
                                            alert("Purchase Successful")
                                            navigation.navigate('Home')
                                            clearCart()
                                        }}
                                    >
                                        <Text style={{ fontSize: 16, fontWeight: 500, color: 'white' }}>
                                            Buy Now
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </> : ""
                    }
                </View>
                <Modal
                    visible={showModalCart}
                    animationType='fade'
                    transparent={true}
                >
                    <View
                        style={{
                            marginTop: 200, marginHorizontal: 50,
                            paddingVertical: 16, justifyContent: 'center',
                            backgroundColor: 'white', elevation: 20, borderRadius: 8
                        }} >
                        <View style={{ padding: 16 }}>
                            <Text style={{ fontSize: 20, fontWeight: 500, color: 'black', textAlign: 'center' }}>
                                Do you want to clear your cart?
                            </Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 10 }}>
                                <TouchableOpacity
                                    style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginRight: 4, borderWidth: 2, borderColor: 'black', padding: 4 }}
                                    onPress={() => {
                                        setShowModalCart(false)
                                    }}
                                >
                                    <Ionicon name='close' size={30} color='black' />
                                    <Text style={{ fontSize: 20, fontWeight: 500, color: 'black', marginLeft: 4 }}>
                                        NO
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: 'black', padding: 4 }}
                                    onPress={() => {
                                        clearCart()
                                        setShowModalCart(false)
                                    }}
                                >
                                    <Ionicon name='checkmark' size={30} color='black' />
                                    <Text style={{ fontSize: 20, fontWeight: 500, color: 'black', marginLeft: 4 }}>
                                        YES
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

                <Modal
                    visible={showModalProduct}
                    animationType='fade'
                    transparent={true}
                >
                    <View
                        style={{
                            marginTop: 200, marginHorizontal: 50,
                            paddingVertical: 16, justifyContent: 'center',
                            backgroundColor: 'white', elevation: 20, borderRadius: 8
                        }} >
                        <View style={{ padding: 16 }}>
                            <Text style={{ fontSize: 20, fontWeight: 500, color: 'black', textAlign: 'center' }}>
                                Do you want to remove this item from cart?
                            </Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 10 }}>
                                <TouchableOpacity
                                    style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginRight: 4, borderWidth: 2, borderColor: 'black', padding: 4 }}
                                    onPress={() => {
                                        setShowModalProduct(false)
                                    }}
                                >
                                    <Ionicon name='close' size={30} color='black' />
                                    <Text style={{ fontSize: 20, fontWeight: 500, color: 'black', marginLeft: 4 }}>
                                        NO
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: 'black', padding: 4 }}
                                    onPress={() => {
                                        removeSingleProduct(obj)
                                        setShowModalProduct(false)
                                    }}
                                >
                                    <Ionicon name='checkmark' size={30} color='black' />
                                    <Text style={{ fontSize: 20, fontWeight: 500, color: 'black', marginLeft: 4 }}>
                                        YES
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
    )
}

export default Cart