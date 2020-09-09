import dotenv from 'dotenv'
import express from 'express'
import path from 'path'
import mongodb from 'mongodb'
import bcrypt from 'bcrypt'
import bodyParser from 'body-parser'
import validator from 'validator'
import jwt from 'jsonwebtoken'
dotenv.config()
const app = express()
const PORT = process.env.PORT || 3000
const URL = process.env.URL
const DATABASE = process.env.DATABASE
const COL = process.env.COL
const JWT_KEY = process.env.JWT_KEY


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

app.post('/login', async (req,res) => {
  try {
    const { userName, password } = req.body
    mongodb.MongoClient.connect(process.env.MONGODB_URI || URL,
      { useNewUrlParser: true }, async (err, client) => {
        if(err) {
          res.send(err)
        }
        else {
          const user = await client.db(DATABASE).collection(COL).findOne({"userName": userName })
          console.log('user', userName)
          if(!user) {
            console.log('user not found')
            res.status(401).send({error: "Login failed! User not found"})
          }
          else {
            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch) {
              return res.status(401).send({error: "Login failed! Incorrect password"})
            }
            else {
              const token = jwt.sign({id: user.id }, JWT_KEY )
              return res.send({"userName": userName, "token": token })
            }
          }
        }
      })
  }
  catch {
    res.status(400).send(error)
  }
})

app.get('*', (req,res) => {
    res.sendFile(path.join(path.resolve(), "client", "build", "index.html"))
})

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}.`);
});
