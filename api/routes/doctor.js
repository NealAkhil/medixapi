const express=require('express');
const router= express.Router();

// importing controller file
const DC= require('../controllers/c-doctor');

// importing the Check AUth middleware
const authCheck= require('../middleware/auth-check');

// handling get/doctor route
router.get('/', DC.home_page_get_doctor);

// handeling post/register route
router.post('/register', DC.register_page_post_doctor);

// hendeling post/login route
router.post('/login', DC.login_page_post_doctor);

// router for handeling deletion of the data
router.delete('/:doctorId', (req, res, next)=>{
    res.status(200).json({
        message: 'Doctor details deleted'
    });
});

// router for handeling the updating of doctors info
router.patch('/:doctorID',authCheck.doctor_auth,DC.update_post_doctor);

module.exports= router;