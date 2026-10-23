"use client";

import { useEffect, useMemo, useRef, useState } from "react";

// The ten-minute countdown stage. Brand: Command Suite indigo + gold + ivory (Cormorant Garamond, Montserrat).
const WORKBOOK = "landingpage.lccommandsuite.com/masterclass-workbook.pdf";
const PROMPTS = [
  { big: "Have your workbook ready", small: "Printed, or open on your tablet, with a pen nearby.", foot: WORKBOOK },
  { big: "Bring one real business issue", small: "A recurring bottleneck, a messy decision, a team confusion.", foot: "Make it the part you least like looking at." },
  { big: "Mute yourself, keep the chat open", small: "Write your questions the second they hit.", foot: "I will work down the list at the end." },
  { big: "Drop this in the chat", small: "Which part of your business do you least like looking at?", foot: "A few words is plenty." },
];
const RING_MS = 10 * 60_000;

function fmt(ms: number) {
  const s = Math.max(0, Math.ceil(ms / 1000));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const ss = s % 60;
  const p = (n: number) => String(n).padStart(2, "0");
  return h > 0 ? `${h}:${p(m)}:${p(ss)}` : `${p(m)}:${p(ss)}`;
}

export default function WelcomeClient({ startMs, timeLabel }: { startMs: number | null; timeLabel: string }) {
  const [now, setNow] = useState<number | null>(null);
  const [idx, setIdx] = useState(0);
  const canvas = useRef<HTMLCanvasElement>(null);
  // ?in=SECONDS rehearses the screen without waiting for a class
  const target = useMemo(() => {
    if (typeof window === "undefined") return startMs;
    const q = Number(new URLSearchParams(window.location.search).get("in"));
    return Number.isFinite(q) && q > 0 ? Date.now() + q * 1000 : startMs;
  }, [startMs]);

  useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 250);
    return () => clearInterval(t);
  }, []);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % PROMPTS.length), 9000);
    return () => clearInterval(t);
  }, []);

  // slow gold dust
  useEffect(() => {
    const cv = canvas.current;
    if (!cv || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = cv.getContext("2d")!;
    let w = 0, h = 0, raf = 0;
    const dots = Array.from({ length: 70 }, () => ({ x: Math.random(), y: Math.random(), r: 0.6 + Math.random() * 1.8, v: 0.015 + Math.random() * 0.05, a: 0.15 + Math.random() * 0.5, p: Math.random() * 6 }));
    const size = () => { w = cv.width = cv.clientWidth * devicePixelRatio; h = cv.height = cv.clientHeight * devicePixelRatio; };
    size(); window.addEventListener("resize", size);
    let last = performance.now();
    const draw = (t: number) => {
      const dt = Math.min(0.05, (t - last) / 1000); last = t;
      ctx.clearRect(0, 0, w, h);
      for (const d of dots) {
        d.y -= d.v * dt; d.p += dt;
        if (d.y < -0.02) { d.y = 1.02; d.x = Math.random(); }
        const tw = 0.6 + 0.4 * Math.sin(d.p * 1.3);
        ctx.fillStyle = `rgba(212,175,99,${d.a * tw})`;
        ctx.beginPath(); ctx.arc(d.x * w, d.y * h, d.r * devicePixelRatio, 0, 6.283); ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", size); };
  }, []);

  const left = target != null && now != null ? target - now : null;
  const started = left != null && left <= 0;
  const frac = left == null ? 1 : Math.min(1, Math.max(0, left / RING_MS));
  const R = 150, C = 2 * Math.PI * R;
  const p = PROMPTS[idx];

  return (
    <main className="stage">
      <style>{css}</style>
      <canvas ref={canvas} className="dust" aria-hidden />
      <div className="glow" aria-hidden />
      <div className="col">
        <p className="eyebrow">LifeCharter Command Suite™ presents</p>
        <h1>The Command Shift <span>MasterClass</span></h1>
        <p className="tag">From Hustle to Command</p>

        <div className="dialwrap">
          <svg viewBox="0 0 340 340" className="dial" aria-hidden>
            <circle cx="170" cy="170" r={R} className="track" />
            <circle cx="170" cy="170" r={R} className={`prog${started ? " done" : ""}`} strokeDasharray={C} strokeDashoffset={C * (1 - (started ? 1 : frac))} transform="rotate(-90 170 170)" />
          </svg>
          <img src="/brand/command-suite-emblem.png" alt="" className={`emblem${started ? " pulse" : ""}`} />
          <div className="time" aria-live="off">
            {started ? (
              <><b className="go">Welcome</b><i>We are beginning</i></>
            ) : (
              <><b>{left == null ? "--:--" : fmt(left)}</b><i>{left != null && left > RING_MS ? `Starting ${timeLabel.replace("Mountain Time", "MT")}` : "until we begin"}</i></>
            )}
          </div>
        </div>

        <div className="prompt" key={idx}>
          <h2>{p.big}</h2>
          <p>{p.small}</p>
          <em>{p.foot}</em>
        </div>
        <div className="dots" aria-hidden>{PROMPTS.map((_, i) => <span key={i} className={i === idx ? "on" : ""} />)}</div>
        <p className="quote">&ldquo;Founder-led should not have to mean founder-held.&rdquo;</p>
      </div>
    </main>
  );
}

const css = `
.stage{--indigo:#0F1A38;--gold:#D4AF63;--ivory:#FAF8F3;position:fixed;inset:0;overflow:hidden;background:radial-gradient(120% 90% at 50% 18%,#1a2a58 0%,#0F1A38 55%,#09112a 100%);color:var(--ivory);font-family:var(--w-sans),system-ui,sans-serif}
.dust{position:absolute;inset:0;width:100%;height:100%}
.glow{position:absolute;left:50%;top:44%;width:80vmin;height:80vmin;transform:translate(-50%,-50%);background:radial-gradient(closest-side,rgba(212,175,99,.20),rgba(212,175,99,0));animation:breathe 7s ease-in-out infinite}
.col{position:relative;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1.1vmin;text-align:center;padding:2vmin 4vw}
.eyebrow{margin:0;font-size:clamp(11px,1.5vmin,16px);letter-spacing:.34em;text-transform:uppercase;color:var(--gold);font-weight:600;animation:rise 1s .1s both}
h1{margin:0;font-family:var(--w-serif),Georgia,serif;font-weight:600;font-size:clamp(34px,7.4vmin,84px);line-height:1.02;animation:rise 1s .25s both}
h1 span{display:block;color:var(--gold)}
.tag{margin:0;font-family:var(--w-serif),Georgia,serif;font-style:italic;font-size:clamp(18px,3.4vmin,38px);color:#e9d9ae;animation:rise 1s .4s both}
.dialwrap{position:relative;width:min(42vmin,420px);aspect-ratio:1;margin:1.6vmin 0;animation:rise 1s .55s both}
.dial{position:absolute;inset:0;width:100%;height:100%}
.track{fill:none;stroke:rgba(212,175,99,.18);stroke-width:5}
.prog{fill:none;stroke:var(--gold);stroke-width:7;stroke-linecap:round;transition:stroke-dashoffset .3s linear;filter:drop-shadow(0 0 8px rgba(212,175,99,.55))}
.prog.done{stroke:#f2dd9c}
.emblem{position:absolute;left:50%;top:50%;width:30%;transform:translate(-50%,-50%);opacity:.14;animation:spin 90s linear infinite}
.emblem.pulse{opacity:.22;animation:spin 40s linear infinite,pulse 2.4s ease-in-out infinite}
.time{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center}
.time b{font-family:var(--w-serif),Georgia,serif;font-weight:600;font-size:clamp(40px,10vmin,110px);line-height:1;font-variant-numeric:tabular-nums;letter-spacing:.02em}
.time b.go{color:var(--gold);font-size:clamp(34px,8vmin,90px)}
.time i{margin-top:1vmin;font-style:normal;font-size:clamp(10px,1.7vmin,18px);letter-spacing:.24em;text-transform:uppercase;color:var(--gold)}
.prompt{min-height:15vmin;animation:swap 9s both infinite}
.prompt h2{margin:0;font-family:var(--w-serif),Georgia,serif;font-weight:600;font-size:clamp(24px,4.6vmin,52px)}
.prompt p{margin:.6vmin 0 0;font-size:clamp(14px,2.4vmin,26px);color:#e9e4d6}
.prompt em{display:block;margin-top:.6vmin;font-style:normal;font-size:clamp(12px,1.9vmin,20px);color:var(--gold);letter-spacing:.04em}
.dots{display:flex;gap:10px}
.dots span{width:8px;height:8px;border-radius:50%;background:rgba(212,175,99,.28);transition:background .4s,transform .4s}
.dots span.on{background:var(--gold);transform:scale(1.3)}
.quote{margin:1vmin 0 0;font-family:var(--w-serif),Georgia,serif;font-style:italic;font-size:clamp(14px,2.4vmin,26px);color:#cfc8b4}
@keyframes rise{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}
@keyframes swap{0%{opacity:0;transform:translateY(10px)}8%{opacity:1;transform:none}88%{opacity:1;transform:none}100%{opacity:0;transform:translateY(-8px)}}
@keyframes spin{to{transform:translate(-50%,-50%) rotate(360deg)}}
@keyframes pulse{0%,100%{filter:drop-shadow(0 0 0 rgba(212,175,99,0))}50%{filter:drop-shadow(0 0 22px rgba(212,175,99,.8))}}
@keyframes breathe{0%,100%{opacity:.7;transform:translate(-50%,-50%) scale(1)}50%{opacity:1;transform:translate(-50%,-50%) scale(1.08)}}
@media (prefers-reduced-motion:reduce){.stage *{animation:none!important}.prompt{opacity:1}}
`;
