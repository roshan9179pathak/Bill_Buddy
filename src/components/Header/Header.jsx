import React, { useEffect, useState } from "react";
import "../../style/header.css";
import theme from "../../assets/icons8-sun.svg";
import logo from '../../assets/icons8-geometry-glyph-neue-96.png'
import {Link} from 'react-router-dom'
export default function Header({ className, onClick }) {

  return (
    <header className={`${"product-header"} ${className}`}>
      <nav className={`${"product-navigation"}`}>
        <Link to=''>
        <div>
          
          <div className={`${"product-icon"}`}>
<img src={logo} alt="" />
          </div>
          <div className={`${"product-icon-overflow"}`}></div>
          <div className={`w-full h-[100px] bg-[#7C5DFA] ${"product-logo"}`}>
            
            <div
              className={`w-full bg-[#9277FF] ${"product-logo-overflow"}`}
            ></div>
          </div>
        </div>
        </Link>
      </nav>
      <div className={`${"svg-icon-container"}`}>
        <img
         onClick={onClick}
          src={theme}
          alt=""
          className={`${"svg-icon"}`}
        />
      </div>
    </header>
  );
}
