/**
 * @typedef {Object} User
 * @property {string} id - Unique identifier for the user.
 * @property {string} firstName - First name of the user.
 * @property {string} lastName - Last name of the user.
 * @property {string} emailAddress - Email address of the user.
 * @property {string[]} role - Roles assigned to the user.
 * @property {string} createdAt - Timestamp of when the user was created.
 */

/** 
 * @typedef {Object} IJsonDB
 * @property {object[]} items
 * @property {object[]} orders
 * @property {object[]} users - records associated with specified platform users
 */
export const IJsonDB = Object.freeze({
    items: [],
    users: [],
    orders: []
});

