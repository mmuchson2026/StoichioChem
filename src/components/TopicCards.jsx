import { useState } from 'react';

/**
 * TopicCards Component
 * Menampilkan 3 kartu topik pembelajaran kimia kelas 11:
 * 1. Stoikiometri (dengan notasi H₂SO₄, konsep mol, pereaksi pembatas)
 * 2. Termokimia (dengan notasi ΔH, eksoterm & endoterm)
 * 3. Larutan Asam-Basa (dengan notasi Ca²⁺, pH, hidrolisis garam)
 *
 * Menerapkan penyimpanan status progres belajar di localStorage secara anonim.
 */
export const TopicCards = ({ onSelectTopic }) => {
  // Status progres belajar tiap topik yang diinisialisasi secara anonim dari localStorage
  const [completedTopics, setCompletedTopics] = useState(() => {
    try {
      const savedProgress = localStorage.getItem('stoilab_topic_progress');
      if (savedProgress) {
        return JSON.parse(savedProgress);
      }
    } catch {
      // Graceful fallback jika terjadi kegagalan akses localStorage
    }
    return {
      stoikiometri: false,
      termokimia: false,
      asambasa: false,
    };
  });

  // State interaktif per kartu untuk keterlibatan belajar siswa
  const [stoikMass, setStoikMass] = useState(49); // gram H2SO4
  const [thermoType, setThermoType] = useState('eksoterm'); // eksoterm / endoterm
  const [phValue, setPhValue] = useState(2); // pH larutan

  // Simpan progres ke localStorage saat pengguna menandai topik dipelajari
  const handleToggleLearn = (topicKey) => {
    const updated = {
      ...completedTopics,
      [topicKey]: !completedTopics[topicKey],
    };
    setCompletedTopics(updated);

    try {
      localStorage.setItem('stoilab_topic_progress', JSON.stringify(updated));
      
      // Tambahkan bonus XP di localStorage jika ditandai selesai
      const currentXp = parseInt(localStorage.getItem('stoilab_xp') || '150', 10);
      const newXp = updated[topicKey] ? currentXp + 50 : Math.max(0, currentXp - 50);
      localStorage.setItem('stoilab_xp', newXp.toString());
      
      // Beritahu window event agar navbar ikut update XP tanpa reload
      window.dispatchEvent(new Event('storage'));
    } catch {
      // Graceful error fallback
    }

    if (onSelectTopic) {
      onSelectTopic(topicKey);
    }
  };

  // Kalkulasi sederhana konversi mol H2SO4 (Mr = 98 g/mol)
  const molH2SO4 = (stoikMass / 98).toFixed(2);

  // Penentuan warna dan sifat indikator asam-basa
  const getPhColor = (val) => {
    if (val < 7) return '#EF4444'; // Merah Asam
    if (val === 7) return '#10B981'; // Hijau Netral
    return '#3B82F6'; // Biru Basa
  };

  const getPhNature = (val) => {
    if (val < 7) return 'Asam (Kelebihan ion H⁺)';
    if (val === 7) return 'Netral (H⁺ = OH⁻)';
    return 'Basa (Kelebihan ion OH⁻)';
  };

  return (
    <section id="topik-materi" className="topic-cards-section">
      <div className="app-container">
        {/* Section Header */}
        <div className="section-header-center">
          <div className="section-eyebrow">Silabus Inti Kimia Kelas 11</div>
          <h2 className="section-title">Eksplorasi Tiga Pilar Utama Kimia</h2>
          <p className="section-subtitle">
            Pelajari konsep teoretis, visualisasi reaksi, hingga perhitungan matematis
            dengan notasi kimia yang presisi sesuai kurikulum SMA.
          </p>
        </div>

        {/* 3 Grid Kartu Topik */}
        <div className="topic-cards-grid">
          {/* ========================================================= */}
          {/* KARTU 1: STOIKIOMETRI                                      */}
          {/* ========================================================= */}
          <div className="topic-card card-stoikiometri">
            <div className="card-top-bar">
              <span className="card-badge badge-emerald">Topik Utama • Fase F</span>
              {completedTopics.stoikiometri && (
                <span className="completed-tag">✓ Selesai Dipelajari</span>
              )}
            </div>

            <div className="card-icon-bubble emerald-glow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>

            <h3 className="card-title">Stoikiometri</h3>
            <p className="card-lead">
              Pusat perhitungan kimia: Konsep Mol, Jembatan Mol, Penyetaraan Reaksi, 
              serta Penentuan Pereaksi Pembatas (*Limiting Reactant*).
            </p>

            {/* Kotak Notasi Presisi H₂SO₄ */}
            <div className="notation-callout-box emerald-border">
              <div className="callout-header">
                <span className="callout-label">Contoh Senyawa Uji:</span>
                <span className="formula-highlight">H<sub>2</sub>SO<sub>4</sub> (Asam Sulfat)</span>
              </div>
              <div className="callout-content">
                Massa molar (Mr) H<sub>2</sub>SO<sub>4</sub> = (2 × 1) + 32 + (4 × 16) = <strong>98 g/mol</strong>.
              </div>
            </div>

            {/* Fitur Interaktif Mini: Kalkulator Mol H2SO4 */}
            <div className="card-interactive-widget">
              <label htmlFor="input-mass-h2so4" className="widget-label">
                Simulasi Hitung Mol H<sub>2</sub>SO<sub>4</sub>:
              </label>
              <div className="range-slider-row">
                <input
                  id="input-mass-h2so4"
                  type="range"
                  min="9.8"
                  max="196"
                  step="9.8"
                  value={stoikMass}
                  onChange={(e) => setStoikMass(parseFloat(e.target.value))}
                  className="custom-slider emerald-slider"
                />
                <span className="slider-value-display">{stoikMass} g</span>
              </div>
              <div className="widget-result-pill">
                <span>Jumlah Mol: </span>
                <strong>{molH2SO4} mol H<sub>2</sub>SO<sub>4</sub></strong>
                <span className="small-detail">({(molH2SO4 * 6.02).toFixed(2)} × 10²³ partikel)</span>
              </div>
            </div>

            <div className="card-topics-list">
              <span className="topic-chip">Hukum Lavoisier & Proust</span>
              <span className="topic-chip">Jembatan Mol</span>
              <span className="topic-chip">Bagan Mula-Reaksi-Sisa</span>
            </div>

            <div className="card-footer-action">
              <button
                type="button"
                className={`btn-card-action ${completedTopics.stoikiometri ? 'btn-completed' : 'btn-emerald-solid'}`}
                onClick={() => handleToggleLearn('stoikiometri')}
              >
                {completedTopics.stoikiometri ? 'Tandai Belum Selesai' : 'Buka Modul Stoikiometri'}
              </button>
            </div>
          </div>

          {/* ========================================================= */}
          {/* KARTU 2: TERMOKIMIA                                        */}
          {/* ========================================================= */}
          <div className="topic-card card-termokimia">
            <div className="card-top-bar">
              <span className="card-badge badge-amber">Modul Termodinamika</span>
              {completedTopics.termokimia && (
                <span className="completed-tag">✓ Selesai Dipelajari</span>
              )}
            </div>

            <div className="card-icon-bubble amber-glow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
              </svg>
            </div>

            <h3 className="card-title">Termokimia</h3>
            <p className="card-lead">
              Kajian aliran kalor pada reaksi kimia: Perubahan Entalpi sistem (<strong>ΔH</strong>), 
              Hukum Hess, energi ikatan, dan eksperimen kalorimeter.
            </p>

            {/* Kotak Notasi Presisi ΔH */}
            <div className="notation-callout-box amber-border">
              <div className="callout-header">
                <span className="callout-label">Simbol Termokimia:</span>
                <span className="formula-highlight">ΔH (Perubahan Entalpi)</span>
              </div>
              <div className="callout-content">
                Notasi standar: <strong>ΔH°<sub>f</sub></strong> (pembentukan), <strong>ΔH°<sub>d</sub></strong> (penguraian), 
                dan <strong>ΔH°<sub>c</sub></strong> (pembakaran) dalam satuan kJ/mol.
              </div>
            </div>

            {/* Fitur Interaktif Mini: Toggle Eksoterm vs Endoterm */}
            <div className="card-interactive-widget">
              <div className="widget-label">Simulasi Arah Kalor Reaksi:</div>
              <div className="interactive-btn-group">
                <button
                  type="button"
                  className={`sub-tab-btn ${thermoType === 'eksoterm' ? 'active-amber' : ''}`}
                  onClick={() => setThermoType('eksoterm')}
                >
                  Eksoterm (Melepas Kalor)
                </button>
                <button
                  type="button"
                  className={`sub-tab-btn ${thermoType === 'endoterm' ? 'active-amber' : ''}`}
                  onClick={() => setThermoType('endoterm')}
                >
                  Endoterm (Menyerap Kalor)
                </button>
              </div>

              <div className="widget-result-pill">
                {thermoType === 'eksoterm' ? (
                  <>
                    <span className="icon-burn">🔥</span>
                    <span>Nilai <strong>ΔH &lt; 0 (Negatif)</strong>: Suhu lingkungan naik</span>
                  </>
                ) : (
                  <>
                    <span className="icon-freeze">❄️</span>
                    <span>Nilai <strong>ΔH &gt; 0 (Positif)</strong>: Suhu lingkungan turun</span>
                  </>
                )}
              </div>
            </div>

            <div className="card-topics-list">
              <span className="topic-chip">Diagram Tingkat Energi</span>
              <span className="topic-chip">Hukum Hess</span>
              <span className="topic-chip">Kalorimetri q = m·c·ΔT</span>
            </div>

            <div className="card-footer-action">
              <button
                type="button"
                className={`btn-card-action ${completedTopics.termokimia ? 'btn-completed' : 'btn-amber-solid'}`}
                onClick={() => handleToggleLearn('termokimia')}
              >
                {completedTopics.termokimia ? 'Tandai Belum Selesai' : 'Buka Modul Termokimia'}
              </button>
            </div>
          </div>

          {/* ========================================================= */}
          {/* KARTU 3: LARUTAN ASAM-BASA                                 */}
          {/* ========================================================= */}
          <div className="topic-card card-asambasa">
            <div className="card-top-bar">
              <span className="card-badge badge-cyan">Keseimbangan Kimia</span>
              {completedTopics.asambasa && (
                <span className="completed-tag">✓ Selesai Dipelajari</span>
              )}
            </div>

            <div className="card-icon-bubble cyan-glow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
              </svg>
            </div>

            <h3 className="card-title">Larutan Asam-Basa</h3>
            <p className="card-lead">
              Keseimbangan ionik dalam pelarut air: Disosiasi kation/anion, 
              derajat ionisasi, hidrolisis garam, dan larutan penyangga (*buffer*).
            </p>

            {/* Kotak Notasi Presisi Ca²⁺ */}
            <div className="notation-callout-box cyan-border">
              <div className="callout-header">
                <span className="callout-label">Contoh Kation & Garam:</span>
                <span className="formula-highlight">Ca<sup>2+</sup> (Kalsium)</span>
              </div>
              <div className="callout-content">
                Disosiasi Ca(OH)<sub>2</sub>(aq) ⟶ <strong>Ca<sup>2+</sup></strong>(aq) + 2OH<sup>−</sup>(aq). 
                Muatan ion wajib ditulis superskrip presisi.
              </div>
            </div>

            {/* Fitur Interaktif Mini: Slider Skala pH */}
            <div className="card-interactive-widget">
              <label htmlFor="input-ph-slider" className="widget-label">
                Eksplorasi Skala Derajat Keasaman (pH):
              </label>
              <div className="range-slider-row">
                <input
                  id="input-ph-slider"
                  type="range"
                  min="0"
                  max="14"
                  step="1"
                  value={phValue}
                  onChange={(e) => setPhValue(parseInt(e.target.value, 10))}
                  className="custom-slider cyan-slider"
                />
                <span className="slider-value-display" style={{ color: getPhColor(phValue) }}>
                  pH {phValue}
                </span>
              </div>
              <div className="widget-result-pill">
                <span
                  className="ph-color-indicator"
                  style={{ backgroundColor: getPhColor(phValue) }}
                ></span>
                <span>Sifat: <strong>{getPhNature(phValue)}</strong></span>
              </div>
            </div>

            <div className="card-topics-list">
              <span className="topic-chip">Teori Arrhenius & Lewis</span>
              <span className="topic-chip">Indikator Universal</span>
              <span className="topic-chip">Titrasi Asam Basa</span>
            </div>

            <div className="card-footer-action">
              <button
                type="button"
                className={`btn-card-action ${completedTopics.asambasa ? 'btn-completed' : 'btn-cyan-solid'}`}
                onClick={() => handleToggleLearn('asambasa')}
              >
                {completedTopics.asambasa ? 'Tandai Belum Selesai' : 'Buka Modul Asam-Basa'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopicCards;
