import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { ToastContainer, toast } from 'react-toastify';


const ProductPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newProduct, setNewProduct] = useState({
        name: '',
        price: '',
        description: '',
        image: null
    });

    const [products, setProducts] = useState([])
    const [isEditing, setIsEditing] = useState(false)
    const [editProduct, setEditProduct] = useState(null)

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await axios.get("http://localhost:8000/api/products", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            if (response.status === 200) {

                setProducts(response.data.products)
            }
        }

        fetchProducts()

    }, [])
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setNewProduct((prev) => ({ ...prev, image: e.target.files[0] }));
    }

    const handleEditProduct = (product) => {
        setEditProduct(product)
        setIsModalOpen(true)
        setIsEditing(true)
        setNewProduct({
            name: product.title,
            price: product.price,
            description: product.description,
            image: null
        })

    }

    const handleDeleteProduct = async (product) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this product?")


        try {
            if (confirmDelete) {

                const response = await axios.delete(`http://localhost:8000/api/admin/products/${product._id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })

                if (response.status === 200) {
                    toast.success("Product deleted successfully")

                } else {
                    toast.error("There was an error while deleting product")
                }
            }
        }
        catch (err) {
            console.error("The error is : ", err);

        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append('title', newProduct.name)
        formData.append('price', newProduct.price)
        formData.append('description', newProduct.description)
        formData.append('image', newProduct.image)
        try {
            if (isEditing && editProduct) {
                const response = await axios.put(`http://localhost:8000/api/admin/products/${editProduct._id}`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                if (response.status === 200) {
                    toast.success("Product updated successfully")
                    setIsEditing(false)

                } else {
                    toast.error("There was an error while updating product")
                }

            } else {
                const response = await axios.post("http://localhost:8000/api/admin/products", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                // let response = await axios.post("http://localhost:8000/api/admin/products", {
                //     title: newProduct.name,
                //     price: newProduct.price,
                //     description: newProduct.description,
                //     token: localStorage.getItem("token"),
                //     image : newProduct.image
                // })

                if (response.status === 200) {
                    toast.success("Product added successfully")

                } else {
                    toast.error("There was an error while adding product")
                }
            }
            setIsModalOpen(false)
            setIsEditing(false)
            setEditProduct(null)
            setNewProduct({ name: '', price: '', description: '' })



        } catch (err) {
            console.error('error posting product', err);

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
            <ToastContainer />
            {/* Product List (Placeholder) */}
            <div className="mt-4">
                <h2 className="text-xl font-semibold">Product List</h2>
                <table className="min-w-full mt-2 border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border px-4 py-2">Name</th>
                            <th className="border px-4 py-2">Price</th>
                            <th className="border px-4 py-2">Image</th>
                            <th className="border px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Placeholder for product rows */}
                        {
                            products.length > 0 ? (products.map(product => (
                                <tr key={product.id}>
                                    <td className="border px-4 py-2">{product.title}</td>
                                    <td className="border px-4 py-2">${product.price}</td>
                                    <td className="border px-4 py-2"><img src={"http://localhost:8000/" + product.image} alt={product.title} className='h-36' /></td>
                                    <td className="border px-4 py-2">
                                        <button className="text-blue-600" onClick={() => handleEditProduct(product)}>Edit</button>
                                        <button className="text-red-600 ml-2" onClick={() => handleDeleteProduct(product)}>Delete</button>
                                    </td>
                                </tr>
                            ))) :

                                <tr>
                                    <td className="border px-4 py-2" colSpan={4}>No Products found</td>

                                </tr>
                        }

                    </tbody>
                </table>
            </div>

            {/* Add Product Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded shadow-lg p-6 w-96">
                        <h2 className="text-xl font-bold mb-4">{isEditing == true ? "Edit Product" : "Add New Product"}</h2>
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
                                <label className="block text-gray-700">Image</label>
                                <input
                                    type="file"
                                    name="image"
                                    onChange={handleFileChange}
                                    className="border w-full p-2 rounded"

                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Description</label>
                                <textarea
                                    name="description"
                                    value={newProduct.description}
                                    onChange={handleInputChange}
                                    className="border w-full p-2 rounded"

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
                                    {isEditing == true ? "Edit Product" : "Add Product"}
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
