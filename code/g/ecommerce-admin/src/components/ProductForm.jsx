import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import Upload from "@/pages/api/upload";

export default function ProductForm({

  _id,

  title: existingTitle,

  description: existingDescription,

  price: existingPrice,

  images,

}) {
  
    const [title, setTitle] = useState(existingTitle || "");

    const [description, setDescription] = useState(existingDescription || "");

    const [price, setPrice] = useState(existingPrice || "");

    const [goToProducts, setGoToProducts] = useState(false);

    const router = useRouter();

    async function saveProduct(ev) {

        ev.preventDefault();

        const data = { title, description, price };

        if (_id) {
            
            // update
            await axios.put("/api/products", { ...data, _id });
        
        } else {
            
            // create
            await axios.post("/api/products", data);
        
        }

        setGoToProducts(true);
    }

    if (goToProducts) {
        
        router.push("/products");
    
    }

    
    async function uploadPhoto(ev) {
        
        ev.preventDefault();

        const files = ev.target?.files;

        if (files.length > 0) {
        
            const data = new FormData();

            for (const file of files) {
            
                data.append("file", file);
        
            }

            const res = await fetch("/api/upload", {
               
                method: "POST",

                body: data,
            
            });
    
        }
    
    }

    return (
        
        <form onSubmit={saveProduct}>
            
            <label>Product Name</label>

            <input
                
                type="text"
                placeholder="Product Name"
                value={title}
                onChange={(ev) => setTitle(ev.target.value)}
            
            />

            <label className="text-xl">Photos</label>

            <div className="mb-2">
                
                <label className="w-24 h-24 flex flex-col cursor-pointer items-center justify-center text-sm gap-1 text-gray-500 rounded-md bg-gray-200">
                        
                    <FileUploadIcon></FileUploadIcon>

                    <div>Upload</div>

                    <input type="file" className="hidden" onChange={uploadPhoto}></input>
                    
                </label>

                {!images?.length && <div>NO Photos In This Product</div>}
                
            </div>

            <label>Description</label>

            <textarea
                        
                placeholder="Description"
                        
                value={description}
                        
                onChange={(ev) => setDescription(ev.target.value)}
                    
            ></textarea>

            <label>Price (in USD)</label>

            <input
                        
                type="number"
                        
                placeholder="price"
                        
                value={price}
                        
                onChange={(ev) => setPrice(ev.target.value)}
                    
            />

            <button type="submit" className="btn-primary">Save</button>

        </form>

    );

}