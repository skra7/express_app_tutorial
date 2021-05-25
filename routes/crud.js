const express = require('express');
const User = require('../models/User');
const Router = express.Router();
const response = require('../response.json');
const jwt = require('jsonwebtoken');

Router.post('/login', async(req,res,next) => {
    let request_data = req.body;

    // User.create({
    //     email : request_data.userEmail,
    //     name : request_data.name,
    //     password : request_data.userPassword,
    //     createdBy : 'login',
    //     createdAt : new Date().getTime(),
    //     updatedBy : 'login',
    //     updatedAt : new Date().getTime(),
    // })
    // .then(async user => {
    //     return res.status(200).json({data : user, message : response["200"]})
    // })
    // .catch(err => {
    //     return res.status(500).json({message : response["500"]})
    // })
    try{
        let user =  await User.create({
                email : request_data.userEmail,
                name : request_data.name,
                password : request_data.userPassword,
                createdBy : 'login',
                createdAt : new Date().getTime(),
                updatedBy : 'login',
                updatedAt : new Date().getTime(),
            })
        
            let jwtToken = await jwt.sign({userId : user._id}, "asdf21212", {expiresIn : 144000})
            return res.status(200).json({data : jwtToken, message : response["200"]})
        
    }
    catch(err){
        return res.status(500).json({message : response["500"]})
    }
})

Router.get('/user', async(req,res,next) => {
    let token = req.headers.authorization || "";
    jwt.verify(token, "asdf21212", (err,data) => {
        if(err){
            return res.status(410).json({messsage : response["410"]})
        }
        return res.status(200).json({data :data, message : response["200"]});
    })
})

// Create a put request

module.exports = Router;