import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { signIn } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        setLoading(true);
        setError('');

        const { error: signInError } = await signIn(email, password);

        if (signInError) {
            setError(signInError.message);
            setLoading(false);
        } else {
            navigate('/'); // Role check in App.jsx/ProtectedRoute handles redirection
        }
    };

    return (
        <div className="main-content" style={{ justifyContent: 'center', gap: '32px' }}>
            <div className="text-center animate-slideUp">
                <h1 style={{ fontSize: '24px', fontWeight: 800 }}>Welcome Back</h1>
                <p className="text-muted mt-8">Sign in to your account</p>
            </div>

            {error && (
                <div style={{ padding: '12px', background: '#fee2e2', color: '#dc2626', borderRadius: '8px', fontSize: '14px', textAlign: 'center' }} className="animate-slideUp">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-20 animate-slideUp stagger-1">
                <div className="input-group">
                    <label className="input-label" htmlFor="email">Email</label>
                    <div style={{ position: 'relative' }}>
                        <Mail size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input
                            id="email"
                            type="email"
                            className="input w-full"
                            placeholder="you@example.com"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            style={{ paddingLeft: '40px' }}
                        />
                    </div>
                </div>

                <div className="input-group">
                    <label className="input-label" htmlFor="password">Password</label>
                    <div style={{ position: 'relative' }}>
                        <Lock size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input
                            id="password"
                            type="password"
                            className="input w-full"
                            placeholder="••••••••"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            style={{ paddingLeft: '40px' }}
                        />
                    </div>
                </div>

                <button type="submit" disabled={loading} className="btn btn-primary btn-full btn-lg" id="btn-signin-submit" style={{ opacity: loading ? 0.7 : 1 }}>
                    <LogIn size={18} />
                    {loading ? 'Signing in...' : 'Sign In'}
                </button>
            </form>

            <p className="text-center text-sm text-muted animate-slideUp stagger-2">
                Don't have an account?{' '}
                <span
                    onClick={() => navigate('/signup')}
                    style={{ color: 'var(--primary)', cursor: 'pointer', fontWeight: 600 }}
                >
                    Sign Up
                </span>
            </p>
        </div>
    );
}
