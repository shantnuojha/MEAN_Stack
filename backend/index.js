const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

//DB Connection
mongoose.connect(process.env.DB_CON, 
{ useUnifiedTopology:true, useNewUrlParser: true, useCreateIndex: true }).then(
() => {console.log("DB Connected")},
error => {console.log(error)}
);

////Importing Routes
//Listing route
const routeModules = require("./routes/listing");
//User route
const userModules = require("./routes/user");

//JSON parser middleware
app.use(express.json());
//CORS
app.use(cors());

//Route Middleware
app.use("/api/listing", routeModules);
app.use("/api/user", userModules);

app.listen(4000, () => console.log("Server up and running on port no 4000! "));