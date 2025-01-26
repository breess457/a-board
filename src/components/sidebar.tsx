"use client";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React,{ useState,useEffect } from "react";
import Link from "next/link";


export default function SideBar({...prop}){
    const [screenWidth, setScreenWidth] = useState<any>(null)

    useEffect(()=>{
        const handleResize = ()=> setScreenWidth(window.innerWidth)
        setScreenWidth(window.innerWidth);
        window.addEventListener("resize", handleResize)
        return ()=> window.removeEventListener("resize", handleResize)
    },[])
    return (
        <aside className="top-0 left-0 min-h-screen block transition-transform " style={{width:screenWidth > 1130 ? "20%" : "40%"}}>
            <div className="h-full px-1 py-4 overflow-y-auto bg-gray-50">
                <ul className="space-y-2 font-medium">
                    <li 
                        className={`${prop.path === "pages" && "bg-gray-200"} hover:bg-gray-300`}
                    >
                        <Link className="flex items-center p-2 my-3 text-gray-900 rounded-lg" href="/pages">
                            <FontAwesomeIcon icon={faHouse} style={{fontSize:"22px"}}/>
                            <span className="ms-3">Home</span>
                        </Link>
                    </li>
                    <li 
                        className={`${prop.path === "outblog" && "bg-gray-200"} hover:bg-gray-300`}
                        
                    >
                        <Link 
                            href="/pages/outblog"
                            className={`flex items-center p-2 my-3 text-gray-900 rounded-lg`} 
                        >
                            <FontAwesomeIcon icon={faPenToSquare} style={{fontSize:"22px"}}/>
                            <span className="ms-3">Our Blog</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </aside>
    )
}