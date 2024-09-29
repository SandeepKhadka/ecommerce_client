import { BrowserRouter, Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Banner from "./components/Banner"

import Product from "./components/Product";
import Home from "./pages/Home";
import Products from "./pages/Products";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setUser } from "./features/user/userSlice";

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      const userData = jwtDecode(token);
      dispatch(setUser(userData))
    }
  }, [])


  return (
    <>
      {/* <BrowserRouter> */}
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
      </Routes>



      {/* </BrowserRouter> */}
    </>
  )
}

export default App
