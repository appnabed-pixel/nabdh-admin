'use client';
import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, ThumbsUp, MessageCircle, Clock } from 'lucide-react';
import Topbar from '@/components/layout/Topbar';
import { api } from '@/lib/api';

type Status = 'all' | 'pending' | 'flagged' | 'approved';

const typeLabel: Record<string, { label: string; color: string }> = {
  crowdUpdate: { label: 'ازدحام', color: 'bg-red-100 text-red-600' },
  recommendation: { label: 'توصية', color: 'bg-yellow-100 text-yellow-600' },
  availability: { label: 'توفر منتج', color: 'bg-blue-100 text-blue-600' },
  tip: { label: 'نصيحة', color: 'bg-purple-100 text-purple-600' },
};

function timeAgo(iso: string) {
  const diff = (Date.now() - new Date(iso).getTime()) / 60000;
  if (diff < 60) return `منذ ${Math.floor(diff)} دقيقة`;
  return `منذ ${Math.floor(diff / 60)} ساعة`;
}

export default function FeedPage() {
  const [filter, setFilter] = useState<Status>('all');
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.feed().then((r: any) => setPosts(r.items || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = posts.filter(p => filter === 'all' || p.status === filter);

  const approve = async (id: string) => {
    try {
      const r: any = await api.approveFeed(id);
      setPosts(prev => prev.map(p => p.id === id ? r.post : p));
    } catch (e) { console.error(e); }
  };

  const reject = async (id: string) => {
    try {
      await api.deleteFeed(id);
      setPosts(prev => prev.filter(p => p.id !== id));
    } catch (e) { console.error(e); }
  };

  const counts = {
    all: posts.length,
    pending: posts.filter(p => p.status === 'pending').length,
    flagged: posts.filter(p => p.status === 'flagged').length,
    approved: posts.filter(p => p.status === 'approved').length,
  };

  return (
    <div>
      <Topbar title="تدقيق المنشورات" subtitle="مراجعة وإدارة منشورات مجتمع سطيف" />
      <div className="p-6 space-y-4">

        <div className="flex gap-2 bg-white p-1 rounded-xl border border-gray-100 w-fit">
          {(['all', 'pending', 'flagged', 'approved'] as Status[]).map(s => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === s ? 'bg-emerald-500 text-white shadow-sm' : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              {{ all: 'الكل', pending: 'معلّق', flagged: 'مبلّغ عنه', approved: 'موافق عليه' }[s]}
              <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${
                filter === s ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
              }`}>{counts[s]}</span>
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {loading ? (
            <div className="py-16 text-center text-gray-400">جاري التحميل...</div>
          ) : filtered.map(post => {
            const type = typeLabel[post.type] ?? { label: post.type, color: 'bg-gray-100 text-gray-600' };
            return (
              <div key={post.id} className={`bg-white rounded-2xl border shadow-sm p-5 ${
                post.status === 'flagged' ? 'border-red-200 bg-red-50/30' :
                post.status === 'pending' ? 'border-orange-200' : 'border-gray-100'
              }`}>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {post.userName[0]}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="font-semibold text-gray-800 text-sm">{post.userName}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${type.color}`}>{type.label}</span>
                      {post.status === 'flagged' && <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-semibold">🚩 مبلّغ عنه</span>}
                      {post.status === 'pending' && <span className="text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full font-semibold">⏳ معلّق</span>}
                    </div>

                    <p className="text-gray-700 text-sm leading-relaxed">{post.content}</p>

                    {post.placeName && (
                      <p className="text-xs text-emerald-600 mt-1.5">📍 {post.placeName}</p>
                    )}

                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                      <span className="flex items-center gap-1"><ThumbsUp size={12} /> {post.likes}</span>
                      <span className="flex items-center gap-1"><MessageCircle size={12} /> {post.comments}</span>
                      <span className="flex items-center gap-1"><Clock size={12} /> {timeAgo(post.createdAt)}</span>
                    </div>
                  </div>

                  {post.status !== 'approved' && (
                    <div className="flex gap-2 flex-shrink-0">
                      <button
                        onClick={() => approve(post.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 text-xs font-semibold rounded-lg transition-colors"
                      >
                        <CheckCircle size={13} /> قبول
                      </button>
                      <button
                        onClick={() => reject(post.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-500 text-xs font-semibold rounded-lg transition-colors"
                      >
                        <XCircle size={13} /> رفض
                      </button>
                    </div>
                  )}
                  {post.status === 'approved' && (
                    <span className="text-xs text-emerald-500 font-semibold flex-shrink-0 flex items-center gap-1">
                      <CheckCircle size={14} /> موافق
                    </span>
                  )}
                </div>
              </div>
            );
          })}

          {!loading && filtered.length === 0 && (
            <div className="py-16 text-center text-gray-400">
              <p className="text-4xl mb-3">📭</p>
              <p className="font-medium">لا توجد منشورات</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
