const jwt = require("jsonwebtoken");

module.exports = (request , response , next)=>{

    const token = request.header("auth-token");
    if(!token) return response.status(401).send("Access denied!");

    try {

        const verified = jwt.verify(token, process.env.SECRET_TOKKEN);
        request.user = verified;
        next();        
    } catch (error) {
        console.log(error);
        response.status(400).send("Invalid token" + error);
    }

};