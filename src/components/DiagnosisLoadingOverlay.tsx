import { useEffect, useState } from 'react';

interface DiagnosisLoadingOverlayProps {
  isVisible: boolean;
  progress: number;
  onComplete?: () => void;
}

export default function DiagnosisLoadingOverlay({
  isVisible,
  progress,
  onComplete
}: DiagnosisLoadingOverlayProps) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (progress >= 100 && isVisible) {
      setIsExiting(true);
      const timer = setTimeout(() => {
        if (onComplete) {
          onComplete();
        }
      }, 500);
      return () => clearTimeout(timer);
    } else if (!isVisible) {
      setIsExiting(false);
    }
  }, [progress, isVisible, onComplete]);

  useEffect(() => {
    if (isVisible) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      document.body.setAttribute('data-modal-open', 'true');

      return () => {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        document.body.removeAttribute('data-modal-open');
        window.scrollTo(0, scrollY);
      };
    }
  }, [isVisible]);

  if (!isVisible && !isExiting) return null;

  return (
    <div
      className={`fixed inset-0 z-[9997] flex items-center justify-center p-4 bg-white/95 backdrop-blur-md transition-opacity duration-500 ${
        isExiting ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{ touchAction: 'none' }}
    >
      <div className={`w-full max-w-2xl transition-transform duration-500 ${
        isExiting ? 'scale-95' : 'scale-100'
      }`}>
        <div
          className="border-2 rounded-2xl shadow-2xl p-8"
          style={{
            background: 'linear-gradient(to bottom right, #F8F9FA, #FFFFFF, #F8F9FA)',
            borderColor: 'rgba(51, 51, 51, 0.2)'
          }}
        >
          <div className="flex justify-center mb-6">
            <div className="relative w-24 h-24">
              <div
                className="absolute inset-0 rounded-full animate-pulse opacity-50"
                style={{ background: 'linear-gradient(to bottom right, #4B5563, #6B7280)' }}
              ></div>
              <div
                className="absolute inset-2 rounded-full flex items-center justify-center"
                style={{ background: 'linear-gradient(to bottom right, #374151, #4B5563)' }}
              >
                <span className="text-4xl">🤖</span>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">AI分析を実行中</h3>
            <p className="text-sm text-center text-gray-700">市場データを深度分析しています...</p>
          </div>

          <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden mb-3 border" style={{ borderColor: 'rgba(51, 51, 51, 0.2)' }}>
            <div
              className="absolute top-0 left-0 h-full transition-all duration-300 ease-out shadow-lg"
              style={{
                width: `${Math.min(progress, 100)}%`,
                background: 'linear-gradient(to right, #374151, #4B5563)',
                boxShadow: '0 0 20px rgba(55, 65, 81, 0.3)'
              }}
            />
          </div>

          <div className="mb-6 text-center">
            <span className="text-sm font-semibold text-gray-800">
              {Math.floor(Math.min(progress, 100))}%
            </span>
          </div>

          <div className="bg-gray-100 border-2 rounded-lg p-6 backdrop-blur-sm" style={{ borderColor: 'rgba(51, 51, 51, 0.2)' }}>
            <div className="space-y-3 text-sm">
              <p className="text-gray-900 font-semibold text-center text-base">
                📊 AIが複数の指標を総合的に評価中
              </p>
              <p className="text-center text-gray-700">
                しばらくお待ちください
              </p>
              <div className="pt-3 border-t border-gray-300">
                <p className="text-xs text-gray-600 text-center leading-relaxed">
                  すべてのデータは公開されている市場情報を使用しており、公開市場データに基づいて分析を行っています。本分析は最新のAI技術により、財務指標、業界動向、市場トレンドを総合的に評価しています。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
