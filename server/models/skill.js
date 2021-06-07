const mongoose = require("mongoose");
const schema = mongoose.Schema;

const skillSchema = new schema({
    title:{
        type:String,
        required: true
    },
    description:{
        type: String
    },
    link:{
        type: String
    },
    status:{
        type:String,
        // enum: status chỉ nằm trong 3 dạng này
        enum: ['Đang học',"Đã học", 'Học xong']
    },
    user:{
        type: schema.Types.ObjectId,
        // ref để nối qua model users
        ref:"users"
    }

})

module.exports = mongoose.model('skills', skillSchema)