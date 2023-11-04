import {Box} from "@mui/material";
import axios from "axios";
import HOST from "../config/apiConst";
import {useEffect, useState} from "react";
import {Trip} from "./Trip";

function TripDetailsPage() {

    const [trip, setTrip] = useState<Trip | null>(null);

    useEffect(() => {
        const tripId = localStorage.getItem('currentTripId'); // Get trip ID from localStorage
        const token = localStorage.getItem('token');

        console.log(tripId + 'trip')
        console.log(token + 'trip token')

        if (tripId && token) {
            // Fetch trip details based on the trip ID from localStorage using Axios
            axios.get(`http://localhost:8081/trip/trip-details/${tripId}`, {
                headers: {
                    'Authorization': `Bearer ${token}` // Include Bearer token in the Authorization header
                }
            })
                .then((response) => {
                    console.log(response.data)
                    setTrip(response.data); // Update the state with trip details
                })
                .catch((error) => {
                    console.error('Error fetching trip details:', error);
                });
        }
    }, []);

    if (!trip) {
        return <div>Loading...</div>;
    }

    return (
        <Box>
            details
            <div>
                <h1>Trip Details</h1>
                <p>Name: {trip.name}</p>
                <p>Organizer: {trip.organizer.firstName} {trip.organizer.lastName}</p>
                <p>Participants: {trip.participants.map(participant => participant.firstName).join(', ')}</p>
            </div>
        </Box>
    )
}

export default TripDetailsPage