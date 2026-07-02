export default function Features({ features }) {
  return (
    <section className="section" id="features">
      <div className="section-intro">
        <span className="eyebrow">Tính năng nổi bật</span>
        <h2>Đẳng cấp trải nghiệm từ một chiếc điện thoại thông minh</h2>
      </div>
      <div className="feature-grid">
        {features.map((item) => (
          <article key={item.title} className="feature-card animate-float">
            <div className="feature-icon">{item.icon}</div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
