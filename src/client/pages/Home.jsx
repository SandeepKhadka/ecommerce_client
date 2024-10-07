import Banner from "../components/Banner"
import Product from "../components/Product"
import { useEffect, useState } from "react"
import axios from "axios"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useLocation, useNavigate, } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify"

const Home = () => {
    const [products, setProducts] = useState([])
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const [isOrderPlaced, setIsOrderPlaced] = useState(false);
    const navigate = useNavigate()

    // Extract the PayerID
    const PayerID = queryParams.get('token');
    const OrderID = queryParams.get('order_id');


    useEffect(() => {
        axios.get("http://localhost:8000/api/products")
            .then(res => setProducts(res.data.products))
    }, [])
    useEffect(() => {
        const fetchOrder = async () => {
            if (!isOrderPlaced) {
                if (PayerID) { // Check if toast is already shown
                    try {
                        const response = await axios.get(`http://localhost:8000/api/orders/capture/${PayerID}`, {
                            headers: {
                                'Authorization': `Bearer ${localStorage.getItem('token')}`, // Send token for authentication
                            },
                        });

                        if (response) {
                            toast.success("Order placed successfully");
                            setIsOrderPlaced(true); // Mark order as placed to prevent further toasts
                            localStorage.removeItem("cart")
                            navigate('/')

                        }
                    } catch (err) {
                        console.log(err);
                        navigate('/')
                    }
                }
                else if (OrderID) {
                    toast.success("Order placed successfully");
                    setIsOrderPlaced(true);
                    localStorage.removeItem("cart")
                    navigate('/')
                }
            }

        };

        fetchOrder();
    }, []);

    return (
        <>
            <Banner />
            <ToastContainer />
            <div className="container my-20">
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {
                        products.length === 0 ?
                            <>
                                <Skeleton count={5} height={20} />
                                <Skeleton count={5} height={20} />
                                <Skeleton count={5} height={20} />
                                <Skeleton count={5} height={20} />
                            </>

                            :
                            products.map((el) => (
                                <Product id={el._id} title={el.title} price={el.price} imgSrc={el.image} />
                            ))
                    }
                </div>


            </div>
        </>
    )
}

export default Home
