import React from 'react'
import Chair from "../assets/chair.png"
import { IoCartOutline } from "react-icons/io5";

const Product = ({imgSrc, title, price}) => {
    return (
        <div className="relative shadow-xl text-center border-transparent hover:border hover:border-primary group">
            <img src={imgSrc} alt="" className="mx-auto h-36" />
            <div className="group-hover:bg-[#2F1AC4] p-4">
                <p className="text-secondary font-bold text-lg group-hover:text-white">{title}</p>
                <p className="text-[#151875] text-sm group-hover:text-white">${price}</p>
            </div>
            <span className="hidden group-hover:inline-block p-4 border border-2 absolute top-4 left-4 rounded-full bg-[#EEEFFB] cursor-pointer"
                onClick={() => { alert("add to cart") }}
            >
                <IoCartOutline className="text-primary-dark text-2xl" />
            </span>
        </div>
    )
}

export default Product
