const jwt= require('jsonwebtoken');

exports.admin_auth= (req, res, next) => {
    try{
        const token= req.headers.authorization.split(" ")[1];
        const decoded= jwt.verify(token, "secret");
        req.userData= decoded;
        next();
    }catch(error){
         console.log(error);
         return res.status(401).json({
            message: "Auth failed"
         });
    }
};
exports.patient_auth= (req, res, next)=>{
    try{
        const token= req.headers.authorization.split(" ")[1];
        const decoded= jwt.verify(token, "secretpatient");
        req.userData= decoded;
        next();
    }catch(error){
         console.log(error);
         return res.status(401).json({
            message: "Auth failed"
         });
    }
};
exports.doctor_auth= (req, res, next)=>{
    try{
        const token= req.headers.authorization.split(" ")[1];
        const decoded= jwt.verify(token, "secretdoctor");
        req.userData= decoded;
        next();
    }catch(error){
         console.log(error);
         return res.status(401).json({
            message: "Auth failed"
         });
    }
};
exports.hospital_auth= (req, res, next)=>{
    try{
        const token= req.headers.authorization.split(" ")[1];
        const decoded= jwt.verify(token, "secrethospital");
        req.userData= decoded;
        next();
    }catch(error){
         console.log(error);
         return res.status(401).json({
            message: "Auth failed"
         });
    }
};