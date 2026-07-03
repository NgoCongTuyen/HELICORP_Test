function formatPrice(value) {
  return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}

export default function ProductSection({ products, isLoading, favorites, cart, onToggleFavorite, onAddToCart, onViewProduct, onShowCart, onShowFavorites }) {
  return (
    <section className="section product-section">
      <div className="section-intro">
        <span className="eyebrow">Cửa hàng mini</span>
        <h2>Chọn nhanh, lưu lại và mua ngay</h2>
        <p>Danh sách yêu thích và giỏ hàng được điều khiển từ thanh header.</p>
      </div>

      <div className="section-actions">
        <button type="button" className="btn btn-secondary" onClick={onShowFavorites}>
          Xem yêu thích
        </button>
        <button type="button" className="btn btn-secondary" onClick={onShowCart}>
          Xem giỏ hàng
        </button>
      </div>

      <div className="product-grid">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <article key={index} className="product-card skeleton-card">
              <div className="skeleton-image" />
              <div className="skeleton-line short" />
              <div className="skeleton-line" />
              <div className="skeleton-line smaller" />
              <div className="skeleton-button" />
            </article>
          ))
        ) : (
          products.map((product) => (
            <article key={product.id} className="product-card animate-float" onMouseEnter={() => onViewProduct(product.name)}>
              <div className="product-tag">{product.tag}</div>
              <img className="product-image" src={product.image} alt={product.name} width="640" height="400" loading="lazy" decoding="async" />
              <div className="product-copy">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <div className="product-meta">
                  <strong>{formatPrice(product.price)}</strong>
                  <button
                    type="button"
                    className={`icon-button ${favorites.includes(product.id) ? 'active' : ''}`}
                    onClick={() => onToggleFavorite(product.id)}
                  >
                    ❤️
                  </button>
                </div>
              </div>
              <button type="button" className="btn btn-primary product-add" onClick={() => onAddToCart(product.id)}>
                {cart.includes(product.id) ? 'Đã thêm' : 'Thêm vào giỏ'}
              </button>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
