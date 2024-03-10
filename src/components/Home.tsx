"use client"

import { useEffect, useState } from "react"
import ProductCard from "./ProductCard";
import axios from "axios";
import { useProductStore, useUserStore } from "@/app/utils/store";

export default function Home(){

    const {user, setUser} = useUserStore();
    
    //main store for product data
    const {products, setProducts} = useProductStore();
    //the products that will be displayed
    const [filteredProducts,setFilteredProducts]:any = useState([]);
    //to keep track of all brands
    const [allbrand,setAllBrands]:any = useState([]);
    //to keep track to checked brands
    const [checkedBrands,setCheckedBrands]:any = useState([]);
    //to keep track of price range
    const [range,setRange] = useState({minRange:0,maxRange:0});
        
    useEffect(()=>{
        const setBrands = (products: any) => {
            const uniqueBrands: { brand: string; _id: string }[] = [];
            products.forEach((product: any) => {
              const brand = product.brand;
              const brandId = product._id;
              if (!uniqueBrands.some((uniqueBrand) => uniqueBrand.brand === brand)) {
                uniqueBrands.push({ brand, _id: brandId });
              }
            });
            setAllBrands(uniqueBrands);
          };
          
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/auth/refresh');
                const data = response.data.data;
                if(data === null) return;
                setUser({email:data.email,username:data.username,id:data._id,isAdmin:data.isAdmin});
                console.log("User",user);
            } 
            catch (error) {
                console.log("Error",error);
            }
        }
        const fetchProducts = async () => {
            try {
                const response = await axios.get('/api/products');
                const data = response.data;
                setProducts(data);
                setFilteredProducts(data);
                setBrands(data);
            } 
            catch (error) {
                console.log("Error",error);
            }
        }
        fetchData();
        fetchProducts();
    },[])

    const handleCheck = (e:any, brandName:string) => {
        const checked = e.target.checked;
        if(checked){
            setCheckedBrands([...checkedBrands, brandName]);
        }
        else{
            setCheckedBrands(checkedBrands.filter((brand:any) => brand !== brandName));
        }
    }

    const handleAllFilters = (e:any) => {
        e.preventDefault();
        if(range.maxRange > 0 && checkedBrands.length > 0){
            //filter by price range and brand
            const filteredByRangeAndBrand = products.filter((product:any) => {
                return product.price >= range.minRange && 
                       product.price <= range.maxRange &&
                       checkedBrands.includes(product.brand);
            });
            setFilteredProducts(filteredByRangeAndBrand);
        }
        else if(checkedBrands.length === 0 && range.maxRange > 0){
            //filter by price range
            const filteredByRange = products.filter((product:any) => {
                return product.price >= range.minRange && 
                       product.price <= range.maxRange;
            });
            setFilteredProducts(filteredByRange);
        }
        else if(range.maxRange === 0 && checkedBrands.length > 0){
            //filter by brand
            const filteredByBrand = products.filter((product:any) => {
                return checkedBrands.includes(product.brand);
            });
            setFilteredProducts(filteredByBrand);
        }
        else{
            setFilteredProducts(products);
        }
    }

    return(
        <div className="flex flex-row min-h-screen bg-white">
            <div className="w-[17%] font-medium py-4 min-h-full text-center bg-gray-200 m-1 h-fit border-2 border-gray-300 rounded-lg">
                <div>
                    <h2 className="text-left text-black font-bold text-lg px-2">Filter By Brand</h2>
                    <div>
                        {
                            allbrand.map((brandObj:any,index:string) => (
                                <div key={index} className="py-1">
                                    <div className="flex items-center mr-4 px-5">
                                        <input
                                        type="checkbox"
                                        id="red-checkbox"
                                        onChange={(e) => handleCheck(e, brandObj.brand)}
                                        className="w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-pink-500 dark:focus:ring-pink-600 dark:ring-offset-gray-100 focus:ring-2 dark:bg-gray-100 dark:border-gray-100"
                                        />

                                        <label
                                        htmlFor="pink-checkbox"
                                        className="ml-2 text-sm font-semibold text-gray-800"
                                        >
                                        {brandObj.brand}
                                        </label>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="pt-6">
                    <h2 className="text-left font-bold text-lg px-2 text-black">Filter By Price</h2>
                    <div className="flex flex-col gap-1 text-left mr-4 px-5 py-0.5">
                        <div className="flex justify-between">
                            <p className="text-gray-800">Min Range</p>
                            <input 
                                type="number"
                                value={range.minRange}
                                className="mx-2 bg-white text-black w-20 px-1"
                                onChange={(e:any)=>setRange({...range,minRange : e.target.value!=='' ? parseInt(e.target.value) : 0})}
                                min={0}
                            />
                        </div>
                        <div className="flex justify-between">
                            <p className="text-gray-800">Max Range</p>
                            <input 
                                type="number"
                                value={range.maxRange}
                                min={0}
                                className="mx-2 bg-white text-black w-20 px-1"
                                onChange={(e:any)=>setRange({...range,maxRange : e.target.value!=='' ? parseInt(e.target.value) : 0})}
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <button 
                        className="py-2 px-5 bg-primary text-black font-semibold m-2 rounded-lg mt-6"
                        onClick={(e)=>{handleAllFilters(e)}}
                    >
                        Apply Filter
                    </button>
                </div>
            </div>

            <div className="w-[83%] min-h-full text-center">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-2">
                    {
                        filteredProducts.map((product:any, index:any) => (
                            <div key={index} className="px-2">
                                <ProductCard product={product} />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}