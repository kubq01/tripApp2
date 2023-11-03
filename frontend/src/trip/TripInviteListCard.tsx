import {Box, Button, Card, CardContent, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import {useNavigate} from "react-router-dom";

function TripInviteListCard(){

    const [invites, setInvites] = useState([]);
    const navigate  = useNavigate();

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

    const acceptInvite = async (inviteId: number) => {
        try{
        const response = await fetch('http://localhost:8081/trip/accept-invite?inviteId=' + inviteId, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3000'
            },
        });

        if (response.ok) {
            console.error('Success accepting invite');
            navigate(0);
        } else {
            console.error('Error accepting invites:', response.status);

        }
    } catch (error) {
        console.error('Error fetching invites:', error);
    }
    }

    return (
        <Box>
            <Card variant="outlined" style={{backgroundColor: "#2C3333"}}>
                <CardContent >
                    {invites.map((invite, index) => (
                        <Card key={index} variant="outlined" style={{ backgroundColor: "#2C3333", marginBottom: '10px' }}>
                            <CardContent>
                                <Typography sx={{ fontSize: 25 }} color="text.secondary" gutterBottom>
                                    Trip: {invite.name}, organizedBy: {invite.organizer.firstName} {invite.organizer.lastName}
                                </Typography>
                                <Button variant="contained" color="primary" style={{ marginRight: '10px' }} onClick={() => acceptInvite(invite.id)}>
                                    Accept
                                </Button>
                                <Button variant="contained" color="secondary">
                                    Decline
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