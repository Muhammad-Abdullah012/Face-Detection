const handleSignin = (req,res,db,bcrypt) => {
	const {email, password} = req.body;
	if(!email || !password){
		return res.status(400).json("Incorrect from submission!");
	}
    db.select("hash","email").from('login').where("login.email","=", email)
	    .then(response => {
			//below function asynchronously compare entered password with hash(encrypted password already stored) in database.  
			bcrypt.compare(password, response[0].hash , function(err, result) {
				if(result){
					return db.select().from('users').where("email","=",response[0].email)
					.then(user => {
						res.json({
							id: user[0].id,
							name: user[0].name,
							entries: user[0].entries
						});
					})
					.catch(err => { console.log(err)});
				}
				else{
					res.status(400).json("InValid credentials!");
				}
			});	  
		})
		.catch(err => {
			res.json("InValid credentials!");
		});
}


module.exports = {
    "handleSignin": handleSignin
}