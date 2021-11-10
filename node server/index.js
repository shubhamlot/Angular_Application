const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const dotEnv = require('dotenv')
const cors = require('cors');

dotEnv.config()
app.use(cors())
// app.get('/',(req,res)=>{
//     res.send(`Book api <br/> 
//             ->to see all books goto ---- /getBooks<br/>
//             ->to see a single book goto ----  /getBooks/:id<br/>
//             ->to add a new book goto ----  /addBooks<br/>
//             ->to update/edit a book goto ----   /editBooks/:id</br>
//             ->to delete a book goto ---- deleteBooks/:id`)
// })

app.listen(process.env.PORT,()=>{
    console.log('server up and running on port '+process.env.PORT)
})

const routers = require('./routes/router')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use('/routes',routers)

mongoose.connect(process.env.DATABASE_URL)
.then(()=>{console.log('connected to db')})
.catch((err)=>{console.log(err)})