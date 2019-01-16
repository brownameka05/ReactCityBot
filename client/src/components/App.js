import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './style.css';
import Header from './Header';
import Landing from './pages/Landing';
import About from './pages/About';
import Register from './pages/Register';
import Login from './pages/Login';
import Feedback from './pages/Feedback';
import Fav from './fav/Fav';
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
          <Route exact path="/fav" component={Fav} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/feedback" component={Feedback} />


          <Chatbot/>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App;
