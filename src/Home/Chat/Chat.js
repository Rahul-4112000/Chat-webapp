import React from 'react';
import './Chat.css';
import SyntaxHighlighter from 'react-syntax-highlighter';
import * as themes from 'react-syntax-highlighter/dist/esm/styles/hljs';

function Chat({ conversations, userId }) {
  return (conversations || []).map((item) => {
    return (
      <>
        <div className={userId === item.from ? 'self' : 'from'}>
          {item.code ? (
            <p>
              <SyntaxHighlighter
                language={item.language}
                style={themes[item.theme]}
              >
                {item.message}
              </SyntaxHighlighter>
            </p>
          ) : (
            <p>{item.message}</p>
          )}
          <p>{item.timestamp.time}</p>
        </div>
      </>
    );
  });
}

export default Chat;
