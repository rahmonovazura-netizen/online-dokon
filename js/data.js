const $ = (s, r = document) => r.querySelector(s);
const load = (k, d) => {
  try {
    return JSON.parse(localStorage.getItem(k)) ?? d;
  } catch {
    return d;
  }
};
const save = (k, v) => localStorage.setItem(k, JSON.stringify(v));
const money = (n) => Number(n).toLocaleString("uz-UZ") + " so'm";
const PRODUCT_IMAGES = {
  "Qizil olma": "images/olma.jpg",
  Banan: "images/banan.jpg",
  Uzum: "images/uzum.jpg",
  Qulupnay: "images/qulupnay.jpg",
  Shaftoli: "images/shaftoli.jpg",
  Tarvuz: "images/tarvuz.jpg",
  Pomidor: "images/pomidor.jpg",
  Sabzi: "images/sabzi.jpg",
  Bodring: "images/bodring.jpg",
  Kartoshka: "images/kartoshka.jpg",
  Baqlajon: "images/baqlajon.jpg",
  "Bulgar qalampiri": "images/qalampir.jpg",
  "Sut 1 litr": "images/sut.jpg",
  Pishloq: "images/pishloq.jpg",
  "Tuxum (10 ta)": "images/tuxum.jpg",
  "Sariyog'": "images/sariyog.jpg",
  Qatiq: "images/qatiq.jpg",
  "Mol go'shti": "images/mol-goshti.jpg",
  "Tovuq go'shti": "images/tovuq-goshti.jpg",
  Kolbasa: "images/kolbasa.jpg",
  Baliq: "images/baliq.jpg",
  Non: "images/non.jpg",
  Kruassan: "images/kruassan.jpg",
  Pechenye: "images/pechenye.jpg",
  Tort: "images/tort.jpg",
  Shokolad: "images/shokolad.jpg",
  "Apelsin sharbati": "images/apelsin-sharbati.jpg",
  "Qora choy": "images/qora-choy.jpg",
  Kofe: "images/kofe.jpg",
  "Mineral suv": "images/mineral-suv.jpg",
};

const SEED = [
  ["Qizil olma", "🍎", "Mevalar", 14000],
  ["Banan", "🍌", "Mevalar", 18000],
  ["Uzum", "🍇", "Mevalar", 25000],
  ["Qulupnay", "🍓", "Mevalar", 42000],
  ["Shaftoli", "🍑", "Mevalar", 22000],
  ["Tarvuz", "🍉", "Mevalar", 8000],
  ["Pomidor", "🍅", "Sabzavotlar", 12000],
  ["Sabzi", "🥕", "Sabzavotlar", 6000],
  ["Bodring", "🥒", "Sabzavotlar", 9000],
  ["Kartoshka", "🥔", "Sabzavotlar", 5000],
  ["Baqlajon", "🍆", "Sabzavotlar", 11000],
  ["Bulgar qalampiri", "🫑", "Sabzavotlar", 16000],
  ["Sut 1 litr", "🥛", "Sut mahsulotlari", 11000],
  ["Pishloq", "🧀", "Sut mahsulotlari", 68000],
  ["Tuxum (10 ta)", "🥚", "Sut mahsulotlari", 21000],
  ["Sariyog'", "🧈", "Sut mahsulotlari", 32000],
  ["Qatiq", "🥣", "Sut mahsulotlari", 9000],
  ["Mol go'shti", "🥩", "Go'sht", 120000],
  ["Tovuq go'shti", "🍗", "Go'sht", 42000],
  ["Kolbasa", "🌭", "Go'sht", 55000],
  ["Baliq", "🐟", "Go'sht", 58000],
  ["Non", "🍞", "Non va shirinlik", 4000],
  ["Kruassan", "🥐", "Non va shirinlik", 9000],
  ["Pechenye", "🍪", "Non va shirinlik", 15000],
  ["Tort", "🍰", "Non va shirinlik", 95000],
  ["Shokolad", "🍫", "Non va shirinlik", 18000],
  ["Apelsin sharbati", "🧃", "Ichimliklar", 16000],
  ["Qora choy", "🍵", "Ichimliklar", 20000],
  ["Kofe", "☕", "Ichimliklar", 48000],
  ["Mineral suv", "💧", "Ichimliklar", 5000],
];

const HUES = {
  Mevalar: ["#fee2e2", "#fca5a5"],
  Sabzavotlar: ["#dcfce7", "#86efac"],
  "Sut mahsulotlari": ["#e0f2fe", "#7dd3fc"],
  "Go'sht": ["#ffedd5", "#fdba74"],
  "Non va shirinlik": ["#fef9c3", "#fde047"],
  Ichimliklar: ["#f3e8ff", "#d8b4fe"],
};
function products() {
  let p = load("fm_products", null);
  if (!p) {
    p = SEED.map((s, i) => ({
      id: i + 1,
      name: s[0],
      emoji: s[1],
      cat: s[2],
      price: s[3],
      img: PRODUCT_IMAGES[s[0]] || "",
    }));
    save("fm_products", p);
  }
  // PRODUCT_IMAGES dagi yo'llarni saqlangan (rasmsiz) mahsulotlarga ham qo'llaymiz
  let changed = false;
  p.forEach((x) => {
    const u = PRODUCT_IMAGES[x.name];
    if (u && !x.img) {
      x.img = u;
      changed = true;
    }
  });
  if (changed) save("fm_products", p);
  return p;
}

// Aksiya sozlamalari (admin panelda o'zgartiriladi, localStorage'da saqlanadi)
function promo() {
  return { ...PROMO_DEFAULT, ...load("fm_promo", {}) };
}
function savePromo(p) {
  save("fm_promo", p);
}
const esc = (s) =>
  String(s ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
