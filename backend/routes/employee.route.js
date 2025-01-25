const express = require("express");
const router = express.Router();
const {urlencodedParser, jsonParser} = require('../middleware/bodyParser')
const { getEmployees, getEmployee, createEmployee, updateEmployee, deleteEmployee } = require("../controllers/employee.controller")


router.get('/',getEmployees);
router.get('/:id', getEmployee);

router.post('/', jsonParser, createEmployee);

router.put('/:id',jsonParser, updateEmployee);

router.delete('/:id',deleteEmployee);


module.exports = router;
