import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import UserProfile from "./UserProfile";


export default function UserInputForm( { user, onSave } ) {

    const [userName, setUserName] = useState(user?.name || "")

    const [phone, setPhone] = useState(user?.phone || "")

    const [streetAddress, setStreetAddress] = useState(user?.streetAddress || "")

    const [postalCode, setPostalCode] = useState(user?.postalCode || "")

    const [city, setCity] = useState(user?.city || "")

    const [country, setCountry] = useState(user?.country || "")

    const [admin, setAdmin] = useState(user?.admin || false)

    const session = useSession()

    const { data } = UserProfile()

    const userImage = session.data?.user?.image

    const cssLabel = "text-gray-900 text-md uppercase"

    return (
    
        <>
     
            <div className="flex justify-center">
       
                <div className="rounded-lg p-2">
         
                    <Image
           
                        className="rounded-md" src={userImage} alt="Image User Google" width={100} height={100}
         
                    ></Image>
       
                </div>
     
            </div>

            <form 
            
                className="grow" 
                
                onSubmit={ev => onSave(ev, { userName, phone ,streetAddress ,postalCode ,city ,country } )}>

                <label className={cssLabel}>Name</label>
       
                <input
         
                    type="text" placeholder="Please enter your full name" 
                
                    value={userName} onChange={(ev) => setUserName(ev.target.value)}
       
                ></input>
                
                <label className={cssLabel}>Email</label>

                <input
         
                    type="email" disabled={true} value={session?.data?.user?.email}
       
                ></input>

                <label className={cssLabel}>Phone Number</label>

                <input
          
                    type="tel" placeholder="Phone Number" value={phone} onChange={(ev) => setPhone(ev.target.value)}
            
                ></input>

                <label className={cssLabel}>Street Address</label>

                <input
            
                    type="text"  placeholder="Street address"
            
                    value={streetAddress} onChange={(ev) => setStreetAddress(ev.target.value)}
            
                ></input>

                <div className="grid grid-cols-2 gap-2">

                    <div>

                        <label className={cssLabel}>City</label>
                        
                        <input
                        
                            type="text" placeholder="City" value={city} onChange={(ev) => setCity(ev.target.value)}
                
                        ></input>
    
                    </div>

                    <div>

                        <label className={cssLabel}>Postal Code</label>

                        <input
                        
                            type="text" placeholder="City" value={postalCode} onChange={(ev) => setPostalCode(ev.target.value)}
            
                        ></input>

                    </div>

                </div>

                <label className={cssLabel}>Country</label>

                <input
            
                    type="text" placeholder="Country" value={country} onChange={(ev) => setCountry(ev.target.value)}
            
                ></input>

                {data.admin && (
                    
                    <div>

                        <label htmlFor="admin" className="flex items-center gap-3 p-3 ">

                            <input 
                        
                                className="" value={"1"} 
                            
                                checked={admin} onChange={ev => setAdmin(ev.target.checked)} id="admin" type="checkbox"
                            
                            ></input>

                            <span className="font-bold text-xl">Admin</span>

                        </label>
                
                    </div>

                )}

                <button className="bg-primary text-white mb-4" type="submit">
             
                    Save
            
                </button>
        
            </form>
   
        </>
  
    );

}