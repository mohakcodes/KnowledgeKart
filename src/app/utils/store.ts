import {create} from "zustand";
import {ProductType, UserType} from '@/app/types'

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

interface productStoreType {
    products: ProductType[];
    setProducts: (newProducts:ProductType[]) => void;
}

export const useProductStore = create<productStoreType>((set)=>({
    products:[],
    setProducts: (newProducts) => set({products: newProducts}),
}))