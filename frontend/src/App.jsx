import { useEffect, useMemo, useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Features from './components/Features.jsx';
import Gallery from './components/Gallery.jsx';
import DealCalculator from './components/DealCalculator.jsx';
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
      <Navbar darkMode={darkMode} onToggle={() => setDarkMode((prev) => !prev)} />
      <main>
        <Hero heroStyles={heroStyles} />
        <Features features={features} />
        <Gallery />
        <DealCalculator price={32990000} />
        <Specifications specs={specs} />
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
