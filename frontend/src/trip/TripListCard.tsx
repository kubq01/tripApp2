import {Box, Button, Card, CardContent, Typography} from "@mui/material";
import {useEffect, useState} from "react";
//import {User} from "../user/User";
import {Trip} from "./Trip";
import {User} from "../user/User";
import {useNavigate} from "react-router-dom";

function TripListCard() {

    const [trips, setTrips] = useState<Trip[]>([]);
    const [user, setUser] = useState<User>({firstName: "", lastName: "", email: ""});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchTrips = async () => {
        try {
            console.log(localStorage.getItem('token') + ' trips')
            const response = await fetch('http://localhost:8081/trip/my_trips', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:3000'
                },
            });

            if (response.ok) {
                const data = await response.json();
                setTrips(data);
            } else {
                console.error('Error fetching trips:', response.status);
            }
        } catch (error) {
            console.error('Error fetching trips:', error);
        }
    };

    const getCurrentUser = () => {
        const token = localStorage.getItem('token');

        // Fetch user data using Bearer token
        if (token) {
            console.log(localStorage.getItem('token') + ' user')
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
                    const user: User = {firstName: data.firstName, lastName: data.lastName, email: data.email};
                    setUser(user)
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                });
        }
    }

    useEffect(() => {
        console.log("fetchUser")
        console.log(user)
        getCurrentUser();

    }, [])

    useEffect(() => {
        console.log("fetchTrips")
        console.log(user)
        fetchTrips();

    }, [user])

    useEffect(() => {
        setLoading(false);
    }, [trips])

    const getOrganizerForTrip = (trip: Trip) => {
        console.log(trip)
        console.log(user)
        if(user == null)
            getCurrentUser()

        console.log(user)

        return (trip.organizer.email === user.email ? "Me" : `${trip.organizer.firstName} ${trip.organizer.lastName}`)
    }

    const goToTripDetails = (tripId: Number) => {
        localStorage.setItem("currentTripId", tripId.toString())
        navigate("/trip-dashboard")
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Box>
            <Card variant="outlined" style={{backgroundColor: "#2C3333"}}>
                <CardContent>
                    {trips.map((trip, index) => (
                        <Card key={index} variant="outlined" style={{backgroundColor: "#2C3333", marginBottom: '10px'}}>
                            <CardContent>
                                <Box className="d-flex flex-row">
                                <Typography sx={{fontSize: 25}} color="text.secondary" gutterBottom>
                                    Trip: {trip.name}, organizedBy: {getOrganizerForTrip((trip))}
                                </Typography>
                                    <Button variant="contained" onClick={() => goToTripDetails(trip.id)}>Go to trip</Button>
                                </Box>
                            </CardContent>
                        </Card>
                    ))}
                </CardContent>
            </Card>
        </Box>
    )
}

export default TripListCard