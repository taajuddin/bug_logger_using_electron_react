const mongoose =require('mongoose')

const LogSchema=new mongoose.Schema({
    text:{
        type:String,
        trim:true,
        required:[true,'Log text is required']
    },
    user:{
        type:String,
        trim:true,
        required:[true,'Log user is required']
    },
    priority:{
        type:String,
        deafult:'low',
        enum:['low','moderate','high']
    },
    created:{
        type:Date,
        default:Date.now()
    },
})

module.exports=mongoose.model('Log',LogSchema)