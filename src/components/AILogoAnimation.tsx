export default function AILogoAnimation() {
  return (
    <div className="relative w-full max-w-[240px] h-[240px] mx-auto flex items-center justify-center">
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="absolute w-[190px] h-[190px] rounded-full animate-spin-slow-reverse"
          style={{
            animationDuration: '20s',
            border: '2px solid #E5E5E5',
          }}
        />

        <div
          className="absolute w-[143px] h-[143px] rounded-full animate-spin-medium"
          style={{
            animationDuration: '12s',
            border: '3px solid',
            borderImage: 'linear-gradient(135deg, #FF0080, #7928CA, #0070F3) 1',
          }}
        />

        <div
          className="absolute w-[95px] h-[95px] rounded-full animate-spin-fast-pulse"
          style={{
            animationDuration: '6s',
            border: '5px solid',
            borderImage: 'linear-gradient(135deg, #FF0080, #7928CA, #0070F3) 1',
          }}
        />

        <div
          className="relative z-20 w-20 h-20 flex items-center justify-center shadow-2xl animate-gentle-pulse"
          style={{
            background: 'linear-gradient(135deg, #FF0080, #7928CA, #0070F3)',
            clipPath: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)',
          }}
        >
          <div
            className="text-5xl font-black select-none"
            style={{
              fontFamily: 'Arial Black, sans-serif',
              fontWeight: 900,
              fontStyle: 'italic',
              transform: 'skewX(-10deg)',
              color: '#FFFFFF',
              textShadow: '2px 2px 8px rgba(0,0,0,0.3)',
            }}
          >
            AI
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin-slow-reverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }

        @keyframes spin-medium {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes spin-fast-pulse {
          0% {
            transform: rotate(0deg) scale(1);
          }
          25% {
            transform: rotate(90deg) scale(1.05);
          }
          50% {
            transform: rotate(180deg) scale(1);
          }
          75% {
            transform: rotate(270deg) scale(1.05);
          }
          100% {
            transform: rotate(360deg) scale(1);
          }
        }

        @keyframes gentle-pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(0.96);
          }
        }

        .animate-spin-slow-reverse {
          animation: spin-slow-reverse linear infinite;
        }

        .animate-spin-medium {
          animation: spin-medium ease-in-out infinite;
        }

        .animate-spin-fast-pulse {
          animation: spin-fast-pulse linear infinite;
        }

        .animate-gentle-pulse {
          animation: gentle-pulse 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
