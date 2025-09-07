import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import SignUp from './pages/signUp';
import Home from './pages/home';
import Dashboard from './pages/dashboard';
import Settings from './pages/settings';
import CreatePost from './pages/createPost';
import ViewPost from "./pages/viewPost";
import ProtectedRoute from './components/protectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected Routes */}
        <Route path="/home" element={<Home/>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        <Route path="/createPost" element={<ProtectedRoute><CreatePost /></ProtectedRoute>} />

        {/* Public Route for viewing a post */}
        <Route path="/post/:id" element={<ViewPost />} />
      </Routes>
    </Router>
  );
}

export default App;
