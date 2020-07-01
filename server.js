const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const booksRoute = require('./Backend/Routes/books');


//connect to DB
const url = 'mongodb://localhost:27017/bookstore';

mongoose.connect(url, { 
  useNewUrlParser: true,
  useUnifiedTopology: true 
});

const db = mongoose.connection
db.on('connected', () => {
  console.log('Database connected:', url)
})

db.on('error', err => {
  console.error('connection error:', err)
})
//end of connecting to DB

const app = express();

//init middleware
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', (req, res) => res.send('API running'));

app.use('/books', booksRoute);

const port = 3000;

app.listen(port, () => console.log('Server is running on port ' + port));