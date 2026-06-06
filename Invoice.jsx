import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "../supabase";

const T = {
  bg: "#F4F1EE", card: "#EDEAE6", border: "#DDD8D2",
  gold: "#C9A84C", text: "#1E1E1E", subtle: "#7A7470",
  white: "#FFFFFF", stone: "#D4CFC9"
};

const TERMS = [
  { n: 1, title: "Advance Payment", text: "A booking advance is required to secure your date. Once paid, the advance is non-refundable, non-adjustable and cannot be transferred to another date or person." },
  { n: 2, title: "Remaining Balance", text: "Your remaining balance must be paid in full before your service begins. We are unable to start until payment is complete." },
  { n: 3, title: "Changes to Services", text: "Any reductions to your booked services will incur a charge of PKR 5,000 per change." },
  { n: 4, title: "Arrival Time", text: "Please arrive on time 🙏 If you are more than 15 minutes late, a charge of PKR 1,000 will apply. Every 10 minutes after that adds PKR 500. If you are over 1 hour late, your booking will be cancelled and all payments will be forfeited." },
  { n: 5, title: "Rescheduling", text: "If you need to reschedule, please let us know at least 60 days in advance. Rescheduling is subject to availability and is not guaranteed." },
  { n: 6, title: "Children & Extra Guests", text: "To maintain a calm and focused environment, children and attendants are not permitted during the service. A fee of PKR 10,000 applies if this is not respected." },
  { n: 7, title: "Health Conditions", text: "Please inform us of any skin conditions, allergies, or health concerns beforehand. We reserve the right to decline service if we feel it may affect wellbeing. Payments remain non-refundable in such cases." },
  { n: 8, title: "Head Lice", text: "For hygiene and safety of all clients, we are unable to provide services if lice or nits are present. No refund or reschedule will be offered." },
  { n: 9, title: "Mobile Phones", text: "Mobile phone use should be kept to a minimum during your service. Any delays caused by phone use are not our responsibility." },
  { n: 10, title: "Venue & Location", text: "We reserve the right to change the service location within the same city if needed due to operational reasons. No refund will apply for location changes." },
  { n: 11, title: "Misconduct", text: "Any inappropriate behaviour will result in immediate termination of services without refund." },
  { n: 12, title: "Force Majeure", text: "In situations beyond our control — emergencies, natural disasters, or government restrictions — we cannot be held liable. All payments remain non-refundable." },
];

const fmt = n => "PKR " + Number(n || 0).toLocaleString();

const S = `
  *{box-sizing:border-box;margin:0;padding:0;}
  body{background:#F4F1EE;font-family:'Jost',sans-serif;color:#1E1E1E;}
  .page{max-width:480px;margin:0 auto;padding:32px 20px 60px;}
  .header{text-align:center;margin-bottom:24px;}
  .sym{font-family:'Cormorant Garamond',serif;font-size:36px;color:#C9A84C;}
  .bname{font-family:'Cormorant Garamond',serif;font-size:24px;font-weight:600;letter-spacing:4px;margin-top:4px;}
  .bsub{font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#7A7470;margin-top:2px;}
  .bcontact{font-size:11px;color:#A09A94;margin-top:6px;}
  .divider{height:1px;background:linear-gradient(90deg,transparent,#C9A84C,transparent);margin:20px auto;max-width:200px;}
  .title{font-family:'Cormorant Garamond',serif;font-size:28px;font-weight:300;text-align:center;}
  .title span{color:#C9A84C;font-style:italic;}
  .tsub{font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#7A7470;text-align:center;margin:6px 0 4px;}
  .tnote{font-size:12px;color:#7A7470;text-align:center;margin-bottom:20px;font-style:italic;line-height:1.6;}
  .prog{height:4px;background:#DDD8D2;border-radius:2px;margin-bottom:20px;overflow:hidden;}
  .prog-fill{height:100%;background:linear-gradient(90deg,#C9A84C,#B8963E);border-radius:2px;transition:width 0.3s;}
  .tc-card{background:#EDEAE6;border:1px solid #DDD8D2;border-radius:16px;padding:20px;margin-bottom:20px;}
  .tc-item{display:flex;gap:12px;align-items:flex-start;padding:11px 0;border-bottom:1px solid #DDD8D2;}
  .tc-item:last-child{border-bottom:none;}
  .chk{width:22px;height:22px;min-width:22px;border:1.5px solid #C9A84C;border-radius:6px;cursor:pointer;display:flex;align-items:center;justify-content:center;background:#FFF;transition:all 0.2s;-webkit-tap-highlight-color:transparent;}
  .chk.on{background:#C9A84C;border-color:#C9A84C;}
  .chk-inner{color:white;font-size:13px;}
  .tc-txt{font-size:12px;color:#1E1E1E;line-height:1.7;}
  .tc-num{font-weight:600;color:#C9A84C;}
  .btn{width:100%;padding:15px;background:linear-gradient(135deg,#C9A84C,#B8963E);color:white;border:none;border-radius:14px;font-family:'Jost',sans-serif;font-size:13px;font-weight:500;letter-spacing:2px;text-transform:uppercase;cursor:pointer;transition:all 0.2s;}
  .btn:disabled{opacity:0.4;cursor:not-allowed;}
  .pnote{font-size:11px;color:#7A7470;text-align:center;margin-top:12px;}
  .inv-card{background:#FFF;border:1px solid #DDD8D2;border-radius:20px;padding:28px;margin-bottom:20px;}
  .inv-head{text-align:center;margin-bottom:20px;}
  .inv-sym{font-family:'Cormorant Garamond',serif;font-size:28px;color:#C9A84C;}
  .inv-name{font-family:'Cormorant Garamond',serif;font-size:20px;font-weight:600;letter-spacing:3px;margin-top:2px;}
  .inv-sub{font-size:9px;letter-spacing:2.5px;text-transform:uppercase;color:#7A7470;}
  .inv-contact{font-size:10px;color:#A09A94;margin-top:4px;}
  .sec-div{height:1px;background:linear-gradient(90deg,transparent,#C9A84C,transparent);margin:14px 0;}
  .slabel{font-size:9px;letter-spacing:2px;text-transform:uppercase;color:#7A7470;margin-bottom:8px;}
  .irow{display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid #F4F1EE;}
  .irow:last-child{border-bottom:none;}
  .ilabel{font-size:13px;color:#7A7470;}
  .ival{font-size:13px;font-weight:500;color:#1E1E1E;}
  .ival.gold{color:#C9A84C;font-weight:700;}
  .ival.big{font-size:16px;}
  .agreed{display:flex;align-items:center;gap:8px;background:#F5EFE0;border:1px solid #C9A84C44;border-radius:10px;padding:10px 12px;margin-top:14px;}
  .wa-btn{width:100%;padding:15px;background:#25D366;color:white;border:none;border-radius:14px;font-family:'Jost',sans-serif;font-size:13px;font-weight:500;letter-spacing:1.5px;text-transform:uppercase;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;}
  .footer{font-size:11px;color:#7A7470;text-align:center;margin-top:16px;font-style:italic;line-height:1.7;}
  .no-inv{text-align:center;padding:60px 20px;}
  .no-inv-icon{font-size:48px;margin-bottom:16px;}
  .no-inv-title{font-family:'Cormorant Garamond',serif;font-size:24px;margin-bottom:8px;}
  .no-inv-sub{font-size:13px;color:#7A7470;line-height:1.7;}
  .loading{text-align:center;padding:60px 20px;font-family:'Cormorant Garamond',serif;font-size:20px;color:#C9A84C;}
`;

export default function Invoice() {
  const [params] = useSearchParams();
  const invId = params.get("id");
  const [inv, setInv] = useState(null);
  const [loading, setLoading] = useState(true);
  const [checked, setChecked] = useState(Array(12).fill(false));
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (!invId) { setLoading(false); return; }
      const { data } = await supabase.from("invoices").select("*").eq("id", invId).single();
      setInv(data || null);
      setLoading(false);
    };
    load();
  }, [invId]);

  const toggle = i => {
    const n = [...checked];
    n[i] = !n[i];
    setChecked(n);
  };

  const allChecked = checked.every(Boolean);
  const checkedCount = checked.filter(Boolean).length;

  const reveal = async () => {
    if (!allChecked) return;
    await supabase.from("invoices").update({ tc_agreed: true }).eq("id", invId);
    setRevealed(true);
    window.scrollTo(0, 0);
  };

  if (loading) return <><style>{S}</style><div className="loading">Loading your invoice... 🌸</div></>;

  if (!inv) return (
    <>
      <style>{S}</style>
      <div className="page">
        <div className="header">
          <div className="sym">✦ IT ✦</div>
          <div className="bname">INCIA TURAB</div>
          <div className="bsub">Luxury Artist</div>
        </div>
        <div className="no-inv">
          <div className="no-inv-icon">🌸</div>
          <div className="no-inv-title">Invoice Not Found</div>
          <div className="no-inv-sub">This link may have expired or is invalid.<br />Please contact us on WhatsApp.<br /><br />📱 03321221223</div>
        </div>
      </div>
    </>
  );

  const services = inv.services || [];
  const dates = inv.dates || [];
  const subtotal = services.reduce((a, s) => a + Number(s.price || 0), 0);
  const discount = Number(inv.discount || 0);
  const total = subtotal - discount;
  const advance = Number(inv.advance || 0);
  const remaining = total - advance;

  const waMsg = encodeURIComponent(`Assalamualaykum! I have reviewed and agreed to all Terms & Conditions for my booking with Incia Turab Luxury Artist. Looking forward to my appointment! 🌸`);

  return (
    <>
      <style>{S}</style>
      <div className="page">
        <div className="header">
          <div className="sym">✦ IT ✦</div>
          <div className="bname">INCIA TURAB</div>
          <div className="bsub">Luxury Artist</div>
          <div className="bcontact">📍 Jamshed Road, Gurumandir, Karachi · 📱 03321221223</div>
        </div>

        {!revealed ? (
          <>
            <div className="divider" />
            <h1 className="title">Booking <span>Agreement</span></h1>
            <p className="tsub">Please read carefully</p>
            <p className="tnote">Tick each box to confirm you have read and agree.<br />Your invoice will be revealed once all terms are accepted. 🌸</p>
            <div className="prog"><div className="prog-fill" style={{ width: `${(checkedCount / 12) * 100}%` }} /></div>
            <div className="tc-card">
              {TERMS.map((t, i) => (
                <div key={i} className="tc-item">
                  <div className={`chk${checked[i] ? " on" : ""}`} onClick={() => toggle(i)}>
                    {checked[i] && <span className="chk-inner">✓</span>}
                  </div>
                  <div className="tc-txt">
                    <span className="tc-num">{t.n}. {t.title} — </span>{t.text}
                  </div>
                </div>
              ))}
            </div>
            <button className="btn" disabled={!allChecked} onClick={reveal}>
              I Agree — View My Invoice ✦
            </button>
            <p className="pnote">{12 - checkedCount > 0 ? `${12 - checkedCount} box${12 - checkedCount > 1 ? "es" : ""} remaining` : "All agreed! Tap to view your invoice ✦"}</p>
          </>
        ) : (
          <>
            <div className="divider" />
            <div className="inv-card">
              <div className="inv-head">
                <div className="inv-sym">✦ IT ✦</div>
                <div className="inv-name">INCIA TURAB</div>
                <div className="inv-sub">Luxury Artist</div>
                <div className="inv-contact">📍 Jamshed Road, Gurumandir, Karachi · 📱 03321221223</div>
              </div>
              <div className="sec-div" />
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                <div>
                  <p className="slabel">Client</p>
                  <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 20, fontWeight: 600 }}>{inv.client_name}</p>
                  <p style={{ fontSize: 12, color: T.subtle }}>{inv.phone}</p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p className="slabel">Date</p>
                  <p style={{ fontSize: 12 }}>{new Date(inv.created_at).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</p>
                </div>
              </div>
              <div className="sec-div" />
              <p className="slabel">Services</p>
              {services.map((s, i) => (
                <div key={i} className="irow">
                  <span className="ilabel">{s.name}</span>
                  <span className="ival">{fmt(s.price)}</span>
                </div>
              ))}
              <div className="sec-div" />
              <div className="irow"><span className="ilabel">Subtotal</span><span className="ival">{fmt(subtotal)}</span></div>
              {discount > 0 && <div className="irow"><span className="ilabel">Discount</span><span className="ival">− {fmt(discount)}</span></div>}
              <div className="irow"><span className="ilabel" style={{ fontWeight: 600, color: T.text }}>Total</span><span className="ival gold big">{fmt(total)}</span></div>
              <div className="irow"><span className="ilabel">Advance Paid</span><span className="ival">− {fmt(advance)}</span></div>
              <div style={{ background: "#FAF7F0", borderRadius: 8, padding: "10px 12px", marginTop: 6, display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 13, fontWeight: 700 }}>Remaining (due on arrival)</span>
                <span style={{ fontSize: 16, fontWeight: 700, color: T.gold }}>{fmt(remaining)}</span>
              </div>
              {dates.length > 0 && (
                <>
                  <div className="sec-div" />
                  <p className="slabel">Service Dates</p>
                  {dates.map((d, i) => (
                    <div key={i} className="irow">
                      <span className="ilabel">Day {i + 1} — {d.date}</span>
                      <span style={{ fontSize: 11, color: T.subtle }}>Arrive: {d.arrival || "—"} · Ready: {d.ready || "—"}</span>
                    </div>
                  ))}
                </>
              )}
              {inv.notes && (
                <>
                  <div className="sec-div" />
                  <p className="slabel">Notes</p>
                  <p style={{ fontSize: 12 }}>{inv.notes}</p>
                </>
              )}
              <div className="agreed">
                <span>✦</span>
                <span style={{ fontSize: 11, color: "#8B6914" }}>You have read and agreed to all Terms & Conditions of Incia Turab Luxury Artist.</span>
              </div>
            </div>
            <a href={`https://wa.me/923321221223?text=${waMsg}`} className="wa-btn">📲 Confirm on WhatsApp</a>
            <p className="footer">Thank you for choosing Incia Turab Luxury Artist 🌸<br />We can't wait to make you look and feel incredible.<br />📸 @makeupbyinciaturab</p>
          </>
        )}
      </div>
    </>
  );
}
