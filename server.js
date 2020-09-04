import dotenv from 'dotenv'
import express from 'express'
import path from 'path'
dotenv.config()

const app = express()

const PORT = process.env.PORT || 3000

app.use(express.static(path.join(path.resolve(), "client","build")))

app.get('*', (req,res) => {
    res.sendFile(path.join(path.resolve(), "client", "build", "index.html"))
})

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}.`);
});