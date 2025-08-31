import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login'
import SignUp from './pages/signUp'
import Home from './pages/home';
import ProtectedRoute from './components/protectedRoute';

function App() {
  return (
   <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
