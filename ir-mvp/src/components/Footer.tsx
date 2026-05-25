import Link from 'next/link';
import { navLinks } from '@/data/ir-data';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="w-full bg-surface-container border-t border-outline-variant mt-20">
      <div className="max-w-container-max mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <span className="font-headline text-xl font-bold text-vab-primary">VietABank IR</span>
            <p className="mt-3 text-sm text-on-surface-variant max-w-md leading-relaxed">
              Nền tảng Quan hệ Nhà đầu tư chính thức của VietABank. Cam kết minh bạch, tuân thủ pháp luật và tạo giá trị bền vững cho cổ đông.
            </p>
            <div className="mt-4 flex items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">Đăng ký nhận tin:</span>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Email của bạn"
                  className="form-input form-input-sm w-48 text-xs"
                />
                <button className="btn btn-primary btn-sm">
                  Đăng ký
                </button>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-vab-primary mb-4">Liên kết nhanh</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-on-surface-variant hover:text-vab-primary transition-colors underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-vab-primary mb-4">Liên hệ IR</h4>
            <ul className="space-y-3 text-sm text-on-surface-variant">
              <li>
                <span className="font-semibold block text-on-surface">Bộ phận Quan hệ Nhà đầu tư</span>
              </li>
              <li>
                <span className="font-semibold block">Email:</span>
                <a href="mailto:ir@vietabank.com.vn" className="hover:text-vab-primary transition-colors underline">ir@vietabank.com.vn</a>
              </li>
              <li>
                <span className="font-semibold block">Điện thoại:</span>
                <a href="tel:+842412345678" className="hover:text-vab-primary transition-colors underline">+84 24 1234 5678</a>
              </li>
              <li>
                <span className="font-semibold block">Địa chỉ:</span>
                <span>Tầng 20, Tòa nhà VietABank Tower, 123 Nguyễn Huệ, Quận 1, TP.HCM</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-outline-variant pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-on-surface-variant">
          <p>© {currentYear} VietABank. Mọi quyền được bảo lưu. Thành viên Ủy ban Chứng khoán Nhà nước.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-vab-primary transition-colors underline">Chính sách bảo mật</Link>
            <Link href="#" className="hover:text-vab-primary transition-colors underline">Điều khoản sử dụng</Link>
            <Link href="#" className="hover:text-vab-primary transition-colors underline">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
