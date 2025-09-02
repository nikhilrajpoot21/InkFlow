import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login'
import SignUp from './pages/signUp'
import Home from './pages/home';
import Dashboard from './pages/dashboard';
import Settings from './pages/settings';
import CreatePost from './pages/createPost';
import ProtectedRoute from './components/protectedRoute';

function App() {
  return (
   <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/createPost" element={<CreatePost />} />
      </Routes>
    </Router>
  );
}

export default App;
