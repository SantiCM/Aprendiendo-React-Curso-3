import { Schema, model, models } from "mongoose"

// schema 
const categorySchema = new Schema({

    // recojemos el name, de tipo string, si es requerido
    name: {type: String, required: true}

}, {timestamps: true})

export const Category = models?.Category || model("Category", categorySchema)