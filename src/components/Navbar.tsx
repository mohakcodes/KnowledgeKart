"use client"
import { useUserStore } from "@/app/utils/store";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Navbar(){

    const router = useRouter();
    const {user,setUser} = useUserStore();

    const fetchData = async () => {
        try {
            const response = await axios.get('/api/auth/refresh');
            const data = response.data.data;
            if(data === null){
                setUser({email:"",username:"",id:"",isAdmin:false});
                return;
            }
            setUser({email:data.email,username:data.username,id:data._id,isAdmin:data.isAdmin});
        } 
        catch (error) {
            console.log("BT",error);
        }
    }

    const logoutFn = async() => {
        try {
            await axios.get('/api/auth/logout');
            router.push('/auth/login');
            setUser({email:"",username:"",id:"",isAdmin:false});
            console.log("user",user);
        } 
        catch (error:any) {
            console.log(error.message);    
        }
    }

    useEffect(()=>{
        fetchData();
    },[]);

    return(
        <div className="navbar bg-gray-800 relative z-50">
        <div className="flex-1">
            <a className="btn btn-ghost text-xl">E-Commerce</a>
        </div>
        <div className="flex-none">
            <ul className="menu menu-horizontal px-4">
            {
                user.email && user.id && user.username ? (
                    null
                ) : (
                    <li><a href="/auth/login">Login</a></li>
                )
            }
            {
                user.isAdmin ? (
                    <li><a href="/addproduct">Add Product</a></li>
                ) : (
                    null
                )
            }
            <li>
                {
                    user.email && user.id && user.username ? (
                        <details>
                            <summary>
                                More
                            </summary>
                            <ul className="p-2 rounded-t-none bg-slate-700">
                                <li><a>Edit</a></li>
                                <li><a onClick={logoutFn}>Logout</a></li>
                            </ul>
                        </details>
                    ) : (
                        null
                    )
                }
            </li>
            </ul>
        </div>
        </div>
    )
}