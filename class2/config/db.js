const mongoose = require("mongoose");

const connectToDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb://localhost:27017/project1")
        console.log("mongodb connected ")

    } catch (error) {
        console.log(error);

    }
}

module.exports = connectToDB;
// title, desscription, image,