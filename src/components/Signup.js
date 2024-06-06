import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
    const [loading, setLoading] = useState(false);
    let navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { name, email, password } = credentials;
            const response = await fetch('http://localhost:5000/api/auth/createuser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            const json = await response.json();
            console.log(json);

            if (json.success) {
                // Save the auth-token and redirect
                localStorage.setItem('token', json.authtoken);
                navigate('/');
                props.showAlert("SignUp Successful", "success")
            } else {
                props.showAlert("Invalid Credentials", "danger")
            }
        } catch (error) {
            console.error('Error logging in:', error);
            alert('An error occurred. Please try again.');
        }
        setLoading(false);
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <div className='d-flex justify-content-center align-items-start' style={{ height: '100vh', paddingTop: '80px' }}>
            <div className='mt-2' style={{ width: '100%', maxWidth: '500px' }}>
                <h2 className='mb-2 text-center'>Create an account to use iNoteBook</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name" className='px-2 py-2'>Name</label>
                        <input
                            type="text"
                            className="form-control shadow bg-white rounded"
                            id="name"
                            name="name"
                            onChange={onChange}
                            aria-describedby="emailHelp"
                            placeholder="Enter name"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email" className='px-2 py-2'>Email address</label>
                        <input
                            type="email"
                            className="form-control shadow bg-white rounded"
                            id="email"
                            name="email"
                            onChange={onChange}
                            aria-describedby="emailHelp"
                            placeholder="Enter email"
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
                            id="password"
                            name="password"
                            onChange={onChange}
                            placeholder="Password"
                            minLength={5}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="cpassword" className='px-2 py-2'>Confirm Password</label>
                        <input
                            type="password"
                            className="form-control shadow bg-white rounded"
                            id="cpassword"
                            name="cpassword"
                            onChange={onChange}
                            placeholder="Confirm Password"
                            minLength={5}
                            required
                        />
                    </div>
                    <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-primary my-2 shadow rounded" disabled={loading}>
                            {loading ? 'Signing in...' : 'Submit'}
                        </button>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default Signup
