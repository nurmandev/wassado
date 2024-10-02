const express = require('express');
const ConnectDB = require('./config/DB')
const dotenv = require("dotenv").config();

const cors = require('cors');


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))



//calling the api
app.use('/api/useraccount', require('./routes/userRoutes'))
app.use('/api/room', require('./routes/roomRoutes'))
app.use('/api/booking', require('./routes/bookingRoute'))
app.use('/api/housekeeping', require('./routes/housekeepingRoute'));
app.use('/api/feedback', require('./routes/feedbackRoute'));
app.use('/api/maintenanceRequests', require('./routes/MaintenanceRequestRoute'));
app.use('/api/payments', require('./routes/paymentRoute'));
app.use('/uploads', express.static('uploads'));
app.use('/api/login',require('./routes/loginRoute'));



app.listen(process.env.PORT,()=>{
    ConnectDB();
    console.log(`server is running on the port ${process.env.PORT}`);
})






