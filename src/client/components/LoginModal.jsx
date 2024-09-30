import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login, signUp } from '../../features/user/userSlice';
import axios from 'axios';

const LoginModal = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true); // Track whether to show login or sign-up
  const [formData, setFormData] = useState({ email: '', password: '' });
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        // dispatch(login(formData)); // Dispatch login action
        let response = await axios.post("http://localhost:8000/api/login", {
          email: formData.email,
          password: formData.password,
        })
        if (response.status == 200) {
          alert("Welcome")
          let user = response.data
          localStorage.setItem("token", response.data.token)
          dispatch(login(user))
        }

      } else {
        // dispatch(signUp(formData)); // Dispatch sign-up action
        let response = await axios.post("http://localhost:8000/api/signup", {
          email: formData.email,
          password: formData.password,
          name: formData.name,
        })
        if (response.status == 200) {
          let user = response.data
          console.log(user);

          alert("Signup successfull! Please Login")
        }
        else {
          alert("There was error while signing up")
        }

      }
      onClose(); // Close the modal after submitting
    } catch (err) {
      console.error("Unable to fetch data: ", err);

    }

  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-5 rounded shadow-lg w-80">
        <h2 className="text-2xl mb-4">{isLogin ? 'Login' : 'Sign Up'}</h2>
        <form onSubmit={handleSubmit}>
          {
            (!isLogin &&
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="border mb-2 p-1 w-full"
                required
              />
            )
          }
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="border mb-2 p-1 w-full"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="border mb-2 p-1 w-full"
            required
          />
          <button type="submit" className="bg-primary text-white p-2 w-full">
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
        <p className="text-center mt-2">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button onClick={() => setIsLogin(!isLogin)} className="text-secondary">
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
        <button onClick={onClose} className="text-red-500 mt-2">
          Close
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
