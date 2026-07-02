export default function Specifications({ specs }) {
  return (
    <section className="section section-split">
      <div className="section-copy animate-slide-left">
        <span className="eyebrow">Thông số kỹ thuật</span>
        <h2>Hiệu năng và thiết kế được tối ưu cho mọi nhu cầu</h2>
        <p>iPhone 16 Pro Max kết hợp màn hình OLED đỉnh cao, chip AI mạnh mẽ và hệ thống camera vượt trội để mang lại trải nghiệm sử dụng thật sự chuyên nghiệp.</p>
        <ul className="spec-list">
          {specs.map((item) => (
            <li key={item.label}>
              <strong>{item.label}</strong>
              <span>{item.value}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="section-visual animate-slide-right">
        <div className="feature-visual-card">
          <div className="info-pill">Kết nối & tối ưu</div>
          <div className="visual-window">
            <div className="graph-line" />
          </div>
          <div className="visual-meta">
            <span>95% thời gian hoạt động</span>
            <span>33ms phản hồi</span>
          </div>
        </div>
      </div>
    </section>
  );
}
