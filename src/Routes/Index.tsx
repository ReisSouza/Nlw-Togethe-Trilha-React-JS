import { Routes, Route, } from 'react-router-dom';
import { BrowserRouter} from 'react-router-dom';

// pages
import Home from '../pages/Home';
import NewRoom from '../pages/NewRoon'
import Room from '../pages/Room';
import AdminRoom from '../pages/AdminRoom';
// Context
export const Rotas = () => {
  return(
  <BrowserRouter>
    <Routes>
        <Route path="/"  element={<Home />} />
        <Route path="/rooms/new" element={<NewRoom />} />
        {/* os dois pontos depois da barra expressa por react router dom, que depois do rooms, se nao tiver news ele
        vau acessa qualquer outra coisa, nesse caso ordenamos que ele nos retorne com o Id */}
        <Route path="/rooms/:id" element={<Room />} />
        <Route path="admin/rooms/:id" element={<AdminRoom />} />
    </Routes>
  </BrowserRouter>
  )
}