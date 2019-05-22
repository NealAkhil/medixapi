const express=require('express');
const router= express.Router();
var multer  = require('multer');
var upload = multer();

// importing middleware Auth-check.js which verifies either the patient has been logined or not
const checkAuth= require('../middleware/auth-check');

// importing controller
const patientController= require('../controllers/c-patient');

// this route will execute only if the patient is logged in
router.get('/appointment',checkAuth.patient_auth, patientController.bookappointment_get);

// book appointment post action
router.post('/appointment',checkAuth.patient_auth, patientController.bookappointment_post);

// patient registration /get request
router.get('/register', patientController.signup_get_for_patient);

// patient registration /POST request
router.post('/register', patientController.signup_post_for_patient);

// patient login
router.get('/login',patientController.login_get_for_patient);

// patient /post login 
router.post('/login', patientController.login_post_for_patient);

// patient profile
router.get('/:patientId',checkAuth.patient_auth, patientController.patient_get_profile_view);

// patient profile update
router.patch('/:patientId',checkAuth.patient_auth, patientController.patient_post_profile_update);

// patient profile delete
router.delete('/:patientId', patientController.patient_delete_profile);

// get particular Appoitment ID
router.get('/appointment/:appId', checkAuth.patient_auth, patientController.get_particular_appointment);

// router for handeling to delete appointment
router.delete('/appointment/:appId', checkAuth.patient_auth, patientController.delete_particular_appointment);
module.exports=router;
