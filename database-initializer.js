// Array of images
const gallery = [
    {"name" : "Freesia's Picrew Picture" , "artist" : "Tellmin" , "year" : "2020" , "category" : "Fantasy" , "medium" : "Digital" , "description" : "The very first image Cylex made of Freesia using Picrew." , "url" : "https://i.imgur.com/bZoKN7l.png", "likes": 0, "comments": {}},
    {"name" : "Freesia's Reference Sketches" , "artist" : "Satsuki" , "year" : "2022" , "category" : "Fantasy" , "medium" : "Digital" , "description" : "A commission by Cylex of Freesia's Part 3 Appearance." , "url" : "https://i.imgur.com/5tKJPS4.png", "likes": 0, "comments": {}},
    {"name" : "Freesia's Last Stand" , "artist" : "Satsuki" , "year" : "2022" , "category" : "Fantasy" , "medium" : "Digital" , "description" : "A commission by Cylex of Freesia's Part 3 Appearance." , "url" : "https://i.imgur.com/cnys0Qh.jpg", "likes": 0, "comments": {}},
	{"name" : "Freesia Rough Sketch" , "artist" : "Usman" , "year" : "2020" , "category" : "Fantasy" , "medium" : "Digital" , "description" : "A rough sketch of Freesia" , "url" : "https://i.imgur.com/Gjhj96D.jpg", "likes": 0, "comments": {}},
	{"name" : "Yukikara Proper Fanart" , "artist" : "Kakusu" , "year" : "2022" , "category" : "Sci-Fi" , "medium" : "Digital" , "description" : "Yukikara in various poses" , "url" : "https://i.imgur.com/DjFqwBw.png", "likes": 0, "comments": {}},
	{"name" : "Yume, Freesia and Stella's day out - Rough Draft" , "artist" : "Lin" , "year" : "2021" , "category" : "Fantasy" , "medium" : "Digital" , "description" : "Three ladies enjoying life" , "url" : "https://i.imgur.com/SISWxau.png", "likes": 0, "comments": {}},
	{"name" : "The Imperator, Osiris" , "artist" : "Usman" , "year" : "2022" , "category" : "Fantasy" , "medium" : "Digital" , "description" : "Imperator Revealed" , "url" : "https://i.imgur.com/JEesXOk.jpg", "likes": 0, "comments": {}},
	{"name" : "Yume, Freesia and Stella's day out - Final" , "artist" : "Lin" , "year" : "2021" , "category" : "Fantasy" , "medium" : "Digital" , "description" : "Completed version of Yume, Freesia and Stella's day out" , "url" : "https://i.imgur.com/UubobOT.jpg", "likes": 0, "comments": {}},
	{"name" : "Niko, Yvette and Chaos Unite" , "artist" : "Cookie" , "year" : "2021" , "category" : "Fantasy" , "medium" : "Digital" , "description" : "An unlikely trio" , "url" : "https://i.imgur.com/JgyFQny.jpg", "likes": 0, "comments": {}},
	{"name" : "Yume's day out" , "artist" : "Usman" , "year" : "2022" , "category" : "Slice of Life" , "medium" : "Traditional" , "description" : "Art Contest Submission for Yume" , "url" : "https://i.imgur.com/ABNMqHz.jpg", "likes": 0, "comments": {}},
	{"name" : "Stella & Charlotte" , "artist" : "Sumi" , "year" : "2022" , "category" : "Fantasy" , "medium" : "Digital" , "description" : "Stella and Charlotte Are quite an unlikely duo..." , "url" : "https://i.imgur.com/7fl8Uaz.jpg", "likes": 0, "comments": {}},
	{"name" : "Yukikara Landscape" , "artist" : "Kakusu" , "year" : "2022" , "category" : "Sci-Fi" , "medium" : "Digital" , "description" : "More Yukikara Poses" , "url" : "https://i.imgur.com/ciG1duy.png", "likes": 0, "comments": {}},
	{"name" : "Yume and Akheera Collab Fanart" , "artist" : "Usman" , "year" : "2022" , "category" : "Sci-Fi" , "medium" : "Digital" , "description" : "Yume collabs with Akheera" , "url" : "https://i.imgur.com/uZfiarm.jpg", "likes": 0, "comments": {}},
	{"name" : "Freesia's first fanart" , "artist" : "Rikka-Chan" , "year" : "2020" , "category" : "Fantasy" , "medium" : "Digital" , "description" : "First Commission of Freesia" , "url" : "https://i.imgur.com/MpmIhgG.jpg", "likes": 0, "comments": {}},
	{"name" : "Freesia Icon" , "artist" : "Usman" , "year" : "2021" , "category" : "Fantasy" , "medium" : "Digital" , "description" : "Freesia icon commission" , "url" : "https://i.imgur.com/f99Cjak.png", "likes": 0, "comments": {}},
	{"name" : "Yume Icon" , "artist" : "Usman" , "year" : "2022" , "category" : "Fantasy" , "medium" : "Digital" , "description" : "Yume's icon. A commission present by Searie" , "url" : "https://i.imgur.com/uhh8XGS.png", "likes": 0, "comments": {}},
	{"name" : "Timpani Fanart" , "artist" : "Satsuki" , "year" : "2022" , "category" : "Fantasy" , "medium" : "Digital" , "description" : "Timpani Mommy Moment" , "url" : "https://i.imgur.com/IQznQyn.jpg", "likes": 0, "comments": {}},
	{"name" : "Kendis Fanart" , "artist" : "Satsuki" , "year" : "2022" , "category" : "Fantasy" , "medium" : "Digital" , "description" : "Kendis First Fanart" , "url" : "https://i.imgur.com/EbRNx1K.jpg", "likes": 0, "comments": {}},
	{"name" : "Yume and Stella Picrew" , "artist" : "Usman" , "year" : "2022" , "category" : "Fantasy" , "medium" : "Digital" , "description" : "Yume and Stella Picrew Art" , "url" : "https://i.imgur.com/PBQFtTF.png", "likes": 0, "comments": {}},
	{"name" : "Freesia and Stella Picrew" , "artist" : "Usman" , "year" : "2022" , "category" : "Fantasy" , "medium" : "Digital" , "description" : "Freesia and Stella Picrew Art" , "url" : "https://i.imgur.com/TwQnRtw.png", "likes": 0, "comments": {}},
	{"name" : "Maria Picrew" , "artist" : "Usman" , "year" : "2022" , "category" : "Fantasy" , "medium" : "Digital" , "description" : "Maria Picrew" , "url" : "https://i.imgur.com/AZ4OBEC.png", "likes": 0, "comments": {}},
	{"name" : "Kendis Picrew" , "artist" : "Usman" , "year" : "2022" , "category" : "Fantasy" , "medium" : "Digital" , "description" : "Kendis Picrew" , "url" : "https://i.imgur.com/nEyvote.png", "likes": 0, "comments": {}}	
];

// Array of registered users.
const users = [
	{"username" : "Sumi" , "password" : "cutie" , "artist": true, "followers" : 0, "following": [], "liked": [], "notifications": []},
	{"username" : "Cookie" , "password" : "cookie" , "artist": true, "followers" : 0, "following": [], "liked": [], "notifications": []},
	{"username" : "Lin" , "password" : "miku" , "artist": true, "followers" : 0, "following": [], "liked": [], "notifications": []},
	{"username" : "Kakusu" , "password" : "undertale" , "artist": true, "followers" : 0, "following": [], "liked": [], "notifications": []},
	{"username" : "Usman" , "password" : "sonic" , "artist": true, "followers" : 0, "following": [], "liked": [], "notifications": []},
    {"username" : "Tellmin" , "password" : "FreesiaBG" , "artist": true, "followers" : 0, "following": [], "liked": [], "notifications": []},
    {"username" : "Satsuki" , "password" : "FreesiaBG2" , "artist": true, "followers" : 0, "following": [], "liked": [], "notifications": []},
	{"username" : "SpinDrift" , "password" : "FreesiaBG3" , "artist": true, "followers" : 0, "following": [], "liked": [], "notifications": []},
    {"username" : "Rikka-Chan" , "password" : "FreesiaBG4" , "artist": true, "followers" : 0, "following": [], "liked": [], "notifications": []}
];

// Import the mongoose module
import pkg from 'mongoose';

// Mongoose Module
const { connect, connection } = pkg;

//Import the Gallery and User models
import User from './UserModel.js';
import Gallery from './GalleryModel.js';

// Create an asynchronous function to load the data
const loadData = async () => {
	
	// Connect to the mongo database
  	await connect('mongodb://localhost:27017/gallery');

	// Remove database and start anew
	await connection.dropDatabase();
	
	// Map each registered user object into the a new User model
	let access = users.map( aUser => new User(aUser));

	let images = gallery.map( anImage => new Gallery(anImage));

	// Creates new documents of a user and gallery and saves it into the users and gallery collections
	await Gallery.create(images);
	await User.create(access);
}

//Call to load the data.
//Once the loadData Promise returns it will close the database
//connection.  Any errors from connect, dropDatabase or create
//will be caught in the catch statement.
loadData()
  .then((result) => {
	console.log("Created Database, now closing...");
 	connection.close();
  })
  .catch(err => console.log(err));