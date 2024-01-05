import Image from "next/image";
import { useState } from "react";

export default function EditableImage({ link, setLink }) {

  const [image, setImage] = useState("")

  const [loanding, setLoanding] = useState(false)
  
  async function handleFile(ev) {
    
    const files = ev.target.files

    const data = new FormData()

    data.append("file", files[0])

    data.append("upload_preset", "images")

    setLoanding(true)

    const response = await fetch(
      
      "https://api.cloudinary.com/v1_1/dqprmrwka/image/upload",

      {
        
        method: "POST", body: data
      
      }
      
    )

    const file = await response.json()

    console.log(response)

    setImage(file.secure_url)

    setLoanding(false)
    
  }

  return (
    
    <>
      
      <label>
      
        <input type="file" name="file"  onChange={handleFile}/>

        <span className="block border border-gray-300 rounded-lg p-2 text-center cursor-pointer">
         
          Change image
        
        </span>
      
      </label>
    
    </>
  
  );

}