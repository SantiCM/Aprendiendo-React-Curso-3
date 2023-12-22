import Hero from "../components/layout/Hero";
import HomeMenu from "../components/layout/HomeMenu";
import SectionHeaders from "../components/layout/SectionHeaders";

export default function Home() {

  return (
    
    <>

      <Hero></Hero>

      <HomeMenu></HomeMenu>

      <section className="text-center my-8">

        <SectionHeaders 
          subHeader={"Our Story"}
          mainHeader={"About Us"}
      
        />

        <p className="max-w-2xl mx-auto mt-4 text-gray-500">

          Velit ad occaecat est aliquip duis duis nisi nostrud dolor fugiat incididunt deserunt aliquip voluptate. Eiusmod cupidatat consectetur amet reprehenderit non voluptate pariatur. Sint eiusmod sint officia officia anim nostrud dolor.
          Ullamco magna in magna pariatur aute laborum do ea qui labore elit dolor culpa. 
        </p>
      
      </section>

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

    </>
    
  )

}