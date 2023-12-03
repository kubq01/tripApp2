import { useState } from "react";
import { Box, Button, Card, CardContent } from "@mui/material";
import NavBarTrip from "../core/NavBarTrip.tsx";

export function FilePage() {
    const [file, setFile] = useState();

    const onFileChange = (event) => {
        // Update the state
        setFile(event.target.files[0]);
    };

    const onFileUpload = () => {
        // Create an object of formData
        const formData = new FormData();

        // Update the formData object
        formData.append("file", file);

        const token = localStorage.getItem('token');
        const tripId = localStorage.getItem('currentTripId');

        // Fetch user data using Bearer token
        if (token) {
            fetch('http://localhost:8081/file/upload?category=cat1&tripId=' + tripId, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Access-Control-Allow-Origin': 'http://localhost:3000',
                },
                credentials: 'include',
                body: formData, // Use formData here instead of file
            }).catch(error => {
                console.error('Error uploading file:', error);
            });
        }
    };

    const fileData = () => {
        if (file) {
            return (
                <div>
                    <h2>File Details:</h2>
                    <p>File Name: {file.name}</p>
                    <p>File Type: {file.type}</p>
                </div>
            );
        } else {
            return (
                <div>
                    <br />
                    <h4>upload new file here</h4>
                </div>
            );
        }
    };

    return (
        <Box>
            <NavBarTrip />
            <main className="App">
                <Box
                    display="flex"
                    flexDirection="column"
                    gap={4}
                    sx={{ backgroundColor: "#2C3333", fontSize: 30, height: "100%", px: 3, py: 2 }}
                >
                    <Card sx={{ maxWidth: '400px', margin: 'auto' }}>
                        <CardContent>
                            <div>
                                <input
                                    type="file"
                                    onChange={onFileChange} // Removed "this."
                                />
                                <button onClick={onFileUpload}> {/* Removed "this." */}
                                    Upload!
                                </button>
                            </div>
                            {fileData()} {/* Removed "this." */}
                        </CardContent>
                    </Card>
                </Box>
            </main>
        </Box>
    );
}