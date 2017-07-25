"use strict";

const User = require('./user');

/**
 * Object for creating User objects from raw data
 */
class UserValidator {
    /**
     * Create a user from a standard object
     * @param object
     * @returns {User}
     */
    static getValidatedUser(object) {
        let user = new User();

        const mandatoryProperties = [
            'id', 'name', 'phone', 'groups'
        ];

        for (let property of mandatoryProperties) {
            if (!object.hasOwnProperty(property)) {
                throw new Error(`Property '${property}' is mandatory to handle a User`);
            }
        }

        if (typeof object.groups !== 'object') {
            throw new Error(`Property 'group' must be an array containing the group names`);
        }


        user.id    = object.id;
        user.name  = object.name;
        user.phone = object.phone;

        for (let group of object.groups) {
            user.addGroup(group);
        }

        return user;
    }
}

module.exports = UserValidator;