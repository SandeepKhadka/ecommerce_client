import { BrowserRouter, Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Banner from "./components/Banner"

import Product from "./components/Product";
import Home from "./pages/Home";
import Products from "./pages/Products";

function App() {

  return (
    <>
      {/* <BrowserRouter> */}
      <Header />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/products" element={<Products />}/>
      </Routes>
     


      {/* </BrowserRouter> */}
    </>
  )
}

export default App
