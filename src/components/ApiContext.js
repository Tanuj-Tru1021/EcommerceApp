import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios';


export const ApiContext = createContext()

export const ApiProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [price, setPrice] = useState(0)


    const fetchData = async () => {
        try {
            const url = "https://fakestoreapi.com/products"
            const response = await axios.get(url)
            setProducts(response.data.map(obj => ({ ...obj, isAddedToCart: false })))
        } catch (error) {
            console.error('Error fetching API data', error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const addToCart = (product) => {
        const existingProductIndex = cart.findIndex(item => item.id === product.id)
        if (existingProductIndex !== -1) {
            const updatedCart = [...cart]
            updatedCart[existingProductIndex].quantity += 1
            setCart(updatedCart);

            const upadateProduct = products.map(item => item.id === product.id ? { ...item, quantityInCart: item.quantityInCart + 1 } : item)
            setProducts(upadateProduct)

        } else {
            setCart([...cart, { ...product, quantity: 1 }])
        }
        setPrice(price + product.price)
    };

    const removeFromCart = (productId, productPrice) => {
        const existingProduct = cart.find(item => item.id === productId)
        if (existingProduct && existingProduct.quantity > 1) {
            const updatedCart = cart.map(item => item.id === productId ? { ...item, quantity: item.quantity - 1 } : item)

            const upadateProduct = products.map(item => item.id === productId ? { ...item, quantityInCart: item.quantityInCart - 1 } : item)
            setProducts(upadateProduct)

            setCart(updatedCart)
        } else {
            const updatedCart = cart.filter(item => item.id !== productId);

            const upadateProduct = products.map(item => item.id === productId ? { ...item, isAddedToCart: false } : item)
            setProducts(upadateProduct)

            setCart(updatedCart)
        }
        setPrice(price - productPrice);
    }

    const clearCart = () => {
        const upadateProduct = products.map(item => { return { ...item, isAddedToCart: false, quantityInCart: 0 } })
        setProducts(upadateProduct)
        setCart([])
        setPrice(0)
    }

    const removeProduct = (product) => {
        setCart(cart.filter((e) => e.id !== product.id))
        setPrice(price - product.price * product.quantity)
        const upadateProduct = products.map(item => item.id === product.id ? { ...item, isAddedToCart: false } : item)
        setProducts(upadateProduct)
    }

    return (
        <ApiContext.Provider value={{ products, cart, price, addToCart, removeFromCart, clearCart, removeProduct }}>
            {children}
        </ApiContext.Provider>
    );
};
