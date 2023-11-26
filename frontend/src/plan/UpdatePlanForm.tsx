import {Box, Button, Card, CardContent, Divider, TextField, Typography} from "@mui/material";
import NavBarTrip from "../core/NavBarTrip.tsx";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import {useEffect, useState} from "react";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {Plan} from "./Plan";
import {NewPlanType} from "./NewPlanType";
import {useNavigate} from "react-router-dom";
import {format, parseISO} from "date-fns";

function UpdatePlanForm(planToUpdate: Plan) {
    const [activityDescription, setActivityDescription] = useState(planToUpdate.description);
    //TODO:
    const [startDate, setStartDate] = useState(new Date());//(format(parseISO(planToUpdate.startDate.toString()), 'dd/MM/yyyy HH:mm'));
    const [endDate, setEndDate] = useState(new Date());
    const [pricePerPerson, setPricePerPerson] = useState(planToUpdate.pricePerPerson);
    const [address, setAddress] = useState(planToUpdate.address);
    const [notes, setNotes] = useState(planToUpdate.notes);
    const navigate = useNavigate();

    useEffect(() => {
        console.log(planToUpdate)
    },[])

    const handleCreateClick = async () => {
        console.log("Updating plan with values:", {
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

        //TODO:
        planToUpdate.startDate = new Date(startDate.toUTCString());
        planToUpdate.endDate = new Date(endDate.toUTCString());
        planToUpdate.description = activityDescription;
        planToUpdate.pricePerPerson = parseFloat(pricePerPerson.toFixed(2));
        planToUpdate.address = address;
        planToUpdate.notes = notes;

        // Retrieve token from local storage
        const token = localStorage.getItem("token");

        try {
            const response = await fetch(`http://localhost:8081/plan/update`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(planToUpdate),
            });

            if (response.ok) {
                console.log("Plan updated created successfully");
                navigate("/plan")
            } else {
                console.log("Failed to update plan");
            }
        } catch (error) {
            console.error("Error updating plan:", error);
        }


    };

    return (
        <Box>
            <NavBarTrip />
            <main className="App">
                <Box sx={{ backgroundColor: "#2C3333", fontSize: 30, px: 3, py: 2 }}>
                    <Card
                        className="py-3 px-3"
                        variant="outlined"
                        style={{ backgroundColor: "#2C3333", fontSize: 30 }}
                    >
                        <CardContent>
                            <Box  display="flex" flexDirection="column" gap={3}>
                                <Typography variant="body2">Update plan:</Typography>
                                <TextField
                                    fullWidth
                                    label="Activity description:"
                                    variant="outlined"
                                    value={activityDescription}
                                    onChange={(e) => setActivityDescription(e.target.value)}
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
                                        step: ".01"
                                    }}
                                    label="Price per Person:"
                                    variant="outlined"
                                    value={pricePerPerson}
                                    onChange={(e) => setPricePerPerson(parseFloat(e.target.value))}
                                />
                                <TextField
                                    fullWidth
                                    label="Localization:"
                                    variant="outlined"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
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
                                />

                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleCreateClick}
                                >
                                    Update
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
            </main>
        </Box>
    );
}


export default UpdatePlanForm