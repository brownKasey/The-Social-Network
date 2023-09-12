const { Schema, model } = require("mongoose");

//schema to create user model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: string,
      unique: true,
      validate: {
        validator: function (email) {
          return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(v);
        },
        message: (input) => `${input.value} is not a valid email address!`,
      },
      set: (email) => email.toLowerCase(),
      required: [true, "User email is required"],
    },
    thoughts: [
      {
        type: Schema.Types.objectId,
        ref: "Thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.objectId,
        ref: "Friend",
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
