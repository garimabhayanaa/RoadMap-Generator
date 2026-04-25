import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import CreateRoadmap from './pages/CreateRoadmaps';

const navBar=ReactDOM.createRoot(document.getElementById('bar-area'));
navBar.render(<NavBar/>);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/create" element={<CreateRoadmap />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

