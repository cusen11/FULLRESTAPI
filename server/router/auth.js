const express = require('express');
const user = require('../models/user');
const router = express.Router();
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')

// @router post auth
// @decs Register user
// @access public

router.post('/register', async(req,res)=>{
    const { username, password } = req.body 
    //check null 
    if(!username || !password)
        return res.status(400).json({success: false, message:"Missing name or/and password"})
    try { 
        // check for existing user
        const usercheck = await user.findOne(({username: username}))
        if(usercheck)
            return res.status(400).json({success: false, message:"UserName is already taken"}) 
        // all good
        //hash password
        const hashPassword = await argon2.hash(password);
        const newUser = new user({
            username: username,
            password: hashPassword
        })

        await newUser.save()

        //return token jsonwebtoken
        const accessToken = jwt.sign({userId: newUser._id},process.env.ACCESS_TOKEN_SECRET)
        res.json({success: true, message: "User created successfully",accessToken})
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false ,message:"Intetnal server error"})
    }
   
})

router.post('/login',async(req,res)=>{
    const { username, password } = req.body 
    //check null 
    if(!username || !password)
        return res.status(400).json({success: false, message:"Missing name or/and password"})

    try {
        const usercheck = await user.findOne(({username: username}))
        if(!usercheck)
            return res.status(400).json({success: false, message:"Incorrect username or password"})
        //if username found  
        const passwordValid = await argon2.verify(usercheck.password, password)
        
        if(!passwordValid)
            return res.status(400).json({success: false, message:"Incorrect username or password"})

        // all good 
        //return token jsonwebtoken
        const accessToken = jwt.sign({userId: user._id},process.env.ACCESS_TOKEN_SECRET)
        res.json({success: true, message: "Login in successfully",accessToken})
    }  catch (error) {
        console.log(error)
        res.status(500).json({success: false ,message:"Intetnal server error"})
    }

})

module.exports = router