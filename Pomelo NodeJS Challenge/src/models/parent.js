//map the parent data to the model
function ParentData(data) {       // Accept input data in the constructor
    this.Id = data.id;
    this.title = data.title;
    this.level = data.level;
    this.children = data.children;
    this.parent_id=data.parent_id;
}

module.exports = ParentData; 
