import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import sideImage from './img/sideimg.png'; // Adjust the path accordingly

const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: credentials.email, password: credentials.password }),
            });

            const json = await response.json();
            console.log(json);

            if (json.success) {
                // Save the auth-token and redirect
                localStorage.setItem('token', json.authtoken);
                props.showAlert("Logged In Successfully", "success");
                navigate('/');
            } else {
                props.showAlert("Invalid Details", "danger");
            }
        } catch (error) {
            console.error('Error logging in:', error);
            props.showAlert("An error occurred. Please try again.", "danger");
        }
        setLoading(false);
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <div className='container d-flex flex-column flex-md-row justify-content-center align-items-start' style={{ height: '100vh', paddingTop: '80px' }}>
            <div className='form-container mt-3' style={{ width: '100%', maxWidth: '500px' }}>
                <h2 className='mb-2 text-center'>Login to continue to iNoteBook</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email" className='px-2 py-2'>Email address</label>
                        <input
                            type="email"
                            className="form-control shadow bg-white rounded"
                            value={credentials.email}
                            id="email"
                            name="email"
                            placeholder="Enter email"
                            onChange={onChange}
                            required
                        />
                        <small id="emailHelp" className="form-text text-muted">
                            We'll never share your email with anyone else.
                        </small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className='px-2 py-2'>Password</label>
                        <input
                            type="password"
                            className="form-control shadow bg-white rounded"
                            value={credentials.password}
                            id="password"
                            name="password"
                            placeholder="Password"
                            onChange={onChange}
                            required
                        />
                    </div>
                    <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-primary my-2 shadow rounded" disabled={loading}>
                            {loading ? 'Logging in...' : 'Submit'}
                        </button>
                    </div>
                </form>
            </div>
            <div className='image-container d-flex align-items-center justify-content-center' style={{ width: '100%', maxWidth: '500px', marginLeft: '20px' }}>
                <img src={sideImage} alt="login" style={{ width: '100%', height: '100%' }} />
            </div>
        </div>
    );
};

export default Login;
