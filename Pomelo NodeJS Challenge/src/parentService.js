var fs = require('fs');
const ParentData = require('./models/parent');

//Function is to read the data from input.txt and convert the JSON data to array and map based on parent id.
exports.processChildMapping = async function (requestObj) {
    try {
        let fileData = fs.readFileSync('./input.txt', 'utf8')
        if (fileData) {
            let parents=[];
            fileData = Object.values(JSON.parse(fileData));
            let level = fileData.length;

            for (let index = 0; index < level; index++) {
                const element = fileData[index];
                for (let l = 0; l < element.length; l++) {
                    const e = new ParentData(element[l]);
                    parents.push(e);
                }
            }

            for (let l = level; l >= 0; l--) {
                let levelChildren = parents.filter(x => x.level === l);
                levelChildren.forEach(child => {
                    parents.filter(parent => {
                        if (parent.id === child.parent_id) {
                            parent.children.push(child);
                            parents = parents.filter(i => i.id !== child.id);
                        }
                    });
                });
            }
            return parents;
        } else {
            throw "File Not Found";
        }
    } catch (err) {
        console.log(err);
        throw err;
    }
}