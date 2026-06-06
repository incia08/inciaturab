import { useState } from "react";
import { supabase } from "../supabase";
import { STAFF_PHOTOS } from "../staffPhotos";

const T = {
  bg: "#F4F1EE", card: "#EDEAE6", border: "#DDD8D2",
  gold: "#C9A84C", text: "#1E1E1E", subtle: "#7A7470",
  pink: "#E8C4C4", white: "#FFFFFF", stone: "#D4CFC9"
};

const STAFF = [
  { name: "Incia Turab", title: "Owner & Luxury Artist", key: "incia" },
  { name: "Abiha", title: "Makeup Artist", key: "abiha" },
  { name: "Ayesha", title: "Makeup Artist", key: "ayesha" },
  { name: "Bushra", title: "Makeup Artist", key: "bushra" },
  { name: "Saba", title: "Makeup Artist", key: "saba" },
  { name: "Divya", title: "Makeup Artist", key: "divya" },
  { name: "Asna", title: "Makeup Artist", key: "asna" },
];

const S = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@300;400;500&display=swap');
  *{box-sizing:border-box;margin:0;padding:0;}
  body{background:${T.bg};font-family:'Jost',sans-serif;color:${T.text};}
  .page{max-width:480px;margin:0 auto;padding:32px 20px 60px;}
  .header{text-align:center;margin-bottom:28px;}
  .sym{font-family:'Cormorant Garamond',serif;font-size:36px;color:${T.gold};}
  .name{font-family:'Cormorant Garamond',serif;font-size:24px;font-weight:600;letter-spacing:4px;margin-top:4px;}
  .sub{font-size:10px;letter-spacing:3px;text-transform:uppercase;color:${T.subtle};margin-top:2px;}
  .divider{height:1px;background:linear-gradient(90deg,transparent,${T.gold},transparent);margin:20px auto;max-width:200px;}
  .title{font-family:'Cormorant Garamond',serif;font-size:28px;font-weight:300;text-align:center;}
  .title span{color:${T.gold};font-style:italic;}
  .tsub{font-size:11px;letter-spacing:2px;text-transform:uppercase;color:${T.subtle};text-align:center;margin:6px 0 24px;}
  .form-card{background:${T.card};border:1px solid ${T.border};border-radius:16px;padding:20px;margin-bottom:24px;}
  .label{font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:${T.subtle};margin-bottom:5px;display:block;}
  .input{width:100%;padding:11px 14px;background:${T.white};border:1px solid ${T.border};border-radius:10px;font-family:'Jost',sans-serif;font-size:14px;color:${T.text};outline:none;margin-bottom:12px;}
  .input:focus{border-color:${T.gold};}
  .sec-label{font-size:10px;letter-spacing:2px;text-transform:uppercase;color:${T.subtle};text-align:center;margin-bottom:16px;}
  .grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:28px;}
  .scard{background:${T.card};border:1px solid ${T.border};border-radius:16px;padding:16px 12px;text-align:center;cursor:pointer;transition:all 0.2s;}
  .scard.rated{border-color:${T.gold};background:linear-gradient(135deg,#FAF7F0,#F5EFE0);}
  .photo{width:80px;height:80px;border-radius:50%;object-fit:cover;border:2px solid ${T.border};margin:0 auto 10px;display:block;transition:border-color 0.2s;}
  .scard.rated .photo{border-color:${T.gold};}
  .sname{font-family:'Cormorant Garamond',serif;font-size:16px;font-weight:600;}
  .stitle{font-size:10px;color:${T.subtle};letter-spacing:1px;margin-top:2px;margin-bottom:10px;}
  .stars{display:flex;justify-content:center;gap:4px;margin-bottom:4px;}
  .star{font-size:24px;color:${T.stone};cursor:pointer;transition:color 0.15s;-webkit-tap-highlight-color:transparent;user-select:none;}
  .star.on{color:${T.gold};}
  .rlabel{font-size:10px;color:${T.subtle};letter-spacing:1px;min-height:14px;}
  .rlabel.on{color:${T.gold};font-weight:500;}
  .btn{width:100%;padding:15px;background:linear-gradient(135deg,${T.gold},#B8963E);color:white;border:none;border-radius:14px;font-family:'Jost',sans-serif;font-size:13px;font-weight:500;letter-spacing:2px;text-transform:uppercase;cursor:pointer;transition:all 0.2s;}
  .btn:disabled{opacity:0.4;cursor:not-allowed;}
  .note{font-size:11px;color:${T.subtle};text-align:center;margin-top:14px;font-style:italic;line-height:1.6;}
  .ty{text-align:center;padding:40px 20px;}
  .ty-icon{font-size:56px;margin-bottom:16px;}
  .ty-title{font-family:'Cormorant Garamond',serif;font-size:32px;font-weight:300;margin-bottom:8px;}
  .ty-title span{color:${T.gold};font-style:italic;}
  .ty-sub{font-size:13px;color:${T.subtle};line-height:1.7;margin-bottom:28px;}
  .g-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:14px 28px;background:${T.card};border:1px solid ${T.border};border-radius:14px;font-family:'Jost',sans-serif;font-size:13px;color:${T.text};text-decoration:none;transition:all 0.2s;letter-spacing:1px;}
  .g-btn:hover{border-color:${T.gold};}
`;

export default function Rate() {
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [ratings, setRatings] = useState({});
  const [hover, setHover] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const LABELS = ["", "Poor", "Fair", "Good", "Great", "Excellent!"];
  const hasRating = Object.keys(ratings).length > 0;
  const canSubmit = clientName.trim() && clientPhone.trim() && hasRating;

  const setRating = (staffKey, val) => setRatings(r => ({ ...r, [staffKey]: val }));
  const setHoverVal = (staffKey, val) => setHover(h => ({ ...h, [staffKey]: val }));

  const submit = async () => {
    if (!canSubmit) return;
    setLoading(true);
    try {
      await supabase.from("ratings").insert({
        id: Date.now().toString(),
        client_name: clientName,
        client_phone: clientPhone,
        staff_ratings: ratings,
        created_at: new Date().toISOString()
      });
    } catch (e) {}
    setLoading(false);
    setSubmitted(true);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <style>{S}</style>
      <div className="page">
        <div className="header">
          <div className="sym">✦ IT ✦</div>
          <div className="name">INCIA TURAB</div>
          <div className="sub">Luxury Artist</div>
        </div>

        {submitted ? (
          <div className="ty">
            <div className="ty-icon">🌸</div>
            <h2 className="ty-title">Thank <span>You!</span></h2>
            <p className="ty-sub">Your feedback means the world to us.<br />We are so grateful you chose Incia Turab Luxury Artist.<br />We hope to see you again soon! 💛</p>
            <p style={{ fontSize: 11, color: T.subtle, letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>Loved your experience?</p>
            <a href="https://maps.app.goo.gl/KyGUWQgBt3kTQrcX9?g_st=ic" target="_blank" rel="noreferrer" className="g-btn">
              ⭐ Leave a Google Review
            </a>
            <p style={{ fontSize: 11, color: T.subtle, marginTop: 20, fontStyle: "italic" }}>— Team Incia Turab · Jamshed Road, Gurumandir, Karachi</p>
          </div>
        ) : (
          <>
            <div className="divider" />
            <h1 className="title">Rate Our <span>Artists</span></h1>
            <p className="tsub">Your experience matters to us</p>

            <div className="form-card">
              <label className="label">Your Name *</label>
              <input className="input" placeholder="Full name" value={clientName} onChange={e => setClientName(e.target.value)} />
              <label className="label">WhatsApp Number *</label>
              <input className="input" style={{ marginBottom: 0 }} placeholder="03XXXXXXXXX" value={clientPhone} onChange={e => setClientPhone(e.target.value)} />
            </div>

            <p className="sec-label">Rate the artists who served you</p>

            <div className="grid">
              {STAFF.map(s => {
                const cur = hover[s.key] || ratings[s.key] || 0;
                const isRated = !!ratings[s.key];
                return (
                  <div key={s.key} className={`scard${isRated ? " rated" : ""}`}>
                    <img src={STAFF_PHOTOS[s.key]} alt={s.name} className="photo" />
                    <div className="sname">{s.name}</div>
                    <div className="stitle">{s.title}</div>
                    <div className="stars">
                      {[1, 2, 3, 4, 5].map(n => (
                        <span
                          key={n}
                          className={`star${n <= cur ? " on" : ""}`}
                          onMouseEnter={() => setHoverVal(s.key, n)}
                          onMouseLeave={() => setHoverVal(s.key, 0)}
                          onClick={() => setRating(s.key, n)}
                        >★</span>
                      ))}
                    </div>
                    <div className={`rlabel${isRated ? " on" : ""}`}>
                      {ratings[s.key] ? LABELS[ratings[s.key]] : "Tap to rate"}
                    </div>
                  </div>
                );
              })}
            </div>

            <button className="btn" disabled={!canSubmit || loading} onClick={submit}>
              {loading ? "Submitting..." : "Submit My Ratings ✦"}
            </button>
            <p className="note">Your feedback is private and only seen by Incia Turab studio management. Thank you for taking the time. 🌸</p>
          </>
        )}
      </div>
    </>
  );
}
