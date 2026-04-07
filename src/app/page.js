'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ThreeBackground from '@/components/ThreeBackground';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | sent | verified
  const router = useRouter();

  const handleSendLink = (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus('sent');
    
    // Simulate user checking email and clicking link after a delay
    setTimeout(() => {
      setStatus('verified');
      localStorage.setItem('urbanDripUserEmail', email);
      setTimeout(() => {
        router.push('/store');
      }, 1500);
    }, 2500);
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-3d-bg">
        <ThreeBackground />
      </div>

      <div className="auth-panel">
        <h1 className="brand-font">UrbanDrip</h1>
        <p className="tagline">Wear Your Story</p>

        {status === 'idle' && (
          <form onSubmit={handleSendLink}>
            <div className="form-group">
              <label>Email Address</label>
              <input 
                type="email" 
                className="form-control" 
                placeholder="you@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn-primary">
              Send Magic Link
            </button>
          </form>
        )}

        {status === 'sent' && (
          <div>
            <h3 style={{ color: 'var(--maroon)', marginBottom: '1rem' }}>Check your inbox!</h3>
            <p style={{ color: 'var(--text-main)', fontSize: '0.9rem' }}>
              We've sent a verification link to <strong>{email}</strong>.
            </p>
            <p style={{ marginTop: '1rem', fontSize: '0.8rem', color: 'var(--bg-dark-warm)'}}>
              (Simulating Email Verification...)
            </p>
          </div>
        )}

        {status === 'verified' && (
          <div>
            <h3 style={{ color: 'var(--amber)', marginBottom: '1rem' }}>Verified!</h3>
            <p style={{ color: 'var(--text-main)', fontSize: '0.9rem' }}>
              Taking you to the store...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
