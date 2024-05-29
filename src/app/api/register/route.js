import { User } from "./../../models/User";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

export async function POST(req) {
  const body = await req.json();
  mongoose.connect(process.env.MONGO_URL);
  const pass = body.password;
  if (!pass?.length || pass.length < 5) {
    new Error("Password must be at least 5 characters");
    return false;
  }
  
  const originPass = pass;
  console.log(originPass + " " + originPass.length)
  const salt = bcrypt.genSaltSync(10);
  body.password = bcrypt.hashSync(originPass, salt);
  console.log(body.password);
  //console.log(bcrypt.compareSync(originPass, body.password))
  
  const createdUser = await User.create(body);
  return Response.json(createdUser);
}
