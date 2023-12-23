import { Schema, model, models } from "mongoose"

//Modelo del Schemma del user
// damos un nuevo schema 
const userSchemma = new Schema({

    name: {type: String},

    // el  email sera de tipo string, requerido y unico
    email: {type: String, require: true, unique: true},

    // el password es de tipo strin y requerido
    password: {
        
        type: String, 
        
        require: true, 
    
    }
     
    // admiten una opción de marcas de tiempo en true 
}, {timestamps: true})

// si el usuario del schemma es posteado, damos el validate, damos una funcion y damos argumento del user
/*userSchemma.post("validate", function (user) {

    // aqui el password no esta encriptado, lo recojemos del user del password
    const notHashedPassword = user.password

    // le damos el cryot de la generacion que sera de 10
    const salt = bcrypt.genSaltSync(10)

    // ya encriptado el passworrd, damos el cryot del has, del not de arriba y del salt
    const hashedPassword = bcrypt.hashSync(notHashedPassword, salt)

    // el usuario del password sera el password ya encriptado
    user.password = hashedPassword

})*/

// damos el user del schema de los models si pasa del usuario y del model del User, del userSchemma de arriba
export const User = models?.User || model("User", userSchemma)