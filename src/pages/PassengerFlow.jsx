import { useState } from 'react';
import {
    Camera, Flashlight, X, CheckCircle, MapPin, ArrowRight
} from 'lucide-react';

const STEPS = ['scan', 'fare', 'processing', 'success'];

export default function PassengerFlow() {
    const [step, setStep] = useState('scan');
    const [baseFare, setBaseFare] = useState('');
    const [flashOn, setFlashOn] = useState(false);

    const serviceFee = baseFare ? (parseFloat(baseFare) * 0.10).toFixed(2) : '0.00';
    const total = baseFare ? (parseFloat(baseFare) + parseFloat(serviceFee)).toFixed(2) : '0.00';
    const tokenNumber = `T-${Math.floor(100 + Math.random() * 900)}`;

    const handleScan = () => {
        setStep('fare');
    };

    const handlePay = () => {
        if (!baseFare || parseFloat(baseFare) <= 0) return;
        setStep('processing');
        setTimeout(() => setStep('success'), 2000);
    };

    if (step === 'scan') {
        return (
            <div className="main-content" style={{ padding: '20px', gap: '16px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: 700 }} className="animate-slideUp">
                    Scan Driver QR
                </h2>
                <div className="scanner-view animate-scaleIn">
                    <div className="scanner-frame">
                        <div className="scanner-line" />
                    </div>
                    <p className="scanner-text">Align QR code within the frame</p>
                    <div className="scanner-controls">
                        <button
                            className="scanner-btn"
                            onClick={() => setFlashOn(!flashOn)}
                            aria-label="Toggle flashlight"
                            style={flashOn ? { background: 'rgba(255,255,255,0.35)' } : {}}
                        >
                            <Flashlight size={20} />
                        </button>
                    </div>
                </div>
                <button
                    className="btn btn-primary btn-full btn-lg animate-slideUp stagger-2"
                    onClick={handleScan}
                    id="btn-simulate-scan"
                >
                    <Camera size={18} />
                    Simulate Scan
                </button>
            </div>
        );
    }

    if (step === 'fare') {
        return (
            <div className="main-content animate-slideUp" style={{ gap: '24px' }}>
                <div>
                    <h2 style={{ fontSize: '18px', fontWeight: 700 }}>Enter Fare</h2>
                    <p className="text-muted text-sm mt-4">Enter the ride fare amount</p>
                </div>

                <div className="card" style={{ padding: '24px' }}>
                    <div className="input-group">
                        <label className="input-label">Base Fare (₹)</label>
                        <input
                            type="number"
                            className="input input-lg"
                            placeholder="0"
                            value={baseFare}
                            onChange={e => setBaseFare(e.target.value)}
                            autoFocus
                            id="input-fare"
                        />
                    </div>
                    <hr className="divider" />
                    <div className="flex justify-between items-center mb-8">
                        <span className="text-muted text-sm">Service Fee (10%)</span>
                        <span className="text-sm font-semibold">₹{serviceFee}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="font-bold">Total Amount</span>
                        <span style={{ fontSize: '22px', fontWeight: 800, color: 'var(--primary)' }}>
                            ₹{total}
                        </span>
                    </div>
                </div>

                <button
                    className="btn btn-primary btn-full btn-lg mt-auto"
                    onClick={handlePay}
                    disabled={!baseFare || parseFloat(baseFare) <= 0}
                    style={!baseFare || parseFloat(baseFare) <= 0 ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
                    id="btn-pay"
                >
                    <ArrowRight size={18} />
                    Pay Now
                </button>
            </div>
        );
    }

    if (step === 'processing') {
        return (
            <div className="main-content" style={{ justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
                <div className="modal-overlay" style={{ background: 'rgba(0,0,0,0.3)' }}>
                    <div className="modal-content text-center flex flex-col items-center gap-20">
                        <div className="spinner" />
                        <p style={{ fontSize: '16px', fontWeight: 600 }}>Processing your payment...</p>
                        <p className="text-muted text-sm">Please wait</p>
                    </div>
                </div>
            </div>
        );
    }

    if (step === 'success') {
        return (
            <div className="main-content" style={{ justifyContent: 'center', alignItems: 'center', gap: '24px' }}>
                <div className="icon-circle icon-circle-green icon-circle-lg animate-bounceIn">
                    <CheckCircle size={42} />
                </div>
                <div className="text-center animate-slideUp stagger-1">
                    <h2 style={{ fontSize: '22px', fontWeight: 800 }}>Payment Successful!</h2>
                    <p className="text-muted mt-8">Your ride has been confirmed</p>
                </div>

                <div className="card w-full animate-slideUp stagger-2" style={{ textAlign: 'center' }}>
                    <p className="text-muted text-sm">Token Number</p>
                    <p style={{ fontSize: '32px', fontWeight: 800, color: 'var(--primary)', letterSpacing: '2px', marginTop: '4px' }}>
                        {tokenNumber}
                    </p>
                </div>

                <div className="card w-full animate-slideUp stagger-3">
                    <div className="flex items-center gap-12">
                        <div className="icon-circle icon-circle-green" style={{ width: 36, height: 36 }}>
                            <MapPin size={18} />
                        </div>
                        <div>
                            <p className="text-xs text-muted">Driver Location</p>
                            <p className="font-semibold" style={{ fontSize: '14px' }}>Near Main Gate</p>
                        </div>
                    </div>
                </div>

                <div className="w-full animate-slideUp stagger-4 mt-16">
                    <p className="text-muted text-sm" style={{ fontSize: '12px', textAlign: 'center' }}>
                        Amount Paid: <strong style={{ color: 'var(--text)' }}>₹{total}</strong>
                    </p>
                </div>
            </div>
        );
    }

    return null;
}
