import { FormControl, IconButton, Input, InputLabel } from '@material-ui/core';
import React from 'react';
import './App.scss';
import { Message } from './components/Message';
import { db } from './firebase';
import firebase from 'firebase';
import SendSharpIcon from '@material-ui/icons/SendSharp';
import FlipMove from 'react-flip-move';

function App() {
  const [username, setUsername] = React.useState('');
  const [messages, setMessages] = React.useState([]);
  const [input, setInput] = React.useState('');

  React.useEffect(() => {
    db.collection('messages')
      .orderBy('timeStamp', 'desc')
      .onSnapshot((snapshot) => {
        setMessages(snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() })));
      });
  }, []);

  React.useEffect(() => {
    setUsername(prompt('Enter your name'));
  }, []);

  const sendMessage = (e) => {
    //this method just simple way to use spread operator ES6 syntax
    //Code will run that way: shadow copy whole messages array and add the thing that input keep.
    e.preventDefault();

    db.collection('messages').add({
      message: input,
      username: username,
      timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput('');
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className="app">
      <h3>Heya {username}</h3>
      <form className="app__form">
        <FormControl className="app__formControl">
          <InputLabel className="app__input">Enter a message</InputLabel>
          <Input value={input} onChange={handleInputChange} placeholder="Enter a message..." />
          <IconButton
            className="app_iconButton"
            onClick={sendMessage}
            disabled={!input}
            type="submit"
            color="primary"
            variant="contained">
            Send
            <SendSharpIcon />
          </IconButton>
        </FormControl>
      </form>
      <FlipMove>
        {messages.map(({ id, message }) => (
          <Message key={id} username={username} message={message} />
        ))}
      </FlipMove>
    </div>
  );
}

export default App;
