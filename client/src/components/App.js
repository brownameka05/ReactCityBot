import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import style from './style.css';
import Header from './Header';
import Landing from './pages/Landing';
import About from './pages/About';
import Login from './pages/Login';
import Shop from './shop/Shop';
import Chatbot from './chatbot/Chatbot';



const App = () => {
  return (
    // <div className="container">
    <div>
      <BrowserRouter>
        <div>
          <Header/>
          <Route exact path="/" component={Landing} />
          <Route exact path="/about" component={About} />
          <Route exact path="/shop" component={Shop} />
          <Route exact path="/login" component={Login} />

          <Chatbot/>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App;
