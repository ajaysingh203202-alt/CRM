const mongoose = require('mongoose')
const adminSchema =  mongoose.Schema({
       'name':{
        type:String
       },
        'email':{
            type:String,
            required:true
        },
        'password':{
            type:String,
            required:true
    }
}
    
    ,{
    timeStamps:true
        
})
module.exports= mongoose.model("admin",adminSchema);