import React from "react";
import { useNavigate } from "react-router-dom";
import { ApiConstants } from "../api/ApiConstants";
import Logo from "../assets/login.jpg";
import custom_axios from "../axios/AxiosSetup";
import { toast } from "react-toastify";
const Login = () => {
  let navigate = useNavigate();
  let email: any = React.useRef();
  let password: any = React.useRef();

  const loginApp = async () => {
    if (email.current.value == "" || password.current.value == "") {
      toast.info("Please fill the information");
      return;
    }
    try {
      const response = await custom_axios.post(ApiConstants.LOGIN, {
        email: email.current.value,
        password: password.current.value,
      });
      if(response.data.message){
        toast.error(response.data.message)
      }
      else{
        toast.success("login successfully")
      
      
      localStorage.setItem("token", response.data.token);
      dispatchEvent(new Event("storage"));
      navigate("/");}
    } catch (error: any) {
      if (error.response.status == 401) toast.warn(error.response.data.message);
    }

    // navigate("/");
  };

  return (
    <div className="flex items-center justify-center mt-12">
        <img src={Logo} alt="" />
      <div className="w-full max-w-md">
     
        <div className="bg-white rounded px-12 pt-6 pb-8 mb-4 custom_bgs">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-normal mb-2" htmlFor="username">
              Email
            </label>
            <input
              ref={email}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="email"
              v-model="form.email"
              type="email"
              placeholder="Email"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-normal mb-2" htmlFor="password">
              Password
            </label>
            <input
              ref={password}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              v-model="form.password"
              type="password"
              placeholder="Password"
              name="password"
              autoComplete="current-password"
            />
          </div>
          <div className="flex items-center justify-between">
            <button onClick={loginApp} className="px-4 py-2 rounded text-white inline-block shadow-lg bg-blue-500 hover:bg-blue-600 focus:bg-blue-700">
              Login
            </button>
            <a onClick={() => navigate("/signUp")} className="cursor-pointer inline-block align-baseline font-normal text-sm text-blue-500 hover:text-blue-800">
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
