export default function Gallery() {
  return (
    <section className="section gallery-section">
      <div className="section-intro">
        <span className="eyebrow">Bộ sưu tập sản phẩm</span>
        <h2>Khám phá vẻ đẹp và công nghệ của iPhone 16 Pro Max</h2>
      </div>
      <div className="gallery-grid">
        <article className="gallery-card">
          <picture>
            <source type="image/avif" srcSet="/images/optimized/thietke-320.avif 320w, /images/optimized/thietke-640.avif 640w, /images/optimized/thietke-1024.avif 1024w" sizes="(max-width:600px) 100vw, 640px" />
            <source type="image/webp" srcSet="/images/optimized/thietke-320.webp 320w, /images/optimized/thietke-640.webp 640w, /images/optimized/thietke-1024.webp 1024w" sizes="(max-width:600px) 100vw, 640px" />
            <img className="gallery-media" src="/images/optimized/thietke-640.webp" alt="Thiết kế Titanium" loading="lazy" decoding="async" />
          </picture>
          <h3>Thiết kế Titanium cao cấp</h3>
          <p>Khung Titanium độc quyền 4 màu sắc: Đen, Trắng, Tự Nhiên, Sa Mạc với cảm giác cầm cực tinh tế.</p>
        </article>
        <article className="gallery-card">
          <picture>
            <source type="image/avif" srcSet="/images/optimized/camera-320.avif 320w, /images/optimized/camera-640.avif 640w, /images/optimized/camera-1024.avif 1024w" sizes="(max-width:600px) 100vw, 640px" />
            <source type="image/webp" srcSet="/images/optimized/camera-320.webp 320w, /images/optimized/camera-640.webp 640w, /images/optimized/camera-1024.webp 1024w" sizes="(max-width:600px) 100vw, 640px" />
            <img className="gallery-media" src="/images/optimized/camera-640.webp" alt="Camera Fusion" loading="lazy" decoding="async" />
          </picture>
          <h3>Camera Fusion 48MP</h3>
          <p>Quay 4K Dolby Vision 120fps, Telephoto 5x Optical Zoom, chụp đêm cực sắc nét với sensor 2nd-gen OIS.</p>
        </article>
        <article className="gallery-card">
          <picture>
            <source type="image/avif" srcSet="/images/optimized/manhinh-320.avif 320w, /images/optimized/manhinh-640.avif 640w, /images/optimized/manhinh-1024.avif 1024w" sizes="(max-width:600px) 100vw, 640px" />
            <source type="image/webp" srcSet="/images/optimized/manhinh-320.webp 320w, /images/optimized/manhinh-640.webp 640w, /images/optimized/manhinh-1024.webp 1024w" sizes="(max-width:600px) 100vw, 640px" />
            <img className="gallery-media" src="/images/optimized/manhinh-640.webp" alt="Màn hình Super Retina" loading="lazy" decoding="async" />
          </picture>
          <h3>Màn hình Super Retina XDR</h3>
          <p>6.9 inch OLED với độ phân giải 2868 × 1320 pixels, ProMotion 120Hz, độ sáng peak 3000 nits.</p>
        </article>
      </div>
    </section>
  );
}
