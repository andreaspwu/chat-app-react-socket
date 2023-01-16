import './App.css'
import io from 'socket.io-client'
import { useState } from 'react'
import Chat from './Chat'

const socket = io.connect('https://chat-server-prod.up.railway.app')

function App() {
  const [username, setUsername] = useState('')
  const [room, setRoom] = useState('JavaScript')
  const [showChat, setShowChat] = useState(false)

  const joinRoom = () => {
    if (username !== '' && room !== '') {
      socket.emit('join_room', room)
      setShowChat(true)
    }
  }

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>💻 CodeRoom</h3>
          <input
            type="text"
            placeholder="Enter your name..."
            onChange={(e) => {
              setUsername(e.target.value)
            }}
          />

          <select
            onChange={(e) => {
              setRoom(e.target.value)
            }}
          >
            <option value="JavaScript">JavaScript</option>
            <option value="Java">Java</option>
            <option value="Python">Python</option>
            <option value="C++">C++</option>
          </select>
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  )
}

export default App
