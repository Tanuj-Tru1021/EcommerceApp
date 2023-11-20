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
            setProducts(response.data.map(obj => ({...obj, isAddedToCart: false})))
            // setProducts(products && products.map(obj => ({...obj, quantityInCart: 0})))
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
            } else {
                setCart([...cart, { ...product, quantity: 1 }])
            }

            setPrice(price + product.price)
        };

        const removeFromCart = (productId, productPrice) => {
            const existingProduct = cart.find(item => item.id === productId)

            if (existingProduct && existingProduct.quantity > 1) {
                const updatedCart = cart.map(item =>
                    item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
                )
                setCart(updatedCart)
            } else {
                const updatedCart = cart.filter(item => item.id !== productId);
                setCart(updatedCart)
            }

            setPrice(price - productPrice);
        }

        return (
            <ApiContext.Provider value={{ products, cart, price, addToCart, removeFromCart }}>
                {children}
            </ApiContext.Provider>
        );
    };
