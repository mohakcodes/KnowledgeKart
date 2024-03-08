"use client"
import { useUserStore } from "@/app/utils/store"

export default function Navbar(){

    const {user} = useUserStore();

    return(
        <div className="navbar bg-gray-800 relative z-50">
        <div className="flex-1">
            <a className="btn btn-ghost text-xl">E-Commerce</a>
        </div>
        <div className="flex-none">
            <ul className="menu menu-horizontal px-4">
            <li><a href="/auth/login">Login</a></li>
            <li>
                <details>
                <summary>
                    More
                </summary>
                <ul className="p-2 rounded-t-none bg-slate-700">
                    <li><a>Edit</a></li>
                    <li><a>Logout</a></li>
                </ul>
                </details>
            </li>
            </ul>
        </div>
        </div>
    )
}