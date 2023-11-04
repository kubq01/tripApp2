import {useNavigate} from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import {Button, Toolbar, Typography} from "@mui/material";

function NavBarTrip() {
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
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Trip app
                </Typography>
                <Button color="inherit" onClick={()=>{navigate("/")}}>Dashboard</Button>
                <Button color="inherit">Chat</Button>
                <Button color="inherit">Trip Plan</Button>
                <Button color="inherit">Notes</Button>
                <Button color="inherit">Files</Button>
                <Button color="inherit" onClick={()=>{navigate("/payments")}}>Spendings</Button>
                <Button variant="contained" color="secondary" onClick={logout}>Logout</Button>
            </Toolbar>
        </AppBar>
    )
}

export default NavBarTrip