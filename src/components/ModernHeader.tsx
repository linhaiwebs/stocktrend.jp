import { CrystalAILogo } from './CrystalAILogo';

export default function ModernHeader() {
  return (
    <div className="text-center animate-fadeIn relative pt-8 md:pt-12">
      <div className="relative z-20 flex justify-center mb-6">
        <CrystalAILogo size={160} />
      </div>

      <div className="relative z-30">
        <div
          className="inline-block text-sm font-bold px-5 py-2 mb-4 shadow-xl"
          style={{
            clipPath: 'polygon(10% 0%, 90% 0%, 100% 10%, 100% 90%, 90% 100%, 10% 100%, 0% 90%, 0% 10%)',
            background: 'linear-gradient(135deg, #FF0080 0%, #7928CA 50%, #0070F3 100%)',
            color: '#FFFFFF'
          }}
        >
          完全無料 • アカウント不要 • 即座に開始
        </div>
        <p className="text-base md:text-lg leading-relaxed px-4 font-semibold" style={{ color: '#000000' }}>
          <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">銘柄コード</span>を入力するだけで
          <br />
          <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">AIが即座に分析</span>
          <br />
          詳細レポートを取得
        </p>
        <p className="text-xs md:text-sm mt-3" style={{ color: '#666666' }}>
          高速処理 • 利用制限なし • データ保護
        </p>
      </div>
    </div>
  );
}
