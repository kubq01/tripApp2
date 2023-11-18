import {Box, Button, Card, CardContent, Divider, Stack, Typography} from "@mui/material";
import NavBarTrip from "../core/NavBarTrip.tsx";
import {useEffect, useState} from "react";
import {Plan} from "./Plan.tsx";
import axios from "axios";
import {format} from 'date-fns';

function PlanDasboard() {


    const tripId = localStorage.getItem('currentTripId');
    const token = localStorage.getItem('token');
    const [plans, setPlans] = useState<Plan[]>([]);
    let prevStartDate: null | string = null;

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

    function formatDate(date: Date) {
        if (!(date instanceof Date)) {
            // If date is not a Date object, attempt to create a Date object
            date = new Date(date);
        }
        return (date.getDay() + "." + date.getMonth() + "." + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes())
    }

    return (
        <Box>
            <NavBarTrip/>
            <main className="App">
                <Box sx={{backgroundColor: "#2C3333", fontSize: 30, height: "100%", overflowY: "scroll", px: 3, py: 2}}>
                    <Box display="flex" flexDirection="row">
                        <Box display="flex" flexDirection="column" gap={3}>
                            <Button variant="contained" color="secondary">New Plan</Button>
                                {plans.length === 0 ? (
                                    <Typography variant="body1">No plans available for this
                                        trip.</Typography>
                                ) : (
                                    plans.map(plan => {
                                        const currentStartDate = formatDate(plan.startDate);

                                        const showDivider = prevStartDate !== null && prevStartDate !== currentStartDate;
                                        prevStartDate = currentStartDate;
                                        return (
                                            <>
                                                {showDivider &&
                                                    <Divider sx={{height: '3px', backgroundColor: '#000'}}/>}
                                                <Card className="py-3 px-3" variant="outlined"
                                                      style={{backgroundColor: "#2C3333", fontSize: 30}}>
                                                    <CardContent>

                                                        <Typography variant="h6"
                                                                    style={{marginBottom: '10px'}}>
                                                            Activity description: {plan.description}
                                                        </Typography>
                                                        <Typography variant="body2">
                                                            Start Date: {formatDate(plan.startDate)}
                                                        </Typography>
                                                        {plan.endDate ? (
                                                            <Typography variant="body2">
                                                                End Date: {formatDate(plan.endDate)}
                                                            </Typography>
                                                        ) : (
                                                            <Typography variant="body2">
                                                                End Date: Not specified
                                                            </Typography>
                                                        )}

                                                        <Typography variant="body2">
                                                            Price per Person: {plan.pricePerPerson}
                                                        </Typography>
                                                        <Typography variant="body2">
                                                            Address: {plan.address}
                                                        </Typography>
                                                        <Divider sx={{
                                                            height: '1px',
                                                            borderWidth: '1px',
                                                            backgroundColor: '#fff'
                                                        }}/>
                                                        <Typography variant="body2">
                                                            Notes: <br/> {plan.notes}
                                                        </Typography>
                                                        <Box display="flex" flexDirection="row"
                                                             justifyContent="space-between">
                                                            <Button variant="contained"
                                                                    color="secondary">Update</Button>
                                                            <Button variant="contained"
                                                                    color="secondary">Delete</Button>
                                                        </Box>

                                                    </CardContent>
                                                </Card>
                                            </>
                                        )
                                    })
                                )}
                        </Box>
                    </Box>
                </Box>
            </main>
        </Box>
    )
}

export default PlanDasboard