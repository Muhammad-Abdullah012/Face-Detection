

const Clarifai = require('clarifai');

const handleApiCall = (req,res) => {
	const app = new Clarifai.App({
		apiKey: process.env.API_KEY
	});
	app.models.predict( Clarifai.FACE_DETECT_MODEL, req.body.imgurl)
	.then(data => {   
		res.json(data);		//data.outputs[0].data.regions is the array which is actually required by front-end...
	})
	.catch(err => {
		res.status(400).json("Error loading Data!");
	})
}
const handleImage = (req,res,db) => {
    const { id } = req.body;
	db("users").where("id","=",id)
	.increment("entries",1)
	.returning("entries")
	.then(entries => {
		res.json(entries[0]);
	})
	.catch(err => {
		res.status(400).json("Error while updating Entrires..")
	})
}

module.exports = {
	"handleImage": handleImage,
	"handleApiCall": handleApiCall
}