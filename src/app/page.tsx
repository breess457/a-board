"use client";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { setAuthCookie } from "@/untils/sessionprovider";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/untils/auth";
import { redirect } from "next/navigation";



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

const Login = ({...prop})=>{
  const [username,setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword,setShowPassword] = useState(false)
  const [alert,setAlert] = useState(false)
  const [error, setError] = useState({
    username:false,
    password:false
  })

  const handleFormLogin = async (e:FormEvent)=>{
      e.preventDefault()
      try{
        setError({
          username:!username,
          password:!password
        })
        const response = await fetch(`http://localhost:3001/user/login`,{
          method:"POST",
          credentials: 'include',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'        
          },
          body:JSON.stringify({
            username:username,
            password:password
          })
        })
        if(!response.ok) throw new Error(`Response status: ${response.status}`)
        const responseJson = await response.json()
        if(responseJson.statusCode === 201){
            await setAuthCookie(responseJson)
            setAlert(false)
            window.location.href = "/pages"
        }else{
          setAlert(true)
        }
      }catch(e){
        console.log(e)
      }
  }

    return (
      <form noValidate onSubmit={handleFormLogin} className="font-medium">
        {alert ? 
          <div className="m-3">
            <Alert text={"email หรือ password ไม่ถูกต้อง"} setClose={setAlert} />
          </div> : null}
        <div className="m-3">
          <h3 className="text-xl font-bold text-white">เข้าสู่ระบบ</h3>
        </div>
        <div className="m-3">
          <input 
              type="text"
              placeholder="username" 
              className={`w-full h-10 px-2 rounded-md border ${error.username ? 'border-red-500' : 'border-gray-300'} hover:border-gray-100`}
              value={username}
              name="username"
              onChange={(e)=>setUsername(e.target.value)}
              required
          />
        </div>
        <div className="m-3">
        <div className="relative">
            <input 
                type={showPassword ? "text" : "password"}
                placeholder="รหัสผ่าน" 
                className={`w-full h-10 px-2 rounded-md border ${error.password ? 'border-red-500' : 'border-gray-300'} hover:border-gray-100`} 
                name="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
            />
            <button 
                type="button" onClick={()=>setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
            >
                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
            </button>
          </div>
        </div>
        <div className="m-3">
            <button type="submit" className="w-full px-4 py-2 text-md font-bold text-center text-white bg-green-400 rounded-lg hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-green-300">
                Login
            </button>
        </div>
      </form>
    )
}

const Register = ({...prop})=>{
  const [showPassword,setShowPassword] = useState(false)
  const [alert, setAlert] = useState(false)
    const [formRegister, setFormRegister] = useState({
        firstname:'',
        lastname:'',
        phone:'',
        username:'',
        password:''
    })
    const [error, setError] = useState({
        firstName:false,
        lastName:false,
        phone:false,
        username:false,
        password:false,
    })

    const handleChange = (e:ChangeEvent<HTMLInputElement>)=>{
      const {name, value} = e.target
      setFormRegister({
          ...formRegister,
          [name]:value
      })
    }

    const handleFormSignup = async (e:FormEvent)=>{
        e.preventDefault()
        try{
          setError({
            firstName:!formRegister.firstname,
            lastName:!formRegister.lastname,
            phone:!formRegister.phone,
            username:!formRegister.username,
            password:!formRegister.password
          })
          const response = await fetch(`http://localhost:3001/user/register`,{
            method:"POST",
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'        
            },
            body:JSON.stringify({
              firstname:formRegister.firstname,
              lastname:formRegister.lastname,
              phone:formRegister.phone,
              username:formRegister.username,
              password:formRegister.password
            })
          })
          if(!response.ok) throw new Error(`Response status: ${response.status}`)
          const resultJson = await response.json()
          if(resultJson.statusCode === 201){
            await setAuthCookie(resultJson)
            setAlert(false)
            window.location.href = "/pages"
          }else{
            setAlert(true)
          }
        }catch(e){
          console.log(e)
        }
    }
    return(
      <form noValidate onSubmit={handleFormSignup}>
        {alert ? <Alert text={"ไม่สามารถใช้ username นี้โปรดใช้ username อื่น"} setClose={setAlert} /> : null}
        <div className="m-3">
          <h3 className="text-xl font-bold text-white">สมัครสมาชิก</h3>
        </div>
        <div className="m-3 flex flex-row gap-2">
          <input 
            placeholder="ชื่อ" 
            className={`w-1/2 h-10 px-2 rounded-md border ${error.firstName ? 'border-red-500' : 'border-gray-300'} hover:border-gray-100`} 
            type="text"
            name="firstname"
            value={formRegister.firstname}
            onChange={handleChange}
          />
          <input 
              placeholder="นามสกุล" 
              className={`w-1/2 h-10 px-2 rounded-md border ${error.lastName ? 'border-red-500' : 'border-gray-300'} hover:border-gray-100`} 
              type="text"
              value={formRegister.lastname}
              name="lastname"
              onChange={handleChange}
          />
        </div>
        <div className="m-3">
          <input 
              placeholder="เบอร์โทร" 
              className={`w-full h-10 px-2 rounded-md border ${error.phone ? 'border-red-500' : 'border-gray-300'} hover:border-gray-100`} 
              type="text"
              name="phone"
              value={formRegister.phone}
              onChange={(e:ChangeEvent<HTMLInputElement>)=>{
                  const inputValue = e.target.value;
                  if(/^\d*$/.test(inputValue)){
                      setFormRegister({
                          ...formRegister,
                          ['phone']:inputValue
                      })
                  }
              }}
              required 
          />
        </div>
        <div className="m-3">
          <input 
              placeholder="username" 
              className={`w-full h-10 px-2 rounded-md border ${error.username ? 'border-red-500' : 'border-gray-300'} hover:border-gray-100`} 
              type="text"
              value={formRegister.username}
              name="username"
              onChange={handleChange}
          />
        </div>
        <div className="m-3">
          <div className="relative">
            <input 
                type={showPassword ? "text" : "password"}
                placeholder="รหัสผ่าน" 
                className={`w-full h-10 px-2 rounded-md border ${error.password ? 'border-red-500' : 'border-gray-300'} hover:border-gray-100`} 
                name="password"
                value={formRegister.password}
                onChange={handleChange}
            />
            <button 
                type="button" onClick={()=>setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 focus:outline-none"
            >
                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
            </button>
          </div>
        </div>
        <div className="m-3">
            <button type="submit" className="w-full px-4 py-2 text-md font-bold text-center text-white bg-green-400 rounded-lg hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-green-300">
                Register
            </button>
        </div>
      </form>
    )
}

export default function Home() {
  const [isForm, setIsForm] = useState("login")
  const {getcookie} = useAuth()
  if(getcookie){
    redirect('/pages')
  }
  return (
    
    <div className="flex flex-col md:flex-row min-h-screen" style={{backgroundColor:"#003300"}}>
      <div className="w-full md:w-1/2 lg:w-2/4 xl:w-3/5 flex items-center justify-center py-10 my-10">
       
        <div className="relative w-full lg:w-4/5 xl:w-1/2">
          {isForm === "login" && <Login />}
          {isForm === "register" && <Register />}
        </div>
          
      </div>
      <div className="rounded-[20px] w-full md:w-1/2 lg:w-2/4 xl:w-2/5" style={{backgroundColor:"#196619"}}>
        <div className="w-full flex items-center justify-center py-10 my-10">
          <div className="relative">
            <img src="/image/book.png" className="" style={{background:""}}/>
            <div className="flex flex-col w-full items-center justify-center text-white font-bold">a board</div>
            <div className="flex flex-col w-full items-center justify-center text-white">
              {isForm === "login" 
                ? (
                    <div className="flex flex-row">
                      <p className="text-gray-300">หากยังไม่มีสมาชิกสามารถ</p>
                      <button className="mx-3 font-bold underline font-semibold hover:text-blue-500" onClick={()=>setIsForm("register")}>สมัครสมาชิก</button>
                    </div>)
                :(<div className="flex flex-row">
                    <p className="text-gray-300">หากมีสมาชิกสามารถ</p>
                    <button className="mx-3 font-bold underline font-semibold hover:text-blue-500" onClick={()=>setIsForm("login")}>เข้าสู่ระบบ</button>
                  </div>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
