const mongoose= require('mongoose');
const AdminSchema= mongoose.Schema({
    _id:mongoose.Types.ObjectId,
    username:{
        type:String,
        required: true,
        unique: true
    },
    password:{
        type:String,
    },
    role:{
        type: String
    }
});
module.exports= mongoose.model('Admin',AdminSchema);