import {Card, CardContent , Typography } from '@mui/material'
import React , {forwardRef} from 'react'
import "../Css/Message.css"
let Message= forwardRef(({username, data}, ref)=>{
  console.log(username, data)
    let isUser = username === data.username ;
  return (
     <div ref={ref} className={`message ${isUser && 'message_user'}`}>
     <Card className={isUser ? "message_userCard" : "message_guestCard"}>
        <CardContent>
            <Typography color="black" variant='h5' component="h2">{!isUser && `${data.username || "Unknown"} : `} {data.message}</Typography>
        </CardContent>
    </Card> 
     </div> 
  )
}
)


export {Message}
