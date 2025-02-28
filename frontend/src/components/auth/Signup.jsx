import React, { useState } from "react";
import SignupImage from "./../../assets/auth/signup.svg";
import CommonAuthLayout from "./CommonAuthLayout";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "./../../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../../utils/userSlice";

function Signup() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showToast, setShowToast] = useState(null);
  const dispatch = useDispatch();

  async function SignupButtonFunction() {
    try {
      if (!email || !password) {
        setShowToast("Please enter all details");
        setTimeout(() => setShowToast(null), 3000);
        return;
      }
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          emailId: email,
          password,

          playerId: OneSignal.User.PushSubscription.id,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      return navigate("/profile");
    } catch (err) {
      console.log(err);
      setShowToast(err?.response?.data || "Something went wrong");
      setTimeout(() => setShowToast(null), 3000);
    }
  }

  return (
    <div className="flex flex-col w-screen">
      <div className="flex-1  mt-4">
        <Link to="/" className="btn btn-ghost ml-8 text-xl">
          👩‍💻 InterestFusion
        </Link>
      </div>
      <div className="flex mx-16  lg:mx-32 justify-between">
        <img
          src={SignupImage}
          className="h-[500px] w-[450px] mt-8 hidden lg:block  "
        />
        <dev className="flex flex-col justify-start mt-12 mr-20 w-full lg:w-5/12 ">
          <p className="text-3xl font-semibold my-4">Sign up</p>
          <p>
            Let’s get you all st up so you can access your personal account.
          </p>

          <div className="flex mt-5">
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
              className="w-full mb-1 mt-3 px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
              className="w-full ml-2 mb-1 mt-3 px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full mt-2 px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder=" Password "
            className="w-full mb-10 mt-3  px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {showToast != null && (
            <div className="toast toast-top toast-end">
              <div className="alert alert-error">
                <span>{showToast}</span>
              </div>
            </div>
          )}
          <button
            type="submit"
            onClick={SignupButtonFunction}
            className="w-full px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
          >
            Sign up
          </button>
          <div className="flex mt-6 justify-center">
            <p className="text-sm  ">Already have an account?</p>
            <a
              onClick={() => {
                navigate("/login");
              }}
              className="text-[#FF8682] text-sm ml-1.5 font-semibold cursor-pointer"
            >
              Login
            </a>
          </div>
        </dev>
      </div>
    </div>
  );
}

export default Signup;
