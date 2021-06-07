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
            link: link.startsWith('https://') ? link : `https://${link}`,
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
// @decs Update post 
// @access private
router.put('/:id', verifyToken, async(req, res)=>{
    const {title, description, link, status} = req.body 
    console.log(req.body)
    if(!title)
        return res.status(400).json({susscess:false, message:"Title is required"})
    try {
        let UpdateSkill = {
            title: title,
            description: description,
            link: link.startsWith('https://') ? link : `https://${link}`,
            status: status  
        }
        const updateCondition = {_id: req.params.id, user: req.userId}
        UpdateSkill = await skill.findByIdAndUpdate(updateCondition, UpdateSkill, {new: true})
        if(!UpdateSkill)
            return res.status(401).json({
                susscess: false,
                message: "Skill not found !!!"
            })
        res.json({
            message: "Update succsess !!!",
            skill:UpdateSkill
        })
    } catch (error) {
        res.json({susscess: false, message:'Error' + error})
    }
})
// @router DELETE skill
// @decs Delete post 
// @access private

router.delete('/:id', verifyToken, async (req,res)=>{
    try {
        const SkillDeleteCondition = {_id: req.params.id, user: req.userId }
        //findByIdAndDelete(id gì, id tìm ) nếu gióng thì xóa
        const deleteSkill = await skill.findByIdAndDelete(SkillDeleteCondition) 
        if(!deleteSkill)
            return res.status(401).json({
                susscess: false,
                message: "Skill not found !!!"
            })
        res.json({
            message: "Delete succsess !!!",
            skill:deleteSkill
        }) 
    } catch (error) {
        res.json({susscess: false, message:'Error' + error})
    }
})

module.exports = router