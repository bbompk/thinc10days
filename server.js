const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');


//connect mongodb atlas
const mongo_uri = "mongodb+srv://bbom:1234@testcluster4prj.gcilh.mongodb.net/iheretooTest?retryWrites=true&w=majority";
mongoose.Promise = global.Promise;
mongoose.connect(mongo_uri, { useNewUrlParser : true});

app.use(cors());

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended : false}));  //handle url encoded data

//connect mongoose locally
// mongoose.connect('mongodb://localhost:27017/node-api-101', { useNewUrlParser: true});

//mongodb error handler
mongoose.connection.on('error', err => 
    {
        console.error('MongoDB error', err);
    }
)

app.get('/', (req,res) =>
    {
        res.json( { msg : 'Hello Project'})
    }
)

app.get('/test/:title', (req,res) =>
    {
        const title = req.params.title;
        res.json({ title: title})
    }
)

//use toute for blogs
app.use('/api/blogs', require('./routes/api/blogs_db'));

//use route for members
app.use('/api/members', require('./routes/api/members_db'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => 
    {
        console.log(`Server is running on PORT ${PORT}`);
    }
)