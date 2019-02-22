const express = require('express');
const asyncErrHand = require('../util/asyncErrorHandler.js');
const Courses = require('../models/courses.js');
const router = express.Router();

const keyValidator = async (req, res, next) => {
    const allKeys = await Courses.getKeys();
    if (allKeys.includes(req.params.key)){
        next()
    } else {
        const err = new Error(`${req.params.key} is not a valid key`)
        next(err)
    }
}


//send a GET request to '/courses to' read all courses
router.get('/courses', asyncErrHand(async (req,res) => {
    //throw new Error('Stracazzo!')
    const courses = await Courses.getCourses();
    res.json(courses);
}));
  
//send a GET requesto to '/courses/:id' to read a single course
router.get('/courses/:key', keyValidator, asyncErrHand(async (req, res) => {
    
    const allCourses = await Courses.getCourses()
    const courses = allCourses.find(course => course.keys.includes(req.params.key))
    res.json(courses)
}));

//send a POST request to '/courses' to create a new course
router.post('/courses', (req, res) => {
  
})

//send a PUT request to '/courses/:id' to update a course

//send a DELETE requeste to '/courses/:id' to delete a course


module.exports = router;


