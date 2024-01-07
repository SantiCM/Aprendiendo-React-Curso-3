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

    // recojemos el name, la imagen, y la copia de la data restante
    const {name, image, ...otherUserInfo} = data

    // la session la recojemos del await del servicio de session y damos el auth del next auth
    const session = await getServerSession(authOptions)

    // recojemos el email de la session de arriba del user del email
    const email = session.user.email

    //const userData = { name: data.name, image: data.image }

    // update
    // await del user del schema, lo actualizamos, damos la data
    await User.updateOne({email}, {name, image})

    // await del shcme a de la informacion del user
    // damos el email, la copia de la data 
    // y el upser en true 
    // osea Crea un nuevo documento si ningún documento coincide con el filtro
    await UserInfo.findOneAndUpdate({email}, otherUserInfo, { upsert: true })

    // retornamos la res, la volvemos json en true 
    return Response.json(true)

}

// insertar
export async function GET(){

    // nos conectamos
    mongoose.connect(process.env.MONGO_URL)

    // recojemos la session
    const session = await getServerSession(authOptions)

    // el email, lo recojemos de la session, (si viene), del usuario (si viene) y el email
    const email = session?.user?.email

    // si no existe el email, damos la res como arreglo vacio
    if(!email) {
    
        return Response.json({})
    
    }

    // recojemos el user, del await del schema 
    // damos el findOne, busca el primer documento que pase
    // damos el email 
    // y el lean,  acepta un valor booleano opcional que puede ser verdadero o falso
    const user = await User.findOne({email}).lean()

    // recojemos el user de la info , del await del schema 
    // damos el findOne, busca el primer documento que pase
    // damos el email 
    // y el lean,  acepta un valor booleano opcional que puede ser verdadero o falso
    const userInfo = await UserInfo.findOne({email}).lean()

    // retornamos la res, de la copia del usuario y su info 
    return Response.json( { ...user, ...userInfo } )

}