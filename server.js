const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const { handleRegister } = require('./Controllers/Register');
const { handleSignin } = require('./Controllers/Signin');
const { handleProfile } = require('./Controllers/handleProfile');
const { handleImage,handleApiCall } = require('./Controllers/Image');

const db = knex({
	client: 'pg',
	connection: {
	  connectionString : process.env.DATABASE_URL,
	  ssl: { rejectUnauthorized: false }
	}
 });



const app = express();

app.use(bodyParser.json());

let corsOptions = {
	origin: ['https://face-detection-app01.herokuapp.com'],
	//origin: "*",
	methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
	// "preflightContinue": false,
	// "optionsSuccessStatus": 204
	
	optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}


app.use(cors(corsOptions));




app.get('/', (req,res) => {
	//res.json("This is working.....!");
	db.select('*').from('users').then(data => {
		res.json(data);	//This need to be changed!!
	}).catch(error => {
		res.json("Error while loading users");
	})
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

