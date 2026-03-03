import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import {
    Shield, Eye, Zap, QrCode, History, Wallet,
    CheckCircle, XCircle, ArrowRight, X
} from 'lucide-react';

const mockHistory = [
    { id: 1, date: '28 Feb 2026', amount: '₹25.00', status: 'success' },
    { id: 2, date: '27 Feb 2026', amount: '₹18.50', status: 'success' },
    { id: 3, date: '26 Feb 2026', amount: '₹32.00', status: 'failed' },
    { id: 4, date: '25 Feb 2026', amount: '₹22.00', status: 'success' },
    { id: 5, date: '24 Feb 2026', amount: '₹15.00', status: 'success' },
];

export default function DriverFlow() {
    const [step, setStep] = useState('onboarding');
    const [showQR, setShowQR] = useState(false);

    if (step === 'onboarding') {
        return (
            <div className="main-content" style={{ gap: '24px' }}>
                <div className="animate-slideUp">
                    <h2 style={{ fontSize: '20px', fontWeight: 800 }}>AutoPay Setup</h2>
                    <p className="text-muted text-sm mt-4">
                        Enable automatic commission deduction for a hassle-free experience
                    </p>
                </div>

                <div className="flex flex-col gap-12">
                    {[
                        { icon: Shield, title: 'Secure', desc: 'Bank-grade encryption for all transactions', color: 'green' },
                        { icon: Eye, title: 'Transparent', desc: 'Track every deduction in real-time', color: 'green' },
                        { icon: Zap, title: 'No Manual Hassles', desc: 'Automatic processing, zero effort', color: 'orange' },
                    ].map(({ icon: Icon, title, desc, color }, i) => (
                        <div key={title} className={`card animate-slideUp stagger-${i + 1}`}>
                            <div className="flex items-center gap-16">
                                <div className={`icon-circle icon-circle-${color}`}>
                                    <Icon size={22} />
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '15px', fontWeight: 700 }}>{title}</h3>
                                    <p className="text-muted text-sm">{desc}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <button
                    className="btn btn-primary btn-full btn-lg mt-auto animate-slideUp stagger-4"
                    onClick={() => setStep('dashboard')}
                    id="btn-setup-autopay"
                >
                    <ArrowRight size={18} />
                    Set Up AutoPay
                </button>
            </div>
        );
    }

    if (step === 'dashboard') {
        return (
            <div className="main-content" style={{ gap: '20px' }}>
                <div className="animate-slideUp">
                    <h2 style={{ fontSize: '20px', fontWeight: 800 }}>Driver Dashboard</h2>
                    <p className="text-muted text-sm mt-4">Your earnings overview</p>
                </div>

                <div className="stats-grid animate-slideUp stagger-1">
                    <div className="stat-card">
                        <p className="stat-label">Today's Earnings</p>
                        <p className="stat-value" style={{ color: 'var(--primary)' }}>₹450</p>
                    </div>
                    <div className="stat-card">
                        <p className="stat-label">Total Earnings</p>
                        <p className="stat-value">₹12,350</p>
                    </div>
                </div>

                <div className="card animate-slideUp stagger-2">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-muted text-sm">Pending Commission</p>
                            <p style={{ fontSize: '20px', fontWeight: 800, color: 'var(--orange)' }}>₹45.00</p>
                        </div>
                        <span className="badge badge-orange">AutoPay Active</span>
                    </div>
                </div>

                <div className="flex flex-col gap-12 animate-slideUp stagger-3">
                    <button
                        className="btn btn-primary btn-full"
                        onClick={() => setShowQR(true)}
                        id="btn-show-qr"
                    >
                        <QrCode size={18} />
                        Show QR Code
                    </button>
                    <button
                        className="btn btn-outline btn-full"
                        onClick={() => setStep('history')}
                        id="btn-history"
                    >
                        <History size={18} />
                        Debit History
                    </button>
                    <button className="btn btn-outline btn-full" id="btn-withdraw">
                        <Wallet size={18} />
                        Withdraw
                    </button>
                </div>

                {showQR && (
                    <div className="modal-overlay" onClick={() => setShowQR(false)}>
                        <div className="modal-content text-center flex flex-col items-center gap-20" onClick={e => e.stopPropagation()}>
                            <div className="flex justify-between items-center w-full">
                                <h3 style={{ fontSize: '16px', fontWeight: 700 }}>Your QR Code</h3>
                                <button className="btn btn-ghost" onClick={() => setShowQR(false)} style={{ padding: '6px' }}>
                                    <X size={20} />
                                </button>
                            </div>
                            <div style={{
                                padding: '20px',
                                background: 'white',
                                borderRadius: 'var(--radius-md)',
                                border: '1px solid var(--border)'
                            }}>
                                <QRCodeSVG
                                    value="esawari-pay://driver/DRV-2026-0042"
                                    size={200}
                                    fgColor="#1a1a1a"
                                    level="H"
                                />
                            </div>
                            <p className="text-muted text-sm">
                                Show this QR to passengers for instant payments
                            </p>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    if (step === 'history') {
        return (
            <div className="main-content" style={{ gap: '20px' }}>
                <div className="flex justify-between items-center animate-slideUp">
                    <div>
                        <h2 style={{ fontSize: '20px', fontWeight: 800 }}>Commission History</h2>
                        <p className="text-muted text-sm mt-4">Recent deductions</p>
                    </div>
                    <button className="btn btn-ghost text-sm" onClick={() => setStep('dashboard')}>
                        Back
                    </button>
                </div>

                <div className="card animate-slideUp stagger-1" style={{ padding: '4px 20px' }}>
                    {mockHistory.map((item, i) => (
                        <div key={item.id} className="history-item">
                            <div className="flex items-center gap-12">
                                {item.status === 'success' ? (
                                    <div className="icon-circle icon-circle-green" style={{ width: 32, height: 32 }}>
                                        <CheckCircle size={16} />
                                    </div>
                                ) : (
                                    <div className="icon-circle" style={{ width: 32, height: 32, background: 'rgba(239,68,68,0.1)', color: 'var(--danger)' }}>
                                        <XCircle size={16} />
                                    </div>
                                )}
                                <div>
                                    <p className="font-semibold" style={{ fontSize: '14px' }}>{item.amount}</p>
                                    <p className="text-muted text-xs">{item.date}</p>
                                </div>
                            </div>
                            <span className={`badge ${item.status === 'success' ? 'badge-success' : 'badge-danger'}`}>
                                {item.status}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return null;
}
