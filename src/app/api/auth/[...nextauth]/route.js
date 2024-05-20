import clientPromise from "../../../../libs/mongoConnect"
import mongoose from "mongoose";
import NextAuth from "next-auth/next";
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
      name: "Credentials",
      id: "credentials",
      credentials: {
        username: {
          label: "Email",
          type: "email",
          placeholder: "test@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const email = credentials?.email;
        const password = credentials?.password;

        mongoose.connect(process.env.MONGO_URL);

        const user = await User.findOne({ email })

        console.log(bcrypt.compareSync(password, user.password))
        if (user && bcrypt.compareSync(password, user.password)) {
          return user;
        }
        console.log("Log in credentials failed")

        return null;
      },
    }),
  ],
}

const handler = NextAuth(authOption);

export {handler as GET, handler as POST};
