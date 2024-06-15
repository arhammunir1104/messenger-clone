// import logo from './logo.svg';
// import './App.css';
// import {useEffect, useState  } from "react"
// import FlipMove from 'react-flip-move';
// import Button from '@mui/material/Button';
// import { FormControl, Input, InputLabel } from '@mui/material';
// import { Message } from './Component/Message';
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';
// import {db} from "./firebaseFile"


// function App() {
//   let [input, setInput] = useState();
//   let [isLoading, setIsLoading] = useState(true)
//   let [messages, setMessages] = useState([
//     {username: "Arham", message: "Hi"},
//     {username: "Azam", message: "Hi"}
//   ]);
//   let [username, setUserName] = useState('Arham')

//   useEffect(()=>{
//     // 
//     setIsLoading(true)
//     db.collection("messages").orderBy("timestamp", "asc").onSnapshot((snapshot)=>{ 
//       console.log(snapshot.docs)
//       setMessages(snapshot.docs.map(doc => ({id: doc.id , data: doc.data()})))
//     })
//     setIsLoading(false)
//     // setUserName("Arham")
//   }, [])
//   useEffect(()=>{
//     let n = prompt("Enter your name ");
//     setUserName(n)
//   }, [])

//   let send = (e)=>{
//     db.collection('messages').add({
//       message: input,
//       username: username,
//       timestamp: firebase.firestore.FieldValue.serverTimestamp()
//     })
//     e.preventDefault()
//     setMessages([...messages, {username: username, message:input}])
//     setInput('')
//   }
//   return (
//     <div className="App">
//       {(isLoading) ?
//        <p>Loading,..</p>: 
//        <>
//         <form>
//         <FormControl>
//         <InputLabel htmlFor="my-input">Email address</InputLabel>
//         <Input value={input} onChange={(e)=>{setInput(e.target.value)}}/>
//         </FormControl>
//         <Button variant="contained" disabled={!input} type='submit' onClick={send}>Send Message</Button>
//         </form>
//         {console.log(messages)}
//         {messages.map(({data})=>{
//           console.log(username, data , "Girst")
//           return(
//             <>
//             <p>{data.data.message}</p>
//             {/* <Message  username={username} data={data} /> */}
//             </>
//           )
//         })}
        
//         </>
//       }
      
//     </div>
//   )
// }


import React, { useEffect, useState } from "react";
import logo from './logo.svg';
import './App.css';
import Button from '@mui/material/Button';
import { FormControl, Input, InputLabel } from '@mui/material';
import { Message } from './Component/Message';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {db} from "./firebaseFile"
import FlipMove from 'react-flip-move';
import mess_logo from "./mess_logo.png"
import "./Css/App.css"
import SendIcon from '@mui/icons-material/Send';

// ... other imports

function App() {
  // ... your state variables
  let [input, setInput] = useState();
  let [isLoading, setIsLoading] = useState(true)
  let [messages, setMessages] = useState([
    {username: "Arham", message: "Hi"},
    {username: "Azam", message: "Hi"}
  ]);
  let [username, setUserName] = useState('Arham')

  useEffect(() => {
    setIsLoading(true); // Show loading initially
    const unsubscribe = db
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
        );
        setIsLoading(false);
      }, (error) => {
        // Handle errors
        console.error("Error fetching messages:", error);
      }); 
            return () => unsubscribe(); 
  }, []);

  // ... rest of your component code
  useEffect(()=>{
    let n = prompt("Enter your name ");
    setUserName(n)
  }, [])
  
  let send = (e)=>{
    db.collection('messages').add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    e.preventDefault();
    setInput("")
  }
  return (
    <div className="App">
      <img src={mess_logo} className="img" />
      <h1>Welcome To Messenger </h1>
      <p><b>Welcome {username} </b></p>
      {isLoading ? ( 
        <p>Loading...</p>
      ) : (
        <>
          {/* Your form */}
          
         <form className="app_form">
         <FormControl className="app_formControl">
         <Input value={input} onChange={(e)=>{setInput(e.target.value)}} placeholder="Enter a message..." className="app_input" />
         <Button className="app_icon" variant="contained" disabled={!input} type='submit' onClick={send}><SendIcon /></Button>
         </FormControl>
         </form>
            <FlipMove>
            {messages.map(({ id, data }) => ( // Access 'data' directly
              <Message key={id} username={username} data={data} /> 
              // Or if not using <Message>: <p key={id}>{data.data.message}</p> 
            ))}
            </FlipMove>
        </>
      )}
    </div>
  );
}

export default App
