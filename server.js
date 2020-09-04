import dotenv from 'dotenv'
import express from 'express'
import path from 'path'
import mongodb from 'mongodb'
dotenv.config()
const app = express()
const PORT = process.env.PORT || 3000
const url = 'mongodb://127.0.0.1:27017'
const database = 'chat-room-app'
const col = 'User'


app.use(express.static(path.join(path.resolve(), "client","build")))

app.post('/register', (req,res) => {
    mongodb.MongoClient.connect(process.env.MONGODB_URI || url,
        { useNewUrlParser: true }, (err, client) => { 
            if(err) {res.send(err)}
            client.db(database).collection(col).insertOne(req.body)
            res.send('user inserted')
        })
})
app.get('*', (req,res) => {
    res.sendFile(path.join(path.resolve(), "client", "build", "index.html"))
})

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}.`);
});