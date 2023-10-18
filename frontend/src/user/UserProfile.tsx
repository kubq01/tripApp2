import {useEffect, useState} from "react";
import User from "./User.tsx";
import NavBar from "../core/NavBar.tsx";
import {useNavigate} from "react-router-dom";

function UserProfile() {

    const LOADING = "loading..."

    const [user, setUser] = useState(new User(LOADING, LOADING, LOADING))
    const navigate = useNavigate();


    useEffect(() => {
        const token = localStorage.getItem('token');

        // Fetch user data using Bearer token
        if (token) {
            fetch('http://localhost:8081/user/my_profile', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Access-Control-Allow-Origin': 'http://localhost:3000',
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            })
                .then(response => response.json())
                .then(data => {
                    const user = new User(data.firstName, data.lastName, data.email);
                    setUser(user)
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                });
        } else
            navigate("/")

    }, [])

    return (

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
            <form className="text-center" method="post">
                <div className="mb-3"></div>
                <div className="mb-3"></div>
                <p style={{marginBottom: "0px", textAlign: "left"}}>First Name: {user.getFirstName()}</p>
                <p style={{marginBottom: "0px", textAlign: "left"}}>Last Name: {user.getLastName()}</p>
                <p style={{marginBottom: "0px", textAlign: "left"}}>Email: {user.getEmail()}</p>
            </form>
        </div>

    );
}

export default UserProfile;
