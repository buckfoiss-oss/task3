
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import PostList from './pages/PostList';
import PostDetail from './pages/PostDetail';
import NotFound from './components/NotFound';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Link to="/" className="App-link">
          <h1>Bai Viet blog</h1>
        </Link>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
