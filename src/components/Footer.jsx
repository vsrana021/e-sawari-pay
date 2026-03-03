export default function Footer() {
    return (
        <footer className="footer">
            <span className="footer-tagline">Secure • Fast • Reliable</span>
            <div className="footer-status">
                <span className="badge badge-success">Auth: connected</span>
                <span className="badge badge-offline">Backend: offline</span>
            </div>
        </footer>
    );
}
