import {Schema, model, models} from "mongoose"

const MenuItemSchemma = new Schema({

    images: {type: String},

    name: {type: String},

    basePrice: {type: String},
    
    description: {type: String}

}, {timestamps: true})

export const MenuItem = models?.MenuItem || model("MenuItem", MenuItemSchemma)