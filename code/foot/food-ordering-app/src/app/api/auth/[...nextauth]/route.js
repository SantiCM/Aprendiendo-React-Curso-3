import { User } from "../../../../models/User";
import mongoose from "mongoose";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "../../../../libs/mongoConnect";


// Damos el auth de next
// en este caso dentro de la carpeta de app, damos otra carpeta de api, damos otra carpeta de auth
// damos otra de [...nextauth] y damos el archivo que se llama route
export const authOptions = {

  // la api secreta es la que queramos por defecto
  secret: process.env.SECRET,

  // se adaptadara al mongodb que da el auth y le damos la configuracion que necesita el auth
  // con mongodb
  adapter: MongoDBAdapter(clientPromise),

  // los provedores que utilizamos son, el de google
  providers: [
    
    // provedor de google
    GoogleProvider({
      
      // damos el id del cliente del cloud 
      clientId: process.env.GOOGLE_CLIENT_ID,
      // y la api secreta
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
  
    }),
    
    // damos las crendenciales con su name y su id
    CredentialsProvider({
  
      name: "credentials",
  
      id: "credentials",
  
      credentials: {
        
        // el username lo recibe del email
        username: { label: "Email", type: "email",  placeholder: "test@example.com", },

        // y damos el password
        password: { label: "Password", type: "password" },
      
      },
      
      // damos el asincrono de la autorizacion, damos las crendenciales 
      async authorize(credentials, req) {

        // recojemos el email de las crendenciales si llegan del email al igual que con el password
        const email = credentials?.email

        const password = credentials?.password

        // nos conectamos a mongo dandole la url 
        mongoose.connect(process.env.MONGO_URL)

        // recojemos el user, del await del User (del schemma) y le damos el findOne 
        // el cual busca el primer documento que coincida con la consulta después de omitir un número de filas especificado
        // y recojemos el email como objeto
        const user = await User.findOne({email})

        // si el password pasa, es el user de arriba y damos el crypt de la password y le decimos que sera el password del user
        const passwordOk = user && bcrypt.compareSync(password, user.password)

        // si el password pasa
        if(passwordOk) {

          // retornamos el usuario
          return user
        
        }

        // si no retornamos nulo (siempre)
        return null;
      },
   
    }),
  
  ],

}

// damos el auth
const handler = NextAuth(authOptions)

// exportamos la variable para get y post
// viene por defecto en la doc de nextauth
export {handler as GET, handler as POST}