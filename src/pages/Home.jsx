import { useNavigate } from 'react-router-dom';
import { User, Car, LogIn, ChevronRight } from 'lucide-react';

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="main-content" style={{ justifyContent: 'center', gap: '32px' }}>
            <div className="text-center animate-slideUp">
                <h1 style={{ fontSize: '26px', fontWeight: 800, letterSpacing: '-0.5px' }}>
                    Welcome to E-Sawari Pay
                </h1>
                <p className="text-muted mt-8" style={{ fontSize: '15px' }}>
                    Choose your role to continue
                </p>
            </div>

            <div className="flex flex-col gap-16">
                <div
                    className="card card-interactive animate-slideUp stagger-1"
                    onClick={() => navigate('/passenger')}
                    role="button"
                    tabIndex={0}
                    id="role-passenger"
                >
                    <div className="flex items-center gap-16">
                        <div className="icon-circle icon-circle-green">
                            <User size={24} />
                        </div>
                        <div style={{ flex: 1 }}>
                            <h2 style={{ fontSize: '16px', fontWeight: 700 }}>I am a Passenger</h2>
                            <p className="text-muted text-sm">Pay for your ride securely</p>
                        </div>
                        <ChevronRight size={20} className="text-muted" />
                    </div>
                </div>

                <div
                    className="card card-interactive animate-slideUp stagger-2"
                    onClick={() => navigate('/driver')}
                    role="button"
                    tabIndex={0}
                    id="role-driver"
                >
                    <div className="flex items-center gap-16">
                        <div className="icon-circle icon-circle-orange">
                            <Car size={24} />
                        </div>
                        <div style={{ flex: 1 }}>
                            <h2 style={{ fontSize: '16px', fontWeight: 700 }}>I am a Driver</h2>
                            <p className="text-muted text-sm">Manage earnings and payments</p>
                        </div>
                        <ChevronRight size={20} className="text-muted" />
                    </div>
                </div>
            </div>

            <button
                className="btn btn-outline btn-full btn-lg animate-slideUp stagger-3"
                onClick={() => navigate('/signin')}
                id="btn-signin"
            >
                <LogIn size={18} />
                Sign In
            </button>
        </div>
    );
}
