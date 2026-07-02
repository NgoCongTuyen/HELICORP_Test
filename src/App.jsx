import { useEffect, useMemo, useState } from 'react';

const analyticsEndpoint = 'https://example.com/api/webhook';

const features = [
  {
    title: 'Điều khiển AI linh hoạt',
    description: 'Tự động học thói quen và tối ưu hành trình thông minh cho thiết bị.',
    icon: '🤖',
  },
  {
    title: 'Bảo mật toàn diện',
    description: 'Mã hóa end-to-end, quản lý quyền truy cập và thông báo tức thì.',
    icon: '🔒',
  },
  {
    title: 'Kết nối mọi lúc mọi nơi',
    description: 'Ứng dụng mobile và web điều khiển tiện lợi, đồng bộ tức thì.',
    icon: '📱',
  },
];

const specs = [
  { label: 'Kết nối', value: 'Wi-Fi 6 / Bluetooth 5.3 / Zigbee' },
  { label: 'Hiệu năng', value: 'CPU 8 nhân AI + 4GB RAM' },
  { label: 'Thời lượng pin', value: '72 giờ sử dụng liên tục' },
  { label: 'Tích hợp', value: 'Alexa, Google Assistant, HomeKit' },
];

const aiReplies = {
  hello: 'Xin chào! SmartVision Pro sẵn sàng hỗ trợ bạn. Bạn muốn tìm hiểu tính năng nào?',
  security: 'Bảo mật của SmartVision Pro được thiết kế với mã hóa AES-256, xác thực đa yếu tố và cập nhật tự động.',
  control: 'Bạn có thể điều khiển thiết bị bằng app, giọng nói hoặc tự động hoá theo lịch trình cá nhân.',
  default: 'SmartVision Pro hỗ trợ điều khiển thông minh, bảo mật cao và trải nghiệm mượt trên di động.',
};

function sendAnalytics(eventType, payload = {}) {
  const body = JSON.stringify({ eventType, timestamp: new Date().toISOString(), ...payload });
  if (navigator.sendBeacon) {
    navigator.sendBeacon(analyticsEndpoint, body);
    return;
  }
  fetch(analyticsEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
  }).catch(() => null);
}

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, author: 'bot', text: 'Chào bạn! Tôi có thể giúp gì cho bạn về SmartVision Pro?' },
  ]);
  const [input, setInput] = useState('');

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
    const handleScroll = () => sendAnalytics('scroll', { scrollY: window.scrollY });
    const handleClick = (event) => sendAnalytics('click', { target: event.target.tagName });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  const heroStyles = useMemo(
    () => ({ backgroundImage: 'radial-gradient(circle at top, rgba(56, 189, 248, 0.18), transparent 40%), linear-gradient(135deg, #0f172a 0%, transparent 70%)' }),
    []
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('Vui lòng nhập email hợp lệ.');
      return;
    }
    setStatus('Đang gửi...');
    sendAnalytics('newsletter-submit', { email });
    try {
      await fetch(analyticsEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventType: 'newsletter', email }),
      });
      setStatus('Đăng ký thành công! Cảm ơn bạn đã quan tâm.');
      setEmail('');
    } catch (error) {
      setStatus('Gửi thất bại. Vui lòng thử lại sau.');
    }
  };

  const handleChatSend = (text) => {
    if (!text.trim()) return;
    const userMessage = { id: Date.now(), author: 'user', text: text.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    const question = text.toLowerCase();
    const answer = Object.keys(aiReplies).find((key) => question.includes(key));
    const replyText = aiReplies[answer] || aiReplies.default;
    setTimeout(() => {
      setMessages((prev) => [...prev, { id: Date.now() + 1, author: 'bot', text: replyText }]);
    }, 550);
    sendAnalytics('chat-message', { question: text });
  };

  return (
    <div className="page-shell">
      <header className="topbar">
        <div className="brand">SmartVision Pro</div>
        <button className="mode-toggle" onClick={() => setDarkMode((prev) => !prev)}>
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </header>

      <main>
        <section className="hero" style={heroStyles}>
          <div className="hero-copy">
            <span className="eyebrow">Thiết bị thông minh thế hệ mới</span>
            <h1>SmartVision Pro - Trải nghiệm công nghệ thông minh tinh tế</h1>
            <p>Khám phá giải pháp quản lý thông minh, an toàn và đồng bộ mọi lúc mọi nơi cho ngôi nhà hiện đại.</p>
            <div className="hero-actions">
              <a href="#features" className="btn btn-primary">Khám phá ngay</a>
              <a href="#signup" className="btn btn-secondary">Nhận tin tức</a>
            </div>
          </div>
          <div className="hero-card" aria-label="Smart device preview">
            <div className="device-shell">
              <div className="device-screen">
                <div className="status-bar">
                  <span>SmartVision</span>
                  <span>92%</span>
                </div>
                <div className="device-content">
                  <p>Tình trạng: Sẵn sàng</p>
                  <div className="metric-grid">
                    <div>
                      <strong>AI</strong>
                      <span>Hoạt động</span>
                    </div>
                    <div>
                      <strong>PIN</strong>
                      <span>72h</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="features">
          <div className="section-intro">
            <span className="eyebrow">Tính năng nổi bật</span>
            <h2>Kiến tạo trải nghiệm thông minh từ mọi tương tác</h2>
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

        <section className="section section-split">
          <div className="section-copy animate-slide-left">
            <span className="eyebrow">Thông số kỹ thuật</span>
            <h2>Hiệu suất đáng tin cậy, thiết kế tối giản</h2>
            <p>SmartVision Pro đảm bảo hiệu suất mượt mà và kết nối ổn định nhờ phần cứng tối ưu, bảo mật cao và khả năng mở rộng linh hoạt.</p>
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

        <section className="section section-newsletter" id="signup">
          <div className="newsletter-card animate-fade-up">
            <div>
              <span className="eyebrow">Nhận tin</span>
              <h2>Đăng ký để nhận bản tin và ưu đãi sớm</h2>
              <p>Nhận thông tin cập nhật về sản phẩm, bản thử nghiệm và trải nghiệm độc quyền.</p>
            </div>
            <form onSubmit={handleSubmit} className="newsletter-form">
              <label htmlFor="email">Email của bạn</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nhập email tại đây"
                required
              />
              <button type="submit" className="btn btn-primary">Gửi đăng ký</button>
            </form>
            {status && <p className="form-status">{status}</p>}
          </div>
        </section>
      </main>

      <aside className={`chat-widget ${chatOpen ? 'open' : ''}`}>
        <button className="chat-toggle" onClick={() => setChatOpen((prev) => !prev)}>
          {chatOpen ? 'Đóng Chat' : 'Chat support'}
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
