"use client"

import { ProductType } from '@/app/types';
import axios from 'axios';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function ProductPage() {

  const [product, setProduct] = useState({} as ProductType);

  const {productID} = useParams();
  if(!productID){
    return <div>Loading...</div>
  }

  useEffect(()=>{
    const fetchProductDetails = async () => {
        try {
            const repsonse = await axios.get(`/api/products/${productID}`);
            console.log("Client",repsonse.data);
            setProduct(repsonse.data);
        } 
        catch (error) {
            console.log(error);
        }
    }
    fetchProductDetails();
  },[]);

  return (
    <div className="container mx-auto p-4 px-9">
      <div className="flex flex-col sm:flex-row">
        <div className="md:col-span-2 lg:col-span-2 w-[100%] sm:w-[40%]">
          <Image src={product.image} alt={product.name} width={450} height={450} />
        </div>
        <div className='w-[100%] sm:w-[60%] mt-5 p-4'>
          <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800 bg-gray-200 rounded-md  p-2 leading-8">
            {product.name}
          </h1>
          <p className="text-gray-600 py-2 mt-3">
          <a className='bg-gray-200 rounded-md font-semibold text-red-600 p-1 px-3'>{product.brand}</a>
          </p>
          <p className="text-gray-600 p-2 font-semibold">User Ratings - {product.rating}⭐</p>
          <p className="text-lg mt-2 px-2 font-semibold text-gray-700">{product.price} RS</p>
          <p className="text-gray-800 p-2 mt-4">{product.description}</p>
          <div className='p-2 flex justify-between flex-col sm:flex-row'>
            <button 
            className="px-3 py-2 m-1 bg-primary text-white font-semibold rounded-md"
            >
                BUY NOW
            </button>
            <button 
                className="px-3 py-2 m-1 bg-primary text-white font-semibold rounded-md"
            >
                ADD TO CART
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}