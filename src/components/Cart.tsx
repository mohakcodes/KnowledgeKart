"use client"
import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

export default function Cart() {

  const [user, setUser]:any = useState();
  const [loading, setLoading] = useState(true);

  const [totalItems, setTotalItems] = useState<number[]>([]);

  const fetchUser = async () => {
    const userData = await axios.get('/api/auth/refresh');
    setUser(userData.data.data);
    setLoading(false);
    setTotalItems([...Array(userData.data.data.cart.length)].fill(1));
  }

  useEffect(() => {
    fetchUser();
  },[]);

  if(loading) return(
    <div className='flex p-3 text-black font-bold text-xl sm:text-2xl'>
      Loading Cart...
    </div> 
  )

  const handleQuantityChange = (index:number,event:any) => {
    const newQuantity = parseInt(event.target.value);
    const newTotalItems = [...totalItems];
    newTotalItems[index] = newQuantity;
    setTotalItems(newTotalItems);
  }

  const removeItem = async (index:number) => {
    const newCart = [...user.cart];
    newCart.splice(index, 1);
    const newTotalItems = [...totalItems];
    newTotalItems.splice(index, 1);
    const newUserData = {...user, cart: newCart};
    setUser(newUserData);
    setTotalItems(newTotalItems);
    await axios.post('/api/auth/updateuser', {cart: newCart});
  }

  return (

    <div className='flex flex-col text-center items-center'>
      <div className='w-[70%] lg:w-[55%] flex flex-col'>
      <p className='font-bold bg-slate-400 text-3xl text-white mt-2 rounded-md'>Your Cart</p>
      {user === undefined ? null : (
        user.cart.map((item: any, index:number) => (
          <div key={item.id} className='border rounded-md p-2 my-2 shadow-md flex md:flex-row flex-col items-center justify-between'>
            <Image src={item.image} alt={item.name} width={100} height={100} className='mr-4'/>
            <div>
              <h3 className='text-base text-gray-700 font-bold'>{item.name}</h3>
              <p className='text-gray-700'>{item.price} RS</p>
            </div>
            <div>
              <div className='p-1 flex flex-row justify-center gap-2'>
                <div className='text-gray-500'>
                  Quantity
                </div>
                <select
                  value={totalItems[index]}
                  onChange={(e)=>handleQuantityChange(index,e)}
                  className='bg-gray-200 text-gray-600'
                  required
                >
                  <option value="" disabled>
                    Select Number
                  </option>
                  {[...Array(100)].map((_, index) => (
                    <option key={index + 1} value={index + 1}>
                      {index + 1}
                    </option>
                  ))}
                </select>
              </div>
              <div onClick={()=>removeItem(index)} className='p-1 bg-blue-400 text-white rounded-lg'>
                <button>Remove</button>
              </div>
            </div>
          </div>
        ))
      )}
      <p className='font-bold bg-green-500 text-white mt-2 rounded-md'>Your Total</p>
      <div className='py-4'>
        <p className='text-gray-700 font-bold'>Total Items: {totalItems.reduce((a, b) => a + b, 0)}</p>
        <p className='text-gray-700 font-bold'>Total Price: {user.cart.reduce((a: any, b: any, index: number) => a + (b.price * totalItems[index]), 0)} RS</p>
      </div>
      </div>
    </div>
  )
}