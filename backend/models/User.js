"use strict";
const { Schema, model } = require("mongoose");
const {sign} = require('jsonwebtoken')
const {hash, genSalt, compare} =require('bcryptjs')
const crypto = require('crypto');
/* ------------------------------------------------------- *
{
    "username": "admin",
    "password": "aA*123456",
    "email": "admin@site.com",
    "name": "admin",
    "image":"images/admin.jpg"
    "isActive": true,
    "role": "user",
    emailVerified:true
}
/* ------------------------------------------------------- */
// User Model:

const UserSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: [true, "Username is required"],
      unique: [true, "Username is already exists"],
      index: true,
    },

    password: {
      type: String,
      trim: true,
      required: [true, "Username is required"],
      select: false,
      match: [
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/g,
        "Passoeord should include  uppercase, lowercase, numbers and  special characters and 8 characters min",
      ],
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    email: {
      type: String,
      trim: true,
      required: [true, "Email is required"],
      unique: [true, "Email is already exists"],
      match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, "Email is not Valid"],
      index: true,
    },
   name: {
      type: String,
      trim: true,
      required: [true, "Name is required"],
    },
    emailVerified: {
      type: Boolean, 
      default: false
  }, 
    image: {
      type: String,
      default: "/images/no-image.png",
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { collection: "users", timestamps: true },
);

/* ------------------------------------------------------- */
// Schema Configs:
UserSchema.methods.getToken = function () {
    return sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
  };
  
  UserSchema.methods.matchPassword= async function(enteredPassword){
    return compare(enteredPassword, this.password);
  }
  
  
  UserSchema.pre("save", async function (next) {
    if(!this.isModified('password')) next();
    const salt = await genSalt(10);
    this.password = await hash(this.password, salt);
  });
  

  
  // Generate and hash password token
  UserSchema.methods.getRestPasswordToken = function(){
    // Generate Token
    const reseToken = crypto.randomBytes(20).toString('hex')
    // Hash the token and set it to the resetPasswordToken field 
    this.resetPasswordToken = crypto.createHash('sha256').update(reseToken).digest('hex')
    // set the expire to 10 min
    this.resetPasswordExpire = Date.now()+10*60*1000
    return reseToken;
  }
  

module.exports = model("User", UserSchema);
