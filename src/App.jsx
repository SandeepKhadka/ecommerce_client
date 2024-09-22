import { CiMail, CiPhone, CiUser } from "react-icons/ci";
function App() {

  return (
    <>
      <header className="bg-primary text-white text-center sm:flex sm:justify-between p-3">
        <div>
          <span><CiMail className="inline" />
            mhhasanul@gmail.com</span>
          <span className="ml-4"><CiPhone className="inline" />(12345)67890</span>

        </div>
        <div>
          <span>
            <CiUser className="inline" />
            login
          </span>

        </div>

      </header>
    </>
  )
}

export default App
