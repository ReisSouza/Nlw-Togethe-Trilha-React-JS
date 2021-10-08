// React
import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Image
import logoImg from '../images/logo.svg'
import illustrationImg from '../images/alfa.svg'
import googleIconImg from '../images/google-icon.svg'

// CSS
import "../styles/auth.scss"

// Components
import Button from '../components/buttom/Button'

// Services
import {  database, } from '../services/firebase'

// Context Auth
import { useAuth } from '../hooks/useAuth'


export default function Home() {

  // state of armazenar code of room
  const [roomCode, setRoomCode] = useState('')

  // Rook Auth
  const { user, signInWithGoogle } = useAuth()

  // Api Navigator
  const handleCreateRoom = useNavigate();

  // Function of  redirect new room
  async function handle() {
    // Verification of auth 
    if (!user) {
      await signInWithGoogle()
    } 
        handleCreateRoom('./rooms/new')
  }

  // Function of envia o form
  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault()

    // Verification of  room not exist 
    if (roomCode.trim() === '') {
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      alert('Room does not exists.');
      return;
    }

    if (roomRef.val().endedAt) {
      alert('Room already closed.');
      return;
    }
      // Por fim, se atender todas as condições de cima sera redirecionado para roomCode
  
      handleCreateRoom(`/rooms/${roomCode}`)
    


  }
 
  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>
      <main>
        <>
        </>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
          <button onClick={handle} className="create-room">
            <img src={googleIconImg} alt="Logo do Google" />
            Crie sua sala com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              // Armazenando valor do input 
              onChange={event => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type="submit">
              Entra na sala
            </Button>

          </form>
        </div>
      </main>
    </div>
  )
}

