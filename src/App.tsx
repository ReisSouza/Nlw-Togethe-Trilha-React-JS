// React import
import { Routes, Route, } from 'react-router-dom';
import React from 'react';
// Css
import './styles/global.scss';
// pages
import Home from './pages/Home';
import NewRoom from './pages/NewRoon'
import Room from './pages/Room';
import AdminRoom from './pages/AdminRoom';
// Context
import   {AuthContextProvider}  from './context/AuthContext'
// service
import "../src/services/firebase"


function App() {
  
  return (
      <AuthContextProvider>
    <Routes>
        <Route path="/"  element={<Home />} />
        <Route path="/rooms/new" element={<NewRoom />} />
        {/* os dois pontos depois da barra expressa por react router dom, que depois do rooms, se nao tiver news ele
        vau acessa qualquer outra coisa, nesse caso ordenamos que ele nos retorne com o Id */}
        <Route path="/rooms/:id" element={<Room />} />
        <Route path="admin/rooms/:id" element={<AdminRoom />} />
    </Routes>
      </AuthContextProvider>

  );
}

export default App;
