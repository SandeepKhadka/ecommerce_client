import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Header from "./client/components/Header"
import AdminHome from "./admin/pages/Home"
import Home from "./client/pages/Home";
import Products from "./client/pages/Products";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setUser } from "./features/user/userSlice";
import ProductPage from "./admin/pages/Product";

function App() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user.user)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      const userData = jwtDecode(token);
      dispatch(setUser(userData))
    }
  }, [])

  console.log(user?.role);


  return (
    <>
      {
        user?.role == "admin" ? <>
          <Routes>
            <Route path="/admin/*" element={<AdminHome />} />
            {/* <Route path="/admin/product" element={<ProductPage />} /> */}
            <Route path="*" element={<Navigate to="/admin" />} />

          </Routes>

        </>
          :
          <>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
            </Routes>
          </>
      }




    </>
  )
}

export default App
