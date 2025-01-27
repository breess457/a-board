"use client";
import React,{useState,useEffect} from "react";
import { faChevronDown, faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModelBlog from "@/components/modelblog";
import CardCompnent from "@/components/card";
import { useAuth } from "@/untils/auth";
import { useSearchParams } from "next/navigation";

export interface selectOption {
    readonly value:string;
    readonly label:string;
}
export const dataCategory:readonly selectOption[] = [
    {value:"ทั้งหมด",label:"ทั้งหมด"},
    {value:"History",label:"History"},
    {value:"Food",label:"Food"},
    {value:"Pets",label:"Pets"},
    {value:"Healts",label:"Healts"},
    {value:"Fashion",label:"Fashion"},
    {value:"Exercise",label:"Exercise"},
    {value:"Others",label:"Others"},
]

export default function Page(){
    const searchParams = useSearchParams()
    const path = searchParams.get('category')
    const {getBlogerAll} = useAuth()
    const [search, setSearch] = useState<any>("")
    const [screenWidth, setScreenWidth] = useState<any>(null)
    const [isModelCreate, setIsModelCreate] = useState(false)
    const [isBlogData, setIsBlogData] = useState(getBlogerAll)
    const [selectedCategory, setSelectedCategory] = useState<string>('ทั้งหมด')
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const handleCategorySelect = (category: string) => {
      setSelectedCategory(category);
      setIsDropdownOpen(false);

      if (category === 'ทั้งหมด') {
        window.location.href = 'http://localhost:3000/pages';
      } else {
        window.location.href = `http://localhost:3000/pages?category=${category}`;
      }
    };
    
    useEffect(()=>{
      setSelectedCategory(path ?? "ทั้งหมด")
      if(path){
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/board/boardall?category=${path}`,{
            method:"GET",
            headers:{
              'Content-Type': 'application/json' 
            },
            credentials: 'include'
        })
        .then((res)=>res.json())
        .then((data)=>{
            setIsBlogData(data)
        })
        .catch((e)=>console.log(e))
      }
        
        const handleResize = ()=> setScreenWidth(window.innerWidth)
        setScreenWidth(window.innerWidth);
        window.addEventListener("resize", handleResize)
        return ()=> window.removeEventListener("resize", handleResize)

    },[])
    return (
        <div className="p-3 w-full">
            <div className="flex flex-row w-full">
                {screenWidth > 600 ? (
                <div className="w-2/3 mx-4">
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <FontAwesomeIcon icon={faSearch} className="w-4 h-4 text-gray-400"/>
                        </div>
                        <input 
                            type="text" 
                            className="block w-full px-4 py-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                            placeholder="Search" 
                            onChange={(e)=>setSearch(e.target.value)}
                        />
                    </div>
                </div>
                ):(
                <div className="w-auto px-2 py-2">
                    <FontAwesomeIcon icon={faSearch} className="w-20 h-5 text-gray-400"/>
                </div>)}
                    <div className="flex" style={{width:"100%"}}>
                        <div className="relative inline-block sm:w-40">
                          <button
                            onClick={() => setIsDropdownOpen((prev) => !prev)}
                            className="w-full bg-none text-gray-700 p-2 rounded-md hover:bg-gray-300 focus:outline-none"
                          >
                            {selectedCategory} <FontAwesomeIcon icon={faChevronDown} className="mx-4"/>
                          </button>
                          {isDropdownOpen && (
                            <ul className="absolute z-10 bg-white border border-gray-300 rounded-md shadow-lg mt-2 w-full">
                              {dataCategory.map((category,i) => (
                                <li
                                  key={i}
                                  onClick={() => handleCategorySelect(category.value)}
                                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                >
                                  {category.label}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                        <button 
                            className="mx-4 text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2 me-2 mb-2"
                            onClick={()=>setIsModelCreate(true)}
                        >
                            สร้างกระทู้ <FontAwesomeIcon icon={faPlus}/>
                        </button>

                    </div>
            </div>
            <div className="flex flex-col w-full lg:w-2/3 mt-3">
                {isBlogData && isBlogData.filter((result:any)=>{
                    if(search === ""){
                      return result
                    }else if(result.title.toLowerCase().includes(search.toLowerCase())){
                      return result
                    }
                }).map((blogdata:any, i:number)=>(
                    <div key={i}>
                        <CardCompnent blogData={blogdata} index={i}/>
                    </div>
                ))}
            </div>
            {isModelCreate ? <ModelBlog setIsModelCreate={setIsModelCreate} isModelCreate={isModelCreate} /> : null}
        </div>
    )
}