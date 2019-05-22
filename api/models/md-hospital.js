const mongoose= require('mongoose');
const Schema= mongoose.Schema;
const HospitalSchema= new Schema({
    id: mongoose.Types.ObjectId,
    role:{
        type: String
    },
    username:{
        type: Number,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    details:{
        type: Schema.Types.ObjectId,
        ref: 'hospitaldetail'
    },
    appointments:{
        type: Schema.Types.ObjectId,
        ref: 'appointment'
    },
    doctors:{
        type: Schema.Types.ObjectId,
        ref: 'doctor'
    },
    patients:{
        type: Schema.Types.ObjectId,
        ref: 'patient'
    }
});
module.exports=mongoose.model('hospital', HospitalSchema);