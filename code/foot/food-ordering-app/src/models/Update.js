import {Schema, model, models} from "mongoose"
import {appConfig} from "../../config"


const UpdateImg = new Schema({

    name: {type: String},

    size: {type: Number},

    imgUrl: {type: String},

    description: {type: String},

}, {timestamps: true})

UpdateImg.methods.setImgUrl = function setImgUrl(filename) {

    const {host, port} = appConfig

    imgUrl = `${host}:${port}/public/${filename}`

}


export const Update = models?.Update || model("Update", UpdateImg)