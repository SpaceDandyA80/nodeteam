// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee");

class Engineer extends Employee{
    constructor(name,id,email,github){
        super(name,id,email)
        this.github = github;
    }
    
    getRole(){
        return "Engineer"
    }
    getGithub(){
        return this.github
    }

}

//const emp = new Engineer("b","bob","5","test@test.com");
//console.log(emp)
// emp.getName();
// emp.getId();
// emp.getEmail();
module.exports = Engineer;