import Right from "../icons/Right";
//import ImgHeader from "../../../public/margherita-pizza.jpg"
//import Image from "next/image";

export default function Hero() {

    return (
        
        <section className="hero mt-8">

            <div>

                <h1 className="text-5xl font-bold text-center">
                    
                    <p>Do you want a huge variety of</p>

                    <p className="text-primary pt-3">FAST FOOD ?</p>
                    
                </h1>

                <p className="my-5 font-medium text-gray-500 text-3xl text-center">Here you will find the best fast food, with the greatest variety and extremely delicious.</p>

                <div className="flex justify-center mb-7">

                    <button 
                    
                        className="bg-primary text-white px-5 py-2 rounded-md gap-2"
                        
                    >
                        <p>Order Now</p>

                        <Right></Right>
                        
                    </button>

    
                    <button 
                    
                        className="flex items-center bg-white border-0 gap-2 py-2 text-black font-semibold"
                    >
                        <p>Learn More</p>

                        <Right></Right>
                    
                    </button>

                </div>

            </div>


        </section>
        
    )

}