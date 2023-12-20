import { useState } from "react"
import Layout from "../../components/Layout"
import axios from "axios"
import { useRouter } from "next/router"

export default function New()  {

    const [title, setTitle] = useState("")

    const [description, setDescription] = useState("")

    const [price, setPrice] = useState("")

    const [goToProducts, setGoToProducts] = useState(false)

    const router = useRouter()

    async function createProduct (ev) {

        ev.preventDefault()

        const data = {title, description, price}
        
        await axios.post("/api/products", data);

        setGoToProducts(true)
    
    }

    if(goToProducts) {
        
        router.push("/products")
    
    }

    return (
        
        <Layout>

            <form onSubmit={createProduct}>

                <h1>New Product</h1>

                <label htmlFor="">Product Name</label>

                <input type="text" placeholder="Product Name" value={title} onChange={ev => setTitle(ev.target.value)}></input>

                <label htmlFor="">Description</label>

                <textarea placeholder="Description" value={description} onChange={ev => setDescription(ev.target.value)}></textarea>

                <label htmlFor="">Price (in USD)</label>

                <input type="number" placeholder="price" value={price} onChange={ev => setPrice(ev.target.value)}/>

                <button type="submit" className="btn-primary">Save</button>

            </form>

        </Layout>
   
    )

}
