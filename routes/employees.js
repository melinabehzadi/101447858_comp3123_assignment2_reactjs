const express = require('express');
const Employee = require('../models/Employee');

const router = express.Router();

// Search employees by department or position (PLACE THIS FIRST)
router.get('/search', async (req, res) => {
    const { department, position } = req.query;

    try {
        const query = {};
        if (department) query.department = department;
        if (position) query.position = position;

        const employees = await Employee.find(query);
        res.json(employees);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all employees
router.get('/', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get employee by ID
router.get('/:id', async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.json(employee);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Add an employee
router.post('/', async (req, res) => {
    const { firstName, lastName, email, position, department } = req.body;

    try {
        const employee = new Employee({ firstName, lastName, email, position, department });
        await employee.save();
        res.status(201).json(employee);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Update an employee
router.put('/:id', async (req, res) => {
    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedEmployee);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete an employee
router.delete('/:id', async (req, res) => {
    try {
        await Employee.findByIdAndDelete(req.params.id);
        res.json({ message: 'Employee deleted successfully!' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
