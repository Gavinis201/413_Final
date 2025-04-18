import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EntertainersList from './components/EntertainersList';
import EntertainerDetails from './components/EntertainerDetails';
import Welcome from './components/welcome';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/entertainers" element={<EntertainersList />} />
        <Route path="/entertainers/:id" element={<EntertainerDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
