// React
import {  useParams } from "react-router-dom"
import { FormEvent, useState } from "react"

// CSS
import "../styles/room.scss"

// Img
import LogoImg from '../Assets/images/logo.svg'

// Components
import Button from '../components/buttom/Button'
import RoomCode from "../components/Roomcode/RoomCode"
import Questions from "../components/Question/Questions"

// Services
import {  database } from "../services/firebase"

// Hook Auth
import { useAuth,  } from "../hooks/useAuth"
import {useRoom} from "../hooks/useRoom"

import "firebase/auth";


export default function Room() {
  const {  signInWithGoogle, signOut } = useAuth()
  // Verificação do usuário
  const { user } = useAuth()
  // Acessando os paramentos 
  const params = useParams();
  // Constante para reutilizar o paramentos ID da room 
  const roomId = params.id;
  // save to state new quest 
  const [newQuestion, setNewQuestion] = useState('')

  // Rook de compartilhamento de funcionalidade entre paginas
  const { title, questions } = useRoom(roomId)

  // Um hook que dispara um evento sempre que a alguma alteração de informações, sendo que quando o array e passado vazio essa função executara apenas uma unica vez quado esse elemento for exibido em tela
  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();
    if (newQuestion.trim() === '') {
      return;
    }

    if (!user) {
      throw new Error('You must be logged in');
    }

    // save to quest 
    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      isHighLighted: false,
      IsAnswered: false,
    };

    // Enviando pro banco de dados a quest
    await database.ref(`/rooms/${roomId}/questions`).push(question)

    // apos realizar toda função reiniciamos o estados da quest  para vazio
    setNewQuestion('');
  }

  // Funcionalidade do liked
  async function handleLikeQuestion(questionId: string, likeId: string | undefined) {
    // autentificando likes
    if (likeId) {
      await database.ref(`rooms/${roomId}/questions/${questionId}/likes/${likeId}`).remove()
    } else {
      // Acessando a referencia do banco de dados , dentro do banco sera salvo nossos likes
      await database.ref(`rooms/${roomId}/questions/${questionId}/likes`).push({
        authorId: user?.id,
      })
    }
  }

  // SiginOut 
  // function signOut() {
    
  //   // [START auth_sign_out]
  //   firebase.auth().signOut().then(() => {
  //     alert('Sign-out successful.')
      
  //   }).catch((error) => {
  //     // An error happened.
  //   });
    
  //   // [END auth_sign_out]
  // }
  

  return (

    <div id="page-room">
      <header>
        <div className="content">
          <img src={LogoImg} alt="Let Me Ask" />
          <div>
          <RoomCode code={roomId} />
          

          {user ? (
            <Button
            color="inherit"
            onClick={ signOut }
          >Deslogar
          </Button>
             
            ) : (
              <></>
            )}
          

          </div>

        </div>
      </header>
      <main className="content">
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} perguntas</span>}
        </div>
        <form onSubmit={handleSendQuestion}>
          <textarea
            placeholder="O que você que perguntar ?"
            onChange={event => setNewQuestion(event.target.value)}
            value={newQuestion}
          />
          <div className="form-footer">
            {user ? (
              <div className="user-info">
                <img src={user.avatar} alt={user.name} />
                <span>{user.name}</span>
              </div>
            ) : (
              <span>Para enviar uma pergunta, <button
              onClick={signInWithGoogle}
              >faça seu login </button>. </span>
            )}
            <Button type="submit" disabled={!user}>Enviar perguntar</Button>
          </div>
        </form>


        {/* Percorrendo um array no react e retornando cada posição como um component  */}
        {/* O metedor map ele ira percorre todos os itens e pode retorna algo, nesse caso retornando um component novo  */}
        <div className="question-list">
          {questions.map(question => {
            return (
              <Questions
                // a propriedade Key e criado pelo react, aonde passamos qual propriedade da listagem e unica, assim diferenciando uma pergunta da outra, melhorando a performance 
                //  procurar por algorítimo de reconciliação 
                key={question.id}
                content={question.content}
                author={question.author} 
                isAnswered={question.isAnswered}
                isHighlighted={question.isHighlighted }
                
              >
                {!question.isAnswered && (
                  <button
                  className={`like-button ${question.likeId ? 'liked' : ''}`}
                  type="button"
                  aria-label="marca como gostei"
                  // Chamando a functio likes, criando uma function anonima que chama a função passando o parâmetro 
                  onClick={() => handleLikeQuestion(question.id, question.likeId)}
                >
                  {question.likeCount > 0 && <span>{question.likeCount}</span>}
                  {/* So posso manipular o SVG se eles tiver diretamente dentro do HTML */}
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V13C2 12.4696 2.21071 11.9609 2.58579 11.5858C2.96086 11.2107 3.46957 11 4 11H7M14 9V5C14 4.20435 13.6839 3.44129 13.1213 2.87868C12.5587 2.31607 11.7956 2 11 2L7 11V22H18.28C18.7623 22.0055 19.2304 21.8364 19.5979 21.524C19.9654 21.2116 20.2077 20.7769 20.28 20.3L21.66 11.3C21.7035 11.0134 21.6842 10.7207 21.6033 10.4423C21.5225 10.1638 21.3821 9.90629 21.1919 9.68751C21.0016 9.46873 20.7661 9.29393 20.5016 9.17522C20.2371 9.0565 19.9499 8.99672 19.66 9H14Z" stroke="#737380" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>

                </button>
                )}
              </Questions>
            )

          })}
        </div>
      </main>
    </div>


  )
}




