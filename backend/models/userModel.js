const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");


const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    username: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
      set: (v) => bcrypt.hashSync(v, bcrypt.genSaltSync(10)),
    },

    phone_number: {
      type: String,
      required: true,
    },

    licenseNumber: {
      type: String,
      required: true,
      unique: true,
    },

    date_of_birth: {
      type: Date,
      required: true,
    },

    address: {
      licenseExpiryDate: {
        type: Date,
        required: true,
      },

      city: {
        type: String,
        required: true,
      },

      yearsOfExperience: {
        type: Number,
        required: true,
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;