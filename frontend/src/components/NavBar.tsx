import React, { useRef } from "react";
import Logo from "../assets/bg.jpg";
import { useNavigate } from "react-router-dom";
import { getLoginInfo } from "../utils/LoginInfo";
import { FcSalesPerformance } from "react-icons/fc";
import { FcApproval } from "react-icons/fc";
import { FcBusinessman } from "react-icons/fc";
import { FcHighPriority } from "react-icons/fc";
const NavBar = () => {
  let navigate = useNavigate();
  const role = getLoginInfo()?.role;

  return (
    <div>
     
      <div id="sidebar">
        <div className="logo">
           Todo App
        </div>
        <div className="nav">
          <a onClick={() => navigate("/active")}>
            <FcSalesPerformance className="f_size" /> Active todos
          </a>
          <a onClick={() => navigate("/completed")}>
            <FcApproval className="f_size" /> Completed
          </a>
          <a
            onClick={() => navigate("/users")}
            style={{ display: role != "ADMIN" ? "none" : "" }}
          >
            <FcBusinessman className="f_size" /> Users
          </a>
          <a
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
          >
            <FcHighPriority className="f_size" /> logout     
          </a>
        </div>
      </div>
      <div className="bg">
       <img src={Logo} alt="" />
      </div>
    </div>
    
  );
};

export default NavBar;
