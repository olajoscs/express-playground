"use strict";

const MongoDatabase = require('../../modules/database/mongodatabase');

class UserSchema extends MongoDatabase {
    constructor() {
        super();
    }

    /**
     *
     * @returns {*}
     */
    getUserSchema() {
        if (typeof this.schemas['users'] == 'undefined') {
            this.schemas['users'] = this.mongoose().Schema({
                id: {type: Number, index: {unique: true}},
                name: String,
                phone: String,
                groups: [String]
            });
        }

        return this.schemas['users'];
    }

    /**
     *
     * @returns {*}
     */
    getUserModel() {
        return this.mongoose().model('User', this.getUserSchema());
    }


    /**
     *
     * @returns {*}
     */
    createUserInstance(data) {
        let User = this.getUserModel();

        return new User(data);
    }
}

module.exports = new UserSchema();