import {create} from "zustand";
import {UserType} from '@/app/types'

interface userStoreType {
    user : UserType;
    setUser : (newUser:UserType) => void
}

export const useUserStore = create<userStoreType>((set)=>({
    user: {
        username:"",
        email:"",
        id:"",
        isAdmin:false,
    },
    setUser: (newuser) => set({user: newuser}),
}))