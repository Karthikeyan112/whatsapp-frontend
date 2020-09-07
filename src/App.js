import React, { useEffect, useState } from 'react';
import Pusher from 'pusher-js';
import './App.css';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import axios from './axios';

function App() {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    axios.get('/messages/sync')
      .then(res => {
        console.log(res.data);
        setMessages(res.data);
      });
  }, []);

  useEffect(() => {
    var pusher = new Pusher('e34e52b0f32500ab1a66', {
      cluster: 'ap2'
    });

    var channel = pusher.subscribe('messages');
    channel.bind('inserted', (newMessage) => {
      setMessages([...messages, newMessage]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    }
  }, [messages]);
  console.log(messages);
  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <Chat messages={messages} />
      </div>
    </div>
  );
}

export default App;
