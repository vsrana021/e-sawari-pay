import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import PassengerFlow from './pages/PassengerFlow';
import DriverFlow from './pages/DriverFlow';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import { AuthProvider, useAuth } from './context/AuthContext';
import './index.css';

function ProtectedRoute({ children, role }) {
    const { user, profile, loading } = useAuth();

    if (loading) return <div className="main-content flex justify-center items-center"><div className="spinner" /></div>;
    if (!user) return <Navigate to="/signin" replace />;
    if (role && profile?.role !== role) return <Navigate to="/" replace />;

    return children;
}

function AppContent() {
    return (
        <BrowserRouter>
            <div className="app-shell">
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/passenger" element={<ProtectedRoute role="passenger"><PassengerFlow /></ProtectedRoute>} />
                    <Route path="/driver" element={<ProtectedRoute role="driver"><DriverFlow /></ProtectedRoute>} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />
                </Routes>
                <Footer />
            </div>
        </BrowserRouter>
    );
}

function App() {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
}

export default App;
