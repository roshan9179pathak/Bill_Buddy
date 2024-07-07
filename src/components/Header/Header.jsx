import React, { useEffect, useState } from "react";
import "../../style/header.css";
import theme from "../../assets/icons8-sun.svg";
import logo from "../../assets/icons8-geometry-glyph-neue-96.png";
import { Link } from "react-router-dom";
import logout from "../../assets/logout.svg";
import { useSelector } from "react-redux";
export default function Header({ className, onClick }) {
  const authStatus = useSelector((state) => state.auth.status)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      setIsAuthenticated(true);
      setUserData(userData);
    }
  }, []);


  return (
    <header className={`${"product-header"} ${className}`}>
      <nav className={`${"product-navigation"}`}>
        {isAuthenticated ? (
          <Link to={`/invoice/${userData.name}`}>
            <div>
              <div className={`${"product-icon"}`}>
                <img src={logo} alt="" />
              </div>
              <div className={`${"product-icon-overflow"}`}></div>
              <div
                className={`w-full h-[100px] bg-[#7C5DFA] ${"product-logo"}`}
              >
                <div
                  className={`w-full bg-[#9277FF] ${"product-logo-overflow"}`}
                ></div>
              </div>
            </div>
          </Link>
        ) : (
          <Link to={``}>
            <div>
              <div className={`${"product-icon"}`}>
                <img src={logo} alt="" />
              </div>
              <div className={`${"product-icon-overflow"}`}></div>
              <div
                className={`w-full h-[100px] bg-[#7C5DFA] ${"product-logo"}`}
              >
                <div
                  className={`w-full bg-[#9277FF] ${"product-logo-overflow"}`}
                ></div>
              </div>
            </div>
          </Link>
        )}
      </nav>
      <div className={`${"svg-icon-container"}`}>
      {false}
        <img onClick={onClick} src={theme} alt="" className={`${"svg-icon"}`} />
      </div>
   
       {<Link to={"/logout"}>
          <div className={`logout-container`}>
            <img src={logout} alt="" />
          </div>
        </Link>}
    
    </header>
  );
}
