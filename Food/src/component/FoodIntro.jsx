import { currencyFormatter } from "../util/formatting"
import Button from "./UI/Button"

export default function FoodIntro({data}){
    return(
        <ul className="grid grid-cols-[repeat(auto-fit,minmax(20rem,1fr))]
            text-center gap-2">
                {data.map((All)=>(
                    <li className="bg-[#1d1a16] rounded-xl flex 
                    flex-col justify-between items-center overflow-hidden
                    w-full h-full" key={All.id}>
                        <img className="w-full h-[20rem] object-cover" src={`http://localhost:3000/${All.image}`} alt={All.title}/>
                        <p className="text-2xl mt-2">{All.name}</p>
                        <div className="text-yellow-300 bg-yellow-800 rounded-md w-1/3 inline-block my-2">{currencyFormatter.format(All.price)}</div>
                        <div>{All.description}</div>
                        <Button>Add to Cart</Button>
                    </li>
                ))}
            </ul>
    )
}