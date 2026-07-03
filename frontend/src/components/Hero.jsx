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
            <source
              type="image/webp"
              srcSet="/images/banner-480.webp 480w, /images/banner-768.webp 768w, /images/banner-1024.webp 1024w"
              sizes="(max-width: 767px) 100vw, 50vw"
            />
            <img
              src="/images/banner.webp"
              alt="iPhone 16 Pro Max"
              className="hero-image"
              width="680"
              height="425"
              loading="eager"
              decoding="sync"
              fetchpriority="high"
            />
          </picture>
        </div>
      </div>
    </section>
  );
}
