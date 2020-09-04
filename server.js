import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT || 3000

app.use(express.static(path.join(path.resolve(), "client","build")))