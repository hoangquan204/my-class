import React, { useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

const ChatRoom = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const username = "User_" + Math.floor(Math.random() * 1000);

    const stompClientRef = useRef(null); // sử dụng ref thay vì state
    const [connected, setConnected] = useState(false); // để hiển thị trạng thái kết nối

    useEffect(() => {
        const socket = new SockJS('http://localhost:8080/ws');
        const client = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,
            debug: (str) => console.log('STOMP: ' + str),
            onConnect: () => {
                console.log('✅ Connected to WebSocket');

                setConnected(true);
                stompClientRef.current = client;

                client.subscribe('/topic/public', (message) => {
                    const body = JSON.parse(message.body);
                    setMessages(prev => [...prev, body]);
                });

                client.publish({
                    destination: '/app/chat.addUser',
                    body: JSON.stringify({
                        sender: username,
                        type: 'JOIN'
                    }),
                });
            },
            onStompError: (frame) => {
                console.error('❌ STOMP error', frame);
            },
        });

        client.activate();

        return () => {
            client.deactivate();
            setConnected(false);
        };
    }, []);

    const sendMessage = () => {
        const client = stompClientRef.current;

        if (!client || !client.connected) {
            console.warn("⚠️ STOMP chưa sẵn sàng, không thể gửi.");
            return;
        }

        if (input.trim()) {
            client.publish({
                destination: '/app/chat.sendMessage',
                body: JSON.stringify({
                    sender: username,
                    content: input,
                    type: 'CHAT',
                }),
            });
            setInput('');
        }
    };

    return (
        <div style={{ padding: 20 }}>
            <h2>Chat Room {connected ? '🟢' : '🔴'}</h2>
            <div style={{ height: 300, overflowY: 'scroll', border: '1px solid #ccc', marginBottom: 10, padding: 10 }}>
                {messages.map((msg, index) => (
                    <div key={index}>
                        <strong>{msg.sender}:</strong> {msg.content}
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={input}
                placeholder="Enter message..."
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                style={{ width: '80%' }}
            />
            <button onClick={sendMessage} disabled={!connected}>Send</button>
        </div>
    );
};

export default ChatRoom;
