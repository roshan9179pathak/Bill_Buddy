import React, { useEffect, useState } from "react";
import { Header } from "./components";
import { Outlet } from "react-router-dom";
import "./style/layout.css";
export default function Layout() {

        const[theme,setTheme] = useState(false)

        const changeTheme = ()=>{
            setTheme(prev => !prev)
        }

        useEffect(()=>{
            if(theme){
                document.body.classList.add('light-theme')
            }else{
                document.body.classList.remove('light-theme')
            }
        },[theme])
    

  return (
    <div className={`h-screen w-screen ${"product-layout"}`}>
      <Header className={`w-full bg-[#252945]`} onClick={changeTheme}/>

      <main className={``}>
        <Outlet />
      </main>
    </div>
  );
}
