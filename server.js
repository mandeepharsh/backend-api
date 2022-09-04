const  express = require('express');
const app = express();
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs')
const knex = require('knex');
const register = require('./controllers/register.js')
const signin = require('./controllers/signin.js');
const  profile  = require('./controllers/profile.js');
const image = require('./controllers/image.js')
const PORT = process.env.PORT

const db= knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'harpreetkaur',
      password : '',
      database : 'smart-brain'
    }
  });

db.select('*').from('users')
app.use(express.json());
app.use(cors());


app.post('/signin',(req,res)=>{signin.handleSignin(req,res,db ,bcrypt)})

app.post('/register',(req,res)=>{register.handleRegister(req,res,db ,bcrypt)})

app.post('/profile/:id',(req,res)=> {profile.handleProfileGet(req,res,db)})
app.put('/image',(req,res) => {image.handleImage(req,res,db)})
app.post('/imageUrl',(req,res) => {image.handleApiCall(req,res)})
app.listen(PORT,()=> {
    console.log ('this server is running')
});