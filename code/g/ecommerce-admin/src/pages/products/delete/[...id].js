import Layout from '@/components/Layout'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

export default function DeleteProduct() {

    const [productInfo, setProductInfo] = useState()

    const router = useRouter()

    const {id} = router.query

    useEffect(() => {
        
        if(!id) {
        
            return
            
        }

        axios.get("/api/products?id="+id).then(response => {
            
            setProductInfo(response.data)
        
        })

    }, [id])
    

    function goBack(){
        
        router.push("/products")
    
    }

    async function deleteProduct(){
        
        await axios.delete("/api/products?id="+id)  
        
        goBack()

    }
  
    return(

        <Layout>

            <h1 className='text-center text-4xl'>Do you really want to delete  "{productInfo?.title}" ?</h1>

            <div className='flex gap-2 justify-center pt-3'>

                <button onClick={deleteProduct} className='btn-yes'>YES</button>

                <button className='btn-no' onClick={goBack}>NO</button>

            </div>
            
        </Layout>
  
    )

}