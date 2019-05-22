// import required modules
const mongoose= require('mongoose');
const jwt= require('jsonwebtoken');
const bcrypt= require('bcryptjs');

// importing the models and Schema of doctors
const Hospital= require('../models/md-hospital');

exports.home_page_get_hospital=(req, res, next)=>{
    res.status(200).json({
        message: "This is the message doctor page, please login if not logined"
    });
};
exports.login_page_get_hospital= (req, res, next)=>{
    res.status(200).json({
        message:" This is hospital Login page"
    });
};
exports.register_page_get_hospital=(req, res, next)=>{
    
};
// handeling post register request
// handeling post request
exports.register_page_post_hospital=(req, res, next)=>{
    const fullname= req.body.name;
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
        Hospital.find({username: username})
        .exec()
        .then(result=>{
            if(result.length >= 1 ){
                console.log(result);
                res.status(409).json({
                    message:"Hospital Username already exists"
                });
            }else{
                bcrypt.hash(password, 10, (err,hash)=>{
                    if(err){
                        console.log(err);
                        res.status(500).json({
                            error: err
                        });
                    }else{
                     const hospital= new Hospital({
                        _id:mongoose.Types.ObjectId(),
                        fullname: fullname,
                        username:username,
                        password:hash,
                        role: "hospital"
                     });
                     hospital
                    .save()
                    .then(result=>{
                        console.log(result);
                        res.status(200).json({
                            message: "Handeling the /post request for hospital register",
                            CreatedHospital:hospital 
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
// handeling post login request
exports.login_page_post_hospital= (req, res, next)=>{
    Hospital.find({username: req.body.username})
        .exec()
        .then(hospital=>{
            if(hospital.length < 1){
                res.status(401).json({
                    message:"Username not found"
                });
            }
            bcrypt.compare(req.body.password, hospital[0].password, (err, result)=>{
                if(err){
                    res.status(401).json({
                        message:"Auth Failed"
                    });
                }
                if(result){
                    const hospitalToken=jwt.sign({
                        username:hospital[0].username,
                        userId: hospital[0]._id
                    },
                    "secrethospital",
                    {
                        expiresIn:"1h"
                    } 
                    );
                    return res.status(200).json({
                        message:"Hospital Auth success",
                        token: hospitalToken
                    });
                }
            });
            
        })
        .catch();
};

// handeling details update of hospital
exports.hospital_detail_update= (req, res, next)=>{

};
// viewing each hospital id
exports.view_each_hospital=(req, res, next)=>{
    Hospital.findById({_id: req.params.hospitalId})
    .exec()
    .then(hospital=>{
        res.status(200).json({
            message: "this is hospital id",
            hospital: hospital
        });
    })
    .catch();
    
};