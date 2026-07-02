import { useMemo, useState } from 'react';

function formatPrice(value) {
  return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}

export default function DealCalculator({ price }) {
  const [months, setMonths] = useState(12);
  const [downPayment, setDownPayment] = useState(0);

  const monthlyPayment = useMemo(() => {
    const remaining = Math.max(0, price - downPayment);
    return Math.round(remaining / months);
  }, [price, months, downPayment]);

  return (
    <section className="section deal-section">
      <div className="deal-card animate-slide-left">
        <div className="deal-header">
          <span className="eyebrow">Ưu đãi độc quyền</span>
          <h2>Trả góp linh hoạt, nhận máy sớm</h2>
        </div>
        <div className="deal-body">
          <div className="deal-row">
            <span>Giá gợi ý</span>
            <strong>{formatPrice(price)}</strong>
          </div>
          <div className="deal-row">
            <span>Số tháng</span>
            <div className="deal-buttons">
              {[6, 12, 18, 24].map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`deal-term ${months === option ? 'active' : ''}`}
                  onClick={() => setMonths(option)}
                >
                  {option} tháng
                </button>
              ))}
            </div>
          </div>
          <div className="deal-row">
            <label htmlFor="downPayment">Trả trước (tối đa 20%)</label>
            <input
              id="downPayment"
              type="range"
              min="0"
              max={Math.round(price * 0.2)}
              step="100000"
              value={downPayment}
              onChange={(e) => setDownPayment(Number(e.target.value))}
            />
            <span>{formatPrice(downPayment)}</span>
          </div>
          <div className="deal-result">
            <span>Thanh toán mỗi tháng</span>
            <strong>{formatPrice(monthlyPayment)}</strong>
          </div>
        </div>
      </div>
    </section>
  );
}
