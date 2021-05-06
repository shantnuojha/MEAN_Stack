const routes = require("express").Router();
const User = require("../models/userModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

routes.post("/register", async (request , response)=>{

    const emailExists = await User.findOne({email : request.body.email});

    if(emailExists) return response.status(400).send("User already exists with same email");

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(request.body.password , salt);

    const user = new User({
        name: request.body.name,
        email: request.body.email,
        password: hashPassword
    });

    try {
        const savedUser = await user.save();
        response.send(savedUser);
    } catch (error) {
        console.log(error);
        response.status(400).send(error);
    }
});

routes.post("/login", async (request , response)=>{

    //Checking for valid email
    const userExists = await User.findOne({email : request.body.email});
    if(!userExists) return response.status(400).send("Invalid email");

    //checking for correct password
    const passwordIsCorrect = await bcrypt.compare(request.body.password, userExists.password);
    if(!passwordIsCorrect) return response.status(400).send("Password is incorrect");

    //Create & assign tokken
    const tokken = jwt.sign({_id : userExists._id} , process.env.SECRET_TOKKEN);
    response.header("auth-token" , tokken).send({token : tokken});

});

module.exports = routes;