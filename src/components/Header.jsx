import { AiOutlineMail, AiOutlineUser, AiOutlinePhone, AiOutlineSearch } from "react-icons/ai"
import { Link } from "react-router-dom"


import React, { useState } from 'react'
import LoginModal from "./LoginModal";
import { useSelector } from "react-redux";



export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const user = useSelector(state => state.user.user)
  const isAuthenticated = useSelector(state => state.user.isAuthenticated)
  console.log(user);
  console.log(isAuthenticated);

  const handleLoginClick = () => {
    setIsModalOpen(true); // Open the modal when the login button is clicked
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };
  return <>
    <header>
      <div className=" bg-primary ">
        <div className="container py-3 text-center text-white sm:flex sm:justify-between ">
          <div>
            <span> <AiOutlineMail className="inline" /> mhhasanul@gmail.com</span>
            <span className="ml-4"><AiOutlinePhone className="inline" />(12345)67890</span>
          </div>
          <div>
            {
              (isAuthenticated == true) ? <span>{user.name }</span> :
                <span onClick={handleLoginClick} className="cursor-pointer">
                  <><AiOutlineUser className="inline" /> login</>

                </span>
            }
          </div>
        </div>
      </div>
      <div className="container py-5 flex flex-col sm:flex-row justify-between items-center">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-8 items-center">
          <p className="text-[#0D0E43] text-4xl font-bold">Hekto</p>
          <ul className="flex gap-4 items-center  ">
            <li><Link to="/" className="text-secondary">Home</Link></li>
            <li><Link to="/products">Product</Link></li>
          </ul>
        </div>
        <form className="flex ">
          <input className="border focus:rounded border-black focus:border-secondary focus:outline-none" type="text" />
          <button className="bg-secondary p-1">
            <AiOutlineSearch className="text-white" />
          </button>
        </form>
      </div>
    </header>
    {isModalOpen && <LoginModal onClose={handleCloseModal} />} {/* Render modal if open */}
  </>
}