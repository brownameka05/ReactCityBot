const express = require ('express');
const bodyParser= require ('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const config = require('./db');

const users = require('./backend/routes/user');

mongoose.connect(config.DB, { useNewUrlParser: true }).then(
    () => {console.log('Mongo Database is connected') },
    err => { console.log('Can not connect to the database'+ err)}
);


const  app = express();
app.use(passport.initialize());
require('./passport')(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/users', users);

require('./routes/dialogFlowRoutes')(app);

app.get('/', function(req, res) {
    res.send('hello');
});



const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
  console.log('server is running on 5000');
});
