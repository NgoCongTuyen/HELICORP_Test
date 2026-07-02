import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Database from 'better-sqlite3';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envFile = path.join(__dirname, '.env');
if (fs.existsSync(envFile)) {
  console.log('📁 Loading .env from:', envFile);
  const envText = fs.readFileSync(envFile, 'utf-8');
  envText.split(/[\r\n]+/).forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;
    const [key, ...rest] = trimmed.split('=');
    if (!key) return;
    const value = rest.join('=').trim();
    process.env[key.trim()] = value.replace(/^"|"$/g, '').replace(/^'|'$/g, '');
  });
  console.log('✅ .env loaded. AI_PROVIDER:', process.env.AI_PROVIDER, 'AI_API_KEY exists:', !!process.env.AI_API_KEY);
} else {
  console.log('⚠️ .env file not found at:', envFile);
}

const app = express();
const PORT = process.env.PORT || 4000;
const dbPath = path.join(__dirname, 'data.sqlite');
const uploadDir = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const db = new Database(dbPath);
db.exec(`
  CREATE TABLE IF NOT EXISTS newsletter (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    created_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS analytics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    event_type TEXT NOT NULL,
    timestamp TEXT NOT NULL,
    payload TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS images (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    filename TEXT NOT NULL,
    original_name TEXT NOT NULL,
    mime_type TEXT NOT NULL,
    size INTEGER NOT NULL,
    uploaded_at TEXT NOT NULL
  );
`);

app.use(cors({ origin: 'http://localhost:4173' }));
app.use(express.json({ limit: '5mb' }));

app.post('/api/newsletter', (req, res) => {
  const { email } = req.body;
  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return res.status(400).json({ success: false, message: 'Email không hợp lệ' });
  }

  try {
    const stmt = db.prepare('INSERT OR IGNORE INTO newsletter (email, created_at) VALUES (?, ?)');
    stmt.run(email, new Date().toISOString());
    return res.json({ success: true, message: 'Đăng ký nhận tin thành công' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Lưu dữ liệu thất bại' });
  }
});

app.post('/api/analytics', (req, res) => {
  const { eventType, timestamp, ...payload } = req.body;
  if (!eventType) {
    return res.status(400).json({ success: false, message: 'Thiếu eventType' });
  }

  try {
    const stmt = db.prepare('INSERT INTO analytics (event_type, timestamp, payload) VALUES (?, ?, ?)');
    stmt.run(eventType, timestamp || new Date().toISOString(), JSON.stringify(payload));
    return res.json({ success: true });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Lưu analytics thất bại' });
  }
});
async function getAIResponse(question) {
  const fallbackResponses = [
    { keywords: ['camera', 'chụp', 'zoom'], answer: 'iPhone 16 Pro Max có camera chính 48MP Fusion, góc siêu rộng 48MP và telephoto 12MP 5x Optical Zoom.' },
    { keywords: ['màn hình', 'display', 'oled'], answer: 'Máy dùng màn hình 6.9 inch Super Retina XDR OLED, ProMotion 120Hz, độ phân giải 2868×1320.' },
    { keywords: ['pin', 'battery'], answer: 'Thiết kế pin của iPhone 16 Pro Max được Apple cho biết là tốt nhất trên dòng iPhone, dùng cả ngày thoải mái.' },
    { keywords: ['chip', 'hiệu năng'], answer: 'Chip A18 Pro mang lại hiệu năng mạnh mẽ cho AI, chơi game và xử lý video 4K.' },
    { keywords: ['connect', 'kết nối', 'usb-c'], answer: 'Máy hỗ trợ Wi-Fi 7, Bluetooth 5.3, NFC và cổng USB-C.' },
  ];

  const normalized = question.toLowerCase();
  const found = fallbackResponses.find((item) => item.keywords.some((k) => normalized.includes(k)));
  return found
    ? found.answer
    : 'iPhone 16 Pro Max là một flagship với màn hình lớn, chip A18 Pro và camera chuyên nghiệp. Bạn có thể hỏi thêm về màn hình, camera, pin hoặc kết nối.';
}

app.post('/api/ai-response', async (req, res) => {
  const { question } = req.body;
  if (!question || typeof question !== 'string') {
    return res.status(400).json({ success: false, message: 'Thiếu câu hỏi' });
  }

  const answer = await getAIResponse(question);
  return res.json({ success: true, answer });
});

app.post('/api/upload-image', (req, res) => {
  const { filename, content, mimeType } = req.body;
  if (!filename || !content) {
    return res.status(400).json({ success: false, message: 'Thiếu dữ liệu ảnh' });
  }

  const buffer = Buffer.from(content, 'base64');
  const safeName = `${Date.now()}-${filename.replace(/\s+/g, '-')}`;
  const filePath = path.join(uploadDir, safeName);
  fs.writeFileSync(filePath, buffer);

  const stmt = db.prepare('INSERT INTO images (filename, original_name, mime_type, size, uploaded_at) VALUES (?, ?, ?, ?, ?)');
  stmt.run(safeName, filename, mimeType || 'application/octet-stream', buffer.length, new Date().toISOString());

  return res.json({ success: true, filename: safeName, path: `/uploads/${safeName}` });
});

app.get('/api/images', (req, res) => {
  const rows = db.prepare('SELECT id, filename, original_name, mime_type, size, uploaded_at FROM images ORDER BY id DESC').all();
  res.json(rows);
});

app.get('/api/newsletter', (req, res) => {
  const rows = db.prepare('SELECT id, email, created_at FROM newsletter ORDER BY id DESC').all();
  res.json({ success: true, data: rows });
});

app.get('/api/analytics', (req, res) => {
  const rows = db.prepare('SELECT id, event_type, timestamp, payload FROM analytics ORDER BY id DESC').all();
  const parsedRows = rows.map((row) => ({
    ...row,
    payload: JSON.parse(row.payload),
  }));
  res.json({ success: true, data: parsedRows });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/uploads', express.static(uploadDir));

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
