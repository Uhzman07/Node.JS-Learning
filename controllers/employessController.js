// To create an object instead
const data = {
    employees : require('../model/employees.json'),
    setEmployees : function (data) {this.employees = data}
}




/*
    Note that these methods are used as functions to replace the routing option
*/
const getAllEmployees = (req, res) => {
    res.json(data.employees); // Since this is just to return all the employees that we have
}

const createNewEmployee = (req, res) => {
    // To create a new employee
    // To create a json format
    const newEmployee = {
        // This is used to get the id of the last employee and then add "one" to it
        id: data.employees[data.employees.length -1].id + 1 || 1,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    }

    if(!newEmployee.firstname || !newEmployee.lastname){
        // An error "400" means signifies that it did not go through
        return res.status(400).json({'message' : 'First and last names are required.'});
    }

    // Note that we have to pass in array as our parameter
    // This is used to set the employees to the new employee that we had created
    /*
        newEmployee is a new employee object that you want to add to the employees array.
        [...] is the spread syntax. It creates a new array by copying all elements from data.employees and then adds newEmployee to the end of this new array.
        data.setEmployees([...data.employees, newEmployee]) calls the setEmployees method, passing the new array (which includes the new employee) as the argument.
        The setEmployees method then updates data.employees to this new array.
    */
    data.setEmployees([...data.employees, newEmployee]);

    // This is to return the updated json file
    res.status(201).json(data.employees);
}

const updateEmployee = (req, res) => {
   // This is used to find an employee based on the id
   const employee = data.employees.find(emp => emp.id === parseInt(req.body.id));

   if(!employee){
    return res.status(400).json({"message": `Employee ID ${req.body.id} not found`});
   }
   // To check if the firstname and lastname are actually present and then set the names of the employee to the updated one
   if(req.body.firstname) employee.firstname = req.body.firstname;
   if(req.body.lastname) employee.lastname = req.body.lastname;

   // This is used to filter out the employee that we have just updated
   const filteredArray = data.employees.filter(emp => emp.id !== parseInt(req.body.id));

   const unsortedArray = [...filteredArray, employee];

   // Then to set the employees to the json file and then sort them in order alongside
   data.setEmployees(unsortedArray.sort((a,b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0));

   res.json(data.employees);
}

const deleteEmployee = (req, res) =>{
  const employee = data.employees.find(emp => emp.id === parseInt(req.body.id));

  // If the employee is already not present
  if(!employee){
    return res.status(400).json({"message":`Employee ID ${req.body.id} not found`});
  }
  // If the employee is present, then we wan filter it out
  const filteredArray = data.employees.filter(emp => emp.id !== parseInt(req.body.id));

  // And then we return the filtered list into the json file
  data.setEmployees([...filteredArray]);

  res.json(data.employees);
}

const getEmployee = (req, res) =>{
    const employee = data.employees.find(emp => emp.id === parseInt(req.params.id));
    if(!employee){
        return res.status(400).json({"message": `Employee ID ${req.params.id} not found`});
    }
    res.json(employee);
}
/*
  In order to export
*/
module.exports = {
    getAllEmployees,
    createNewEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
}