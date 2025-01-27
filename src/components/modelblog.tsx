"use client";
import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import Select from "react-select"
import { useAuth } from "@/untils/auth";
import Swal from "sweetalert2";

const Alert = ({...props})=>{
  return (
      <div className="flex items-center px-4 py-3 mb-4 text-red-800 rounded-lg bg-red-50">
          <div className="sr-only">Info</div>
          <div className="ms-3 text-sm font-medium">
              {props.text}
          </div>
          <button 
              type="button" 
              className="ms-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8"
              onClick={()=>props.setClose(false)}
          >
              <FontAwesomeIcon icon={faXmark} />
          </button>
      </div>
  )
}

export interface selectOption {
    readonly value:string;
    readonly label:string;
}
export const dataCategory:readonly selectOption[] = [
    {value:"History",label:"History"},
    {value:"Food",label:"Food"},
    {value:"Pets",label:"Pets"},
    {value:"Healts",label:"Healts"},
    {value:"Fashion",label:"Fashion"},
    {value:"Exercise",label:"Exercise"},
    {value:"Others",label:"Others"},
]
export default function ModelBlog({...prop}){
    const [alert, setAlert] = useState(false)
    const [category, setCategory] = useState<string>("")
    const {getcookie} = useAuth()
    const [isForm, setIsForm] = useState({
        titleblog:"",
        detailblog:""
    })
    
    const [error, setError]=useState({
        category:false,
        title:false,
        detail:false
    })

    const handleCreateBloger = async (e:any)=>{
        e.preventDefault()
        if(!(isForm.detailblog && isForm.titleblog && category)){
            setError({
                category:!category,
                title:!isForm.titleblog,
                detail:!isForm.detailblog
            })
            setAlert(true)
        }else{
            try{
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/board/create/`,{
                    method:"POST",
                    credentials: 'include',
                    headers:{
                        Authorization: `Bearer ${getcookie}`,
                        'Content-Type': 'application/json' 
                    },
                    body:JSON.stringify({
                        category:category,
                        title:isForm.titleblog,
                        detail:isForm.detailblog
                    })
                })
                if(!response.ok) throw new Error(`Is Error : ${response.status}`)
                const resultjson = await response.json()
                if(resultjson.statusCode === 201){
                    prop.setIsModelCreate(false)
                    Swal.fire({
                        icon:"success",
                        title:"success",
                        text:"create blog is success",
                        showConfirmButton:false,
                        timer:1500
                    }).then(()=>window.location.reload())
                }
            }catch(e){
                console.log(e)
            }
        }
    }
 
    
    return (
        <div 
            tabIndex={-1}
            className="fixed delay-500 left-0 right-0 top-0 z-50 h-[calc(90%-1rem)] max-h-full w-full overflow-y-auto overflow-x-hidden flex items-center justify-center p-4 md:inset-0"
        >
            <div className="relative p-4 w-full max-w-3xl max-h-full">
                <div className="relative bg-white rounded-lg shadow">
                    <div className="p-4 md:p-5 space-y-4">
                        <div className="w-full flex flex-row">
                            <span className="">สร้างกระทู้</span>
                            <button 
                                type="button" 
                                className="ml-auto end-2.5 text-dark-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                                onClick={()=>prop.setIsModelCreate(false)}
                            >
                                <FontAwesomeIcon icon={faXmark} className="h-5 w-5 text-dark-500"/>
                            </button>
                        </div>
                        {alert ? <Alert text={"กรุณากรอกข้อมูลให้ครบ"} setClose={setAlert} />:null}
                        <form className="flex flex-col w-full gap-2" noValidate onSubmit={handleCreateBloger}>
                            <div className="w-full">
                                <Select
                                    className={`basic-single rounded w-full md:w-1/2 ${error.category ? 'border-red-500' : 'border-gray-300'}`}
                                    classNamePrefix="select"
                                    options={dataCategory}
                                    defaultValue={{value: "เลือก",label: "เลือก"}}
                                    onChange={(e:any)=>{
                                        setCategory(e?.value)
                                    }}
                                    name="category"
                                    id="category"
                                    isClearable
                                />
                            </div>
                            <div className="w-full">
                                <input 
                                    type="text" 
                                    className={`bg-gray-50 border ${error.title ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`} placeholder="title"
                                    value={isForm.titleblog}
                                    name="titleblog"
                                    onChange={(e)=>{
                                        setIsForm({
                                        ...isForm,
                                        ['titleblog']:e.target.value
                                    })}}
                                    required
                                />
                            </div>
                            <div className="w-full">
                                <textarea 
                                    name="detailblog"
                                    rows={10}
                                    className={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border ${error.detail ? 'border-red-500' : 'border-gray-300'}  focus:ring-blue-500 focus:border-blue-500`}
                                    placeholder="Write your thoughts here..."
                                    value={isForm.detailblog}
                                    onChange={(e)=>{
                                        setIsForm({
                                        ...isForm,
                                        ['detailblog']:e.target.value
                                    })}}
                                    required
                                ></textarea>
                            </div>
                            <div className="flex items-center p-4 md:p-5 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b dark:border-gray-600">
                                <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">ยืนยันสร้างกระทู้</button>
                                <button 
                                    type="button" 
                                    className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
                                    onClick={()=>prop.setIsModelCreate(false)}
                                >ยกเลิก</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}