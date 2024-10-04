import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { removeFromCart, increaseQuantity, decreaseQuantity } from '../../features/cart/cartSlice'
import { Link } from 'react-router-dom'

const ProductCart = () => {
    const [cartProducts, setCartProducts] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || []
        setCartProducts(storedCart)
    }, [])

    const updateCartInLocalStorage = (updatedCart) => {
        setCartProducts(updatedCart)
        localStorage.setItem('cart', JSON.stringify(updatedCart))
    }

    const handleIncreaseQuantity = (id) => {
        const updatedCart = cartProducts.map(product =>
            product.id === id ? { ...product, quantity: product.quantity + 1 } : product
        )
        updateCartInLocalStorage(updatedCart)
        dispatch(increaseQuantity(id))
        alert('Product updated')
    }

    const handleDecreaseQuantity = (id) => {
        const updatedCart = cartProducts.map(product =>
            product.id === id && product.quantity > 1 ? { ...product, quantity: product.quantity - 1 } : product
        )
        updateCartInLocalStorage(updatedCart)
        dispatch(decreaseQuantity(id))
        alert('Product updated')
    }

    const handleRemoveFromCart = (product) => {
        const updatedCart = cartProducts.filter(el => el.id !== product.id)
        updateCartInLocalStorage(updatedCart)
        dispatch(removeFromCart(product))
        alert('Product removed')
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className='text-center text-4xl font-bold mb-8'>My Cart</h1>

            {cartProducts.length > 0 ? (
                <>
                    <div className="space-y-6">
                        {cartProducts.map((el, index) => (
                            <div
                                key={index}
                                className="flex items-center p-4 bg-white shadow-md rounded-lg transition-transform transform hover:scale-105"
                            >
                                <div className="w-1/4">
                                    <img src={"http://localhost:8000/" + el.imgSrc} alt={el.title} className='h-36 object-cover rounded-md' />
                                </div>
                                <div className="w-3/4 pl-6 flex flex-col justify-between">
                                    <div>
                                        <p className="text-lg font-semibold text-gray-700">{el.title}</p>
                                        <p className="text-primary text-xl font-bold">${el.price}</p>
                                    </div>
                                    <div className="flex items-center mt-4">
                                        <div className="flex items-center space-x-2">
                                            <button
                                                className="px-2 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                                                onClick={() => handleDecreaseQuantity(el.id)}
                                            >-</button>
                                            <span className="px-4 py-1 bg-gray-100 text-gray-700 rounded">{el.quantity}</span>
                                            <button
                                                className="px-2 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                                                onClick={() => handleIncreaseQuantity(el.id)}
                                            >+</button>
                                        </div>
                                        <button
                                            className="ml-6 px-4 py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600"
                                            onClick={() => handleRemoveFromCart(el)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 text-center">
                        <Link to="/checkout">
                            <button
                                className="px-6 py-3 bg-green-500 text-white font-bold text-lg rounded-lg hover:bg-green-600 transition-colors"
                            >
                                Proceed to Checkout
                            </button>
                        </Link>
                    </div>
                </>
            ) : (
                <p className="text-center text-gray-500 text-lg">Your cart is empty.</p>
            )}
        </div>
    )
}

export default ProductCart
