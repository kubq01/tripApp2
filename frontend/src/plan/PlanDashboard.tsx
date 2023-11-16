import {Box, Button, Card, CardContent, Typography} from "@mui/material";
import NavBarTrip from "../core/NavBarTrip.tsx";
import {useEffect, useState} from "react";
import {Plan} from "./Plan.tsx";
import axios from "axios";

function PlanDasboard() {


    const tripId = localStorage.getItem('currentTripId');
    const token = localStorage.getItem('token');
    const [plans, setPlans] = useState<Plan[]>([]);

    useEffect(() => {
        const tripId = localStorage.getItem('currentTripId')
        // Fetch plans for the trip from the API
        axios.get(`http://localhost:8081/plan?tripId=${tripId}`, {
            headers: {
                'Authorization': `Bearer ${token}` // Include Bearer token in the Authorization header
            }
        })
            .then(response => {
                console.log(response.data)
                setPlans(response.data);
            })
            .catch(error => console.error('Error fetching plans:', error));
    }, []);

    return (
        <Box>
            <NavBarTrip/>
            <main className="App">
                <div className="d-flex flex-row justify-content-evenly w-100">
                    <Box>
                        <Card className="py-3 px-3" variant="outlined"
                              style={{backgroundColor: "#2C3333", fontSize: 30}}>
                            <CardContent>
                                <Box display="flex" flexDirection="row">
                                    <Box display="flex" flexDirection="column">
                                        {plans.length === 0 ? (
                                            <Typography variant="body1">No plans available for this trip.</Typography>
                                        ) : (
                                            plans.map(plan => (
                                                <Typography key={plan.id} variant="h6" style={{ marginBottom: '10px' }}>
                                                    {plan.description}
                                                </Typography>
                                            ))
                                        )}
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Box>
                </div>
            </main>
        </Box>
    )
}

export default PlanDasboard