import { model, models, Schema } from "mongoose";
import bcrypt from "bcrypt";
const UserSchema = new Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    image: { type: String },
  },
  { timestamps: true }
);

UserSchema.post("validate", function (user) {
  const originPass = user.password;
  const salt = bcrypt.genSaltSync(10);
  user.password = bcrypt.hashSync(originPass, salt);
  console.log({ arguments });
});

export const User = models?.User || model("User", UserSchema);
