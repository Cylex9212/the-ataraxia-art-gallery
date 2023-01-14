let host = ["localhost", "YOUR_OPENSTACK_IP"];

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