"use strict";

const userSchema = require('./userschema');

class UserRepository {

    constructor() {
    }

    /**
     * Return the user with the ID in the parameter
     *
     * @param id Integer
     * @param cb
     *
     * @returns {*}
     */
    static get(id, cb) {
        return userSchema.getUserModel().findOne({id: id}, cb);
    }

    /**
     * Return the list of users with matching criteria
     *
     * @param criteria
     * @param cb
     */
    static list(criteria, cb) {
        let property = criteria.property || null;
        let value = criteria.value || null;

        let parameter = {};

        if (property !== null && value !== null) {
            parameter[property] = value;
        }

        userSchema.getUserModel().find(parameter, cb);
    }


    /**
     * Remove a user from database
     *
     * @param user The Mongoose created user model
     * @param cb
     */
    static remove(user, cb) {
        let instance = userSchema.createUserInstance(user);

        instance.remove(cb);
    }

    static update(user, newUser, cb) {
        Object.keys(newUser).map((key) => {
            user[key] = newUser[key];
        });

        user.save(cb);
    }


    /**
     * Create a user in the database
     * @param user The validated User object
     * @param cb
     */
    static create(user, cb) {
        let instance = userSchema.createUserInstance(user);

        instance.save(cb)
    }
}

module.exports = UserRepository;