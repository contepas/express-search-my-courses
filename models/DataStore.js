const fs = require('fs');

class DataStore {
    
    static generateRandomId(){
        return Math.floor(Math.random() * 10000);
    }


    /**
     * Save data in data.json
     * @param {Object} data
     * Object containing info for new course: 
     *  title, url, source, summary
     */
    static save(data){
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

    static async getCourses(){
        const data = await this.getData();
        return data.COURSES;
    }

    static async getKeys(){
        const data = await this.getData();
        return data.KEYWORDS;
    }


    /**
     * Gets all data from data.json
     * @param None
     */
    static getData(){
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
}

module.exports = DataStore;