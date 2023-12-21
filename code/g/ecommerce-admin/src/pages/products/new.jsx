import { useState } from "react"
import Layout from "../../components/Layout"
import axios from "axios"
import { useRouter } from "next/router"
import ProductForm from "@/components/ProductForm"

export default function New()  {

    return (

        <Layout>

            <h1>New Product</h1>

            <ProductForm></ProductForm>

        </Layout>
    

    )
    
}