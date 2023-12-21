import multiparty from "multiparty"

export default async function upload (req, res) {

    const form  = new multiparty.Form()

    const {fields, files} = await new Promise((resolve, reject) => {

        form.parse(req, (err, fields, files) => {

            if(err) reject(err)

            resolve({files, fields})
            
        })
        
    })

    console.log(fields.file.length)
    console.log(files)

    return res.json("ok")
  
}

export const config = {

    api: {bodyParser: false}

}

/*import { imageDB } from "@/firebase/config"
import { data } from "autoprefixer"
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage"
import { useEffect, useState } from "react"
import {v4} from "uuid"

export default async function Upload() {

    const [img, setImg] = useState("")

    const [imgUrl, setImgUrl] = useState([])

    const click = () => {

        if(img !== null) {

            const imgRef = ref(imageDB, `files/${v4()}`)

            uploadBytes(imgRef, img).then(value => {
            
                
                getDownloadURL(val).then(url => {
                    
                    setImgUrl(data=>[...data, url])
                
                })
            
            })
        
        
        }
        
    
    }

    useEffect(() => {
      
        listAll(ref(imageDB, "files")).then(imgs => {
        
            
            imgs.items.forEach(val => [
            
                getDownloadURL(val).then(url => {
                    
                    setImgUrl(data => [...data, url])
                
                })
            
            ])
        
        })


    }, [])
    

    return (
        
        <div>

            <input type="file" onChange={(e) => setImg(e.target.files[0])}></input>

            <button onClick={click}></button>

        </div>

        
        
    )

}
*/