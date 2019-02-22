'use strict'

const express = require('express');
const path = require('path');
const Courses = require('./models/courses.js');
const routes = require('./routes/routes.js');
const logger = require('morgan');

const app = express();

app.set('view engine', 'pug');
app.set("views", path.join(__dirname, "views"));
app.use(express.static('public'));
app.use(logger('dev'));
app.use('/api/v1', express.json());
app.use('/api/v1', routes);

//Index page (will show how to use the api)
app.get('/', async (req,res) => {
  try{
    //throw new Error('Cazzarola!');
    const courses = await Courses.getCourses();
    res.render('index', {title: "Courses", courses: courses.COURSES});
  }catch(err){
    res.render('error', {error: err.message})
  }
});


//Error handeling
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
})

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({message: err.message});
})


app.listen(3000, () => console.log('App listening on port 3000!'));
