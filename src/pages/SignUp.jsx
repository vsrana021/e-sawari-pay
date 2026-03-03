import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, UserPlus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('passenger'); // default role
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { signUp } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !email || !password) {
            setError('Please fill in all fields');
            return;
        }

        setLoading(true);
        setError('');

        const { error: signUpError } = await signUp(email, password, name, role);

        if (signUpError) {
            setError(signUpError.message);
            setLoading(false);
        } else {
            navigate('/'); // Role check redirects appropriately via ProtectedRoute
        }
    };

    return (
        <div className="main-content" style={{ justifyContent: 'center', gap: '32px' }}>
            <div className="text-center animate-slideUp">
                <h1 style={{ fontSize: '24px', fontWeight: 800 }}>Create Account</h1>
                <p className="text-muted mt-8">Join E-Sawari Pay today</p>
            </div>

            {error && (
                <div style={{ padding: '12px', background: '#fee2e2', color: '#dc2626', borderRadius: '8px', fontSize: '14px', textAlign: 'center' }} className="animate-slideUp">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-20 animate-slideUp stagger-1">

                <div className="input-group">
                    <label className="input-label" htmlFor="role">Role</label>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button
                            type="button"
                            onClick={() => setRole('passenger')}
                            style={{ flex: 1, padding: '10px', borderRadius: '8px', border: `2px solid ${role === 'passenger' ? 'var(--primary)' : 'transparent'}`, background: 'var(--card)', color: role === 'passenger' ? 'black' : 'var(--text-muted)' }}
                        >
                            Passenger
                        </button>
                        <button
                            type="button"
                            onClick={() => setRole('driver')}
                            style={{ flex: 1, padding: '10px', borderRadius: '8px', border: `2px solid ${role === 'driver' ? 'var(--orange)' : 'transparent'}`, background: 'var(--card)', color: role === 'driver' ? 'black' : 'var(--text-muted)' }}
                        >
                            Driver
                        </button>
                    </div>
                </div>

                <div className="input-group">
                    <label className="input-label" htmlFor="name">Full Name</label>
                    <div style={{ position: 'relative' }}>
                        <User size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input id="name" type="text" className="input w-full" placeholder="Your name" value={name} onChange={e => setName(e.target.value)} style={{ paddingLeft: '40px' }} />
                    </div>
                </div>

                <div className="input-group">
                    <label className="input-label" htmlFor="signup-email">Email</label>
                    <div style={{ position: 'relative' }}>
                        <Mail size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input id="signup-email" type="email" className="input w-full" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} style={{ paddingLeft: '40px' }} />
                    </div>
                </div>

                <div className="input-group">
                    <label className="input-label" htmlFor="signup-password">Password</label>
                    <div style={{ position: 'relative' }}>
                        <Lock size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input id="signup-password" type="password" className="input w-full" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} style={{ paddingLeft: '40px' }} />
                    </div>
                </div>

                <button type="submit" disabled={loading} className="btn btn-primary btn-full btn-lg" id="btn-signup-submit" style={{ opacity: loading ? 0.7 : 1 }}>
                    <UserPlus size={18} />
                    {loading ? 'Creating...' : 'Create Account'}
                </button>
            </form>

            <p className="text-center text-sm text-muted animate-slideUp stagger-2">
                Already have an account?{' '}
                <span onClick={() => navigate('/signin')} style={{ color: 'var(--primary)', cursor: 'pointer', fontWeight: 600 }}>
                    Sign In
                </span>
            </p>
        </div>
    );
}
