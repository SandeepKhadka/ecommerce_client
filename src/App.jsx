import { BrowserRouter } from "react-router-dom"
import Header from "./components/Header"
import Banner from "./components/Banner"

function App() {

  return (
    <>
      <BrowserRouter>
        <Header />
        <Banner />
      </BrowserRouter>
    </>
  )
}

export default App
