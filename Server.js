const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const { handleRegister } = require('./Controllers/Register');
const { handleSignin } = require('./Controllers/Signin');
const { handleProfile } = require('./Controllers/handleProfile');
const { handleImage,handleApiCall } = require('./Controllers/Image');
//const { handleApiCall } = require('./Controllers/handleApiCall');
const db = knex({
	client: 'pg',
	connection: {
	  host : '127.0.0.1',
	  user : 'postgres',
	  password : 'abdullah0123',
	  database : 'smartbrain'
	}
 });

//const PORT = process.env.PORT;

const app = express();

app.use(bodyParser.json());
app.use(cors());




app.get('/', (req,res) => {
	db.select('*').from('users').then(data => {
		res.json(data);	
	});
})
app.post('/signin' , (req,res) => {
	handleSignin(req,res,db,bcrypt);
})

app.post('/register', (req,res) => {
	handleRegister(req,res,db,bcrypt);	
})

app.get('/profile/:id', (req,res) => {
	handleProfile(req,res,db);
})

app.put('/image', (req,res) => {
	handleImage(req,res,db);	
})

app.post('/imgurl' , (req,res) => {
	handleApiCall(req,res);
})

app.listen(process.env.PORT || 3002);


/*
/signin ---- POST = successful/fail
/Register ---- POST = new user
/profile: userId ---- GET = user
/image ---- PUT = user
*/ 