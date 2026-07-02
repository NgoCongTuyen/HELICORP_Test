export default function NewsletterForm({ email, status, onEmailChange, onSubmit }) {
  return (
    <section className="section section-newsletter" id="signup">
      <div className="newsletter-card animate-fade-up">
        <div>
          <span className="eyebrow">Nhận tin</span>
          <h2>Đăng ký để nhận ưu đãi và thông tin mới nhất</h2>
          <p>Nhận ngay tin tức về giá bán, chương trình mở bán và các tính năng mới của iPhone 16 Pro Max.</p>
        </div>
        <form onSubmit={onSubmit} className="newsletter-form">
          <label htmlFor="email">Email của bạn</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            placeholder="nhập email tại đây"
            required
          />
          <button type="submit" className="btn btn-primary">Gửi đăng ký</button>
        </form>
        {status && <p className="form-status">{status}</p>}
      </div>
    </section>
  );
}
