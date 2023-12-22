import {User} from "../../../models/User"
import mongoose from "mongoose"

// hacemos la funcion del post que es el de registro
// le damos la req
export async function POST(req) {

    // recojemos el body del await de la req que se hace json
    const body = await req.json()

    // nos conectamos a mongoose con su clave
    mongoose.connect(process.env.MONGO_URL)

    // el creaar usuario viende del await del user (schemma) y lo creamos para que sea el body
    const createdUser = await User.create(body)

    // retornamos la respuesta en json de arriba
    return Response.json(createdUser)

}