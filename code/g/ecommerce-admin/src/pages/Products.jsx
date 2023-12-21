import { useEffect, useState } from "react"
import Layout from "../components/Layout"
import Link from "next/link"
import axios from "axios"
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Products() {

    const [products, setProducts] = useState([])

    useEffect(() => {

        axios.get("/api/products").then(response => {
    
            setProducts(response.data)
    
        }).catch(error => {
            console.log('fuck', error)
        })
      
    }, [])
    
    
    return (
        
        <Layout>
            
            <Link className="bg-blue-900 text-white rounded-md py-2 px-2 text-2xl" href={"/products/new"}>Add New Product</Link>

            <table className=" basic mt-5">
                    
                <p className="text-2xl flex justify-center p-3">Product Name</p>

                <tbody>

                    {products.map((product) => (

                        <tr key={product._id}>

                            <th>{product.title}</th>

                            <th>
                                
                                <Link 
                                
                                    href={"/products/edit/"+product._id}
                                    
                                >   

                                    <ModeEditIcon></ModeEditIcon>
                                    <span className="p-1">Edit</span>
                                    
                                </Link>

                                <Link style={{background: "red", marginLeft: 4}} href={"/products/delete/"+product._id}>

                                    <DeleteIcon></DeleteIcon>
                                    <span className="p-1">Delete</span>

                                </Link>

                            </th>

                        </tr>
                    
                    ))}

                </tbody>

            </table>

        </Layout>
        
    )

}