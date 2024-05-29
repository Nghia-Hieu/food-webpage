import clientPromise from "../../../../libs/mongoConnect"
import * as mongoose from "mongoose";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter"

import { User } from "../../../models/User";
import bcrypt from "bcrypt";

export const authOption = {
  secret: process.env.SECRET,
  adapter: MongoDBAdapter(clientPromise),

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    CredentialsProvider({
      name: 'Credentials',
      id: 'credentials',
      credentials: {
        username: { label: "Email", type: "email", placeholder: "test@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const email = credentials?.email;
        const password = credentials?.password;

        mongoose.connect(process.env.MONGO_URL);
        const user = await User.findOne({email});
        const passwordOk = user && bcrypt.compareSync(password, user.password);


        if (passwordOk) {
          console.log("Login success")
          return user;
        }
        console.log("Login failed")

        return null
      },
    }),
  ],
  session: {
    // Set to jwt in order to CredentialsProvider works properly
    strategy: 'jwt'
  }
}

const handler = NextAuth(authOption);

export {handler as GET, handler as POST};
