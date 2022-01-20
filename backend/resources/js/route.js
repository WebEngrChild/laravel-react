import React from 'react';
import ReactDOM from 'react-dom';
//React Routerを取得
import { BrowserRouter, Route, Routes } from 'react-router-dom';
//各コンポーネントを取得
import Home from './pages/Home';

  function App() {
    return (
        <div>
            {/* ルーティング定義 */}
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
