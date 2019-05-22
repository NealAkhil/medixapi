const mongoose= require('mongoose');
const Schema= mongoose.Schema;
const PatientSchema= new Schema({
    id: mongoose.Types.ObjectId,
    username:{
        type: Number,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String
    },
    mydetails:{
        type: Schema.Types.ObjectId,
        ref: 'patientdetail'
    },
    myappointments:[{
        type: Schema.Types.ObjectId,
        ref: 'appointment'
    }],
    mydoctors:[{
        type: Schema.Types.ObjectId,
        ref: 'doctor'
    }],
    myhospitals:[{
        type: Schema.Types.ObjectId,
        ref: 'hospital'
    }]
});
module.exports=mongoose.model('patient', PatientSchema);