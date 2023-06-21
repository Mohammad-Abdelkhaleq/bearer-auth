'use strict';

const { users } = require('../models/index.js');

async function handleSignup(req, res, next) {
  try {
    console.log(req.body);

    let user = {
      username: req.body.username,
      password: req.body.password
    };
    let userRecord = await users.create(user);
    const output = {
      user: userRecord,
      token: userRecord.token
    };
    res.status(200).json(output);
  } catch (e) {
    console.error(e);
    next(e);
  }
}
// ________________________________________________________________________________
async function handleSignin(req, res, next) {
  try {

    console.log("this the req",req.user);
    const user = {
      user: {
        _id: req.user.id,
        username: req.user.username
      },
      token: req.user.token
    };
    res.status(200).json(user);
  } catch (e) {
    console.error(e);
    next(e);
  }
}
// ---------------------------------------------------------------------------------------
async function handleGetUsers(req, res, next) {
  try {
    const userRecords = await users.findAll({});
    console.log(userRecords);
    const list = userRecords.map(user => user.username);
    res.status(200).json(list);
  } catch (e) {
    console.error(e);
    next(e);
  }
}

function handleSecret(req, res, next) {
  res.status(200).send("Welcome to the secret area!");
}

module.exports = {
  handleSignup,
  handleSignin,
  handleGetUsers,
  handleSecret
}
