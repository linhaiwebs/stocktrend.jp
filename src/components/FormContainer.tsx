import { ReactNode } from 'react';

interface FormContainerProps {
  children: ReactNode;
}

export default function FormContainer({ children }: FormContainerProps) {
  return (
    <div className="w-[95%] mx-auto">
      <div
        className="px-5 py-8 shadow-2xl"
        style={{
          minHeight: '40vh',
          background: 'linear-gradient(135deg, #FFFFFF 0%, #F8F8F8 100%)',
          clipPath: 'polygon(2% 0%, 98% 0%, 100% 2%, 100% 98%, 98% 100%, 2% 100%, 0% 98%, 0% 2%)',
          border: '2px solid transparent',
          backgroundImage: 'linear-gradient(white, #F8F8F8), linear-gradient(135deg, #FF0080, #7928CA, #0070F3)',
          backgroundOrigin: 'border-box',
          backgroundClip: 'padding-box, border-box',
        }}
      >
        <div className="max-w-md mx-auto">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-left mb-2" style={{ color: '#000000' }}>
              気になる銘柄をチェックしてみましょう
            </h2>
            <p className="text-sm text-left" style={{ color: '#666666' }}>
              銘柄コード または 銘柄名を入力してください
            </p>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
