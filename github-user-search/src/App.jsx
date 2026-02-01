import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Search from './components/Search';
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <header>
          <h1>GitHub User Search</h1>
        </header>
        <main>
          <Routes>
            <Route path="/" element={
              <div>
                <h2>Welcome to the GitHub User Search Application</h2>
                <Search />
              </div>
            } />
          </Routes>
        </main>
        <footer>
          <p>© 2024 GitHub User Search</p>
        </footer>
      </div>
    </Router>
  )
}

export default App
