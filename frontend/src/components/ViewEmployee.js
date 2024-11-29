import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaBriefcase, FaBuilding } from 'react-icons/fa';
import API from '../api';

const ViewEmployee = () => {
    const { id } = useParams();
    const [employee, setEmployee] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const { data } = await API.get(`/employees/${id}`);
                setEmployee(data);
            } catch (error) {
                console.error('Error fetching employee data:', error);
                alert('Error fetching employee data');
            }
        };
        fetchEmployee();
    }, [id]);

    if (!employee) return <div style={styles.loading}>Loading...</div>;

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h1 style={styles.header}>Employee Details</h1>
                <div style={styles.details}>
                    <div style={styles.detailRow}>
                        <FaUser style={styles.icon} />
                        <p>
                            <strong style={styles.label}>First Name:</strong> {employee.first_name}
                        </p>
                    </div>
                    <div style={styles.detailRow}>
                        <FaUser style={styles.icon} />
                        <p>
                            <strong style={styles.label}>Last Name:</strong> {employee.last_name}
                        </p>
                    </div>
                    <div style={styles.detailRow}>
                        <FaEnvelope style={styles.icon} />
                        <p>
                            <strong style={styles.label}>Email:</strong> {employee.email}
                        </p>
                    </div>
                    <div style={styles.detailRow}>
                        <FaBriefcase style={styles.icon} />
                        <p>
                            <strong style={styles.label}>Position:</strong> {employee.position}
                        </p>
                    </div>
                    <div style={styles.detailRow}>
                        <p>
                            <strong style={styles.label}>Salary:</strong> ${employee.salary}
                        </p>
                    </div>
                    <div style={styles.detailRow}>
                        <p>
                            <strong style={styles.label}>Date of Joining:</strong> {new Date(employee.date_of_joining).toLocaleDateString()}
                        </p>
                    </div>
                    <div style={styles.detailRow}>
                        <FaBuilding style={styles.icon} />
                        <p>
                            <strong style={styles.label}>Department:</strong> {employee.department}
                        </p>
                    </div>
                </div>
                <button onClick={() => navigate('/employees')} style={styles.button}>
                    Back to Employee List
                </button>
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
    card: {
        background: '#fff',
        borderRadius: '12px',
        padding: '50px',
        width: '60%',
        boxShadow: '0px 15px 30px rgba(0, 0, 0, 0.3)',
        textAlign: 'center',
    },
    header: {
        fontSize: '3.5rem',
        color: '#4f00ff',
        marginBottom: '40px',
        fontWeight: '700',
    },
    details: {
        textAlign: 'left',
        marginBottom: '40px',
        fontSize: '1.8rem',
        color: '#333',
    },
    detailRow: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '20px',
    },
    icon: {
        fontSize: '2rem',
        color: '#4f00ff',
        marginRight: '15px',
    },
    label: {
        fontWeight: '600',
        color: '#4f00ff',
        marginRight: '10px',
    },
    button: {
        padding: '15px 30px',
        fontSize: '1.8rem',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: '600',
        boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.2)',
        transition: 'all 0.3s',
    },
    loading: {
        color: '#fff',
        fontSize: '2rem',
        textAlign: 'center',
    },
};

export default ViewEmployee;
