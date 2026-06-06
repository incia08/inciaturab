import { useState, useEffect, useMemo } from "react";

// ─── THEME ───────────────────────────────────────────────────────────────────
const T = {
  bg: "#F4F1EE",
  card: "#EDEAE6",
  stone: "#D4CFC9",
  grey: "#A09A94",
  black: "#2A2A2A",
  pink: "#E8C4C4",
  gold: "#C9A84C",
  text: "#1E1E1E",
  subtle: "#7A7470",
  border: "#DDD8D2",
  white: "#FFFFFF",
  softPink: "#F5E8E8",
};

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@300;400;500&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: ${T.bg}; font-family: 'Jost', sans-serif; color: ${T.text}; }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: ${T.card}; }
  ::-webkit-scrollbar-thumb { background: ${T.gold}; border-radius: 2px; }

  .app { min-height: 100vh; background: ${T.bg}; }

  /* Moon texture overlay */
  .app::before {
    content: '';
    position: fixed; inset: 0; pointer-events: none; z-index: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
    opacity: 0.4;
  }

  .nav {
    position: sticky; top: 0; z-index: 100;
    background: rgba(244,241,238,0.95);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid ${T.border};
    padding: 0 16px;
  }
  .nav-inner {
    max-width: 420px; margin: 0 auto;
    display: flex; align-items: center; justify-content: space-between;
    padding: 12px 0;
  }
  .nav-logo {
    font-family: 'Cormorant Garamond', serif;
    font-size: 18px; font-weight: 600; letter-spacing: 2px;
    color: ${T.text};
  }
  .nav-logo span { color: ${T.gold}; }

  .tab-bar {
    position: fixed; bottom: 0; left: 0; right: 0; z-index: 100;
    background: rgba(244,241,238,0.97);
    backdrop-filter: blur(12px);
    border-top: 1px solid ${T.border};
    display: flex; justify-content: space-around;
    padding: 8px 0 max(8px, env(safe-area-inset-bottom));
    max-width: 420px; margin: 0 auto;
    left: 50%; transform: translateX(-50%);
  }
  .tab-btn {
    display: flex; flex-direction: column; align-items: center; gap: 3px;
    background: none; border: none; cursor: pointer;
    padding: 4px 8px; border-radius: 8px;
    transition: all 0.2s;
    font-family: 'Jost', sans-serif;
  }
  .tab-btn.active .tab-icon { color: ${T.gold}; }
  .tab-btn.active .tab-label { color: ${T.gold}; font-weight: 500; }
  .tab-icon { font-size: 20px; color: ${T.grey}; transition: color 0.2s; }
  .tab-label { font-size: 9px; color: ${T.grey}; letter-spacing: 0.5px; text-transform: uppercase; }

  .page { max-width: 420px; margin: 0 auto; padding: 16px 16px 100px; position: relative; z-index: 1; }

  .section-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 26px; font-weight: 300; letter-spacing: 1px;
    color: ${T.text}; margin-bottom: 4px;
  }
  .section-title span { color: ${T.gold}; font-style: italic; }
  .section-sub { font-size: 11px; color: ${T.subtle}; letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 20px; }

  .card {
    background: ${T.card};
    border: 1px solid ${T.border};
    border-radius: 16px;
    padding: 16px;
    margin-bottom: 12px;
  }
  .card-gold {
    background: linear-gradient(135deg, #FAF7F0 0%, #F5EFE0 100%);
    border: 1px solid ${T.gold}44;
  }
  .card-pink {
    background: linear-gradient(135deg, #FDF5F5 0%, #F8ECEC 100%);
    border: 1px solid ${T.pink};
  }

  .input-group { margin-bottom: 14px; }
  .input-label {
    font-size: 10px; letter-spacing: 1.5px; text-transform: uppercase;
    color: ${T.subtle}; margin-bottom: 6px; display: block;
  }
  .input-field {
    width: 100%; padding: 11px 14px;
    background: ${T.white}; border: 1px solid ${T.border};
    border-radius: 10px; font-family: 'Jost', sans-serif;
    font-size: 14px; color: ${T.text}; outline: none;
    transition: border-color 0.2s;
  }
  .input-field:focus { border-color: ${T.gold}; }
  textarea.input-field { resize: vertical; min-height: 80px; }

  .btn {
    width: 100%; padding: 13px;
    border: none; border-radius: 12px; cursor: pointer;
    font-family: 'Jost', sans-serif; font-size: 13px;
    font-weight: 500; letter-spacing: 1.5px; text-transform: uppercase;
    transition: all 0.2s;
  }
  .btn-gold {
    background: linear-gradient(135deg, ${T.gold}, #B8963E);
    color: ${T.white};
  }
  .btn-gold:hover { opacity: 0.9; transform: translateY(-1px); }
  .btn-outline {
    background: transparent; border: 1px solid ${T.gold};
    color: ${T.gold};
  }
  .btn-sm {
    width: auto; padding: 7px 14px; font-size: 11px;
  }
  .btn-grey {
    background: ${T.stone}; color: ${T.text};
  }
  .btn-pink {
    background: ${T.pink}; color: ${T.text};
  }

  .divider {
    height: 1px; background: ${T.border};
    margin: 16px 0;
  }
  .gold-divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, ${T.gold}, transparent);
    margin: 16px 0;
  }

  .badge {
    display: inline-block; padding: 3px 10px;
    border-radius: 20px; font-size: 10px;
    letter-spacing: 1px; text-transform: uppercase; font-weight: 500;
  }
  .badge-gold { background: ${T.gold}22; color: #8B6914; border: 1px solid ${T.gold}44; }
  .badge-pink { background: ${T.softPink}; color: #9B6B6B; border: 1px solid ${T.pink}; }
  .badge-green { background: #E8F5E9; color: #2E7D32; border: 1px solid #C8E6C9; }
  .badge-grey { background: ${T.stone}; color: ${T.subtle}; }

  .stat-row {
    display: flex; justify-content: space-between; align-items: center;
    padding: 10px 0; border-bottom: 1px solid ${T.border};
  }
  .stat-row:last-child { border-bottom: none; }
  .stat-label { font-size: 13px; color: ${T.subtle}; }
  .stat-value { font-size: 14px; font-weight: 500; color: ${T.text}; }
  .stat-value.gold { color: ${T.gold}; }

  .row { display: flex; gap: 10px; }
  .col { flex: 1; }

  .invoice-preview {
    background: ${T.white};
    border: 1px solid ${T.border};
    border-radius: 16px;
    padding: 24px;
    margin-top: 16px;
  }
  .invoice-header {
    text-align: center; margin-bottom: 20px;
  }
  .invoice-logo {
    font-family: 'Cormorant Garamond', serif;
    font-size: 22px; font-weight: 600; letter-spacing: 3px;
    color: ${T.text};
  }
  .invoice-tagline {
    font-size: 10px; color: ${T.subtle}; letter-spacing: 2px;
    text-transform: uppercase; margin-top: 2px;
  }

  .tc-item {
    display: flex; gap: 12px; align-items: flex-start;
    padding: 10px 0; border-bottom: 1px solid ${T.border};
  }
  .tc-item:last-child { border-bottom: none; }
  .tc-check {
    width: 20px; height: 20px; min-width: 20px;
    border: 1.5px solid ${T.gold}; border-radius: 5px;
    cursor: pointer; display: flex; align-items: center; justify-content: center;
    background: ${T.white}; transition: all 0.2s;
  }
  .tc-check.checked { background: ${T.gold}; border-color: ${T.gold}; }
  .tc-text { font-size: 12px; color: ${T.text}; line-height: 1.6; }
  .tc-num { font-weight: 600; color: ${T.gold}; }

  .calendar-grid {
    display: grid; grid-template-columns: repeat(7, 1fr);
    gap: 4px; margin-top: 12px;
  }
  .cal-day-name {
    text-align: center; font-size: 9px; color: ${T.subtle};
    letter-spacing: 1px; text-transform: uppercase; padding: 4px 0;
  }
  .cal-day {
    aspect-ratio: 1; display: flex; align-items: center; justify-content: center;
    border-radius: 8px; font-size: 12px; cursor: pointer;
    position: relative; transition: all 0.15s;
    border: 1px solid transparent;
  }
  .cal-day:hover { border-color: ${T.gold}44; }
  .cal-day.empty { cursor: default; }
  .cal-day.today { border-color: ${T.gold}; color: ${T.gold}; font-weight: 600; }
  .cal-day.booked { background: ${T.pink}; color: ${T.text}; }
  .cal-day.partial { background: ${T.gold}22; color: #8B6914; }
  .cal-day.selected { background: ${T.gold}; color: ${T.white}; }

  .staff-card {
    display: flex; align-items: center; gap: 12px;
    padding: 12px; background: ${T.card}; border: 1px solid ${T.border};
    border-radius: 12px; margin-bottom: 8px;
  }
  .staff-avatar {
    width: 42px; height: 42px; border-radius: 50%;
    background: linear-gradient(135deg, ${T.gold}44, ${T.pink});
    display: flex; align-items: center; justify-content: center;
    font-family: 'Cormorant Garamond', serif;
    font-size: 16px; font-weight: 600; color: ${T.text};
    flex-shrink: 0;
  }
  .staff-name { font-size: 14px; font-weight: 500; color: ${T.text}; }
  .staff-hours { font-size: 11px; color: ${T.subtle}; margin-top: 2px; }
  .stars { color: ${T.gold}; font-size: 14px; }

  .modal-overlay {
    position: fixed; inset: 0; z-index: 200;
    background: rgba(30,30,30,0.5);
    backdrop-filter: blur(4px);
    display: flex; align-items: flex-end; justify-content: center;
  }
  .modal {
    background: ${T.bg}; border-radius: 24px 24px 0 0;
    padding: 24px; width: 100%; max-width: 420px;
    max-height: 90vh; overflow-y: auto;
    animation: slideUp 0.3s ease;
  }
  @keyframes slideUp {
    from { transform: translateY(100%); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  .modal-handle {
    width: 40px; height: 4px; background: ${T.stone};
    border-radius: 2px; margin: 0 auto 20px;
  }
  .modal-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 22px; font-weight: 300; margin-bottom: 16px;
    color: ${T.text};
  }

  .dashboard-stat {
    flex: 1; background: ${T.card}; border: 1px solid ${T.border};
    border-radius: 14px; padding: 14px; text-align: center;
  }
  .dash-num {
    font-family: 'Cormorant Garamond', serif;
    font-size: 28px; font-weight: 600; color: ${T.gold};
    line-height: 1;
  }
  .dash-label { font-size: 10px; color: ${T.subtle}; margin-top: 4px; letter-spacing: 1px; text-transform: uppercase; }

  .bar-chart { margin-top: 12px; }
  .bar-row {
    display: flex; align-items: center; gap: 8px; margin-bottom: 10px;
  }
  .bar-month { font-size: 10px; color: ${T.subtle}; width: 28px; text-align: right; }
  .bar-track { flex: 1; height: 8px; background: ${T.stone}; border-radius: 4px; overflow: hidden; }
  .bar-fill { height: 100%; border-radius: 4px; transition: width 0.8s ease; }
  .bar-val { font-size: 10px; color: ${T.subtle}; width: 40px; }

  .inv-list-item {
    display: flex; justify-content: space-between; align-items: center;
    padding: 12px; background: ${T.card}; border: 1px solid ${T.border};
    border-radius: 12px; margin-bottom: 8px; cursor: pointer;
    transition: all 0.15s;
  }
  .inv-list-item:hover { border-color: ${T.gold}44; }
  .inv-client { font-size: 14px; font-weight: 500; color: ${T.text}; }
  .inv-service { font-size: 11px; color: ${T.subtle}; margin-top: 2px; }
  .inv-amount { font-size: 15px; font-weight: 600; color: ${T.gold}; }

  .repeat-badge {
    background: linear-gradient(135deg, ${T.gold}22, ${T.pink}44);
    border: 1px solid ${T.gold}44; border-radius: 8px;
    padding: 10px 12px; margin-bottom: 8px;
    display: flex; align-items: center; gap: 10px;
  }
  .repeat-icon { font-size: 20px; }
  .repeat-name { font-size: 14px; font-weight: 500; }
  .repeat-count { font-size: 11px; color: ${T.subtle}; }

  .inventory-item {
    display: flex; justify-content: space-between; align-items: center;
    padding: 12px; background: ${T.card}; border: 1px solid ${T.border};
    border-radius: 12px; margin-bottom: 8px;
  }
  .inv-name { font-size: 13px; font-weight: 500; }
  .inv-cat { font-size: 11px; color: ${T.subtle}; }
  .inv-qty { font-size: 18px; font-weight: 600; }
  .inv-low { color: #C0392B; }
  .inv-ok { color: #27AE60; }

  .expense-item {
    display: flex; justify-content: space-between; align-items: center;
    padding: 10px 0; border-bottom: 1px solid ${T.border};
  }
  .expense-item:last-child { border-bottom: none; }

  select.input-field {
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23A09A94' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 14px center;
    padding-right: 36px;
  }

  .toast {
    position: fixed; bottom: 90px; left: 50%; transform: translateX(-50%);
    background: ${T.text}; color: ${T.white}; padding: 10px 20px;
    border-radius: 20px; font-size: 13px; z-index: 300;
    animation: fadeInOut 2.5s ease forwards;
  }
  @keyframes fadeInOut {
    0% { opacity: 0; transform: translateX(-50%) translateY(10px); }
    15% { opacity: 1; transform: translateX(-50%) translateY(0); }
    80% { opacity: 1; }
    100% { opacity: 0; }
  }

  .gold-line {
    width: 40px; height: 2px;
    background: linear-gradient(90deg, ${T.gold}, transparent);
    margin-bottom: 16px;
  }

  .whatsapp-btn {
    background: #25D366; color: white;
    display: flex; align-items: center; justify-content: center; gap: 8px;
  }
`;

// ─── DATA ─────────────────────────────────────────────────────────────────────
const STAFF = [
  { name: "Incia", start: "07:00", end: "19:30", defaultStart: "07:00" },
  { name: "Saba", start: "07:00", end: "19:30", defaultStart: "07:00" },
  { name: "Abiha", start: "07:00", end: "19:30", defaultStart: "07:00" },
  { name: "Divya", start: "07:00", end: "19:30", defaultStart: "07:00" },
  { name: "Bushra", start: "10:00", end: "19:30", defaultStart: "10:00" },
  { name: "Ayesha", start: "10:00", end: "19:30", defaultStart: "10:00" },
  { name: "Asna", start: "10:00", end: "19:30", defaultStart: "10:00" },
];

const SERVICES = [
  { cat: "Signature by Incia", items: [
    { name: "Baraat / Valima", price: 50000 },
    { name: "Mehndi", price: 38000 },
    { name: "Engagement / Nikkah", price: 32000 },
    { name: "Mayoon", price: 24000 },
    { name: "Party Makeup", price: 18000 },
    { name: "Same Day Nikkah + Reception", price: 65000 },
  ]},
  { cat: "Pro Artist", items: [
    { name: "Baraat / Valima", price: 30000 },
    { name: "Mehndi", price: 25000 },
    { name: "Engagement / Nikkah", price: 20000 },
    { name: "Mayoon", price: 15000 },
    { name: "Party Makeup", price: 10000 },
    { name: "Same Day Nikkah + Reception", price: 35000 },
  ]},
  { cat: "Studio Artist", items: [
    { name: "Baraat / Valima", price: 15000 },
    { name: "Mehndi", price: 12000 },
    { name: "Engagement / Nikkah", price: 10000 },
    { name: "Mayoon", price: 9000 },
    { name: "Party Makeup", price: 7000 },
  ]},
  { cat: "Party Makeup Deals", items: [
    { name: "Girl Next Door", price: 2999 },
    { name: "Divine Diva", price: 3999 },
    { name: "Fiercely Gorgeous", price: 4999 },
  ]},
  { cat: "Bridal Services Package", items: [
    { name: "Bridal Services Package (Full)", price: 12000 },
  ]},
];

const EXPENSE_CATS = ["Staff Salaries", "Products & Supplies", "Electricity", "Personal (Child & Self)", "Marketing & Social Media", "Apps & Subscriptions", "Extras / Miscellaneous"];

const TERMS = [
  { num: 1, title: "Advance Payment", text: "A booking advance is required to secure your date. Once paid, the advance is non-refundable, non-adjustable and cannot be transferred to another date or person." },
  { num: 2, title: "Remaining Balance", text: "Your remaining balance must be paid in full before your service begins. We are unable to start until payment is complete." },
  { num: 3, title: "Changes to Services", text: "Any reductions to your booked services will incur a charge of PKR 5,000 per change." },
  { num: 4, title: "Arrival Time", text: "Please arrive on time. If you are more than 15 minutes late, a charge of PKR 1,000 will apply. Every 10 minutes after that adds PKR 500. If you are over 1 hour late, your booking will be cancelled and all payments will be forfeited." },
  { num: 5, title: "Rescheduling", text: "If you need to reschedule, please let us know at least 60 days in advance. Rescheduling is subject to availability and is not guaranteed." },
  { num: 6, title: "Children & Extra Guests", text: "To maintain a calm and focused environment, children and attendants are not permitted during the service. A fee of PKR 10,000 applies if this is not respected." },
  { num: 7, title: "Health Conditions", text: "Please inform us of any skin conditions, allergies, or health concerns beforehand. We reserve the right to decline service if we feel it may affect wellbeing. Payments remain non-refundable in such cases." },
  { num: 8, title: "Head Lice", text: "For hygiene and safety of all clients, we are unable to provide services if lice or nits are present. No refund or reschedule will be offered." },
  { num: 9, title: "Mobile Phones", text: "Mobile phone use should be kept to a minimum during your service. Any delays caused by phone use are not our responsibility." },
  { num: 10, title: "Venue & Location", text: "We reserve the right to change the service location within the same city if needed due to operational reasons. No refund will apply for location changes." },
  { num: 11, title: "Misconduct", text: "Any inappropriate behaviour will result in immediate termination of services without refund." },
  { num: 12, title: "Force Majeure", text: "In situations beyond our control — emergencies, natural disasters, or government restrictions — we cannot be held liable. All payments remain non-refundable." },
];

const fmt = (n) => `PKR ${Number(n || 0).toLocaleString()}`;
const today = new Date();

function useLocalStorage(key, init) {
  const [val, setVal] = useState(() => {
    try { const s = localStorage.getItem(key); return s ? JSON.parse(s) : init; }
    catch { return init; }
  });
  useEffect(() => { try { localStorage.setItem(key, JSON.stringify(val)); } catch {} }, [key, val]);
  return [val, setVal];
}

// ─── TOAST ───────────────────────────────────────────────────────────────────
function Toast({ msg }) {
  if (!msg) return null;
  return <div className="toast">{msg}</div>;
}

// ─── DASHBOARD ───────────────────────────────────────────────────────────────
function Dashboard({ invoices, expenses, inventory }) {
  const now = new Date();
  const monthInvoices = invoices.filter(i => {
    const d = new Date(i.createdAt);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  });
  const totalIncome = monthInvoices.filter(i => i.paid).reduce((a, b) => a + (b.total - b.discount), 0);
  const pending = monthInvoices.filter(i => !i.paid).length;
  const totalExpenses = expenses.filter(e => {
    const d = new Date(e.date);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).reduce((a, b) => a + Number(b.amount), 0);
  const profit = totalIncome - totalExpenses;
  const lowStock = inventory.filter(i => i.qty <= i.minQty).length;

  const todayStr = now.toISOString().split("T")[0];
  const todayBookings = invoices.filter(i => i.dates && i.dates.some(d => d.date === todayStr));

  const upcoming = invoices
    .filter(i => i.dates && i.dates.some(d => d.date >= todayStr))
    .sort((a, b) => {
      const ad = Math.min(...a.dates.map(d => new Date(d.date)));
      const bd = Math.min(...b.dates.map(d => new Date(d.date)));
      return ad - bd;
    }).slice(0, 3);

  // Repeat clients
  const clientMap = {};
  invoices.forEach(i => {
    if (!i.phone) return;
    if (!clientMap[i.phone]) clientMap[i.phone] = { name: i.clientName, count: 0, total: 0 };
    clientMap[i.phone].count++;
    clientMap[i.phone].total += (i.total - i.discount);
  });
  const repeats = Object.values(clientMap).filter(c => c.count >= 2).sort((a, b) => b.count - a.count);

  return (
    <div className="page">
      <div className="gold-line" />
      <p className="section-title">Good <span>Morning</span></p>
      <p className="section-sub">Incia Turab Luxury Artist</p>

      <div className="row" style={{ marginBottom: 12 }}>
        <div className="dashboard-stat">
          <div className="dash-num">{fmt(totalIncome).replace("PKR ", "")}</div>
          <div className="dash-label">Income This Month</div>
        </div>
        <div className="dashboard-stat">
          <div className="dash-num" style={{ color: profit >= 0 ? T.gold : "#C0392B" }}>{fmt(Math.abs(profit)).replace("PKR ", "")}</div>
          <div className="dash-label">{profit >= 0 ? "Profit" : "Loss"} This Month</div>
        </div>
      </div>

      <div className="row" style={{ marginBottom: 20 }}>
        <div className="dashboard-stat">
          <div className="dash-num" style={{ fontSize: 24 }}>{pending}</div>
          <div className="dash-label">Pending Payments</div>
        </div>
        <div className="dashboard-stat">
          <div className="dash-num" style={{ fontSize: 24, color: lowStock > 0 ? "#C0392B" : T.gold }}>{lowStock}</div>
          <div className="dash-label">Low Stock Items</div>
        </div>
        <div className="dashboard-stat">
          <div className="dash-num" style={{ fontSize: 24 }}>{todayBookings.length}</div>
          <div className="dash-label">Today's Bookings</div>
        </div>
      </div>

      {todayBookings.length > 0 && (
        <div className="card card-gold" style={{ marginBottom: 16 }}>
          <p style={{ fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", color: T.subtle, marginBottom: 10 }}>Today's Schedule</p>
          {todayBookings.map((b, i) => {
            const td = b.dates.find(d => d.date === todayStr);
            return (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: i < todayBookings.length - 1 ? `1px solid ${T.border}` : "none" }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{b.clientName}</div>
                  <div style={{ fontSize: 11, color: T.subtle }}>{b.services?.map(s => s.name).join(", ")}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 11, color: T.gold }}>Arrive: {td?.arrival || "—"}</div>
                  <div style={{ fontSize: 11, color: T.subtle }}>Ready: {td?.ready || "—"}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {upcoming.length > 0 && (
        <div className="card" style={{ marginBottom: 16 }}>
          <p style={{ fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", color: T.subtle, marginBottom: 10 }}>Upcoming Bookings</p>
          {upcoming.map((b, i) => {
            const nextDate = b.dates.filter(d => d.date >= todayStr).sort()[0];
            return (
              <div key={i} className="stat-row">
                <div>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{b.clientName}</div>
                  <div style={{ fontSize: 11, color: T.subtle }}>{nextDate?.date}</div>
                </div>
                <span className={`badge ${b.paid ? "badge-green" : "badge-gold"}`}>{b.paid ? "Paid" : "Pending"}</span>
              </div>
            );
          })}
        </div>
      )}

      {repeats.length > 0 && (
        <div>
          <p style={{ fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", color: T.subtle, marginBottom: 10 }}>👑 Loyal Clients</p>
          {repeats.slice(0, 3).map((c, i) => (
            <div key={i} className="repeat-badge">
              <div className="repeat-icon">🌸</div>
              <div style={{ flex: 1 }}>
                <div className="repeat-name">{c.name}</div>
                <div className="repeat-count">{c.count} bookings · {fmt(c.total)} total</div>
              </div>
              <span className="badge badge-gold">VIP</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── INVOICE FORM ─────────────────────────────────────────────────────────────
function InvoiceForm({ invoices, setInvoices, showToast }) {
  const emptyForm = {
    clientName: "", phone: "", staffAssigned: "",
    services: [{ name: "", price: "" }],
    dates: [{ date: "", arrival: "", ready: "" }],
    discount: "", advance: "", notes: "",
    tcChecked: Array(TERMS.length).fill(false),
    paid: false, remainingPaid: false,
    createdAt: new Date().toISOString(),
  };
  const [form, setForm] = useState(emptyForm);
  const [showInvoice, setShowInvoice] = useState(false);
  const [step, setStep] = useState(1); // 1=form, 2=TC, 3=invoice
  const [viewingId, setViewingId] = useState(null);

  const allTCChecked = form.tcChecked.every(Boolean);
  const subtotal = form.services.reduce((a, s) => a + Number(s.price || 0), 0);
  const discountAmt = Number(form.discount || 0);
  const total = subtotal - discountAmt;
  const remaining = total - Number(form.advance || 0);

  const addService = () => setForm(f => ({ ...f, services: [...f.services, { name: "", price: "" }] }));
  const removeService = (i) => setForm(f => ({ ...f, services: f.services.filter((_, idx) => idx !== i) }));
  const updateService = (i, field, val) => setForm(f => {
    const s = [...f.services]; s[i] = { ...s[i], [field]: val }; return { ...f, services: s };
  });

  const addDate = () => setForm(f => ({ ...f, dates: [...f.dates, { date: "", arrival: "", ready: "" }] }));
  const removeDate = (i) => setForm(f => ({ ...f, dates: f.dates.filter((_, idx) => idx !== i) }));
  const updateDate = (i, field, val) => setForm(f => {
    const d = [...f.dates]; d[i] = { ...d[i], [field]: val }; return { ...f, dates: d };
  });

  const toggleTC = (i) => setForm(f => {
    const tc = [...f.tcChecked]; tc[i] = !tc[i]; return { ...f, tcChecked: tc };
  });

  const saveInvoice = () => {
    if (!form.clientName || !form.phone) { showToast("Please fill client name and phone"); return; }
    const inv = { ...form, id: Date.now(), total: subtotal, discount: discountAmt, createdAt: new Date().toISOString() };
    setInvoices(prev => [inv, ...prev]);
    setForm({ ...emptyForm, tcChecked: Array(TERMS.length).fill(false) });
    setStep(1);
    setShowInvoice(false);
    showToast("✨ Invoice saved!");
  };

  const openExisting = (id) => {
    const inv = invoices.find(i => i.id === id);
    if (inv) { setForm(inv); setViewingId(id); setStep(3); }
  };

  const markPaid = (id) => {
    setInvoices(prev => prev.map(i => i.id === id ? { ...i, paid: true, remainingPaid: true } : i));
    showToast("✅ Marked as paid!");
  };

  const openWhatsApp = (inv) => {
    const msg = encodeURIComponent(`Assalamualaykum ${inv.clientName} 💛\n\nThank you for choosing Incia Turab Luxury Artist!\n\nYour invoice summary:\nService: ${inv.services?.map(s => s.name).join(", ")}\nTotal: ${fmt(inv.total - inv.discount)}\nAdvance Paid: ${fmt(inv.advance)}\nRemaining: ${fmt((inv.total - inv.discount) - Number(inv.advance))}\n\nDate(s): ${inv.dates?.map(d => d.date).join(", ")}\n\nWe can't wait to make you look incredible! 🌸\n— Team Incia Turab\n📱 03321221223`);
    window.open(`https://wa.me/${inv.phone}?text=${msg}`, "_blank");
  };

  const sendRating = (inv) => {
    const msg = encodeURIComponent(`Assalamualaykum ${inv.clientName} 💛\n\nThank you so much for choosing Incia Turab Luxury Artist for your beautiful day — it was truly an honour to be part of it!\n\nWe'd love to hear your thoughts. Could you take 2 minutes to share your experience?\n\n⭐ Rate your artist: ${inv.staffAssigned || "our team"}\n⭐ Overall experience\n💬 A few kind words (optional)\n\nYour feedback helps us grow and serve you better. We hope to see you again soon! 🌸\n\n— Team Incia Turab\n📍 Jamshed Road, Gurumandir, Karachi\n📱 03321221223`);
    window.open(`https://wa.me/${inv.phone}?text=${msg}`, "_blank");
  };

  if (step === 3 || showInvoice) {
    const inv = viewingId ? invoices.find(i => i.id === viewingId) : { ...form, total: subtotal, discount: discountAmt };
    return (
      <div className="page">
        <button className="btn btn-outline btn-sm" style={{ marginBottom: 16 }} onClick={() => { setStep(1); setViewingId(null); setShowInvoice(false); }}>← Back</button>
        <InvoicePreview inv={inv} onSave={viewingId ? null : saveInvoice} onWhatsApp={openWhatsApp} onRating={sendRating} onMarkPaid={markPaid} />
      </div>
    );
  }

  if (step === 2) return (
    <div className="page">
      <button className="btn btn-outline btn-sm" style={{ marginBottom: 16 }} onClick={() => setStep(1)}>← Back</button>
      <p className="section-title">Terms & <span>Conditions</span></p>
      <p className="section-sub">Please read and agree to all</p>
      <div className="card">
        {TERMS.map((t, i) => (
          <div key={i} className="tc-item">
            <div className={`tc-check ${form.tcChecked[i] ? "checked" : ""}`} onClick={() => toggleTC(i)}>
              {form.tcChecked[i] && <span style={{ color: T.white, fontSize: 12 }}>✓</span>}
            </div>
            <div className="tc-text">
              <span className="tc-num">{t.num}. {t.title}: </span>{t.text}
            </div>
          </div>
        ))}
      </div>
      <p style={{ fontSize: 11, color: T.subtle, textAlign: "center", margin: "12px 0", fontStyle: "italic" }}>
        Thank you for trusting Incia Turab Luxury Artist with your beautiful day. 🌸
      </p>
      <button className="btn btn-gold" disabled={!allTCChecked} onClick={() => setStep(3)} style={{ opacity: allTCChecked ? 1 : 0.5 }}>
        View Invoice →
      </button>
    </div>
  );

  return (
    <div className="page">
      <div className="gold-line" />
      <p className="section-title">New <span>Invoice</span></p>
      <p className="section-sub">Create client booking</p>

      <div className="card">
        <p style={{ fontSize: 11, color: T.subtle, letterSpacing: 1, marginBottom: 12, textTransform: "uppercase" }}>Client Details</p>
        <div className="input-group">
          <label className="input-label">Client Name *</label>
          <input className="input-field" placeholder="Full name" value={form.clientName} onChange={e => setForm(f => ({ ...f, clientName: e.target.value }))} />
        </div>
        <div className="input-group">
          <label className="input-label">WhatsApp Number *</label>
          <input className="input-field" placeholder="03XXXXXXXXX" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
        </div>
        <div className="input-group">
          <label className="input-label">Artist / Staff Assigned</label>
          <select className="input-field" value={form.staffAssigned} onChange={e => setForm(f => ({ ...f, staffAssigned: e.target.value }))}>
            <option value="">Select artist</option>
            {STAFF.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
          </select>
        </div>
      </div>

      <div className="card">
        <p style={{ fontSize: 11, color: T.subtle, letterSpacing: 1, marginBottom: 12, textTransform: "uppercase" }}>Services</p>
        {form.services.map((s, i) => (
          <div key={i} style={{ marginBottom: 12 }}>
            <div className="row" style={{ alignItems: "flex-end" }}>
              <div className="col">
                <label className="input-label">Service {i + 1}</label>
                <input className="input-field" placeholder="e.g. Bridal Baraat" value={s.name} onChange={e => updateService(i, "name", e.target.value)} />
              </div>
              <div style={{ width: 100 }}>
                <label className="input-label">Price (PKR)</label>
                <input className="input-field" type="number" placeholder="0" value={s.price} onChange={e => updateService(i, "price", e.target.value)} />
              </div>
              {form.services.length > 1 && <button className="btn btn-grey btn-sm" style={{ marginBottom: 0, height: 40, width: 36, padding: 0 }} onClick={() => removeService(i)}>×</button>}
            </div>
          </div>
        ))}
        <button className="btn btn-outline btn-sm" onClick={addService}>+ Add Service</button>

        <div className="divider" />
        <div className="row">
          <div className="col">
            <label className="input-label">Discount (PKR)</label>
            <input className="input-field" type="number" placeholder="0" value={form.discount} onChange={e => setForm(f => ({ ...f, discount: e.target.value }))} />
          </div>
          <div className="col">
            <label className="input-label">Advance Paid</label>
            <input className="input-field" type="number" placeholder="0" value={form.advance} onChange={e => setForm(f => ({ ...f, advance: e.target.value }))} />
          </div>
        </div>

        <div className="divider" />
        <div className="stat-row"><span className="stat-label">Subtotal</span><span className="stat-value">{fmt(subtotal)}</span></div>
        <div className="stat-row"><span className="stat-label">Discount</span><span className="stat-value">- {fmt(discountAmt)}</span></div>
        <div className="stat-row"><span className="stat-label">Total</span><span className="stat-value gold">{fmt(total)}</span></div>
        <div className="stat-row"><span className="stat-label">Advance Paid</span><span className="stat-value">- {fmt(form.advance)}</span></div>
        <div className="stat-row"><span className="stat-label" style={{ fontWeight: 600 }}>Remaining (due on first visit)</span><span className="stat-value gold" style={{ fontWeight: 700 }}>{fmt(remaining)}</span></div>
      </div>

      <div className="card">
        <p style={{ fontSize: 11, color: T.subtle, letterSpacing: 1, marginBottom: 12, textTransform: "uppercase" }}>Service Dates</p>
        {form.dates.map((d, i) => (
          <div key={i} style={{ marginBottom: 14 }}>
            <div className="row" style={{ alignItems: "center", marginBottom: 6 }}>
              <p style={{ fontSize: 12, fontWeight: 500, flex: 1 }}>Day {i + 1}</p>
              {form.dates.length > 1 && <button className="btn btn-grey btn-sm" style={{ padding: "4px 10px", fontSize: 11 }} onClick={() => removeDate(i)}>Remove</button>}
            </div>
            <div className="input-group" style={{ marginBottom: 8 }}>
              <label className="input-label">Date</label>
              <input className="input-field" type="date" value={d.date} onChange={e => updateDate(i, "date", e.target.value)} />
            </div>
            <div className="row">
              <div className="col">
                <label className="input-label">Arrival Time</label>
                <input className="input-field" type="time" value={d.arrival} onChange={e => updateDate(i, "arrival", e.target.value)} />
              </div>
              <div className="col">
                <label className="input-label">Ready Time</label>
                <input className="input-field" type="time" value={d.ready} onChange={e => updateDate(i, "ready", e.target.value)} />
              </div>
            </div>
          </div>
        ))}
        <button className="btn btn-outline btn-sm" onClick={addDate}>+ Add Day</button>
      </div>

      <div className="card">
        <label className="input-label">Notes (optional)</label>
        <textarea className="input-field" placeholder="Any special instructions..." value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} />
      </div>

      <button className="btn btn-gold" onClick={() => setStep(2)}>Proceed to Terms & Conditions →</button>

      {invoices.length > 0 && (
        <div style={{ marginTop: 24 }}>
          <div className="gold-divider" />
          <p style={{ fontSize: 11, color: T.subtle, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 12 }}>Recent Invoices</p>
          {invoices.slice(0, 5).map(inv => (
            <div key={inv.id} className="inv-list-item" onClick={() => openExisting(inv.id)}>
              <div>
                <div className="inv-client">{inv.clientName}</div>
                <div className="inv-service">{inv.services?.map(s => s.name).join(", ")}</div>
                <div style={{ fontSize: 10, color: T.subtle, marginTop: 2 }}>{new Date(inv.createdAt).toLocaleDateString()}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div className="inv-amount">{fmt(inv.total - inv.discount)}</div>
                <span className={`badge ${inv.paid ? "badge-green" : "badge-gold"}`}>{inv.paid ? "Paid" : "Pending"}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function InvoicePreview({ inv, onSave, onWhatsApp, onRating, onMarkPaid }) {
  const remaining = (inv.total - inv.discount) - Number(inv.advance || 0);
  return (
    <div>
      <div className="invoice-preview">
        <div className="invoice-header">
          <div style={{ fontSize: 28, color: T.gold, fontFamily: "'Cormorant Garamond', serif", marginBottom: 4 }}>✦ IT ✦</div>
          <div className="invoice-logo">INCIA TURAB</div>
          <div className="invoice-tagline">Luxury Artist</div>
          <div style={{ fontSize: 10, color: T.subtle, marginTop: 4 }}>📍 Jamshed Road, Gurumandir, Karachi · 03321221223</div>
        </div>
        <div className="gold-divider" />

        <div className="row" style={{ marginBottom: 12 }}>
          <div className="col">
            <p style={{ fontSize: 10, color: T.subtle, marginBottom: 2 }}>CLIENT</p>
            <p style={{ fontSize: 14, fontWeight: 600 }}>{inv.clientName}</p>
            <p style={{ fontSize: 12, color: T.subtle }}>{inv.phone}</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ fontSize: 10, color: T.subtle, marginBottom: 2 }}>INVOICE DATE</p>
            <p style={{ fontSize: 12 }}>{new Date(inv.createdAt || Date.now()).toLocaleDateString()}</p>
            {inv.staffAssigned && <p style={{ fontSize: 11, color: T.gold, marginTop: 2 }}>Artist: {inv.staffAssigned}</p>}
          </div>
        </div>

        <div className="divider" />
        <p style={{ fontSize: 10, color: T.subtle, marginBottom: 8 }}>SERVICES</p>
        {inv.services?.map((s, i) => (
          <div key={i} className="stat-row">
            <span className="stat-label" style={{ color: T.text }}>{s.name}</span>
            <span className="stat-value">{fmt(s.price)}</span>
          </div>
        ))}
        <div className="divider" />
        <div className="stat-row"><span className="stat-label">Subtotal</span><span className="stat-value">{fmt(inv.total)}</span></div>
        {inv.discount > 0 && <div className="stat-row"><span className="stat-label">Discount</span><span className="stat-value">- {fmt(inv.discount)}</span></div>}
        <div className="stat-row"><span className="stat-label" style={{ fontWeight: 600 }}>Total</span><span className="stat-value gold">{fmt(inv.total - inv.discount)}</span></div>
        <div className="stat-row"><span className="stat-label">Advance Paid</span><span className="stat-value">- {fmt(inv.advance)}</span></div>
        <div className="stat-row">
          <span className="stat-label" style={{ fontWeight: 700, color: T.text }}>Remaining (due on arrival)</span>
          <span className="stat-value gold" style={{ fontWeight: 700 }}>{fmt(remaining)}</span>
        </div>

        {inv.dates?.length > 0 && (
          <>
            <div className="divider" />
            <p style={{ fontSize: 10, color: T.subtle, marginBottom: 8 }}>SERVICE DATES</p>
            {inv.dates.map((d, i) => (
              <div key={i} className="stat-row">
                <span className="stat-label">Day {i + 1}: {d.date}</span>
                <span style={{ fontSize: 11, color: T.subtle }}>Arrive: {d.arrival} · Ready: {d.ready}</span>
              </div>
            ))}
          </>
        )}

        {inv.notes && (
          <>
            <div className="divider" />
            <p style={{ fontSize: 10, color: T.subtle, marginBottom: 4 }}>NOTES</p>
            <p style={{ fontSize: 12, color: T.text }}>{inv.notes}</p>
          </>
        )}

        <div className="gold-divider" style={{ margin: "20px 0 12px" }} />
        <p style={{ fontSize: 10, color: T.subtle, textAlign: "center", fontStyle: "italic" }}>
          Thank you for choosing Incia Turab Luxury Artist 🌸<br />
          We can't wait to make you look and feel incredible.
        </p>
      </div>

      <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 10 }}>
        {onSave && <button className="btn btn-gold" onClick={onSave}>Save Invoice ✦</button>}
        {onWhatsApp && <button className="btn btn-gold whatsapp-btn" onClick={() => onWhatsApp(inv)}>📲 Share via WhatsApp</button>}
        {onMarkPaid && !inv.paid && <button className="btn btn-outline" onClick={() => onMarkPaid(inv.id)}>✅ Mark as Paid</button>}
        {inv.paid && <div style={{ textAlign: "center", color: "#27AE60", fontSize: 13, padding: 8 }}>✅ Payment Complete</div>}
        {onRating && inv.paid && <button className="btn btn-pink" onClick={() => onRating(inv)}>⭐ Send Rating Request</button>}
      </div>
    </div>
  );
}

// ─── CALENDAR ─────────────────────────────────────────────────────────────────
function CalendarView({ invoices }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedStaff, setSelectedStaff] = useState("All");

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const getBookingsForDay = (day) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return invoices.filter(inv => {
      const hasDate = inv.dates?.some(d => d.date === dateStr);
      const staffMatch = selectedStaff === "All" || inv.staffAssigned === selectedStaff;
      return hasDate && staffMatch;
    });
  };

  const dayBookings = selectedDay ? getBookingsForDay(selectedDay) : [];

  return (
    <div className="page">
      <div className="gold-line" />
      <p className="section-title">Booking <span>Calendar</span></p>
      <p className="section-sub">Staff availability & schedule</p>

      <div className="card" style={{ marginBottom: 12 }}>
        <label className="input-label">Filter by Staff</label>
        <select className="input-field" value={selectedStaff} onChange={e => setSelectedStaff(e.target.value)}>
          <option value="All">All Staff</option>
          {STAFF.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
        </select>
      </div>

      <div className="card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <button className="btn btn-outline btn-sm" onClick={() => setCurrentDate(new Date(year, month - 1, 1))}>‹</button>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 600 }}>
            {monthNames[month]} {year}
          </p>
          <button className="btn btn-outline btn-sm" onClick={() => setCurrentDate(new Date(year, month + 1, 1))}>›</button>
        </div>

        <div className="calendar-grid">
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(d => <div key={d} className="cal-day-name">{d}</div>)}
          {Array(firstDay).fill(null).map((_, i) => <div key={`e${i}`} className="cal-day empty" />)}
          {Array(daysInMonth).fill(null).map((_, i) => {
            const day = i + 1;
            const bookings = getBookingsForDay(day);
            const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
            const isSelected = selectedDay === day;
            let cls = "cal-day";
            if (isSelected) cls += " selected";
            else if (isToday) cls += " today";
            else if (bookings.length >= 3) cls += " booked";
            else if (bookings.length > 0) cls += " partial";
            return (
              <div key={day} className={cls} onClick={() => setSelectedDay(day === selectedDay ? null : day)}>
                {day}
                {bookings.length > 0 && !isSelected && <span style={{ position: "absolute", bottom: 2, right: 2, width: 5, height: 5, borderRadius: "50%", background: T.gold }} />}
              </div>
            );
          })}
        </div>

        <div style={{ display: "flex", gap: 12, marginTop: 12, flexWrap: "wrap" }}>
          <span style={{ fontSize: 10, color: T.subtle }}>🟡 Partial bookings</span>
          <span style={{ fontSize: 10, color: T.subtle }}>🔴 3+ bookings</span>
          <span style={{ fontSize: 10, color: T.subtle }}>⭕ Today</span>
        </div>
      </div>

      {selectedDay && (
        <div className="card">
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, marginBottom: 12 }}>
            {monthNames[month]} {selectedDay}, {year}
          </p>
          {dayBookings.length === 0 ? (
            <p style={{ fontSize: 13, color: T.subtle, textAlign: "center", padding: "12px 0" }}>No bookings this day ✨</p>
          ) : dayBookings.map((b, i) => {
            const d = b.dates?.find(dd => dd.date === `${year}-${String(month + 1).padStart(2, "0")}-${String(selectedDay).padStart(2, "0")}`);
            return (
              <div key={i} className="stat-row">
                <div>
                  <p style={{ fontSize: 13, fontWeight: 500 }}>{b.clientName}</p>
                  <p style={{ fontSize: 11, color: T.subtle }}>{b.services?.map(s => s.name).join(", ")}</p>
                  {b.staffAssigned && <p style={{ fontSize: 11, color: T.gold }}>Artist: {b.staffAssigned}</p>}
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={{ fontSize: 11, color: T.subtle }}>Arrive: {d?.arrival || "—"}</p>
                  <p style={{ fontSize: 11, color: T.subtle }}>Ready: {d?.ready || "—"}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="card" style={{ marginTop: 8 }}>
        <p style={{ fontSize: 11, color: T.subtle, letterSpacing: 1, marginBottom: 12, textTransform: "uppercase" }}>Staff Hours</p>
        {STAFF.map(s => (
          <div key={s.name} className="staff-card">
            <div className="staff-avatar">{s.name[0]}</div>
            <div>
              <div className="staff-name">{s.name}</div>
              <div className="staff-hours">{s.start} – {s.end} · 7 days/week</div>
            </div>
            <span className="badge badge-green" style={{ marginLeft: "auto" }}>Available</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── INCOME ───────────────────────────────────────────────────────────────────
function IncomeView({ invoices, setInvoices, showToast }) {
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const fullMonthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const filtered = invoices.filter(i => {
    const d = new Date(i.createdAt);
    return d.getMonth() === viewMonth && d.getFullYear() === viewYear;
  });

  const totalCollected = filtered.filter(i => i.paid).reduce((a, b) => a + (b.total - b.discount), 0);
  const totalPending = filtered.filter(i => !i.paid).reduce((a, b) => a + ((b.total - b.discount) - Number(b.advance || 0)), 0);
  const totalAdvances = filtered.reduce((a, b) => a + Number(b.advance || 0), 0);

  // Yearly data for graph
  const yearlyData = Array(12).fill(0).map((_, m) => {
    return invoices.filter(i => {
      const d = new Date(i.createdAt);
      return d.getMonth() === m && d.getFullYear() === viewYear && i.paid;
    }).reduce((a, b) => a + (b.total - b.discount), 0);
  });
  const maxVal = Math.max(...yearlyData, 1);

  return (
    <div className="page">
      <div className="gold-line" />
      <p className="section-title">Income <span>Tracker</span></p>
      <p className="section-sub">Monthly & yearly overview</p>

      <div className="card card-gold">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <button className="btn btn-outline btn-sm" onClick={() => { if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); } else setViewMonth(m => m - 1); }}>‹</button>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18 }}>{fullMonthNames[viewMonth]} {viewYear}</p>
          <button className="btn btn-outline btn-sm" onClick={() => { if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); } else setViewMonth(m => m + 1); }}>›</button>
        </div>
        <div className="stat-row"><span className="stat-label">Total Collected</span><span className="stat-value gold">{fmt(totalCollected)}</span></div>
        <div className="stat-row"><span className="stat-label">Advances Received</span><span className="stat-value">{fmt(totalAdvances)}</span></div>
        <div className="stat-row"><span className="stat-label">Pending Payments</span><span className="stat-value" style={{ color: "#C0392B" }}>{fmt(totalPending)}</span></div>
      </div>

      <div className="card">
        <p style={{ fontSize: 11, color: T.subtle, letterSpacing: 1, marginBottom: 12, textTransform: "uppercase" }}>Yearly Overview {viewYear}</p>
        <div className="bar-chart">
          {yearlyData.map((val, m) => (
            <div key={m} className="bar-row">
              <span className="bar-month">{monthNames[m]}</span>
              <div className="bar-track">
                <div className="bar-fill" style={{ width: `${(val / maxVal) * 100}%`, background: m === viewMonth ? T.gold : T.stone }} />
              </div>
              <span className="bar-val">{val > 0 ? `${Math.round(val / 1000)}k` : "—"}</span>
            </div>
          ))}
        </div>
      </div>

      <p style={{ fontSize: 11, color: T.subtle, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 12 }}>Invoices — {fullMonthNames[viewMonth]}</p>
      {filtered.length === 0 && <p style={{ fontSize: 13, color: T.subtle, textAlign: "center", padding: 20 }}>No invoices this month</p>}
      {filtered.map(inv => (
        <div key={inv.id} className="inv-list-item">
          <div>
            <div className="inv-client">{inv.clientName}</div>
            <div className="inv-service">{inv.services?.map(s => s.name).join(", ")}</div>
            <div style={{ fontSize: 10, color: T.subtle }}>{new Date(inv.createdAt).toLocaleDateString()}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div className="inv-amount">{fmt(inv.total - inv.discount)}</div>
            {!inv.paid ? (
              <button className="btn btn-outline btn-sm" style={{ marginTop: 4 }} onClick={() => { setInvoices(prev => prev.map(i => i.id === inv.id ? { ...i, paid: true } : i)); showToast("✅ Marked paid!"); }}>Mark Paid</button>
            ) : <span className="badge badge-green">Paid ✓</span>}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── EXPENSES ─────────────────────────────────────────────────────────────────
function ExpensesView({ expenses, setExpenses, showToast }) {
  const [form, setForm] = useState({ category: EXPENSE_CATS[0], desc: "", amount: "", date: today.toISOString().split("T")[0] });
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const fullMonthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const filtered = expenses.filter(e => {
    const d = new Date(e.date);
    return d.getMonth() === viewMonth && d.getFullYear() === viewYear;
  });
  const total = filtered.reduce((a, b) => a + Number(b.amount), 0);

  const byCat = EXPENSE_CATS.map(cat => ({
    cat, total: filtered.filter(e => e.category === cat).reduce((a, b) => a + Number(b.amount), 0)
  })).filter(c => c.total > 0);

  const save = () => {
    if (!form.amount) { showToast("Enter amount"); return; }
    setExpenses(prev => [{ ...form, id: Date.now() }, ...prev]);
    setForm({ category: EXPENSE_CATS[0], desc: "", amount: "", date: today.toISOString().split("T")[0] });
    showToast("Expense added!");
  };

  return (
    <div className="page">
      <div className="gold-line" />
      <p className="section-title">Expense <span>Tracker</span></p>
      <p className="section-sub">Track your studio costs</p>

      <div className="card card-pink">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <button className="btn btn-outline btn-sm" onClick={() => { if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); } else setViewMonth(m => m - 1); }}>‹</button>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16 }}>{fullMonthNames[viewMonth]} {viewYear}</p>
          <button className="btn btn-outline btn-sm" onClick={() => { if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); } else setViewMonth(m => m + 1); }}>›</button>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, color: "#C0392B" }}>{fmt(total)}</div>
          <div style={{ fontSize: 10, color: T.subtle, textTransform: "uppercase", letterSpacing: 1 }}>Total Expenses</div>
        </div>
        {byCat.length > 0 && (
          <div style={{ marginTop: 12 }}>
            {byCat.map((c, i) => (
              <div key={i} className="expense-item">
                <span style={{ fontSize: 12 }}>{c.cat}</span>
                <span style={{ fontSize: 13, fontWeight: 500 }}>{fmt(c.total)}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="card">
        <p style={{ fontSize: 11, color: T.subtle, letterSpacing: 1, marginBottom: 12, textTransform: "uppercase" }}>Add Expense</p>
        <div className="input-group">
          <label className="input-label">Category</label>
          <select className="input-field" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
            {EXPENSE_CATS.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="input-group">
          <label className="input-label">Description</label>
          <input className="input-field" placeholder="What was it for?" value={form.desc} onChange={e => setForm(f => ({ ...f, desc: e.target.value }))} />
        </div>
        <div className="row">
          <div className="col">
            <label className="input-label">Amount (PKR)</label>
            <input className="input-field" type="number" placeholder="0" value={form.amount} onChange={e => setForm(f => ({ ...f, amount: e.target.value }))} />
          </div>
          <div className="col">
            <label className="input-label">Date</label>
            <input className="input-field" type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
          </div>
        </div>
        <button className="btn btn-gold" onClick={save}>Add Expense</button>
      </div>

      {filtered.length > 0 && (
        <div>
          <p style={{ fontSize: 11, color: T.subtle, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 10 }}>This Month's Expenses</p>
          {filtered.map(e => (
            <div key={e.id} className="inv-list-item">
              <div>
                <div className="inv-client">{e.category}</div>
                <div className="inv-service">{e.desc}</div>
                <div style={{ fontSize: 10, color: T.subtle }}>{e.date}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: "#C0392B" }}>{fmt(e.amount)}</div>
                <button style={{ fontSize: 10, color: T.subtle, background: "none", border: "none", cursor: "pointer" }} onClick={() => setExpenses(prev => prev.filter(x => x.id !== e.id))}>remove</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── INVENTORY ────────────────────────────────────────────────────────────────
function InventoryView({ inventory, setInventory, showToast }) {
  const [form, setForm] = useState({ name: "", category: "Products & Supplies", qty: "", minQty: "2" });
  const [showAdd, setShowAdd] = useState(false);

  const lowItems = inventory.filter(i => Number(i.qty) <= Number(i.minQty));

  const save = () => {
    if (!form.name || !form.qty) { showToast("Fill name and quantity"); return; }
    setInventory(prev => [{ ...form, id: Date.now() }, ...prev]);
    setForm({ name: "", category: "Products & Supplies", qty: "", minQty: "2" });
    setShowAdd(false);
    showToast("Item added!");
  };

  const updateQty = (id, delta) => {
    setInventory(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(0, Number(i.qty) + delta) } : i));
  };

  return (
    <div className="page">
      <div className="gold-line" />
      <p className="section-title">Inventory <span>Manager</span></p>
      <p className="section-sub">Track your studio products</p>

      {lowItems.length > 0 && (
        <div className="card card-pink" style={{ marginBottom: 16 }}>
          <p style={{ fontSize: 11, color: "#C0392B", letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>⚠️ Shopping List — Needs Restocking</p>
          {lowItems.map(i => (
            <div key={i.id} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: `1px solid ${T.border}` }}>
              <span style={{ fontSize: 13 }}>{i.name}</span>
              <span style={{ fontSize: 12, color: "#C0392B" }}>Only {i.qty} left</span>
            </div>
          ))}
        </div>
      )}

      <button className="btn btn-gold" style={{ marginBottom: 16 }} onClick={() => setShowAdd(!showAdd)}>
        {showAdd ? "Cancel" : "+ Add Item"}
      </button>

      {showAdd && (
        <div className="card" style={{ marginBottom: 16 }}>
          <div className="input-group">
            <label className="input-label">Product Name</label>
            <input className="input-field" placeholder="e.g. Foundation" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
          </div>
          <div className="input-group">
            <label className="input-label">Category</label>
            <select className="input-field" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
              {["Products & Supplies", "Brushes & Tools", "Lashes", "Skincare", "Hair Products", "Equipment", "Other"].map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="row">
            <div className="col">
              <label className="input-label">Current Qty</label>
              <input className="input-field" type="number" placeholder="0" value={form.qty} onChange={e => setForm(f => ({ ...f, qty: e.target.value }))} />
            </div>
            <div className="col">
              <label className="input-label">Min Level</label>
              <input className="input-field" type="number" placeholder="2" value={form.minQty} onChange={e => setForm(f => ({ ...f, minQty: e.target.value }))} />
            </div>
          </div>
          <button className="btn btn-gold" onClick={save}>Save Item</button>
        </div>
      )}

      {inventory.length === 0 && <p style={{ fontSize: 13, color: T.subtle, textAlign: "center", padding: 20 }}>No items yet. Add your first product!</p>}
      {inventory.map(item => {
        const isLow = Number(item.qty) <= Number(item.minQty);
        return (
          <div key={item.id} className="inventory-item">
            <div style={{ flex: 1 }}>
              <div className="inv-name">{item.name}</div>
              <div className="inv-cat">{item.category}</div>
              {isLow && <span className="badge badge-pink" style={{ marginTop: 4 }}>Low Stock</span>}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <button className="btn btn-grey btn-sm" style={{ width: 30, padding: 0 }} onClick={() => updateQty(item.id, -1)}>−</button>
              <span className={`inv-qty ${isLow ? "inv-low" : "inv-ok"}`}>{item.qty}</span>
              <button className="btn btn-grey btn-sm" style={{ width: 30, padding: 0 }} onClick={() => updateQty(item.id, 1)}>+</button>
              <button style={{ fontSize: 11, color: T.subtle, background: "none", border: "none", cursor: "pointer" }} onClick={() => setInventory(prev => prev.filter(i => i.id !== item.id))}>✕</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── CLIENTS ──────────────────────────────────────────────────────────────────
function ClientsView({ invoices, showToast }) {
  const [search, setSearch] = useState("");
  const [selectedClient, setSelectedClient] = useState(null);
  const [birthdayModal, setBirthdayModal] = useState(false);
  const [birthdays, setBirthdays] = useLocalStorage("it_birthdays", []);
  const [bdForm, setBdForm] = useState({ name: "", phone: "", birthday: "" });

  const clientMap = useMemo(() => {
    const map = {};
    invoices.forEach(inv => {
      if (!inv.phone) return;
      if (!map[inv.phone]) map[inv.phone] = { name: inv.clientName, phone: inv.phone, bookings: [], total: 0 };
      map[inv.phone].bookings.push(inv);
      map[inv.phone].total += (inv.total - inv.discount);
    });
    return Object.values(map).sort((a, b) => b.bookings.length - a.bookings.length);
  }, [invoices]);

  const filtered = clientMap.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.phone.includes(search));

  const upcomingBirthdays = birthdays.filter(b => {
    if (!b.birthday) return false;
    const bd = new Date(b.birthday);
    const thisYear = new Date(bd.getFullYear() !== today.getFullYear() ? `${today.getFullYear()}-${String(bd.getMonth() + 1).padStart(2, "0")}-${String(bd.getDate()).padStart(2, "0")}` : b.birthday);
    const diff = (thisYear - today) / (1000 * 60 * 60 * 24);
    return diff >= 0 && diff <= 30;
  });

  const sendBirthday = (b) => {
    const msg = encodeURIComponent(`Assalamualaykum ${b.name}! 🎂💛\n\nWishing you a very Happy Birthday from all of us at Incia Turab Luxury Artist! 🌸✨\n\nMay your day be as beautiful as you are. We'd love to pamper you on your special day!\n\n— Team Incia Turab\n📱 03321221223`);
    window.open(`https://wa.me/${b.phone}?text=${msg}`, "_blank");
  };

  const client = selectedClient ? clientMap.find(c => c.phone === selectedClient) : null;

  if (client) return (
    <div className="page">
      <button className="btn btn-outline btn-sm" style={{ marginBottom: 16 }} onClick={() => setSelectedClient(null)}>← Back</button>
      <div className="card card-gold">
        <div style={{ textAlign: "center", marginBottom: 12 }}>
          <div style={{ width: 60, height: 60, borderRadius: "50%", background: `linear-gradient(135deg, ${T.gold}44, ${T.pink})`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 8px", fontFamily: "'Cormorant Garamond', serif", fontSize: 24 }}>{client.name[0]}</div>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20 }}>{client.name}</p>
          <p style={{ fontSize: 12, color: T.subtle }}>{client.phone}</p>
          {client.bookings.length >= 2 && <span className="badge badge-gold" style={{ marginTop: 6 }}>👑 VIP Client</span>}
        </div>
        <div className="stat-row"><span className="stat-label">Total Bookings</span><span className="stat-value gold">{client.bookings.length}</span></div>
        <div className="stat-row"><span className="stat-label">Total Spent</span><span className="stat-value gold">{fmt(client.total)}</span></div>
        <div className="stat-row"><span className="stat-label">First Booking</span><span className="stat-value">{new Date(client.bookings[client.bookings.length - 1]?.createdAt).toLocaleDateString()}</span></div>
      </div>
      <p style={{ fontSize: 11, color: T.subtle, letterSpacing: 1.5, textTransform: "uppercase", margin: "16px 0 10px" }}>Booking History</p>
      {client.bookings.map(inv => (
        <div key={inv.id} className="inv-list-item">
          <div>
            <div className="inv-service">{inv.services?.map(s => s.name).join(", ")}</div>
            <div style={{ fontSize: 10, color: T.subtle }}>{new Date(inv.createdAt).toLocaleDateString()}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div className="inv-amount">{fmt(inv.total - inv.discount)}</div>
            <span className={`badge ${inv.paid ? "badge-green" : "badge-gold"}`}>{inv.paid ? "Paid" : "Pending"}</span>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="page">
      <div className="gold-line" />
      <p className="section-title">Client <span>Profiles</span></p>
      <p className="section-sub">Bookings, loyalty & birthdays</p>

      {upcomingBirthdays.length > 0 && (
        <div className="card card-pink" style={{ marginBottom: 12 }}>
          <p style={{ fontSize: 11, color: T.subtle, letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>🎂 Upcoming Birthdays (30 days)</p>
          {upcomingBirthdays.map((b, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: i < upcomingBirthdays.length - 1 ? `1px solid ${T.border}` : "none" }}>
              <div>
                <p style={{ fontSize: 13, fontWeight: 500 }}>{b.name}</p>
                <p style={{ fontSize: 11, color: T.subtle }}>{b.birthday}</p>
              </div>
              <button className="btn btn-pink btn-sm" onClick={() => sendBirthday(b)}>🎂 WhatsApp</button>
            </div>
          ))}
        </div>
      )}

      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <input className="input-field" style={{ flex: 1 }} placeholder="Search by name or phone..." value={search} onChange={e => setSearch(e.target.value)} />
        <button className="btn btn-outline btn-sm" onClick={() => setBirthdayModal(true)}>🎂 Add Birthday</button>
      </div>

      {filtered.length === 0 && <p style={{ fontSize: 13, color: T.subtle, textAlign: "center", padding: 20 }}>No clients yet. Create your first invoice!</p>}
      {filtered.map(c => (
        <div key={c.phone} className="inv-list-item" onClick={() => setSelectedClient(c.phone)}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div className="staff-avatar" style={{ width: 36, height: 36, fontSize: 14 }}>{c.name[0]}</div>
            <div>
              <div className="inv-client">{c.name}</div>
              <div className="inv-service">{c.phone}</div>
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 12, color: T.subtle }}>{c.bookings.length} booking{c.bookings.length > 1 ? "s" : ""}</div>
            {c.bookings.length >= 2 && <span className="badge badge-gold">👑 VIP</span>}
          </div>
        </div>
      ))}

      {birthdayModal && (
        <div className="modal-overlay" onClick={() => setBirthdayModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-handle" />
            <p className="modal-title">Add Birthday 🎂</p>
            <div className="input-group">
              <label className="input-label">Client Name</label>
              <input className="input-field" value={bdForm.name} onChange={e => setBdForm(f => ({ ...f, name: e.target.value }))} />
            </div>
            <div className="input-group">
              <label className="input-label">WhatsApp Number</label>
              <input className="input-field" value={bdForm.phone} onChange={e => setBdForm(f => ({ ...f, phone: e.target.value }))} />
            </div>
            <div className="input-group">
              <label className="input-label">Birthday</label>
              <input className="input-field" type="date" value={bdForm.birthday} onChange={e => setBdForm(f => ({ ...f, birthday: e.target.value }))} />
            </div>
            <button className="btn btn-gold" onClick={() => { if (bdForm.name && bdForm.birthday) { setBirthdays(prev => [...prev, { ...bdForm, id: Date.now() }]); setBdForm({ name: "", phone: "", birthday: "" }); setBirthdayModal(false); showToast("Birthday saved! 🎂"); } }}>Save</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── STAFF ────────────────────────────────────────────────────────────────────
function StaffView({ invoices, showToast }) {
  const [ratings, setRatings] = useLocalStorage("it_ratings", []);
  const [ratingModal, setRatingModal] = useState(null);
  const [rForm, setRForm] = useState({ stars: 5, comment: "" });

  const getStaffRatings = (name) => ratings.filter(r => r.staff === name);
  const getAvgRating = (name) => {
    const r = getStaffRatings(name);
    if (!r.length) return 0;
    return (r.reduce((a, b) => a + b.stars, 0) / r.length).toFixed(1);
  };
  const getStaffIncome = (name) => invoices.filter(i => i.staffAssigned === name && i.paid).reduce((a, b) => a + (b.total - b.discount), 0);
  const getStaffBookings = (name) => invoices.filter(i => i.staffAssigned === name).length;

  const saveRating = () => {
    setRatings(prev => [...prev, { staff: ratingModal, stars: rForm.stars, comment: rForm.comment, date: new Date().toISOString() }]);
    setRatingModal(null);
    setRForm({ stars: 5, comment: "" });
    showToast("⭐ Rating saved!");
  };

  const sendRatingWhatsApp = (staffName, inv) => {
    if (!inv) { showToast("No client found for this staff"); return; }
    const msg = encodeURIComponent(`Assalamualaykum ${inv.clientName} 💛\n\nThank you so much for choosing Incia Turab Luxury Artist — it was truly an honour!\n\nWe'd love to know how your experience was with ${staffName}.\n\n⭐ How would you rate your artist: ${staffName}?\n⭐ Overall experience with us\n💬 Any kind words (optional)\n\nYour feedback means the world to us! 🌸\n\n— Team Incia Turab\n📍 Jamshed Road, Gurumandir, Karachi\n📱 03321221223`);
    window.open(`https://wa.me/${inv.phone}?text=${msg}`, "_blank");
  };

  return (
    <div className="page">
      <div className="gold-line" />
      <p className="section-title">Our <span>Artists</span></p>
      <p className="section-sub">Staff performance & ratings</p>

      {STAFF.map(s => {
        const avg = getAvgRating(s.name);
        const lastClient = invoices.filter(i => i.staffAssigned === s.name).slice(-1)[0];
        return (
          <div key={s.name} className="card" style={{ marginBottom: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <div className="staff-avatar" style={{ width: 48, height: 48, fontSize: 18 }}>{s.name[0]}</div>
              <div style={{ flex: 1 }}>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18 }}>{s.name}</p>
                <p style={{ fontSize: 11, color: T.subtle }}>{s.start} – {s.end}</p>
                <div className="stars">{Array(5).fill(0).map((_, i) => <span key={i}>{i < Math.round(avg) ? "★" : "☆"}</span>)} <span style={{ fontSize: 12, color: T.subtle, fontFamily: "'Jost', sans-serif" }}>{avg > 0 ? avg : "No ratings yet"}</span></div>
              </div>
            </div>
            <div className="stat-row"><span className="stat-label">Total Bookings</span><span className="stat-value">{getStaffBookings(s.name)}</span></div>
            <div className="stat-row"><span className="stat-label">Total Revenue</span><span className="stat-value gold">{fmt(getStaffIncome(s.name))}</span></div>
            <div className="stat-row"><span className="stat-label">Ratings Received</span><span className="stat-value">{getStaffRatings(s.name).length}</span></div>
            <div className="divider" />
            <div className="row">
              <button className="btn btn-outline btn-sm" style={{ flex: 1 }} onClick={() => setRatingModal(s.name)}>+ Add Rating</button>
              {lastClient && <button className="btn btn-pink btn-sm" style={{ flex: 1 }} onClick={() => sendRatingWhatsApp(s.name, lastClient)}>📲 Request Rating</button>}
            </div>

            {getStaffRatings(s.name).slice(-2).map((r, i) => (
              <div key={i} style={{ marginTop: 8, padding: "8px 10px", background: T.bg, borderRadius: 8 }}>
                <div className="stars" style={{ fontSize: 12 }}>{Array(5).fill(0).map((_, j) => <span key={j}>{j < r.stars ? "★" : "☆"}</span>)}</div>
                {r.comment && <p style={{ fontSize: 12, color: T.subtle, marginTop: 2, fontStyle: "italic" }}>"{r.comment}"</p>}
                <p style={{ fontSize: 10, color: T.grey, marginTop: 2 }}>{new Date(r.date).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        );
      })}

      {ratingModal && (
        <div className="modal-overlay" onClick={() => setRatingModal(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-handle" />
            <p className="modal-title">Rate {ratingModal} ⭐</p>
            <div style={{ display: "flex", gap: 8, marginBottom: 16, justifyContent: "center" }}>
              {[1, 2, 3, 4, 5].map(n => (
                <button key={n} onClick={() => setRForm(f => ({ ...f, stars: n }))} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 32, color: n <= rForm.stars ? T.gold : T.stone }}>★</button>
              ))}
            </div>
            <div className="input-group">
              <label className="input-label">Client Comment (optional)</label>
              <textarea className="input-field" placeholder="What did the client say?" value={rForm.comment} onChange={e => setRForm(f => ({ ...f, comment: e.target.value }))} />
            </div>
            <button className="btn btn-gold" onClick={saveRating}>Save Rating</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── REPORTS ──────────────────────────────────────────────────────────────────
function ReportsView({ invoices, expenses }) {
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const year = today.getFullYear();

  const monthlyIncome = Array(12).fill(0).map((_, m) =>
    invoices.filter(i => { const d = new Date(i.createdAt); return d.getMonth() === m && d.getFullYear() === year && i.paid; })
      .reduce((a, b) => a + (b.total - b.discount), 0)
  );
  const monthlyExpenses = Array(12).fill(0).map((_, m) =>
    expenses.filter(e => { const d = new Date(e.date); return d.getMonth() === m && d.getFullYear() === year; })
      .reduce((a, b) => a + Number(b.amount), 0)
  );
  const monthlyProfit = monthlyIncome.map((inc, i) => inc - monthlyExpenses[i]);

  const totalIncome = monthlyIncome.reduce((a, b) => a + b, 0);
  const totalExpenses = monthlyExpenses.reduce((a, b) => a + b, 0);
  const totalProfit = totalIncome - totalExpenses;

  // Best month
  const bestMonthIdx = monthlyIncome.indexOf(Math.max(...monthlyIncome));

  // Service popularity
  const serviceCounts = {};
  invoices.forEach(inv => inv.services?.forEach(s => {
    serviceCounts[s.name] = (serviceCounts[s.name] || 0) + 1;
  }));
  const topServices = Object.entries(serviceCounts).sort((a, b) => b[1] - a[1]).slice(0, 5);

  const maxInc = Math.max(...monthlyIncome, 1);
  const maxExp = Math.max(...monthlyExpenses, 1);

  return (
    <div className="page">
      <div className="gold-line" />
      <p className="section-title">Business <span>Reports</span></p>
      <p className="section-sub">Year {year} overview</p>

      <div className="card card-gold">
        <div className="stat-row"><span className="stat-label">Total Income {year}</span><span className="stat-value gold">{fmt(totalIncome)}</span></div>
        <div className="stat-row"><span className="stat-label">Total Expenses {year}</span><span className="stat-value" style={{ color: "#C0392B" }}>{fmt(totalExpenses)}</span></div>
        <div className="stat-row"><span className="stat-label" style={{ fontWeight: 700 }}>Net Profit {year}</span><span className="stat-value" style={{ color: totalProfit >= 0 ? T.gold : "#C0392B", fontWeight: 700 }}>{fmt(Math.abs(totalProfit))} {totalProfit < 0 ? "(Loss)" : ""}</span></div>
        {monthlyIncome[bestMonthIdx] > 0 && <div className="stat-row"><span className="stat-label">Best Month</span><span className="stat-value">{monthNames[bestMonthIdx]} · {fmt(monthlyIncome[bestMonthIdx])}</span></div>}
        <div className="stat-row"><span className="stat-label">Total Bookings</span><span className="stat-value">{invoices.length}</span></div>
      </div>

      <div className="card">
        <p style={{ fontSize: 11, color: T.subtle, letterSpacing: 1, marginBottom: 12, textTransform: "uppercase" }}>📊 Monthly Income vs Expenses {year}</p>
        <div style={{ display: "flex", gap: 12, marginBottom: 8 }}>
          <span style={{ fontSize: 10, color: T.subtle }}>━ <span style={{ color: T.gold }}>Income</span></span>
          <span style={{ fontSize: 10, color: T.subtle }}>━ <span style={{ color: T.pink }}>Expenses</span></span>
        </div>
        {Array(12).fill(0).map((_, m) => (
          <div key={m} style={{ marginBottom: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
              <span style={{ fontSize: 10, color: T.subtle, width: 28 }}>{monthNames[m]}</span>
              <div style={{ flex: 1 }}>
                <div style={{ height: 6, background: T.stone, borderRadius: 3, marginBottom: 2, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${(monthlyIncome[m] / maxInc) * 100}%`, background: T.gold, borderRadius: 3 }} />
                </div>
                <div style={{ height: 6, background: T.stone, borderRadius: 3, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${(monthlyExpenses[m] / maxExp) * 100}%`, background: T.pink, borderRadius: 3 }} />
                </div>
              </div>
              <span style={{ fontSize: 10, color: monthlyProfit[m] >= 0 ? T.gold : "#C0392B", width: 40, textAlign: "right" }}>
                {monthlyProfit[m] !== 0 ? `${Math.round(monthlyProfit[m] / 1000)}k` : "—"}
              </span>
            </div>
          </div>
        ))}
      </div>

      {topServices.length > 0 && (
        <div className="card">
          <p style={{ fontSize: 11, color: T.subtle, letterSpacing: 1, marginBottom: 12, textTransform: "uppercase" }}>💄 Most Popular Services</p>
          {topServices.map(([name, count], i) => (
            <div key={i} className="stat-row">
              <span className="stat-label">{i + 1}. {name}</span>
              <span className="stat-value">{count} booking{count > 1 ? "s" : ""}</span>
            </div>
          ))}
        </div>
      )}

      <div className="card">
        <p style={{ fontSize: 11, color: T.subtle, letterSpacing: 1, marginBottom: 12, textTransform: "uppercase" }}>Busiest Days of Week</p>
        {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day, d) => {
          const count = invoices.filter(inv => inv.dates?.some(date => new Date(date.date).getDay() === d)).length;
          return (
            <div key={d} className="bar-row">
              <span className="bar-month" style={{ width: 60, textAlign: "left", fontSize: 11 }}>{day.slice(0, 3)}</span>
              <div className="bar-track">
                <div className="bar-fill" style={{ width: `${(count / Math.max(...[0, 1, 2, 3, 4, 5, 6].map(x => invoices.filter(inv => inv.dates?.some(date => new Date(date.date).getDay() === x)).length), 1)) * 100}%`, background: T.gold }} />
              </div>
              <span className="bar-val">{count}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
const TABS = [
  { id: "dashboard", icon: "✦", label: "Home" },
  { id: "invoice", icon: "📋", label: "Invoice" },
  { id: "calendar", icon: "📅", label: "Calendar" },
  { id: "income", icon: "💰", label: "Income" },
  { id: "expenses", icon: "💸", label: "Expenses" },
  { id: "inventory", icon: "🛍️", label: "Stock" },
  { id: "clients", icon: "👑", label: "Clients" },
  { id: "staff", icon: "🌸", label: "Artists" },
  { id: "reports", icon: "📊", label: "Reports" },
];

export default function App() {
  const [tab, setTab] = useState("dashboard");
  const [invoices, setInvoices] = useLocalStorage("it_invoices", []);
  const [expenses, setExpenses] = useLocalStorage("it_expenses", []);
  const [inventory, setInventory] = useLocalStorage("it_inventory", []);
  const [toast, setToast] = useState("");

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(""), 2500); };

  const visibleTabs = TABS.slice(0, 5);
  const moreTabs = TABS.slice(5);
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="app">
      <style>{styles}</style>

      <nav className="nav">
        <div className="nav-inner">
          <span className="nav-logo">INCIA <span>TURAB</span></span>
          <span style={{ fontSize: 10, color: T.subtle, letterSpacing: 1.5, textTransform: "uppercase" }}>Studio Manager</span>
        </div>
      </nav>

      {tab === "dashboard" && <Dashboard invoices={invoices} expenses={expenses} inventory={inventory} />}
      {tab === "invoice" && <InvoiceForm invoices={invoices} setInvoices={setInvoices} showToast={showToast} />}
      {tab === "calendar" && <CalendarView invoices={invoices} />}
      {tab === "income" && <IncomeView invoices={invoices} setInvoices={setInvoices} showToast={showToast} />}
      {tab === "expenses" && <ExpensesView expenses={expenses} setExpenses={setExpenses} showToast={showToast} />}
      {tab === "inventory" && <InventoryView inventory={inventory} setInventory={setInventory} showToast={showToast} />}
      {tab === "clients" && <ClientsView invoices={invoices} showToast={showToast} />}
      {tab === "staff" && <StaffView invoices={invoices} showToast={showToast} />}
      {tab === "reports" && <ReportsView invoices={invoices} expenses={expenses} />}

      {showMore && (
        <div className="modal-overlay" onClick={() => setShowMore(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-handle" />
            <p className="modal-title">More Sections</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {moreTabs.map(t => (
                <button key={t.id} onClick={() => { setTab(t.id); setShowMore(false); }} style={{ background: tab === t.id ? T.gold : T.card, border: `1px solid ${T.border}`, borderRadius: 12, padding: "14px 10px", cursor: "pointer", textAlign: "center" }}>
                  <div style={{ fontSize: 24 }}>{t.icon}</div>
                  <div style={{ fontSize: 11, color: tab === t.id ? T.white : T.text, marginTop: 4, fontFamily: "'Jost', sans-serif", letterSpacing: 0.5 }}>{t.label}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="tab-bar">
        {visibleTabs.map(t => (
          <button key={t.id} className={`tab-btn ${tab === t.id ? "active" : ""}`} onClick={() => setTab(t.id)}>
            <span className="tab-icon">{t.icon}</span>
            <span className="tab-label">{t.label}</span>
          </button>
        ))}
        <button className={`tab-btn ${moreTabs.some(t => t.id === tab) ? "active" : ""}`} onClick={() => setShowMore(true)}>
          <span className="tab-icon">⋯</span>
          <span className="tab-label">More</span>
        </button>
      </div>

      <Toast msg={toast} />
    </div>
  );
}
