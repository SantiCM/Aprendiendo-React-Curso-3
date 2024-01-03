"use client"
import UserProfile from "../../components/UserProfile";
import TabsProfile from "../../components/layout/TabsProfile";


export default function Menu() {

    const { data: profileData , loanding: profileLoanding } = UserProfile()

    if(profileLoanding) {
        
        return "Loanding User Info..."
    
    }

    if(profileData.admin) {
        
        return "Not And Admin"
    
    }

    return (
        
        <section className="mt-8">
            
            <TabsProfile admin={true}></TabsProfile>

            <div className="bg-white pt-2 rounded-2xl">

            <form className="mt-7 max-w-lg mx-auto">
                
                <div className="flex gap-2 items-end">

                    <div className="grow">

                        <label className="text-gray-900 text-md uppercase">Name</label>
        
                        <input type="text"></input>

                        <label className="text-gray-900 text-md uppercase">Price</label>
        
                        <input type="text"></input>

                        <label className="text-gray-900 text-md uppercase">Base Price</label>
        
                        <input type="text"></input>

                        <label className="text-gray-900 text-md uppercase">Image</label>
        
                        <input type="text"></input>

                        <button className="bg-primary text-white border-none mb-8" type="submit">Save</button>
            
                    </div>

                </div>

            </form>

            </div>

        </section>
        
    )

}