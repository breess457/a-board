"use client";
import React,{useEffect, useState} from "react";
import { faArrowRightFromBracket, faBars, faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { deleteCookie } from "@/untils/sessionprovider";
export default function NavbarSide({...prop}){
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [screenWidth, setScreenWidth] = useState<any>(null)

    useEffect(()=>{
        const handleResize = ()=> setScreenWidth(window.innerWidth)
        setScreenWidth(window.innerWidth);
        window.addEventListener("resize", handleResize)
        return ()=> window.removeEventListener("resize", handleResize)
    },[])
    return (
    <>
        

<nav className="border-gray-200" style={{backgroundColor:"#003300"}}>
  <div className="max-w-screen-xl flex items-center justify-between mx-auto px-4">
    <a href="#" className="flex items-center space-x-3 w-full rtl:space-x-reverse">
        <span className="self-center text-xl font-semibold whitespace-nowrap text-white">board</span>
    </a>
    
    <div className="w-full block w-auto ml-auto">
      <ul className="flex flex-col font-medium px-4 rounded-lg bg-none">
        {screenWidth > 900 ? (
        <li className="w-full flex items-center my-2">
          
          <button 
              className="ml-auto text-white font-bold bg-[#00cc66] hover:bg-[#00cc66]/90 focus:ring-4 focus:outline-none focus:ring-[#00cc66]/50 font-medium rounded-lg text-sm px-7 py-2 text-center inline-flex items-center dark:focus:ring-[#00cc66]/55 me-2"
              onClick={deleteCookie}
            >
              <FontAwesomeIcon icon={faArrowRightFromBracket} className="mr-2"/> Logout
          </button>
        </li>
        ):(
        <li className="w-full flex" onClick={()=>prop.setIsShow(true)}>
          <div className="block ml-auto p-3 text-white rounded-sm  border-0 p-0">
            <FontAwesomeIcon icon={faList} style={{fontSize:"24px"}}/>
          </div>
        </li>
        )}
      </ul>
    </div>
  </div>
</nav>

    </>
    )
}