// // React
// import { useNavigate, useParams } from "react-router-dom"

// // CSS
// import "../styles/room.scss"

// // Img
// import LogoImg from '../images/logo.svg'
// import DeleteImg from '../images/delete.svg'
// import CheckImg from '../images/check.svg'
// import AnswerImg from '../images/answer.svg'

// // Components
// import Button from '../components/buttom/Button'
// import RoomCode from "../components/Roomcode/RoomCode"
// import Questions from "../components/Question/Questions"

// // Services
// import { database } from "../services/firebase"

// // Hook Auth
// import useRoom from "../hooks/useRoom"

// export default function AdminRoom() {
//   // Acessando os paramentos 
//   const params = useParams();
//   // Constante para reutilizar o paramentos ID da room 
//   const roomId = params.id;

//   // Api de navegação
//   const handle = useNavigate();

//   // Rook de compartilhamento de funcionalidade entre paginas
//   const { title, questions } = useRoom(roomId)

//   // Function de encerra a sala

//   async function handleEndRoom(){
//     // Referenciando no banco de dados
//    await database.ref(`rooms/${roomId}`).update({
//      endedAt: new Date(),
//    })

//    if (window.confirm('Você quer encerra esta sala')) {
//     handle("/")
//   }
// }

//   // Function delete question 

//   async function handleDeleteQuestions(questionId: string) {
//     // Passando uma condição de
//     if (window.confirm('Você quer deleta esta pergunta')) {
//       await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
//     }
//   }

//   async function handleHighLightQuestions(questionId: string){
//     await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
//       isHighLighted: true,
//     });
//     console.log(2);


//   }
//   async function handleCheckQuestionsAnswer(questionId: string){
//     await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
//       isAnswered: true,
//     });

//     console.log("1");

//   }


//   return (

//     <div id="page-room">
//       <header>
//         <div className="content">
//           <img src={LogoImg} alt="Let Me Ask" />
//           <div>
//             <RoomCode code={roomId} />
//             <Button isOutLined onClick={handleEndRoom}>Encerra sala</Button>
//           </div>
//         </div>
//       </header>
//       <main className="content">
//         <div className="room-title">
//           <h1>Sala {title}</h1>
//           {questions.length > 0 && <span>{questions.length} perguntas</span>}
//         </div>

//         {/* Percorrendo um array no react e retornando cada posição como um component  */}
//         {/* O metedor map ele ira percorre todos os itens e pode retorna algo, nesse caso retornando um component novo  */}
//         <div className="question-list">
//           {questions.map(question => {
//             return (
//               <Questions
//                 // a propriedade Key e criado pelo react, aonde passamos qual propriedade da listagem e unica, assim diferenciando uma pergunta da outra, melhorando a performance 
//                 //  procurar por algorítimo de reconciliação 
//                 key={question.id}
//                 content={question.content}
//                 author={question.author}
//                 isHighlighted={question.isHighLighted}
//                 isAnswered={question.IsAnswered}
//               >
//                 {!question.IsAnswered && (
//                   // Fragmento contêiner dentro do código , mas nao e exibido no html
//                   <>
//                   <button
//                   type="button"
//                   // Quando clicado executar a função de delete
//                   onClick={() => handleCheckQuestionsAnswer(question.id)}
//                 >
//                   <img src={CheckImg} alt="Perguntas respondidas" />
//                 </button>
//                 <button
//                   type="button"
//                   // Quando clicado executar a função de delete
//                   onClick={() => handleHighLightQuestions(question.id)}
//                 >
//                   <img src={AnswerImg} alt="Dar destaque a pergunta " />
//                 </button>
//                 </>

//                 )}

//                 <button
//                   type="button"
//                   // Quando clicado executar a função de delete
//                   onClick={() => handleDeleteQuestions(question.id)}
//                 >
//                   <img src={DeleteImg} alt="Remover Quest" />
//                 </button>
//               </Questions>
//             )

//           })}
//         </div>
//       </main>
//     </div>


//   )
// }


import { useNavigate, useParams } from 'react-router-dom'

import logoImg from '../images/logo.svg';
import deleteImg from '../images/delete.svg';
import checkImg from '../images/check.svg';
import answerImg from '../images/answer.svg';

import Button from '../components/buttom/Button';
import Question from '../components/Question/Questions';
import RoomCode from '../components/Roomcode/RoomCode';
// import { useAuth } from '../hooks/useAuth';
import { useRoom } from '../hooks/useRoom';
import { database } from '../services/firebase';

import '../styles/room.scss';



export default function AdminRoom() {
  // const { user } = useAuth();
  const endRoom = useNavigate();
  const params = useParams();
  const roomId = params.id;

  const { title, questions } = useRoom(roomId)

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    })

    if (window.confirm('Você quer encerra esta sala')) {
      endRoom("/")
    }
  }

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm('Tem certeza que você deseja excluir esta pergunta?')) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  }

  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    })
  }

  async function handleHighlightQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true,
    })
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <div>
            <RoomCode code={roomId} />
            <Button isOutLined onClick={handleEndRoom}>Encerrar sala</Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <div className="question-list">
          {questions.map(question => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
                isAnswered={question.isAnswered}
                isHighlighted={question.isHighlighted}
              >
                <div>
                  
                </div>
                {!question.isAnswered && (
                  <>
                    <button
                      type="button"
                      onClick={() => handleCheckQuestionAsAnswered(question.id)}
                    >
                      <img src={checkImg} alt="Marcar pergunta como respondida" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleHighlightQuestion(question.id)}
                    >
                      <img src={answerImg} alt="Dar destaque à pergunta" />
                    </button>
                  </>
                )}
                <button
                  type="button"
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  <img src={deleteImg} alt="Remover pergunta" />
                </button>
                <div>resposta</div>
                
              </Question>
            );
          })}
        </div>
      </main>
    </div>
  );
}