import Image from "next/image";
import foodLogo from "../../../public/margherita-pizza.jpg"
import Right from "../icons/Right";

export default function Hero() {

    return (
        
        <section className="hero mt-8">

            <div className="py-12">

                <h1 className="text-5xl font-bold leading-normal">
                    
                    Do you want a huge variety of <span className="text-primary">FAST FOOD</span>?
                    
                </h1>

                <p className="my-5 font-medium text-blackk">Here you will find the best fast food, with the greatest variety and extremely delicious.</p>

                <div className="flex gap-4 ">

                    <button 
                    
                        className="bg-primary text-white px-5 py-2 rounded-md items-center flex gap-2"
                        
                    >
                        Order Now

                        <Right></Right>
                        
                    </button>

                    <button 
                    
                        className="flex items-center border-0 gap-2 py-2 text-black font-semibold"
                    >
                        Learn More

                        <Right></Right>
                    
                    </button>

                </div>

            </div>
            
            <div className="grid">

                <Image src={foodLogo} width={200} height={200} alt={"Food"} />

            </div>

        </section>
        
    )

}