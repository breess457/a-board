"use client";
import NavbarSide from "@/components/navbar";
import SideBar from "@/components/sidebar";
import React,{useEffect,useState} from "react";
import SideBarDrawer from "@/components/drawer";
import { useAuth } from "@/untils/auth";
import { redirect } from "next/navigation";
import { useRouter,usePathname } from "next/navigation";

export default function RootPagetLayout({ children }:Readonly<{children:React.ReactNode}>){
        const {getcookie} = useAuth()
        const [isShow, setIsShow] = useState(false)
        const [screenWidth, setScreenWidth] = useState<any>(null)
        const pathname = usePathname()
        const paths = pathname.split('/').pop()
        
        console.log({paths})

        
            useEffect(()=>{
                const handleResize = ()=> setScreenWidth(window.innerWidth)
                setScreenWidth(window.innerWidth);
                window.addEventListener("resize", handleResize)
                return ()=> window.removeEventListener("resize", handleResize)
            },[])
            if(!getcookie){
                redirect('/')
            }
    return (
        <main className="">
            <NavbarSide isShow={isShow} setIsShow={setIsShow} />
            <div className="flex">
                {screenWidth > 900 ? (<SideBar path={paths} />):null}
                {children}
            </div>
            <SideBarDrawer 
              isShow={isShow} 
              setIsShow={setIsShow} 
              path={paths}
            />
        </main>
    )
}