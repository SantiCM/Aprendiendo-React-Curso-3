import {Schema, model, models} from "mongoose"

// shcmea del extra price, name y price
const extraPrice = new Schema({

    name: String,

    price: Number

})

// menu 
const MenuItemSchemma = new Schema({

    // recojemos las imagenes
    // tipo string
    images: {type: String},

    // el nombre
    // tipo string
    name: {type: String},

    // el precio
    // tipo string
    basePrice: {type: String},

    // las descripcion
    // tipo string
    description: {type: String},

    // sizes, de tipo arreglo del price
    sizes: { type:[extraPrice] },

    // extra, de tipo arreglo del price
    extraIngredients: { type:[extraPrice] }

}, {timestamps: true})

export const MenuItem = models?.MenuItem || model("MenuItem", MenuItemSchemma)