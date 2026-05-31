'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff, Zap, ArrowLeft, AlertCircle, Check } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (res.ok) router.push('/dashboard');
      else setError('البريد الإلكتروني أو كلمة المرور غير صحيحة');
    } catch {
      setError('تعذر الاتصال بالخادم');
    }
    setLoading(false);
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', fontFamily: 'Cairo, sans-serif', background: '#F8FAFC' }}>

      {/* Form side — LEFT (in RTL this appears on left) */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', minWidth: 0 }}>
        <div style={{ width: '100%', maxWidth: 440 }} dir="rtl">

          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 40 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: 'linear-gradient(135deg,#14B8A6,#0EA5E9)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Zap size={20} color="#fff" strokeWidth={2.5} />
            </div>
            <span style={{ fontSize: 22, fontWeight: 800, color: '#0F172A' }}>نبض</span>
          </div>

          {/* Heading */}
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <h1 style={{ fontSize: 26, fontWeight: 800, color: '#0F172A', marginBottom: 8 }}>تسجيل الدخول</h1>
            <p style={{ fontSize: 14, color: '#64748B' }}>أدخل بياناتك للوصول إلى لوحة التحكم</p>
          </div>

          {/* Card */}
          <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 20, padding: '32px 28px', boxShadow: '0 4px 32px rgba(0,0,0,0.07)' }}>

            {/* Email */}
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 8 }}>
                البريد الإلكتروني
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} color="#94A3B8" style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  placeholder="admin@nabdh.app"
                  style={{
                    width: '100%', height: 52, background: '#F8FAFC',
                    border: `1.5px solid ${error ? '#FCA5A5' : '#E2E8F0'}`,
                    borderRadius: 12, paddingRight: 44, paddingLeft: 16,
                    fontSize: 14, color: '#0F172A', fontFamily: 'Cairo, sans-serif', outline: 'none',
                  }}
                  onFocus={e => { e.target.style.borderColor = '#14B8A6'; e.target.style.boxShadow = '0 0 0 4px rgba(20,184,166,0.12)'; e.target.style.background = '#fff'; }}
                  onBlur={e => { e.target.style.borderColor = error ? '#FCA5A5' : '#E2E8F0'; e.target.style.boxShadow = 'none'; e.target.style.background = '#F8FAFC'; }}
                />
              </div>
            </div>

            {/* Password */}
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 8 }}>
                كلمة المرور
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} color="#94A3B8" style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  style={{
                    width: '100%', height: 52, background: '#F8FAFC',
                    border: `1.5px solid ${error ? '#FCA5A5' : '#E2E8F0'}`,
                    borderRadius: 12, paddingRight: 44, paddingLeft: 48,
                    fontSize: 16, color: '#0F172A', fontFamily: 'Cairo, sans-serif', outline: 'none',
                  }}
                  onFocus={e => { e.target.style.borderColor = '#14B8A6'; e.target.style.boxShadow = '0 0 0 4px rgba(20,184,166,0.12)'; e.target.style.background = '#fff'; }}
                  onBlur={e => { e.target.style.borderColor = error ? '#FCA5A5' : '#E2E8F0'; e.target.style.boxShadow = 'none'; e.target.style.background = '#F8FAFC'; }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(v => !v)}
                  style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#94A3B8', background: 'none', border: 'none', cursor: 'pointer', padding: 2 }}
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            {/* Remember */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <button
                type="button"
                onClick={() => setRemember(v => !v)}
                style={{
                  width: 20, height: 20, borderRadius: 6, flexShrink: 0,
                  border: `2px solid ${remember ? '#14B8A6' : '#CBD5E1'}`,
                  background: remember ? '#14B8A6' : '#fff',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.15s',
                }}
              >
                {remember && <Check size={11} color="#fff" strokeWidth={3} />}
              </button>
              <span style={{ fontSize: 13, color: '#475569', cursor: 'pointer' }}
                onClick={() => setRemember(v => !v)}>
                تذكرني لمدة 30 يوماً
              </span>
            </div>

            {/* Error */}
            {error && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 10, background: '#FEF2F2', border: '1px solid #FECACA', marginBottom: 20 }}>
                <AlertCircle size={15} color="#EF4444" style={{ flexShrink: 0 }} />
                <span style={{ fontSize: 13, color: '#DC2626', fontWeight: 500 }}>{error}</span>
              </div>
            )}

            {/* Button */}
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={loading}
              style={{
                width: '100%', height: 52, borderRadius: 12,
                background: loading ? '#94A3B8' : 'linear-gradient(135deg,#14B8A6,#0EA5E9)',
                border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
                color: '#fff', fontSize: 15, fontWeight: 700,
                fontFamily: 'Cairo, sans-serif',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                boxShadow: loading ? 'none' : '0 6px 20px rgba(20,184,166,0.35)',
                transition: 'all 0.2s',
              }}
            >
              {loading ? (
                <>
                  <div style={{ width: 18, height: 18, border: '2.5px solid rgba(255,255,255,0.4)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
                  جاري التحقق...
                </>
              ) : (
                <>دخول إلى لوحة التحكم <ArrowLeft size={16} /></>
              )}
            </button>

          </div>

          <p style={{ textAlign: 'center', fontSize: 12, color: '#94A3B8', marginTop: 20 }}>
            هذه اللوحة مخصصة للمشرفين المعتمدين فقط
          </p>
        </div>
      </div>

      {/* Brand side — RIGHT */}
      <div style={{
        width: '44%', minWidth: 380, display: 'none', flexDirection: 'column',
        padding: '48px 52px', position: 'relative', overflow: 'hidden',
        background: 'linear-gradient(155deg, #0C1A2E 0%, #0D3D38 55%, #0E7065 100%)',
      }} className="lg:flex" dir="rtl">

        {/* Grid texture */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.05,
          backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }} />
        {/* Glow */}
        <div style={{
          position: 'absolute', bottom: '-80px', right: '-80px',
          width: 360, height: 360, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(20,184,166,0.2) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* Logo top */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 38, height: 38, borderRadius: 10, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Zap size={17} color="#fff" strokeWidth={2.5} />
          </div>
          <div>
            <p style={{ color: '#fff', fontWeight: 700, fontSize: 15, lineHeight: 1.2 }}>نبض</p>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>Nabd Admin</p>
          </div>
        </div>

        {/* Main copy */}
        <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: 48, paddingBottom: 40 }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: '#5EEAD4', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 16 }}>
            لوحة تحكم سطيف
          </p>
          <h2 style={{ fontSize: 34, fontWeight: 800, color: '#fff', lineHeight: 1.25, marginBottom: 16 }}>
            أدر مجتمعك<br />
            <span style={{ color: '#5EEAD4' }}>بكل سهولة</span>
          </h2>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, marginBottom: 36, maxWidth: 320 }}>
            أدر مجتمع سطيف، التوصيات، تقارير الازدحام ونشاط المدينة من مكان واحد.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              'إدارة الأماكن والخريطة الحية',
              'مراجعة الأسئلة والتوصيات',
              'تقارير الازدحام في الوقت الفعلي',
              'إشعارات فورية لجميع المستخدمين',
            ].map(f => (
              <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(94,234,212,0.15)', border: '1px solid rgba(94,234,212,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Check size={11} color="#5EEAD4" strokeWidth={3} />
                </div>
                <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)' }}>{f}</span>
              </div>
            ))}
          </div>
        </div>

        <p style={{ position: 'relative', fontSize: 12, color: 'rgba(255,255,255,0.2)' }}>
          © 2025 نبض — سطيف، الجزائر
        </p>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .lg\\:flex { display: flex !important; }
        @media (max-width: 1023px) { .lg\\:flex { display: none !important; } }
      `}</style>
    </div>
  );
}
