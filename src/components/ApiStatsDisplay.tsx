import { useEffect, useState } from 'react';
import { Activity, Database, Zap, TrendingUp } from 'lucide-react';
import { apiClient } from '../lib/apiClient';

interface RateLimitStatus {
  rpm: { current: number; limit: number; remaining: number };
  rpd: { current: number; limit: number; remaining: number };
}

interface TodayStats {
  totals: {
    requests_total: number;
    cache_hits: number;
    api_calls: number;
    errors_count: number;
  };
  cacheHitRate: string;
}

interface StatsData {
  rateLimit: RateLimitStatus;
  today: TodayStats;
}

export default function ApiStatsDisplay() {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await apiClient.get('/api/gemini/stats');
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 30000);

    return () => clearInterval(interval);
  }, []);

  if (!stats) return null;

  const cacheHitRate = parseFloat(stats.today.cacheHitRate);
  const apiUsagePercent = (stats.rateLimit.rpd.current / stats.rateLimit.rpd.limit) * 100;

  return (
    <div className="fixed bottom-4 right-4 z-40">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="text-white p-2.5 shadow-lg hover:shadow-xl transition-all hover:scale-110"
          title="API統計を表示"
          style={{
            background: 'linear-gradient(135deg, #FF0080, #7928CA)',
            clipPath: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)',
          }}
        >
          <Activity className="w-5 h-5" />
        </button>
      ) : (
        <div
          className="shadow-xl p-3 w-72"
          style={{
            background: 'linear-gradient(135deg, #FFFFFF 0%, #F8F8F8 100%)',
            clipPath: 'polygon(2% 0%, 98% 0%, 100% 2%, 100% 98%, 98% 100%, 2% 100%, 0% 98%, 0% 2%)',
            border: '2px solid #E5E5E5',
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold flex items-center gap-2" style={{ color: '#000000' }}>
              <Activity className="w-5 h-5" style={{ color: '#7928CA' }} />
              API統計
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-xl leading-none transition-colors"
              style={{ color: '#666666' }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#000000'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#666666'}
            >
              ×
            </button>
          </div>

          <div className="space-y-3">
            <div className="p-3" style={{ background: '#F0F0F0', border: '2px solid #10B981' }}>
              <div className="flex items-center gap-2 mb-1">
                <Database className="w-4 h-4" style={{ color: '#10B981' }} />
                <span className="text-sm font-semibold" style={{ color: '#333333' }}>キャッシュ効率</span>
              </div>
              <div className="text-2xl font-bold" style={{ color: '#10B981' }}>{cacheHitRate.toFixed(1)}%</div>
              <div className="text-xs mt-1" style={{ color: '#666666' }}>
                {stats.today.totals.cache_hits} / {stats.today.totals.requests_total} リクエスト
              </div>
            </div>

            <div className="p-3" style={{ background: '#F0F0F0', border: '2px solid #FF0080' }}>
              <div className="flex items-center gap-2 mb-1">
                <Zap className="w-4 h-4" style={{ color: '#FF0080' }} />
                <span className="text-sm font-semibold" style={{ color: '#333333' }}>今日のAPI使用</span>
              </div>
              <div className="text-2xl font-bold" style={{ color: '#000000' }}>
                {stats.rateLimit.rpd.current} / {stats.rateLimit.rpd.limit}
              </div>
              <div className="w-full h-2 mt-2" style={{ background: '#E5E5E5' }}>
                <div
                  className="h-2 transition-all"
                  style={{
                    width: `${Math.min(apiUsagePercent, 100)}%`,
                    background: apiUsagePercent > 80 ? '#EF4444' : apiUsagePercent > 50 ? '#F59E0B' : '#10B981',
                  }}
                />
              </div>
              <div className="text-xs mt-1" style={{ color: '#666666' }}>残り {stats.rateLimit.rpd.remaining} 回</div>
            </div>

            <div className="p-3" style={{ background: '#F0F0F0', border: '2px solid #0070F3' }}>
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4" style={{ color: '#0070F3' }} />
                <span className="text-sm font-semibold" style={{ color: '#333333' }}>分あたりレート</span>
              </div>
              <div className="text-2xl font-bold" style={{ color: '#000000' }}>
                {stats.rateLimit.rpm.current} / {stats.rateLimit.rpm.limit}
              </div>
              <div className="text-xs mt-1" style={{ color: '#666666' }}>現在の使用状況</div>
            </div>

            {stats.today.totals.errors_count > 0 && (
              <div className="p-2" style={{ background: '#FEE2E2', border: '2px solid #DC2626' }}>
                <div className="text-xs" style={{ color: '#DC2626' }}>
                  エラー: {stats.today.totals.errors_count} 件
                </div>
              </div>
            )}
          </div>

          <div className="mt-3 pt-3" style={{ borderTop: '1px solid #E5E5E5' }}>
            <div className="text-xs text-center" style={{ color: '#666666' }}>
              30秒ごとに自動更新
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
