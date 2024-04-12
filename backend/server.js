const { connectDatabase } = require('./config/database');
const cloudinary = require('cloudinary')

const port = 3000;
connectDatabase();
cloudinary.config({
    cloud_name:'dbpg4ry3w',
    api_key:'624471431544462',
    api_secret:'Kac9GRnWSCYRUft3eLgsY0wBQSc'

})

app.listen(port, ()=>{
    console.log(`The server is running on port ${port}`);
});