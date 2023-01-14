const express = require('express');
const path = require('path');
const fs = require("fs");
let router = express.Router();







//Find mathching products by querying Product model
async function loadArtwork(req, res, next){
	let startIndex = ((req.query.page-1) * req.query.limit);
	let amount = req.query.limit;
	
	// Get artwork data from database
    const searchResult = await Gallery.find({})
    .limit(req.query.limit)
    .skip(req.query.startIndexs)
	.exec(function(err, results){
		if(err){
			res.status(500).send("Error reading products.");
			console.log(err);
			return;
		}
		console.log("Found " + results.length + " matching products.");
		res.artworks = results;
		next();
		return;
	})
}

function respondArtwork(req, res, next){
	res.format({
		"text/html": () => {res.render('pages/artwork-gallery', { artworks: res.artworks, session: req.session, current: req.query.page});},
		"application/json": () => {res.status(200).json(res.artworks)}
	});
}

//Export the router object, so it can be mounted in the store-server.js file
module.exports = router;

