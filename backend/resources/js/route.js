import React from 'react';
import ReactDOM from 'react-dom';
//React Routerを取得
import { BrowserRouter, Route, Routes } from 'react-router-dom';
//各コンポーネントを取得
import Home from './pages/Home';
import PostEdit from './pages/PostEdit';

//関数：起点となるAppコンポーネント関数の呼び出し
  function App() {
    return (
        <div>
            {/* ルーティング定義とコンポーネント呼び出し */}
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/post/edit/:id' element={<PostEdit />} />
            </Routes>
        </div>
    );
}

//描画
  ReactDOM.render((
    <BrowserRouter>
      <App />
    </BrowserRouter>
  ), document.getElementById('app'))
