import {useState, useEffect} from 'react';
import NavBarTrip from "../core/NavBarTrip.tsx";
import {Box, Button, Card, CardContent, Typography} from "@mui/material";

const ChatPage = () => {
    const tripId = localStorage.getItem('currentTripId');

    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const isOrganizator = localStorage.getItem('organizator') == 'Me';

    const sendMessage = (content) => {
        if (content.trim() !== '') {
            const chatMessage = {content: content};

            // Make a POST request
            fetch(`http://localhost:8081/chat/${tripId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(chatMessage)
            })
                .then(response => {
                    setMessage('')
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data);

                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    };

    useEffect(() => {
        fetchChatHistory(tripId);
    });

    const fetchChatHistory = async (groupId) => {
        try {
            const response = await fetch(`http://localhost:8081/chat/history/${groupId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (response.ok) {
                const history = await response.json();
                setMessages(history);
            } else {
                console.error('Failed to fetch chat history');
            }
        } catch (error) {
            console.error('Error fetching chat history:', error);
        }
    };

    return (
        <Box>
            <NavBarTrip/>
            <main className="App">
                <Box display="flex" flexDirection="column" gap={4}
                     sx={{backgroundColor: "#2C3333", fontSize: 30, height: "100%", px: 3, py: 2}}>

                    <Box sx={{
                        backgroundColor: "#2C3333",
                        fontSize: 30,
                        height: "80%",
                        overflowY: "scroll",
                        px: 3,
                        py: 2
                    }}
                    >
                        {messages
                            //.sort((a, b) => +new Date(a.timestamp) - +new Date(b.timestamp))
                            .map((msg, index) => (
                                <Card sx={{
                                    marginBottom: "10px", // Adjust the value for the desired gap
                                }}>
                                    <CardContent sx={{
                                        padding: "10px",
                                        paddingBottom: "10px !important"
                                    }} >
                                        <Typography style={{ textAlign: 'left'}}>
                                            {`${msg.sender}: ${msg.content}`}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            ))}
                    </Box>

                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <Button variant="contained" color="secondary" onClick={() => sendMessage(message)}>Send</Button>
                </Box>
            </main>
        </Box>
    );
};

export default ChatPage;
