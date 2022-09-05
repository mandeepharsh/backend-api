const  express = require('express');
const app = express();
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs')
const knex = require('knex');
const register = require('./controllers/register.js')
const signin = require('./controllers/signin.js');
const  profile  = require('./controllers/profile.js');
const image = require('./controllers/image.js')


const db= knex({
    client: 'pg',
    connection: {
      connectingString : process.env.DATABASE_URL,
      ssl : true,
    }
  });

db.select('*').from('users')
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("it's working!");
  });

app.post('/signin',(req,res)=>{signin.handleSignin(req,res,db ,bcrypt)})

app.post('/register',(req,res)=>{register.handleRegister(req,res,db ,bcrypt)})

app.post('/profile/:id',(req,res)=> {profile.handleProfileGet(req,res,db)})
app.put('/image',(req,res) => {image.handleImage(req,res,db)})
app.post('/imageUrl',(req,res) => {image.handleApiCall(req,res)})
app.listen(process.env.PORT ||3000,()=> {
    console.log ('this server is running')
});