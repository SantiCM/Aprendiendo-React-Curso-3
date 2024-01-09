import mongoose from "mongoose"
import { getServerSession } from "next-auth"
import {authOptions} from "../auth/[...nextauth]/route"
import { User } from "../../../models/User"
import {UserInfo} from "../../../models/UserInfos"

// editar
export async function PUT(req){

    // nos conectamos
    mongoose.connect(process.env.MONGO_URL)

    // la data la recojemos el await de la res
    const data = await req.json()
    
    // recojemops el id, el name, la imagen y la demas informacion igual a data
    const {_id, name, image, ...otherUserInfo} = data

    // damos un arreglo vacio
    let filter = {}

    // si el id pasa
    if(_id) {
        
        // damos el arreglo como id
        filter = {_id}

    } else {
        
        // la session la recojemos del await del servicio de session y damos el auth del next auth
        const session = await getServerSession(authOptions)

        // recojemos el email de la session de arriba del user del email
        const email = session.user.email

        // damos el filter, el email
        filter = {email}

        //const userData = { name: data.name, image: data.image }
    
    }

    // recojemos el user del await del schema, buscamos un filtro que pase y damos ese arreglo
    const user = await User.findOne(filter)

    // await del user, damos el filter, el name y la image
    await User.updateOne(filter, {name, image})

    // await del schema de la infp del user, la actualizamos, damos el email, del user del email, damos la demas info, y damos que pase
    await UserInfo.findOneAndUpdate({email: user.email}, otherUserInfo, { upsert: true })

    // retornamos la res, la volvemos json en true 
    return Response.json(true)

}

// insertar
export async function GET(req){

    // nos conectamos
    mongoose.connect(process.env.MONGO_URL)

    const url = new URL(req.url)

    const _id = url.searchParams.get("_id")

    let filter = {}

    if(_id) {

        filter = {_id}
    
    } else {
    
        // recojemos la session
        const session = await getServerSession(authOptions)

        // el email, lo recojemos de la session, (si viene), del usuario (si viene) y el email
        const email = session?.user?.email

        // si no existe el email, damos la res como arreglo vacio
        if(!email) {
    
            return Response.json({})
    
        }

        filter = { email }

    }

    const user = await User.findOne(filter).lean()

    const userInfo = await UserInfo.findOne({ email: user.email }).lean()

    // retornamos la res, de la copia del usuario y su info 
    return Response.json( { ...user, ...userInfo } )

}