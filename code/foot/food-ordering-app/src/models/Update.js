import {Schema, model, models} from "mongoose"

const UpdateImg = new Schema({

    imgUrl: {type: String},

}, {timestamps: true})



export const Update = models?.Update || model("Update", UpdateImg)