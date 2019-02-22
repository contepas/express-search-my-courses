const fs = require('fs');

function generateRandomId(){
  return Math.floor(Math.random() * 10000);
}


/**
 * Save data in data.json
 * @param {Object} data
 * Object containing info for new course: 
 *  title, url, source, summary
 */
function save(data){
  return new Promise((resolve, reject) => {
    fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

/**
 * Gets all data from data.json
 * @param None
 */
function getData(){
  return new Promise((resolve, reject)=> {
      fs.readFile('data.json', 'utf-8', (err, data)=> {
          if(err){
              reject(err);
          } else {
              const json_res = JSON.parse(data);
              resolve(json_res);
          }
      });
  });
}

/**
 * get Courses from data.json
 * @param None
 */
async function getCourses(){
  const courses = await getData();
  return courses.COURSES;
}

/**
 * get Keys from data.json
 * @param None
 */
async function getKeys(){
  const keys = await getData();
  return keys.KEYWORDS;
}

/**
 * Gets a specific course by ID
 * @param {number} id
 */
async function getCourse(id){
  const courses = await getCourses();
  return courses.COURSES.find(course => course.id == id);
}

/**
 * Creates a new course record 
 * @param {Object} newCourse
 *  Object containing info for new course: 
 *  title, url, source, summary
 */
async function createCourse(newCourse) {
  const courses = await getCourses(); 
  
  newCourse.id = generateRandomId(); 
  courses.COURSES.push(newCourse);
  await save(courses); 
  return newCourse; 
}

/**
 * Updates a single course
 * @param {Object} newCourse
 *  An object containing the changes for course: 
 *  title, url, source, summary (all optional)
 */
async function updateCourse(newCourse){
  const courses = await getCourses();
  let course = courses.COURSES.find(item => item.id == newCourse.id);
  
  course.title = newCourse.title;
  course.source = newCourse.source;
  course.url = newCourse.url;
  course.summary = newCourse.summary
  courses.key = []

  for (let word in course.title){
    if (word in courses.KEYWORDS) {
      courses.key.push(word);
    }
  }
 
  await save(courses);
}

/**
 * Deletes a single record
 * @param {Object} record - Accepts record to be deleted. 
 */
async function deleteCourse(course){
  const courses = await getCourses();
  courses.COURSES = courses.COURSES.filter(item => item.id != course.id);
  await save(courses);
}


module.exports = {
  getCourses,
  getCourse, 
  createCourse, 
  updateCourse, 
  deleteCourse,
  getKeys
}

