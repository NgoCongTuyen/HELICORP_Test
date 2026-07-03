import React from 'react';

function Navbar({ darkMode, onToggle, favoritesCount, cartCount, page, onShowFavorites, onShowCart }) {
  return (
    <header className="topbar">
      <div className="brand">iPhone 16 Pro Max</div>
      <div className="topbar-actions">
        <button type="button" className={`nav-button ${page === 'favorites' ? 'active' : ''}`} onClick={onShowFavorites}>
          ❤️ Yêu thích {favoritesCount > 0 ? `(${favoritesCount})` : ''}
        </button>
        <button type="button" className={`nav-button ${page === 'cart' ? 'active' : ''}`} onClick={onShowCart}>
          🛒 Giỏ hàng {cartCount > 0 ? `(${cartCount})` : ''}
        </button>
      </div>
      <button className="mode-toggle" onClick={onToggle}>
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
    </header>
  );
}

export default React.memo(Navbar);
