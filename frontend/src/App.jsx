import { useEffect, useRef, useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Features from './components/Features.jsx';
import Gallery from './components/Gallery.jsx';
import DealCalculator from './components/DealCalculator.jsx';
import ProductSection from './components/ProductSection.jsx';
import Specifications from './components/Specifications.jsx';
import NewsletterForm from './components/NewsletterForm.jsx';
import Footer from './components/Footer.jsx';

const products = [
  { id: 1, name: 'iPhone 16 Pro Max Edition', price: 32990000, description: 'Phiên bản cao cấp với chip A18 Pro và camera chuyên nghiệp.', tag: 'Hàng hot', image: '/images/iphone.webp' },
  { id: 2, name: 'iPhone 16 Pro Midnight', price: 30990000, description: 'Màu Đen Midnight sang trọng, bộ nhớ 512GB.', tag: 'Đề xuất', image: '/images/thietke.webp' },
  { id: 3, name: 'iPhone 16 Pro Sand', price: 28990000, description: 'Phiên bản Sa Mạc với màu sắc ấn tượng và hiệu năng ổn định.', tag: 'Mới', image: '/images/manhinh.webp' },
  { id: 4, name: 'iPhone 16 Pro Starter', price: 24990000, description: 'Lựa chọn hợp lý cho người dùng cần thiết kế và hiệu năng tối ưu.', tag: 'Tiết kiệm', image: '/images/camera.webp' },
];

const features = [
  { title: 'Chip A18 Pro mạnh mẽ', description: 'Hiệu năng đỉnh cao với xử lý AI on-device, ray tracing phần cứng cho chơi game và render video 4K Dolby Vision.', icon: '⚡' },
  { title: 'Camera Fusion 48MP', description: 'Hệ thống 3 ống kính với quay 4K Dolby Vision 120fps, Telephoto 5x Optical Zoom, chụp đêm cực sắc nét.', icon: '📷' },
  { title: 'Pin bền bỉ', description: 'Dung lượng pin lớn và sạc nhanh 45W, tối ưu cho mọi nhu cầu sử dụng.', icon: '🔋' },
  { title: 'Màn hình ProMotion', description: 'OLED 120Hz, độ sáng cao và độ tương phản vượt trội cho trải nghiệm hình ảnh mượt mà.', icon: '🖥️' },
];

const specs = [
  { label: 'Độ phân giải', value: '2868 × 1320 pixels (460 ppi)' },
  { label: 'Tần số quét', value: 'ProMotion 120Hz' },
  { label: 'Chip', value: 'A18 Pro' },
  { label: 'RAM', value: '8GB' },
  { label: 'Bộ nhớ', value: '256GB / 512GB / 1TB' },
  { label: 'Camera sau', value: '48MP Fusion + 48MP Ultra Wide + 12MP Telephoto 5x' },
  { label: 'Camera trước', value: '12MP TrueDepth' },
];

function sendAnalytics() {
  // noop in local dev
}

function formatPrice(value) {
  return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [favorites, setFavorites] = useState([]); // array of product ids
  const [cart, setCart] = useState([]); // array of product ids
  const [viewed, setViewed] = useState([]);
  const [page, setPage] = useState('home');
  const [productLoading, setProductLoading] = useState(true);
  const favoritesSectionRef = useRef(null);
  const cartSectionRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem('smartvision-dark');
    setDarkMode(saved === 'true');
    const savedF = JSON.parse(localStorage.getItem('smartvision-favorites') || '[]');
    const savedC = JSON.parse(localStorage.getItem('smartvision-cart') || '[]');
    const savedV = JSON.parse(localStorage.getItem('smartvision-viewed') || '[]');
    setFavorites(savedF);
    setCart(savedC);
    setViewed(savedV);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('theme-dark', darkMode);
    localStorage.setItem('smartvision-dark', darkMode);
    sendAnalytics('theme-toggle', { darkMode });
  }, [darkMode]);

  useEffect(() => {
    const t = setTimeout(() => setProductLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    localStorage.setItem('smartvision-favorites', JSON.stringify(favorites));
  }, [favorites]);
  useEffect(() => {
    localStorage.setItem('smartvision-cart', JSON.stringify(cart));
  }, [cart]);
  useEffect(() => {
    localStorage.setItem('smartvision-viewed', JSON.stringify(viewed));
  }, [viewed]);

  useEffect(() => {
    if (page === 'favorites' && favoritesSectionRef.current) favoritesSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    if (page === 'cart' && cartSectionRef.current) cartSectionRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [page]);

  const heroOffset = 0;

  const toggleFavorite = (id) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const addToCart = (id) => {
    setCart((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const removeFromCart = (id) => setCart((prev) => prev.filter((x) => x !== id));

  const viewProduct = (name) => setViewed((prev) => [name, ...prev.filter((x) => x !== name)].slice(0, 5));

  const navigateTo = (target) => {
    setPage(target);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const heroStyles = {
    backgroundImage: 'radial-gradient(circle at top, rgba(56, 189, 248, 0.18), transparent 40%), linear-gradient(135deg, #0f172a 0%, transparent 70%)',
  };

  return (
    <div className="page-shell">
      <Navbar
        darkMode={darkMode}
        onToggle={() => setDarkMode((p) => !p)}
        favoritesCount={favorites.length}
        cartCount={cart.length}
        page={page}
        onShowFavorites={() => navigateTo('favorites')}
        onShowCart={() => navigateTo('cart')}
      />
      <main>
        <Hero heroStyles={heroStyles} />

        {page === 'home' && (
          <>
            <Features features={features} />
            <Gallery />
            <ProductSection
              products={products}
              isLoading={productLoading}
              favorites={favorites}
              cart={cart}
              viewed={viewed}
              onToggleFavorite={toggleFavorite}
              onAddToCart={addToCart}
              onViewProduct={viewProduct}
              onShowCart={() => navigateTo('cart')}
              onShowFavorites={() => navigateTo('favorites')}
            />
            <DealCalculator price={32990000} />
            <Specifications specs={specs} />
          </>
        )}

        {page === 'favorites' && (
          <section ref={favoritesSectionRef} className="section page-section">
            <div className="page-actions">
              <button className="btn btn-secondary" onClick={() => navigateTo('home')}>← Quay lại</button>
            </div>
            <div className="section-intro">
              <span className="eyebrow">Yêu thích</span>
              <h2>Sản phẩm bạn đã lưu</h2>
            </div>
            {favorites.length > 0 ? (
              <div className="product-grid favorite-grid">
                {favorites.map((id) => {
                  const p = products.find((x) => x.id === id);
                  if (!p) return null;
                  return (
                    <article key={p.id} className="product-card">
                      <img className="product-image" src={p.image} alt={p.name} />
                      <div className="product-copy">
                        <h3>{p.name}</h3>
                        <p>{p.description}</p>
                        <div className="product-meta">
                          <strong>{formatPrice(p.price)}</strong>
                          <button className="btn btn-secondary btn-sm" onClick={() => toggleFavorite(p.id)}>Xóa</button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="empty-state"><p>Chưa có sản phẩm yêu thích.</p></div>
            )}
          </section>
        )}

        {page === 'cart' && (
          <section ref={cartSectionRef} className="section page-section">
            <div className="page-actions">
              <button className="btn btn-secondary" onClick={() => navigateTo('home')}>← Quay lại</button>
            </div>
            <div className="section-intro">
              <span className="eyebrow">Giỏ hàng</span>
              <h2>Sản phẩm trong giỏ của bạn</h2>
            </div>
            {cart.length > 0 ? (
              <div className="product-grid cart-grid">
                {cart.map((id) => {
                  const p = products.find((x) => x.id === id);
                  if (!p) return null;
                  return (
                    <article key={p.id} className="product-card">
                      <img className="product-image" src={p.image} alt={p.name} />
                      <div className="product-copy">
                        <h3>{p.name}</h3>
                        <p>{p.description}</p>
                        <div className="product-meta">
                          <strong>{formatPrice(p.price)}</strong>
                          <button className="btn btn-secondary btn-sm" onClick={() => removeFromCart(p.id)}>Xóa</button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="empty-state"><p>Giỏ hàng đang trống.</p></div>
            )}
          </section>
        )}

        <NewsletterForm />
      </main>
      <Footer />
    </div>
  );
}
