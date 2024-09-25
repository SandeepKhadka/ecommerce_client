import { useEffect, useState } from "react"
import Banner from "../components/Banner"
import Product from "../components/Product"
import axios from "axios"

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Home = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        axios.get("https://dummyjson.com/products?limit=10")
            .then(res => setProducts(res.data.products)
            )
    }, [])
    return (
        <>
            <Banner />
            <div className="container my-24">
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-4">
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
                                <Product title={el.title} price={el.price} imgSrc={el.images[0]} />
                            ))
                    }


                </div>

            </div>

        </>
    )
}

export default Home
