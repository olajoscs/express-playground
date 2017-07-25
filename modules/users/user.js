"use strict";

/**
 * Defines a user
 */
class User {

    /**
     * Creating properties with deafult values
     */
    constructor(){
        this.id = null;
        this.name = null;
        this.phone = null;
        this.groups = [];
    }


    /**
     * Add a group to the groups array
     * @param group
     * @returns {User}
     */
    addGroup(group) {
        if (this.groups.indexOf(group) === -1) {
            this.groups.push(group);
        }

        return this;
    }


    /**
     * Clear the groups of the user
     * @returns {User}
     */
    clearGroups() {
        this.groups = [];

        return this;
    }


    /**
     * Validate the state of the user. If user is OK null is returned, else the error message.
     * @returns string|null
     */
    validate() {
        if (!this.name) {
            return 'Missing name';
        }

        if (!this.phone) {
            return 'Missing phone';
        }

        if (typeof this.groups !== 'object') {
            return 'Invald groups';
        }

        return null;
    }
}

module.exports = User;