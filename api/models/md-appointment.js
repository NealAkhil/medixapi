const mongoose= require('mongoose');
const Schema= mongoose.Schema;
const AppointmentSchema= new Schema({
    _id: mongoose.Types.ObjectId,
    title:{
        type: String,
        required: true
    },
    symptom: String,
    doctor: {
        // type:Schema.Types.ObjectId,
        // ref:'doctor',
        // required:true
        type: String
    },
    patient: {
        type:Schema.Types.ObjectId,
        ref:'patient',
        required: true,
        username: {
            type: Number
        }
    },
    hospital:{
        // type: Schema.Types.ObjectId,
        // ref:'hospital',
        // required: true
        type: String
    },
    accepted:{
        type: Boolean
    },
    created_date:{
        type: String
    },
    booked_date:{
        type:String
    }
});

module.exports=mongoose.model('Appointment', AppointmentSchema);