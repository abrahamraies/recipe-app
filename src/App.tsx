import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Home from './pages/Home';
import Recipes from './pages/Recipes';
import Favorites from './pages/Favorites';
import ShoppingList from './pages/ShoppingList';
import Profile from './pages/Profile';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import ForgotPassword from './pages/Auth/ForgotPassword';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import NotFound from './pages/NotFound';
import './index.css';
import EditProfile from './pages/EditProfile';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Toaster position="top-right" reverseOrder={false} />
        <Routes>
          {/* Rutas Públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          
          {/* Rutas Protegidas */}
          <Route element={<ProtectedRoute />}>
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/shopping-list" element={<ShoppingList />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/edit-profile" element={<EditProfile />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
        <footer className="bg-gray-800 text-white text-center p-4 mt-8">
        © 2025 Recipe App. Todos los derechos reservados.
      </footer>
      </Router>
    </Provider>
  );
}

export default App;