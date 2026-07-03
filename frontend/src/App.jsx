import { useEffect, useMemo, useRef, useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Features from './components/Features.jsx';
import Gallery from './components/Gallery.jsx';
import DealCalculator from './components/DealCalculator.jsx';
import ProductSection from './components/ProductSection.jsx';
import Specifications from './components/Specifications.jsx';
import NewsletterForm from './components/NewsletterForm.jsx';
import Footer from './components/Footer.jsx';

const features = [
  {
    title: 'Chip A18 Pro mạnh mẽ',
    description: 'Hiệu năng đỉnh cao với xử lý AI on-device, ray tracing phần cứng cho chơi game và render video 4K Dolby Vision.',
    icon: '⚡',
  },
  {
    title: 'Camera Fusion 48MP',
    description: 'Hệ thống 3 ống kính với quay 4K Dolby Vision 120fps, Telephoto 5x Optical Zoom, chụp đêm cực sắc nét.',
    icon: '📷',
  },
  {
    title: 'Pin tốt nhất từng có',
    description: 'Thời lượng pin được Apple công bố là tốt nhất trên dòng iPhone, hỗ trợ sạc qua USB-C và MagSafe.',
    icon: '🔋',
  },
];

const specs = [
  { label: 'Màn hình', value: '6.9 inch Super Retina XDR OLED' },
  { label: 'Độ phân giải', value: '2868 × 1320 pixels (460 ppi)' },
  { label: 'Tần số quét', value: 'ProMotion 120Hz' },
  { label: 'Chip', value: 'A18 Pro' },
  { label: 'RAM', value: '8GB' },
  { label: 'Bộ nhớ', value: '256GB / 512GB / 1TB' },
  { label: 'Camera sau', value: '48MP Fusion + 48MP Ultra Wide + 12MP Telephoto 5x' },
  { label: 'Camera trước', value: '12MP TrueDepth' },
  { label: 'Video', value: '4K Dolby Vision đến 120fps' },
  { label: 'Pin', value: 'Tốt nhất từng có trên iPhone' },
  { label: 'Kết nối', value: 'Wi-Fi 7, Bluetooth 5.3, NFC, USB-C' },
  { label: 'Thiết kế', value: 'Khung Titanium, Ceramic Shield' },
  { label: 'Chống nước', value: 'IP68' },
  { label: 'Hệ điều hành', value: 'iOS 18' },
];

const storySteps = [
  {
    title: 'Bước 1: Gợi cảm hứng',
    description: 'Từ thiết kế Titanium đến màn hình OLED siêu sắc nét, mỗi chi tiết đều được kể theo cách tinh tế.',
  },
  {
    title: 'Bước 2: Khám phá tính năng',
    description: 'Camera Fusion 48MP, chip A18 Pro và pin mạnh mẽ tạo nên trải nghiệm di động vượt trội.',
  },
  {
    title: 'Bước 3: Quyết định nhanh chóng',
    description: 'Lưu sản phẩm yêu thích, thêm vào giỏ hàng và xem lại danh sách đã xem ngay trên trang.',
  },
];

const products = [
  {
    id: 1,
    name: 'iPhone 16 Pro Max Edition',
    price: 32990000,
    description: 'Phiên bản cao cấp với chip A18 Pro và camera chuyên nghiệp.',
    tag: 'Hàng hot',
    image: '/images/iphone16.jpg',
  },
  {
    id: 2,
    name: 'iPhone 16 Pro Midnight',
    price: 30990000,
    description: 'Màu Đen Midnight sang trọng, bộ nhớ 512GB.',
    tag: 'Đề xuất',
    image: '/images/thietke.png',
  },
  {
    id: 3,
    name: 'iPhone 16 Pro Sand',
    price: 28990000,
    description: 'Phiên bản Sa Mạc với màu sắc ấn tượng và hiệu năng ổn định.',
    tag: 'Mới',
    image: '/images/manhinh.png',
  },
  {
    id: 4,
    name: 'iPhone 16 Pro Starter',
    price: 24990000,
    description: 'Lựa chọn hợp lý cho người dùng cần thiết kế và hiệu năng tối ưu.',
    tag: 'Tiết kiệm',
    image: '/images/camera.png',
  },
];

const aiReplies = {
  hello: 'Xin chào! Tôi có thể giúp bạn tìm hiểu về iPhone 16 Pro Max mới nhất.',
  camera: 'Điện thoại này sở hữu camera siêu nét, chống rung quang học và chụp đêm cực chất.',
  battery: 'Pin 5000mAh cùng sạc nhanh 45W giúp bạn dùng cả ngày mà không lo hết pin.',
  default: 'iPhone 16 Pro Max mang đến hiệu năng đỉnh cao, camera chuyên nghiệp và thiết kế sang trọng.',
};

function sendAnalytics(eventType, payload = {}) {
  const info = {
    eventType,
    timestamp: new Date().toISOString(),
    ...payload,
  };
  console.debug('Analytics event:', info);
}

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, author: 'bot', text: 'Chào bạn! Tôi có thể giúp gì cho bạn về iPhone 16 Pro Max?' },
  ]);
  const [input, setInput] = useState('');
  const [productLoading, setProductLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [cart, setCart] = useState([]);
  const [viewed, setViewed] = useState([]);
  const [page, setPage] = useState('home');
  const [heroOffset, setHeroOffset] = useState(0);
  const favoritesSectionRef = useRef(null);
  const cartSectionRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem('smartvision-dark');
    setDarkMode(saved === 'true');
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('theme-dark', darkMode);
    localStorage.setItem('smartvision-dark', darkMode);
    sendAnalytics('theme-toggle', { darkMode });
  }, [darkMode]);

  useEffect(() => {
    document.documentElement.classList.toggle('theme-dark', darkMode);
    localStorage.setItem('smartvision-dark', darkMode);
    sendAnalytics('theme-toggle', { darkMode });
  }, [darkMode]);

  useEffect(() => {
    const handleScroll = () => {
      sendAnalytics('scroll', { scrollY: window.scrollY });
      setHeroOffset(window.scrollY * 0.08);
    };
    const handleClick = (event) => sendAnalytics('click', { target: event.target.tagName });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('smartvision-favorites') || '[]');
    const savedCart = JSON.parse(localStorage.getItem('smartvision-cart') || '[]');
    const savedViewed = JSON.parse(localStorage.getItem('smartvision-viewed') || '[]');
    setFavorites(savedFavorites);
    setCart(savedCart);
    setViewed(savedViewed);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setProductLoading(false), 1200);
    return () => clearTimeout(timer);
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
    if (page === 'favorites' && favoritesSectionRef.current) {
      favoritesSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    if (page === 'cart' && cartSectionRef.current) {
      cartSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [page]);

  const favoriteProducts = products.filter((product) => favorites.includes(product.id));
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartItems = cart
    .map((item) => {
      const product = products.find((product) => product.id === item.id);
      return product ? { ...product, quantity: item.quantity } : null;
    })
    .filter(Boolean);

  const heroStyles = useMemo(
    () => ({
      backgroundImage: 'radial-gradient(circle at top, rgba(56, 189, 248, 0.18), transparent 40%), linear-gradient(135deg, #0f172a 0%, transparent 70%)',
      backgroundPosition: `center calc(40% + ${heroOffset}px)`,
    }),
    [heroOffset]
  );

  const navigateTo = (target) => {
    setPage(target);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('Vui lòng nhập email hợp lệ.');
      return;
    }
    sendAnalytics('newsletter-submit', { email });
    setStatus('Đăng ký thành công! Cảm ơn bạn đã quan tâm.');
    localStorage.setItem('newsletter-email', email);
    setEmail('');
  };

  const handleChatSend = (text) => {
    if (!text.trim()) return;
    const userMessage = { id: Date.now(), author: 'user', text: text.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    sendAnalytics('chat-message', { question: text });

    const normalized = text.trim().toLowerCase();
    const matched = Object.keys(aiReplies).find((key) => normalized.includes(key));
    const replyText = aiReplies[matched] || aiReplies.default;
    setMessages((prev) => [...prev, { id: Date.now() + 1, author: 'bot', text: replyText }]);
  };

  return (
    <div className="page-shell">
      <Navbar
        darkMode={darkMode}
        onToggle={() => setDarkMode((prev) => !prev)}
        favoritesCount={favorites.length}
        cartCount={cartCount}
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
            <section className="section story-section">
              <div className="section-intro">
                <span className="eyebrow">Câu chuyện thương hiệu</span>
                <h2>Trải nghiệm iPhone như một hành trình đẳng cấp</h2>
              </div>
              <div className="story-grid">
                {storySteps.map((step) => (
                  <article key={step.title} className="story-card animate-slide-right">
                    <span className="story-step">{step.title}</span>
                    <p>{step.description}</p>
                  </article>
                ))}
              </div>
            </section>
            <ProductSection
              products={products}
              isLoading={productLoading}
              favorites={favorites}
              cart={cart}
              viewed={viewed}
              onToggleFavorite={(id) => {
                setFavorites((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
              }}
              onAddToCart={(id) => {
                setCart((prev) => {
                  const exists = prev.find((item) => item.id === id);
                  if (exists) {
                    return prev.map((item) =>
                      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
                    );
                  }
                  return [...prev, { id, quantity: 1 }];
                });
              }}
              onViewProduct={(name) => {
                setViewed((prev) => [name, ...prev.filter((item) => item !== name)].slice(0, 5));
              }}
              onShowCart={() => setPage('cart')}
              onShowFavorites={() => setPage('favorites')}
            />
            <DealCalculator price={32990000} />
            <Specifications specs={specs} />
          </>
        )}

        {page === 'favorites' && (
          <section ref={favoritesSectionRef} className="section page-section">
            <div className="page-actions">
              <button className="btn btn-secondary" type="button" onClick={() => navigateTo('home')}>
                ← Quay lại
              </button>
            </div>
            <div className="section-intro">
              <span className="eyebrow">Yêu thích</span>
              <h2>Sản phẩm bạn đã lưu</h2>
              <p>Đây là danh sách các sản phẩm đã được thêm vào yêu thích của bạn.</p>
            </div>
            {favoriteProducts.length > 0 ? (
              <div className="product-grid favorite-grid">
                {favoriteProducts.map((product) => (
                  <article key={product.id} className="product-card">
                      <img className="product-image" src={product.image} alt={product.name} loading="lazy" decoding="async" width="600" height="400" />
                    <div className="product-copy">
                      <h3>{product.name}</h3>
                      <p>{product.description}</p>
                      <div className="product-meta favorite-meta">
                        <strong>{product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</strong>
                        <button className="btn btn-secondary btn-sm" type="button" onClick={() => setFavorites((prev) => prev.filter((item) => item !== product.id))}>
                          Xóa
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>Chưa có sản phẩm yêu thích. Nhấn ❤️ trong danh sách sản phẩm để thêm vào.</p>
              </div>
            )}
          </section>
        )}

        {page === 'cart' && (
          <section ref={cartSectionRef} className="section page-section">
            <div className="page-actions">
              <button className="btn btn-secondary" type="button" onClick={() => navigateTo('home')}>
                ← Quay lại
              </button>
            </div>
            <div className="section-intro">
              <span className="eyebrow">Giỏ hàng</span>
              <h2>Sản phẩm trong giỏ của bạn</h2>
              <p>Xem các sản phẩm đang nằm trong giỏ và chuẩn bị thanh toán.</p>
            </div>
            {cartItems.length > 0 ? (
              <div className="product-grid cart-grid">
                {cartItems.map((product) => (
                  <article key={product.id} className="product-card">
                      <img className="product-image" src={product.image} alt={product.name} loading="lazy" decoding="async" width="600" height="400" />
                    <div className="product-copy">
                      <h3>{product.name}</h3>
                      <p>{product.description}</p>
                      <div className="product-meta cart-meta">
                        <strong>{product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</strong>
                        <div className="quantity-control">
                          <button type="button" className="quantity-button" onClick={() => setCart((prev) => prev.flatMap((item) => item.id === product.id ? (item.quantity > 1 ? [{ ...item, quantity: item.quantity - 1 }] : []) : [item]))}>
                            −
                          </button>
                          <span>{product.quantity}</span>
                          <button type="button" className="quantity-button" onClick={() => setCart((prev) => prev.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))}>
                            +
                          </button>
                        </div>
                        <button className="btn btn-secondary btn-sm" type="button" onClick={() => setCart((prev) => prev.filter((item) => item.id !== product.id))}>
                          Xóa
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>Giỏ hàng đang trống. Thêm sản phẩm để xem trong trang này.</p>
              </div>
            )}
          </section>
        )}

        <NewsletterForm
          email={email}
          status={status}
          onEmailChange={setEmail}
          onSubmit={handleSubmit}
        />
      </main>
      <Footer />

      <aside className={`chat-widget ${chatOpen ? 'open' : ''}`}>
        <button className="chat-toggle" onClick={() => setChatOpen((prev) => !prev)}>
          {chatOpen ? '✕' : '💬'}
        </button>
        {chatOpen && (
          <div className="chat-panel">
            <div className="chat-messages">
              {messages.map((message) => (
                <div key={message.id} className={`chat-bubble ${message.author}`}>
                  {message.text}
                </div>
              ))}
            </div>
            <form
              className="chat-input"
              onSubmit={(e) => {
                e.preventDefault();
                handleChatSend(input);
              }}
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Gửi câu hỏi..."
              />
              <button type="submit">Gửi</button>
            </form>
          </div>
        )}
      </aside>
    </div>
  );
}

export default App;
