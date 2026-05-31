'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff, Zap, ArrowLeft, AlertCircle } from 'lucide-react';

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
      <div className="hidden lg:flex flex-col justify-between w-[45%] p-12 relative overflow-hidden" style={{ background: 'linear-gradient(145deg, #0F172A 0%, #134E4A 60%, #14B8A6 100%)' }}>
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

        {/* Top */}
        <div className="relative">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(10px)' }}>
              <Zap size={18} className="text-white" strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-white font-bold text-lg leading-none">نبض</p>
              <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.5)' }}>Nabd • سطيف</p>
            </div>
          </div>
        </div>

        {/* Center */}
        <div className="relative space-y-6">
          <div className="space-y-3">
            <h1 className="text-4xl font-bold text-white leading-tight">
              لوحة تحكم<br />
              <span style={{ color: '#5EEAD4' }}>نبض</span>
            </h1>
            <p className="text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)', maxWidth: 340 }}>
              أدر مجتمع سطيف، التوصيات، تقارير الازدحام ونشاط المدينة — كل شيء من مكان واحد.
            </p>
          </div>

          {/* Feature pills */}
          <div className="flex flex-wrap gap-2">
            {['إدارة الأماكن', 'تقارير الازدحام', 'الأسئلة والإجابات', 'إشعارات فورية'].map(f => (
              <span key={f} className="text-xs px-3 py-1.5 rounded-full font-medium" style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.75)', border: '1px solid rgba(255,255,255,0.1)' }}>
                {f}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="relative">
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
            © 2025 نبض — سطيف، الجزائر
          </p>
        </div>
      </div>

      {/* Left — Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full" style={{ maxWidth: 400 }}>

          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #14B8A6, #0EA5E9)' }}>
              <Zap size={15} className="text-white" strokeWidth={2.5} />
            </div>
            <span className="font-bold text-sm" style={{ color: '#0F172A' }}>نبض — لوحة التحكم</span>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold" style={{ color: '#0F172A' }}>مرحباً</h2>
            <p className="text-sm mt-1" style={{ color: '#64748B' }}>سجّل دخولك للمتابعة</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: '#374151' }}>
                البريد الإلكتروني
              </label>
              <div className="relative">
                <Mail size={15} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: '#94A3B8' }} />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  placeholder="admin@nabdh.app"
                  className="w-full text-sm rounded-xl pr-9 pl-4 py-2.5 outline-none transition-all"
                  style={{
                    background: '#fff',
                    border: `1px solid ${error ? '#FCA5A5' : '#E2E8F0'}`,
                    color: '#0F172A',
                    fontFamily: 'Cairo, sans-serif',
                  }}
                  onFocus={e => { e.target.style.borderColor = '#14B8A6'; e.target.style.boxShadow = '0 0 0 3px rgba(20,184,166,0.1)'; }}
                  onBlur={e => { e.target.style.borderColor = error ? '#FCA5A5' : '#E2E8F0'; e.target.style.boxShadow = 'none'; }}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: '#374151' }}>
                كلمة المرور
              </label>
              <div className="relative">
                <Lock size={15} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: '#94A3B8' }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full text-sm rounded-xl pr-9 pl-10 py-2.5 outline-none transition-all"
                  style={{
                    background: '#fff',
                    border: `1px solid ${error ? '#FCA5A5' : '#E2E8F0'}`,
                    color: '#0F172A',
                    fontFamily: 'Cairo, sans-serif',
                  }}
                  onFocus={e => { e.target.style.borderColor = '#14B8A6'; e.target.style.boxShadow = '0 0 0 3px rgba(20,184,166,0.1)'; }}
                  onBlur={e => { e.target.style.borderColor = error ? '#FCA5A5' : '#E2E8F0'; e.target.style.boxShadow = 'none'; }}
                />
                <button type="button" onClick={() => setShowPassword(v => !v)} className="absolute left-3 top-1/2 -translate-y-1/2 p-0.5 rounded transition-colors" style={{ color: '#94A3B8' }}>
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Remember */}
            <div className="flex items-center gap-2">
              <input
                id="remember"
                type="checkbox"
                checked={remember}
                onChange={e => setRemember(e.target.checked)}
                className="rounded"
                style={{ accentColor: '#14B8A6', width: 15, height: 15 }}
              />
              <label htmlFor="remember" className="text-xs select-none cursor-pointer" style={{ color: '#64748B' }}>
                تذكرني
              </label>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl" style={{ background: '#FEF2F2', border: '1px solid #FECACA' }}>
                <AlertCircle size={14} style={{ color: '#EF4444', flexShrink: 0 }} />
                <p className="text-xs font-medium" style={{ color: '#DC2626' }}>{error}</p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold text-white transition-all"
              style={{
                background: loading ? '#94A3B8' : 'linear-gradient(135deg, #14B8A6, #0EA5E9)',
                boxShadow: loading ? 'none' : '0 4px 14px rgba(20,184,166,0.35)',
                cursor: loading ? 'not-allowed' : 'pointer',
              }}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  جاري التحقق...
                </>
              ) : (
                <>
                  دخول
                  <ArrowLeft size={15} />
                </>
              )}
            </button>

          </form>

          <p className="text-center text-xs mt-6" style={{ color: '#94A3B8' }}>
            هذه اللوحة مخصصة للمشرفين المعتمدين فقط
          </p>
        </div>
      </div>

    </div>
  );
}
