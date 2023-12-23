import {Box, Card, CardContent, Typography} from "@mui/material";
import NavBarTrip from "../core/NavBarTrip.tsx";
import {Route, Router, Routes, useNavigate} from "react-router-dom";
import TripDetailsPage from "./TripDetailsPage.tsx";
import RegisterForm from "../auth/RegisterForm";
import {Payments} from "@mui/icons-material";
import {useEffect} from "react";
import {introBodyStyle} from "../config/style.tsx";

function TripDashboard() {

    return (
        <Box style={introBodyStyle}>
            <NavBarTrip/>
            <main className="App">
            <div className="d-flex flex-row justify-content-evenly w-100">
            <TripDetailsPage/>
            </div>
            </main>
        </Box>
    )
}

export default TripDashboard