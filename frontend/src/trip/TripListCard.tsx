import {Box, Card, CardContent, Typography} from "@mui/material";
import {useEffect, useState} from "react";

function TripListCard(){

    const [trips, setTrips] = useState([]);

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

    useEffect(() => {
        fetchTrips()
    },[])



    return (
        <Box>
            <Card variant="outlined" style={{backgroundColor: "#2C3333"}}>
                <CardContent >
                    {trips.map((trip, index) => (
                        <Card key={index} variant="outlined" style={{ backgroundColor: "#2C3333", marginBottom: '10px' }}>
                            <CardContent>
                                <Typography sx={{ fontSize: 25 }} color="text.secondary" gutterBottom>
                                    Trip: {trip.name}, organizedBy: {trip.organizer.email}
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