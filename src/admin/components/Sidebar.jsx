import React from "react";
import { AiOutlineHome, AiOutlineUser, AiOutlineShoppingCart, AiOutlineSetting } from "react-icons/ai";
import { Link } from "react-router-dom";
import Product from "../pages/Product";

const Sidebar = () => {
    return (
        <div className="h-screen w-64 bg-gray-800 text-gray-100">
            {/* Sidebar header */}
            <div className="flex items-center justify-center h-20 border-b border-gray-700">
                <h1 className="text-3xl font-bold">MyApp</h1>
            </div>

            {/* Sidebar menu */}
            <nav className="mt-10">
                <ul>
                    <li>
                        <Link
                            to="/"
                            className="flex items-center px-4 py-3 hover:bg-gray-700 transition duration-300"
                        >
                            <AiOutlineHome className="text-2xl" />
                            <span className="ml-4 text-lg">Home</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/profile"
                            className="flex items-center px-4 py-3 hover:bg-gray-700 transition duration-300"
                        >
                            <AiOutlineUser className="text-2xl" />
                            <span className="ml-4 text-lg">Profile</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/product"
                            className="flex items-center px-4 py-3 hover:bg-gray-700 transition duration-300"
                        >
                            <AiOutlineShoppingCart className="text-2xl" />
                            <span className="ml-4 text-lg">Product</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/cart"
                            className="flex items-center px-4 py-3 hover:bg-gray-700 transition duration-300"
                        >
                            <AiOutlineShoppingCart className="text-2xl" />
                            <span className="ml-4 text-lg">Cart</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/settings"
                            className="flex items-center px-4 py-3 hover:bg-gray-700 transition duration-300"
                        >
                            <AiOutlineSetting className="text-2xl" />
                            <span className="ml-4 text-lg">Settings</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
