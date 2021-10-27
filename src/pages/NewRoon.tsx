// React
import { Link, useNavigate } from "react-router-dom"
import { FormEvent, useState } from "react"

// Imagem
import logoImg from '../Assets/images/logo.svg'
import illustrationImg from '../Assets/images/alfa.svg'

// CSS
import "../styles/auth.scss"

// Components
import Button from '../components/buttom/Button'

// Context
import { useAuth } from "../hooks/useAuth"

// services
import { database } from "../services/firebase"


export default function NewRoom() {
  const {  signInWithGoogle } = useAuth()
  // Api para redirecionar 
  const handle = useNavigate();

  // Recuperando state of auth
  const { user } = useAuth()

  // Save to state of input 
  const [newRoom, setNewRoom] = useState('');
  
  // Previne comportamento padrão de reenviar para algum lugar 
  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();
    

    if (newRoom.trim() === '') {
      return;
    }

    // se comunicando com o banco de dados, usando referencia de registro 
    const roomRef = database.ref('rooms')

    // Interagindo com o banco de dados, jogando informações com o push 
    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    })

    // Chamando a constante handle que receber navigation e repassamos para ela aonde queremos que envie o usuário apos
    // Executar todo o código anterior, sendo utilizado key, que e a chave criada para cada sala 

    handle(`/admin/rooms/${firebaseRoom.key}`)

  }

// HTML component
  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
          <h1>{user?.name}</h1>
          <h2>Crie uma nova sala </h2>
          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              // Save to state  
              onChange={event => setNewRoom(event.target.value)}
              // Refresh input para o state inicial 
              value={newRoom}
            />
            
            <Button 
            type="submit"
            disabled ={!user}
            >
              Entra na sala
            </Button>

          </form>
          
          {!user ?(<p>Faça <button className='btn-login' onClick={signInWithGoogle}>Login</button> e crie sua sala </p>) :(<></>)}
          <p>Quer entra em uma sala existe? <Link to="/">Click aqui</Link></p>
        </div>
      </main>
    </div>
  )
}