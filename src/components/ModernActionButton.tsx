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
          className="w-full font-bold py-4 px-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          style={{
            background: disabled ? '#E5E5E5' : 'linear-gradient(135deg, #FF0080 0%, #7928CA 50%, #0070F3 100%)',
            color: disabled ? '#666666' : '#FFFFFF',
            clipPath: 'polygon(3% 0%, 97% 0%, 100% 3%, 100% 97%, 97% 100%, 3% 100%, 0% 97%, 0% 3%)',
            height: '56px',
            border: 'none',
          }}
        >
          <span className="text-lg">分析を確認する（無料）</span>
        </button>
      </div>
      <div className="mt-4 text-center">
        <p className="text-xs leading-relaxed" style={{ color: '#666666' }}>
          本サービスは「情報提供サービス」であり、投資助言ではありません。
        </p>
      </div>
    </>
  );
}
