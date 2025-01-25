const { where, validate } = require('sequelize');
const { Employee } = require('../models');


const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.findAll();
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        })
    }
}

const getEmployee = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) return res.status(400).json({ message: 'Invalid Employee ID' });

        const employee = await Employee.findOne(
            {
                where: {
                    id: id
                }
            }
        );

        if (!employee) return res.status(404).json({ message: `Employee with ID: ${id} is not found.` })

        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        })
    }
}

const deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        if (isNaN(id)) return res.status(400).json({ message: 'Invalid Employee ID' });

        const employee = await Employee.findByPk(id);
        if (!employee) return res.status(404).json({ message: `Employee with ID: ${id} is not found.` })

        await Employee.destroy({
            where: {
                id: id
            }
        });

        res.status(200).json({
            message: `Employee with ID ${id} is deleted successfully`
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        })
    }
}

const updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) return res.status(400).json({ message: 'Invalid Employee ID' });

        const employee = await Employee.findByPk(id);

        if (!employee) return res.status(404).json({ message: `Employee with ID: ${id} is not found.` })

        const response = await Employee.update(
            req.body,
            {
                where: {
                    id: id
                },
                validate: true,
            }

        )
        if (response[0] === 0) return res.status(200).json({ message: 'Something went wrong' });

        const updatedEmployee = {
            id: id,
            name: req.body.name,
            email: req.body.email,
            position: req.body.position,
            salary: req.body.salary,
        }
        res.status(200).json(updatedEmployee)

    } catch (error) {
        res.status(500).json({
            message: error.message
        })

    }
}

const createEmployee = async(req, res) => {
    try {
        const response = await Employee.create(
            req.body
        )
        if (response[0] === 0) return res.status(200).json({ message: 'Something went wrong' });

        res.status(200).json(response)

    } catch (error) {
        const err = error.errors[0].message
        res.status(500).json(err)
    }
};

module.exports = {
    getEmployees,
    getEmployee,
    updateEmployee,
    deleteEmployee,
    createEmployee,
}