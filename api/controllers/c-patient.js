// importing modules
const bcrypt= require('bcryptjs');
const mongoose= require('mongoose');
const jwt= require('jsonwebtoken');
// importing the patient Schemas 
const Patient= require('../models/md-patient');

// importing Appoinment Schema
const Appointment= require('../models/md-appointment');

// signup|register controller for patient
exports.signup_get_for_patient=(req, res, next)=>{
    res.status(200).json({
        message:"This is the sign up route handeling for patient"
    });
};

// signup post controller for patient
exports.signup_post_for_patient= ( req, res, next)=>{
    var username= req.body.username;
    const password= req.body.password;
    const password1= req.body.password1;

    if(username.length != 10 && (password != password1)){
        res.status(411).json({
            message:"Please enter 10 digit number",
            message1: "Password doesnot matches"
        });
    }else if(username.length != 10 || (password != password1)){
        if(username.length !=10){
            res.status(411).json({
                message:"Enter valid 10 digit mobile phone"
            });
        }
        if(password != password1){
            res.status(411).json({
                message:"Password doesnot matches"
            });
        }
        
    }else{
        // PatientLogin.find({username: username})
        Patient.find({username: username})
        .exec()
        .then(result=>{
            if(result.length >= 1 ){
                console.log(result);
                res.status(409).json({
                    message:"Username already exists"
                });
            }else{
                bcrypt.hash(password, 10, (err,hash)=>{
                    if(err){
                        console.log(err);
                        res.status(500).json({
                            error: err
                        });
                    }else{
                     const patient= new Patient({
                        _id:mongoose.Types.ObjectId(),
                        username:username,
                        password:hash,
                        role: "patient"
                     });
                    //  pushing the Patient Login Data in Patient Schema
                    //  Patient.lo.push(patientlogin);
                     patient
                    .save()
                    .then(result=>{
                        console.log(result);
                        res.status(200).json({
                            message: "Handeling the /post request for patient register",
                            createdPatient:patient
                        });
                    })
                    .catch(err=>{
                        console.log(err);
                        res.status(500).json({
                            error:err
                        });
                    });
                    }
                });
            }
        });    
    }  
};
// login view for patient
exports.login_get_for_patient= (req, res, next)=>{
    res.status(200).json({
        message:"Patient please login"
    });
};

// login controller for patient
exports.login_post_for_patient= (req, res, next)=>{
    console.log(req.body.username);
    console.log(req.body.password);
    Patient.find({username: req.body.username})
        .exec()
        .then(patient=>{
            console.log(patient);
            console.log(patient.length);
            if(patient.length < 1){
                res.status(401).json({
                    message:"Username not found"
                });
            }
            bcrypt.compare(req.body.password, patient[0].password, (err, result)=>{
                if(err){
                    res.status(401).json({
                        message:"Auth Failed"
                    });
                }
                if(result){
                    const patientToken=jwt.sign({
                        username:patient[0].username,
                        userId: patient[0]._id
                    },
                    "secretpatient",
                    {
                        expiresIn:"2h"
                    } 
                    );
                    return res.status(200).json({
                        message:"Patient Auth success",
                        token: patientToken
                    });
                }
            });
            
        })
        .catch();
};

// patient profile controller
exports.patient_get_profile_view= ( req, res, next)=>{
    const id= req.params.patientId;
    Patient.findById({_id: id})
    .exec()
    .then(patient=>{
        userData= req.userData;
        console.log('auth user', userData.userId);
        res.status(200).json({
            message:"Patient found",
            foundpatient: patient
        });
    })
    .catch(error=> {
        res.status(404).json({
            message:"An error occured",
            err: error
        });
    });
};

// patient profile update
exports.patient_post_profile_update=  (req, res, next)=>{
    res.status(200).json({
        message: 'Patient details updated'
    });
};

// patient profile delete
exports.patient_delete_profile=(req, res, next)=>{
    res.status(200).json({
        message: 'patient details deleted'
    });
};

// patient book appointment get action
exports.bookappointment_get=(req, res, next)=>{
    res.status(200).send({
        message: "Appontment to be created by patient"
    });
};

// patinet book appointment post action
exports.bookappointment_post=(req, res, next)=>{
    const user= req.userData;
    Patient.findById({_id: user.userId})
    .exec()
    .then(patient=>{
        console.log(patient._id);
    // importing Appointment model and create appointment
        const appointment = new Appointment({
            _id: new mongoose.Types.ObjectId(),
            title: req.body.title,
            symptom: req.body.symptom,
            doctor: req.body.doctor,
            patient: patient._id,
            hospital: req.body.hospital,
            created_date: new Date(),
            booked_date: req.body.Date
        });
        // saving appointment data
        appointment
            .save()
            .then(result=>{
                console.log(result);
            })
            .catch(err=>{
                console.log(err);
                res.status(500).json({
                    error:err
                });
            });

        // pushing appointments to patient who booked
        patient.myappointments.push(appointment);
        // save patient now
        patient
            .save()
            .then(result=>{
                console.log(result);
                res.status(200).json({
                    message:"Patient data saved on server along with appointment",
                    savedpatient: patient,
                    savedappointment: appointment
                });
            })
            .catch(err=>{

            });
    })
    .catch();
};

// view particular appointment by patient
exports.get_particular_appointment=(req, res, next)=>{
    appId= req.params.appId;
    Appointment.findById({_id: appId})
        .exec()
        .then(app=>{
            res.status(200).json({
                message:"This is the get view of particular appointments",
                Appointment: app
            });
        })  
        .catch();
};

// delete particular appointment by patient
exports.delete_particular_appointment= (req, res, next)=>{
    const appId= req.params.appId;
    Appointment.findOneAndRemove({_id: appId}, err=>{
        if(err){
            console.log(err);
             res.status(500).json({
                error: err
            });
        }
        res.status(200).json({
            message:"Appointment deleted sucessfully"
        });
    });
};