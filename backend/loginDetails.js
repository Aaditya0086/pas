const mongoose = require('mongoose');

const LoginDetailsSchema = new mongoose.Schema(
    {
        uname: String,
        email: String, 
        phoneNo: String,
        password: String,
        userType: String,
        // branch:String,
        // reg_no:String,
    },
    {
        collection: 'usserrs',
    }
);
mongoose.model('usserrs', LoginDetailsSchema);