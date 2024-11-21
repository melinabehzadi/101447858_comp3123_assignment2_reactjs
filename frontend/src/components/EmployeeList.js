import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    TextField,
    Box,
} from '@mui/material';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [searchDepartment, setSearchDepartment] = useState('');
    const [searchPosition, setSearchPosition] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const { data } = await API.get('/employees');
                setEmployees(data);
            } catch (error) {
                console.error('Error fetching employees:', error);
                alert('Error fetching employees');
            }
        };
        fetchEmployees();
    }, []);

    const handleSearch = async () => {
        try {
            const query = new URLSearchParams();
            if (searchDepartment) query.append('department', searchDepartment);
            if (searchPosition) query.append('position', searchPosition);
            const { data } = await API.get(`/employees/search?${query.toString()}`);
            setEmployees(data);
        } catch (error) {
            console.error('Error searching employees:', error);
            alert('Error searching employees');
        }
    };

    const handleAddEmployee = () => {
        navigate('/add-employee');
    };

    const handleViewEmployee = (id) => {
        navigate(`/view-employee/${id}`);
    };

    const handleUpdateEmployee = (id) => {
        navigate(`/update-employee/${id}`);
    };

    const handleDeleteEmployee = async (id) => {
        try {
            await API.delete(`/employees/${id}`);
            alert('Employee deleted successfully!');
            setEmployees((prevEmployees) => prevEmployees.filter((employee) => employee._id !== id));
        } catch (error) {
            console.error('Error deleting employee:', error);
            alert('Error deleting employee');
        }
    };

    return (
        <Box
            sx={{
                background: 'linear-gradient(135deg, #6e00ff, #bd00ff)',
                minHeight: '100vh',
                padding: '40px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                color: '#fff',
                width: '100%',
            }}
        >
            <h1 style={{ fontSize: '4rem', marginBottom: '30px', textAlign: 'center' }}>
                Employee List
            </h1>
            <Box
                sx={{
                    display: 'flex',
                    gap: '15px',
                    marginBottom: '30px',
                    width: '90%',
                }}
            >
                <TextField
                    variant="outlined"
                    label="Search by Department"
                    value={searchDepartment}
                    onChange={(e) => setSearchDepartment(e.target.value)}
                    fullWidth
                    InputProps={{
                        style: { fontSize: '1.5rem' },
                    }}
                    InputLabelProps={{
                        style: { fontSize: '1.5rem' },
                    }}
                />
                <TextField
                    variant="outlined"
                    label="Search by Position"
                    value={searchPosition}
                    onChange={(e) => setSearchPosition(e.target.value)}
                    fullWidth
                    InputProps={{
                        style: { fontSize: '1.5rem' },
                    }}
                    InputLabelProps={{
                        style: { fontSize: '1.5rem' },
                    }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSearch}
                    sx={{ fontSize: '1.5rem', padding: '15px 30px' }}
                >
                    Search
                </Button>
            </Box>
            <Button
                variant="contained"
                color="success"
                onClick={handleAddEmployee}
                sx={{
                    fontSize: '1.5rem',
                    padding: '15px 30px',
                    marginBottom: '30px',
                    width: '90%',
                }}
            >
                Add Employee
            </Button>
            <TableContainer
                component={Paper}
                sx={{
                    width: '90%',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)',
                }}
            >
                <Table>
                    <TableHead sx={{ backgroundColor: '#007bff' }}>
                        <TableRow>
                            <TableCell sx={styles.tableHeader}>First Name</TableCell>
                            <TableCell sx={styles.tableHeader}>Last Name</TableCell>
                            <TableCell sx={styles.tableHeader}>Email</TableCell>
                            <TableCell sx={styles.tableHeader}>Position</TableCell>
                            <TableCell sx={styles.tableHeader}>Department</TableCell>
                            <TableCell sx={styles.tableHeader}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {employees.map((employee) => (
                            <TableRow key={employee._id}>
                                <TableCell sx={styles.tableData}>{employee.firstName}</TableCell>
                                <TableCell sx={styles.tableData}>{employee.lastName}</TableCell>
                                <TableCell sx={styles.tableData}>{employee.email}</TableCell>
                                <TableCell sx={styles.tableData}>{employee.position}</TableCell>
                                <TableCell sx={styles.tableData}>{employee.department}</TableCell>
                                <TableCell sx={styles.actionCell}>
                                    <Button
                                        variant="contained"
                                        color="info"
                                        onClick={() => handleViewEmployee(employee._id)}
                                    >
                                        View
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="warning"
                                        onClick={() => handleUpdateEmployee(employee._id)}
                                        sx={{ marginLeft: '10px' }}
                                    >
                                        Update
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        onClick={() => handleDeleteEmployee(employee._id)}
                                        sx={{ marginLeft: '10px' }}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

const styles = {
    tableHeader: {
        fontSize: '1.8rem',
        fontWeight: 'bold',
        color: '#fff',
    },
    tableData: {
        fontSize: '1.5rem',
        color: '#333',
    },
    actionCell: {
        display: 'flex',
        gap: '10px',
    },
};

export default EmployeeList;
