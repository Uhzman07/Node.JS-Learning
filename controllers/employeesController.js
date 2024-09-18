const Employee = require('../model/Employee');

/*
    Note that these methods are used as functions to replace the routing option
*/
const getAllEmployees = async (req, res) => {
    console.log("Usman");
    const employees = await Employee.find(); // Note that calling employee like this returns all the employees
    if(!employees){
        return res.status(204).json({'message' : 'No employees found.'});
    }
    res.json(employees);
}

const createNewEmployee = async (req, res) => {
    if(!req?.body?.firstname || !req?.body?.lastname){
        return res.status(400).json({'message': 'First name and last names are required'});
    }
    try{
        const result = await Employee.create({
            firstname : req.body.firstname,
            lastname : req.body.lastname
        });
        // "201" means created
        res.status(201).json(result);

    } catch(err){
        console.error(err);
    }
}

const updateEmployee = async (req, res) => {
   
    if(!req?.body?.id){
        return res.status(400).json({'message': 'ID parameter is required.'});
    }

    const employee = await Employee.findOne({_id : req.body.id}).exec(); // Note that exec() is used to call the function to action
   if(!employee){
        return res.status(204).json({"message": `No employee natches ID ${req.body.id}.`});
   }
   // To check if the firstname and lastname are actually present and then set the names of the employee to the updated one
   if(req.body?.firstname) employee.firstname = req.body.firstname;
   if(req.body?.lastname) employee.lastname = req.body.lastname;

   const result = await employee.save(); // This is used to save any changes that we had made to the employee document
   res.json(result);
}

const deleteEmployee = async (req, res) =>{

  if(!req?.body?.id){
    return res.status(400).json({'message': 'Employee ID required.'});
  }
  const employee = await Employee.findOne({_id: req.body.id}).exec();

  // If the employee is already not present
  if(!employee){
    console.log("Usmam");
    return res.status(204).json({"message":`No employee matches ID ${req.body.id}.`});
  }

  // Then to delete the employee of the particular id
  const result = await employee.deleteOne({_id : req.body.id});

  //console.log(result);

  res.json(result);
}

const getEmployee = async (req, res) =>{
    if(!req?.params?.id){
        return res.status(400).json({'message': 'Employee ID required.'});
    }
    const employee = await Employee.findOne({_id: req.params.id}).exec();
    if(!employee){
        return res.status(204).json({"message":`No employee matches ID ${req.params.id}.`});
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