import {Box, Card, CardContent, Typography} from "@mui/material";
import {useEffect, useState} from "react";
//import {User} from "../user/User";
import {Trip} from "./Trip";
import {User} from "../user/User";

function TripListCard(){

    const [trips, setTrips] = useState<Trip[]>([]);
    const [user, setUser] = useState<User>()

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
                    const user: User = {firstName: data.firstName,lastName: data.lastName,email: data.email};
                    setUser(user)
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                });
        }
    }

    useEffect(() => {
        fetchTrips()
        getCurrentUser()
    },[])

    const getOrganizerForTrip = (trip: Trip) => {
        return (trip.organizer.email === user.email ? "Me" : `${trip.organizer.firstName} ${trip.organizer.lastName}`)
    }



    return (
        <Box>
            <Card variant="outlined" style={{backgroundColor: "#2C3333"}}>
                <CardContent >
                    {trips.map((trip, index) => (
                        <Card key={index} variant="outlined" style={{ backgroundColor: "#2C3333", marginBottom: '10px' }}>
                            <CardContent>
                                <Typography sx={{ fontSize: 25 }} color="text.secondary" gutterBottom>
                                    Trip: {trip.name}, organizedBy: {getOrganizerForTrip((trip))}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </CardContent>
            </Card>
        </Box>
    )
}

export default TripListCard