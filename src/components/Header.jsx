import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const isHome = location.pathname === '/';

    return (
        <header className="header">
            {!isHome && (
                <button className="header-back" onClick={() => navigate(-1)} aria-label="Go back">
                    <ArrowLeft size={18} />
                </button>
            )}
            <span className="header-brand">E-Sawari Pay</span>
        </header>
    );
}
