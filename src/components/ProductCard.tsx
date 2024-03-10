import { ProductType } from "@/app/types"

type Props = {
    product: ProductType;
}

export default function ProductCard({product}:Props){
    return(
        <div className="card card-compact w-90 bg-gray-900 shadow-xl">
        <figure><img src={product.image} alt="img" /></figure>
        <div className="card-body">
            <div className="">
                <h3 className="card-title text-[16px] whitespace-nowrap overflow-ellipsis overflow-hidden">{product.name}</h3>
            </div>
            <div className="flex justify-left gap-2">
                <h3 className="card-title text-[13px]">{product.rating}⭐</h3>
                <h3 className="card-title text-[13px]">{product.price} RS</h3>
            </div>
            <div className="text-left">
            <p>{product.description.length <= 70 ? product.description : product.description.substring(0,70)}...</p>
            </div>
            <div className="card-actions justify-between font-semibold">
                <button className="px-3 py-2 bg-primary text-black rounded-md">Read More</button>
                <button className="px-3 py-2 bg-primary text-black rounded-md">Add to Cart</button>
            </div>
        </div>
        </div>
    )
}