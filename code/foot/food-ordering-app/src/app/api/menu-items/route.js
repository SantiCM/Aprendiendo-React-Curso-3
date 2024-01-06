import mongoose from "mongoose"
import { MenuItem } from "../../../models/MenuItem"

// postear el menu
// recojemos la req
export async function POST(req) {

    // nos conectamos a mongo 
    mongoose.connect(process.env.MONGO_URL)

    // recojemo la data del await de la req que lo volvemos json
    const data = await req.json()

    // damos el await del Schema del MenuItem, lo creamos y lo insertamos en la data
    const menuItemDoc = await MenuItem.create(data)

    // retornamos la respuesta que se convierte en json y damos la creacion
    return Response.json(menuItemDoc)

}

// editar
export async function PUT(req) {

    // nos conectamos a mongo
    mongoose.connect(process.env.MONGO_URL)

    // recojemos del await la req de json
    // el id y toda la data
    const {_id, ...data} = await req.json()

    // await del menuitem, lo actualizamos y damos el id y la data
    await MenuItem.findByIdAndUpdate(_id, data)

    // retornamos la respuesta a json y le damos el true 
    return Response.json(true)

}

// get, insertar
export async function GET() {

    // nos conectamos a mongo
    mongoose.connect(process.env.MONGO_URL)

    // retornamos la respuesta a json, del await del menu del schema y damos el find
    // osea que encuentre del arreglo y se inserte 
    return Response.json(await MenuItem.find())

}

// eliminar
export async function DELETE(req) {

    // nos conectamos
    mongoose.connect(process.env.MONGO_URL)

    // el url, es un nuevo url que viene de la req la url
    const url = new URL(req.url)

    // el id es ese url de los params, lo insertamos el "_id"
    const _id = url.searchParams.get("_id")

    // el await del schema, lo eliminamos, y damos el _id
    await MenuItem.deleteOne({_id})

    // retornamos la respuesta del json, en true 
    return Response.json(true)

}