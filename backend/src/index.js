const express = require('express');
const bodyParser = require('body-parser');
const route = require('./route/route');
const { default: mongoose } = require('mongoose');
const app = express();
const dotenv = require('dotenv')
const cors = require('cors')

dotenv.config()

app.use(cors())

app.use(bodyParser.json());

mongoose.connect(process.env.MONGOOSE_URL, {
    useNewUrlParser: true
})
    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err))

app.use('/', route);


app.listen(process.env.PORT || 8000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 8000))
});