// React import
import React from 'react';
// Css
import './styles/global.scss';

import   {AuthContextProvider}  from './context/AuthContext'
// service
import "../src/services/firebase"
import { Rotas } from './Routes/Index';


function App() {
  
  return (
      <AuthContextProvider>
        <Rotas/>
      </AuthContextProvider>

  );
}

export default App;
