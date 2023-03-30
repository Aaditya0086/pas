const mongoose = require('mongoose');
const StudentDetailsSchema = require('./path/to/StudentDetailsSchema');

const StudentDetailsSchema = mongoose.Schema(
    {
        name: String,
        email: { type: String, unique: true }, 
        // phoneNo: String,
        // password: String,
        userType: String,
        section: String,
        sem: String,
        year: String,
        branch:String,
        reg:{
            type:String,
            unique:true
        },
        teacherName: String,
        teacherEmail: String,
        specialization: String,
    },
    {
        collection: 'UserInfo',
    }
);


mongoose.model('UserInfo', StudentDetailsSchema);

// const express = require('express');
// const router = express.Router();
// const passport = require('passport');
// const mongoose = require('mongoose');
// const UserInfo = mongoose.model('UserInfo');

// // Require authentication for this route
// router.post('/submit-form', passport.authenticate('jwt', { session: false }), async (req, res) => {
//   try {
//     const { uname, email, userType, section, sem, year, branch, reg_no, tname, temail, specialization } = req.body;

//     // Create a new instance of the UserInfo model
//     const userInfo = new UserInfo({
//       uname,
//       email,
//       userType,
//       section,
//       sem,
//       year,
//       branch,
//       reg_no,
//       tname,
//       temail,
//       specialization
//     });

//     // Save the userInfo instance to the database
//     await userInfo.save();

//     res.status(200).json({ success: true });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// module.exports = router;
