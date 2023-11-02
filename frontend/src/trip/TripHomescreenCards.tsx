import TripListCard from "./TripListCard.tsx";
import TripInviteListCard from "./TripInviteListCard.tsx";
import {Box, Button, Card} from "@mui/material";

function TripHomescreenCards() {
    return (
        <div className="d-flex flex-column gap-3">
            <Box sx={{height: "auto", maxHeight: "200px", overflowY: "auto"}}>
            <TripListCard/>
            </Box>
            <Box sx={{height: "auto", maxHeight: "200px", overflowY: "auto"}}>
            <TripInviteListCard/>
            </Box>
            <Card variant="outlined" style={{backgroundColor: "#2C3333", padding: "15px"}}>
                <Button variant="contained">Create new trip</Button>
            </Card>
        </div>
    );
}

export default TripHomescreenCards