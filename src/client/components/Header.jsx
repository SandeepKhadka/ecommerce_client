import { AiOutlineMail, AiOutlineUser, AiOutlinePhone, AiOutlineSearch } from "react-icons/ai";
import { Link } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import { useState } from "react"; // Import useState for modal state management
import LoginModal from "./LoginModal";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/user/userSlice";

export default function Header() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // For toggling dropdown

  const handleLoginClick = () => {
    if (user) {
      setIsDropdownOpen(!isDropdownOpen); // Toggle dropdown when user is logged in
    } else {
      setIsModalOpen(true); // Open the modal when the login button is clicked
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };
  const handleLogout = () => {
    dispatch(logout()); // Dispatch logout action
    setIsDropdownOpen(false); // Close the dropdown after logout
  };

  return (
    <>
      <header>
        <div className="bg-primary">
          <div className="container py-3 text-center text-white sm:flex sm:justify-between">
            <div>
              <span>
                <AiOutlineMail className="inline" /> mhhasanul@gmail.com
              </span>
              <span className="ml-4">
                <AiOutlinePhone className="inline" />(12345)67890
              </span>
            </div>
            <div>
              <span className="mr-4">
                <Link to="myCart">
                  <IoCartOutline className="inline" /> My Cart
                </Link>
              </span>
              {console.log(user)
              }
              <span onClick={handleLoginClick} className="cursor-pointer">
                <AiOutlineUser className="inline" />
                {user ? user.name : 'login'}
              </span>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                  <ul className="py-1 text-gray-700">
                    <li>
                      <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</Link>
                    </li>
                    <li>
                      <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-gray-100">
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="container py-5 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-8 items-center">
            <p className="text-[#0D0E43] text-4xl font-bold">Hekto</p>
            <ul className="flex gap-4 items-center">
              <li>
                <Link to="/" className="text-secondary">Home</Link>
              </li>
              <li>
                <Link to="/products">Product</Link>
              </li>
            </ul>
          </div>
          <form className="flex">
            <input className="border focus:rounded border-black focus:border-secondary focus:outline-none" type="text" />
            <button className="bg-secondary p-1">
              <AiOutlineSearch className="text-white" />
            </button>
          </form>
        </div>
      </header>

      {isModalOpen && <LoginModal onClose={handleCloseModal} />} {/* Render modal if open */}
    </>
  );
}
