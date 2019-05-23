const express= require('express');
const app= express();
const path= require('path');
// const hbs=require("express-handlebars");
const morgan= require('morgan');
const bodyParser= require('body-parser');
const mongoose= require('mongoose');
const cors= require('cors');
const expressValidator= require('express-validator');

// session
// var session = require('express-session');
// var cookieParser= require('cookie-parser');

mongoose.connect('mongodb://127.0.0.1:27017/medix',{ useNewUrlParser: true });
mongoose.Promise = global.Promise;


// seting the engine path
app.set('views', path.join(__dirname, 'views'));
// app.engine('hbs', hbs({extname: 'hbs', defaultLayout:'layout', layoutsDir:__dirname + '/views/layouts'}));

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// app.use(cookieParser());

app.use(morgan('dev'));
app.use(bodyParser.text());
app.use(bodyParser.raw());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(expressValidator());


app.use(cors());

const patientRoutes= require('./api/routes/patient');
const hospitalRoutes= require('./api/routes/hospital');
const doctorRoutes= require('./api/routes/doctor');
const appRoutes= require('./api/routes/appointment');
const adminRoutes= require('./api/routes/admin');

app.use('/patient', patientRoutes);
app.use('/doctor', doctorRoutes);
app.use('/hospital',hospitalRoutes);
app.use('/appointment', appRoutes);
app.use('/admin', adminRoutes);


app.use((req, res, next) => {
    const error=new Error('Not found');
    error.status=404;
    next(error);
});
app.use((error,req, res, next)=>{
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});
module.exports=app; 