import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

const Checkout = () => {
    const [cartProducts, setCartProducts] = useState([])
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const navigate = useNavigate()


    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            setIsAuthenticated(true)
            const storedCart = JSON.parse(localStorage.getItem('cart')) || []
            setCartProducts(storedCart)
        } else {

            alert('You need to be logged in to proceed to checkout!')
            navigate('/myCart')
        }
    }, [navigate])

    const totalPrice = cartProducts.reduce((acc, product) => acc + product.price * product.quantity, 0)
    console.log(totalPrice);


    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior

        const products = cartProducts.map((product) => ({
            _id: product.id,
            title: product.title, // Use title from cart
            quantity: product.quantity, // Use quantity from cart
            price: product.price, // Use price from cart
        }));

        const shipping_address = {
            "full_name": event.target.full_name.value,
            "city": event.target.city.value,
            "country": event.target.country.value,
            "postal_code": event.target.postal_code.value,
            "address": event.target.address.value,
        };

        const paymentMethod = event.target.paymentMethod.value;
        const orderData = { products, shipping_address, paymentMethod, totalPrice }

        try {
            const response = await axios.post('http://localhost:8000/api/orders', orderData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`, // Send token for authentication
                },
            });

            if (response.status === 200) {
                if (response.data.links) {
                    window.location.href = response.data.links[1].href
                } else {
                    const order_id = response.data.order_id;
                    navigate(`/?order_id=${order_id}`);
                }
            } else {
                throw new Error('Failed to place order');
            }
        } catch (error) {
            console.error(error);
            alert('Error placing order. Please try again.');
        }
    };

    return isAuthenticated ? (
        <div className="container mx-auto p-6">
            <h1 className="text-4xl font-bold text-center mb-8">Checkout</h1>
            <ToastContainer />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Order Summary */}
                <div className="bg-white p-6 shadow-lg rounded-lg">
                    <h2 className="text-2xl font-bold mb-4">Order Summary</h2>

                    {cartProducts.length > 0 ? (
                        <>
                            <div className="space-y-4">
                                {cartProducts.map((product) => (
                                    <div key={product.id} className="flex justify-between items-center">
                                        <div className="flex items-center">
                                            <img src={"http://localhost:8000/" + product.imgSrc} alt={product.title} className="h-16 w-16 object-cover rounded-md mr-4" />
                                            <div>
                                                <p className="text-lg font-semibold">{product.title}</p>
                                                <p className="text-gray-600">Quantity: {product.quantity}</p>
                                            </div>
                                        </div>
                                        <p className="text-lg font-bold">${(product.price * product.quantity).toFixed(2)}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-gray-200 mt-6 pt-6">
                                <p className="text-lg font-semibold text-gray-700">Total: ${totalPrice.toFixed(2)}</p>
                            </div>
                        </>
                    ) : (
                        <p>Your cart is empty.</p>
                    )}
                </div>

                {/* Payment and Shipping Form */}
                <div className="bg-white p-6 shadow-lg rounded-lg">
                    <h2 className="text-2xl font-bold mb-4">Payment & Shipping</h2>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        {/* Shipping Information */}
                        <div>
                            <label className="block text-gray-700">Full Name</label>
                            <input
                                type="text"
                                className="w-full p-2 border border-gray-300 rounded-lg"
                                placeholder="Enter your full name"
                                name='full_name'
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700">Shipping Address</label>
                            <input
                                type="text"
                                className="w-full p-2 border border-gray-300 rounded-lg"
                                placeholder="Enter your shipping address"
                                name='address'
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-700">City</label>
                                <input
                                    type="text"
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                    placeholder="Enter city"
                                    name='city'
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">Postal Code</label>
                                <input
                                    type="text"
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                    placeholder="Enter postal code"
                                    name='postal_code'
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-700">Country</label>
                            <input
                                type="text"
                                className="w-full p-2 border border-gray-300 rounded-lg"
                                placeholder="Enter country"
                                name='country'
                            />
                        </div>

                        {/* Payment Information */}
                        <h3 className="text-xl font-semibold mt-6">Payment Information</h3>

                        <div className="mt-4">
                            <label className="block text-gray-700">Select Payment Method</label>

                            <div className="flex items-center mt-2">
                                <input
                                    type="radio"
                                    id="cod"
                                    name="paymentMethod"
                                    value="COD"
                                    className="mr-2"
                                />
                                <label htmlFor="cod" className="text-gray-700">Cash on Delivery (COD)</label>
                            </div>

                            <div className="flex items-center mt-2">
                                <input
                                    type="radio"
                                    id="paypal"
                                    name="paymentMethod"
                                    value="paypal"
                                    className="mr-2"
                                />
                                <label htmlFor="paypal" className="text-gray-700">Paypal</label>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors mt-4"
                        >
                            Place Order
                        </button>
                    </form>
                </div>
            </div>
        </div>
    ) : null
}

export default Checkout
