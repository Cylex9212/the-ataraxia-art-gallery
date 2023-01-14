function saveUserInfo(){
    // Get stuff from textboxes
    let userStatus = document.getElementById('userCategories').value;
    let username = document.getElementById('usernameBox').value;
    let password = document.getElementById('passwordBox').value;

    let artist;

    if(userStatus === "Artist") artist = true;
    else artist = false;

    let userObject = {"username": username, "password": password, "artist": artist}

    // Send Update request to server
    fetch(`http://${host[0]}:3000/updateUser`, {
        method: 'PUT', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userObject)
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

    // Go back to the main page
    //location.href=`http://${host[0]}:3000/artworks/pages/1`
}