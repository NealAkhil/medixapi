// importing Appointment model
const Appointment= require('../models/md-appointment');
// importing mongoose
const mongoose= require('mongoose');

exports.book_appointment_by_patient= (req, res, next)=>{
    const appointment = new Appointment({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        symptom: req.body.symptoms,
        doctor_name: req.body.doctor_name,
        patient_name: req.body.patient_name,
        hospital_name: req.body.hospital_name,
        created_date: new Date(),
        booked_date: req.body.Date
    });
    appointment
        .save()
        .then(result=>{
            console.log(result);
            res.status(200).json({
                message: "handling post request to /appointement",
               createdAppointment:result,
               authData: req.userData
            });
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                error:err
            });
        });
};

exports.get_appointments_of_patient=(req, res, next)=>{
    res.status(200).json({
        message: "Book an Appointment with the listed doctors and hospitals within seconds"
    });
};
// exporting the function to view each appointment by patient
exports.view_each_appointments_by_patient=(req, res, next)=>{
    const id= req.params.appId;
    Appointment.findById(id)
        .exec()
        .then(doc=>{
            if(doc){
                console.log(doc);
                res.status(200).json(doc);
            }else{
                res.status(404).json({
                    message:"This ID doesnot exist"
                });
            }
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};
// function to export for deletion of the Appointment
exports.delete_each_appointments_by_patient= (req, res, next)=>{
    res.status(200).json({
        message: "Delete the particular appointment by admin only"
    });
};
