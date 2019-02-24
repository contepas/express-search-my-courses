const expect = require('chai').expect;


describe('getCourses', ()=> {
    const getCourses = require('../controllers/courses').getCourses;
    it('should get an array of courses objects', async () => {
        const allCourses = await getCourses();
        expect(allCourses).to.be.an('array');
        expect(allCourses[0].keys).to.be.an('array');
        expect(allCourses[0]).to.have.all.keys('id', 'title', 'source', 'url', 'summary', 'keys', 'earned_date');
    });

});

describe('findSubject', ()=> {
    const findSubject = require('../controllers/courses').findSubject;
    it('should get an array of courses objects', async () => {
        const coursesWithSubjectKey = await findSubject('javascript');
        expect(coursesWithSubjectKey.keys).to.be.an('array').that.include('javascript');
    });

});