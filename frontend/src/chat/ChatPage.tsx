import { useState, useEffect } from 'react';
import NavBarTrip from "../core/NavBarTrip.tsx";

const ChatPage = () => {
    const tripId = localStorage.getItem('currentTripId');

    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');

    const sendMessage = (content) => {
        if (content.trim() !== '') {
            const chatMessage = { content: content };

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
        <div>
            <NavBarTrip/>
            <div>
                {messages
                    //.sort((a, b) => +new Date(a.timestamp) - +new Date(b.timestamp))
                    .map((msg, index) => (
                        <div key={index}>{`${msg.sender}: ${msg.content} (${new Date(msg.timestamp).toLocaleTimeString()})`}</div>
                    ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={() => sendMessage(message)}>Send</button>
        </div>
    );
};

export default ChatPage;
