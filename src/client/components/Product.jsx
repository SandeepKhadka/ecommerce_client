import React from 'react'
import { IoCartOutline } from "react-icons/io5";
import { useSelector, useDispatch } from 'react-redux'
import { addToCart } from '../../features/cart/cartSlice'


/* props ={name,price,imgSrc} */

export default function Product({ id, title, price, imgSrc }) {
    const dispatch = useDispatch()

    const handleAddToCart = () => {
        dispatch(addToCart({ id, title, price, imgSrc }))

        let cart = JSON.parse(localStorage.getItem("cart")) || []

        const itemExists = cart.some(item => item.id === id)

        if (!itemExists) {
            cart.push({ id, title, price, imgSrc, quantity: 1 })
            localStorage.setItem("cart", JSON.stringify(cart))

            alert("Product added to cart")
        } else {
            alert("Product already in cart")
        }
    }

    return <div className="relative shadow-xl text-center border-transparent hover:border hover:border-primary group">
        <img src={"http://localhost:8000/" + imgSrc} alt="" className="mx-auto h-36" />
        <div className="group-hover:bg-[#2F1AC4] p-4">
            <p className="text-secondary font-bold text-lg group-hover:text-white">{title}</p>
            <p className="text-[#151875] text-sm group-hover:text-white">${price}</p>
        </div>
        <span className="hidden group-hover:inline-block p-4 border border-2 absolute top-4 left-4 rounded-full bg-[#EEEFFB] cursor-pointer"
            onClick={handleAddToCart}
        >
            <IoCartOutline className="text-primary-dark text-2xl" />
        </span>
    </div>
}
