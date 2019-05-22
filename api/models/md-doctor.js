const mongoose= require('mongoose');
const Schema= mongoose.Schema;
const DoctorSchema= new Schema({
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
    patients:{
        type: Schema.Types.ObjectId,
        ref:'patient'
    },
    appointments:{
        type: Schema.Types.ObjectId,
        ref: 'appointment'
    },
    details:{
        type: Schema.Types.ObjectId,
        ref: 'doctordetails'
    },
    hospitals:{
        type: Schema.Types.ObjectId,
        ref: 'hospital'
    }
});
module.exports=mongoose.model('doctor', DoctorSchema);