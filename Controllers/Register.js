
const saltRounds = 10;


const handleRegister = (req,res,db,bcrypt) => {
	const {firstname, lastname, email, password} = req.body;
	if(!email || !firstname || !lastname || !password){
		return res.status(400).json("Incorrect from submission!");
	}
	bcrypt.genSalt(saltRounds, function(err, salt) {
		bcrypt.hash(password, salt, null , function(err, hash) {
			db.transaction(trx => {
				trx.insert({
					hash: hash,
					email: email
				})
				.into("login")
				.returning("email")
				.then(mail => {
					return trx("users")
					.returning('*')
					.insert({
						email: mail[0],
						firstname: firstname,
						lastname: lastname,
						name: firstname + " " + lastname,
						joined: new Date()
					})
					.then(user => {
						res.json(user[0]);
					}).catch(err => {res.json("Unable to Register!")});
				})
				.then(trx.commit)
				.then(trx.rollback)
			})	
		});	
	});
}


module.exports = {
    "handleRegister": handleRegister
}