import dotenv from 'dotenv'
import express from 'express'
import path from 'path'
import mongodb from 'mongodb'
import bcrypt from 'bcrypt'
import bodyParser from 'body-parser'
dotenv.config()
const app = express()
const PORT = process.env.PORT || 3000
const URL = process.env.URL
const DATABASE = process.env.DATABASE
const COL = process.env.COL


app.use(express.static(path.join(path.resolve(), "client","build")))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.post('/register', async (req,res) => {
    const password = await bcrypt.hash(req.body.password, 10)
    const userObj ={
        "userName": req.body.userName,
        "firstName": req.body.firstName,
        "lastName": req.body.lastName,
        "email": req.body.email,
        "password": password
    }

    mongodb.MongoClient.connect(process.env.MONGODB_URI || URL,
        { useNewUrlParser: true }, (err, client) => {
            if(err) {
              res.send(err)
            }
            else {
            client.db(DATABASE).collection(COL).insertOne(userObj)
            res.send('user saved')
          }
        })
})

app.get('*', (req,res) => {
    res.sendFile(path.join(path.resolve(), "client", "build", "index.html"))
})

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}.`);
});
