import background from "./../static/forest_bg.jpg";
import background2 from "./../background.png";
import React, {useState} from "react";
import {Link} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import HOST from "../config/apiConst.tsx";
function LoginForm() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(HOST + '/auth/authenticate', {
                email,
                password,
            },{
                withCredentials: true,
                headers: {
                    'Access-Control-Allow-Origin': 'http://localhost:3000',
                    'Content-Type': 'application/json',
                }
            });

            const token = response.data.accessToken;
            localStorage.setItem('token', token);

            navigate('/my_profile');
        } catch (error) {
            setError('Invalid email or password. Please try again.');
        }
    };

    return (
        <div className="App" style={{backgroundImage: 'url(${background2})' }}>
            <header className="masthead" >
                <div className="intro-body">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 mx-auto">
                                <h1 className="brand-heading">Trip App</h1>
                                <section className="position-relative py-4 py-xl-5">
                                    <div className="container">
                                        <div className="row d-flex justify-content-center">
                                            <div className="col-md-6 col-xl-4">
                                                <div className="card mb-5">
                                                    <div className="card-body d-flex flex-column align-items-center">
                                                        <div
                                                            className="bs-icon-xl bs-icon-circle bs-icon-primary bs-icon my-4">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="1em"
                                                                 height="1em" fill="currentColor" viewBox="0 0 16 16"
                                                                 className="bi bi-person">
                                                                <path
                                                                    d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"></path>
                                                            </svg>
                                                        </div>
                                                        {error && <p>{error}</p>}
                                                        <form className="text-center" method="post" onSubmit={handleLogin}>
                                                            <div className="mb-3"><input className="form-control"
                                                                                         type="email" name="email"
                                                                                         placeholder="Email"
                                                                                         value={email}
                                                                                         onChange={(e) => setEmail(e.target.value)}
                                                                                         required/></div>
                                                            <div className="mb-3"><input className="form-control"
                                                                                         type="password" name="password"
                                                                                         placeholder="Password"
                                                                                         value={password}
                                                                                         onChange={(e) => setPassword(e.target.value)}
                                                                                         required/></div>
                                                            <div className="mb-3">
                                                                <button className="btn btn-primary d-block w-100"
                                                                        type="submit">Login
                                                                </button>
                                                            </div>
                                                            <p style={{ marginBottom: "0px" }}><Link to="/register">Register</Link></p>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
}

export default LoginForm;
