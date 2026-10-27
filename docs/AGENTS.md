# Panduan & Aturan Pengembangan Agen (AGENTS.md)

> Aturan yang baik singkat, spesifik, dan mudah diverifikasi pada hasil.

---

## Ketentuan Utama Pengembangan

| No | Kategori | Ketentuan |
|:---:|:---|:---|
| **01** | **Teknologi** | **React + Vite**; komponen fungsional (*functional components* & React Hooks) |
| **02** | **Penyimpanan** | **localStorage**; data latihan anonim (tanpa login/backend eksternal) |
| **03** | **Struktur** | Komponen di **`src/components/`** (modular, terorganisir per fitur) |
| **04** | **Bahasa** | Indonesia **baku dan komunikatif** (ramah dan mudah dipahami siswa SMA) |
| **05** | **Notasi** | **H₂SO₄**, **Ca²⁺**, dan **ΔH** ditulis benar (format subskrip, superskrip, dan simbol sains wajib presisi) |

---

## Detail Pelaksanaan & Verifikasi

### 1. Teknologi (React + Vite)
- Gunakan React 19 dengan TypeScript di atas bundler Vite.
- Seluruh komponen dibuat sebagai **komponen fungsional** (`const MyComponent: React.FC = () => { ... }`) dengan hooks standar (`useState`, `useEffect`, `useMemo`, `useCallback`, `useContext`).
- Hindari penggunaan *class components*.

### 2. Penyimpanan (localStorage & Anonim)
- Seluruh status progres belajar (*Quest Map*, level yang terbuka, bintang perolehan, XP, dan lencana) disimpan di browser `localStorage`.
- Data latihan dan riwayat pengerjaan soal bersifat anonim, tidak memerlukan autentikasi login atau basis data eksternal.
- Pastikan ada penanganan *fallback* jika `localStorage` kosong atau gagal dimuat (*graceful defaults*).

### 3. Struktur Komponen (`src/components/`)
Komponen aplikasi diatur rapi di bawah folder `src/components/`:
- `src/components/common/` : Komponen generik (*Button*, *Card*, *Modal*, *Badge*, *ProgressBar*, *ThemeToggle*).
- `src/components/layout/` : Kerangka antarmuka (*Navbar*, *Header*, *Footer*).
- `src/components/quest/` : Modul peta quest (*QuestMap*, *LevelNode*, *LevelDetailModal*).
- `src/components/calculator/` : Kalkulator jembatan mol interaktif (*MoleBridge*, *StepSolver*).
- `src/components/simulator/` : Simulasi visual partikulat pereaksi pembatas (*LimitingReactantSim*, *MoleculeCanvas*).
- `src/components/quiz/` : Engine latihan soal & pembahasan (*QuizEngine*, *QuestionCard*, *ExplanationModal*).

### 4. Bahasa (Indonesia Baku & Komunikatif)
- Menggunakan Bahasa Indonesia formal sesuai PUEBI namun luwes dan ramah pelajar.
- Istilah kimia mengikuti kaidah baku IUPAC bahasa Indonesia (contoh: *Stoikiometri*, *Pereaksi Pembatas*, *Massa Molar*, *Volume Molar*, *Rendemen*).
- Penjelasan konsep menggunakan analogi kehidupan nyata yang komunikatif (contoh: analogi resep sandwich untuk pereaksi pembatas).

### 5. Penulisan Notasi Kimia yang Benar
- Formula kimia dan ion **wajib** menggunakan tag HTML `<sub>` dan `<sup>`, atau karakter Unicode yang tepat:
  - Rumus senyawa: `H₂SO₄` / `H<sub>2</sub>SO<sub>4</sub>`, `CO₂`, `H₂O`, `Ca(OH)₂`, `CuSO₄·5H₂O`.
  - Muatan ion: `Ca²⁺` / `Ca<sup>2+</sup>`, `SO₄²⁻`, `Fe³⁺`, `Cl⁻`.
  - Simbol termokimia & fisika: `ΔH` (Delta H), `Ar`, `Mr`, `STP`, `RTP`.
  - Persamaan reaksi: Lengkap dengan koefisien, fase zat, dan panah reaksi:
    $$2H_2(g) + O_2(g) \longrightarrow 2H_2O(l)$$

---

## Referensi Terkait
- **PRD Lengkap**: Rujuk [.agent/PRD.md](file:///d:/Google%20Drive/Web-based%20Learning%202026/.agent/PRD.md) untuk rincian kurikulum stoikiometri, fitur jembatan mol, simulasi partikel, dan silabus tiap level.
- **Standar Estetika**: Rujuk [.agent/skills/taste-skill](file:///d:/Google%20Drive/Web-based%20Learning%202026/.agent/skills/taste-skill) untuk panduan antarmuka modern anti-slop bernuansa *"Modern Chemistry Lab"*.
