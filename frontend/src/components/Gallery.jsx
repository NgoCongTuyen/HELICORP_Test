export default function Gallery() {
  return (
    <section className="section gallery-section">
      <div className="section-intro">
        <span className="eyebrow">Bộ sưu tập sản phẩm</span>
        <h2>Khám phá vẻ đẹp và công nghệ của iPhone 16 Pro Max</h2>
      </div>
      <div className="gallery-grid">
        <article className="gallery-card">
          <img
            className="gallery-media"
            src="/images/thietke.png"
            alt="Thiết kế Titanium"
            loading="lazy"
            decoding="async"
          />
          <h3>Thiết kế Titanium cao cấp</h3>
          <p>Khung Titanium độc quyền 4 màu sắc: Đen, Trắng, Tự Nhiên, Sa Mạc với cảm giác cầm cực tinh tế.</p>
        </article>
        <article className="gallery-card">
          <img
            className="gallery-media"
            src="/images/camera.png"
            alt="Camera Fusion"
            loading="lazy"
            decoding="async"
          />
          <h3>Camera Fusion 48MP</h3>
          <p>Quay 4K Dolby Vision 120fps, Telephoto 5x Optical Zoom, chụp đêm cực sắc nét với sensor 2nd-gen OIS.</p>
        </article>
        <article className="gallery-card">
          <img
            className="gallery-media"
            src="/images/manhinh.png"
            alt="Màn hình Super Retina"
            loading="lazy"
            decoding="async"
          />
          <h3>Màn hình Super Retina XDR</h3>
          <p>6.9 inch OLED với độ phân giải 2868 × 1320 pixels, ProMotion 120Hz, độ sáng peak 3000 nits.</p>
        </article>
      </div>
    </section>
  );
}
