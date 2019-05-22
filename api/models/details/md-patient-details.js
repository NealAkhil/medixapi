const mongoose= require('mongoose');
const PatientDetailSchema= mongoose.Schema({
    address:{
        type: String
    },
    First_name: {
        type: String
    },
    Last_name: {
        type: String
    }
});
module.exports= mongoose.model('PatientDetail', PatientDetailSchema);