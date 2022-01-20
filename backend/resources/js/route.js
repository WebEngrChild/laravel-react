import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';

  function App() {
    return (
        <div>
            <Routes>
                <Route path='/' element={<Home />} />
            </Routes>
        </div>
    );
}

  ReactDOM.render((
    <BrowserRouter>
      <App />
    </BrowserRouter>
  ), document.getElementById('app'))
