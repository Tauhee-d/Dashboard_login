const mongoose = require('mongoose')
const dotenv = require('dotenv')

mongoose.set("strictQuery", false);
mongoose.connect(
    process.env.DATABASE,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err)=> {
        if(!err) console.log("database connected");
        else console.log("database error");
    }
    )