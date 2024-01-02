
export default function InputProfile() {

    const [userName, setUserName] = useState("")

    const [phone, setPhone] = useState("")

    const [streetAddress, setStreetAddress] = useState("")

    const [postalCode, setPostalCode] = useState("")

    const [city, setCity] = useState("")

    const [country, setCountry] = useState("")

    return (

        <>
    
            <input
    
            type="text"
        
            placeholder="Please enter your full name"
        
            value={userName}
        
            onChange={(ev) => setUserName(ev.target.value)}

        ></input>

        <input

            type="email"
   
            disabled={true}
   
            value={session.data.user.email}
   
        ></input>

        <input
    
            type="tel"
        
            placeholder="Phone Number"
        
            value={phone}
        
            onChange={(ev) => setPhone(ev.target.value)}
      
        ></input>

        <input
            
            type="text"

            placeholder="Street address"

            value={streetAddress}

            onChange={(ev) => setStreetAddress(ev.target.value)}
       
        ></input>

        <div className="flex gap-2">
            
            <input
                type="text"
                placeholder="City"
                value={city}
                onChange={(ev) => setCity(ev.target.value)}
            ></input>

            <input
                
                type="text"
                
                placeholder="Postal Code"
                
                value={postalCode}
                
                onChange={(ev) => setPostalCode(ev.target.value)}
        
            ></input>
        
        </div>

        <input
            
            type="text"
            
            placeholder="Country"
            
            value={country}
            
            onChange={(ev) => setCountry(ev.target.value)}
            
        ></input>    
        
    </>
  
  );


}