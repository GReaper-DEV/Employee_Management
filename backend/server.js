const express = require('express')
const app = express()
const port = 3000;
const db = require('./models');
const {employeeRoute} = require('./routes')
const cors = require('cors');


//middleware

var corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));

//Employee Router
app.use('/employees', employeeRoute);


db.sequelize.sync().then((req) => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
});
