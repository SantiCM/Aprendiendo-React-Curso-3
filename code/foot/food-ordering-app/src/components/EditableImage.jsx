import Image from "next/image";
import { useState } from "react";

export default function EditableImage( { link, setLink } ) {
  
  const [loanding, setLoanding] = useState(false)

  async function handleFile(ev) {
    
    const files = ev.target.files

    const data = new FormData()

    data.append("file", files[0])

    data.append("upload_preset", "images")

    setLoanding(true)

    const response = await fetch("https://api.cloudinary.com/v1_1/dqprmrwka/image/upload", {
        
      method: "POST", body: data
  
    })

    const file = await response.json()

    setLink(file.secure_url)

    console.log(file.asset_id)

    setLoanding(false)

    // si el file pasa
    if(file.ok) {
      
      // retornamos ese file, que lo vuelva json, le damos el then
      // damos el link como argumento
      // si pasa damos un segundo estado donde damos que se muestre el link
      return file.json().then(link => {
        
        setLink(link)
      
      })
    
    }

  }

  return (

    <>

      <div className="bg-gray-200 rounded-md p-2">

        <input type="file" className="hidden" onChange={handleFile}/>

        <span className="block text-2xl text-black cursor-pointer">Edit</span>

      </div>

      {loanding 
      
        ? 
    
        <h3 className="text-center font-semibold text-xl">Loanding...</h3> 
      
        : 
      
        link && (

          <>

            <Image width={250} height={250} className="w-full h-full" src={link}></Image>

          </>

        )
    
      }

      {!link && (
                          
        <div className="bg-bgform p-2 mt-3 flex justify-center mb-4 rounded-md">
                  
          <p className="text-xl">No Image Select</p>
                  
        </div>
                                            
      )}

    </>
    
  )

}