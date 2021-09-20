import { ButtonHTMLAttributes } from "react"
import "./button.scss"
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &{
 isOutLined?: boolean
};
// Observação para na props, eu passo a propriedade especifica e digo que todo o resto e contido em props, chamado de props corporate
export default function Button ({isOutLined = false, ...props}: ButtonProps){
  return(

  <button 
  // Passando a condicional 
  className={`button ${isOutLined ? 'outlined': '' }`}{...props}
  />

  
  )
}