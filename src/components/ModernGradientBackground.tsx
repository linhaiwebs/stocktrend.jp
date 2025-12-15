export default function ModernGradientBackground() {
  return (
    <div className="fixed inset-0 w-full h-full z-0">
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background: 'linear-gradient(180deg, #d1fae5 0%, #a7f3d0 50%, #6ee7b7 100%)'
        }}
      />
    </div>
  );
}
