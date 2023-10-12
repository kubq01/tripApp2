import User from "../user/User";
import {useNavigate} from "react-router-dom";

function NavBar(){

    const navigate = useNavigate();

    const logout = () => {
        const token = localStorage.getItem('token');

        if (token) {
            fetch('http://localhost:8081/auth/logout', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Access-Control-Allow-Origin': 'http://localhost:3000',
                },
                credentials: 'include'
            })
                .then(() => {
                    localStorage.removeItem('token')
                    navigate("/")
                })
                .catch(error => {
                    console.error('Error logging out', error);
                });
        }else
            navigate("/")
    }
    return(
        <>
            <nav className="navbar navbar-expand-md fixed-top navbar-light" id="mainNav">
                <div className="container">
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ms-auto">
                           <button className="btn btn-primary d-block w-100" onClick={logout}>Logout</button>
                            </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default NavBar