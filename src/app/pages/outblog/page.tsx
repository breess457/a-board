"use client";
import MyCardCompnent from "@/components/mycard";
import UpdateModelBlog from "@/components/updateblog";
import { useAuth } from "@/untils/auth";
import { faCircleUser } from "@fortawesome/free-regular-svg-icons";
import {  faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { BlogData,ProfileData } from "@/untils/interfacetype";


export default function OutBlogPage(){
    const {getcookie,getprofile} = useAuth()
    const [isProfile, setIsProfile] = useState<ProfileData>()
    const [isBlogOut, setIsBlogOut] = useState<BlogData[]>([])
    
    const [isModel, setIsModel] = useState(false)
    const [isCurrenBlog ,setIsCurrentBlog] = useState<BlogData>({
        _id: "",
        category:"",
        countComment:0,
        createDate:"",
        userId:"",
        title: "",
        detail: "",
    })

    const handleClickModel = (currendata:BlogData, status:boolean)=>{
        setIsModel(status)
        setIsCurrentBlog(currendata)
    }

    const handleDeleteBlog = (data:BlogData)=>{
        Swal.fire({
            title: "คุณแน่ใจหรือ?",
            text: "เมื่อคุณลบข้อมูลนี้จะไม่สามารถกู้คืนได้!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result)=>{
            if(result.isConfirmed){
                try{
                    const responsedelete = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/board/deleteblog?blogid=${data?._id}`,{
                        method:"DELETE",
                        headers:{
                            Authorization: `Bearer ${getcookie}`
                          },
                          credentials: 'include'
                    })
                    const resultdelete = await responsedelete.json()
                    if(resultdelete.statusCode === 201){
                        Swal.fire({
                            icon:"success",
                            title:"เรียบร้อย",
                            text:`คุณลบบทความนี้เรียบร้อย`,
                            showConfirmButton:false,
                            timer:1500
                        }).then(()=> window.location.reload())
                    }
                }catch(e){
                    console.log(`Is : ${e}`)
                }
            }
        })
    }
    
    useEffect(()=>{
        setIsProfile(getprofile?.Profile)
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/board/outblog`,{
            method:"GET",
              headers:{
                Authorization: `Bearer ${getcookie}`
              },
              credentials: 'include'
        })
        .then((res)=>res.json())
        .then((isdata)=>{
            setIsBlogOut(isdata)
        })
        .catch((e)=>console.log(e))
    },[])
    return (
        <div className="w-full min-h-screen">
            <div className="max-w-full md:max-w-4xl bg-white py-6 pl-6">
                {/* <div className="w-full mb-3">
                    <button className="h-16 w-16 bg-gray-300 text-white rounded-full flex items-center justify-center">
                      <FontAwesomeIcon icon={faArrowLeft} className="w-10 text-gray-600 h-10 text-xl" style={{fontSize:"34px"}} />
                    </button>
                </div> */}
                <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col sm:flex-row mr-2 items-center justify-center">
                    <div className="px-4">
                        <img src="/image/profile.jpg" className="w-40 h-40 md:w-20 md:h-20" alt="profile"/>
                    </div>
                    <div className="flex-grow">
                    <div className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-2">
                        <div className="flex">
                            <p className="mx-2 text-3xl font-bold">
                                <FontAwesomeIcon icon={faCircleUser} />
                            </p>
                            <p className="mx-2 text-2xl font-bold">{isProfile?.firstname}</p>
                            <p className="mx-2 text-2xl font-bold">{isProfile?.lastname}</p>
                        </div>
                        <div className="flex">
                            <p className="mx-2 text-2xl font-bold"><FontAwesomeIcon icon={faPhone}/> </p>
                            <p className="mx-2 text-xl font-bold items-center justify-center">{isProfile?.phone}</p>
                        </div>
                    </div>
                    <div className="flex-grow grid grid-cols-1 gap-2 my-2">
                        <div className="flex w-full">
                            <p className="mx-2 text-2xl font-bold"><FontAwesomeIcon icon={faEnvelope}/> </p>
                            <p className="mx-2 text-xl font-bold items-center justify-center">{isProfile?.username}</p>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            <hr className="border-b-4"/>
            <div className="max-w-full md:max-w-4xl bg-white py-6 pl-6">
                {isBlogOut && isBlogOut.map((isdata:BlogData, i:number)=>(
                    <div key={i} className="mr-4 mb-2">
                        <MyCardCompnent blogData={isdata} index={i} handleClickModel={handleClickModel} handleDeleteBlog={handleDeleteBlog}/>
                    </div>
                ))}
            </div>
            {isModel ? <UpdateModelBlog isData={isCurrenBlog} setIsModel={setIsModel} /> : null}
        </div>
    )
}
