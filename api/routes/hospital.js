const express=require('express');
const router= express.Router();
const mongoose= require('mongoose');

// importing hospital controller
const HospitalController= require('../controllers/c-hospital');

// importing Authentication checking middleware for hospital
const checkAuth= require('../middleware/auth-check');

router.get('/',(req,res, next)=>{
    res.status(200).json({
        message: 'Hospitals are displayed'
    });
});

// get the each Hospital id
router.get('/:hospitalId', HospitalController.view_each_hospital);

// router to handle hospital login
router.post('/login', HospitalController.login_page_post_hospital);

// router to handle hospital register
router.post('/register', HospitalController.register_page_post_hospital);


// update the details of hospital ID
router.patch('/:hospitalId', HospitalController.hospital_detail_update);


module.exports= router;
