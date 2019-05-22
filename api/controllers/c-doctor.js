// import required modules
const mongoose= require('mongoose');
const jwt= require('jsonwebtoken');
const bcrypt= require('bcryptjs');

// importing the models and Schema of doctors
const Doctor= require('../models/md-doctor');

exports.home_page_get_doctor=(req, res, next)=>{
    res.status(200).json({
        message: "This is the message doctor page, please login if not logined"
    });
};
exports.login_page_get_doctor= (req, res, next)=>{
    res.status(200).json({
        message:" This is doctor Login page"
    });
};
exports.register_page_get_doctor=(req, res, next)=>{
    
};
// handeling post login request
exports.login_page_post_doctor= (req, res, next)=>{
    Doctor.find({username: req.body.username})
        .exec()
        .then(doctor=>{
            if(doctor.length < 1){
                res.status(401).json({
                    message:"Username not found"
                });
            }
            bcrypt.compare(req.body.password, doctor[0].password, (err, result)=>{
                if(err){
                    res.status(401).json({
                        message:"Auth Failed"
                    });
                }
                if(result){
                    const doctorToken=jwt.sign({
                        username:doctor[0].username,
                        userId: doctor[0]._id
                    },
                    "secretdoctor",
                    {
                        expiresIn:"1h"
                    } 
                    );
                    return res.status(200).json({
                        message:"Doctor Auth success",
                        token: doctorToken
                    });
                }
            });
            
        })
        .catch();
};
// handeling post request
exports.register_page_post_doctor=(req, res, next)=>{
    const username= req.body.username;
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
        Doctor.find({username: username})
        .exec()
        .then(doctor=>{
            if(doctor.length >= 1 ){
                console.log(doctor);
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
                     const doctor= new Doctor({
                        _id:mongoose.Types.ObjectId(),
                        username:username,
                        password:hash,
                        role: "doctor"
                     });
                     doctor
                    .save()
                    .then(result=>{
                        console.log(result);
                        res.status(200).json({
                            message: "Handeling the /post request for doctor register",
                            createdDoctor:doctor 
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

exports.update_post_doctor= (req, res, next)=>{
    res.status(200).json({
        message:"Please update"
    });
};
