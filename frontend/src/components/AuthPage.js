import React, { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import API from '../api';

const AuthPage = () => {
    const [isSignup, setIsSignup] = useState(false); // Toggle between Login and Signup
    const [formData, setFormData] = useState({ username: '', password: '' });

    // Handle form submission for login or signup
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isSignup) {
                await API.post('/auth/signup', formData);
                alert('Signup successful! You can now log in.');
                setIsSignup(false); // Switch to login after signup
            } else {
                const { data } = await API.post('/auth/login', formData);
                localStorage.setItem('token', data.token);
                window.location.href = '/employees'; // Redirect after login
            }
        } catch (error) {
            alert(isSignup ? 'Signup failed. Try again.' : 'Login failed. Check your credentials.');
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.formWrapper}>
                <h1 style={styles.header}>{isSignup ? 'Sign Up' : 'Login'}</h1>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Username</label>
                        <div style={styles.row}>
                            <FaUser style={styles.icon} />
                            <input
                                type="text"
                                placeholder="Enter Username"
                                value={formData.username}
                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                style={styles.input}
                                required
                            />
                        </div>
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Password</label>
                        <div style={styles.row}>
                            <FaLock style={styles.icon} />
                            <input
                                type="password"
                                placeholder="Enter Password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                style={styles.input}
                                required
                            />
                        </div>
                    </div>
                    <button type="submit" style={styles.button}>
                        {isSignup ? 'Sign Up' : 'Login'}
                    </button>
                </form>
                <p style={styles.toggleText}>
                    {isSignup
                        ? 'Already have an account? '
                        : "Don't have an account? "}
                    <span style={styles.toggleLink} onClick={() => setIsSignup(!isSignup)}>
                        {isSignup ? 'Log in here' : 'Sign up here'}
                    </span>
                </p>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #4f00ff, #bf00ff)',
    },
    formWrapper: {
        width: '50%',
        background: '#fff',
        borderRadius: '12px',
        padding: '50px',
        boxShadow: '0px 15px 30px rgba(0, 0, 0, 0.3)',
        textAlign: 'center',
    },
    header: {
        fontSize: '3.5rem',
        color: '#4f00ff',
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
    button: {
        padding: '15px',
        fontSize: '1.5rem',
        background: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontWeight: '600',
        boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.2)',
        transition: 'all 0.3s',
    },
    toggleText: {
        fontSize: '1.2rem',
        marginTop: '20px',
        color: '#333',
    },
    toggleLink: {
        color: '#007bff',
        cursor: 'pointer',
        fontWeight: 'bold',
        textDecoration: 'underline',
    },
};

export default AuthPage;
