"use client";
import React, { createContext, useContext } from 'react';
import { DetailData, GetProfile } from './interfacetype';
interface AuthContextType {
    getcookie?: string;
    getprofile:GetProfile;
    getBlogerAll:DetailData[]
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider:React.FC<{value:AuthContextType;children:React.ReactNode}> = ({value, children})=>{
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = ()=>{
    const context = useContext(AuthContext)
    if(!context){
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context;
}