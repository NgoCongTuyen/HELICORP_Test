export default function Navbar({ darkMode, onToggle }) {
  return (
    <header className="topbar">
      <div className="brand">iPhone 16 Pro Max</div>
      <button className="mode-toggle" onClick={onToggle}>
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
    </header>
  );
}
