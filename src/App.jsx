import React from 'react';
import './App.css';
import Content from './components/Content';
import Navbar from './components/Navbar';


function App() {
   let data = ''
   return (
      <div className="app-container">
         <Navbar />
         <Content />
      </div>
   );
}

export default App;
