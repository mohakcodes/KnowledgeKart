"use client"

import { useState } from "react"
import ProductCard from "./ProductCard";
import { Product } from "@/app/types";

export default function Home(){
    const [prod,setProd] = useState<Product[]>([
        {
            name:"Canon camera XSE-201",
            price:20000,
            rating:4.4,
            description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            company:"canon",
        },
        {
            name:"Canon camera XSE-202kxboxkgiod",
            price:2000,
            rating:4.2,
            description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            company:"canon",
        },
        {
            name:"Canon camera XiSE-202",
            price:200,
            rating:4.9,
            description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            company:"canon",
        },
        {
            name:"Canon camera XiSE-202",
            price:200,
            rating:4.9,
            description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            company:"canon",
        },
    ]);
    return(
        <div className="flex flex-row min-h-screen">
            <div className="w-[17%] font-medium py-4 min-h-full text-center bg-gray-700">
                Filters
            </div>
            <div className="w-[83%] min-h-full text-center">
                <h1 className="text-2xl py-3">Top Deals</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {
                        prod.map((product, index) => (
                            <div key={index} className="px-4">
                                <ProductCard product={product} />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}