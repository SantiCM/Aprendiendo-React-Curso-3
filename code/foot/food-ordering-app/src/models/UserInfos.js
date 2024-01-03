import {Schema, model, models} from "mongoose"

const UserInfoSchema = new Schema({

    email: {type: String, require: true},

    phone: {type: String},

    streetAddress: {type: String},

    postalCode: {type: String},

    city: {type: String},

    country: {type: String},

    admin: {type: Boolean, default: false}

})

export const UserInfo = models?.UserInfo || model("UserInfo", UserInfoSchema)