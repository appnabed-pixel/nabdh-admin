'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff, Zap, ArrowLeft, AlertCircle, CheckCircle2 } from 'lucide-react';

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
      if (res.ok) {
        router.push('/dashboard');
      } else {
        setError('البريد الإلكتروني أو كلمة المرور غير صحيحة');
      }
    } catch {
      setError('تعذر الاتصال بالخادم. تحقق من اتصالك.');
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex" style={{ background: '#F8FAFC', fontFamily: 'Cairo, sans-serif' }} dir="rtl">

      {/* Right — Brand Panel */}
      <div
        className="hidden lg:flex flex-col w-[46%] p-14 relative overflow-hidden"
        style={{ background: 'linear-gradient(150deg, #0C1A2E 0%, #0D3D38 55%, #0E7065 100%)' }}
      >
        {/* Grid texture */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }} />
        {/* Glow */}
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full pointer-events-none" style={{
          background: 'radial-gradient(circle, rgba(20,184,166,0.18) 0%, transparent 70%)',
          transform: 'translate(-30%, 30%)',
        }} />

        {/* Logo */}
        <div className="relative flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}>
            <Zap size={18} className="text-white" strokeWidth={2.5} />
          </div>
          <div>
            <p className="text-white font-bold text-base leading-none">نبض</p>
            <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>Nabd Admin</p>
          </div>
        </div>

        {/* Main copy */}
        <div className="relative flex-1 flex flex-col justify-center" style={{ paddingTop: 48, paddingBottom: 32 }}>
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#5EEAD4' }}>
              لوحة تحكم سطيف
            </p>
            <h1 className="font-bold leading-tight" style={{ color: '#fff', fontSize: 36 }}>
              أدر مجتمعك<br />
              <span style={{ color: '#5EEAD4' }}>بكل سهولة</span>
            </h1>
            <p className="mt-5 leading-relaxed text-sm" style={{ color: 'rgba(255,255,255,0.55)', maxWidth: 320 }}>
              أدر مجتمع سطيف، التوصيات، تقارير الازدحام ونشاط المدينة — كل شيء من مكان واحد.
            </p>
          </div>

          {/* Features */}
          <div className="space-y-3">
            {[
              'إدارة الأماكن والخريطة الحية',
              'مراجعة الأسئلة والتوصيات',
              'تقارير الازدحام في الوقت الفعلي',
              'إشعارات فورية لجميع المستخدمين',
            ].map(f => (
              <div key={f} className="flex items-center gap-3">
                <CheckCircle2 size={15} style={{ color: '#5EEAD4', flexShrink: 0 }} strokeWidth={2} />
                <span className="text-sm" style={{ color: 'rgba(255,255,255,0.65)' }}>{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="relative">
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>© 2025 نبض — سطيف، الجزائر</p>
        </div>
      </div>

      {/* Left — Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-16">
        <div style={{ width: '100%', maxWidth: 450 }}>

          {/* Logo (mobile + desktop above form) */}
          <div className="flex items-center justify-center gap-2.5 mb-10">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #14B8A6, #0EA5E9)' }}>
              <Zap size={17} className="text-white" strokeWidth={2.5} />
            </div>
            <span className="font-bold" style={{ color: '#0F172A', fontSize: 18 }}>نبض</span>
          </div>

          {/* Heading */}
          <div className="text-center mb-8">
            <h2 className="font-bold" style={{ color: '#0F172A', fontSize: 26 }}>تسجيل الدخول</h2>
            <p className="mt-2 text-sm" style={{ color: '#64748B' }}>
              أدخل بياناتك للوصول إلى لوحة التحكم
            </p>
          </div>

          {/* Card */}
          <div className="rounded-2xl p-8" style={{ background: '#fff', border: '1px solid #E8EDF2', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#374151' }}>
                  البريد الإلكتروني
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: '#94A3B8' }} />
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    placeholder="admin@nabdh.app"
                    style={{
                      width: '100%',
                      height: 52,
                      background: '#F8FAFC',
                      border: `1.5px solid ${error ? '#FCA5A5' : '#E2E8F0'}`,
                      borderRadius: 12,
                      paddingRight: 44,
                      paddingLeft: 16,
                      fontSize: 14,
                      color: '#0F172A',
                      fontFamily: 'Cairo, sans-serif',
                      outline: 'none',
                      transition: 'border-color 0.15s, box-shadow 0.15s',
                    }}
                    onFocus={e => {
                      e.target.style.borderColor = '#14B8A6';
                      e.target.style.boxShadow = '0 0 0 4px rgba(20,184,166,0.1)';
                      e.target.style.background = '#fff';
                    }}
                    onBlur={e => {
                      e.target.style.borderColor = error ? '#FCA5A5' : '#E2E8F0';
                      e.target.style.boxShadow = 'none';
                      e.target.style.background = '#F8FAFC';
                    }}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#374151' }}>
                  كلمة المرور
                </label>
                <div className="relative">
                  <Lock size={16} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: '#94A3B8' }} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    style={{
                      width: '100%',
                      height: 52,
                      background: '#F8FAFC',
                      border: `1.5px solid ${error ? '#FCA5A5' : '#E2E8F0'}`,
                      borderRadius: 12,
                      paddingRight: 44,
                      paddingLeft: 48,
                      fontSize: 15,
                      color: '#0F172A',
                      fontFamily: 'Cairo, sans-serif',
                      outline: 'none',
                      transition: 'border-color 0.15s, box-shadow 0.15s',
                    }}
                    onFocus={e => {
                      e.target.style.borderColor = '#14B8A6';
                      e.target.style.boxShadow = '0 0 0 4px rgba(20,184,166,0.1)';
                      e.target.style.background = '#fff';
                    }}
                    onBlur={e => {
                      e.target.style.borderColor = error ? '#FCA5A5' : '#E2E8F0';
                      e.target.style.boxShadow = 'none';
                      e.target.style.background = '#F8FAFC';
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(v => !v)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-0.5 rounded transition-colors"
                    style={{ color: '#94A3B8' }}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Remember */}
              <div className="flex items-center gap-3 pt-1">
                <div
                  onClick={() => setRemember(v => !v)}
                  className="relative cursor-pointer flex-shrink-0"
                  style={{ width: 20, height: 20 }}
                >
                  <div style={{
                    width: 20,
                    height: 20,
                    borderRadius: 5,
                    border: `2px solid ${remember ? '#14B8A6' : '#CBD5E1'}`,
                    background: remember ? '#14B8A6' : '#fff',
                    transition: 'all 0.15s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    {remember && <svg width="11" height="8" viewBox="0 0 11 8" fill="none"><path d="M1 4L4 7L10 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                  </div>
                </div>
                <label
                  onClick={() => setRemember(v => !v)}
                  className="text-sm cursor-pointer select-none"
                  style={{ color: '#475569' }}
                >
                  تذكرني لمدة 30 يوماً
                </label>
              </div>

              {/* Error */}
              {error && (
                <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl" style={{ background: '#FEF2F2', border: '1px solid #FECACA' }}>
                  <AlertCircle size={16} style={{ color: '#EF4444', flexShrink: 0 }} />
                  <p className="text-sm font-medium" style={{ color: '#DC2626' }}>{error}</p>
                </div>
              )}

              {/* Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 font-bold text-white rounded-xl transition-all"
                style={{
                  height: 52,
                  fontSize: 15,
                  background: loading ? '#94A3B8' : 'linear-gradient(135deg, #14B8A6 0%, #0EA5E9 100%)',
                  boxShadow: loading ? 'none' : '0 4px 18px rgba(20,184,166,0.4)',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  border: 'none',
                  marginTop: 4,
                }}
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    جاري التحقق...
                  </>
                ) : (
                  <>
                    دخول إلى لوحة التحكم
                    <ArrowLeft size={16} />
                  </>
                )}
              </button>

            </form>
          </div>

          <p className="text-center text-xs mt-6" style={{ color: '#94A3B8' }}>
            هذه اللوحة مخصصة للمشرفين المعتمدين فقط
          </p>

        </div>
      </div>

    </div>
  );
}
