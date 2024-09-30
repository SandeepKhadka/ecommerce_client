import React from 'react';
import Dashboard from '../components/Dashboard';
import Sidebar from '../components/Sidebar';
import Product from './Product';
import { Route, Routes } from 'react-router-dom';

const Home = () => {
    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div className="w-64 bg-gray-800">
                <Sidebar />
            </div>

            <div className="flex-1">
                <Routes>
                    {/* <Route path="/" element={<Dashboard />} /> */}
                    <Route path="/" element={<Product />} />
                </Routes>
            </div>
        </div>
    );
};

export default Home;
