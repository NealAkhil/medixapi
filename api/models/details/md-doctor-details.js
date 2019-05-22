const mongoose= require('mongoose');
const DoctorDetailSchema= mongoose.Schema({
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
module.exports= mongoose.model('DoctorDetail', DoctorDetailSchema);