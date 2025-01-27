"use client";
import { useSearchParams } from 'next/navigation'
import { FormEvent, useEffect, useState } from 'react';
import { faArrowLeft, faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from '@/untils/auth';
import Swal from 'sweetalert2';
import Link from 'next/link';

export default function DetailPage(){
  const {getcookie} = useAuth()
  const searchParams = useSearchParams()
  const blogid = searchParams.get('blogid')
  const [detailData, setDetailData] = useState<any>({})
  const [showInputComment, setShowInputComment] = useState(false)
  const [isComment, setIsComment] = useState("")
  const [dataComment, setDataComment] = useState([])

  const formatDate = (isoString:any) => {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
  
    return `${day}/${month}/${year}`;
  };

      useEffect(()=>{
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/board/detail/${blogid}`,{
              method:"GET",
              headers:{
                'Content-Type': 'application/json' 
              },
              credentials: 'include'
          })
          .then((res)=>res.json())
          .then((resultdata)=>{
            setDetailData(resultdata)
          })
          .catch((e)=>console.log(e))

          fetch(`${process.env.NEXT_PUBLIC_API_URL}/board/listcomment/${blogid}`,{
            method:"GET",
              headers:{
                'Content-Type': 'application/json' 
              },
              credentials: 'include'
          })
          .then((res)=>res.json())
          .then((data)=>setDataComment(data))
          .catch((e)=>console.log(e))
      },[])

      const handleSubmitComment = async (e:FormEvent)=>{
        e.preventDefault()
        try{
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/board/createcomment`,{
            method:"POST",
            headers:{
              Authorization: `Bearer ${getcookie}`,
              'Content-Type': 'application/json' 
            },
            credentials: 'include',
            body:JSON.stringify({
              blogerId:detailData?._id,
              textcomment:isComment
            })
          })
          if(!response.ok) throw new Error(`Is error status:${response.status}`)
          const resultjson = await response.json()
          if(resultjson.statusCode === 201){
            setShowInputComment(false)
            Swal.fire({
              icon:"success",
              title:"success",
              text:"comment success full",
              showConfirmButton:false,
              timer:1500
            }).then(()=>window.location.reload())
          }
        }catch(e){
          console.log(e)
        }
      }

    return (
        <div className="w-full min-h-screen overflow-y-auto">
            <div className="max-w-full md:max-w-4xl bg-white py-6 pl-6 h-full">
                <div className="w-full mb-3">
                    <Link className="h-16 w-16 bg-none text-white flex items-center justify-center" href={"/pages"}>
                      <FontAwesomeIcon icon={faArrowLeft} className="w-10 text-gray-600 h-10 mb-3 text-xl" style={{fontSize:"24px"}} />
                    </Link>
                </div>
                <div className="flex items-center my-4">
                    <img src="/image/profile.jpg" alt='profile' className="w-12 h-12 rounded-full object-cover" /> 
                    <div className="ml-4">
                      <h4 className="text-lg font-medium">{detailData?.users?.firstname}  {detailData?.users?.lastname}</h4>
                      <p className="text-sm text-gray-500">{formatDate(detailData?.createDate)}</p>
                    </div>
                </div>
                <div className="">
                    <div className="text-sm text-gray-500 mb-2 flex">
                      <p className='w-auto bg-gray-100 px-6 py-2 rounded-full'>{detailData?.category}</p>
                    </div>
                    <h2 className="text-2xl font-bold mb-2">{detailData?.title}</h2>
                    <p className="text-gray-700 mb-4 mx-4 indent-4">
                      {detailData?.detail}
                    </p>
                    <p className="text-sm text-gray-500 mb-6">{detailData?.countComment} Comments</p>
                    {showInputComment ? (
                      <form className='flex mx-2'>
                        <textarea 
                            value={isComment}
                            onChange={(e)=>setIsComment(e.target.value)}
                            rows={2}
                            name="address"
                            placeholder="address"
                            className={`mx-2 block py-2 px-0 w-full font-bold text-xs text-gray-900 bg-transparent border-0 border-2 appearance-none`}
                            required
                        ></textarea>
                        <div className="items-center justify-center flex flex-col">
                          <FontAwesomeIcon 
                                icon={faCheck}
                                style={{fontSize:'30px',width:'30px'}} 
                                className="mx-4 my-2 text-sm text-dark-700 text-green-400 hover:text-green-700"
                                onClick={handleSubmitComment}
                                
                          />
                          <FontAwesomeIcon 
                              icon={faXmark} 
                              style={{fontSize:'30px',width:'30px'}} 
                              className={`text-sm text-dark-400 hover:text-dark-700 mx-4 my-2`}
                              onClick={()=>setShowInputComment(false)}
                          />
                        </div>
                      </form>
                    ):(
                      <button 
                        onClick={()=>setShowInputComment(true)}
                        className="text-green-500 hover:text-white border border-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2 text-center me-2 mb-2">
                        Add Comments
                      </button>
                    )}
                </div>
                <div className="mt-8 space-y-4">
                  {dataComment.map((comment:any, index:number) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0"></div>
                      <div>
                        <h5 className="font-medium">{comment?.users?.firstname}</h5>
                        <p className="text-sm text-gray-500">{formatDate(comment?.createDate)}</p>
                        <p className="text-gray-700 mt-2">{comment?.textcomment}</p>
                      </div>
                    </div>
                  ))}
                </div>
            </div>

        </div>
    )
}