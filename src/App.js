import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import FaceRecognition from './components/FaceRecognition';
import PrivacyPolicy from './components/PrivacyPolicy';

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        {isAuthenticated && <Route path="/face-recognition" element={<FaceRecognition />} />}
        {/* Puedes agregar una ruta de fallback para cuando no esté autenticado */}
        <Route path="*" element={<div>404 Not Found</div>} />
          <Route
            path="/face-recognition"
            element={isAuthenticated ? <FaceRecognition /> : <Login setIsAuthenticated={setIsAuthenticated} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
