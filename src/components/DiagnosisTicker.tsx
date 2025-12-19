const diagnosisRecords = [
  { time: '2分前', stock: 'トヨタ自動車', icon: '👨' },
  { time: '5分前', stock: 'ソニーグループ', icon: '👩' },
  { time: '8分前', stock: '任天堂', icon: '👨' },
  { time: '12分前', stock: 'ソフトバンクグループ', icon: '👩' },
  { time: '15分前', stock: 'キーエンス', icon: '👨' },
  { time: '18分前', stock: '三菱UFJ', icon: '👩' },
  { time: '22分前', stock: 'ファーストリテイリング', icon: '👨' },
  { time: '25分前', stock: '東京エレクトロン', icon: '👩' },
  { time: '28分前', stock: 'リクルート', icon: '👨' },
  { time: '32分前', stock: 'KDDI', icon: '👩' },
];

export default function DiagnosisTicker() {
  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 overflow-hidden py-2 shadow-lg"
      style={{
        background: 'linear-gradient(135deg, #FF0080 0%, #7928CA 50%, #0070F3 100%)',
      }}
    >
      <div className="animate-scroll-left whitespace-nowrap inline-block">
        {[...diagnosisRecords, ...diagnosisRecords, ...diagnosisRecords].map((record, index) => (
          <span key={index} className="inline-flex items-center mx-4" style={{ color: '#FFFFFF' }}>
            <span
              className="inline-flex items-center justify-center w-6 h-6 mr-2 text-sm"
              style={{
                background: 'rgba(255, 255, 255, 0.25)',
                clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
              }}
            >
              {record.icon}
            </span>
            <span className="text-sm font-medium mr-2" style={{ color: '#E0E0E0' }}>{record.time}</span>
            <span className="text-sm font-bold mr-2">{record.stock}</span>
            <span
              className="text-xs px-2 py-0.5"
              style={{
                background: 'rgba(255, 255, 255, 0.25)',
                clipPath: 'polygon(5% 0%, 95% 0%, 100% 50%, 95% 100%, 5% 100%, 0% 50%)',
              }}
            >
              無料レポート取得
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
