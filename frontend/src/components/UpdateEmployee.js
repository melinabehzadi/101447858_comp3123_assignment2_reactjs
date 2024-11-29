import React, { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaBriefcase, FaBuilding } from 'react-icons/fa';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api';

const UpdateEmployee = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        position: '',
        salary: '',
        date_of_joining: '',
        department: '',
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const { data } = await API.get(`/employees/${id}`);
                setFormData(data);
            } catch (error) {
                console.error('Error fetching employee data:', error);
                alert('Error fetching employee data');
            }
        };
        fetchEmployee();
    }, [id]);

    const validateForm = () => {
        const errors = {};
        const nameRegex = /^[A-Za-z\s]+$/;
        const emailRegex = /^[^\s@]+@[^\s@]+$/;
        const textRegex = /^[A-Za-z0-9\s]+$/;

        if (!formData.firstName.trim()) {
            errors.firstName = 'First Name is required.';
        } else if (!nameRegex.test(formData.firstName)) {
            errors.firstName = 'First Name can only contain letters.';
        }

        if (!formData.lastName.trim()) {
            errors.lastName = 'Last Name is required.';
        } else if (!nameRegex.test(formData.lastName)) {
            errors.lastName = 'Last Name can only contain letters.';
        }

        if (!formData.email.trim()) {
            errors.email = 'Email is required.';
        } else if (!emailRegex.test(formData.email)) {
            errors.email = 'Invalid email format.';
        }

        if (!formData.position.trim()) {
            errors.position = 'Position is required.';
        } else if (!textRegex.test(formData.position)) {
            errors.position = 'Position can only contain letters and numbers.';
        }

        if (!formData.department.trim()) {
            errors.department = 'Department is required.';
        } else if (!textRegex.test(formData.department)) {
            errors.department = 'Department can only contain letters and numbers.';
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            await API.put(`/employees/${id}`, {
                first_name: formData.firstName, // Use first_name
                last_name: formData.lastName,  // Use last_name
                email: formData.email,
                position: formData.position,
                department: formData.department,
                salary: formData.salary,
                date_of_joining: formData.date_of_joining,
            });
            alert('Employee updated successfully!');
            navigate('/employees');
        } catch (error) {
            console.error('Error updating employee:', error);
            alert('Error updating employee');
        }
    };


    return (
        <div style={styles.container}>
            <div style={styles.formWrapper}>
                <h1 style={styles.header}>Update Employee</h1>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>First Name</label>
                        <div style={styles.row}>
                            <FaUser style={styles.icon}/>
                            <input
                                type="text"
                                placeholder="Enter First Name"
                                value={formData.firstName}
                                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                                style={styles.input}
                            />
                        </div>
                        {errors.firstName && <p style={styles.errorText}>{errors.firstName}</p>}
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label}>Last Name</label>
                        <div style={styles.row}>
                            <FaUser style={styles.icon}/>
                            <input
                                type="text"
                                placeholder="Enter Last Name"
                                value={formData.lastName}
                                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                                style={styles.input}
                            />
                        </div>
                        {errors.lastName && <p style={styles.errorText}>{errors.lastName}</p>}
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label}>Email</label>
                        <div style={styles.row}>
                            <FaEnvelope style={styles.icon}/>
                            <input
                                type="email"
                                placeholder="Enter Email"
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                style={styles.input}
                            />
                        </div>
                        {errors.email && <p style={styles.errorText}>{errors.email}</p>}
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label}>Position</label>
                        <div style={styles.row}>
                            <FaBriefcase style={styles.icon}/>
                            <input
                                type="text"
                                placeholder="Enter Position"
                                value={formData.position}
                                onChange={(e) => setFormData({...formData, position: e.target.value})}
                                style={styles.input}
                            />
                        </div>
                        {errors.position && <p style={styles.errorText}>{errors.position}</p>}
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label}>Department</label>
                        <div style={styles.row}>
                            <FaBuilding style={styles.icon}/>
                            <input
                                type="text"
                                placeholder="Enter Department"
                                value={formData.department}
                                onChange={(e) => setFormData({...formData, department: e.target.value})}
                                style={styles.input}
                            />
                        </div>
                        {errors.department && <p style={styles.errorText}>{errors.department}</p>}
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Salary</label>
                        <div style={styles.row}>
                            <input
                                type="number"
                                placeholder="Enter Salary"
                                value={formData.salary}
                                onChange={(e) => setFormData({...formData, salary: e.target.value})}
                                style={styles.input}
                            />
                        </div>
                    </div>

                    <div style={styles.formGroup}>
                        <label style={styles.label}>Date of Joining</label>
                        <div style={styles.row}>
                            <input
                                type="date"
                                value={formData.date_of_joining}
                                onChange={(e) => setFormData({...formData, date_of_joining: e.target.value})}
                                style={styles.input}
                            />
                        </div>
                    </div>


                    <div style={styles.buttonGroup}>
                        <button type="submit" style={styles.buttonSave}>Update</button>
                        <button
                            type="button"
                            onClick={() => navigate('/employees')}
                            style={styles.buttonCancel}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #4f00ff, #bf00ff)',
    },
    formWrapper: {
        width: '60%',
        background: '#fff',
        borderRadius: '12px',
        padding: '50px',
        boxShadow: '0px 15px 30px rgba(0, 0, 0, 0.3)',
    },
    header: {
        fontSize: '3.5rem',
        color: '#4f00ff',
        textAlign: 'center',
        marginBottom: '40px',
        fontWeight: '700',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '25px',
    },
    formGroup: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
    },
    label: {
        fontSize: '1.5rem',
        color: '#4f00ff',
        marginBottom: '10px',
        fontWeight: '500',
    },
    row: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
    },
    icon: {
        fontSize: '2rem',
        color: '#4f00ff',
    },
    input: {
        padding: '15px',
        fontSize: '1.5rem',
        borderRadius: '8px',
        border: '1px solid #ddd',
        width: '100%',
    },
    buttonGroup: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '20px',
    },
    buttonSave: {
        padding: '15px',
        fontSize: '1.5rem',
        background: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        flex: 1,
        marginRight: '10px',
    },
    buttonCancel: {
        padding: '15px',
        fontSize: '1.5rem',
        background: '#dc3545',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        flex: 1,
        marginLeft: '10px',
    },
    errorText: {
        color: '#dc3545',
        fontSize: '1rem',
        marginTop: '5px',
    },
};

export default UpdateEmployee;
