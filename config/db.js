const mongoose = require('mongoose')

const connectDB = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        })

        console.log(`MongoDB Connected: ${conn.connection.host}`.blue.underline.bold)
    } catch (err) {
        console.log(`Error: ${err.message}`.red.bold)
        process.exit(1)
    }
}

module.exports = connectDB