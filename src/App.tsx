import { useState } from 'react';
import Navbar from './components/Navbar.jsx';
import HeroSection from './components/HeroSection.jsx';
import TopicCards from './components/TopicCards.jsx';
import './App.css';

interface Compound {
  name: string;
  formula: string;
  mr: number;
}

export const App = () => {
  const [moleBridgeModalOpen, setMoleBridgeModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState<number>(9.8); // 9.8 gram H2SO4
  const [selectedCompound, setSelectedCompound] = useState<Compound>({
    name: 'H₂SO₄ (Asam Sulfat)',
    formula: 'H₂SO₄',
    mr: 98,
  });

  // Kalkulasi instan jembatan mol
  const calculatedMol = (inputValue / selectedCompound.mr).toFixed(3);
  const calculatedParticles = (parseFloat(calculatedMol) * 6.02).toFixed(2);
  const calculatedVolumeStp = (parseFloat(calculatedMol) * 22.4).toFixed(2);

  const handleStartLearning = () => {
    const el = document.getElementById('topik-materi');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="app-root">
      {/* 1. Navbar dengan Identitas Media */}
      <Navbar onOpenMoleBridge={() => setMoleBridgeModalOpen(true)} />

      {/* 2. Hero Section dengan Tombol Mulai Belajar */}
      <main>
        <HeroSection
          onStartLearning={handleStartLearning}
          onExploreMoleBridge={() => setMoleBridgeModalOpen(true)}
        />

        {/* 3. Tiga Kartu: Stoikiometri, Termokimia, Larutan Asam-Basa */}
        <TopicCards
          onSelectTopic={(topicKey: string) => {
            if (topicKey === 'stoikiometri') {
              setMoleBridgeModalOpen(true);
            }
          }}
        />
      </main>

      {/* Modal Interaktif Jembatan Mol (Fitur Unggulan PRD) */}
      {moleBridgeModalOpen && (
        <div className="modal-overlay" onClick={() => setMoleBridgeModalOpen(false)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">
                <span>🌉</span>
                <span>Kalkulator Jembatan Mol Interaktif</span>
              </h3>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setMoleBridgeModalOpen(false)}
                aria-label="Tutup Modal"
              >
                &times;
              </button>
            </div>

            <div className="modal-body">
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                Jembatan Mol adalah poros utama stoikiometri reaksi. Pilih senyawa uji dan masukkan massa zat untuk melihat alur konversi otomatis:
              </p>

              {/* Pemilihan Senyawa Uji */}
              <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
                {[
                  { name: 'H₂SO₄ (Asam Sulfat)', formula: 'H₂SO₄', mr: 98 },
                  { name: 'CO₂ (Karbon Dioksida)', formula: 'CO₂', mr: 44 },
                  { name: 'CaCO₃ (Kalsium Karbonat)', formula: 'CaCO₃', mr: 100 },
                  { name: 'H₂O (Air)', formula: 'H₂O', mr: 18 },
                ].map((item) => (
                  <button
                    key={item.formula}
                    type="button"
                    className={`sub-tab-btn ${selectedCompound.formula === item.formula ? 'active-amber' : ''}`}
                    onClick={() => setSelectedCompound(item)}
                  >
                    {item.name}
                  </button>
                ))}
              </div>

              {/* Diagram Cabang Jembatan Mol */}
              <div className="mole-bridge-visual">
                <div className="bridge-center-node">
                  <h4>MOL (n)</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', marginTop: '4px' }}>
                    Hasil: <strong>{calculatedMol} mol {selectedCompound.formula}</strong>
                  </p>
                </div>

                <div className="bridge-branches-grid">
                  <div className="branch-card">
                    <div className="branch-name">1. Massa (Gram)</div>
                    <div className="branch-formula">Massa = n × Mr</div>
                    <div style={{ marginTop: '6px', fontSize: '0.85rem', color: 'var(--chem-emerald)', fontWeight: 700 }}>
                      {inputValue} gram
                    </div>
                  </div>

                  <div className="branch-card">
                    <div className="branch-name">2. Jumlah Partikel (X)</div>
                    <div className="branch-formula">X = n × 6,02 × 10²³</div>
                    <div style={{ marginTop: '6px', fontSize: '0.85rem', color: 'var(--chem-cyan)', fontWeight: 700 }}>
                      {calculatedParticles} × 10²³ partikel
                    </div>
                  </div>

                  <div className="branch-card">
                    <div className="branch-name">3. Volume Gas STP (L)</div>
                    <div className="branch-formula">V = n × 22,4 Liter</div>
                    <div style={{ marginTop: '6px', fontSize: '0.85rem', color: 'var(--chem-amber)', fontWeight: 700 }}>
                      {calculatedVolumeStp} Liter (0°C, 1 atm)
                    </div>
                  </div>

                  <div className="branch-card">
                    <div className="branch-name">4. Molaritas (M) dalam 1 Liter</div>
                    <div className="branch-formula">M = n / V (Liter)</div>
                    <div style={{ marginTop: '6px', fontSize: '0.85rem', color: 'var(--chem-purple)', fontWeight: 700 }}>
                      {calculatedMol} Molar (M)
                    </div>
                  </div>
                </div>
              </div>

              {/* Slider Input Interaktif */}
              <div className="solver-box">
                <div className="solver-title">Ubah Input Massa (g):</div>
                <div className="range-slider-row">
                  <input
                    type="range"
                    min="1"
                    max="200"
                    step="1"
                    value={inputValue}
                    onChange={(e) => setInputValue(parseFloat(e.target.value))}
                    className="custom-slider emerald-slider"
                  />
                  <span className="slider-value-display">{inputValue} g</span>
                </div>

                <div className="solver-step-list">
                  <div className="solver-step">
                    <span className="step-num">1</span>
                    <span>Hitung massa molar ({selectedCompound.formula}): Mr = <strong>{selectedCompound.mr} g/mol</strong>.</span>
                  </div>
                  <div className="solver-step">
                    <span className="step-num">2</span>
                    <span>Bagi massa dengan Mr: {inputValue} / {selectedCompound.mr} = <strong>{calculatedMol} mol</strong>.</span>
                  </div>
                  <div className="solver-step">
                    <span className="step-num">3</span>
                    <span>Kalikan mol dengan tetapan konversi tujuan (Avogadro 6,02×10²³ atau 22,4 L STP).</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer Aplikasi */}
      <footer className="app-footer">
        <div className="app-container footer-content">
          <div className="footer-left">
            <span className="footer-brand">StoiLab 11 • Kimia SMA Fase F</span>
            <span className="footer-desc">
              Platform Pembelajaran Mandiri Interaktif Materi Stoikiometri, Termokimia, dan Larutan Asam-Basa.
            </span>
          </div>
          <div className="footer-right">
            <span className="footer-chip">100% Client-Side • LocalStorage Anonim</span>
            <span className="footer-chip">React 19 + Vite</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
