import React, { useEffect, useState } from 'react';
import './Rightcolumn.css';
import Chat from './Chat';
import * as themes from 'react-syntax-highlighter/dist/esm/styles/hljs';
import supportedLanguages from 'react-syntax-highlighter/dist/cjs/languages/hljs/supported-languages';

function Rightcolumn({ loginUserData, chattingUserData }) {
  const getChatfromLS = () => {
    if (localStorage.getItem('chats')) {
      return JSON.parse(localStorage.getItem('chats'));
    } else return [];
  };

  const getFilteredChats = () => {
    const chatdata = getChatfromLS();
    const filterdChats = chatdata.filter(
      (chat) =>
        (chat.from === loggedUserId || chat.from === userId) &&
        (chat.to === loggedUserId || chat.to === userId)
    );
    setFilteredChats(filterdChats);
  };

  const [chat, setChat] = useState('');
  const { avtar, userName, status, userId } = chattingUserData;
  const { userId: loggedUserId } = loginUserData;
  const [chats, setChats] = useState(getChatfromLS());
  const [filteredChats, setFilteredChats] = useState([]);
  const [isCode, setIsCode] = useState(false);
  const defaultLanguage = 'javascript';
  const defaultTheme = 'agate';
  const [language, setLanguage] = useState(defaultLanguage);
  const [theme, setTheme] = useState(defaultTheme);

  const chatHandler = (e) => {
    setChat(e.target.value);
  };

  useEffect(() => {
    getFilteredChats();
  }, [userName]);

  const createChatData = (e) => {
    e.preventDefault();

    const chatDetail = {
      message: chat,
      from: loggedUserId,
      code:isCode,
      theme:theme,
      language:language,
      to: userId,
      timestamp: {
        time: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
        date: new Date().toLocaleDateString(),
      },
    };
    const chats = getChatfromLS();
    const text = [...chats, chatDetail];

    setChats(text);

    localStorage.setItem('chats', JSON.stringify(text));

    getFilteredChats();

    setChat('');
  };

  const handleCode = (e) => {
    if (e.currentTarget.checked) {
      setIsCode(true);
    } else {
      setIsCode(false);
    }
  };

  return chattingUserData ? (
    <div className='right-column-container'>
      <div className='right-column-wrapper'>
        <div className='profile-content'>
          <div className='profile-img'>
            <img src={avtar} alt='friend'></img>
          </div>
          <div>
            <div>{userName}</div>
            <div>{status}</div>
          </div>
        </div>
        <div className='chat-div'>
          <Chat conversations={filteredChats} userId={loggedUserId} />
        </div>

        <div className='message-bar'>
          <form onSubmit={createChatData}>
            <label>Write Code</label>
            <input type='checkbox' onChange={handleCode} />
            {isCode ? (
              <div>
                <select
                  defaultValue={defaultLanguage}
                  name='languages'
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  {supportedLanguages.map((language, i) => (
                    <option key={i}>{language}</option>
                  ))}
                </select>
                <select
                  defaultValue={defaultTheme}
                  name='themes'
                  onChange={(e) => setTheme(e.target.value)}
                >
                  {Object.keys(themes).map((theme, i) => (
                    <option key={i}>{theme}</option>
                  ))}
                </select>
                <textarea
                  value={chat}
                  onChange={chatHandler}
                  placeholder='Write some code'
                />
              </div>
            ) : (
              <input
                type='text'
                value={chat}
                onChange={chatHandler}
                placeholder='Type Message'
              ></input>
            )}
            <button onClick={createChatData}>Submit</button>
          </form>
        </div>
      </div>
    </div>
  ) : (
    <h1>No chat has been done</h1>
  );
}

export default Rightcolumn;
