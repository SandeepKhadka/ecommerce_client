import { BrowserRouter } from "react-router-dom"
import Header from "./components/Header"
import Banner from "./components/Banner"
import Chair from "./assets/chair.png"
import { IoCartOutline } from "react-icons/io5";

function App() {

  return (
    <>
      {/* <BrowserRouter> */}
      <Header />
      <Banner />
      <div className="container my-24">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-4">
          {
            [1, 2, 3, 4].map(() => (
              <div className="shadow-xl text-center border-transparent hover:border hover:border-primary group">
                <img src={Chair} alt="" className="mx-auto" />
                <div className="group-hover:bg-[#2F1AC4] p-4">
                  <p className="text-secondary font-bold text-lg group-hover:text-white">Product</p>
                  <p className="text-[#151875] text-sm group-hover:text-white">$100</p>
                </div>
                <IoCartOutline />
              </div>))
          }


        </div>

      </div>


      {/* </BrowserRouter> */}
    </>
  )
}

export default App
