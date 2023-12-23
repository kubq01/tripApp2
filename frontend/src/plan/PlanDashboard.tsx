import {Box, Button, Card, CardContent, Divider, Stack, Typography} from "@mui/material";
import NavBarTrip from "../core/NavBarTrip.tsx";
import {useEffect, useState} from "react";
import {Plan} from "./Plan.tsx";
import axios from "axios";
import {format} from 'date-fns';
import {useNavigate} from "react-router-dom";
import {introBodyStyle} from "../config/style.tsx";

function PlanDasboard() {


    const token = localStorage.getItem('token');
    const [plans, setPlans] = useState<Plan[]>([]);
    const [costSummaryText, setCostSummaryText] = useState("");
    const [fullPriceText, setFullPriceText] = useState("")
    let prevStartDate: null | string = null;
    const navigate = useNavigate();
    const isOrganizator = localStorage.getItem('organizator') == 'Me';
    const [notes, setNotes] = useState<String>('No plan selected.\n Click on a plan to desplay its notes')

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

    useEffect(() => {
        let updatedCostSummaryText = "";
        let updatedFullPriceText = "Full price without hotel cost and unexpected spendings: ";
        setFullPriceText("")
        setCostSummaryText("")
        let prevStartDate = null;
        let sum = 0;
        let dayIterator = 1;
        let daySum = 0;

        plans.forEach((plan) => {
            const currentStartDate = formatDate(plan.startDate);
            console.log("dddd")
            console.log(plan)

            if (prevStartDate !== null && prevStartDate !== currentStartDate) {
                updatedCostSummaryText += `\n` + "Day " + dayIterator + ": " + daySum;
                dayIterator += 1;
                sum += daySum;
                daySum = 0;
            }

            prevStartDate = currentStartDate;
            daySum = daySum + plan.pricePerPerson
        });

        updatedCostSummaryText += `\r\n` + "Day " + dayIterator + ": " + daySum;
        sum += daySum;
        updatedFullPriceText += sum.toFixed(2);

        setCostSummaryText((prevCostSummaryText) => prevCostSummaryText + updatedCostSummaryText);
        setCostSummaryText((prevCostSummaryText) => prevCostSummaryText + '\n' + updatedFullPriceText);
        console.log(costSummaryText)
        //setFullPriceText((prevFullPriceText) => prevFullPriceText + updatedFullPriceText);
    }, [plans]);

    const removePlan = async (plan: Plan) => {
        try {
            const tripId = localStorage.getItem('currentTripId');
            const response = await fetch('http://localhost:8081/plan/delete?tripId=' + tripId, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:3000'
                },
                body: JSON.stringify(plan),
            });

            if (response.ok) {
                console.error('Success deleting plan');
                navigate(0);
            } else {
                console.error('Error deleting plan invites:', response.status);

            }
        } catch (error) {
            console.error('Error deleting plan:', error);
        }
    }

    function setNotesForDisplay(notes: String) {
        setNotes(notes)
    }

    function addZero(number: number){
        if(number<10)
            return "0" + number

        return number
    }

    function formatDate(date: Date) {
        if (!(date instanceof Date)) {
            // If date is not a Date object, attempt to create a Date object
            date = new Date(date);
        }
        const correctMonth = date.getMonth() + 1
        return (addZero(date.getDate()) + "." + addZero(correctMonth) + "." + date.getFullYear() + " " + addZero(date.getHours()) + ":" + addZero(date.getMinutes()))
    }

    function newPlan() {
        navigate("/new-plan")
    }

    function updatePlan(planToUpdate: Plan) {
        navigate("/update-plan", {state: {plan: planToUpdate}})
    }

    return (
        <Box style={introBodyStyle}>
            <NavBarTrip />
            <main className="App">
                <Box
                    display="flex"
                    flexDirection="row"
                    gap={4}
                    sx={{
                        backgroundColor: "rgba(44, 51, 51, 0.8)",
                        fontSize: 20,
                        height: "100%",
                        px: 3,
                        py: 2,
                    }}
                >
                    <Box
                        sx={{
                            backgroundColor: "#2C3333",
                            fontSize: 20,
                            height: "100%",
                            overflowY: "scroll",
                            px: 3,
                            py: 2,
                            flex: 1,
                        }}
                    >
                        <Box display="flex" flexDirection="column" gap={3}>
                            <Button variant="contained" color="secondary" onClick={() => newPlan()}>
                                New Plan
                            </Button>
                            {plans.length === 0 ? (
                                <Typography variant="body1">No plans available for this trip.</Typography>
                            ) : (
                                plans.map((plan, index) => {
                                    const currentStartDate = formatDate(plan.startDate);
                                    const showDivider = index > 0 && prevStartDate !== currentStartDate;
                                    prevStartDate = currentStartDate;
                                    return (
                                        <>
                                            {showDivider && <Divider sx={{ height: '3px', backgroundColor: '#fff' }} />}
                                            <Card
                                                className="py-3 px-3 plan-card"
                                                variant="outlined"
                                                style={{ backgroundColor: "#2C3333", fontSize: 20, cursor: 'pointer' }}
                                                onClick={() => setNotesForDisplay(plan.notes)}
                                            >
                                                <CardContent>
                                                    <Typography variant="h6" style={{ marginBottom: '10px', fontWeight: 'bold' }}>
                                                        {plan.description}
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        <strong>Start Date:</strong> {formatDate(plan.startDate)}
                                                    </Typography>
                                                    {plan.endDate ? (
                                                        <Typography variant="body2">
                                                            <strong>End Date:</strong> {formatDate(plan.endDate)}
                                                        </Typography>
                                                    ) : (
                                                        <Typography variant="body2">
                                                            <strong>End Date:</strong> Not specified
                                                        </Typography>
                                                    )}
                                                    <Typography variant="body2">
                                                        <strong>Price per Person:</strong> {plan.pricePerPerson}
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        <strong>Where:</strong> {plan.address}
                                                    </Typography>
                                                    <Divider sx={{ height: '1px', borderWidth: '1px', backgroundColor: '#fff' }} />
                                                    <Typography variant="body2">
                                                        Notes can be seen after clicking on this plan
                                                    </Typography>
                                                    <Box
                                                        display="flex"
                                                        flexDirection="row"
                                                        justifyContent="space-between"
                                                        marginTop={2}
                                                    >
                                                        <Button
                                                            variant="contained"
                                                            color="secondary"
                                                            onClick={() => updatePlan(plan)}
                                                        >
                                                            Update
                                                        </Button>
                                                        {isOrganizator && (
                                                            <Button
                                                                variant="contained"
                                                                color="secondary"
                                                                onClick={() => removePlan(plan)}
                                                            >
                                                                Delete
                                                            </Button>
                                                        )}
                                                    </Box>
                                                </CardContent>
                                            </Card>
                                        </>
                                    );
                                })
                            )}
                        </Box>
                    </Box>
                    <Box
                        display="flex"
                        flexDirection="column"
                        gap={3}
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Card sx={{ maxWidth: '400px', margin: 'auto', backgroundColor: "#2C3333" }}>
                            <CardContent>
                                <Typography variant="h5" style={{ whiteSpace: 'pre-line', fontWeight: 'bold' }}>
                                    Notes
                                </Typography>
                                <Typography style={{ whiteSpace: 'pre-line' }}>{notes}</Typography>
                            </CardContent>
                        </Card>
                        <Card sx={{ maxWidth: '400px', margin: 'auto', backgroundColor: "#2C3333" }}>
                            <CardContent>
                                <Typography
                                    variant="h5"
                                    style={{ whiteSpace: 'pre-line', fontWeight: 'bold' }}
                                >
                                    Cost Summary
                                </Typography>
                                <Typography style={{ whiteSpace: 'pre-line' }}>{costSummaryText}</Typography>
                            </CardContent>
                        </Card>
                    </Box>
                </Box>
            </main>
        </Box>
    );


}

export default PlanDasboard