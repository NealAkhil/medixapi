const express= require('express');
const router= express.Router();
const mongoose= require('mongoose');
const jwt= require('jsonwebtoken');


// importing appointment controller
const appointmentController= require('../controllers/c-appointments');

// importing the authcheck middleware for checking 
const authCheck= require('../middleware/auth-check');

// getting the appointments booked by patients
router.get('/',authCheck.patient_auth, appointmentController.get_appointments_of_patient);
// booking a new appointment by patient

router.post('/',authCheck.patient_auth,appointmentController.book_appointment_by_patient);
// getting a particular appointment by patient

router.get('/:appId',authCheck.patient_auth, appointmentController.view_each_appointments_by_patient);

// Deleting a particular appointment
router.delete('/:appId',authCheck.patient_auth, appointmentController.delete_each_appointments_by_patient);

// exporting the router 
module.exports= router;