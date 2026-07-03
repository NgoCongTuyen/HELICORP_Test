export default function Hero({ heroStyles }) {
  return (
    <section className="hero" style={heroStyles}>
      <div className="hero-copy">
        <span className="eyebrow">Điện thoại thông minh mới</span>
        <h1>iPhone 16 Pro Max - Đỉnh cao công nghệ trong tay bạn</h1>
        <p>Thiết kế sang trọng, màn hình OLED siêu sắc nét và hệ thống camera chuyên nghiệp giúp bạn ghi lại mọi khoảnh khắc như một chuyên gia.</p>
        <div className="hero-actions">
          <a href="#features" className="btn btn-primary">Xem ưu điểm</a>
          <a href="#signup" className="btn btn-secondary">Nhận thông tin</a>
        </div>
      </div>
      <div className="hero-card" aria-label="Phone preview">
        <div className="device-shell">
          <picture>
            <source type="image/avif" srcSet="/images/optimized/iphone16-320.avif 320w, /images/optimized/iphone16-640.avif 640w, /images/optimized/iphone16-1024.avif 1024w, /images/optimized/iphone16-1600.avif 1600w" sizes="(max-width:600px) 100vw, 700px" />
            <source type="image/webp" srcSet="/images/optimized/iphone16-320.webp 320w, /images/optimized/iphone16-640.webp 640w, /images/optimized/iphone16-1024.webp 1024w, /images/optimized/iphone16-1600.webp 1600w" sizes="(max-width:600px) 100vw, 700px" />
            <img src="/images/optimized/iphone16-1024.webp" alt="iPhone 16 Pro Max" className="hero-image" loading="eager" width="700" height="420" decoding="sync" />
          </picture>
        </div>
      </div>
    </section>
  );
}
