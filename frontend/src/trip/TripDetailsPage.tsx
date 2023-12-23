import {Box, Button, Card, CardContent, IconButton, Stack, TextField, Typography} from "@mui/material";
import axios from "axios";
import HOST from "../config/apiConst";
import {useEffect, useState} from "react";
import {Trip} from "./Trip";
import {useNavigate} from "react-router-dom";
import {ClearIcon} from "@mui/x-date-pickers";

function TripDetailsPage() {

    const [trip, setTrip] = useState<Trip | null>(null);
    const [isOwner, setIsOwner] = useState(false);
    const [emailInvite, setEmailInvite] = useState<String>();
    const [isError, setIsError] = useState({
        email: false
    });
    const navigate = useNavigate();
    const [inviteInfo, setInviteInfo] = useState<String>('Use form above to write email of a friend that you want to invite');

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
                    //setIsOwner(trip.organizer.email == localStorage.getItem('currentUserEmail'))
                    //console.log("sss")
                    //console.log(trip)
                    //console.log(trip.organizer.email + " " + localStorage.getItem('currentUserEmail'))
                })
                .catch((error) => {
                    console.error('Error fetching trip details:', error);
                });
        }
    }, []);

    useEffect(() => {
        if (trip) {
            console.log("trippp")
            console.log(trip);
            setIsOwner(trip.organizer.email == localStorage.getItem('currentUserEmail'))
        }
    }, [trip]);

    const getOrganizerForTrip = () => {
        return (isOwner ? "Me" : `${trip.organizer.firstName} ${trip.organizer.lastName}`)
    }

    if (!trip) {
        return <div>Loading...</div>;
    }

    const deleteParticipantRequest = async (email: String) => {
        try {
            const response = await fetch('http://localhost:8081/trip/delete-participant?userEmail=' + email + '&tripId=' + localStorage.getItem('currentTripId'), {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:3000'
                },
            });

            if (response.ok) {
                console.error('Success deleting participant');
                navigate(0);
            } else {
                console.error('Error deleting participant:', response.status);

            }
        } catch (error) {
            console.error('Error fetching participant:', error);
        }
    }

    const deleteParticipantButton = (email: String) => {
        if (!isOwner || localStorage.getItem('currentUserEmail') === email) {
            return <></>;
        } else {
            return (
                <IconButton
                    onClick={() => deleteParticipantRequest(email)}
                    sx={{ backgroundColor: '#572222', color: 'white', borderRadius: '8px' }}
                >
                    <ClearIcon />
                </IconButton>
            );
        }
    }

    const handleInvite = async (event) => {
        event.preventDefault();

        if (!emailInvite) {
            setIsError({email: true});
            return;
        }

        const token = localStorage.getItem('token'); // Retrieve the token from localStorage

        try {
            const response = await fetch('http://localhost:8081/trip/invite?userEmail=' + emailInvite + '&tripId=' + localStorage.getItem('currentTripId'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
                }
            });

            if (response.ok) {
                // Handle success, e.g., show a success message to the user
                let info: String = await response.text()
                setInviteInfo(info)
                console.log(info + "fffff")
                //navigate(0);
            } else {
                // Handle error, e.g., show an error message to the user
                console.error('Failed to invite user');
            }
        } catch (error) {
            console.error('Error occurred inviting user:', error);
        }

    }

    const inviteForm = () => {
        if (!isOwner) {
            return <></>;
        } else {
            return (
                <Card variant="outlined" style={{backgroundColor: "#2C3333", padding: "15px"}}>
                    <Box component="form" noValidate onSubmit={handleInvite}>
                        <Stack spacing={3}>
                            <TextField
                                error={isError.email}
                                aria-label="email-field"
                                required
                                fullWidth
                                helperText={isError.email ? 'Email is empty!' : ''}
                                name="email"
                                id="email"
                                label="email"
                                value={emailInvite}
                                onChange={(e) => setEmailInvite(e.target.value)}
                            />
                            <Typography sx={{fontSize: 15, color: "white"}} gutterBottom>
                                {inviteInfo}
                            </Typography>
                            <Button variant="contained" type="submit" style={{backgroundColor: '#4d5e4a'}}>
                                Invite Friend
                            </Button>
                        </Stack>
                    </Box>
                </Card>
            );
        }
    }

    const getParticipants = () => {
        if (trip.participants.length < 1) {
            return (
                <Typography>
                    No participants yet
                </Typography>
            );
        } else {
            return (
                <Card variant="outlined" style={{ backgroundColor: "#2C3333", borderRadius: '8px' }}>
                    <CardContent>
                        {trip.participants.map((participant, index) => (
                            <Card key={index} variant="outlined" style={{ backgroundColor: "#2C3333", marginBottom: '5px', borderRadius: '8px' }}>
                                <CardContent>
                                    <Box className="d-flex flex-row">
                                        <Typography sx={{ fontSize: 25, color: 'white' }} gutterBottom marginRight={4}>
                                            {participant.firstName} {participant.lastName}
                                        </Typography>
                                        {deleteParticipantButton(participant.email)}
                                    </Box>
                                </CardContent>
                            </Card>
                        ))}
                    </CardContent>
                </Card>
            );
        }

    }

    return (
        <Box>
            <Card className="py-3 px-3" variant="outlined" style={{ backgroundColor: "rgba(44, 51, 51, 0.8)", fontSize: 30, borderRadius: '10px' }}>
                <CardContent>
                    <Box display="flex" flexDirection="row">
                        <Card variant="outlined" style={{ backgroundColor: "rgba(44, 51, 51, 0.8)", borderRadius: '8px', padding: '15px' }}>
                            <CardContent>
                                <Typography sx={{ fontSize: 35, color: 'white', marginBottom: '10px' }} gutterBottom>
                                    Trip Details
                                </Typography>
                                <Typography sx={{ fontSize: 30, color: 'white', marginBottom: '8px' }} gutterBottom>
                                    Trip Name: {trip.name}
                                </Typography>
                                <Typography sx={{ fontSize: 30, color: 'white', marginBottom: '8px' }} gutterBottom>
                                    Organizer: {getOrganizerForTrip()}
                                </Typography>
                            </CardContent>
                        </Card>
                        <Box display="flex" flexDirection="column" marginLeft={2}>
                            <Typography sx={{ fontSize: 25, color: 'white', marginBottom: '8px' }}>Participants:</Typography>
                            {getParticipants()}
                            <br/>
                            {inviteForm()}
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Box>

    )
}

export default TripDetailsPage