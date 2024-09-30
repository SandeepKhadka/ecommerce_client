import axios from 'axios';
import React, { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';

const ProductPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newProduct, setNewProduct] = useState({
        name: '',
        price: '',
        description: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res = axios.post("http://localhost:8000/api/admin/products",{
                title : newProduct.name,
                price : newProduct.price,
                description : newProduct.description,
                token: localStorage.getItem("token")

            })
            if(res){
                alert("Product added successfully")
            }
            
        } catch (err) {
            console.log(err);

        }

    };


    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Admin Product Page</h1>
            <button
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition duration-300"
                onClick={() => setIsModalOpen(true)}
            >
                <AiOutlinePlus className="mr-2" /> Add Product
            </button>

            {/* Product List (Placeholder) */}
            <div className="mt-4">
                <h2 className="text-xl font-semibold">Product List</h2>
                <table className="min-w-full mt-2 border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border px-4 py-2">Name</th>
                            <th className="border px-4 py-2">Price</th>
                            <th className="border px-4 py-2">Description</th>
                            <th className="border px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Placeholder for product rows */}
                        <tr>
                            <td className="border px-4 py-2">Product 1</td>
                            <td className="border px-4 py-2">$20.00</td>
                            <td className="border px-4 py-2">Description</td>
                            <td className="border px-4 py-2">
                                <button className="text-blue-600">Edit</button>
                                <button className="text-red-600 ml-2">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Add Product Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded shadow-lg p-6 w-96">
                        <h2 className="text-xl font-bold mb-4">Add New Product</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={newProduct.name}
                                    onChange={handleInputChange}
                                    className="border w-full p-2 rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Price</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={newProduct.price}
                                    onChange={handleInputChange}
                                    className="border w-full p-2 rounded"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Description</label>
                                <textarea
                                    name="description"
                                    value={newProduct.description}
                                    onChange={handleInputChange}
                                    className="border w-full p-2 rounded"
                                    required
                                ></textarea>
                            </div>
                            <div className="flex justify-between">
                                <button
                                    type="button"
                                    className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
                                >
                                    Add Product
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductPage;
