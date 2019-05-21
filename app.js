// importing express and start an app
const express= require('express');
const app= express();
const morgan=require('morgan');
const bodyParser= require('body-parser');


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));
app.use(morgan('dev'));
// importing neode
const Neode = require('neode');
const instance = new Neode('bolt://localhost:7687', 'username', 'password', true);

// importing routes
const doctorRoutes= require('./api/routes/doctor');
const patientRoutes= require('./api/routes/patient');
const hospitalRoutes= require('./api/routes/hospital');

app.use('./doctors', doctorRoutes);
app.use('./patients', patientRoutes);
app.use('./hospitals',hospitalRoutes);

app.use((req, res, next)=>{
    const error= new Error("Not Found");
    error.status=404;
    next(error);
});
app.use((error, req, res, next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    });
});

module.exports=app;