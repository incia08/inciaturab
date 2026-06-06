import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import StudioCore from "./StudioCore";

export default function Studio() {
  // Password protection
  const [authed, setAuthed] = useState(false);
  const [pwd, setPwd] = useState("");
  const [err, setErr] = useState("");

  const S = `
    *{box-sizing:border-box;margin:0;padding:0;}
    body{background:#F4F1EE;font-family:'Jost',sans-serif;}
    .lock{max-width:360px;margin:0 auto;padding:60px 24px;text-align:center;}
    .sym{font-family:'Cormorant Garamond',serif;font-size:40px;color:#C9A84C;}
    .lname{font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:600;letter-spacing:4px;margin:8px 0 4px;}
    .lsub{font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#7A7470;margin-bottom:32px;}
    .divider{height:1px;background:linear-gradient(90deg,transparent,#C9A84C,transparent);margin:0 auto 32px;max-width:160px;}
    input{width:100%;padding:13px 16px;background:#EDEAE6;border:1px solid #DDD8D2;border-radius:12px;font-family:'Jost',sans-serif;font-size:15px;color:#1E1E1E;outline:none;text-align:center;letter-spacing:4px;margin-bottom:14px;}
    input:focus{border-color:#C9A84C;}
    button{width:100%;padding:14px;background:linear-gradient(135deg,#C9A84C,#B8963E);color:white;border:none;border-radius:12px;font-family:'Jost',sans-serif;font-size:13px;font-weight:500;letter-spacing:2px;text-transform:uppercase;cursor:pointer;}
    .err{font-size:12px;color:#C0392B;margin-top:8px;}
    .note{font-size:11px;color:#7A7470;margin-top:20px;font-style:italic;}
  `;

  if (!authed) return (
    <>
      <style>{S}</style>
      <div className="lock">
        <div className="sym">✦ IT ✦</div>
        <div className="lname">INCIA TURAB</div>
        <div className="lsub">Studio Management</div>
        <div className="divider" />
        <input
          type="password"
          placeholder="Enter PIN"
          value={pwd}
          onChange={e => setPwd(e.target.value)}
          onKeyDown={e => e.key === "Enter" && (pwd === "incia2024" ? setAuthed(true) : setErr("Incorrect PIN"))}
        />
        <button onClick={() => pwd === "incia2024" ? setAuthed(true) : setErr("Incorrect PIN")}>
          Enter Studio ✦
        </button>
        {err && <p className="err">{err}</p>}
        <p className="note">Private access only 🌸</p>
      </div>
    </>
  );

  return <StudioCore supabase={supabase} />;
}
