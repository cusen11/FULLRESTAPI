const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth')

const skill = require('../models/skill')


// @router post skill
// @decs create post 
// @access private

router.post('/',verifyToken, async(req,res)=>{
    const {title, description, link, status} = req.body 

    if(!title)
        return res.status(400).json({susscess:false, message:"Title is required"})
    try {
        const newSkill = new skill({
            title: title,
            description: description,
            link: link.startsWith('http://') ? link : `http://${link}`,
            status: status || 'Đang học',
            user: req.userId // thằng này nằm ở middeware sau khi thông qua nó sẽ có
        })
        await newSkill.save();
        res.json({susscess: true, message:'Happy learning...',skill: newSkill})
    } catch (error) {
        res.json({susscess: false, message:'Error' + error})
    }
})

// @router GET skill
// @decs GET post 
// @access private

router.get("/", verifyToken, async(req,res)=>{
   try {
        // populate() hàm lấy thêm mấy cái liên quan đến user 
        const skills = await skill.find({user: req.userId}).populate('user', ['username']) 
        res.json({susscess: true, skills});
   } catch (error) {
        res.json({susscess: false, message:'Error' + error})
   }
})


// @router PUT skill
// @decs PUT post 
// @access private



module.exports = router