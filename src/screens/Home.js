import React, { useContext, useState } from 'react'
import { View, FlatList, Text } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Header from '../components/Header';
import { ApiContext } from '../components/ApiContext';
import ProductCard from '../components/ProductCard';
import SnackBar from '../components/SnackBar';
import ImageModal from '../components/ImageView';

const Home = ({ navigation }) => {
  const [show, setShow] = useState(false)
  const [item, setItem] = useState({})
  const [showSnackBar, setShowSnackBar] = useState(false)
  const { cart, products, addToCart, removeFromCart } = useContext(ApiContext);

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

  return (
    <View style={{
      flex: 1, backgroundColor: '#002e65',
      paddingHorizontal: 16, paddingTop: 10,
    }}>
      <Header
        onPressLogout={async () => {
          await AsyncStorage.getAllKeys().then((keys) =>
            AsyncStorage.multiRemove(keys)
          );
          navigation.navigate('Login')
        }}
        isHome={true}
        onPressCart={() => navigation.navigate('Cart')}
        count={itemsInCart} />

      <FlatList
        showsVerticalScrollIndicator={false}
        data={products}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ProductCard
            id={item.id}
            onPressImage={() => {
              setItem(item)
              setShow(true)
            }}
            src={item.image}
            onPressCard={() => {
              navigation.navigate('ProductDetails', { item: item })
            }}
            title={item.title}
            price={item.price}
            category={item.category}
            count={item.rating.count}
            rate={item.rating.rate}
            onPressAdd={() => {
              addToCart(item)
              setShowSnackBar(true)
            }}
            counter={item.quantity}
            onPressMinus={() => handleDecrement(item)}
            onPressPlus={() => handleIncrement(item)}
            onPressGoToCart={() => navigation.navigate('Cart')}
          />
        )}
        ListEmptyComponent={(<Text style={{ textAlign: 'center', color: 'white' }}>No Data</Text>)}
      />
      {
        showSnackBar ?
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <SnackBar
              mainStyle={{ position: 'absolute', bottom: 0, width: '100%' }}
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

export default Home