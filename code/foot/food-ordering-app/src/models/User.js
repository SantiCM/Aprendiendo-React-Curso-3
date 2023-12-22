import { Schema, model, models } from "mongoose"
import bcrypt from "bcrypt"

const userSchemma = new Schema({

    email: {type: String, require: true, unique: true},

    password: {
        
        type: String, 
        
        require: true, 
        
        validate: pass => {
            
            if(!pass?.length || pass.length < 5) {
                
                new Error("password must be at least 5 characters")

                return false
            
            }
        
        }
    
    }

}, {timestamps: true})

userSchemma.post("validate", function (user) {

    const notHashedPassword = user.password

    const salt = bcrypt.genSaltSync(10)

    const hashedPassword = bcrypt.hashSync(notHashedPassword, salt)

    user.password = hashedPassword

})

export const User = models?.User || model("User", userSchemma)