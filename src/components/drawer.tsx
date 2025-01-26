"use client"
import React,{useState} from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRightFromBracket, faHouse, faPenToSquare, faRightLong, faXmark } from "@fortawesome/free-solid-svg-icons"
import { deleteCookie } from "@/untils/sessionprovider"
import Link from "next/link"

export default function SideBarDrawer({...propt}){
    const [isTab, setIsTab] = useState("home")
    return (
    <main 
        className={
            "fixed overflow-hidden top-0 z-50 bg-grey-100 bg-opacity-25 inset-0 transform ease-in-out" +
            (propt.isShow
                ? " transition-opacity opacity-100 duration-500 translate-x-0  "
                : " transition-all delay-500 opacity-0 translate-x-full  "
            )
        }
    >
        <section
            className={
                "w-1/2 max-w-md right-0 absolute h-full text-white shadow-xl delay-400 duration-500 ease-in-out transition-all transform " +
                (propt.isShow ? " translate-x-0 " : " translate-x-full")
            }
            style={{backgroundColor:"#006600"}}
        >
            <article className="relative max-w-lg flex flex-col space-y-6 overflow-y-scroll h-full">
            <div style={{
                  listStyle:"none",
                  width:"100%",
                  height:"590px",
                  overflow:"auto",
                }}>
                    <div className="m-4">
                        <button type="button" onClick={()=>propt.setIsShow(false)}>
                            <FontAwesomeIcon icon={faXmark} style={{fontSize:"22px"}}/>
                        </button>
                    </div>
                    <ul className="space-y-2 font-medium">
                        <li 
                            className={`${propt.path === "pages" && "bg-green-600"} hover:bg-green-600`}
                        >
                            <Link className="flex items-center p-2 my-3 text-white rounded-lg"
                                href="/pages"
                            >
                                <FontAwesomeIcon icon={faHouse} style={{fontSize:"22px"}}/>
                                <span className="ms-3">Home</span>
                            </Link>
                        </li>
                        <li 
                            className={`${isTab === "outblog" && "bg-green-600"} hover:bg-green-600`}
                            
                        >
                            <Link 
                                className={`flex items-center p-2 my-3 text-white rounded-lg`} 
                                href="/pages/outblog"
                                
                            >
                                <FontAwesomeIcon icon={faPenToSquare} style={{fontSize:"22px"}}/>
                                <span className="ms-3">Our Blog</span>
                            </Link>
                        </li>
                        <li 
                        className={`hover:bg-gray-100`}
                        
                    >
                        <a 
                            className={`flex items-center p-2 my-3 text-white rounded-lg`} 
                            onClick={deleteCookie}
                        >
                            <FontAwesomeIcon icon={faArrowRightFromBracket} style={{fontSize:"22px"}}/>
                            <span className="ms-3">Logout</span>
                        </a>
                    </li>
                    </ul>
            </div>
            </article>
        </section>
        <section
            className=" w-screen h-full cursor-pointer "
            onClick={()=> propt.setIsShow(false)}
        >
        </section>
    </main>

    )
}