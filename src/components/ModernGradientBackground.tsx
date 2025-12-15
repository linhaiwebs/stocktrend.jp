export default function ModernGradientBackground() {
  return (
    <div className="fixed inset-0 w-full h-full z-0">
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background: 'linear-gradient(180deg, #064e3b 0%, #065f46 50%, #047857 100%)'
        }}
      />
    </div>
  );
}
