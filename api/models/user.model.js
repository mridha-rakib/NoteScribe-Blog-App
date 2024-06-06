import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Validator functions
function noSpacesValidator(v) {
  return !v.includes(" ");
}

function lowercaseValidator(v) {
  return v === v.toLowerCase();
}

function alphanumericValidator(v) {
  return /^[a-z0-9]+$/.test(v);
}

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      minlength: [7, "Username must be between 7 and 20 characters"],
      maxlength: [20, "Username must be between 7 and 20 characters"],
      validate: [
        {
          validator: noSpacesValidator,
          message: "Username cannot contain spaces",
        },
        {
          validator: lowercaseValidator,
          message: "Username must be lowercase",
        },
        {
          validator: alphanumericValidator,
          message: "Username can only contain letters and numbers",
        },
      ],
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default:
        "https://images.ctfassets.net/hrltx12pl8hq/3Z1N8LpxtXNQhBD5EnIg8X/975e2497dc598bb64fde390592ae1133/spring-images-min.jpg",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.methods.matchPassword = async function (enterPassword) {
  return await bcrypt.compare(enterPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;
