import mongoose from "mongoose";
import { User } from "../../../models/User";

export async function GET(req) {

    mongoose.connect(process.env.MONGO_URL)

    const users = await User.find()

    return Response.json(users)

}