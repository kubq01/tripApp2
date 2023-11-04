import {Box, Card, CardContent, Typography} from "@mui/material";
import NavBarTrip from "../core/NavBarTrip.tsx";
import {Route, Router, Routes, useNavigate} from "react-router-dom";
import TripDetailsPage from "./TripDetailsPage.tsx";
import RegisterForm from "../auth/RegisterForm";
import {Payments} from "@mui/icons-material";

function TripDashboard() {

    return (
        <Box>
            <NavBarTrip/>
            <TripDetailsPage/>
        </Box>
    )
}

export default TripDashboard