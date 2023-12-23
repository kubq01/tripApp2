import {useState, useEffect} from 'react';
import NavBarTrip from "../core/NavBarTrip.tsx";
import {Box, Button, Card, CardContent, TextField, Typography} from "@mui/material";
import {introBodyStyle} from "../config/style.tsx";

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
        <Box style={introBodyStyle}>
            <NavBarTrip />
            <main className="App">
                <Box
                    display="flex"
                    flexDirection="column"
                    gap={4}
                    sx={{ backgroundColor: "rgba(44, 51, 51, 0.8)", fontSize: 30, height: "100%", px: 3, py: 2 }}
                >
                    <Box
                        sx={{
                            backgroundColor: "rgba(44, 51, 51, 0.85)",
                            fontSize: 30,
                            height: "85%",
                            overflowY: "scroll",
                            px: 3,
                            py: 2,
                        }}
                    >
                        {messages.map((msg, index) => (
                            <Card key={index} sx={{ marginBottom: "10px", borderRadius: '8px' }}>
                                <CardContent sx={{ padding: "15px" }}>
                                    <Typography variant="body1" style={{ textAlign: 'left', fontWeight: 'bold' }}>
                                        {`${msg.sender}:`}
                                    </Typography>
                                    <Typography variant="body1" style={{ textAlign: 'left' }}>
                                        {msg.content}
                                    </Typography>
                                </CardContent>
                            </Card>
                        ))}
                    </Box>

                    <Box
                        display="flex"
                        flexDirection="row"
                        gap={2}
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <Button variant="contained" color="secondary" onClick={() => sendMessage(message)}>
                            Send
                        </Button>
                    </Box>
                </Box>
            </main>
        </Box>
    );

};

export default ChatPage;
