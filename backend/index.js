const  express =require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const stEnqRouter = require('./Routes/stEnqRouter');
const adminRoute = require('./Routes/adminRouter');
const centerRoute = require('./Routes/centerRoute');
const visitorRoute = require('./Routes/visitorRoute');
const userRouter = require('./Routes/userRouter');
const assignRouter = require('./Routes/assignRouter');
const followupRouter = require('./Routes/followupRouter');
const otpRouter = require('./Routes/otpRouter');
const dotenv = require('dotenv')
const app= express();
dotenv.config();
const port = process.env.PORT;
mongoose.connect(process.env.URI)
.then(()=>{
    console.log("DB connected");
})
.catch((e)=>{
    console.log(`Error : ${e}`);
})
// app.get('/',(req,res)=>{
//     return res.json({'msg':'success'})
// })
app.use(express.json())
app.use(cors());
app.use('/upload',express.static('upload'));
app.use('/api/enq',stEnqRouter)
app.use('/api/center',centerRoute);
app.use('/api/adduser',userRouter);
app.use('/api/visitor',visitorRoute);
app.use('/api/assign',assignRouter);
app.use('/api/followup',followupRouter);
app.use('/api/otp',otpRouter);

// app.use('/',stEnqRouter)
app.use('/api/admin',adminRoute)


app.listen(port,()=>console.log(`Server Running on ${port}`));