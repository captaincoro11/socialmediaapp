const mongoose = require('mongoose');
const url = 'mongodb+srv://PranjulShukla:beena55@cluster0.qicx6ls.mongodb.net/';



exports.connectDatabase = ()=>{
    mongoose.connect(url)
    .then((con)=>console.log(`Database Connected : ${con.connection.host}`))
    .catch((error)=>console.log(error));

} 
