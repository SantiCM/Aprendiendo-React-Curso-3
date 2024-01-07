import {Schema, model, models} from "mongoose"

// info del user
const UserInfoSchema = new Schema({

    // recojemos el email
    // de tipo string
    // requerido 
    email: {type: String, require: true},

    // recojemos el phone
    // de tipo string    
    phone: {type: String},

    // recojemos el streetAddress
    // de tipo string
    streetAddress: {type: String},

    // recojemos el postalCode
    // de tipo string
    postalCode: {type: String},

    // recojemos el city
    // de tipo string
    city: {type: String},

    // recojemos el country
    // de tipo string
    country: {type: String},

    // recojemos el admin
    // de tipo bolean, por defecto, en falso
    admin: {type: Boolean, default: false}

})

export const UserInfo = models?.UserInfo || model("UserInfo", UserInfoSchema)