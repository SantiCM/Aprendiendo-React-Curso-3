import {Schema, model, models} from "mongoose"

const extraPrice = new Schema({

    name: String,

    price: Number

})

const MenuItemSchemma = new Schema({

    images: {type: String},

    name: {type: String},

    basePrice: {type: String},
    
    description: {type: String},

    sizes: { type:[extraPrice] },

    extraIngredients: { type:[extraPrice] }

}, {timestamps: true})

export const MenuItem = models?.MenuItem || model("MenuItem", MenuItemSchemma)