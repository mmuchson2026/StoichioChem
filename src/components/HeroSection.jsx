import { useState } from 'react';

/**
 * HeroSection Component
 * Menampilkan judul utama, pengantar materi kimia kelas 11 yang komunikatif,
 * tombol "Mulai Belajar", serta widget interaktif preview persamaan reaksi dan konsep mol.
 */
export const HeroSection = ({ onStartLearning, onExploreMoleBridge }) => {
  // Demo interaktif sederhana di hero: memilih senyawa untuk melihat rumus & notasi presisinya
  const [activeMolecule, setActiveMolecule] = useState('H2SO4');

  const molecules = [
    {
      id: 'H2SO4',
      name: 'Asam Sulfat',
      formula: <>H<sub>2</sub>SO<sub>4</sub></>,
      mr: '98 g/mol',
      desc: 'Zat pereaksi kunci dalam stoikiometri asam kuat & industri',
    },
    {
      id: 'CaCO3',
      name: 'Kalsium Karbonat',
      formula: <>CaCO<sub>3</sub></>,
      mr: '100 g/mol',
      desc: 'Bahan batu kapur yang melepaskan ion Ca²⁺ dan gas CO₂',
    },
    {
      id: 'H2O',
      name: 'Air / Pembakaran',
      formula: <>2H<sub>2</sub>(g) + O<sub>2</sub>(g) → 2H<sub>2</sub>O(l)</>,
      mr: '18 g/mol',
      desc: 'Reaksi pembentukan standar dengan pelepasan kalor (ΔH < 0)',
    },
  ];

  const currentMol = molecules.find((m) => m.id === activeMolecule) || molecules[0];

  return (
    <section id="beranda" className="hero-section">
      <div className="app-container hero-grid">
        {/* Konten Kiri: Headline & CTA */}
        <div className="hero-content">
          <div className="hero-pill-badge">
            <span className="pill-pulse"></span>
            <span className="pill-text">Media Edukasi Kimia Interaktif Kelas 11 SMA</span>
          </div>

          <h1 className="hero-title">
            Kuasai <span className="gradient-text-emerald">Stoikiometri</span> & Reaksi Kimia Tanpa Rumit
          </h1>

          <p className="hero-description">
            Pahami logika perhitungan kimia dari tingkat sub-mikroskopik partikulat. 
            Mulai dari konversi alur <strong>Jembatan Mol</strong>, kesetaraan massa 
            berdasarkan Hukum Kekekalan Massa, hingga penentuan 
            <strong> Pereaksi Pembatas</strong> secara visual dan menyenangkan.
          </p>

          <div className="hero-cta-group">
            <button
              type="button"
              className="btn-primary-glow"
              onClick={onStartLearning}
            >
              <span>Mulai Belajar</span>
              <svg className="btn-arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>

            <button
              type="button"
              className="btn-secondary-outline"
              onClick={onExploreMoleBridge}
            >
              <svg className="btn-flask-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="6" cy="19" r="3" />
                <path d="M9 19h8.5a4.5 4.5 0 0 0 0-9H14" />
                <path d="M12 4v4" />
              </svg>
              <span>Eksplorasi Jembatan Mol</span>
            </button>
          </div>

          {/* Quick Metrics */}
          <div className="hero-stats-row">
            <div className="stat-item">
              <span className="stat-number">3</span>
              <span className="stat-label">Topik Utama Kimia</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">5+</span>
              <span className="stat-label">Level Quest Mandiri</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <span className="stat-number">100%</span>
              <span className="stat-label">Anonim & Tanpa Login</span>
            </div>
          </div>
        </div>

        {/* Konten Kanan: Visual Card Laboratorium Interaktif */}
        <div className="hero-visual">
          <div className="lab-terminal-card">
            <div className="terminal-header">
              <div className="terminal-dots">
                <span className="dot dot-red"></span>
                <span className="dot dot-yellow"></span>
                <span className="dot dot-green"></span>
              </div>
              <span className="terminal-title">Pratinjau Partikulat & Rumus Kimia</span>
              <span className="terminal-tag">StoiLab Engine v1.0</span>
            </div>

            <div className="terminal-body">
              {/* Selector molekul */}
              <div className="molecule-tabs">
                {molecules.map((mol) => (
                  <button
                    key={mol.id}
                    type="button"
                    className={`molecule-tab-btn ${activeMolecule === mol.id ? 'active' : ''}`}
                    onClick={() => setActiveMolecule(mol.id)}
                  >
                    {mol.name}
                  </button>
                ))}
              </div>

              {/* Display Rumus Kimia dengan Presisi Notasi Subskrip/Superskrip */}
              <div className="formula-showcase-box">
                <div className="formula-type-label">Formula / Persamaan Reaksi:</div>
                <div className="formula-display-large">
                  {currentMol.formula}
                </div>
                <div className="formula-meta-row">
                  <span className="meta-badge">Massa Molar: <strong>{currentMol.mr}</strong></span>
                  <span className="meta-badge-cyan">Fase: <strong>Aqueous / Gas</strong></span>
                </div>
                <p className="formula-explanation">{currentMol.desc}</p>
              </div>

              {/* Persamaan Reaksi Stoikiometri Contoh */}
              <div className="reaction-preview-footer">
                <div className="reaction-title-small">Kaidah Penyetaraan Reaksi (Lavoisier):</div>
                <div className="chemical-equation">
                  2H<sub>2</sub>(g) + O<sub>2</sub>(g) <span className="reaction-arrow">⟶</span> 2H<sub>2</sub>O(l)
                </div>
                <div className="equation-notes">
                  Koefisien reaksi merepresentasikan <strong>perbandingan rasio mol</strong> zat pereaksi.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
