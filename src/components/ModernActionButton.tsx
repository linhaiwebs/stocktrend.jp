interface ModernActionButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export default function ModernActionButton({ onClick, disabled = false }: ModernActionButtonProps) {
  return (
    <>
      <div className="relative animate-fadeIn mt-6" style={{ animationDelay: '0.3s' }}>
        <button
          onClick={onClick}
          disabled={disabled}
          className="w-full text-gray-900 font-bold py-4 px-6 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          style={{
            backgroundColor: disabled ? '#D1D5DB' : '#FFC93C',
            height: '56px'
          }}
        >
          <span className="text-lg">分析を確認する（無料）</span>
        </button>
      </div>
      <div className="mt-4 text-center space-y-3">
        <p className="text-xs text-gray-600 leading-relaxed">
          本サービスは「情報提供サービス」であり、投資助言ではありません。
        </p>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
          <p className="text-xs font-semibold text-gray-800 mb-1">重要なお知らせ</p>
          <p className="text-xs text-gray-700 leading-relaxed">
            本サービスは、一般的な情報提供を目的としたものであり、<br />
            特定の銘柄の売買を推奨・助言するものではありません。<br />
            最終的な投資判断は、必ずご自身の責任において行ってください。
          </p>
        </div>
      </div>
    </>
  );
}
