const { Schema, model } = require("mongoose");

//schema to create user model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      set: (username) => username.toLowerCase(),
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        //validates the user email using some regex
        validator: function (email) {
          return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(email);
        },
        message: (input) => `${input.value} is not a valid email`,
      },
      set: (email) => email.toLowerCase(),
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "thoughts",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

//creates a virtual property of 'friendCount' that gets the amount of friends per user
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

//initializes user model
const User = model("user", userSchema);

module.exports = User;
