"use strict";
const Mongoose = require('mongoose');

class MongoDatabase {

    constructor() {
        Mongoose.connect('localhost');
        this.schemas = [];
    }


    mongoose() {
        return Mongoose;
    }
}

module.exports = MongoDatabase;