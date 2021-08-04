import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const { Schema } = mongoose

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
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
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

/* this mongoose middleware run before the password is saved to the database */
// https://mongoosejs.com/docs/middleware.html#pre
userSchema.pre('save', async function (next) {
  if (
    !this.isModified(
      'password' /* password is not updated/changed (when user is logging in)*/
    )
  ) {
    next()
  }
  // otherwise when user is changing the password or the new user is created
  // encrypt the password before it is saved to the database
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

// https://mongoosejs.com/docs/models.html#compiling
// When you call mongoose.model() on a schema, Mongoose compiles a model for you.
const User = mongoose.model('User', userSchema)

export default User
