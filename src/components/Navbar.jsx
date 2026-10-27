import { useState, useEffect } from 'react';

/**
 * Navbar Component
 * Memuat identitas media pembelajaran, navigasi materi, status progres anonim (localStorage),
 * serta tombol toggle tema (Dark/Light).
 */
export const Navbar = ({ onOpenMoleBridge }) => {
  const [theme, setTheme] = useState(() => {
    try {
      const savedTheme = localStorage.getItem('stoilab_theme') || 'dark';
      if (savedTheme === 'light') {
        document.documentElement.classList.add('light-theme');
      }
      return savedTheme;
    } catch {
      return 'dark';
    }
  });

  const [userXp, setUserXp] = useState(() => {
    try {
      const savedXp = localStorage.getItem('stoilab_xp');
      return savedXp !== null ? parseInt(savedXp, 10) : 150;
    } catch {
      return 150;
    }
  });

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Dengarkan pembaruan storage (misal ketika menyelesaikan topik)
  useEffect(() => {
    const handleStorage = () => {
      try {
        const savedXp = localStorage.getItem('stoilab_xp');
        if (savedXp !== null) {
          setUserXp(parseInt(savedXp, 10));
        }
      } catch {
        // Fallback
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  // Handler pergantian tema Dark / Light
  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    try {
      localStorage.setItem('stoilab_theme', nextTheme);
    } catch {
      // Handle fallback
    }

    if (nextTheme === 'light') {
      document.documentElement.classList.add('light-theme');
    } else {
      document.documentElement.classList.remove('light-theme');
    }
  };

  return (
    <header className="navbar-wrapper">
      <div className="app-container navbar-content">
        {/* Identitas Media Pembelajaran */}
        <div className="navbar-brand">
          <div className="brand-logo-glow">
            <svg
              className="brand-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2" />
              <path d="M8.5 2h7" />
              <path d="M7 16h10" />
              <circle cx="10" cy="12" r="1" fill="#10B981" />
              <circle cx="13" cy="14" r="1.5" fill="#06B6D4" />
            </svg>
          </div>
          <div className="brand-titles">
            <div className="brand-name-row">
              <span className="brand-name">StoiLab<span className="brand-highlight">11</span></span>
              <span className="curriculum-badge">Fase F • Kelas 11</span>
            </div>
            <p className="brand-subtitle">Media Pembelajaran Kimia Interaktif</p>
          </div>
        </div>

        {/* Menu Navigasi Utama */}
        <nav className={`navbar-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <a
            href="#beranda"
            className="nav-link active"
            onClick={() => setMobileMenuOpen(false)}
          >
            Beranda
          </a>
          <a
            href="#topik-materi"
            className="nav-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            Topik Materi
          </a>
          <button
            type="button"
            className="nav-link nav-btn"
            onClick={() => {
              setMobileMenuOpen(false);
              if (onOpenMoleBridge) onOpenMoleBridge();
            }}
          >
            Jembatan Mol
          </button>
          <a
            href="#simulasi-partikulat"
            className="nav-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            Simulasi Partikulat
          </a>
        </nav>

        {/* User Stats Anonim & Tombol Kontrol Tema */}
        <div className="navbar-actions">
          {/* Badge XP Anonim */}
          <div
            className="user-xp-badge"
            title="XP Belajar Anonim (Tersimpan di browser ini)"
          >
            <span className="xp-icon">⚡</span>
            <span className="xp-value">{userXp} XP</span>
            <span className="xp-rank">Alkemis Muda</span>
          </div>

          {/* Toggle Dark / Light Mode */}
          <button
            type="button"
            className="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label="Ganti Tema"
            title={theme === 'dark' ? 'Beralih ke Mode Terang' : 'Beralih ke Mode Gelap'}
          >
            {theme === 'dark' ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="toggle-svg">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="toggle-svg">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>

          {/* Hamburger Menu Mobile */}
          <button
            type="button"
            className="mobile-menu-trigger"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Buka Menu"
          >
            <span className={`bar ${mobileMenuOpen ? 'open' : ''}`}></span>
            <span className={`bar ${mobileMenuOpen ? 'open' : ''}`}></span>
            <span className={`bar ${mobileMenuOpen ? 'open' : ''}`}></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
