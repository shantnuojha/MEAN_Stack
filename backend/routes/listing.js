const { request, response } = require("express");
const routes = require("express").Router();
const Listing = require("../models/listingModels");
const verify = require("../routes/verifyToken");

//Get all listings
routes.get("/", verify , async (request , response) => {
    try {
        
        const listings = await Listing.find();
        response.json(listings);

    } catch (error) {
        console.log(error);
        response.json({message : error});
    }
});

//Get single listing
routes.get("/:Id", verify , async (request , response) => {
    try {
        
        const listing = await Listing.findById(request.params.Id);
        response.json(listing);

    } catch (error) {
        console.log(error);
        response.json({message : error});
    }
});

//Add new listing
routes.post("/", verify , async (request , response) => {
    const listing = new Listing({
        title: request.body.title,
        price: request.body.price,
        locality: request.body.locality,
        details: request.body.details
    });
    try
    {
        const savedListing = await listing.save();
        response.send(savedListing);
    }
    catch(error)
    {
        console.log(error);
        response.status(400).send(error);
    }
});

//Update listing
routes.put("/:Id", verify , async (request , response) => {
    const listing = {
        title: request.body.title,
        price: request.body.price,
        locality: request.body.locality,
        details: request.body.details
    };
    try {
        
        const updatedlisting = await Listing.findByIdAndUpdate({_id: request.params.Id}, listing);
        response.json(updatedlisting);

    } catch (error) {
        console.log(error);
        response.json({message : error});
    }
});

//Delete listing
routes.delete("/:Id", verify , async (request , response) => {
    try {
        
        const deletedlisting = await Listing.findByIdAndDelete({_id: request.params.Id});
        response.json(deletedlisting);

    } catch (error) {
        console.log(error);
        response.json({message : error});
    }
});

module.exports = routes;