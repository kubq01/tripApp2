import {Box, Button, Card, CardContent, Typography} from "@mui/material";
import {useEffect, useState} from "react";

function TripInviteListCard(){

    const [invites, setInvites] = useState([]);

    const fetchInvites = async () => {
        try {
            console.log(localStorage.getItem('token') + ' invites')
            const response = await fetch('http://localhost:8081/trip/my_invites', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:3000'
                },
            });

            if (response.ok) {
                const data = await response.json();
                setInvites(data);
            } else {
                console.error('Error fetching invites:', response.status);
            }
        } catch (error) {
            console.error('Error fetching invites:', error);
        }
    };

    useEffect(() => {
        fetchInvites()
    },[])



    return (
        <Box>
            <Card variant="outlined" style={{backgroundColor: "#2C3333"}}>
                <CardContent >
                    {invites.map((invite, index) => (
                        <Card key={index} variant="outlined" style={{ backgroundColor: "#2C3333", marginBottom: '10px' }}>
                            <CardContent>
                                <Typography sx={{ fontSize: 25 }} color="text.secondary" gutterBottom>
                                    Trip: {invite.trip.name}, organizedBy: {invite.trip.organizer.email}
                                </Typography>
                                <Button variant="contained" color="primary" style={{ marginRight: '10px' }}>
                                    Button 1
                                </Button>
                                <Button variant="contained" color="secondary">
                                    Button 2
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </CardContent>
            </Card>
        </Box>
    )
}

export default TripInviteListCard