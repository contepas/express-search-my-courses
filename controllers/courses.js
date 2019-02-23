const DataStore = require('../models/DataStore');

/**
 * get Courses from data.json
 * @param None
 */
async function getCourses(){
  const courses = await DataStore.getCourses();
  return courses;
}

/**
 * get Keys from data.json
 * @param None
 */
async function getKeys(){
  const keys = await DataStore.getKeys();
  return keys;
}

/**
 * Gets all courses with a specified subject
 * @param {number} id
 */
async function findSubject(subject){
  const data = await DataStore.getData();
  const keys = data.KEYWORDS;
  const courses = data.COURSES

  if (keys.includes(subject)) {
    return courses.find(course => course.keys.includes(subject));
  }
}

/**
 * Gets a specific course by ID
 * @param {number} id
 */
async function getCourse(id){
  const courses = await DataStore.getCourses();
  return courses.COURSES.find(course => course.id == id);
}

/**
 * Creates a new course record 
 * @param {Object} newCourse
 *  Object containing info for new course: 
 *  title, url, source, summary
 */
async function createCourse(newCourse) {
  const courses = await DataStore.getCourses(); 
  
  newCourse.id = DataStore.generateRandomId(); 
  courses.COURSES.push(newCourse);
  await DataStore.save(courses); 
  return newCourse; 
}

/**
 * Updates a single course
 * @param {Object} newCourse
 *  An object containing the changes for course: 
 *  title, url, source, summary (all optional)
 */
async function updateCourse(newCourse){
  const courses = await DataStore.getCourses();
  const keys = await DataStore.getKeys();
  let course = courses.find(item => item.id == newCourse.id);
  
  course.title = newCourse.title;
  course.source = newCourse.source;
  course.url = newCourse.url;
  course.summary = newCourse.summary
  courses.key = []

  for (let word in course.title){
    if (word in keys) {
      courses.key.push(word);
    }
  }
 
  await DataStore.save(courses);
}

/**
 * Deletes a single record
 * @param {Object} record - Accepts record to be deleted. 
 */
async function deleteCourse(course){
  const courses = await DataStore.getCourses();
  courses = courses.filter(item => item.id != course.id);
  await DataStore.save(courses);
}


module.exports = {
  getCourses,
  getCourse, 
  createCourse, 
  updateCourse, 
  deleteCourse,
  getKeys,
  findSubject
}

