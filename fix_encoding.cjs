const fs = require('fs');
const path = require('path');

const files = {
    'src/lib/supabase.js': `import { createClient } from '@supabase/supabase-js';

export const SUPABASE_URL = 'https://zrdrsoyyghrbyubjdcup.supabase.co';
export const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpyZHJzb3l5Z2hyYnl1YmpkY3VwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI1MzUyNzYsImV4cCI6MjA4ODExMTI3Nn0.Egr6T5vOTr6SPL3l3qQTz5vZFZluhzHl__Vpy36g3gc';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
`,

    'src/context/AuthContext.jsx': `import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        await fetchProfile(session.user.id);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email, password, fullName, role) => {
    try {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      if (data?.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([{ id: data.user.id, full_name: fullName, role }]);
        if (profileError) throw profileError;
      }
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  };

  const signIn = async (email, password) => {
    return supabase.auth.signInWithPassword({ email, password });
  };

  const signOut = () => supabase.auth.signOut();

  return (
    <AuthContext.Provider value={{ user, profile, loading, signUp, signIn, signOut }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
`,

    'src/App.jsx': `import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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
  if (loading) return <div className="main-content"><p>Loading...</p></div>;
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
`
};

for (const [filePath, content] of Object.entries(files)) {
    const fullPath = path.join(__dirname, filePath);
    fs.mkdirSync(path.dirname(fullPath), { recursive: true });
    fs.writeFileSync(fullPath, content, 'utf8');
    const stats = fs.statSync(fullPath);
    console.log(`OK: ${filePath} (${stats.size} bytes, UTF-8)`);
}

console.log('All files written successfully.');
