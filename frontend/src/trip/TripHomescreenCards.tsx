import TripListCard from "./TripListCard.tsx";
import TripInviteListCard from "./TripInviteListCard.tsx";
import {Box, Button, Card, Stack, TextField} from "@mui/material";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

function TripHomescreenCards() {

    const [tripName, setTripName] = useState('');
    const [isError, setIsError] = useState({
        name: false
    });
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(!tripName){
            setIsError({name: true});
            return;
        }

        const token = localStorage.getItem('token'); // Retrieve the token from localStorage

        try {
            const response = await fetch('http://localhost:8081/trip/new', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
                },
                body: JSON.stringify({
                    name: tripName,
                }),
            });

            if (response.ok) {
                // Handle success, e.g., show a success message to the user
                navigate("/trip-dashboard")
                let currentTripId: number = await response.json();
                console.log('Trip created successfully with id: ' + currentTripId + '!');
                localStorage.setItem("currentTripId", currentTripId.toString())
            } else {
                // Handle error, e.g., show an error message to the user
                console.error('Failed to create trip');
            }
        } catch (error) {
            console.error('Error occurred while creating trip:', error);
        }

    }
    return (
            <div className="d-flex flex-column gap-3">
                <Box sx={{ height: 'auto', maxHeight: '200px', overflowY: 'auto', borderRadius: '10px', padding: '10px', scrollbarWidth: 'thin', scrollbarColor: 'darkgray #4CAF50' }}>
                    <TripListCard />
                </Box>

                <Box sx={{ height: 'auto', maxHeight: '200px', overflowY: 'auto', borderRadius: '10px', padding: '10px', scrollbarWidth: 'thin', scrollbarColor: 'darkgray #4CAF50' }}>
                    <TripInviteListCard />
                </Box>
                <Card variant="outlined" style={{ backgroundColor: 'rgba(44, 51, 51, 0.8)', padding: '15px', borderRadius: '10px', maxWidth: '400px', margin: 'auto', marginTop: '50px' }}>
                    <Box component="form" noValidate onSubmit={handleSubmit}>
                        <Stack spacing={3}>
                            <TextField
                                error={isError.name}
                                aria-label="name-field"
                                required
                                fullWidth
                                helperText={isError.name && 'Name is empty!'}
                                name="trip name"
                                id="trip-name"
                                label="Name of the trip"
                                value={tripName}
                                onChange={(e) => setTripName(e.target.value)}
                                InputProps={{ style: { borderRadius: '8px', backgroundColor: 'white' } }}
                            />
                            <Button variant="contained" type="submit" style={{ color: 'white', borderRadius: '8px', backgroundColor: "#4d5e4a" }}>
                                Create new trip
                            </Button>
                        </Stack>
                    </Box>
                </Card>

            </div>
        );

}

export default TripHomescreenCards