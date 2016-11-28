/* globals module Promise */
"use strict";

module.exports = function (models) {
    const { User } = models.models;

    return {
        createUser(userInfo) {

            return new Promise((resolve, reject) => {

                console.log("CREATING USER...");

                User.create(userInfo, (err, user) => {
                    if (err) {

                        console.log("CAN NOT CREATE USER");
                        return reject(err);
                    }

                    console.log("USER CREATED!");
                    return resolve(user);
                });
            });
        },
        getUserById(id) {
            return new Promise((resolve, reject) => {
                console.log(`Searching for user by ${id}`);
                User.findOne({ _id: id }, (err, user) => {
                    if (err) {
                        console.log(`${id} was not found`);
                        return reject(err);
                    }

                    return resolve(user);
                });
            });
        },
        getUserByUsername(username) {
            return new Promise((resolve, reject) => {
                console.log(`SEARCHING FOR USER ${username}`);

                User.findOne({ username: username }, (err, user) => {
                    if (err) {
                        console.log("ERROR WHEN CONNECTION TO THE SERVER");
                        return reject(err);
                    }

                    if(!user) {
                        console.log(`USER: ${username} WAS NOT FOUND`);
                        return reject(username);
                    }

                    console.log(`USER ${username} WAS FOUND`);
                    return resolve(user);
                });
            })
        },
        getUserByRange(page, size) {
            return new Promise((resolve, reject) => {
                console.log("SEARCHING FOR USER COLLECTION...");
                User.find()
                    .skip(page * size)
                    .limit(size)
                    .exec((err, users) => {
                        if (err) {
                            console.log("COLLECTION FROM USERS WAS NOT FOUND");
                            return reject(err);
                        }

                        console.log("COLLECTION FROM USERS WAS FOUND");
                        return resolve(users);
                    });
            });
        },
        getUserByCredentials(username, password) {
            return new Promise((resolve, reject) => {
                User.findOne({ username, password }, (err, user) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(user);
                });
            });
        },
        getAllUsers() {
            return new Promise((resolve, reject) => {
                console.log("SEARCHING FOR ALL USERS...");
                User.find({}, (err, users) => {
                    if (err) {
                        console.log("ERROR WHEN GET ALL USERS!");
                        return reject(err);
                    }

                    console.log("USERS FOUND!");
                    return resolve(users);
                });
            });
        }
    };
};