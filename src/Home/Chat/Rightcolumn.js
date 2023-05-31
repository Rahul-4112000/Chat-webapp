import React, { useEffect, useState } from 'react';
import './Rightcolumn.css';
import Chat from './Chat';

function Rightcolumn({ loginUserData, chattingUserData }) {

  const getChatfromLS = () => {
    if (localStorage.getItem('chats')) {
      return JSON.parse(localStorage.getItem('chats'));
    }
    else return []
  }

  
  const [chat, setChat] = useState('');
  const { avtar, userName, status, userId } = chattingUserData;
  const { userId: loggedUserId } = loginUserData;
  const [chats, setChats] = useState(getChatfromLS());
  const [filteredChats, setFilteredChats] = useState([]);
  
  const chatHandler = (e) => {
    setChat(e.target.value);
  }
  
  const getFilteredChats = () => {
    const chatdata = getChatfromLS();
    const filterdChats = chatdata.map((chat => {
      if ((chat.from === loggedUserId || chat.from === userId) && (chat.to === loggedUserId || chat.to === userId)) {
        return chat;
      }
    }));
    console.log(filterdChats, 'filteredChats');
    
  }

  useEffect(() => {
    getFilteredChats();
  },[])

  const createChatData = (e) => {
    e.preventDefault();

    const chatDetail = {
      message: chat,
      from: loggedUserId,
      to: userId,
      timestamp: {
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" }),
        date: new Date().toLocaleDateString()
      }
    }

    const text = [...chats, chatDetail]

    setChats(text);

    localStorage.setItem('chats', JSON.stringify(text));

    setChat('');

  }

  return (
    chattingUserData ?
      <div className='right-column-container'>
        <div className='right-column-wrapper'>
          <div className='profile-content'>
            <div className='profile-img'>
              <img src={avtar} alt='friend' ></img>
            </div>
            <div>
              <div>{userName}</div>
              <div>{status}</div>
            </div>
          </div>

          <Chat conversations={filteredChats} />

          <div className='message-bar'>
            <form onSubmit={createChatData} >
              <input value={chat} onChange={chatHandler} placeholder='Type Message' ></input>
            </form>
          </div>
        </div>
      </div>
      : <h1>No chat has been done</h1>
  )
}

export default Rightcolumn;
