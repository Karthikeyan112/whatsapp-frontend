import React, {useState} from 'react';
import './Chat.css';
import { Avatar, IconButton } from '@material-ui/core';
import { SearchOutlined, AttachFile, MoreVert } from '@material-ui/icons';
import InsertEmoticonOutlinedIcon from '@material-ui/icons/InsertEmoticonOutlined';
import MicIcon from '@material-ui/icons/Mic';
import axios from '../axios';

const Chat = ({ messages }) => {
  const [input, setInput] = useState('');

  const sentMessage = async (e) => {
    e.preventDefault();
    console.log(input);
    await axios.post('/messages/new', {
      name: 'karthikeyan',
      message: input,
      timestamp: new Date(),
      received: false
    });

    setInput('');
  }
  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar />
        <div className="chat__headerInfo">
          <h3>Room Name</h3>
          <p>last seen at ...</p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        {messages.map(({ name, timestamp, message, received }) => (
          <p key={timestamp} className={`chat__message ${received && 'chat__receiver'}`}>
            <span className="cat__name">{name}</span>
            {message}
            <span className="chat__timestamp">
              {timestamp}
            </span>
          </p>
        ))}
      </div>
      <div className="chat__footer">
        <InsertEmoticonOutlinedIcon />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message ..."
            type="text"
          />
          <button onClick={sentMessage} type="submit">Send Message</button>
        </form>
        <MicIcon />
      </div>
    </div>
  )
}

export default Chat;