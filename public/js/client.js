let host = ["localhost", "YOUR_OPENSTACK_IP"];

let numOfFollows = 0;
let numOfLikes = 0;

function addArtwork(){
    // Check the fields to obtain information filled out
    let name = document.getElementById('name').value;
    let year = document.getElementById('creationDate').value;
    let category = document.getElementById('category').value;
    let medium = document.getElementById('medium').value;
    let description = document.getElementById('description').value;
    let url = document.getElementById('url').value;
    let username = document.getElementById('username').value;

    if(name != "" && year != "" && category != "" && medium != "" && description != "" && url != ""){
        // Make the object with all this information:
        let galleryObj = {"name" : name , "artist" : username, "year" : year, "category" : category, "medium" : medium, "description" : description, "url" : url, "likes": 0};

        // Send a post request to the server
        // Send Update request to server
        fetch(`http://${host[0]}:3000/artworks/upload`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(galleryObj)
        })
        // fetch() returns a promise. When we have received a response from the server,
        // the promise's `then()` handler is called with the response.
        .then((response) => {
            // Our handler throws an error if the request did not succeed.
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            // Otherwise (if the response succeeded), our handler fetches the response
            // as text by calling response.text(), and immediately returns the promise
            // returned by `response.text()`.
            return response.text();
        })
        // When response.text() has succeeded, the `then()` handler is called with
        // the text, and we parse the response to retrieve the id and redirect
        // to another URL.
        .then((responseObject) => {
            location.href=`http://${host[0]}:3000/artworks/pages/1`
        })
        // Catch any errors that might happen, and display a message.
        .catch((error) => console.log(error));            
    }

    else alert('Please fill in all of the textboxes')
}

function searchArtwork(){
    // Use URL Parameters to redirect to a results page
    let searchCategory = document.getElementById("searchCategories").value;
    let searchText = document.getElementById("searchBox").value;

    if(searchText != "") location.href=`http://${host[0]}:3000/search/${searchCategory}/${searchText}/1`;
    else alert("Please enter text in the search field");
}

function getAccountInfo(){
    location.href=`http://${host[0]}:3000/accountInfo`
}

function setNumOfLikes(){
    numOfLikes = document.getElementById('numOfLikes').value;
    console.log("NUM OF LIKES: " + numOfLikes);
}

function setNumOfFollows(){
    numOfFollows = document.getElementById('numOfFollows').value;
    console.log("NUM OF FOLLOWS: " + numOfFollows);
}

function submitComment(){

    // Get the information from the comment box
    let comment = document.getElementById('commentBox').value;
    let artworkName = document.getElementById('artworkName').value;

    let commentObj = {"artworkName": artworkName, "comment": comment};
    console.log(JSON.stringify(commentObj));
    

    // Make sure it's not empty
    if(comment != ""){
        // Make a POST request
        fetch(`http://${host[0]}:3000/comment`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(commentObj)
        })
        // fetch() returns a promise. When we have received a response from the server,
        // the promise's `then()` handler is called with the response.
        .then((response) => {
            // Our handler throws an error if the request did not succeed.
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            // Otherwise (if the response succeeded), our handler fetches the response
            // as text by calling response.text(), and immediately returns the promise
            // returned by `response.text()`.
            return response.text();
        })
        // When response.text() has succeeded, the `then()` handler is called with
        // the text, and we parse the response to retrieve the id and redirect
        // to another URL.
        .then((responseObject) => {
            let artworkID = document.getElementById('artworkID').value;
            location.href=`http://${host[0]}:3000/artworks/${artworkID}`  ; 
        })
        // Catch any errors that might happen, and display a message.
        .catch((error) => console.log(error));
    }
}

function toggleLike(){
    // Check to see if the button is a like or a unlike button
    let likeButton = document.getElementById("likeButton");
    let artworkName = document.getElementById('artworkName').value;

    let artObj = {"name" : artworkName};

    // Toggle the like button to unlike button
    if(likeButton.value==="Like") {
        // Add to your likeList
        // Send Update request to server
        fetch(`http://${host[0]}:3000/like`, {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(artObj)
        })
        // fetch() returns a promise. When we have received a response from the server,
        // the promise's `then()` handler is called with the response.
        .then((response) => {
            // Our handler throws an error if the request did not succeed.
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            // Otherwise (if the response succeeded), our handler fetches the response
            // as text by calling response.text(), and immediately returns the promise
            // returned by `response.text()`.
            return response.text();
        })
        // When response.text() has succeeded, the `then()` handler is called with
        // the text, and we parse the response to retrieve the id and redirect
        // to another URL.
        .then((responseObject) => {
            likeButton.value="Unlike";
            likeButton.innerText = "Unlike";
            numOfLikes++;
            document.getElementById('likesText').innerHTML = "Likes: " + numOfLikes;      
        })
        // Catch any errors that might happen, and display a message.
        .catch((error) => console.log(error));
    }
    else if(likeButton.value==="Unlike") {
        // Remove from likeList
        // Send Update request to server
        fetch(`http://${host[0]}:3000/unlike`, {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(artObj)
        })
        // fetch() returns a promise. When we have received a response from the server,
        // the promise's `then()` handler is called with the response.
        .then((response) => {
            // Our handler throws an error if the request did not succeed.
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            // Otherwise (if the response succeeded), our handler fetches the response
            // as text by calling response.text(), and immediately returns the promise
            // returned by `response.text()`.
            return response.text();
        })
        // When response.text() has succeeded, the `then()` handler is called with
        // the text, and we parse the response to retrieve the id and redirect
        // to another URL.
        .then((responseObject) => {
            likeButton.value="Like";
            likeButton.innerText = "Like";   
            numOfLikes--;
            document.getElementById('likesText').innerHTML = "Likes: " + numOfLikes;
        })
        // Catch any errors that might happen, and display a message.
        .catch((error) => console.log(error));
    }
}

function toggleFollow(){
    // Check to see if the button is a like or a unlike button
    let followButton = document.getElementById("followButton");
    let username = document.getElementById('username').value;

    console.log(followButton.value);

    let userObj = {"name" : username};

    // Toggle the like button to unlike button
    if(followButton.value === "Follow") {
        console.log("FOLLOWING!");

        // Add to your likeList
        // Send Update request to server
        fetch(`http://${host[0]}:3000/follow`, {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userObj)
        })
        // fetch() returns a promise. When we have received a response from the server,
        // the promise's `then()` handler is called with the response.
        .then((response) => {
            // Our handler throws an error if the request did not succeed.
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            // Otherwise (if the response succeeded), our handler fetches the response
            // as text by calling response.text(), and immediately returns the promise
            // returned by `response.text()`.
            return response.text();
        })
        // When response.text() has succeeded, the `then()` handler is called with
        // the text, and we parse the response to retrieve the id and redirect
        // to another URL.
        .then((responseObject) => {
            followButton.value="Unfollow";
            followButton.innerText = "Unfollow";
            numOfFollows++;
            document.getElementById('followsText').innerHTML = "Followers: " + numOfFollows;      
        })
        // Catch any errors that might happen, and display a message.
        .catch((error) => console.log(error));
    }
    else if(followButton.value==="Unfollow") {
        console.log("UNFOLLOWING!");

        // Remove from follow list
        // Send Update request to server
        fetch(`http://${host[0]}:3000/unfollow`, {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userObj)
        })
        // fetch() returns a promise. When we have received a response from the server,
        // the promise's `then()` handler is called with the response.
        .then((response) => {
            // Our handler throws an error if the request did not succeed.
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            // Otherwise (if the response succeeded), our handler fetches the response
            // as text by calling response.text(), and immediately returns the promise
            // returned by `response.text()`.
            return response.text();
        })
        // When response.text() has succeeded, the `then()` handler is called with
        // the text, and we parse the response to retrieve the id and redirect
        // to another URL.
        .then((responseObject) => {
            followButton.value="Follow";
            followButton.innerText = "Follow";
            numOfFollows--;
            document.getElementById('followsText').innerHTML = "Followers: " + numOfFollows; 
        })
        // Catch any errors that might happen, and display a message.
        .catch((error) => console.log(error));
    }
}