import copyImg from './copy.svg';

import './roomcode.scss';

// Tipando a propriedade de RoomCode
type RoomCodeProps = {
  code: string;
}
// Component para exporta
export default function RoomCode(props: RoomCodeProps) {
  // Functions copy code room do navegador 
  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(props.code)
  }
  // HTML component

  return (
    <button className="room-code" onClick={copyRoomCodeToClipboard}>
      <div>
        <img src={copyImg} alt="Copy room code" />
      </div>
      <span>Sala #{props.code}</span>
    </button>
  )
}