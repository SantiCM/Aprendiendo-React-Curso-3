import Image from "next/image";
import ensaldLeft from "../../../public/sallad2.png"
import ensaldRight from "../../../public/sallad1.png"
import Menu from "./MenuItem";
import SectionHeaders from "./SectionHeaders";

export default function HomeMenu(){

    return (
        
        <section className="">

            <div className="absolute h-full left-0 right-0 w-full justify-start">

                <div className="absolute left-0 -top-[70px] text-left -z-10">

                    <Image src={ensaldRight} width={109} height={189}  alt="Ensalada"></Image>
                    
                </div>

                <div className="absolute -top-[200px] right-0 -z-10">

                    <Image src={ensaldLeft} width={107} height={100} alt="Ensalada"></Image>
                    
                </div>

            </div>

            <div className="text-center mb-4">

                <SectionHeaders 
                
                    subHeader={"Check Out"}

                    mainHeader={"Menu"}
                
                />

            </div>

            <div className="grid grid-cols-3 gap-6">

                <Menu></Menu>

                <Menu></Menu>

                <Menu></Menu>

                <Menu></Menu>

                <Menu></Menu>

                <Menu></Menu>
                
            </div>

        </section>
        
    )

}