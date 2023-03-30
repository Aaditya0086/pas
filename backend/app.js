const express = require('express');
const app = express();
app.use(express.json());
const mongoose = require ('mongoose');
const User = require("./models/User.js")
const cors = require('cors');
app.use(cors());
// const bcrypt = require("bcryptjs")

const jwt=require('jsonwebtoken');

const JWT_SECRET = 'nfierbguqcmwohie?fler[gle[/wepgkebg,eN><E<Gwr[]](000)eogzamilipqwqxhaeiuowcnawn1@fiowm2$cnwoai#foq'


const mongoUrl='mongodb+srv://gargaaditya18:admin@cluster0.aakb4xv.mongodb.net/test'

// const mongoUrl='mongodb+srv://gargaaditya18:admin@cluster0.aakb4xv.mongodb.net/?retryWrites=true&w=majority'
// mongoose.connect("mongodb://localhost:27017/project-allocation-system")



mongoose.connect(mongoUrl,{
    useNewUrlParser:true
}).then(()=>{console.log('connected to database');
})
.catch((e) => console.log(e));

app.listen(5000,()=>{
    console.log('server started');
})

app.post('/post', async (req, res) => {
    console.log(req.body);
    const {data}=req.body;

    try {
        if(data=='Aaditya'){
            res.send({status:'ok'})
        } else {
            res.send({status:'User not found'})
        }
    }   catch (error) {
        res.send({status: 'error'})
    }
});

require('./loginDetails');

// const User = mongoose.model('UserInfoo'); 

app.post('/register', async (req, res)=> {
    const{name, email, mobileNo, password} = req.body;
    try {
        await User.create({
            uname: name,
            email,
            phoneNo: mobileNo,
            password,
    });
    res.send({status:'ok'})
    } catch (error) {
        res.send({status: 'error'})
    }
});


app.post('/studentForm', async (req, res)=> {
    const mainStudent=await User.findOne({email:req.body.email});
    
    const{name, email, section, sem, year, branch, reg, teacherName, teacherEmail, specialization} = req.body;
    try {
       const u= new User({
            name,
            email,
            section,
            branch,
            reg,
            sem,
            year,
            teacherName,
            teacherEmail,
            specialization,

           
    });
    await u.save();
console.log(u);
   /*  mainStudent.push(u._id) */
    res.status(200).json("Ok")
    } catch (error) {
        res.send({status: 'error'})
    }
});


app.post("/loginUser", async(req, res)=>{
    const {email, password} = req.body;

    const user = await User.findOne({email});
    if (!user) {
        return res.json({error: "User not found. Contact admin."})
    }
    if (password==user.password){
        const token=jwt.sign({email: user.email},JWT_SECRET);

        if (res.status(201)) {
            return res.json({ status: 'ok', data: token});
        }else{
            return res.json({error: 'error'});
        }
    }
    res.json({status: 'error', error: 'Wrong Credentials'});
});
    
app.post('/userData', async(req,res) => {
    const{ token } = req.body;
    try {
        const user = jwt.verify(token, JWT_SECRET);
        const useremail = user.email;
        User.findOne({email: useremail}).then((data) => {
            res.send({status: 'ok', data: data});
        }).catch((error) => {
            res.send({ status: 'error', data: error});
        })
    } catch (error) {}
});

// const express = require('express');
// const app = express();
// app.use(express.json());
// const mongoose = require('mongoose');
// const cors = require('cors');
// app.use(cors());

// // Connect to database
// const mongoUrl = 'mongodb+srv://gargaaditya18:admin@cluster0.aakb4xv.mongodb.net/test';
// mongoose.connect(mongoUrl, { useNewUrlParser: true })
//     .then(() => {
//         console.log('connected to database');
//     })
//     .catch((e) => console.log(e));

// // Define schema for student details
// const StudentDetailsSchema = new mongoose.Schema(
//     {
//         uname: String,
//         email: String,
//         userType: String,
//         section: String,
//         sem: String,
//         year: String,
//         branch: String,
//         reg_no: String,
//         tname: String,
//         temail: String,
//         specialization: String,
//     },
//     {
//         collection: 'UserInfo',
//     }
// );

// // Create model from schema
// const StudentDetails = mongoose.model('UserInfo', StudentDetailsSchema);

// // Route for submitting student details
// app.post('/submit-form', (req, res) => {
//     // Create a new instance of the StudentDetails model
//     const studentDetails = new StudentDetails({
//         uname: req.body.uname,
//         email: req.body.email,
//         userType: req.body.userType,
//         section: req.body.section,
//         sem: req.body.sem,
//         year: req.body.year,
//         branch: req.body.branch,
//         reg_no: req.body.reg_no,
//         tname: req.body.tname,
//         temail: req.body.temail,
//         specialization: req.body.specialization
//     });

//     studentDetails.save((err) => {
//         if (err) {
//             console.error(err);
//             res.status(500).send('Error saving student details to database');
//         } else {
//             res.status(200).send('Student details saved to database');
//         }
//     });
// });

// // Start server
// app.listen(5000, () => {
//     console.log('server started');
// });
