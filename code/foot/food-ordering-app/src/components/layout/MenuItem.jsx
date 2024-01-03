export default function Menu() {

    return (
        
        <div 
            
            className="bg-tercer p-4 group rounded-md text-center hover:shadow-md hover:bg-hoverMenu transition-all"
            
        >
            
            <div className="text-center">

                <img src="/veggie-burger.jpg" className="max-h-auto h-36 block mx-auto" alt={"food in menu"} />

            </div>

            <h4 className="font-semibold my-4 text-xl">Food</h4>

            <p className="text-gray-600 text-sm">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt blanditiis beatae incidunt asperiores aspernatur tempore repellat a ad porro minima.</p>

            <button className=" mt-4 bg-primary text-white px-5 py-3 rounded-md border-none">Add to cart $</button>

        </div>
        
    )

}