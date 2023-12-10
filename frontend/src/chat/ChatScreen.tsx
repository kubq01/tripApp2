import { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import NavBarTrip from "../core/NavBarTrip.tsx";

const ChatScreen = () => {
    const tripId = localStorage.getItem('currentTripId');

    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [stompClient, setStompClient] = useState(null);

    const sendMessage = (content) => {
        if (message.trim() !== '') {
            const chatMessage = { content: content };
            stompClient.publish({ destination: `/app/send/${tripId}`, body: JSON.stringify(chatMessage) });
            setMessage('');
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            // Create SockJS connection and establish Stomp over SockJS
            const socket = new SockJS('http://localhost:8081/chat-websocket');
            const newStompClient = new Client({
                webSocketFactory: () => new SockJS('http://localhost:8081/chat-websocket'),
                connectHeaders: { Authorization: `Bearer ${token}` },
            });

            console.log('Stomp client created:', newStompClient);
            // Set headers for authentication
            newStompClient.activate();

            newStompClient.onConnect = () => {
                console.log('Connected to WebSocket');
                // Log when the Stomp client is fully activated and connected
                console.log('Stomp client activated:', newStompClient);
            };

            console.log('Stomp client activated:', newStompClient);

            // Subscribe to the destination for receiving messages
            const subscription = newStompClient.subscribe(`/topic/group/${tripId}`, (frame) => {
                const message = JSON.parse(frame.body);
                setMessages((prevMessages) => [...prevMessages, message]);
            });

            // Fetch chat history upon entering the group
            fetchChatHistory(tripId);

            return () => {
                // Unsubscribe and deactivate StompClient when the component is unmounted
                subscription.unsubscribe();
                newStompClient.deactivate();
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

export default ChatScreen;
