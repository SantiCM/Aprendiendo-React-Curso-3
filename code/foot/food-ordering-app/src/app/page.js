import Hero from "../components/layout/Hero";
import HomeMenu from "../components/layout/HomeMenu";
import SectionHeaders from "../components/layout/SectionHeaders";

export default function Home() {

  return (
    
    <div>

      <Hero></Hero>

      <HomeMenu></HomeMenu>

      <section className="text-center my-10">

        <SectionHeaders 
          subHeader={"Dont hesitate"}
          mainHeader={"Contact Us"}
      
        />

        <div className="mt-8">

          <a className="text-4xl mx-auto text-black">+12 345 678 912</a>

        </div>
       
      </section>

      <footer className="border-t pt-8 text-center text-gray-900">
         
        <p className="font-semibold text-xl">@ Reserved</p>
   
      </footer>

    </div>
    
  )

}