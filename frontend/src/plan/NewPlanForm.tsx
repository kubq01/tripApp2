import {Box, Button, Card, CardContent, Divider, TextField, Typography} from "@mui/material";
import NavBarTrip from "../core/NavBarTrip.tsx";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import {useState} from "react";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {Plan} from "./Plan";
import {NewPlanType} from "./NewPlanType";
import {useNavigate} from "react-router-dom";
import {introBodyStyle} from "../config/style.tsx";

function NewPlanForm() {
    const [activityDescription, setActivityDescription] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [pricePerPerson, setPricePerPerson] = useState("");
    const [address, setAddress] = useState("");
    const [notes, setNotes] = useState("");
    const navigate = useNavigate();

    const handleCreateClick = async () => {
        console.log("Creating plan with values:", {
            activityDescription,
            startDate,
            endDate,
            pricePerPerson,
            address,
            notes,
        });

        if (!activityDescription || !startDate || !endDate || !pricePerPerson || !address) {
            alert("Please fill in all fields");
            return;
        }

        // Check if end date is later than start date
        if (endDate <= startDate) {
            alert("End date must be later than start date");
            return;
        }

        // Check if start date is later than current date
        const currentDate = new Date();
        if (startDate <= currentDate) {
            alert("Start date must be later than the current date");
            return;
        }

        const planData: NewPlanType = {
            startDate,
            endDate,
            description: activityDescription,
            pricePerPerson: parseFloat(parseFloat(pricePerPerson).toFixed(2)),
            address: address,
            notes: notes,
        };

        // Retrieve tripId from local storage
        const tripId = localStorage.getItem("currentTripId");
        // Retrieve token from local storage
        const token = localStorage.getItem("token");

        try {
            const response = await fetch(`http://localhost:8081/plan/new?tripId=${tripId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(planData),
            });

            if (response.ok) {
                console.log("New plan created successfully");
                navigate("/plan")
            } else {
                console.log("Failed to create new plan");
            }
        } catch (error) {
            console.error("Error creating plan:", error);
        }


    };

    return (
        <Box style={introBodyStyle}>
            <NavBarTrip />
            <main className="App">
                <Box sx={{ backgroundColor: "rgba(44, 51, 51, 0.8)", fontSize: 30, px: 3, py: 2 }}>
                    <Card
                        className="py-3 px-3"
                        variant="outlined"
                        style={{ backgroundColor: "#2C3333", fontSize: 30 }}
                    >
                        <CardContent>
                            <Box  display="flex" flexDirection="column" gap={3}>
                            <Typography variant="body2">New plan:</Typography>
                            <TextField
                                fullWidth
                                label="Activity description:"
                                variant="outlined"
                                value={activityDescription}
                                onChange={(e) => setActivityDescription(e.target.value)}
                                InputProps={{ style: { borderRadius: '8px', backgroundColor: 'white' } }}
                            />
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DateTimePicker
                                    value={startDate}
                                    label="Start date:"
                                    onChange={(date) => setStartDate(date)}
                                    format="dd/MM/yyyy HH:mm"
                                />
                            </LocalizationProvider>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DateTimePicker
                                    value={endDate}
                                    label="End date:"
                                    onChange={(date) => setEndDate(date)}
                                    format="dd/MM/yyyy HH:mm"
                                />
                            </LocalizationProvider>
                            <TextField
                                fullWidth
                                type="number"
                                inputProps={{
                                    maxLength: 3,
                                    step: ".01",
                                    style: { borderRadius: '8px', backgroundColor: 'white' }
                                }}
                                label="Price per Person:"
                                variant="outlined"
                                value={pricePerPerson}
                                onChange={(e) => setPricePerPerson(e.target.value)}
                            />
                            <TextField
                                fullWidth
                                label="Localization:"
                                variant="outlined"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                InputProps={{ style: { borderRadius: '8px', backgroundColor: 'white' } }}
                            />

                            <Divider
                                sx={{
                                    height: "1px",
                                    borderWidth: "1px",
                                    backgroundColor: "#fff",
                                }}
                            />

                            <Typography variant="body2">Notes:</Typography>
                            <TextField
                                fullWidth
                                multiline
                                variant="outlined"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                InputProps={{ style: { borderRadius: '8px', backgroundColor: 'white' } }}
                            />

                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleCreateClick}
                                style={{backgroundColor: '#4d5e4a'}}
                            >
                                Create
                            </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
            </main>
        </Box>
    );
}


export default NewPlanForm