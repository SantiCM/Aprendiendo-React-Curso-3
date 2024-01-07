import mongoose from "mongoose"
import { Category } from "../../../models/Category"

// post de las categories, recojemos la req
export async function POST(req){

    // nos conectamos a mongo
    mongoose.connect(process.env.MONGO_URL)

    // recojemos de la respuesta el nombre y la volvemos json
    const { name } = await req.json()

    // damos el crear del schema de Category y le damos el name
    const categoryDoc = await Category.create({name})

    // retornamos el response, la volvemos json y damos la creacion
    return Response.json(categoryDoc)

}

// editar
export async function PUT(req) {

    // nos conectamos
    mongoose.connect(process.env.MONGO_URL)

    // recojemos el _id de mongo y el name del await de la req
    const {_id, name} = await req.json()

    // damos el await del schema, le damos el update y damos la data de arriba
    await Category.updateOne({_id}, {name} )

    // retornamos la res, la volvemos json y la pasamos 
    return Response.json(true)

}

// insertar
export async function GET() {

    // nos conectamos
    mongoose.connect(process.env.MONGO_URL)

    // retornamos la res, la volvemos json
    return Response.json(

        // damos el await del schema y damos el metodo find, osea que el primer arreglo que pase
        // se muestra
        await Category.find()
        
    )

}

// eliminar
export async function DELETE(req) {

    // nos conectamos
    mongoose.connect(process.env.MONGO_URL)

    // recojemos la url de una new URL de la req de la url
    const url = new URL(req.url)

    // recojemos el _id
    // del url, de los params, damos el get, lo insertamos
    // damos el id
    const _id = url.searchParams.get("_id")

    // await del schema, lo eliminamos dando el id
    await Category.deleteOne({_id})

    // retornamos la response, la volvemos json y la pasamos
    return Response.json(true)

}