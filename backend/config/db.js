import mongoose from 'mongoose'

const connetDB = async () => {
  try {
    const conn = await mongoose.connet(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    })
    console.log(`MongoDb Connected: ${conn.connection.host}`)
  } catch (error) {
    console.error(`Error:${error.message}`)
    process.exit(1)
  }
}

export default connectDB
