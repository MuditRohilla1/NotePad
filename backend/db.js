const mongoose = require('mongoose');

const mongoURI = "mongodb://localhost:27017/iNoteBook"; // Replace 'yourDatabaseName' with the actual database name

const connectToMongo = () => {
    mongoose.connect(mongoURI)
        .then(() => {
            console.log("Connected to MongoDB");
        })
        .catch(err => {
            console.error("Error connecting to MongoDB", err);
        });
}

module.exports = connectToMongo;
