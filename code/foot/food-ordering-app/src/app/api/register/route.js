import {User} from "../../../models/User"
import mongoose from "mongoose"
import bcrypt from "bcrypt"

// hacemos la funcion del post que es el de registro
// le damos la req
export async function POST(req) {

    // recojemos el body del await de la req que se hace json
    const body = await req.json()

    // nos conectamos a mongoose con su clave
    mongoose.connect(process.env.MONGO_URL)

    const pass = body.password

    // si no pasa en su totalidad y el pase no pasado es menor a 5
    if(!pass?.length || pass.length < 5) {

        // damos el error 
        new Error("Password Must Be At Least 5 Characters")

        // retornamos falso
        return false
    
    }

    // aqui el password no esta encriptado, lo recojemos del pass
    const notHashedPassword = pass

    // le damos el cryot de la generacion que sera de 10
    const salt = bcrypt.genSaltSync(10)

    // ya encriptado el passworrd, damos el cryot del has, del not de arriba y del salt
    const hashedPassword = bcrypt.hashSync(notHashedPassword, salt)

    // el body del password sera el password ya encriptado
    body.password = hashedPassword

    // el creaar usuario viende del await del user (schemma) y lo creamos para que sea el body
    const createdUser = await User.create(body)

    // retornamos la respuesta en json de arriba
    return Response.json(createdUser)

}