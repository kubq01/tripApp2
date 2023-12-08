import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const Chat = () => {
    const tripId = localStorage.getItem('currentTripId');

    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [socket, setSocket] = useState(null);

    const sendMessage = (content) => {
        if (message.trim() !== '') {
            const chatMessage = { content, sender: 'current_user', type: 'TEXT' };
            socket.emit(`/app/send/${tripId}`, chatMessage);
            setMessage('');
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            // Create socket and establish a connection
            const newSocket = io('http://localhost:8081', {
                extraHeaders: { Authorization: `Bearer ${token}` },
            });

            setSocket(newSocket);

            // Receive messages from the server
            newSocket.on(`/topic/group/${tripId}`, (message) => {
                setMessages((prevMessages) => [...prevMessages, message]);
            });

            // Fetch chat history upon entering the group
            fetchChatHistory(tripId);

            return () => {
                // Close the connection when the component is unmounted
                newSocket.disconnect();
            };
        }
    }, [tripId]);

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
            <div>
                {messages
                    .sort((a, b) => +new Date(a.timestamp) - +new Date(b.timestamp))
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

export default Chat;
