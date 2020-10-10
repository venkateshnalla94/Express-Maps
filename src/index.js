/**
 * Dependence
 * @type {createApplication}
 */
require('../src/models/User')

const express = require('express');
const requireAuth=require('./middlewares/requireAuth');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const bodyParser = require('body-parser');
const app = express();


/**
 * imports
 */
app.use(bodyParser.json());
app.use(authRoutes);


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


const port = process.env.PORT || 3000;
app.listen(port, () => {
     console.log(`Listening on port ${port}`);
});





