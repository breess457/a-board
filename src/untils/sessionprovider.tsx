"use server"
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { redirect } from "next/navigation";
import { TypeAuthCookie } from "./interfacetype";

const getHeaders = () => ({
    Cookie: cookies().toString(),
});

const setAuthCookie = async (respose:TypeAuthCookie)=>{
    const cookieStore = await cookies()
     if(respose.token){
        cookieStore.set({
             name:"Authentication",
             value: respose.token,
             secure: true,
             httpOnly: true,
             expires: new Date(jwtDecode(respose.token).exp! * 1000),
         })
     }else{
         console.log("not cookie")
     }
     return cookieStore.get('Authentication')
}

const deleteCookie = async ()=>{
    (await cookies()).delete('Authentication')
    redirect('/')
}

const getProfile = async ()=>{
    const cookieStore = await cookies()
    const getcookie = cookieStore.get('Authentication')
    if(getcookie?.value){
        const fetchData = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/profile/`,{
            method:"GET",
            headers:{
              Authorization: `Bearer ${getcookie?.value}`
            },
            credentials: 'include'
        })
        const responseData = await fetchData.json()
        return responseData;
    }
    return null
}

const getBlogerAll = async ()=>{
    
    try{
        const fetchdata = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/board/boardall`,{
            method:"GET",
            headers:{
              'Content-Type': 'application/json' 
            },
            credentials: 'include'
        })
        const response = await fetchdata.json()
        return response
    }catch(e){
        console.log(e)
        return null
    }
}


const getCookie = async ()=>{
    const cookieStore = await cookies()
    return cookieStore.get('Authentication')
}

export {getHeaders, setAuthCookie, deleteCookie,getCookie,getProfile,getBlogerAll}