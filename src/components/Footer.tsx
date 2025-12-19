import { Link } from 'react-router-dom';
import { Shield, Scale, FileText, Mail, ExternalLink } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 mt-12" style={{ borderTop: '2px solid #E5E5E5' }}>
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 py-8">
        {/* Legal Disclosure Section - Desktop */}
        <div
          className="hidden md:block backdrop-blur-sm p-6 mb-8 shadow-xl"
          style={{
            background: 'linear-gradient(135deg, #FFFFFF 0%, #F8F8F8 100%)',
            clipPath: 'polygon(1% 0%, 99% 0%, 100% 1%, 100% 99%, 99% 100%, 1% 100%, 0% 99%, 0% 1%)',
            border: '2px solid #E5E5E5',
          }}
        >
          <div className="flex items-start gap-4">
            <div
              className="p-3 flex-shrink-0"
              style={{
                background: 'linear-gradient(135deg, #FF0080, #7928CA)',
                clipPath: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)',
              }}
            >
              <Shield className="w-6 h-6" style={{ color: '#FFFFFF' }} />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold mb-3 flex items-center gap-2" style={{ color: '#000000' }}>
                <Scale className="w-5 h-5" />
                金融商品取引法に基づく重要事項
              </h3>

              <div className="space-y-3 text-sm leading-relaxed" style={{ color: '#333333' }}>
                <div className="p-3" style={{ background: '#F8F8F8', borderLeft: '4px solid #7928CA' }}>
                  <p className="font-bold mb-2" style={{ color: '#7928CA' }}>【サービスの性質】</p>
                  <p>
                    本サービスは、AI技術を活用した株式情報の提供および分析ツールです。
                    <strong style={{ color: '#DC2626' }}>投資助言業務、投資一任業務、金融商品仲介業務には該当せず、特定の金融商品の売買を推奨・勧誘するものではありません。</strong>
                  </p>
                </div>

                <div className="p-3" style={{ background: '#F8F8F8', borderLeft: '4px solid #FF0080' }}>
                  <p className="font-bold mb-2" style={{ color: '#FF0080' }}>【投資リスクに関する警告】</p>
                  <p>
                    株式投資には価格変動リスク、信用リスク、流動性リスク等が伴い、
                    <strong style={{ color: '#DC2626' }}>投資元本を割り込む可能性があります。</strong>
                    過去の運用実績は将来の運用成果を保証するものではありません。
                    市場環境の変化により、予想外の損失が発生する可能性があります。
                  </p>
                </div>

                <div className="p-3" style={{ background: '#F8F8F8', borderLeft: '4px solid #0070F3' }}>
                  <p className="font-bold mb-2" style={{ color: '#0070F3' }}>【情報の正確性について】</p>
                  <p>
                    提供される情報は、信頼できると判断した情報源から取得していますが、
                    その正確性、完全性、適時性を保証するものではありません。
                    AI分析結果は参考情報として提供されるものであり、絶対的な投資判断基準ではありません。
                  </p>
                </div>

                <div className="p-3" style={{ background: '#F8F8F8', borderLeft: '4px solid #666666' }}>
                  <p className="font-bold mb-2" style={{ color: '#666666' }}>【投資判断の責任】</p>
                  <p>
                    <strong style={{ color: '#DC2626' }}>最終的な投資判断は、利用者ご自身の責任において行ってください。</strong>
                    本サービスの利用により生じたいかなる損害についても、当社は一切の責任を負いません。
                    投資を行う際は、証券会社等の金融商品取引業者にご相談ください。
                  </p>
                </div>

                <div className="p-3 mt-4" style={{ background: '#F8F8F8' }}>
                  <p className="font-bold mb-1" style={{ color: '#333333' }}>【登録情報】</p>
                  <p className="text-xs" style={{ color: '#666666' }}>
                    当サービス提供者は金融商品取引業者（投資助言・代理業、投資運用業等）ではありません。
                    金融商品取引法第29条の登録を受けた事業者ではないため、個別の投資助言を行うことはできません。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Important Notice - Mobile */}
        <div
          className="md:hidden backdrop-blur-md p-4 text-center mb-6"
          style={{
            background: 'linear-gradient(135deg, #FFFFFF 0%, #F8F8F8 100%)',
            clipPath: 'polygon(2% 0%, 98% 0%, 100% 2%, 100% 98%, 98% 100%, 2% 100%, 0% 98%, 0% 2%)',
            border: '2px solid #E5E5E5',
          }}
        >
          <p className="text-sm font-semibold mb-1" style={{ color: '#7928CA' }}>⚠️ 重要なお知らせ</p>
          <p className="text-xs leading-relaxed" style={{ color: '#333333' }}>
            当サービスは情報提供のみを目的としており、投資助言や投資勧誘を行うものではありません。投資判断は必ずご自身の責任で行ってください。
          </p>
        </div>

        {/* Footer Links Section */}
        <div className="pt-6" style={{ borderTop: '2px solid #E5E5E5' }}>
          <div className="grid grid-cols-2 gap-6 mb-6">
            {/* Legal Documents */}
            <div>
              <h4 className="font-bold mb-3 flex items-center gap-2 text-sm" style={{ color: '#000000' }}>
                <FileText className="w-4 h-4" />
                法的文書
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li>
                  <Link
                    to="/terms"
                    className="hover:underline flex items-center gap-1 transition-colors"
                    style={{ color: '#333333' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#7928CA'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#333333'}
                  >
                    利用規約 <ExternalLink className="w-3 h-3" />
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy"
                    className="hover:underline flex items-center gap-1 transition-colors"
                    style={{ color: '#333333' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#7928CA'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#333333'}
                  >
                    プライバシーポリシー <ExternalLink className="w-3 h-3" />
                  </Link>
                </li>
                <li>
                  <Link
                    to="/specified-commercial-transaction-act"
                    className="hover:underline flex items-center gap-1 transition-colors"
                    style={{ color: '#333333' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#7928CA'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#333333'}
                  >
                    特定商取引法表記 <ExternalLink className="w-3 h-3" />
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold mb-3 flex items-center gap-2 text-sm" style={{ color: '#000000' }}>
                <Mail className="w-4 h-4" />
                お問い合わせ
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li>
                  <Link
                    to="/contact"
                    className="hover:underline flex items-center gap-1 transition-colors"
                    style={{ color: '#333333' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#7928CA'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#333333'}
                  >
                    お問い合わせフォーム <ExternalLink className="w-3 h-3" />
                  </Link>
                </li>
                <li className="flex items-center gap-1" style={{ color: '#333333' }}>
                  <Mail className="w-3 h-3" />
                  <span>support@stockpro.jp</span>
                </li>
                <li className="text-xs" style={{ color: '#666666' }}>
                  受付時間: 24時間受付（返信は営業日内）
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright Section */}
          <div className="pt-4 text-center" style={{ borderTop: '1px solid #E5E5E5' }}>
            <p className="text-xs sm:text-sm mb-2 font-medium" style={{ color: '#333333' }}>
              運営者名：Shueisha International Co., Ltd.
            </p>
            <p className="text-xs sm:text-sm mb-2 font-medium" style={{ color: '#333333' }}>
              お問い合わせ：support@stockpro.jp
            </p>
            <p className="text-xs sm:text-sm mb-2 font-medium" style={{ color: '#000000' }}>
              &copy; {currentYear} Shueisha International Co., Ltd. All rights reserved.
            </p>
            <p className="text-[10px] sm:text-xs leading-relaxed max-w-3xl mx-auto mb-4" style={{ color: '#666666' }}>
              当サイトで提供される情報は投資勧誘を目的としたものではありません。
              投資に関する最終決定は、利用者ご自身の判断でなさるようお願いいたします。
              掲載されている情報の正確性については万全を期しておりますが、その内容の正確性、安全性、有用性を保証するものではありません。
            </p>

          </div>
        </div>
      </div>
    </footer>
  );
}
