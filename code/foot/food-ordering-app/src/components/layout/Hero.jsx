import Image from "next/image";
import pizzaLogo from "../../../public/pizza.png"
import Right from "../icons/Right";

export default function Hero() {

    return (
        
        <section className="hero mt-8">

            <div className="py-12">

                <h1 className="text-5xl font-bold leading-normal">
                    
                    Everything is better with a <span className="text-primary">Pizza</span>
                    
                </h1>

                <p className="my-5 font-medium text-gray-400">Pizza is the missing piece that makes every day complete, a simple yet delicious joy in life</p>

                <div className="flex gap-4 ">

                    <button 
                    
                        className="bg-primary text-white px-5 py-2 rounded-md items-center flex gap-2"
                        
                    >
                        Order Now

                        <Right></Right>
                        
                    </button>

                    <button 
                    
                        className="flex gap-2 py-2 text-gray-600 font-semibold"
                    >
                        Learn More

                        <Right></Right>
                    
                    </button>

                </div>

            </div>
            
            <div className="relative">

                <Image src={pizzaLogo} layout="fill" objectFit="contain" alt={"Pizza"} />

            </div>

        </section>
        
    )

}