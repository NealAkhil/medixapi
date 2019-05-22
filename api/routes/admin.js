const express= require('express');
const router= express.Router();
const mongoose= require('mongoose');
const Admin= require('../models/md-admin');
const bcrypt= require('bcryptjs');
const jwt= require('jsonwebtoken');

const checkAuth= require('../middleware/auth-check');
// const AdminDetails= require('../models/md-admin');

// If Admin is logged in then render the admin panel and if not redirect to login view of
router.get('/', (req, res, next)=>{
    res.render('admin-login.hbs',{
        title:"Medix Adminstration"
    });
});

router.get('/login', (req, res, next)=>{
    res.render('admin-login.hbs',{
        title:"Medix Adminstration"
    });
});

router.post('/create', (req, res, next)=>{
    console.log(req.body.username);
    Admin.find({username : req.body.username})
        .exec()
        .then(admin=>{
            if(admin >= 1 ){
                res.status(409).json({
                    message:"Username already exists"
                });
            }else{
                bcrypt.hash(req.body.password, 10, (err,hash)=>{
                    if(err){
                        res.status(500).json({
                            error: err
                        });
                    }else{
                     const admin= new Admin({
                        _id:mongoose.Types.ObjectId(),
                        username:req.body.username,
                        password:hash,
                        role: "admin"
                     });
                     admin
                    .save()
                    .then(result=>{
                        console.log(result);
                        res.status(200).json({
                            message: "handling post request to /appointement",
                           createdAdmin:admin 
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
    });

router.post('/login12', (req, res, next)=>{
    const username= req.body.username;
    //const password= req.body.password;
    console.log(username);
    console.log(password);
    res.json({
        username:username,
        password: password
    });
});
var products=[
    {
        id:1,
        name:"Hello"
    },
    {
        id:2,
        name:"Hello2"
    }
];
router.get('/login12', (req, res,next)=>{
    res.send({
        products: products
    });
});
router.post('/login',(req,res, next)=>{
    const username= req.body.username;
    console.log(username);
    console.log(req.body.password);
    Admin.find({username: req.body.username})
        .exec()
        .then(admin=>{
            if(admin.length < 1){
                res.json({
                    message:"Username not found"
                });
            }
            bcrypt.compare(req.body.password, admin[0].password, (err, result)=>{
                if(err){
                    res.json({
                        message:"Wrong password"
                    });
                }
                if(result){
                    const token=jwt.sign({
                        username:admin[0].username,
                        userId: admin[0]._id
                    },
                    "secret",
                    {
                        expiresIn:"1h"
                    } 
                    );
                    res.send({
                        message:"Auth success !!",
                        token: token,
                        redirect: true,
                        redirect_url: '/admin'
                    });
                }
            });
            
        })
        .catch();
});

router.get('/123', (req, res, next)=>{

});
module.exports= router;