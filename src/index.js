/**
 * Dependence
 * @type {createApplication}
 */
require('../src/models/User')
require('../src/models/Track')
const express = require('express');
const requireAuth=require('./middlewares/requireAuth');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const trackRoutes = require('./routes/trackRoutes');
const bodyParser = require('body-parser');
const app = express();


/**
 * imports
 */
app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);


const mongoUri = "mongodb+srv://venkateshnalla94:Venky@007@cluster0.s5ivr.mongodb.net/<dbname>?retryWrites=true&w=majority";
mongoose.connect(mongoUri, {
     useNewUrlParser: true,
     useCreateIndex: true,
     useUnifiedTopology: true
});
mongoose.connection.on('connected', () => {
     console.log('Connected to mongo instance');
});
mongoose.connection.on('error', err => {
     console.error('Error connecting to mongo', err);
});

app.get('/',requireAuth,(req,res)=>{
     res.send({
          email:req.user.email
     })
})


const port =  3000;
app.listen(port, () => {
     console.log(`Listening on port ${port}`);
});





