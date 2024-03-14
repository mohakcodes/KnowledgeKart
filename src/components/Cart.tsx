"use client"
import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

export default function Cart() {

  const [user, setUser]:any = useState();
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    const userData = await axios.get('/api/auth/refresh');
    setUser(userData.data.data);
    setLoading(false);
  }

  useEffect(() => {
    fetchUser();
  },[]);

  if(loading) return(
    <div className='flex p-3 text-black font-bold text-xl sm:text-2xl'>
      Loading Cart...
    </div> 
  )

  return (
    <div className='flex flex-col text-center items-center'>
      <div className='w-[50%] flex flex-col'>
      <p className='font-bold bg-red-500 text-white mt-2 rounded-md'>Your Cart</p>
      {user === undefined ? null : (
        user.cart.map((item: any) => (
          <div key={item.id} className='border rounded-md p-2 my-2 shadow-md flex items-center justify-between'>
            <Image src={item.image} alt={item.name} width={100} height={100} className='mr-4' />
            <div>
              <h3 className='text-lg text-gray-700 font-bold'>{item.name}</h3>
              <p className='text-gray-700'>{item.price} RS</p>
            </div>
            <div>
              <div className='p-1'>
                Quantity
              </div>
              <div className='p-1'>
                <button>Remove</button>
              </div>
            </div>
          </div>
        ))
      )}
      </div>
    </div>
  )
}