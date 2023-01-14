//Import the mongoose module
import pkg from 'mongoose';

//mongoose modules -- you will need to add type": "module" to your package.json
const { Schema, model} = pkg;

//Define the Schema for a citizen
const gallerySchema = Schema({
    name: String,
    artist: String,
    year: Number,
    category: String,
    medium: String,
    description: String,
    url: String,
    likes: Number,
    comments: Object
});

//Export the default so it can be imported
export default model("images", gallerySchema);