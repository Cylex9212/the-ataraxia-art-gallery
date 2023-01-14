import express, { response } from 'express';
const app = express();

import session from 'express-session';
import { default as connectMongoDBSession} from 'connect-mongodb-session';
import logger from 'morgan'; 
import pkg from 'mongoose';

const MongoDBStore = connectMongoDBSession(session);
const { connect, Types } = pkg;

//Defining the location of the sessions data in the database.
var store = new MongoDBStore({
  uri: 'mongodb://localhost:27017/gallery',
  collection: 'sessions'
});

//Setting up the express sessions to be stored in the database.
app.use(session(
    { 
      secret: 'top secret key',
      resave: true,
      saveUninitialized: false,
      store: store 
    })
);

app.use(express.urlencoded({extended: true}));

//Import Citzen and User models.
import Gallery from './GalleryModel.js';
import User from './UserModel.js';

//process.env.PORT will see if there is a specific port set in the environment.
const PORT = process.env.PORT || 3000;

 //Root directory for javascript files.
const ROOT_DIR_JS = '/public/js';

// Change the host to localhost if you are running the server on your
// own computer.
let host = ["localhost", "YOUR_OPENSTACK_IP"];

//Logging our connections to the express servers.
app.use(logger('dev'));

//Static server will check the following directory.
//Needed for the addPerson, deletePerson and register javascript files.
app.use(express.static("." + ROOT_DIR_JS));

//Convert any JSON stringified strings in a POST request to JSON.
app.use(express.json());

//Setting pug as our template engine.
app.set('views', './views');
app.set('view engine', 'pug');

//This get method has two endpoints going to the same rendered pug file
app.get(['/', '/home'], (req, res) => { res.render('pages/home', { session: req.session }); });

/*
        LOGIN AND REGISTRATION FUNCTIONS:
*/

// Rendering the registration page.
app.get("/register", (req, res) => { res.render("pages/register", { session: req.session }); });

// Saving the user registration to the database.
app.post("/register", async (req, res) => {

    let newUser = req.body;

    try{
        const searchResult = await User.findOne({ username: newUser.username});
        if(searchResult == null) {
            console.log("registering: " + JSON.stringify(newUser));
            await User.create(newUser);
            res.status(200).send();
        } else {
            console.log("Send error.");
            res.status(404).json({'error': 'Exists'});
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error registering" });
    }
});

// Search the database to match the username and password .
app.post("/login", async (req, res) => {

	let username = req.body.username;
	let password = req.body.password;

    try {
        const searchResult = await User.findOne({ username: username });
        if(searchResult != null) { 
            if(searchResult.password === password) {
                // If we successfully match the username and password
                // then set the session properties.  We add these properties
                // to the session object.
                req.session.loggedin = true;
                req.session.username = searchResult.username;
                req.session.userid = searchResult._id;
                req.session.artist = searchResult.artist;
                req.session.liked = searchResult.liked;
                req.session.following = searchResult.following;

                res.redirect(`http://${host[0]}:3000/artworks/pages/1`);
            } else {
                res.status(401).send("Not authorized. Invalid password.");
            }
        } else {
            res.status(401).send("Not authorized. Invalid password.");
        }
    } catch(err) {
        console.log(err);
        res.status(500).json({ error: "Error logging in."});
    }    

});

// Log the user out of the application.
app.get("/logout", (req, res) => {

    // Set the session loggedin property to false.
	if(req.session.loggedin) {
		req.session.loggedin = false;
	}
	res.redirect(`http://${host[0]}:3000/home`);
});

/*
        USER FUNCTIONS:
*/

// Find the person associated with the personID (which is the 
// Object_id for the document)
app.get('/users/:username', async (req, res) => {
    try {
        // Search for the user
        const userSearchResult = await User.findOne({ username: req.params.username });

        // Check if the art you are viewing has been liked by you or not
        let followed = await checkFollowed(req,res,userSearchResult.username);

        // Search for the Artwork Data Associated with the user:
        let gallerySearchResult = await Gallery.find({artist: req.params.username})

        res.render('pages/user', { user: userSearchResult, artworks: gallerySearchResult, session: req.session, followed: followed});
    } catch(err) {
        console.log(err);
        res.status(401).send("Error retrieving user.");
    }
});

app.get('/accountInfo', async (req, res) => {
    try {
        // Search for the User:
        console.log("USERNAME: " + req.session.username);
        const searchResult = await User.findOne({ username: req.session.username });
        console.log("USER SEARCH RESULT: " + JSON.stringify(searchResult));
        console.log(searchResult.following);

        res.render('pages/userinfo', { user: searchResult, session: req.session});
    } catch(err) {
        console.log(err);
        res.status(401).send("Error retrieving user data.");
    }
});

// Update User Info
app.put('/updateUser', async (req, res) => {
    try {
        let updatedUser = req.body
        await User.updateOne(
             {username: req.session.username},
             {$set: {username: updatedUser.username, password: updatedUser.password, artist: updatedUser.artist } }
        );
        console.log("UPDATED USER Object: " + JSON.stringify(req.body));
        req.session.username = updatedUser.username;
        req.session.artist = updatedUser.artist;
        res.end();
    } catch(err) {
        console.log(err);
        res.status(401).send("Error retrieving user.");
    }
});

/*
        ART FUNCTIONS:
*/

app.get('/artworks/pages/:pageID', async (req, res) => {
    try {
        let pageNumber = req.params.pageID - 1;

        const searchResult = await Gallery.find({})
        .limit(10)
        .skip(pageNumber * 10)

        console.log(JSON.stringify(req.session))

        res.render('pages/artwork-gallery', { artworks: searchResult, session: req.session, currPage: pageNumber + 1});
    } catch(err) {
        console.log(err);
        res.status(500).json({ error: "Can't find artwork."});
    }
});

app.get('/artworks/upload', async (req, res) => {
    try {
        res.render('pages/addArtwork', {session: req.session});
    } catch(err) {
        console.log(err);
        res.status(401).send("Error rendering page.");
    }
});

// Upload Artwork to the Database
app.post('/artworks/upload', async (req, res) => {
    try {
        // Check the database to see if the art name is unique
        const searchResult = await Gallery.findOne({ name: req.body.name});
        if(searchResult == null) {
            // Create a new art piece and add it to the database
            console.log(JSON.stringify(req.body))
            let newArt = req.body;
            await Gallery.create(newArt);

            // Send a notification to all of the users in the artist's 'followers' array
            res.status(200).send();
        } else {
            console.log("ERROR");
            res.status(404).json({'error': 'Exists'});
        }
    } catch(err) {
        console.log(err);
        res.status(401).send("Error Posting Artwork.");
    }
});

app.get('/artworks/:artworkID', async (req, res) => {
    try {
        let obj_id = Types.ObjectId(req.params.artworkID);
        const searchResult = await Gallery.findOne({ _id: obj_id });

        // Check if the art you are viewing has been liked by you or not
        let liked = await checkLiked(req,res,searchResult.name);

        console.log(JSON.stringify(searchResult));

        res.render("pages/artwork", {artwork: searchResult, session: req.session, liked: liked, comments: searchResult.comments});
    } catch(err) {
        console.log(err);
        res.status(500).json({ error: "Can't find artwork."});
    }
});

/*
        COMMENT FUNCTIONS:
*/

// Upload Artwork to the Database
app.post('/comment', async (req, res) => {
    try {
        console.log(JSON.stringify(req.body))
        let newComment = req.body.comment;
        let artworkName = req.body.artworkName;

        console.log(newComment)
        console.log(artworkName)

        await Gallery.updateOne(
            {name: artworkName},
            {$push: {comments: {username: req.session.username, comment: newComment}} }
        );

        const searchResult1 = await Gallery.findOne({ name: artworkName });
        console.log("THE IMAGE HAS COMMENT OBJECTS: " + JSON.stringify(searchResult1.comment));

        res.status(200).send();
    } catch(err) {
        console.log(err);
        res.status(401).send("Error Posting Artwork.");
    }
});

/*
        LIKE / UNLIKE FUNCTIONS:
*/

// Add the recieved object to the user's liked objects
app.put('/like', async (req, res) => {
    try {
        let artwork = req.body
        console.log(artwork);

        // Find the user who liked the art and update their art
        await User.updateOne(
            {username: req.session.username},
            {$push: {liked: artwork.name} }
        );

        // Increase the number of likes on the artwork as well
        await Gallery.updateOne(
            {name: artwork.name},
            {$inc: {likes: 1} }
        );

        // End the response
        res.status(200).send();
    } catch(err) {
        console.log(err);
        res.status(500).json({ error: "Can't find artwork."});
    }
});

// Remove the recieved object from the user's liked objects
app.put('/unlike', async (req, res) => {
    try {
        let artwork = req.body
        console.log(artwork);

        // Find the user who liked the art and update their art
        await User.updateOne(
            {username: req.session.username},
            {$pull: {liked: artwork.name} }
        );

        // Decrease the number of likes on the artwork as well
        await Gallery.updateOne(
            {name: artwork.name},
            {$inc: {likes: -1} }
        );

        // End the response
        res.status(200).send();

    } catch(err) {
        console.log(err);
        res.status(500).json({ error: "Can't find artwork."});
    }
});

/*
        FOLLOW / UNFOLLOW FUNCTIONS:
*/

// Add the recieved object to the user's liked objects
app.put('/follow', async (req, res) => {
    try {
        let user = req.body;
        console.log(req.session.username + " Is Following " + user.name);

        // Increase the number of follows on the user you've followed as well
        await User.updateOne(
            {username: user.name},
            {$inc: {followers: 1} }
        );

        // Add the username to your follows list
        await User.updateOne(
            {username: req.session.username},
            {$push: {following: user.name} }
        );

        // End the response
        res.status(200).send();
    } catch(err) {
        console.log(err);
        res.status(500).json({ error: "Can't find User."});
    }
});

// Remove the recieved object from the user's liked objects
app.put('/unfollow', async (req, res) => {
    try {
        let user = req.body;
        console.log(req.session.username + " Is Unfollowing " + user.name);

        // Remove the username to your follows list
        await User.updateOne(
            {username: req.session.username},
            {$pull: {following: user.name} }
        );

        // Decrease the number of follows on the user you've followed as well
        await User.updateOne(
            {username: user.name},
            {$inc: {followers: -1} }
        );

        // End the response
        res.status(200).send();

    } catch(err) {
        console.log(err);
        res.status(500).json({ error: "Can't find User."});
    }
});


/*
        SEARCH FUNCTIONS:
*/

// Search for something in the database
app.get("/search/:searchCategory/:searchText/:pageID", async (req, res)=>{
    let searchCategory = req.params.searchCategory;
    let searchText = req.params.searchText;

    let searchTextRegex = new RegExp(`${searchText}`,'i');

    let searchResult;

    let pageNumber = req.params.pageID - 1;
    let searchURL = "/search/" + req.params.searchCategory + "/" + req.params.searchText + "/"

    if(searchCategory === "User") {
        searchResult = await User.find({username: {$regex: searchTextRegex}})
        .limit(10)
        .skip(pageNumber * 10)
        console.log(JSON.stringify(searchResult));
        res.render("pages/userResults", {users: searchResult, session: req.session, currPage: pageNumber + 1, searchURL: searchURL});
    }
    else if(searchCategory === "Artwork") {
        searchResult = await Gallery.find({name: {$regex: searchTextRegex}})
        .limit(10)
        .skip(pageNumber * 10)
        console.log(JSON.stringify(searchResult));
        res.render("pages/artworkResults", {artworks: searchResult, session: req.session, currPage: pageNumber + 1, searchURL: searchURL});
    }
    else if(searchCategory === "Category") {
        searchResult = await Gallery.find({category: {$regex: searchTextRegex}})
        .limit(10)
        .skip(pageNumber * 10)
        console.log(JSON.stringify(searchResult));
        res.render("pages/artworkResults", {artworks: searchResult, session: req.session, currPage: pageNumber + 1, searchURL: searchURL});
    }
    else if(searchCategory === "Medium") {
        searchResult = await Gallery.find({medium: {$regex: searchTextRegex}})
        .limit(10)
        .skip(pageNumber * 10)
        console.log(JSON.stringify(searchResult));
        res.render("pages/artworkResults", {artworks: searchResult, session: req.session, currPage: pageNumber + 1, searchURL: searchURL});
    }
    res.end();
});

// Create an async function to load the data.
// Other mongoose calls that return promise (connect) 
// inside the async function can use an await.
const loadData = async () => {
	//Connect to the mongo database
  	const result = await connect('mongodb://localhost:27017/gallery');
    return result;

};

async function checkLiked(req, res, artworkName){
    // Check the database to see the user's liked object
    let user = await User.findOne({username: req.session.username});
    let likedList = user.liked;

    console.log("ARTWORK ID IS: " + artworkName);

    // The user's liked object is populated with artworkIDs, if you find a match then return
    for(let i =0; i < likedList.length; i++){
        console.log("LIKED LIST AT INDEX " + i + " IS: " + likedList[i]);
        if(likedList[i] === artworkName) return true;
    }

    return false;
}

async function checkFollowed(req, res, userName){
    // Check the database to see the user's liked object
    let user = await User.findOne({username: req.session.username});
    let followList = user.following;

    // The user's folowing object is populated with userNames, if you find a match then return
    for(let i =0; i < followList.length; i++){
        if(followList[i] === userName) return true;
    }

    return false;
}

// Call to load the data.
// Once the loadData Promise returns the express server will listen.
// Any errors from connect, dropDatabase or create will be caught 
// in the catch statement.
loadData()
  .then(() => {

    app.listen(PORT);
    console.log("Listen on port:", PORT);

  })
  .catch(err => console.log(err));
