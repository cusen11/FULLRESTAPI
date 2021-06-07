const mongoose = require('mongoose');
const schema  = mongoose.Schema;



const userSchema = new schema({
    username: {
        // type
        type: String,
        //bắt buộc
        required: true,
        // không được phép gióng nhau 
        unique: true
    },
    password:{
        type:String,
        required: true,
    },
    createdAt:{
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("users", userSchema);