"use client"

import { useUserStore } from "@/app/utils/store";
import { NextResponse } from "next/server";

const setUser = useUserStore((state)=>state.setUser);

export async function GET(){
    try {
        const response = NextResponse.json({message:"Logout Successful",success:true});
        response.cookies.set("token","",{httpOnly:true,expires:new Date(0)});
        setUser(null);
        return response;   
    } 
    catch (error) {
        return NextResponse.json({ error: "Logged out successfully" }, { status: 500 });
    }
}